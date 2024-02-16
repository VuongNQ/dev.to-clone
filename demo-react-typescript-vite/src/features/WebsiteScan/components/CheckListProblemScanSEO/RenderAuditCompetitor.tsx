import { REGEX_URL } from "@swift/constants/constantRegex";
import {
    EStatusDataLogAuditScanSEO,
    ItemDataLogAudits,
} from "@swift/types/boostSEO";
import { getStringNoDataLogAudits } from "@swift/utils/funcSupportSeo";
import { useField } from "formik";
import { memo, useContext } from "react";
import { useTranslation } from "react-i18next";
import DataLogAuditScanSEO from "../DataLogAuditScanSEO";
import {
    EleFormErrorFormatCompetitor,
    EleLoadingScanCompetitor,
    EleNodataCompetitor,
    EleUpgradePlan,
} from "./ElementSupport";
import { WebsiteScanContext } from "../../contexts/websiteScan";

export const RenderCompetitorAuditWithoutData = memo(function _({
    isScanCCompetitorSEO,
    isShowCompetitor,
}: {
    isScanCCompetitorSEO: boolean;
    isShowCompetitor: boolean;
}) {
    const [, meta] = useField("currentUrl");

    const { isAllowPlan } = useContext(WebsiteScanContext);

    if (!isShowCompetitor) return <></>;

    if (!isAllowPlan) return <EleUpgradePlan />;

    if (isScanCCompetitorSEO)
        return (
            <div
                className={`p-5 CheckListProblemScanSEO__problem-competitor flex-1`}
            >
                <EleLoadingScanCompetitor />
            </div>
        );

    if (meta.error && meta.error.includes(`${REGEX_URL}`)) {
        return <EleFormErrorFormatCompetitor />;
    }

    return <EleNodataCompetitor />;
});

export const RenderCompetitorAudit = ({
    status,
    list,
}: {
    status: EStatusDataLogAuditScanSEO;
    list: ItemDataLogAudits[];
}) => {
    const { t } = useTranslation();

    const titleNodata = getStringNoDataLogAudits(status);

    return (
        <div
            className={`p-5 CheckListProblemScanSEO__problem-competitor flex-1`}
        >
            <DataLogAuditScanSEO
                status={status}
                listData={list}
                titleNoData={t(titleNodata)}
            />
        </div>
    );
};
