import { Button, Text } from "@shopify/polaris";
import FrequentlyAskedQuestions from "@swift/components/UIs/FrequentlyAskedQuestions";
import PreviewBrowser from "@swift/components/UIs/PreviewBrowser";
import { useAppSelector } from "@swift/hooks";
import { customerData } from "@swift/store/global";
import { useCallback, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import img404 from "./assets/img-not-found.png";
import {
  ACCEPT_PLAN_MONITOR,
  INI_DATA_MONITOR,
  LIST_QUESTION_MONITOR,
} from "./constant";
import "./styles.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@swift/queryKeys";
import { useMonitor404SEOService } from "@swift/services/monitor404SEOApi";
import usePlanPricing from "@swift/hooks/usePlanPricing";
import FeaturesUseAccordingPlan, {
  IRefFeaturesUseAccordingPlan,
} from "@swift/components/FeaturesUseAccordingPlan";
import { IDataSettingMonitor } from "@swift/types/monitor404SEO";
import StatusActiveExtensionApp from "@swift/components/StatusActiveExtensionApp";

function Monitor404SEO() {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const customer = useAppSelector(customerData);

  const { getSetting, postSaveSetting } = useMonitor404SEOService();

  const { isAllowPlan } = usePlanPricing({
    listPLanAllow: ACCEPT_PLAN_MONITOR,
  });

  const refUseFeatureRedirect = useRef<IRefFeaturesUseAccordingPlan>(null);
  const refUseFeatureSentEmail = useRef<IRefFeaturesUseAccordingPlan>(null);

  const { data: dataSetting, isInitialLoading } = useQuery({
    ...queryKeys.advancedSeo.getSettingMonitor404(),
    refetchOnWindowFocus: false,
    enabled: isAllowPlan,
    queryFn: async () => {
      const { data, status } = await getSetting();
      if (status && data) {
        return data;
      }
      return INI_DATA_MONITOR;
    },
  });

  const handleUpdateSetting = useCallback(
    (payload: Partial<IDataSettingMonitor>) => {
      queryClient.setQueryData<IDataSettingMonitor>(
        queryKeys.advancedSeo.getSettingMonitor404().queryKey,
        (oldData) => {
          if (!oldData) return oldData;
          let newData = oldData;
          newData = {
            ...newData,
            ...payload,
          };

          return newData;
        }
      );
    },
    [queryClient]
  );

  const {
    mutate: onSaveSettingRedirect,
    isLoading: isLoadingSaveSettingRedirect,
  } = useMutation({
    mutationFn: async (payload: Partial<IDataSettingMonitor>) => {
      const { status } = await postSaveSetting(payload);
      return {
        status,
        payload,
      };
    },
    onSuccess: (res) => {
      const { status, payload } = res;
      if (status) {
        handleUpdateSetting(payload);
      }
    },
  });

  const { mutate: onSaveSettingSendEmail, isLoading: isLoadingSaveSendEmail } =
    useMutation({
      mutationFn: async (payload: Partial<IDataSettingMonitor>) => {
        const { status } = await postSaveSetting(payload);
        return {
          status,
          payload,
        };
      },
      onSuccess: (res) => {
        const { status, payload } = res;
        if (status) {
          handleUpdateSetting(payload);
        }
      },
    });

  const txtUrl = useMemo(
    () => `${customer?.domain}/page not found 404`,
    [customer?.domain]
  );

  const onChangeSetting = useCallback(
    (key: keyof IDataSettingMonitor, payload: Partial<IDataSettingMonitor>) => {
      if (
        key === "is_redirect_to_home" &&
        !refUseFeatureRedirect.current?.onValidPlan()
      )
        return;
      if (
        key === "is_send_email" &&
        !refUseFeatureSentEmail.current?.onValidPlan()
      )
        return;

      if (key === "is_redirect_to_home") {
        onSaveSettingRedirect({ ...dataSetting, ...payload });
        return;
      }
      if (key === "is_send_email") {
        onSaveSettingSendEmail({ ...dataSetting, ...payload });
        return;
      }
    },
    [dataSetting]
  );

  return (
    <div className="Monitor404SEO p-5 flex flex-col gap-5">
      <PreviewBrowser txtUrl={txtUrl}>
        <img className="Monitor404SEO__img-404" src={img404} alt="" />
      </PreviewBrowser>

      <StatusActiveExtensionApp extension="seo" />

      <FeaturesUseAccordingPlan
        ref={refUseFeatureRedirect}
        className="sw__wp-box p-5"
        listPLanAllow={ACCEPT_PLAN_MONITOR}
        contentUpGrade={t("common.txt_upgrade_PRL_EC")}
        eleHeader={
          <div className="flex gap-5 items-start">
            <div className="flex flex-col gap-2 flex-1">
              <Text as="h3" variant="headingMd">
                {t("monitor_404.section_redirect_home.title")}
              </Text>
              <Text as="p" variant="bodyMd">
                {t("monitor_404.section_redirect_home.des")}
              </Text>
            </div>
            <div style={{ color: "var(--p-icon-critical)" }}>
              <Button
                size="slim"
                outline={dataSetting?.is_redirect_to_home}
                monochrome
                primary={!dataSetting?.is_redirect_to_home}
                onClick={() => {
                  onChangeSetting("is_redirect_to_home", {
                    is_redirect_to_home: !dataSetting?.is_redirect_to_home,
                  });
                }}
                loading={isInitialLoading || isLoadingSaveSettingRedirect}
              >
                {dataSetting?.is_redirect_to_home
                  ? t("common.btn_turn_off")
                  : t("common.btn_turn_on")}
              </Button>
            </div>
          </div>
        }
      />

      <FeaturesUseAccordingPlan
        ref={refUseFeatureSentEmail}
        className="sw__wp-box p-5"
        listPLanAllow={ACCEPT_PLAN_MONITOR}
        contentUpGrade={t("common.txt_upgrade_PRL_EC")}
        eleHeader={
          <div className="flex gap-5 items-start">
            <div className="flex flex-col gap-2 flex-1">
              <Text as="h3" variant="headingMd">
                {t("monitor_404.section_send_email.title")}
              </Text>
              <Text as="p" variant="bodyMd">
                {t("monitor_404.section_send_email.des")}
              </Text>
            </div>
            <div style={{ color: "var(--p-icon-critical)" }}>
              <Button
                size="slim"
                outline={dataSetting?.is_send_email}
                monochrome
                primary={!dataSetting?.is_send_email}
                onClick={() => {
                  onChangeSetting("is_send_email", {
                    is_send_email: !dataSetting?.is_send_email,
                  });
                }}
                loading={isInitialLoading || isLoadingSaveSendEmail}
              >
                {dataSetting?.is_send_email
                  ? t("common.btn_turn_off")
                  : t("common.btn_turn_on")}
              </Button>
            </div>
          </div>
        }
      />

      <FrequentlyAskedQuestions
        listQuestion={LIST_QUESTION_MONITOR}
        title={t("boostSEO.title_question")}
      />
    </div>
  );
}

export default Monitor404SEO;
