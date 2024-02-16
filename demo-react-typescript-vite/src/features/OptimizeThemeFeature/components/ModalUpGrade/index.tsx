import { Button, Text } from "@shopify/polaris";
import { PLAN_PRICING } from "@swift/constants/constantPlanPricing";
import { useAppSelector } from "@swift/hooks";
import { getPricingStore } from "@swift/store/global";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import imgBannerOptimizeTheme from "../../assets/img-upgrade.png";
import "./styles.scss";

function ModalUpGrade() {
  const { t } = useTranslation();

  const pricingStore = useAppSelector(getPricingStore);

  const navigate = useNavigate();

  const contentBtn = useMemo(
    () =>
      pricingStore.trial_days && pricingStore.trial_days > 0
        ? t("common.btn_get_trial", {
            numberDay: pricingStore.trial_days,
          })
        : t("common.btn_get_upgrade", {
            planName: t(PLAN_PRICING.basic.title),
          }),
    [pricingStore.trial_days, t]
  );

  return (
    <div
      className="ModalUpGrade ModalUpGrade__modal-zoom"
      style={{
        display: "flex",
      }}
    >
      <div className="ModalUpGrade__wp ">
        <img src={imgBannerOptimizeTheme} alt="" />

        <div className="flex flex-col gap-3 p-5 items-center">
          <div className="flex flex-col gap-2">
            <Text alignment="center" as="h2" variant="headingLg">
              {t("optimize_theme.modal_upgrade.title")}
            </Text>
            <Text alignment="center" as="h2" variant="bodyMd">
              {t("optimize_theme.modal_upgrade.des")}
            </Text>
          </div>
          <Button
            onClick={() => {
              navigate("/pricing");
            }}
            primary
          >
            {contentBtn}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ModalUpGrade;
