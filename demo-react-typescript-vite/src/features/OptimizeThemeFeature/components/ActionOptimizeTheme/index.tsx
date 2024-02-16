import { Banner, Text } from "@shopify/polaris";
import iconModalWarning from "@swift/assets/svg/modal/warning.svg";
import { MESSAGE_PLAN_NOT_USE } from "@swift/constants/general";
import { useAppSelector } from "@swift/hooks";
import useCrispChat from "@swift/hooks/useCrispChat";
import { useModalGeneral } from "@swift/hooks/useModalGeneral";
import { queryKeys } from "@swift/queryKeys";
import { useOptimizeThemeService } from "@swift/services/optimizeThemeApi";
import { customerData } from "@swift/store/global";
import { ModalBaseInfoType } from "@swift/types/general";
import {
  IDataDetailOptimizeTheme,
  InforActionOpitimizeThemeType,
  KeyOptimzie,
  MessageOptimize,
  StatusProccessOptimzie,
} from "@swift/types/optimizeTheme";
import { PlanType } from "@swift/types/planPricing";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LIST_TASK_OPTIMIZE } from "../../constant";
import { OptimizeThemeContext } from "../../contexts/OptimizeThemeContext";
import ButtonStartOptimize from "../ButtonStartOptimize";
import "./styles.scss";
import { isExistInArray } from "@swift/utils/arrayFunc";

const MESSAGE_CHAT_BUG_FEATURE = `I ran into a conflicting code issue. Can you help me resolve this?`;
const MESSAGE_BUG_FEATURE =
  "An error has occurred. Please contact our support!";
const MESSAGE_HAVE_STEP_RUNNING = "An another optimization process is running";

const INIT_DATA_STEP_PROGRESS: InforActionOpitimizeThemeType = {
  file_count: 0,
  progress: 0,
  status: StatusProccessOptimzie["in-process"],
  total_file: 0,
};

