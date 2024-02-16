import { ContextualSaveBar, SkeletonBodyText, Toast } from "@shopify/polaris";
import ModalConfirmChangeTabs from "@swift/components/UIs/ModalBase/ModalConfirmChangeTabs";
import { MESSAGE_PLAN_NOT_USE } from "@swift/constants/general";
import { useAppSelector } from "@swift/hooks";
import { useModalGeneral } from "@swift/hooks/useModalGeneral";
import { useNavigateBlocker } from "@swift/hooks/useNavigateBlocker";
import { queryKeys } from "@swift/queryKeys";
import { useOptimizeThemeService } from "@swift/services/optimizeThemeApi";
import { customerData } from "@swift/store/global";
import { IAutoOptimizeSetting, ModalBaseInfoType } from "@swift/types/general";
import { IntervalPricingType, PlanType } from "@swift/types/planPricing";
import { isExistInArray } from "@swift/utils/arrayFunc";
import { validationSchemaAutoOptimizeTheme } from "@swift/validation/validationOptimizeTheme";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ACCEPT_PLANS_AUTO_OPTIMIZE } from "../../constant";
import { OptimizeThemeContext } from "../../contexts/OptimizeThemeContext";
import FormAutoOptimizeTheme from "../FormAutoOptimizeTheme";
function AutoOptimizeTheme({
  onCloseModal,
  onOpenModal,
  setModalSetting,
}: IPropsAutoOptimizeTheme) {
  const { t } = useTranslation();

  const { returnModalCheckPlan } = useModalGeneral();

  const { getOptimizeThemeAutoSetting, postOptimizeThemeAutoSetting } =
    useOptimizeThemeService();

  const customer = useAppSelector(customerData);

  const { isAcceptUseOptimizeTheme } = useContext(OptimizeThemeContext);

  const isAcceptPlanCurrent = useMemo(
    () =>
      isExistInArray(
        customer?.app_plan || PlanType.free,
        ACCEPT_PLANS_AUTO_OPTIMIZE
      ),
    [customer?.app_plan]
  );

  const [toastMessage, setToastMessage] = useState<{
    isToast: boolean;
    message: string;
    isError?: boolean;
  }>({
    isToast: false,
    message: "",
    isError: false,
  });

  const {
    data: dataSetting,
    isInitialLoading: isLoadingDataSetting,
    refetch: refetchDataSetting,
  } = useQuery({
    ...queryKeys.optimizeTheme.getOptimizeThemeAutoSetting,
    enabled: isAcceptPlanCurrent,
    queryFn: async () => {
      const { data } = await getOptimizeThemeAutoSetting();

      return data;
    },
  });

  const [isDataChange, setIsDataChange] = useState(false);

  const { isBlocking, initBlockRefresh, confirmNavigate, cancelNavigate } =
    useNavigateBlocker(isDataChange && isAcceptPlanCurrent);

  const { mutate: onSaveSetting, isLoading: isLoadingOnSaveSetting } =
    useMutation({
      mutationFn: async (payload: Partial<IAutoOptimizeSetting>) => {
        return await postOptimizeThemeAutoSetting(payload);
      },
      onSuccess: (res) => {
        const { status, message, data } = res;

        if (status) {
          refetchDataSetting();
          setToastMessage({
            isToast: true,
            message: t("boostSEO.common.toast_message.toast_save_success"),
          });
          setIsDataChange(false);
        } else {
          const isPlanNotUse =
            message &&
            message
              .toLocaleLowerCase()
              .includes(MESSAGE_PLAN_NOT_USE.toLocaleLowerCase())
              ? true
              : false;
          if (isPlanNotUse) {
            const dataError = data as unknown as {
              plan: PlanType;
              interval: IntervalPricingType;
            };
            handleOpenCheckPlan(dataError.plan);
          }
        }
      },
    });

  /** data init for formik */
  const INIT_DATA: Partial<IAutoOptimizeSetting> = useMemo(
    () => ({
      auto_optimize_theme: dataSetting?.auto_optimize_theme || false,
      setting_theme: dataSetting?.setting_theme || [],
    }),
    [dataSetting?.auto_optimize_theme, dataSetting?.setting_theme]
  );
  /**end data init for formik */

  /** open modal using this plan */
  const handleOpenCheckPlan = useCallback(
    (plan: PlanType) => {
      const contentModal = returnModalCheckPlan(plan);
      setModalSetting({
        ...contentModal,
        onPrimaryAction: onCloseModal,
      });
      onOpenModal();
    },
    [onCloseModal, onOpenModal, returnModalCheckPlan, setModalSetting]
  );
  /** open modal using this plan */

  /** check change data vs data original */
  const handleCheckChangeData = useCallback(
    (value: Partial<IAutoOptimizeSetting>) => {
      const dataLocal = value;
      const isAlike = JSON.stringify(dataLocal) === JSON.stringify(INIT_DATA);
      setIsDataChange(!isAlike);
    },
    [INIT_DATA]
  );
  /**end check change data vs data original */

  useEffect(() => {
    if (isDataChange) return initBlockRefresh();
  }, [isDataChange]);

  const eleToastMessage = useMemo(
    () =>
      toastMessage.isToast ? (
        <Toast
          error={toastMessage.isError}
          content={t(toastMessage.message)}
          onDismiss={() => {
            setToastMessage({
              isToast: false,
              message: "",
            });
          }}
          duration={5000}
        />
      ) : null,
    [toastMessage]
  );

  if (isLoadingDataSetting)
    return (
      <div className="sw__wp-box p-5">
        <SkeletonBodyText lines={5} />
      </div>
    );

  if (!isAcceptUseOptimizeTheme) return <></>;

  return (
    <Formik
      initialValues={INIT_DATA}
      validationSchema={validationSchemaAutoOptimizeTheme}
      onSubmit={(value) => {
        onSaveSetting(value);
      }}
      validate={(value) => {
        handleCheckChangeData(value);
      }}
      onReset={() => {
        setIsDataChange(false);
      }}
      enableReinitialize
    >
      {({ submitForm, resetForm, isValid }) => (
        <>
          <FormAutoOptimizeTheme />

          {isDataChange && isAcceptPlanCurrent && (
            <ContextualSaveBar
              message={t("setting_page.language.save_bar.title")}
              saveAction={{
                content: t("common.btn_save"),
                onAction: submitForm,
                loading: isLoadingOnSaveSetting,
                disabled: !isValid,
              }}
              discardAction={{
                content: t("common.btn_discard"),
                onAction: resetForm,
                disabled: isLoadingOnSaveSetting,
              }}
            />
          )}
          {eleToastMessage}
          {/* modal confirm */}
          <ModalConfirmChangeTabs
            isOpen={isBlocking && isAcceptPlanCurrent}
            onClose={cancelNavigate}
            onPrimaryAction={() => {
              resetForm();
              confirmNavigate();
            }}
          />
        </>
      )}
    </Formik>
  );
}

interface IPropsAutoOptimizeTheme {
  setModalSetting: (payload: ModalBaseInfoType) => void;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

export default AutoOptimizeTheme;
