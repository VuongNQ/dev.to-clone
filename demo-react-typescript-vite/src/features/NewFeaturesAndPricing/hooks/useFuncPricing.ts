import {
  INIT_DATA_PLAN_STORE,
  PLAN_PRICING,
} from "@swift/constants/constantPlanPricing";
import { useAppSelector } from "@swift/hooks";
import { getPricingStore } from "@swift/store/global";
import { ModalBaseInfoType } from "@swift/types/general";
import { IntervalPricingType, PlanType } from "@swift/types/planPricing";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

export const useFuncPricing = () => {
  const pricingStore = useAppSelector(getPricingStore);

  const { t } = useTranslation();

  const txtUnitPriceMonth = useMemo(
    () => `USD/${t("new_pricing_page.common.text_month")}`,
    [t]
  );

  const txtUnitPriceAnnual = useMemo(
    () => `USD/${t("new_pricing_page.common.text_year")}`,
    [t]
  );

  const txtUnitPriceTicket = useMemo(
    () => t("new_pricing_page.common.unit_ticket"),
    [t]
  );

  const txtUnitPricePlanFee = useMemo(
    () => t("new_pricing_page.common.txt_free_forever"),
    [t]
  );

  const titleCurrentPlan = useMemo(
    () => t("new_pricing_page.common.btn_current_plan"),
    [t]
  );

  const titleGetStarted = useMemo(
    () => t("new_pricing_page.common.btn_get_started"),
    [t]
  );

  const titleSwitchMonthly = useMemo(
    () => t("new_pricing_page.common.btn_swich_monthly"),
    [t]
  );

  const titleSwitchAnnual = useMemo(
    () => t("new_pricing_page.common.btn_swich_annual"),
    [t]
  );

  const titleOneTimeCharge = useMemo(
    () => t("new_pricing_page.common.text_one_time"),
    [t]
  );

  const titleDowngrade = useMemo(() => t("common.btn_downgrade"), [t]);

  const titleTrialPlan = useMemo(
    () =>
      t("common.btn_get_trial", {
        numberDay:
          typeof pricingStore.trial_days === "number"
            ? pricingStore.trial_days
            : INIT_DATA_PLAN_STORE.trial_days,
      }),
    [t, pricingStore.trial_days]
  );

  const handleReturnContentModalConfirmDownPlan = useCallback(
    ({
      planNameCharge,
    }: {
      planNameCharge: PlanType;
    }): Omit<ModalBaseInfoType, "onPrimaryAction" | "onSecondaryAction"> => {
      return {
        title_header: t("new_pricing_page.modal_confirm_downgrade.title_head", {
          plan_name: t(PLAN_PRICING[planNameCharge].title),
        }),
        des: t("new_pricing_page.modal_confirm_downgrade.des"),
        titleSecondaryAction: t("new_pricing_page.common.btn_not_now"),
        titlePrimaryAction: t("common.btn_downgrade"),
      };
    },
    [t]
  );

  const handleReturnContentModalCheckPlan = useCallback(
    ({
      planName,
    }: {
      planName: PlanType;
    }): Omit<ModalBaseInfoType, "onPrimaryAction" | "onSecondaryAction"> => {
      return {
        title_header: t("modal.pricing.check_plan.title", {
          planName: t(PLAN_PRICING[planName].title),
        }),
        des: t("modal.pricing.check_plan.des"),
        titlePrimaryAction: t("common.btn_got_it"),
      };
    },
    [t]
  );
  const handleReturnContentModalSwitchPlan = useCallback(
    ({
      interval,
    }: {
      planName: PlanType;
      interval: IntervalPricingType;
    }): Omit<ModalBaseInfoType, "onPrimaryAction" | "onSecondaryAction"> => {
      const titleDes =
        interval === IntervalPricingType.monthly
          ? t("new_pricing_page.modal_switch_interval.des_annual_to_month")
          : t("new_pricing_page.modal_switch_interval.des_month_to_annual");

      return {
        title_header: t("new_pricing_page.modal_switch_interval.title_head"),
        des: titleDes,
        titlePrimaryAction: t("common.btn_accept"),
      };
    },
    [t]
  );

  return {
    txtUnitPriceMonth,
    txtUnitPriceAnnual,
    txtUnitPriceTicket,
    txtUnitPricePlanFee,
    titleCurrentPlan,
    titleGetStarted,
    titleSwitchMonthly,
    titleSwitchAnnual,
    titleDowngrade,
    titleTrialPlan,
    titleOneTimeCharge,
    handleReturnContentModalConfirmDownPlan,
    handleReturnContentModalCheckPlan,
    handleReturnContentModalSwitchPlan,
  };
};
