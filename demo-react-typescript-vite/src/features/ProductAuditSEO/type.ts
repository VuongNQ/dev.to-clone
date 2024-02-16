import { generateContentAI } from "@swift/types/boostSEO";

export enum EConfigChatGPT {
    keywords = "keywords",
    tone_voice = "tone",
    custom_tone_voice = "custom_tone_voice",
    language = "language",
}

export interface IFormConfigChatGPT {
    [EConfigChatGPT.keywords]?: string;
    [EConfigChatGPT.tone_voice]: string;
    [EConfigChatGPT.custom_tone_voice]?: string;
    [EConfigChatGPT.language]: string;
}


export interface IDataInputConfigLoading{
    isLoadingAnalyze: boolean;
    isLoadingReAnalyze: boolean;
    typeGenerate: generateContentAI;
  }