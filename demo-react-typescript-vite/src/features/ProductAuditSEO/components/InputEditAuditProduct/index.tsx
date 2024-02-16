import { Button, ButtonGroup, Icon, Text, Tooltip } from "@shopify/polaris";
import { ChevronLeftMinor, ChevronRightMinor, PageUpMajor, ResetMinor } from "@shopify/polaris-icons";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import { useAuditProductService } from "@swift/services/auditProductApi";
import { generateContentAI } from "@swift/types/boostSEO";
import { Formik } from "formik";
import { PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { INIT_DATA_CONFIG_CHAT_GPT, TONE_VOICE_CUSTOM } from "../../constants";
import { EditAuditProductContext } from "../../contexts/editAuditProduct";
import { ProfileTokenContext } from "../../contexts/profileToken";
import { EConfigChatGPT, IFormConfigChatGPT } from "../../type";
import { validationSchemaConfigChatGPT } from "../../validations/validationConfigChatGPT";
import PopoverConfigAI from "../PopoverConfigAI";
import "./styles.scss";

function InputEditAuditProduct({
    label,
    hiddenGenerateAI,
    tooltipGenerateAI = "",
    typeGenerate,
    children,
    isUseOnReplace = false,
    onClickReplace,
    value,
}: PropsWithChildren<IInputEditAuditProduct>) {
    const { t } = useTranslation();

    const { onRedirectApp } = useFuncRedirect();

    const { generateProductContentAI } = useAuditProductService();

    const { isRefetchingProfile, isValidTokenChatGPT, isTokenExpired, onOpenModalWarningToken, refetchToken } =
        useContext(ProfileTokenContext);

    const {
        inputConfigLoading,
        setInputConfigLoading,
        dataDetailAuditProduct,
        isLoadingPutAuditProduct,
        hasErrorsToken,
    } = useContext(EditAuditProductContext);

    // const [isLoadingGenerateText, setIsLoadingGenerateText] = useState(false);

    const [valueGenerateText, setValueGenerateText] = useState<string[]>([]);

    const [selectedTextGenerate, setSelectedTextGenerate] = useState(
        valueGenerateText.length ? valueGenerateText.length - 1 : 0
    );

    // const [isLoadingReGenerate, setIsLoadingReGenerate] = useState(false);

    const [isDisableReplace, setIsDisableReplace] = useState(false);

    const [tokenUsed, setTokenUsed] = useState(0);

    const handleReturnResGenerateAI = useCallback(
        async (payload: Omit<IFormConfigChatGPT, EConfigChatGPT.custom_tone_voice>) => {
            if (!dataDetailAuditProduct) return;

            const { language, tone, keywords } = payload;
            let newPayload: Omit<IFormConfigChatGPT, EConfigChatGPT.custom_tone_voice> = {
                language,
                tone,
            };

            if (keywords && keywords.length) {
                newPayload = {
                    ...newPayload,
                    keywords,
                };
            }

            const { status, data, errors } = await generateProductContentAI({
                content_type: typeGenerate,
                product_id: dataDetailAuditProduct.id,
                ...newPayload,
            });

            return {
                status,
                data,
                errors,
            };
        },
        [dataDetailAuditProduct?.id, generateProductContentAI, typeGenerate]
    );

    const onGenerateContent = useCallback(
        async ({
            type,
            language,
            tone,
            keywords,
        }: {
            type: "generate" | "re_generate";
        } & Omit<IFormConfigChatGPT, EConfigChatGPT.custom_tone_voice>) => {
            if (!isValidTokenChatGPT) {
                onOpenModalWarningToken();
                return;
            }

            setInputConfigLoading({
                isLoadingAnalyze: type === "generate" ? true : false,
                isLoadingReAnalyze: type === "re_generate" ? true : false,
                typeGenerate: typeGenerate,
            });

            const res = await handleReturnResGenerateAI({ language, tone, keywords });

            if (!res) return;

            const { data, errors, status } = res;

            if (!status && errors && hasErrorsToken(errors)) {
                onRedirectApp("/seo-basic?tabs=audit_product");
                return;
            }

            if (status && data) {
                const { content, usage } = data;
                refetchToken();
                setValueGenerateText((preValue) => {
                    const newValue = [...preValue, content];
                    setSelectedTextGenerate(newValue.length - 1);
                    return newValue;
                });
                setTokenUsed(usage.used_tokens || 0);
            }
            setInputConfigLoading({
                isLoadingAnalyze: false,
                isLoadingReAnalyze: false,
                typeGenerate: typeGenerate,
            });
        },
        [handleReturnResGenerateAI, hasErrorsToken, isValidTokenChatGPT, onOpenModalWarningToken, onRedirectApp, refetchToken, setInputConfigLoading, typeGenerate]
    );

    const onReplace = useCallback(() => {
        onClickReplace && onClickReplace(valueGenerateText[selectedTextGenerate]);
    }, [onClickReplace, selectedTextGenerate, valueGenerateText]);

    useEffect(() => {
        if (!isUseOnReplace && hiddenGenerateAI && !valueGenerateText.length) return;
        const isAlike = JSON.stringify(value) === JSON.stringify(valueGenerateText) ? true : false;
        setIsDisableReplace(isAlike);
    }, [value, valueGenerateText]);

    return (
        <Formik
            initialValues={INIT_DATA_CONFIG_CHAT_GPT}
            validationSchema={validationSchemaConfigChatGPT}
            onSubmit={(values) => {
                const { custom_tone_voice, tone } = values;
                onGenerateContent({
                    type: "generate",
                    ...values,
                    tone: tone === TONE_VOICE_CUSTOM.value && custom_tone_voice ? custom_tone_voice : tone,
                });
            }}
        >
            {({ values, isValid }) => (
                <div className="InputEditAuditProduct flex flex-col">
                    <div className="flex justify-between mb-1 items-end">
                        {label && <span>{label}</span>}
                        {!hiddenGenerateAI && (
                            <Tooltip content={tooltipGenerateAI}>
                                <PopoverConfigAI
                                    isLoading={inputConfigLoading.isLoadingAnalyze &&
                                        inputConfigLoading.typeGenerate === typeGenerate}
                                    isDisabled={
                                        inputConfigLoading.isLoadingReAnalyze ||
                                        isLoadingPutAuditProduct ||
                                        isRefetchingProfile ||
                                        isTokenExpired ||
                                        (inputConfigLoading.isLoadingAnalyze &&
                                            inputConfigLoading.typeGenerate !== typeGenerate)
                                    }
                                />
                            </Tooltip>
                        )}
                    </div>
                    {children}
                    {!hiddenGenerateAI && valueGenerateText && valueGenerateText.length ? (
                        <>
                            <div className="InputEditAuditProduct__box-generate mt-2 p-2 items-end">
                                <div className="flex justify-between">
                                    <ButtonGroup segmented>
                                        <Button
                                            onClick={() => {
                                                setSelectedTextGenerate((preValue) => preValue - 1);
                                            }}
                                            disabled={selectedTextGenerate <= 0}
                                            size="slim"
                                            icon={ChevronLeftMinor}
                                        ></Button>
                                        <Button
                                            onClick={() => {
                                                setSelectedTextGenerate((preValue) => preValue + 1);
                                            }}
                                            disabled={selectedTextGenerate >= valueGenerateText.length - 1}
                                            size="slim"
                                            icon={ChevronRightMinor}
                                        ></Button>
                                    </ButtonGroup>
                                    <div className="flex gap-1">
                                        <Tooltip content={t("smartSEO.audit_product.btn_get_another_suggest")}>
                                            <Button
                                                onClick={() => {
                                                    onGenerateContent({
                                                        type: "re_generate",
                                                        ...values,
                                                        tone:
                                                            values.tone === TONE_VOICE_CUSTOM.value &&
                                                            values.custom_tone_voice
                                                                ? values.custom_tone_voice
                                                                : values.tone,
                                                    });
                                                }}
                                                outline
                                                size="slim"
                                                icon={ResetMinor}
                                                loading={inputConfigLoading.isLoadingReAnalyze}
                                                disabled={
                                                    !isValid ||
                                                    inputConfigLoading.isLoadingAnalyze ||
                                                    isLoadingPutAuditProduct ||
                                                    isRefetchingProfile ||
                                                    isTokenExpired || inputConfigLoading.isLoadingAnalyze 
                                                }
                                            ></Button>
                                        </Tooltip>
                                        {isUseOnReplace && (
                                            <Tooltip
                                                content={t("smartSEO.audit_product.edit_audit_product.btn_replace")}
                                            >
                                                <Button
                                                    size="slim"
                                                    outline
                                                    icon={<Icon source={PageUpMajor} color="success" />}
                                                    disabled={
                                                        inputConfigLoading.isLoadingAnalyze ||
                                                        inputConfigLoading.isLoadingReAnalyze ||
                                                        isLoadingPutAuditProduct ||
                                                        isDisableReplace
                                                    }
                                                    onClick={onReplace}
                                                ></Button>
                                            </Tooltip>
                                        )}
                                    </div>
                                </div>

                                {valueGenerateText.length && (
                                    <p className="mt-2 mb-2">
                                        <Text as="span" variant="bodyMd" color="subdued">
                                            {valueGenerateText[selectedTextGenerate]}
                                        </Text>
                                    </p>
                                )}

                                <p className={`token-used ${!tokenUsed ? "hidden" : "flex"}`}>
                                    {t("smartSEO.audit_product.edit_audit_product.token_used", {
                                        number: tokenUsed,
                                    })}
                                </p>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </Formik>
    );
}

interface IInputEditAuditProduct {
    label?: string;
    value: string;
    hiddenGenerateAI?: boolean;
    tooltipGenerateAI?: string;
    typeGenerate: generateContentAI;
    isUseOnReplace?: boolean;
    onClickReplace?: (value: string) => void;
    // children: JSX.Element
}

export default InputEditAuditProduct;
