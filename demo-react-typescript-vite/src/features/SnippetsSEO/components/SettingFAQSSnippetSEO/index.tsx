import { Button, ContextualSaveBar, Icon, Text } from "@shopify/polaris";
import { DiamondAlertMajor } from "@shopify/polaris-icons";
import FeaturesUseAccordingPlan, {
  IRefFeaturesUseAccordingPlan,
} from "@swift/components/FeaturesUseAccordingPlan";
import usePlanPricing from "@swift/hooks/usePlanPricing";
import { useSSnippetSEOService } from "@swift/services/snippetSEOApi";
import {
  EFieldSnippetFAQ,
  EFieldSnippetSetting,
  IDataSnippetFAQ
} from "@swift/types/snippetSEO";
import { generateRandomInteger } from "@swift/utils/funcNumber";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ACCEPT_PLANS_FQA, INIT_FQA } from "../../constants";
import { updatePreviewActive } from "../../helper";
import useFuncSnippets from "../../hooks/useFuncSnippets";
import {
  EQueryClassPreview,
  IDataToastMessage,
  IPropSectionSetting,
} from "../../type";
import { validationSchemaFAQ } from "../../validations/validationFAQ";
import SettingListFQASnippetSEO from "../SettingListFQASnippetSEO";
import "./styles.scss";

function SettingFAQSSnippetSEO({
  isDataChange,
  setIsDataChange,
  setToastMessage,
  refPreview,
}: IPropsSettingFAQSSnippetSEO) {
  const { t } = useTranslation();

  const { postSnippetFQA } = useSSnippetSEOService();

  const { dataResSnippet, refetchDataResSnippet } = useFuncSnippets();

  const { isAllowPlan } = usePlanPricing({
    listPLanAllow: ACCEPT_PLANS_FQA,
  });

  const refFeaturesUseAccordingPlan =
    useRef<IRefFeaturesUseAccordingPlan>(null);

  const INIT_DATA = useMemo(
    (): IDataSnippetFAQ => ({
      active:
        (dataResSnippet &&
          dataResSnippet[EFieldSnippetSetting.is_faq_active]) ||
        false,
      faqs:
        (dataResSnippet && dataResSnippet[EFieldSnippetSetting.faqs]) || null,
    }),
    [dataResSnippet]
  );

  const handleUpdatePreview = useCallback(
    (active:boolean) => {
      updatePreviewActive(
        refPreview.current?.querySelector(`.${EQueryClassPreview.PreviewFAQ}`),
        active
      );
    },
    [refPreview]
  );

  const { mutate: onSaveSetting, isLoading: isLoadingSaveSetting } =
    useMutation({
      mutationFn: async (payload: IDataSnippetFAQ) => {
        const res = await postSnippetFQA(payload);
        return res;
      },
      onSuccess: (res) => {
        const { status, message } = res;

        if (status) {
          refetchDataResSnippet();
          setToastMessage({
            isToast: true,
            message: t("boostSEO.common.toast_message.toast_save_success"),
          });
          setIsDataChange(false);
        } else {
          setToastMessage({
            isToast: true,
            message: t(message || ""),
            isError: true,
          });
        }
      },
    });

  const handleCheckChangeData = useCallback(
    (value: IDataSnippetFAQ) => {
      const dataLocal = value;
      const isAlike = JSON.stringify(dataLocal) === JSON.stringify(INIT_DATA);
      setIsDataChange(!isAlike);
    },
    [INIT_DATA, setIsDataChange]
  );

  useEffect(() => {
    // vào tabs FAQs luôn hiện preview
    handleUpdatePreview(true);
    return () => {
      setIsDataChange(false);
      // thoát khỏi tabs FAQs ẩn preview
      handleUpdatePreview(false);
    };
  }, []);

  return (
    <Formik
      initialValues={INIT_DATA}
      validationSchema={validationSchemaFAQ}
      onSubmit={(value) => {
        onSaveSetting(value);
      }}
      validate={(value) => {
        handleCheckChangeData(value);
      }}
      onReset={() => {
        setIsDataChange(false);
        // handleUpdatePreview();
      }}
      enableReinitialize
    >
      {({
        handleSubmit,
        resetForm,
        isValid,
        values,
        setFieldValue,
        errors,
      }) => (
        <div className="SettingFAQSSnippetSEO p-5 flex flex-col gap-5">
          <FeaturesUseAccordingPlan
            ref={refFeaturesUseAccordingPlan}
            listPLanAllow={ACCEPT_PLANS_FQA}
            contentUpGrade={t("common.txt_upgrade_PR_PRL_EC")}
            onActionPrimary={() => {
              const isACtive = !values[EFieldSnippetFAQ.active];
              const listFQA = values[EFieldSnippetFAQ.faqs];
              setFieldValue(EFieldSnippetFAQ.active, isACtive);
              if(isACtive && !listFQA?.length){
                const id = generateRandomInteger(1000);
                setFieldValue(EFieldSnippetFAQ.faqs,[{...INIT_FQA, id: id }]);
              }
            }}
            eleHeader={
              <div className="SettingFAQSSnippetSEO__box flex gap-5">
                <div className="flex-1">
                  <Text as="p" variant="bodyMd">
                    {t("smartSEO.snippet.faq.des")}
                  </Text>
                </div>
                <div style={{ color: "#D82C0D" }}>
                  <Button
                    primary={!values[EFieldSnippetFAQ.active]}
                    size="slim"
                    outline={values[EFieldSnippetFAQ.active]}
                    monochrome
                    onClick={() => {
                      refFeaturesUseAccordingPlan.current?.onActionPrimary();
                    }}
                  >
                    {!values[EFieldSnippetFAQ.active]
                      ? t("smartSEO.snippet.btn_show")
                      : t("smartSEO.snippet.btn_hide")}
                  </Button>
                </div>
              </div>
            }
          />

          {typeof errors[EFieldSnippetFAQ.faqs] === "string" && (
            <div className="flex gap-1">
              <Icon source={DiamondAlertMajor} color="critical" />
              <div className="flex-1">
                <Text as="span" variant="bodyMd" color="critical">
                  {errors[EFieldSnippetFAQ.faqs]}
                </Text>
              </div>
            </div>
          )}

          {isAllowPlan && <SettingListFQASnippetSEO />}

          {isAllowPlan && isDataChange && (
            <ContextualSaveBar
              message={t("setting_page.language.save_bar.title")}
              saveAction={{
                content: t("common.btn_save"),
                onAction: handleSubmit,
                loading: isLoadingSaveSetting,
                disabled: !isValid,
              }}
              discardAction={{
                content: t("common.btn_discard"),
                onAction: resetForm,
                disabled: isLoadingSaveSetting,
              }}
            />
          )}
        </div>
      )}
    </Formik>
  );
}

interface IPropsSettingFAQSSnippetSEO extends IPropSectionSetting {
  isDataChange: boolean;
  setIsDataChange: (value: boolean) => void;
  setToastMessage: (value: IDataToastMessage) => void;
}

export default SettingFAQSSnippetSEO;
