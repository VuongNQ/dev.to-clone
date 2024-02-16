import * as Yup from "yup";
import { EConfigChatGPT } from "../type";
import { INIT_DATA_CONFIG_CHAT_GPT, OPTION_TONE_OF_VOICE } from "../constants";

export const validationSchemaConfigChatGPT = Yup.object().shape({
    [EConfigChatGPT.keywords]: Yup.string().max(50,"smartSEO.audit_product.error_max_input"),
    [EConfigChatGPT.tone_voice]: Yup.string().default(INIT_DATA_CONFIG_CHAT_GPT[EConfigChatGPT.tone_voice]),
    [EConfigChatGPT.custom_tone_voice]: Yup.string().max(50,"smartSEO.audit_product.error_max_input").when(EConfigChatGPT.tone_voice, {
        is: (val: string) => (val === OPTION_TONE_OF_VOICE[OPTION_TONE_OF_VOICE.length - 1].value ? true : false),
        then: (schema) => schema.required("smartSEO.audit_product.error_custom_tone_required"),
    }),
    [EConfigChatGPT.language]: Yup.string().default(INIT_DATA_CONFIG_CHAT_GPT[EConfigChatGPT.language]),
});
