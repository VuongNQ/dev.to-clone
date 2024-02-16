import { Button, ContextualSaveBar, Text } from "@shopify/polaris";
import { useSSnippetSEOService } from "@swift/services/snippetSEOApi";
import {
    EFieldSnippetCollection,
    EFieldSnippetSetting,
    IDataSnippetCollection,
} from "@swift/types/snippetSEO";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useFuncSnippets from "../../hooks/useFuncSnippets";
import {
    EQueryClassPreview,
    IDataToastMessage,
    IPropSectionSetting,
} from "../../type";
import { validationSchemaCollection } from "../../validations/validationCollection";
import "./styles.scss";
import { updatePreviewActive } from "../../helper";

function SettingCollectionSnippetSEO({
    isDataChange,
    setIsDataChange,
    setToastMessage,
    refPreview,
}: IPropsSettingCollectionSnippetSEO) {
    const { t } = useTranslation();

    const { postSnippetCollection } = useSSnippetSEOService();

    const { dataResSnippet, refetchDataResSnippet } = useFuncSnippets();

    const INIT_DATA = useMemo(
        (): IDataSnippetCollection => ({
            active:
                (dataResSnippet &&
                    dataResSnippet[
                        EFieldSnippetSetting.is_collection_active
                    ]) ||
                false,
        }),
        [dataResSnippet]
    );

    const handleUpdatePreview = useCallback(
        (active:boolean) => {
            updatePreviewActive(
                refPreview.current?.querySelector(
                    `.${EQueryClassPreview.PreviewCollection}`
                ),
                active
            );
        },
        [refPreview]
    );

    const { mutate: onSaveSetting, isLoading: isLoadingSaveSetting } =
        useMutation({
            mutationFn: async (payload: IDataSnippetCollection) => {
                const res = await postSnippetCollection(payload);
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
        (value: IDataSnippetCollection) => {
            const dataLocal = value;
            const isAlike =
                JSON.stringify(dataLocal) === JSON.stringify(INIT_DATA);
            setIsDataChange(!isAlike);
            // handleUpdatePreview(dataLocal);
        },
        [INIT_DATA, setIsDataChange]
    );

    useEffect(() => {
        // vào tabs Store profile snippet luôn hiện preview
        handleUpdatePreview(true);
        return () => {
            setIsDataChange(false);
             // thoát khỏi tabs Store profile ẩn preview
            handleUpdatePreview(false);
        };
    }, []);

    return (
        <Formik
            initialValues={INIT_DATA}
            validationSchema={validationSchemaCollection}
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
                <div className="SettingCollectionSnippetSEO p-5 flex flex-col gap-5">
                    <div className="SettingCollectionSnippetSEO__box flex gap-5">
                        <div className="flex-1">
                            <Text as="p" variant="bodyMd">
                                {t("smartSEO.snippet.collection.des")}
                            </Text>
                        </div>
                        <div style={{ color: "#D82C0D" }}>
                            <Button
                                primary={
                                    !values[EFieldSnippetCollection.active]
                                }
                                size="slim"
                                outline={values[EFieldSnippetCollection.active]}
                                monochrome
                                onClick={() => {
                                    setFieldValue(
                                        EFieldSnippetCollection.active,
                                        !values[EFieldSnippetCollection.active]
                                    );
                                }}
                            >
                                {!values[EFieldSnippetCollection.active]
                                    ? t("smartSEO.snippet.btn_show")
                                    : t("smartSEO.snippet.btn_hide")}
                            </Button>
                        </div>
                    </div>
                    {isDataChange && (
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

interface IPropsSettingCollectionSnippetSEO extends IPropSectionSetting {
    isDataChange: boolean;
    setIsDataChange: (value: boolean) => void;
    setToastMessage: (value: IDataToastMessage) => void;
}

export default SettingCollectionSnippetSEO;
