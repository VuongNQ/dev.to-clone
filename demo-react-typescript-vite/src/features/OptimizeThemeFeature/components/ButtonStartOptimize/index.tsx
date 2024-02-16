import { Button } from "@shopify/polaris";
import { LockMinor } from "@shopify/polaris-icons";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import { KeyOptimzie } from "@swift/types/optimizeTheme";
import { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { OptimizeThemeContext } from "../../contexts/OptimizeThemeContext";
import "./styles.scss";
import iconSuccess from "../../assets/icon-success.png";
import usePlanPricing from "@swift/hooks/usePlanPricing";

function ButtonStartOptimize({
  isUseTrial,
  step,
  onClickStep,
  isLoadingClickStep,
  isDisabledClickStep = false,
  isUpgrade,
}: IPropsButtonStartOptimize) {
  const { t } = useTranslation();

  const { onRedirectApp } = useFuncRedirect();

  const { isSkipTrial } = usePlanPricing({});

  const {
    isAcceptUseOptimizeTheme,
    dataProgress,
    stepRunning,
    dataOptimize,
    isLimitTheme,
  } = useContext(OptimizeThemeContext);

  const isLockStartNow = useMemo(() => {
    if (!isSkipTrial && isAcceptUseOptimizeTheme) return true;

    return false;
  }, [isAcceptUseOptimizeTheme, isSkipTrial]);

  const isDisableBtnStart = useMemo(() => {
    //disable when plan not use feature
    if (!isAcceptUseOptimizeTheme) {
      return true;
    }

    // disable when limit theme
    if (isLimitTheme && !dataOptimize?.data?.optimized_theme_id) {
      return true;
    }

    //disable when have step failed
    if (dataProgress && dataProgress.stepFailed.length) {
      return true;
    }

    if (stepRunning.length) return true;

    /** disable when lock start now */
    if (!isUseTrial && isLockStartNow) {
      return true;
    }

    return false;
  }, [
    isAcceptUseOptimizeTheme,
    isLimitTheme,
    dataOptimize?.data?.optimized_theme_id,
    dataProgress,
    stepRunning.length,
    isUseTrial,
    isLockStartNow,
  ]);

  /* handle check step in listStepProgress in redux  */
  const isLoadingBtnStart = useMemo(() => {
    if (dataOptimize && dataOptimize?.isLoading) return true;

    if (stepRunning.length && stepRunning === step && isLoadingClickStep) {
      return true;
    }

    /**only loading when step running */
    if (stepRunning.length && stepRunning === step) {
      return true;
    }

    return false;
  }, [dataOptimize, stepRunning, step, isLoadingClickStep]);

  /**check step success*/
  const isStepSuccess = useMemo(() => {
    const findStep =
      dataProgress &&
      dataProgress.listStepSuccess.find((item) => item === step);

    if (findStep) return true;

    return false;
  }, [dataProgress, step]);
  /**end check step success*/

  const eleButtonUpGrade = useMemo(() => {
    return (
      <div className="ButtonStartOptimize__wp-button flex flex-col">
        <Button
          primary
          size="slim"
          outline={isLoadingBtnStart}
          onClick={() => {
            onRedirectApp("/pricing");
          }}
          loading={isLoadingBtnStart}
          // disabled={isDisableStepInListProgress(payload)}
        >
          {t("common.btn_upgrade")}
        </Button>
      </div>
    );
  }, [t, isLoadingBtnStart]);

  const eleButtonSuccess = useMemo(() => {
    return <img src={iconSuccess} alt="" />;
  }, []);

  const eleButtonLock = useMemo(() => {
    return (
      <div className="flex flex-col items-stretch w-100">
        <Button
          size="slim"
          outline
          loading={isLoadingBtnStart}
          disabled
          icon={LockMinor}
        >
          {t("optimize_theme.btn_lock")}
        </Button>
      </div>
    );
  }, [t, isLoadingBtnStart]);

  const eleButtonStart = useMemo(
    () => (
      <div
        className="flex flex-col items-stretch  w-100"
        style={{ color: "#0A855C" }}
      >
        <Button
          size="slim"
          monochrome={!isLoadingBtnStart}
          outline
          onClick={onClickStep}
          loading={isLoadingBtnStart}
          disabled={isDisableBtnStart || isDisabledClickStep}
        >
          {t("optimize_theme.btn_start")}
        </Button>
      </div>
    ),
    [isLoadingBtnStart, onClickStep, isDisableBtnStart, isDisabledClickStep, t]
  );

  const eleDomMain = useMemo(() => {
    if (isUpgrade) return eleButtonUpGrade;

    if (isStepSuccess) return eleButtonSuccess;

    if (!isUseTrial && isLockStartNow) return eleButtonLock;

    return eleButtonStart;
  }, [
    isUpgrade,
    eleButtonUpGrade,
    isStepSuccess,
    eleButtonSuccess,
    isUseTrial,
    isLockStartNow,
    eleButtonLock,
    eleButtonStart,
  ]);

  return <div className="ButtonStartOptimize__button-task">{eleDomMain}</div>;
}
interface IPropsButtonStartOptimize {
  step: KeyOptimzie;
  isUseTrial: boolean;
  onClickStep: () => void;
  isLoadingClickStep: boolean;
  isDisabledClickStep?: boolean;
  isUpgrade?: boolean;
}

export default ButtonStartOptimize;
