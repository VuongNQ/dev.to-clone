import { Badge, Button, Icon, IconProps, Text, Tooltip } from "@shopify/polaris";
import { CircleAlertMajor, CircleCancelMinor, CircleTickMajor } from "@shopify/polaris-icons";
import imgNodataCompetitor from "@swift/assets/images/basicSeo/no-data-competitor.png";
import iconCompetitor from "@swift/assets/svg/basicSEO/icon-competitor.svg";
import SkeletonBasic from "@swift/components/UIs/Skeletons/SkeletonBasic";
import { useAppSelector } from "@swift/hooks";
import { customerData } from "@swift/store/global";
import { StatusScanSEOType } from "@swift/types/boostSEO";
import { statusBadgeScore } from "@swift/utils/funcSupportSeo";
import { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { WebsiteScanContext } from "../../contexts/websiteScan";

export const EleNodataCompetitor = () => {
    const { t } = useTranslation();
    return (
        <div className="CheckListProblemScanSEO__no-data CheckListProblemScanSEO__problem-competitor py-10 px-5 text-center">
            <img src={imgNodataCompetitor} alt="" />
            <Text as="p" variant="bodyMd" color="subdued">
                {t("smartSEO.web_scan.txt_no_data_competitor")}
            </Text>
        </div>
    );
};

/** element validate error wrong format url */
export const EleFormErrorFormatCompetitor = () => {
    const { t } = useTranslation();
    return (
        <div className="CheckListProblemScanSEO__no-data CheckListProblemScanSEO__problem-competitor py-10 px-5 text-center">
            <img src={imgNodataCompetitor} alt="" />
            <Text as="p" variant="bodyMd" color="subdued">
                {t("boostSEO.competitor.input_validate_format_url")}
            </Text>
        </div>
    );
};
/** end element validate error wrong format url */

export const EleLoadingScanCompetitor = () => (
    <div className={`flex flex-col gap-2`}>
        {[...Array(3)].map((_, index) => (
            <div className="flex gap-5" key={index}>
                <SkeletonBasic shape="circle" width="20px" />
                <div className="flex flex-col gap-3 flex-1">
                    <SkeletonBasic shape="square" height="8px" />
                    <SkeletonBasic shape="square" height="8px" width="100%" />
                </div>
            </div>
        ))}
    </div>
);

export const EleNodataStore = () => {
    const { t } = useTranslation();
    return (
        <div className="CheckListProblemScanSEO__no-data py-10 px-5 text-center flex-1">
            <img src={imgNodataCompetitor} alt="" />
            <Text as="p" variant="bodyMd" color="subdued">
                {t("smartSEO.web_scan.txt_no_data")}
            </Text>
        </div>
    );
};

export const EleUpgradePlan = () => {
    const { t } = useTranslation();

    const customer = useAppSelector(customerData);

    const { isAllowPlan } = useContext(WebsiteScanContext);

    const navigate = useNavigate();

    /**handle confirm and redirect upgrade plan */
    const onUpgrade = useCallback(async () => {
        if (!isAllowPlan) return navigate("/pricing");
    }, [customer?.app_plan, isAllowPlan]);
    /**end handle confirm and redirect upgrade plan */

    return (
        <div className="CheckListProblemScanSEO__no-data CheckListProblemScanSEO__problem-competitor py-10 px-5 text-center">
            <img src={imgNodataCompetitor} alt="" />
            <Text as="p" variant="bodyMd" color="subdued">
                {t("smartSEO.web_scan.des_upgrade")}
            </Text>
            <div className="pt-4">
                <Button onClick={onUpgrade} primary>
                    {t("common.btn_upgrade")}
                </Button>
            </div>
        </div>
    );
};

export const EleBannerCompare = () => {
    const { t } = useTranslation();

    const customer = useAppSelector(customerData);

    const { dataScanStore, dataScanCompetitor, isLoadingOnScanCompetitor, isShowCompetitor } =
        useContext(WebsiteScanContext);

    const isScanCCompetitorSEO =
        isLoadingOnScanCompetitor || dataScanCompetitor.statusScan === StatusScanSEOType.scanning;

    const {
        scorePoor: scoreCompetitorPoor,
        scoreGood: scoreCompetitorGood,
        scoreFair: scoreCompetitorFair,
        scoreTotal: scoreCompetitorTotal,
    } = dataScanCompetitor.scoresSEO;

    const { scorePoor, scoreGood, scoreFair, scoreTotal } = dataScanStore.scoresSEO;

    const listScore = [
        {
            icon: CircleCancelMinor,
            score: scorePoor,
            colorStatus: "critical" as IconProps["color"],
        },
        {
            icon: CircleAlertMajor,
            score: scoreFair,
            colorStatus: "warning" as IconProps["color"],
        },
        {
            icon: CircleTickMajor,
            score: scoreGood,
            colorStatus: "success" as IconProps["color"],
        },
    ];
    const listScoreCompetitor = listScore.map((item) => {
        const score =
            item.colorStatus === "critical"
                ? scoreCompetitorPoor
                : item.colorStatus === "warning"
                ? scoreCompetitorFair
                : scoreCompetitorGood;
        return { ...item, score };
    });

    if (isScanCCompetitorSEO || !isShowCompetitor || !dataScanCompetitor.dataAudits) return <></>;

    return (
        <div className="CheckListProblemScanSEO__top flex gap-5 p-5">
            <div className="CheckListProblemScanSEO__wp-score flex gap-5 justify-end">
                <img className="CheckListProblemScanSEO__img-compare flex-1" src={iconCompetitor} alt="" />

                <div className="CheckListProblemScanSEO__box-score p-3 flex flex-col gap-3">
                    <Text alignment="end" fontWeight="medium" as="span" variant="bodyMd">
                        {t("smartSEO.web_scan.banner_compare.store_title")}
                    </Text>
                    <Tooltip content={customer?.shopify_domain}>
                        <div className="CheckListProblemScanSEO__url txt-one-line">
                            <Text alignment="end" as="span" variant="bodySm" color="subdued">
                                {customer?.shopify_domain}
                            </Text>
                        </div>
                    </Tooltip>
                    <div className="flex justify-end">
                        <Badge size="large-experimental" status={statusBadgeScore(scoreTotal)}>
                            {`${scoreTotal}`}
                        </Badge>
                    </div>
                    <div className="flex gap-5 justify-end flex-wrap">
                        {listScore.map((item, index) => (
                            <span className="flex gap-1 items-center" key={index}>
                                <Icon source={item.icon} color={item.colorStatus} />
                                {`${item.score}`}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 text-center justify-evenly">
                <Text alignment="center" as="span" variant="bodySm" color="subdued">
                    VS
                </Text>
                <Text alignment="center" as="span" variant="bodySm" color="subdued">
                    {t("smartSEO.web_scan.banner_compare.txt_score")}
                </Text>
                <Text alignment="center" as="span" variant="bodySm" color="subdued">
                    {t("smartSEO.web_scan.banner_compare.txt_issue")}
                </Text>
            </div>

            <div className="CheckListProblemScanSEO__wp-score  flex gap-5">
                <div className="CheckListProblemScanSEO__box-score p-3 flex flex-col gap-3">
                    <Text alignment="start" fontWeight="medium" as="span" variant="bodyMd">
                        {t("smartSEO.web_scan.banner_compare.competitor_title")}
                    </Text>
                    <Tooltip content={dataScanCompetitor.currentUrl}>
                        <div className="CheckListProblemScanSEO__url txt-one-line">
                            <Text alignment="start" as="span" variant="bodySm" color="subdued">
                                {dataScanCompetitor.currentUrl}
                            </Text>
                        </div>
                    </Tooltip>

                    <div className="flex justify-start">
                        <Badge
                            size="large-experimental"
                            status={statusBadgeScore(scoreCompetitorTotal)}
                        >{`${scoreCompetitorTotal}`}</Badge>
                    </div>
                    <div className="flex gap-5 justify-start flex-wrap">
                        {listScoreCompetitor.map((item, index) => (
                            <span className="flex gap-1 items-center" key={index}>
                                <Icon source={item.icon} color={item.colorStatus} />
                                {`${item.score}`}
                            </span>
                        ))}
                    </div>
                </div>
                <img className="CheckListProblemScanSEO__img-compare flex-1" src={iconCompetitor} alt="" />
            </div>
        </div>
    );
};
