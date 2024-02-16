import { Button, Divider, Icon, Text } from "@shopify/polaris";
import SkeletonBasic from "@swift/components/UIs/Skeletons/SkeletonBasic";
import { useAppDispatch, useAppSelector } from "@swift/hooks";
import { useCountNumber } from "@swift/hooks/useCountNumber";
import { queryKeys } from "@swift/queryKeys";
import { useCrispChatApiService } from "@swift/services/crispChatApi";
import { useScanWebsiteService } from "@swift/services/scanWebsiteApi";
import { customerData, globalActions } from "@swift/store/global";
import { StatusScanSEOType } from "@swift/types/boostSEO";
import { IDataLogSpeed } from "@swift/types/scanSpeed";
import { formatMDYAMPMAtString } from "@swift/utils/formatDate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
    handleReturnIconStatus,
    handleReturnStatusCLS,
    handleReturnStatusFCP,
    handleReturnStatusLCP,
} from "../../helper";
import ChartScoreSpeed from "../ChartScoreSpeed";
import "./styles.scss";

let timeOutSession: NodeJS.Timeout | undefined = undefined;

const SectionScoreSpeed = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const queryClient = useQueryClient();

    const customer = useAppSelector(customerData);

    const navigate = useNavigate();

    const { postScanSpeed, getLogSpeed } = useScanWebsiteService();

    const { postMessageChatLowScore } = useCrispChatApiService();

    const { data: scanLogSpeed, isFetching: isLoadingLogSpeed } = useQuery({
        ...queryKeys.scanSpeedQueryKey.getScanLogsSpeed(),
        queryFn: async () => {
            const { data, status } = await getLogSpeed();
            if (status && data) {
                const newData: IDataLogSpeed = {
                    score: data.score,
                    status: data.status,
                    updated_at: data.updated_at,
                    cumulative_layout_shift: data.data.cumulative_layout_shift,
                    first_contentful_paint: data.data.first_contentful_paint,
                    largest_contentful_paint: data.data.largest_contentful_paint,
                };
                return newData;
            }

            // if(!status && message?.includes("No data found")){
            //     onScanSpeed()
            // }
            return null;
        },
    });

    const { mutate: onScanSpeed, isLoading: isLoadingScanSpeed } = useMutation({
        mutationFn: () => postScanSpeed(),
        onSuccess(res) {
            const { status } = res;
            if (status) {
                queryClient.setQueryData<IDataLogSpeed>(
                    queryKeys.scanSpeedQueryKey.getScanLogsSpeed().queryKey,
                    (oldData) => {
                        if (!oldData)
                            return {
                                score: 0,
                                status: StatusScanSEOType.scanning,
                                cumulative_layout_shift: 0,
                                first_contentful_paint: 0,
                                largest_contentful_paint: 0,
                            };
                        let newData = oldData;
                        newData = {
                            ...newData,
                            status: StatusScanSEOType.scanning,
                        };

                        return newData;
                    }
                );
            }
        },
    });

    const handleConvertMSToS = useCallback((ms: number) => {
        return (Math.round((ms / 1000) * 100) / 100).toFixed(2);
    }, []);

    const { countPoint, setMaxNumber } = useCountNumber({
        numberMin: 0,
        numberMax: 0,
    });

    /** fun to post score speed website user and send message the first time */
    const handlePostMessageScoreLow = useCallback(
        (score: number, sessionId: string) => {
            timeOutSession = setTimeout(async () => {
                const { status } = await postMessageChatLowScore(score, sessionId);

                if (status) {
                    dispatch(
                        globalActions.updateCustomer({
                            is_send_crispchat: true,
                        })
                    );
                }

                clearTimeout(timeOutSession);
            }, 5000);
        },
        [dispatch, postMessageChatLowScore]
    );
    /**end fun to post score speed website user and send message the first time */

    const isLoadingScan = useMemo(
        () => isLoadingLogSpeed || isLoadingScanSpeed || scanLogSpeed?.status === StatusScanSEOType.scanning,
        //    () => true,
        [isLoadingLogSpeed, isLoadingScanSpeed, scanLogSpeed?.status]
    );

    const ElmUpdateAt = useMemo(() => {
        if (isLoadingScan) return <SkeletonBasic width="160px" height="20px" />;
        return (
            <Text variant="bodySm" as="p" color="subdued">
                {!scanLogSpeed?.updated_at
                    ? "-"
                    : t("common.txt_last_scan", {
                          score_number: formatMDYAMPMAtString(scanLogSpeed?.updated_at),
                      })}
            </Text>
        );
    }, [isLoadingScan, scanLogSpeed?.updated_at, t]);

    const ElmBtn = useMemo(() => {
        if (isLoadingScan) return <SkeletonBasic width="160px" height="20px" />;
        if (!scanLogSpeed || scanLogSpeed?.score >= 90) return <></>;

        return (
            <Button primary size="slim" onClick={() => navigate("/one-experts")}>
                {t("common.btn_fix_with_experts")}
            </Button>
        );
    }, [isLoadingScan, navigate, scanLogSpeed?.score, t]);

    const ElmFCP = useMemo(() => {
        if (isLoadingScan) return <SkeletonBasic width="160px" height="20px" />;
        const status = handleReturnStatusFCP(scanLogSpeed?.first_contentful_paint || 0);
        return (
            <div className="flex gap-2 items-center">
                <p className="SectionScoreSpeed__title-chart flex flex-1 gap-2">
                    <Icon source={handleReturnIconStatus(status)} color={status} />
                    <span className="flex-1">
                        <Text as="span" variant="bodySm">
                            FCP
                        </Text>
                    </span>
                </p>
                <Text as="span" variant="headingSm">
                    {handleConvertMSToS(scanLogSpeed?.first_contentful_paint || 0)}s
                </Text>
            </div>
        );
    }, [handleConvertMSToS, isLoadingScan, scanLogSpeed?.first_contentful_paint]);

    const ElmLCP = useMemo(() => {
        if (isLoadingScan) return <SkeletonBasic width="160px" height="20px" />;
        const status = handleReturnStatusLCP(scanLogSpeed?.largest_contentful_paint || 0);
        return (
            <div className="flex gap-2 items-center">
                <p className="SectionScoreSpeed__title-chart flex flex-1 gap-2">
                    <Icon source={handleReturnIconStatus(status)} color={status} />
                    <span className="flex-1">
                        <Text as="span" variant="bodySm">
                            LCP
                        </Text>
                    </span>
                </p>
                <Text as="span" variant="headingSm">
                    {handleConvertMSToS(scanLogSpeed?.largest_contentful_paint || 0)}s
                </Text>
            </div>
        );
    }, [handleConvertMSToS, isLoadingScan, scanLogSpeed?.largest_contentful_paint]);

    const ElmCLS = useMemo(() => {
        if (isLoadingScan) return <SkeletonBasic width="160px" height="20px" />;
        const status = handleReturnStatusCLS(scanLogSpeed?.cumulative_layout_shift || 0);
        return (
            <div className="flex gap-2 items-center">
                <p className="SectionScoreSpeed__title-chart flex flex-1 gap-2">
                    <Icon source={handleReturnIconStatus(status)} color={status} />
                    <span className="flex-1">
                        <Text as="span" variant="bodySm">
                            CLS
                        </Text>
                    </span>
                </p>
                <Text as="span" variant="headingSm">
                    {scanLogSpeed?.cumulative_layout_shift || 0.0}
                </Text>
            </div>
        );
    }, [isLoadingScan, scanLogSpeed?.cumulative_layout_shift]);

    useEffect(() => {
        if (!scanLogSpeed) return;
        setMaxNumber(scanLogSpeed.score);
    }, [scanLogSpeed?.score]);

    /** send message low score speed web user */
    useEffect(() => {
        if (!customer || customer.is_send_crispchat) return;

        if (!scanLogSpeed?.score || scanLogSpeed.score > 50) return;

        if (!window.$crisp) return;

        if (Array.isArray(window.$crisp)) return;

        const sessionId = window.$crisp.get("session:identifier");
        if (!sessionId) return;

        handlePostMessageScoreLow(scanLogSpeed.score, sessionId);
    }, [customer?.is_send_crispchat, Array.isArray(window.$crisp), scanLogSpeed?.score]);
    /**end send message low score speed web user */

    return (
        <div className="sw__wp-box p-5 flex flex-1 flex-col gap-2 items-center">
            <div className="SectionScoreSpeed__box flex gap-5">
                {isLoadingScan ? (
                    <SkeletonBasic shape="circle" width="180px" height="180px" />
                ) : (
                    <ChartScoreSpeed
                        width="180px"
                        height="180px"
                        variant="heading3xl"
                        // showBackgroundScore
                        point={countPoint}
                        titleScore="Speed score"
                        onReScan={onScanSpeed}
                    />
                )}
                <div className="flex flex-col gap-4 justify-center">
                    {ElmFCP}
                    <Divider></Divider>

                    {ElmLCP}
                    <Divider></Divider>

                    {ElmCLS}
                </div>
            </div>

            {ElmBtn}

            {ElmUpdateAt}
        </div>
    );
};

export default SectionScoreSpeed;
