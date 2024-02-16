import { Button, Checkbox, Icon, Link, Text, Tooltip } from "@shopify/polaris";
import { QuestionMarkMajor } from "@shopify/polaris-icons";
import ChartScore from "@swift/components/UIs/ChartScore";
import SkeletonBasic from "@swift/components/UIs/Skeletons/SkeletonBasic";
import { ACCEPT_PLAN_AUTO_SCAN } from "@swift/constants/constantsSeoBasic";
import { useAppSelector } from "@swift/hooks";
import { useCountNumber } from "@swift/hooks/useCountNumber";
import usePlanPricing from "@swift/hooks/usePlanPricing";
import { queryKeys } from "@swift/queryKeys";
import { useBoostSEOService } from "@swift/services/boostSEOApi";
import { useScanWebsiteService } from "@swift/services/scanWebsiteApi";
import { customerData } from "@swift/store/global";
import { IPostAutoScanSEO, ScanSettingType, StatusScanSEOType } from "@swift/types/boostSEO";
import { formatMDYAMPMAtString } from "@swift/utils/formatDate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { WebsiteScanContext } from "../../contexts/websiteScan";
import "./styles.scss";

const ReScanStoreCheckListSEO = () => {
    const { t } = useTranslation();

    const customer = useAppSelector(customerData);

    const {
        dataScanStore,
        dataScanCompetitor,
        isLoadingOnScanCompetitor,
        isLoadingDataScanStoreSEO,
        isLoadingOnScanStore,
        onScanStore,
    } = useContext(WebsiteScanContext);

    const score = dataScanStore.scoresSEO.scoreTotal;

    const { countPoint, setMaxNumber } = useCountNumber({
        numberMin: 0,
        numberMax: score,
    });

    /** update scoreTotal change */
    useEffect(() => {
        if (score === 0) return;

        setMaxNumber(score);
    }, [score]);

    return (
        <div className="ReScanStoreCheckListSEO p-5">
            <div className="ReScanStoreCheckListSEO__container">
                <ChartScore
                    point={countPoint}
                    showBackgroundScore
                    variant="heading3xl"
                    // showBackgroundScore
                />
                <div className="ReScanStoreCheckListSEO__content">
                    <Text as="h3" variant="headingMd">
                        {customer?.domain || ""}
                    </Text>

                    <AutoWebScan />

                    <Button
                        loading={
                            dataScanStore.statusScan === StatusScanSEOType.scanning ||
                            isLoadingDataScanStoreSEO ||
                            isLoadingOnScanStore
                        }
                        primary={!dataScanStore.dataScanLog}
                        size="slim"
                        disabled={
                            dataScanCompetitor.statusScan === StatusScanSEOType.scanning || isLoadingOnScanCompetitor
                        }
                        onClick={onScanStore}
                    >
                        {dataScanStore.dataScanLog ? t("boostSEO.common.btn_re_scan") : t("boostSEO.common.btn_scan")}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const AutoWebScan = () => {
    const { t } = useTranslation();

    const { dataScanStore } = useContext(WebsiteScanContext);

    const { postAutoScanSEO } = useScanWebsiteService();

    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const { getDetailScanSettingSEO } = useBoostSEOService();

    const { isAllowPlan: isAllowAuto } = usePlanPricing({
        listPLanAllow: ACCEPT_PLAN_AUTO_SCAN,
    });

    const { isLoading: isLoadingAutoScan, data: settingAuto } = useQuery({
        ...queryKeys.basicSeo.getAutoScanSEO(),
        enabled: isAllowAuto,
        refetchOnWindowFocus: true,
        queryFn: async () => {
            const { data, status } = await getDetailScanSettingSEO();
            if (status) {
                return data;
            }

            return null;
        },
    });

    const isCheckedAuto = settingAuto ? settingAuto.is_auto_scan : false;

    const txtTime = dataScanStore.dataScanLog
        ? `${t("boostSEO.common.txt_last_scan_time")} ${formatMDYAMPMAtString(dataScanStore.dataScanLog?.updated_at)}`
        : "";

    const { mutate: onPostAutoScanSEO, isLoading: isLoadingSettingAuto } = useMutation({
        mutationFn: async (payload: IPostAutoScanSEO) => {
            const { status } = await postAutoScanSEO(payload);
            return {
                status,
                payload,
            };
        },
        onSuccess: (res) => {
            const { status, payload } = res;

            if (status) {
                handleUpdateScanSetting({
                    payload: {
                        is_auto_scan: payload.isAutoScan,
                    },
                });
            }
        },
    });

    const handleUpdateScanSetting = useCallback(
        ({ payload }: { payload: Partial<ScanSettingType> }) => {
            queryClient.setQueryData<ScanSettingType>(queryKeys.basicSeo.getAutoScanSEO().queryKey, (oldData) => {
                if (!oldData) return oldData;
                // console.log("oldData", oldData, "payload", payload);
                let newData = oldData;
                newData = {
                    ...newData,
                    ...payload,
                };
                return newData;
            });
        },
        [queryClient]
    );

    if ((isAllowAuto && isLoadingAutoScan) || isLoadingSettingAuto) return <ElmLoadingAutoScan />;

    return (
        <>
            <div className="ReScanStoreCheckListSEO__box-auto flex flex-col gap-1">
                <div className="flex gap-1 items-center">
                    <Checkbox
                        label={t("smartSEO.web_scan.auto_scan.title")}
                        checked={isCheckedAuto}
                        disabled={!isAllowAuto}
                        onChange={() => {
                            onPostAutoScanSEO({
                                isAutoScan: !isCheckedAuto,
                                // isCompetitor: !isAutoScan,
                            });
                        }}
                    />
                    <Tooltip content={t("smartSEO.web_scan.auto_scan.des")}>
                        <Icon source={QuestionMarkMajor} color="base" />
                    </Tooltip>
                </div>
                <div className={`${isAllowAuto ? "hidden" : "inline-flex"}`}>
                    <Text variant="bodySm" as="p">
                        {t("optimize_image.auto_optimize.require_plan")}{" "}
                        <Link removeUnderline onClick={() => navigate("/pricing")}>
                            {t("common.btn_upgrade")}
                        </Link>
                    </Text>
                </div>
            </div>

            {txtTime && txtTime.length && <span className="ReScanStoreCheckListSEO__des">{txtTime}</span>}
        </>
    );
};

const ElmLoadingAutoScan = () => (
    <>
        <SkeletonBasic height="16px" width="200px" shape="square" />
        <SkeletonBasic height="16px" width="200px" shape="square" />
    </>
);

export default ReScanStoreCheckListSEO;
