import { ACCEPT_PLAN } from "@swift/constants/constantsSeoBasic";
import usePlanPricing from "@swift/hooks/usePlanPricing";
import { useScanBoostSEO } from "@swift/hooks/useScanBoostSEO";
import { queryKeys } from "@swift/queryKeys";
import { useBoostSEOService } from "@swift/services/boostSEOApi";
import { useScanWebsiteService } from "@swift/services/scanWebsiteApi";
import { StatusScanSEOType } from "@swift/types/boostSEO";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useWebScan = () => {
    const { getScanLogsSEO } = useBoostSEOService();

    const { postScanCompetitor, postScanSEO } = useScanWebsiteService();

    const { isAllowPlan } = usePlanPricing({ listPLanAllow: ACCEPT_PLAN });

    const { getLogOverview } = useScanWebsiteService();

    const {
        data: remainScan,
        isLoading: isLoadingCountRemainScan,
        isFetching: isFetchingCountRemainScan,
    } = useQuery({
        ...queryKeys.basicSeo.getScanLogsOverview(),
        enabled: isAllowPlan,
        queryFn: async () => {
            const { data } = await getLogOverview();
            return data;
        },
    });

    const { data: dataScanStoreSEO, isFetching: isLoadingDataScanStoreSEO } =
        useQuery({
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

    const { dataScanSEO: dataScanStore, setDataScanSEO: setDataScanStore } =
        useScanBoostSEO(dataScanStoreSEO);

    const {
        data: dataScanCompetitorSEO,
        isLoading: isLoadingDataScanCompetitorSEO,
    } = useQuery({
        ...queryKeys.basicSeo.getScanLogsCompetitorSEO(),
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const res = await getScanLogsSEO({
                limit: 1,
                page: 1,
                is_competitor: true,
            });
            return res.data;
        },
    });

    const {
        dataScanSEO: dataScanCompetitor,
        setDataScanSEO: setDataScanCompetitor,
    } = useScanBoostSEO(dataScanCompetitorSEO);

    const { mutate: onScanCompetitor, isLoading: isLoadingOnScanCompetitor } =
        useMutation({
            mutationFn: async (urlScan: string) => {
                const regexHttp = /(http(s):\/\/.)/;
                const isHasHttp = regexHttp.test(urlScan);
                const newUrlScan = isHasHttp ? urlScan : `https://${urlScan}`;

                const { status } = await postScanCompetitor({
                    urlScan: newUrlScan,
                });
                if (status) {
                    setDataScanCompetitor((old) => {
                        return {
                            ...old,
                            statusScan: StatusScanSEOType.scanning,
                            currentUrl: isHasHttp
                                ? urlScan
                                : `https://${urlScan}`,
                        };
                    });
                }
            },
        });

    const [isShowCompetitor, setIsShowCompetitor] = useState(false);

    const { mutate: onScanStore, isLoading: isLoadingOnScanStore } =
        useMutation({
            mutationFn: async () => {
                const { status } = await postScanSEO();
                if (status) {
                    setDataScanStore((old) => {
                        return {
                            ...old,
                            statusScan: StatusScanSEOType.scanning,
                        };
                    });
                }
            },
        });

    const onToggleCompetitor = () => {
        setIsShowCompetitor((preValue) => !preValue);
    };

    return {
        dataRawScanStoreSEO: dataScanStoreSEO,
        isLoadingDataScanStoreSEO,
        dataRawScanCompetitorSEO: dataScanCompetitorSEO,
        isLoadingDataScanCompetitorSEO,
        isLoadingOnScanCompetitor,
        dataScanStore: dataScanStore,
        dataScanCompetitor: dataScanCompetitor,
        isShowCompetitor,
        isLoadingOnScanStore,
        isAllowPlan,
        isOutRemainScan:
            isLoadingCountRemainScan ||
            isFetchingCountRemainScan ||
            remainScan?.count_competitor_scan.current ===
                remainScan?.count_competitor_scan.max,
        remainScan,
        onToggleCompetitor,
        onScanStore,
        setDataScanStore: setDataScanStore,
        setDataScanCompetitor: setDataScanCompetitor,
        onScanCompetitor,
    };
};
