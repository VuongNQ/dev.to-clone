import { Button, ChoiceList, Collapsible, Icon } from "@shopify/polaris";
import {
  AlertMinor,
  ChevronDownMinor,
  ChevronUpMinor,
} from "@shopify/polaris-icons";
import FeaturesUseAccordingPlan, {
  IRefFeaturesUseAccordingPlan,
} from "@swift/components/FeaturesUseAccordingPlan";
import usePlanPricing from "@swift/hooks/usePlanPricing";
import {
  EKeyAutoOptimizeSetting,
  IAutoOptimizeSetting,
} from "@swift/types/general";
import { useField } from "formik";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ACCEPT_PLANS_AUTO_OPTIMIZE,
  OPTION_FEATURE_OPTIMIZE,
} from "../../constant";
import "./styles.scss";

function FormAutoOptimizeTheme() {
  const { t } = useTranslation();

  const { isAllowPlan, isSkipTrial } = usePlanPricing({
    listPLanAllow: ACCEPT_PLANS_AUTO_OPTIMIZE,
  });

  const refFeaturesUseAccordingPlan =
    useRef<IRefFeaturesUseAccordingPlan>(null);

  const [fieldActive, , helpersActive] = useField<boolean>(
    `${EKeyAutoOptimizeSetting.auto_optimize_theme}`
  );
  const [fieldSettingTheme, metaSettingTheme, helpersSettingTheme] = useField<
    IAutoOptimizeSetting[EKeyAutoOptimizeSetting.setting_theme]
  >(`${EKeyAutoOptimizeSetting.setting_theme}`);

  const [isOpenSetting, setIsOpenSetting] = useState(false);

  const onToggleOpenSetting = useCallback(() => {
    if (!isAllowPlan || !isSkipTrial) {
      refFeaturesUseAccordingPlan.current?.onActionPrimary();
      return;
    }

    setIsOpenSetting((preValue) => !preValue);
  }, [isAllowPlan, isSkipTrial]);

  const onToggleActive = useCallback(() => {
    const isActive = !fieldActive.value;

    helpersActive.setValue(!fieldActive.value);
    if (isActive) {
      setIsOpenSetting(true);
    }
  }, [fieldActive.value, helpersActive]);

  const elmFormChooseSetting = useMemo(() => {
    if (!isAllowPlan || !isSkipTrial) return <></>;
    
    return (
      <Collapsible
        open={isOpenSetting}
        id="basic-collapsible"
        transition={{
          duration: "500ms",
          timingFunction: "ease-in-out",
        }}
        expandOnPrint
      >
        <div className="FormAutoOptimizeTheme__list-choice pt-5">
          <ChoiceList
            title=""
            disabled={!fieldActive.value}
            allowMultiple
            choices={OPTION_FEATURE_OPTIMIZE}
            selected={(fieldSettingTheme.value as string[]) || []}
            onChange={(value) => {
              helpersSettingTheme.setValue(value);
            }}
          />
          {metaSettingTheme.error && (
            <p className="global__error-message pt-5">
              <Icon source={AlertMinor} color="critical" />
              {t(metaSettingTheme.error || "")}
            </p>
          )}
        </div>
      </Collapsible>
    );
  }, [fieldActive.value, fieldSettingTheme.value, helpersSettingTheme, isAllowPlan, isOpenSetting, isSkipTrial, metaSettingTheme.error, t]);

  const elmDomEleHeader = useMemo(() => {
    return (
      <>
        <div className={`flex items-center justify-between gap-5`}>
          <div className="flex items-center gap-3 flex-1">
            {/* <img src={iconAutoOptimizeTheme} alt="" /> */}
            <h4 className="cursor-pointer" onClick={onToggleOpenSetting}>
              {t("optimize_theme.auto_optimize.title")}
            </h4>
            <div style={{ color: "var(--p-icon-critical)" }}>
              <Button
                // loading={isLoadFetchData}
                outline={fieldActive.value}
                size="slim"
                monochrome
                primary={!fieldActive.value}
                onClick={() => {
                  refFeaturesUseAccordingPlan.current?.onActionPrimary();
                }}
                // disabled={!isAcceptPlanCurrent}
              >
                {fieldActive.value
                  ? t("common.btn_de_active")
                  : t("common.btn_active")}
              </Button>
            </div>
          </div>
          <Button
            onClick={onToggleOpenSetting}
            plain
            icon={isOpenSetting ? ChevronUpMinor : ChevronDownMinor}
          ></Button>
        </div>
        {elmFormChooseSetting}
      </>
    );
  }, [
    elmFormChooseSetting,
    fieldActive.value,
    isOpenSetting,
    onToggleOpenSetting,
    t,
  ]);

  return (
    <FeaturesUseAccordingPlan
      ref={refFeaturesUseAccordingPlan}
      className="sw__wp-box p-5"
      listPLanAllow={ACCEPT_PLANS_AUTO_OPTIMIZE}
      contentUpGrade={t("optimize_theme.auto_optimize.upgrade")}
      onActionPrimary={onToggleActive}
      eleHeader={elmDomEleHeader}
      isMustSkipTrial={true}
    />
  );
}

export default FormAutoOptimizeTheme;
