import { initialStateScanSEO } from "@swift/hooks/useScanBoostSEO";
import { IScanCompetitorOverview } from "@swift/services/scanWebsiteApi";
import { DataLogsType, boostSEOState } from "@swift/types/boostSEO";
import { UseMutateFunction } from "@tanstack/react-query";
import { Dispatch, SetStateAction, createContext } from "react";

const WebsiteScanContextDefaultValue: IWebsiteContext = {
    dataRawScanStoreSEO: null,
    isLoadingDataScanStoreSEO: false,
    dataRawScanCompetitorSEO: null,
    isLoadingDataScanCompetitorSEO: false,
    dataScanStore: initialStateScanSEO,
    dataScanCompetitor: initialStateScanSEO,
    isLoadingOnScanCompetitor: false,
    isShowCompetitor: false,
    isLoadingOnScanStore: false,
    isAllowPlan: false,
    isOutRemainScan: false,
    remainScan: undefined,
    // method
    onScanStore: () => {},
    onToggleCompetitor: () => {},
    setDataScanStore: () => {},
    setDataScanCompetitor: () => {},
};

export const WebsiteScanContext = createContext<IWebsiteContext>(
    WebsiteScanContextDefaultValue
);

interface IWebsiteContext {
    dataRawScanStoreSEO: DataLogsType | null | undefined;
    isLoadingDataScanStoreSEO: boolean;
    dataRawScanCompetitorSEO: DataLogsType | null | undefined;
    isLoadingDataScanCompetitorSEO: boolean;
    dataScanStore: boostSEOState;
    dataScanCompetitor: boostSEOState;
    isLoadingOnScanCompetitor: boolean;
    isShowCompetitor: boolean;
    isLoadingOnScanStore: boolean;
    isAllowPlan: boolean;
    isOutRemainScan: boolean;
    remainScan :IScanCompetitorOverview | undefined
    // method
    onScanStore: UseMutateFunction<void, unknown, void, unknown>;
    onToggleCompetitor: () => void;
    setDataScanStore: Dispatch<SetStateAction<boostSEOState>>;
    setDataScanCompetitor: Dispatch<SetStateAction<boostSEOState>>;
}
