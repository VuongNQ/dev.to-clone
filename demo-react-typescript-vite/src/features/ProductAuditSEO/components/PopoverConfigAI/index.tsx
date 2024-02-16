import { Button, Popover, Text, TextField } from "@shopify/polaris";
import InputSelect from "@swift/components/UIs/InputSelect";
import { useFormikContext } from "formik";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { OPTION_TONE_LANGUAGE, OPTION_TONE_OF_VOICE, TONE_VOICE_CUSTOM } from "../../constants";
import { EConfigChatGPT, IFormConfigChatGPT } from "../../type";
import "./styles.scss";

function PopoverConfigAI({ isDisabled, isLoading }: IPopoverConfigAI) {
    const { t } = useTranslation();

    const { values, setFieldValue, submitForm, isValid, errors } = useFormikContext<IFormConfigChatGPT>();

    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = () => setPopoverActive((popoverActive) => !popoverActive);

    const ElmActivator = useMemo(
        () => (
            <Button loading={isLoading} disabled={isDisabled} plain size="slim" onClick={togglePopoverActive}>
                {t("smartSEO.audit_product.btn_ask_chat_AI")}
            </Button>
        ),
        [isDisabled, isLoading, t]
    );

    return (
        <div className="PopoverConfigAI">
            <Popover
                fluidContent
                preventCloseOnChildOverlayClick
                active={popoverActive}
                activator={ElmActivator}
                onClose={togglePopoverActive}
            >
                <div
                    style={{
                        maxWidth: "292px",
                    }}
                >
                    <Popover.Section>
                        <Text as="h3" variant="headingSm">
                            {t("smartSEO.audit_product.title_config_AI")}
                        </Text>
                    </Popover.Section>
                    <Popover.Section>
                        <div className="flex flex-col gap-5">
                            <TextField
                                label={t("smartSEO.audit_product.title_input_keyword")}
                                placeholder="Organic cotton, relaxed fit"
                                multiline
                                value={values[EConfigChatGPT.keywords]}
                                onChange={(value) => {
                                    setFieldValue(EConfigChatGPT.keywords, value);
                                }}
                                autoComplete="off"
                                helpText={t("smartSEO.audit_product.des_input_keyword")}
                                error={errors[EConfigChatGPT.keywords] ? t(errors[EConfigChatGPT.keywords]) : ""}
                            />
                            <div className="flex flex-col gap-1">
                                <Text as="span" variant="bodyMd">
                                    {t("smartSEO.audit_product.title_input_tone_voice")}
                                </Text>
                                <InputSelect
                                    titleOption={t("smartSEO.audit_product.sub_title_input_tone_voice")}
                                    options={OPTION_TONE_OF_VOICE}
                                    selected={[values[EConfigChatGPT.tone_voice]]}
                                    setSelected={(value) => {
                                        setFieldValue(EConfigChatGPT.tone_voice, value[0]);
                                    }}
                                />
                            </div>

                            {values[EConfigChatGPT.tone_voice] === TONE_VOICE_CUSTOM.value && (
                                <TextField
                                    multiline
                                    label={t("smartSEO.audit_product.title_input_custom_tone_voice")}
                                    placeholder="Expert, Darling"
                                    value={values[EConfigChatGPT.custom_tone_voice]}
                                    onChange={(value) => {
                                        setFieldValue(EConfigChatGPT.custom_tone_voice, value);
                                    }}
                                    autoComplete="off"
                                    error={
                                        errors[EConfigChatGPT.custom_tone_voice]
                                            ? t(errors[EConfigChatGPT.custom_tone_voice])
                                            : ""
                                    }
                                />
                            )}

                            <div className="flex flex-col gap-1">
                                <Text as="span" variant="bodyMd">
                                    {t("smartSEO.audit_product.title_input_language")}
                                </Text>
                                <InputSelect
                                    titleOption={t("smartSEO.audit_product.sub_title_input_language")}
                                    options={OPTION_TONE_LANGUAGE}
                                    selected={[values[EConfigChatGPT.language]]}
                                    setSelected={(value) => {
                                        setFieldValue(EConfigChatGPT.language, value[0]);
                                    }}
                                />
                            </div>
                            <Button
                                disabled={!isValid}
                                onClick={() => {
                                    submitForm();
                                    togglePopoverActive();
                                }}
                                primary
                            >
                                {t("smartSEO.audit_product.btn_get_suggest")}
                            </Button>
                        </div>
                    </Popover.Section>
                </div>
            </Popover>
        </div>
    );
}

interface IPopoverConfigAI {
    isDisabled?: boolean;
    isLoading?: boolean;
}

export default PopoverConfigAI;
