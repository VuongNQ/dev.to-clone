import { Button, Text } from "@shopify/polaris";
import { PLAN_PRICING } from "@swift/constants/constantPlanPricing";
import { useAppSelector } from "@swift/hooks";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import { customerData } from "@swift/store/global";
import { isExistInArray } from "@swift/utils/arrayFunc";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ACCEPT_PLANS_SITEMAP } from "../../constants";
import { PlanType } from "@swift/types/planPricing";

const SectionUpGradePlan = memo(function _({
  onOpenModalCheckPlan,
}: IPropsSectionUpGradePlan) {
  const { t } = useTranslation();

  const customer = useAppSelector(customerData);

  const { onRedirectApp } = useFuncRedirect();

  /**handle confirm and redirect upgrade plan */
  const onUpgrade = useCallback(async () => {
    const isAcceptPlan = isExistInArray(
      customer?.app_plan || PlanType.free,
      ACCEPT_PLANS_SITEMAP
    );

    if (!isAcceptPlan) return onRedirectApp("/pricing");

    onOpenModalCheckPlan();
  }, [  customer?.app_plan, onOpenModalCheckPlan, onRedirectApp]);
  /**end handle confirm and redirect upgrade plan */

  return (
    <div className="flex gap-5 items-start">
      <div className="flex-1">
        <div className="pb-2">
          <Text as="h3" variant="headingMd">
            {t("smartSEO.site_map.plan_not_use.title")}
          </Text>
        </div>
        <Text as="p" variant="bodyMd" color="subdued">
          {t("smartSEO.site_map.plan_not_use.des")}
        </Text>
      </div>
      <Button onClick={onUpgrade} primary>
        {t("common.btn_get_upgrade", {
          planName: t(PLAN_PRICING.basic.title),
        })}
      </Button>
    </div>
  );
});

interface IPropsSectionUpGradePlan {
  onOpenModalCheckPlan: () => void;
}

export default SectionUpGradePlan;
