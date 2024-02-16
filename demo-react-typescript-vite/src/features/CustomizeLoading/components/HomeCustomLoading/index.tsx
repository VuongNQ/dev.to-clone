import { ContextualSaveBar, Text, Toast } from "@shopify/polaris";
import { useContext, useEffect, useMemo } from "react";
/*styles */
import "../../styles/index.scss";
/** translation */
import { useToastGeneral } from "@swift/hooks/useToastGeneral";
import { queryKeys } from "@swift/queryKeys";
import { useCustomizeLoadingService } from "@swift/services/customizeLoadingApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  LOADING_SETTING_DEFAULT,
  LOADING_STYLE_DEFAULT,
} from "../../constants";
import { CustomLoadingContext } from "../../context/ContextCustomLoading";
import { StyleCustomizeLoadingActiveContext } from "../../context/StyleCustomActiveContext";
import { createFormData } from "../../helpers";
import {
  CustomizeLoadingFormDataType,
  GetSettingCustomLoadingType,
} from "../../type";
import ActiveLoadingScreen from "../ActiveLoadingScreen";
import BackgroundSetting from "../BackgroundSetting";
import CollapsibleCustomLoading from "../CollapsibleCustomLoading";
import DisplaySetting from "../DisplaySetting";
import LoadingTimeSetting from "../LoadingTimeSetting";
import PreviewDemo from "../PreviewDemo";
import TemplateSetting from "../TemplateSetting";
import "./styles.scss";

let timeOutSession: NodeJS.Timeout | undefined = undefined;
let timeOutAnimation: NodeJS.Timeout | undefined = undefined;

