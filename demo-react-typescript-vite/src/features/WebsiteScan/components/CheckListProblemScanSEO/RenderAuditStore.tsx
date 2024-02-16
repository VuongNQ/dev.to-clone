import { useAppSelector } from "@swift/hooks";
import { customerData } from "@swift/store/global";
import {
    EStatusDataLogAuditScanSEO,
    ItemDataLogAudits,
    StatusScanSEOType,
} from "@swift/types/boostSEO";
import { getStringNoDataLogAudits } from "@swift/utils/funcSupportSeo";
import { memo, useContext } from "react";
import { useTranslation } from "react-i18next";
import { WebsiteScanContext } from "../../contexts/websiteScan";
import DataLogAuditScanSEO from "../DataLogAuditScanSEO";
import LoadingCheckListSEO from "../LoadingCheckListSEO";
import { EleLoadingScanCompetitor, EleNodataStore } from "./ElementSupport";

export const RenderStoreAuditWithoutData = memo(function _({
    isScanSEO,
}: {
    isScanSEO: boolean;
}) {
    const customer = useAppSelector(customerData);

    if (isScanSEO)
        return (
            <div className="flex-1 py-5">
                <LoadingCheckListSEO
                    domain={customer?.domain || ""}
                    numberList={2}
                    isShowBanner={isScanSEO}
                />
            </div>
        );

    return <EleNodataStore />;
});

export const RenderStoreAudit = memo(function _({
    status,
    list,
}: {
    status: EStatusDataLogAuditScanSEO;
    list: ItemDataLogAudits[];
}) {
    const { t } = useTranslation();

    const { isShowCompetitor, dataScanCompetitor, isLoadingOnScanCompetitor } =
        useContext(WebsiteScanContext);

    const isScanningCCompetitorSEO =
        isLoadingOnScanCompetitor ||
        dataScanCompetitor.statusScan === StatusScanSEOType.scanning;

    const titleNodata = getStringNoDataLogAudits(status);

    if (isShowCompetitor && isScanningCCompetitorSEO)
        return (
            <div className={`p-5 CheckListProblemScanSEO__problem-store`}>
                <EleLoadingScanCompetitor />
            </div>
        );

    return (
        <div
            className={`p-5 ${
                isShowCompetitor
                    ? "CheckListProblemScanSEO__problem-store"
                    : "w-100"
            }`}
        >
            <DataLogAuditScanSEO
                status={status}
                listData={list}
                titleNoData={t(titleNodata)}
            />
        </div>
    );
});
