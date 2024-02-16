import {
    DataFilterLogAudit,
    EStatusDataLogAuditScanSEO,
    ItemAuditsType,
    ItemDataLogAudits,
    ItemDetailLogsType,
    ScoresSEOType,
    TypePageSEOType,
} from "@swift/types/boostSEO";

export const colorTotalScore = (scoreTotal: number) => {
    if (scoreTotal == 0) return "#E8E8EA";
    if (scoreTotal <= 49) {
        return "#E51C00";
    }
    if (scoreTotal <= 89) {
        return "#FFE600";
    }
    if (scoreTotal <= 100) {
        return "#29845A";
    }

    return "#F2416A";
};

export const statusBadgeScore = (scoreTotal: number) => {
    if (scoreTotal <= 49) {
        return "critical";
    }
    if (scoreTotal <= 89) {
        return "warning";
    }
    if (scoreTotal <= 100) {
        return "success";
    }

    return "critical";
};

export const handleReturnScoresSEO = (
    key: TypePageSEOType,
    detailLogs: { [K in TypePageSEOType]?: ItemDetailLogsType }
): ScoresSEOType => {
    const pageUrl = detailLogs[`${key}`];
    if (!pageUrl) {
        return {
            scoreTotal: 0,
            scoreFair: 0,
            scoreGood: 0,
            scorePoor: 0,
            scorePerformance: 0,
        };
    }

    return {
        scoreTotal: pageUrl.score,
        scoreFair: pageUrl.number_of_fair_scores,
        scoreGood: pageUrl.number_of_good_scores,
        scorePoor: pageUrl.number_of_poor_scores,
        scorePerformance: pageUrl.performance_score || 0,
    };
};

export const contentScore = (scoreTotal: number) => {
    if (scoreTotal === 0) {
        return "boostSEO.page_home.list_title_score.0";
    }

    if (scoreTotal <= 49) {
        return "boostSEO.page_home.list_title_score.1";
    }
    if (scoreTotal <= 89) {
        return "boostSEO.page_home.list_title_score.2";
    }
    if (scoreTotal <= 100) {
        return "boostSEO.page_home.list_title_score.3";
    }
};

/** handle set data log audits  */
export const handleReturnDataLogAudits = ({
    dataAudits,
    key,
}: // callbackFixImgAlt,
// callbackMetaDescription,
IHandleReturnDataLogAudits): DataFilterLogAudit => {
    let listCriticalIssues: ItemDataLogAudits[] = [];
    let listImprovement: ItemDataLogAudits[] = [];
    let listPassedAudits: ItemDataLogAudits[] = [];
    let listManualCheck: ItemDataLogAudits[] = [];

    if (dataAudits && Object.keys(dataAudits).length !== 0) {
        const listDataAudit = dataAudits[key];
        if (listDataAudit) {
            listDataAudit.forEach((item) => {
                const dataItemAudit: ItemDataLogAudits = item;
                dataItemAudit.description = handleReturnDescriptionHaveLink(
                    dataItemAudit.description
                );

                if (typeof dataItemAudit.score !== "number") {
                    listManualCheck = [...listManualCheck, dataItemAudit];
                    console.log("dataItemAudit", dataItemAudit);
                } else if (dataItemAudit.score >= 1) {
                    listPassedAudits = [...listPassedAudits, dataItemAudit];
                } else if (dataItemAudit.score > 0 && dataItemAudit.score < 1) {
                    listImprovement = [...listImprovement, dataItemAudit];
                } else {
                    // if (dataItemAudit.id === "image-alt") {
                    // 	dataItemAudit.onFix = () => {
                    // 		callbackFixImgAlt && callbackFixImgAlt();
                    // 	};
                    // }

                    // if (dataItemAudit.id === "meta-description") {
                    // 	dataItemAudit.onFix = () => {
                    // 		callbackMetaDescription && callbackMetaDescription();
                    // 	};
                    // }
                    listCriticalIssues = [...listCriticalIssues, dataItemAudit];
                }
            });
        }
    }

    return {
        criticalIssues: listCriticalIssues,
        improvement: listImprovement,
        passedAudits: listPassedAudits,
        manualCheck: listManualCheck,
    };
};
/** end handle set data log audits  */

const handleReturnDescriptionHaveLink = (str: string) => {
    return str.replace(/(\[(?:\[??[^[]*?\)))/gm, (str) => {
        const content = str.match(/\[(.*?)\]/gm) || "";
        const link = str.match(/\((.*?)\)/gm) || "";
        return `<a target="_blank" href="${link[0]
            .replace("(", "")
            .replace(")", "")}">${content[0]
            .replace("[", "")
            .replace("]", "")}</a>`;
    });
};

export const getStringNoDataLogAudits = (
    status: EStatusDataLogAuditScanSEO
) => {
    let string = ``;

    if (status === EStatusDataLogAuditScanSEO.undefined) {
        string = `smartSEO.web_scan.no_data_manual_check`;
    }

    if (status === EStatusDataLogAuditScanSEO.critical) {
        string = `smartSEO.web_scan.no_data_must_fix`;
    }

    if (status === EStatusDataLogAuditScanSEO.warning) {
        string = `smartSEO.web_scan.no_data_improve`;
    }

    if (status === EStatusDataLogAuditScanSEO.success) {
        string = `smartSEO.web_scan.no_data_good`;
    }
    // console.log('status',status,string)
    return string;
};
interface IHandleReturnDataLogAudits {
    dataAudits: { [K in TypePageSEOType]?: ItemAuditsType[] } | null;
    key: TypePageSEOType;
    callbackFixImgAlt?: () => void;
    callbackMetaDescription?: () => void;
}