function ActionOptimizeTheme({
  setModalSetting,
  onOpenModal,
  onCloseModal,
}: IPopsActionOptimizeTheme) {
  const { t } = useTranslation();

  const customer = useAppSelector(customerData);

  const { returnModalCheckPlan } = useModalGeneral();

  const { postActionOptimize, getDetailOptimize } = useOptimizeThemeService();

  const { onContactSupport } = useCrispChat();

  const queryClient = useQueryClient();

  const {
    isAcceptUseOptimizeTheme,
    setStepRunning,
    dataOptimize,
  } = useContext(OptimizeThemeContext);

  const [isDifferenceOriginTheme, setIsDifferenceOriginTheme] = useState(false);

  /** check user change theme */
  const handleReturnIsDifferenceTheme = useCallback(async () => {
    const { data, status } = await getDetailOptimize();
    if (!status || !data) return true;
    if (!dataOptimize || !dataOptimize?.data) return true;

    const { origin_theme_id: originThemeIdData } = data;
    const { origin_theme_id: originThemeIdCurrent } = dataOptimize.data;

    if (originThemeIdCurrent !== originThemeIdData) {
      queryClient.setQueryData<IDataDetailOptimizeTheme>(
        queryKeys.optimizeTheme.getDetailOptimize().queryKey,
        data
      );
      return true;
    }

    return false;
  }, [dataOptimize, queryClient]);
  /**end check user change theme */

  /** method return data Click Step  */
  const handleReturnResClickStep = useCallback(
    async (step: KeyOptimzie) => {
      setStepRunning(step);
      const isDifference = await handleReturnIsDifferenceTheme();
      if (isDifference) {
        setIsDifferenceOriginTheme(true);
        return undefined;
      }

      return await postActionOptimize(step);
    },
    [handleReturnIsDifferenceTheme, queryClient]
  );
  /** end method return data Click Step  */

  const { mutate: onClickStep, isLoading: isLoadingClickStep } = useMutation({
    mutationFn: handleReturnResClickStep,
    onSuccess: (res) => {
      if (!res) return setStepRunning("");

      const { status, message, errors, data } = res;

      if (status && data) {
        const { optimize_type } = data;
        if (!dataOptimize || !dataOptimize.data) return;

        handleUpdateProccess(optimize_type);
        return;
      }

      setStepRunning(""); // reset step running if status false

      // user optimize click step tabs1 , and click step difference tabs2
      if (
        errors && !Array.isArray(errors) &&
        errors?.optimize &&
        errors.optimize
          .toLocaleLowerCase()
          .includes(MESSAGE_HAVE_STEP_RUNNING.toLocaleLowerCase())
      ) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.optimizeTheme.getDetailOptimize().queryKey,
        });
        return;
      }

      // bug feature
      if (
        !status &&
        message?.toLocaleLowerCase() === MESSAGE_BUG_FEATURE.toLocaleLowerCase()
      ) {
        handleOpenBugFeature();
        return;
      }

      // plan not allow optimize
      if (!status) {
        handleOpenNotAllowUse(message || "");
        return;
      }
    },
  });

  /** set data query step click run */
  const handleUpdateProccess = useCallback(
    (optimize_type: KeyOptimzie) => {
      queryClient.setQueryData<IDataDetailOptimizeTheme>(
        queryKeys.optimizeTheme.getDetailOptimize().queryKey,
        (oldData) => {
          if (!oldData) return oldData;
          let newData = oldData;

          if (!oldData.stats.duplicate) {
            newData = {
              ...newData,
              stats: {
                ...oldData.stats,
                [optimize_type]: INIT_DATA_STEP_PROGRESS,
                duplicate: INIT_DATA_STEP_PROGRESS,
              },
            };
          } else {
            newData = {
              ...newData,
              stats: {
                ...oldData.stats,
                [optimize_type]: INIT_DATA_STEP_PROGRESS,
              },
            };
          }
          return newData;
        }
      );
    },
    [queryClient]
  );
  /**end set data query step click run */

  /**open modal not allow use feature. use case 2 tabs */
  const handleOpenNotAllowUse = useCallback(
    (message: string) => {
      const isPlanNotUse =
        message &&
        (message
          .toLocaleLowerCase()
          .includes(MESSAGE_PLAN_NOT_USE.toLocaleLowerCase()) ||
          message === MessageOptimize.not_allow_optimize)
          ? true
          : false;

      if (isPlanNotUse) {
        const contentModal = returnModalCheckPlan(
          customer?.app_plan || PlanType.free
        );
        setModalSetting({
          ...contentModal,
          onPrimaryAction: onCloseModal,
        });
        onOpenModal();
      }
    },
    [
      returnModalCheckPlan,
      customer?.app_plan,
      setModalSetting,
      onCloseModal,
      onOpenModal,
    ]
  );
  /**end open modal not allow use feature. use case 2 tabs */

  /**open bug feature */
  const handleOpenBugFeature = useCallback(() => {
    setModalSetting({
      title_header: "optimize_theme.modal_bug_feature.title_head",
      des: "optimize_theme.modal_bug_feature.des",
      icon: iconModalWarning,
      titlePrimaryAction: "common.btn_contact",
      onPrimaryAction: () => {
        onContactSupport(MESSAGE_CHAT_BUG_FEATURE);
        onCloseModal();
      },
      titleSecondaryAction: "common.btn_cancel",
    });
    onOpenModal();
  }, [setModalSetting]);
  /**end open bug feature */

  const eleListActionOptimize = useMemo(() => {
    return LIST_TASK_OPTIMIZE.map((item) => {
      const isAcceptFeature = item.acceptPlan
        ? isExistInArray(customer?.app_plan || PlanType.free, item.acceptPlan)
        : true;
      return (
        <div
          key={item.key}
          className="ActionOptimizeTheme__item flex gap-5 items-center  justify-center py-3 px-5"
        >
          <img
            loading="lazy"
            className="ActionOptimizeTheme__img"
            src={item.img}
            alt=""
          />
          <div className="ActionOptimizeTheme__content">
            <div className="ActionOptimizeTheme__wp-title flex gap-2 items-center mb-1 flex-wrap">
              <div className="flex gap-2">
                <Text alignment="start" as="h4" variant="headingSm">
                  {item.title}
                </Text>
                {/* {item.badge && <Badge>{t(item.badge)}</Badge>} */}
              </div>
              {(!isAcceptFeature && item.explainUse) && (
                <span className="ActionOptimizeTheme__explain">
                  {t(item.explainUse || "")}
                </span>
              )}
            </div>
            <Text alignment="start" as="h4" variant="bodyMd" color="subdued">
              {t(item.des)}
            </Text>
          </div>
          <ButtonStartOptimize
            isUseTrial={item.isUseTrial}
            step={item.key}
            isLoadingClickStep={isLoadingClickStep}
            isDisabledClickStep={isDifferenceOriginTheme || !isAcceptFeature}
            isUpgrade={!isAcceptFeature}
            onClickStep={() => {
              onClickStep(item.key);
            }}
          />
        </div>
      );
    });
  }, [customer?.app_plan, t, isLoadingClickStep, isDifferenceOriginTheme, onClickStep]);

  const eleBannerThemeChange = useMemo(
    () =>
      isDifferenceOriginTheme && (
        <Banner
          title={t("optimize_theme.banner_change_theme.title")}
          onDismiss={() => {
            setIsDifferenceOriginTheme(false);
          }}
          status="warning"
        >
          <p>{t("optimize_theme.banner_change_theme.des")}</p>
        </Banner>
      ),
    [isDifferenceOriginTheme, t]
  );

  return (
    <>
      {eleBannerThemeChange}
      <div
        className="sw__wp-box"
        style={{
          opacity: isAcceptUseOptimizeTheme ? "1" : "0.5",
        }}
      >
        {eleListActionOptimize}
      </div>
    </>
  );
}
interface IPopsActionOptimizeTheme {
  setModalSetting: (payload: ModalBaseInfoType) => void;
  onOpenModal: () => void;
  onCloseModal: () => void;
}
export default ActionOptimizeTheme;
