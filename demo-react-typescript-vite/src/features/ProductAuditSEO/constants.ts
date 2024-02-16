import { IFormConfigChatGPT } from "./type";

export const OPTION_TONE_OF_VOICE = [
    {
        label: "smartSEO.audit_product.select_expert",
        value: "expert",
    },
    {
        label: "smartSEO.audit_product.select_darling",
        value: "darling",
    },
    {
        label: "smartSEO.audit_product.select_playful",
        value: "playful",
    },
    {
        label: "smartSEO.audit_product.select_sophisticated",
        value: "sophisticated",
    },
    {
        label: "smartSEO.audit_product.select_persuasive",
        value: "persuasive",
    },
    {
        label: "smartSEO.audit_product.select_supportive",
        value: "supportive",
    },
    {
        label: "smartSEO.audit_product.select_custom",
        value: "custom",
    },
];

export const TONE_VOICE_CUSTOM = OPTION_TONE_OF_VOICE[OPTION_TONE_OF_VOICE.length - 1];

export const OPTION_TONE_LANGUAGE = [
    {
        label: "country.english",
        value: "english",
    },
    {
        label: "country.spanish",
        value: "spanish",
    },
    {
        label: "country.france",
        value: "france",
    },
    {
        label: "country.german",
        value: "german",
    },
    {
        label: "country.japanese",
        value: "japanese",
    },
    {
        label: "country.portuguese",
        value: "portuguese",
    },

];

export const INIT_DATA_CONFIG_CHAT_GPT:IFormConfigChatGPT ={
    language:OPTION_TONE_LANGUAGE[0].value,
    tone:OPTION_TONE_OF_VOICE[0].value
}