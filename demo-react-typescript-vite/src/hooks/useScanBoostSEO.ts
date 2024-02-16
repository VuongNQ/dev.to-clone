import {
    DataLogsType,
    ItemAuditsType,
    StatusScanSEOType,
    TypePageSEOType,
    boostSEOState,
} from "@swift/types/boostSEO";
import { handleReturnScoresSEO } from "@swift/utils/funcSupportSeo";
import { useCallback, useEffect, useState } from "react";

// exemple from https://wanago.io/2020/09/28/react-context-api-hooks-typescript/
export const initialStateScanSEO: boostSEOState = {
    // isLoadingGetBoostSEO: false,
    currentUrl: "",
    dataScanLog: null,
    dataAudits: null,
    statusScan: StatusScanSEOType.scanned,
    scoresSEO: {
        scoreTotal: 0,
        scoreGood: 0,
        scoreFair: 0,
        scorePoor: 0,
    },
};
// hook to use for case get and post score SEO, info  Big problems, Improvements, Good results
export function useScanBoostSEO(dataLogScan: DataLogsType | null | undefined) {
    const [dataScanSEO, setDataScanSEO] =
        useState<boostSEOState>(initialStateScanSEO);

    const [scanNumber] = useState<number>(0);

    // const { getScanLogsSEO } = useBoostSEOService();

    /**get Score and data SEO */
    const handleUpdateDataScanSEO = useCallback(async () => {
        /*up scanNumber + 1 */
        // setScanNumber((oldValue) => {
        //   const scanNumber = oldValue + 1;
        //   return scanNumber;
        // });
        /*end up scanNumber + 1 */

        /*set loading = true when getting data  */
        // if (!dataScanSEO.isLoadingGetBoostSEO) {
        //   setDataScanSEO((old) => {
        //     return { ...old, isLoadingGetBoostSEO: true };
        //   });
        // }
        /*end set loading = true when getting data  */

        // const { status, data } = res;

        let newData: boostSEOState = {
            ...initialStateScanSEO,
            statusScan: dataLogScan?.status || StatusScanSEOType.scanned,
        };

        if (dataLogScan) {
            const { status, types_of_urls_scanned, detail_logs, updated_at } =
                dataLogScan;
            const statusScan = status;

            if (statusScan === StatusScanSEOType.scanning) {
                newData = {
                    ...dataScanSEO,
                    ...newData,
                    currentUrl: detail_logs.homepage_url?.current_url || "",
                    // isLoadingGetBoostSEO: false,
                };

                setDataScanSEO(newData);
                return newData;
            }

            const scoresSEO = handleReturnScoresSEO(
                types_of_urls_scanned[0],
                detail_logs
            );
            /** get data audit*/
            let newDataAudit:
                | { [K in TypePageSEOType]?: ItemAuditsType[] }
                | null = null;

            types_of_urls_scanned.forEach((item) => {
                if (
                    Object.keys(detail_logs).length !== 0 &&
                    detail_logs[item]
                ) {
                    newDataAudit = {
                        ...newDataAudit,
                        [item]: detail_logs[item]?.data.audits,
                    };
                }
            });
            /** end get data audit*/
            newData = {
                ...newData,
                dataScanLog: {
                    types_of_urls_scanned,
                    updated_at,
                },
                scoresSEO: scoresSEO,
                dataAudits: newDataAudit,
                currentUrl: detail_logs.homepage_url?.current_url || "",
                // isLoadingGetBoostSEO: false,
            };
        }

        setDataScanSEO((old) => {
            return { ...old, ...newData };
        });

        return newData;
    }, [dataLogScan, dataScanSEO]);
    /**end get Scrore and data SEO */

    /**on scan SEO */
    // const onScanSEO = useCallback(async (payload: { urlScan?: string }) => {
    //   let newPayload = payload;
    //   const urlScan = payload.urlScan;
    //   const regexHttp = /(http(s):\/\/.)/;

    //   if (urlScan && urlScan.length) {
    //     const isHasHttp = regexHttp.test(urlScan);
    //     newPayload = {
    //       ...newPayload,
    //       urlScan: isHasHttp ? urlScan : `https://${urlScan}`,
    //     };
    //     setDataScanSEO((old) => {
    //       return {
    //         ...old,
    //         statusScan: StatusScanSEOType.scanning,
    //         // isLoadingScanSEO: false,
    //         currentUrl: isHasHttp ? urlScan : `https://${urlScan}`,
    //       };
    //     });
    //   } else {
    //     setDataScanSEO((old) => {
    //       return {
    //         ...old,
    //         statusScan: StatusScanSEOType.scanning,
    //         // isLoadingScanSEO: false,
    //       };
    //     });
    //   }

    //   // if (urlScan && urlScan.length) {
    //   //   postScanCompetitor({ urlScan: newPayload.urlScan });
    //   // } else {
    //   //   postScanSEO();
    //   // }
    // }, []);
    /**end on scan SEO */

    useEffect(() => {
        if (!dataLogScan) return;
        handleUpdateDataScanSEO();
    }, [dataLogScan]);

    return {
        dataScanSEO,
        // onScanSEO,
        scanNumber,
        setDataScanSEO,
    };
}