const HomeCustomLoading = () => {
  const { t } = useTranslation();

  const { state, dispatch } = useContext(CustomLoadingContext);

  const { saveCustomLoading, getSettingCustomLoading } =
    useCustomizeLoadingService();

  const {toastInfo:toastMessage,toggleIsOpenToast:setToastMessage} = useToastGeneral()

  const {
    data: dataSettingCustomLoadingOrigin,
    refetch: refetchSettingCustomLoading,
  } = useQuery({
    ...queryKeys.customLoading.getSettingCustomLoading(),
    queryFn: async () => {
      const res = await getSettingCustomLoading();

      let newData: GetSettingCustomLoadingType = {
        settings: null,
        style: null,
      };

      if (res.status) {
        newData = {
          settings: res.data.settings,
          style: res.data.style,
        };

        dispatch({
          type: "get",
          payload: newData,
        });
      }

      return newData;
    },
  });

  const styleCustomizeLoadingActive = useMemo(
    () =>
      state.style[state.style.template_active] ||
      LOADING_STYLE_DEFAULT.simple_1,
    [state.style]
  );

  const LIST_TABS = useMemo(
    () => [
      {
        id: "template",
        content: t("CustomizeLoading_page.template_customizeLoading.title"),
        component: <TemplateSetting />,
        tabs: "template",
      },
      {
        id: "background",
        content: t("CustomizeLoading_page.background_customizeLoading.title"),
        component: <BackgroundSetting />,
        tabs: "background",
      },
      {
        id: "loadingTime",
        content: t("CustomizeLoading_page.loadingTime_customizeLoading.title"),
        component: <LoadingTimeSetting />,
        tabs: "loadingTime",
      },
      {
        id: "display",
        content: t("CustomizeLoading_page.display_customizeLoading.title"),
        component: <DisplaySetting />,
        tabs: "display",
      },
    ],
    [t]
  );

  const { mutate: onSaveCustomLoading, isLoading: isLoadingSave } = useMutation(
    {
      mutationFn: async () => {
        const validate = handleValidateSelectedPage();
        if (validate) return;

        const data = handleReturnPayloadOnSave();

        const formData = createFormData(data);

        const { status } = await saveCustomLoading(formData);

        if (status) {
          refetchSettingCustomLoading();

          setToastMessage({
            isOpen: true,
            message: t("setting_page.language.toast.title_success"),
          });

          dispatch({
            type: "update",
            payload: { isChangeData: false },
          });
        } else {
          setToastMessage({
            isOpen: true,
            message: "Something went wrong",
            isError: true,
          });
        }
      },
    }
  );

  /** validate if page_show_type === specific, page_show_specific must have >= 1 element  */
  const handleValidateSelectedPage = useCallback(() => {
    let validate = null;
    const setting = state.settings;

    if (
      setting &&
      setting.page_show_type === "specific" &&
      setting?.page_show_specific?.length === 0
    ) {
      validate = {
        isError: true,
        message: "Please select page to save",
      };
    }

    if (validate) {
      setToastMessage({
        isOpen: true,
        message: validate.message,
        isError: true,
      });
    }
    return validate;
  }, [setToastMessage, state.settings]);
  /**end validate if page_show_type === specific, page_show_specific must have >= 1 element  */

  /** handle return payload when save custom loading*/
  const handleReturnPayloadOnSave = useCallback(() => {
    const templateActive = state.style.template_active;

    const styleLoading =
      state.style[templateActive] || LOADING_STYLE_DEFAULT["simple_1"];

    const data: CustomizeLoadingFormDataType = {
      settings: state.settings,
      style: {
        ...styleLoading,
        templateSelected: state.style.template_active,
      },
    };

    return data;
  }, [state.settings, state.style]);
  /**end handle return payload when save custom loading*/

  /**run demo  */
  const runDemo = () => {
    clearTimeout(timeOutSession);
    clearTimeout(timeOutAnimation);
    if (state.settings && state.style) {
      const timeSession = state.settings.duration_time;

      dispatch({
        type: "update",
        payload: {
          isDemo: true,
        },
      });

      timeOutSession = setTimeout(() => {
        const element = document.querySelector(
          ".CustomizeLoading-Preview__demo"
        );
        const aminationClass =
          "swift-" +
          state.settings.animation_style +
          "-" +
          state.settings.delay_time;
        element?.classList.add(aminationClass);
        timeOutAnimation = setTimeout(() => {
          element?.classList.remove(aminationClass);

          dispatch({
            type: "update",
            payload: {
              isDemo: false,
            },
          });
        }, state.settings.delay_time * 1000);
      }, (timeSession ? timeSession : 3000) * 1000);
    }
  };

  /** reset data original */
  const onResetDataOriginal = useCallback(() => {
    dispatch({
      type: "update",
      payload: {
        isChangeData: false,
        settings:
          dataSettingCustomLoadingOrigin?.settings || LOADING_SETTING_DEFAULT,
        style: dataSettingCustomLoadingOrigin?.style || {
          simple_1: LOADING_STYLE_DEFAULT.simple_1,
          template_active: "simple_1",
        },
      },
    });
  }, [
    dataSettingCustomLoadingOrigin?.settings,
    dataSettingCustomLoadingOrigin?.style,
    dispatch,
  ]);
  /**end reset data original */

  useEffect(() => {
    runDemo();
  }, [state.settings, state.style]);

  const ElmListSetting = useMemo(
    () =>
      LIST_TABS.map((item) => (
        <CollapsibleCustomLoading
          key={item.id}
          title={
            <Text as="h3" variant="headingSm">
              {t(item.content)}
            </Text>
          }
        >
          {item.component}
        </CollapsibleCustomLoading>
      )),
    [LIST_TABS, t]
  );

  const eleToastMessage = useMemo(
    () =>
      toastMessage.isOpen ? (
        <Toast
          error={toastMessage.isError}
          content={t(toastMessage.message)}
          onDismiss={() => {
            setToastMessage({
              isOpen: false,
              message: "",
            });
          }}
          duration={5000}
        />
      ) : null,
    [setToastMessage, t, toastMessage.isError, toastMessage.isOpen, toastMessage.message]
  );
  return (
    <div className="CustomizeLoading flex flex-col gap-5">
      <StyleCustomizeLoadingActiveContext.Provider
        value={{
          styleCustomizeLoadingActive: styleCustomizeLoadingActive,
        }}
      >
        <ActiveLoadingScreen />
        <div className="CustomizeLoading__wp flex gap-5">
          <div className="CustomizeLoading__left">
            <PreviewDemo runDemo={runDemo} />
          </div>
          <div className="CustomizeLoading__right">
            {ElmListSetting}
          </div>
        </div>
      </StyleCustomizeLoadingActiveContext.Provider>
      {eleToastMessage}
      {state.isChangeData && (
        <ContextualSaveBar
          message={t("setting_page.language.save_bar.title")}
          saveAction={{
            content: t("common.btn_save"),
            onAction: onSaveCustomLoading,
            loading: isLoadingSave,
          }}
          discardAction={{
            content: t("common.btn_discard"),
            onAction: onResetDataOriginal,
          }}
        />
      )}
    </div>
  );
};

export default HomeCustomLoading;
