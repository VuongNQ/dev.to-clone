import { Button, ContextualSaveBar, Text } from "@shopify/polaris";
import InputSelect from "@swift/components/UIs/InputSelect";
import { useSSnippetSEOService } from "@swift/services/snippetSEOApi";
import {
    EFieldSnippetProduct,
    EFieldSnippetSetting,
    IDataSnippetProduct,
} from "@swift/types/snippetSEO";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ACCEPT_PLANS_RICH_SNIPPET, OPTION_APP_REVIEW } from "../../constants";
import useFuncSnippets from "../../hooks/useFuncSnippets";
import { validationSchemaProduct } from "../../validations/validationProduct";
import {
    EQueryClassPreview,
    IDataToastMessage,
    IPropSectionSetting,
} from "../../type";
import "./styles.scss";
import FeaturesUseAccordingPlan, {
    IRefFeaturesUseAccordingPlan,
} from "@swift/components/FeaturesUseAccordingPlan";
import usePlanPricing from "@swift/hooks/usePlanPricing";
import { updatePreviewActive } from "../../helper";

function SettingRichSnippetSEO({
    isDataChange,
    setIsDataChange,
    setToastMessage,
    refPreview,
}: IPropsSettingRichSnippetSEO) {
    const { t } = useTranslation();

    const { postSnippetProduct } = useSSnippetSEOService();

    const { dataResSnippet, refetchDataResSnippet } = useFuncSnippets();

    const { isAllowPlan } = usePlanPricing({
        listPLanAllow: ACCEPT_PLANS_RICH_SNIPPET,
    });

    const refFeaturesUseAccordingPlan =
        useRef<IRefFeaturesUseAccordingPlan>(null);

    const INIT_DATA = useMemo(
        (): IDataSnippetProduct => ({
            active:
                (dataResSnippet &&
                    dataResSnippet[EFieldSnippetSetting.is_product_active]) ||
                false,
            product_review_app:
                (dataResSnippet &&
                    dataResSnippet[EFieldSnippetSetting.product_review_app]) ||
                null,
        }),
        [dataResSnippet]
    );

    const handleUpdatePreview = useCallback(
        (active:boolean) => {
            updatePreviewActive(
                refPreview.current?.querySelector(
                    `.${EQueryClassPreview.PreviewRichSnippet}`
                ),
                active
            );
        },
        [refPreview]
    );

    const { mutate: onSaveSetting, isLoading: isLoadingSaveSetting } =
        useMutation({
            mutationFn: async (payload: IDataSnippetProduct) => {
                const res = await postSnippetProduct(payload);
                return res;
            },
            onSuccess: (res) => {
                const { status, message } = res;

                if (status) {
                    refetchDataResSnippet();
                    setToastMessage({
                        isToast: true,
                        message: t(
                            "boostSEO.common.toast_message.toast_save_success"
                        ),
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
        (value: IDataSnippetProduct) => {
            const dataLocal = value;
            const isAlike =
                JSON.stringify(dataLocal) === JSON.stringify(INIT_DATA);
            setIsDataChange(!isAlike);
            // handleUpdatePreview(dataLocal);
        },
        [INIT_DATA, setIsDataChange]
    );

    useEffect(() => {
        // vào tabs Rich snippet luôn hiện preview
        handleUpdatePreview(true);
        return () => {
            setIsDataChange(false);
             // thoát khỏi tabs Rich snippet ẩn preview
            handleUpdatePreview(false);
        };
    }, []);

    return (
        <Formik
            initialValues={INIT_DATA}
            validationSchema={validationSchemaProduct}
            onSubmit={(value) => {
                onSaveSetting(value);
            }}
            validate={(value) => {
                handleCheckChangeData(value);
            }}
            onReset={() => {
                setIsDataChange(false);
                // handleUpdatePreview(INIT_DATA);
            }}
            enableReinitialize
        >
            {({ handleSubmit, resetForm, isValid, values, setFieldValue }) => (
                <div className="SettingRichSnippetSEO p-5 flex flex-col gap-5">
                    <FeaturesUseAccordingPlan
                        ref={refFeaturesUseAccordingPlan}
                        listPLanAllow={ACCEPT_PLANS_RICH_SNIPPET}
                        contentUpGrade={t("common.txt_upgrade_PR_PRL_EC")}
                        onActionPrimary={() => {
                            setFieldValue(
                                EFieldSnippetProduct.active,
                                !values[EFieldSnippetProduct.active]
                            );
                        }}
                        eleHeader={
                            <div className="SettingRichSnippetSEO__box flex gap-5">
                                <div className="flex-1">
                                    <Text as="p" variant="bodyMd">
                                        {t("smartSEO.snippet.rich_store.des")}
                                    </Text>
                                </div>
                                <div style={{ color: "#D82C0D" }}>
                                    <Button
                                        primary={
                                            !values[EFieldSnippetProduct.active]
                                        }
                                        size="slim"
                                        outline={
                                            values[EFieldSnippetProduct.active]
                                        }
                                        monochrome
                                        onClick={() => {
                                            refFeaturesUseAccordingPlan.current?.onActionPrimary();
                                        }}
                                    >
                                        {!values[EFieldSnippetProduct.active]
                                            ? t("smartSEO.snippet.btn_show")
                                            : t("smartSEO.snippet.btn_hide")}
                                    </Button>
                                </div>
                            </div>
                        }
                    />

                    {(isAllowPlan && values[EFieldSnippetProduct.active]) && (
                        <div className="SettingRichSnippetSEO__list-app SettingRichSnippetSEO__box flex gap-5 p-5">
                            <div className="flex flex-col gap-3 flex-1">
                                <Text as="h3" variant="headingSm">
                                    {t(
                                        "smartSEO.snippet.rich_store.review_app.title"
                                    )}
                                </Text>
                                <Text as="p" variant="bodyMd">
                                    {t(
                                        "smartSEO.snippet.rich_store.review_app.des"
                                    )}
                                </Text>
                            </div>
                            <div className="flex-1">
                                <InputSelect
                                    size="slim"
                                    titleOption={""}
                                    options={OPTION_APP_REVIEW}
                                    selected={[
                                        values[
                                            EFieldSnippetProduct
                                                .product_review_app
                                        ]
                                            ? values[
                                                  EFieldSnippetProduct
                                                      .product_review_app
                                              ]
                                            : OPTION_APP_REVIEW[0].value,
                                    ]}
                                    setSelected={(value) => {
                                        setFieldValue(
                                            EFieldSnippetProduct.product_review_app,
                                            value[0]
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    )}

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

interface IPropsSettingRichSnippetSEO extends IPropSectionSetting {
    isDataChange: boolean;
    setIsDataChange: (value: boolean) => void;
    setToastMessage: (value: IDataToastMessage) => void;
}

export default SettingRichSnippetSEO;
