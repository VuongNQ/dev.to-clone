import { useTranslation } from "react-i18next";
import "./styles.scss";
import { Button, Divider, Icon, Text } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { useScanWebsiteService } from "@swift/services/scanWebsiteApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryKeys } from "@swift/queryKeys";
import { useBoostSEOService } from "@swift/services/boostSEOApi";
import { useScanBoostSEO } from "@swift/hooks/useScanBoostSEO";
import { StatusScanSEOType } from "@swift/types/boostSEO";
import { useEffect, useMemo } from "react";
import SkeletonBasic from "@swift/components/UIs/Skeletons/SkeletonBasic";
import { formatMDYAMPMAtString } from "@swift/utils/formatDate";
import { useCountNumber } from "@swift/hooks/useCountNumber";
import ChartScore from "@swift/components/UIs/ChartScore";
import { CircleCancelMinor, CircleInformationMajor, CircleTickMajor } from "@shopify/polaris-icons";

const SectionScoreSEO = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const { postScanSEO } = useScanWebsiteService();

    const { getScanLogsSEO } = useBoostSEOService();

    const { data: scanLogSEO, isLoading } = useQuery({
        ...queryKeys.basicSeo.getScanLogsStoreSEO(),
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const res = await getScanLogsSEO({
                limit: 1,
                page: 1,
                is_competitor: false,
            });
            return res.data;
        },
    });

    const {
        dataScanSEO: { scoresSEO, statusScan, dataScanLog },
        setDataScanSEO,
    } = useScanBoostSEO(scanLogSEO);

    const scanSEO = useMutation({
        mutationFn: () => postScanSEO(),
        onSuccess() {
            setDataScanSEO((old) => {
                return {
                    ...old,
                    statusScan: StatusScanSEOType.scanning,
                };
            });
        },
    });

    const { countPoint, setMaxNumber } = useCountNumber({
        numberMin: 0,
        numberMax: 0,
    });

    const isLoadingScan = useMemo(
        () => isLoading || scanSEO.isLoading || statusScan === StatusScanSEOType.scanning,
        [isLoading, scanSEO.isLoading, statusScan]
    );

    // const hadScanned = !!scanLogSEO && statusScan === StatusScanSEOType.scanned;

    const ElmBtn = useMemo(() => {
        if (isLoadingScan) return <SkeletonBasic width="160px" height="20px" />;

        return (
            <Button outline size="slim" onClick={() => navigate("/seo-basic")}>
                {t("home.score_block.btn_view_detail")}
            </Button>
        );
    }, [isLoadingScan, navigate, t]);

    const ElmUpdateAt = useMemo(() => {
        if (isLoadingScan) return <SkeletonBasic width="160px" height="20px" />;
        return (
            <Text variant="bodySm" as="p" color="subdued">
                {!dataScanLog?.updated_at
                    ? "-"
                    : t("common.txt_last_scan", {
                          score_number: formatMDYAMPMAtString(dataScanLog.updated_at),
                      })}
            </Text>
        );
    }, [dataScanLog?.updated_at, isLoadingScan, t]);

    const ElmMustFix = useMemo(() => {
        if (isLoadingScan) return <SkeletonBasic width="160px" height="20px" />;
        return (
            <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigate("/seo-basic")}>
                <p className="SectionScoreSEO__title-chart flex flex-1 gap-2">
                    <Icon source={CircleCancelMinor} color="critical" />
                    <span className="flex-1">
                        <Text as="span" variant="bodySm">
                            {t("smartSEO.web_scan.tabs_scan.0")}
                        </Text>
                    </span>
                </p>
                <Text as="span" variant="headingSm">
                    {scoresSEO.scorePoor}
                </Text>
            </div>
        );
    }, [isLoadingScan, navigate, scoresSEO.scorePoor, t]);

    const ElmImprove = useMemo(() => {
        if (isLoadingScan) return <SkeletonBasic width="160px" height="20px" />;
        return (
            <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigate("/seo-basic")}>
                <p className="SectionScoreSEO__title-chart flex flex-1 gap-2">
                    <Icon source={CircleInformationMajor} color="warning" />
                    <span className="flex-1">
                        <Text as="span" variant="bodySm">
                            {t("smartSEO.web_scan.tabs_scan.1")}
                        </Text>
                    </span>
                </p>
                <Text as="span" variant="headingSm">
                    {scoresSEO.scoreFair}
                </Text>
            </div>
        );
    }, [isLoadingScan, navigate, scoresSEO.scoreFair, t]);

    const ElmGoodResult = useMemo(() => {
        if (isLoadingScan) return <SkeletonBasic width="160px" height="20px" />;
        return (
            <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigate("/seo-basic")}>
                <p className="SectionScoreSEO__title-chart flex flex-1 gap-2">
                    <Icon source={CircleTickMajor} color="success" />
                    <span className="flex-1">
                        <Text as="span" variant="bodySm">
                            {t("smartSEO.web_scan.tabs_scan.2")}
                        </Text>
                    </span>
                </p>
                <Text as="span" variant="headingSm">
                    {scoresSEO.scoreGood}
                </Text>
            </div>
        );
    }, [isLoadingScan, navigate, scoresSEO.scoreGood, t]);

    useEffect(() => {
        setMaxNumber(scoresSEO.scoreTotal);
    }, [scoresSEO.scoreTotal]);

    return (
        <div className="sw__wp-box p-5 flex flex-1 flex-col gap-2 items-center">
            <div className="SectionScoreSEO__box flex gap-5">
                {isLoadingScan ? (
                    <SkeletonBasic shape="circle" width="180px" height="180px" />
                ) : (
                    <ChartScore
                        width="180px"
                        height="180px"
                        variant="heading3xl"
                        // showBackgroundScore
                        point={countPoint}
                        titleScore="SEO score"
                        onReScan={scanSEO.mutate}
                    />
                )}
                <div className="flex flex-col gap-4 justify-center">
                    {ElmMustFix}
                    <Divider></Divider>
                    {ElmImprove}
                    <Divider></Divider>
                    {ElmGoodResult}
                </div>
            </div>

            {ElmBtn}
            {ElmUpdateAt}
        </div>
    );
};

export default SectionScoreSEO;
