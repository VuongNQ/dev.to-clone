import iconModalSuccess from "@swift/assets/svg/modal/success.svg";
import { PLAN_PRICING } from "@swift/constants/constantPlanPricing";
import { ModalBaseInfoType } from "@swift/types/general";
import { PlanType } from "@swift/types/planPricing";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import iconModalWarning from "@swift/assets/svg/modal/warning.svg";

export function useModalGeneral() {
  const { t } = useTranslation();

  /** modal check plan */
  const returnModalCheckPlan = useCallback(
    (plan: PlanType): ModalBaseInfoType => {
      return {
        title_header: t("modal.pricing.check_plan.title_head"),
        title: t("modal.pricing.check_plan.title", {
          planName: t(PLAN_PRICING[plan].title),
        }),
        icon: iconModalSuccess,
        des: t("modal.pricing.check_plan.des"),
        titlePrimaryAction: t("common.btn_got_it"),
      };
    },
    [t]
  );
  /** modal check plan */

  /** modal skip trial*/
  const returnModalSkipTrial = useCallback(
    (plan: PlanType): ModalBaseInfoType => {
      return {
        title_header: t("modal.pricing.skip_trial.title_head", {
          planName: t(PLAN_PRICING[plan].title),
        }),
        des: t("modal.pricing.skip_trial.des"),
        icon: iconModalWarning,
        titlePrimaryAction: t("common.btn_skip"),
        titleSecondaryAction: t("common.btn_cancel"),
      };
    },
    [t]
  );
  /** modal skip trial*/

  return {
    returnModalCheckPlan,
    returnModalSkipTrial,
  };
}
