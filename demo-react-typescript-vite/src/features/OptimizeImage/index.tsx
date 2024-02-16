import { Button, List, Text } from "@shopify/polaris";
import ModalBuyMore from "@swift/components/ModalBuyMore";
import ModalSkipTrial from "@swift/components/ModalSkipTrial";
import { PLAN_PRICING } from "@swift/constants/constantPlanPricing";
import { useAppSelector } from "@swift/hooks";
import {
    getPricingStore
} from "@swift/store/global";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import bannerUpgrade from "./assets/banner-upgrade.webp";
import IconHighlight from "./assets/icon-highlight.svg";
import AutoOptimize from "./components/AutoOptimize";
import BlockDetail from "./components/BLockInfo";
import ListImage from "./components/ListImage";
import { ModalRestore, ModalWarningOptimization } from "./components/Modal";
import { OptimizeImageContext } from "./context/optimizeImage";
import { useOptimize } from "./hooks/useOptimize";
import "./styles.scss";

const OptimizeImages = () => {
    const optimizeImageContextInit = useOptimize();

    return (
        <OptimizeImageContext.Provider value={optimizeImageContextInit}>
            <OptimizeImagesContainer />
            <ModalBuyMore
                type="image"
                ref={optimizeImageContextInit.refModalBuyMore}
            />
            <ModalSkipTrial ref={optimizeImageContextInit.refModalSkipTrial} />
            <ModalRestore ref={optimizeImageContextInit.refModalRestore} />
            <ModalWarningOptimization
                type={optimizeImageContextInit.typeModalWarning}
                ref={optimizeImageContextInit.refModalWarningLimited}
            />
        </OptimizeImageContext.Provider>
    );
};

const OptimizeImagesContainer = () => {
    const { t } = useTranslation();

    const { isPlanBlocked } = useContext(OptimizeImageContext);

    return (
        <section className={`optimize-image ${isPlanBlocked ? "disable" : ""}`}>
            <div
                className={`optimize-image__detail flex flex-col gap-5 ${
                    isPlanBlocked ? "disable" : ""
                }`}
            >
                <BlockDetail />
                <div className="optimize-image__detail-notification inline-flex items-center gap-2">
                    <img src={IconHighlight} />
                    <Text as="p">
                        {t("optimize_image.banner_warning_sync.title")}
                    </Text>
                </div>
                <AutoOptimize />
                <ListImage />
            </div>
            {isPlanBlocked ? <SectionUpgradePlan /> : null}
        </section>
    );
};

const SectionUpgradePlan = () => {
    const { t } = useTranslation();

    const customerPlan = useAppSelector(getPricingStore);

    const navigate = useNavigate();

    const textPlanFree = !customerPlan.trial_days
        ? t("common.btn_get_upgrade", {
              planName: t(PLAN_PRICING.basic.title),
          })
        : t("common.btn_get_trial", { numberDay: customerPlan.trial_days });

    return (
        <div className="optimize-image__banner-upgrade flex justify-center items-center">
            <div
                className={`optimize-image__banner-upgrade__detail flex-col flex`}
            >
                <img src={bannerUpgrade} />
                <div className="flex flex-col p-5">
                    <Text as="h2" variant="headingLg" alignment="center">
                        {t("optimize_image.banner.free.description.title")}
                    </Text>
                    <Text as="p" alignment="center">
                        {t("optimize_image.banner.free.description.content")}
                    </Text>
                    <List type="bullet">
                        <List.Item>
                            <Text as="span" color="subdued">
                                {t(
                                    "optimize_image.banner.free.description.highlight_first"
                                )}
                            </Text>
                        </List.Item>
                        <List.Item>
                            <Text as="span" color="subdued">
                                {t(
                                    "optimize_image.banner.free.description.highlight_second"
                                )}
                            </Text>
                        </List.Item>
                    </List>
                    <div className="inline">
                        <Button primary onClick={() => navigate("/pricing")}>
                            {t(textPlanFree)}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OptimizeImages;
