import { RefObject } from "react";

export interface IDataToastMessage {
    isToast: boolean;
    message: string;
    isError?: boolean;
}

export interface IPropSectionSetting {
    refPreview: RefObject<HTMLDivElement>;
}

export enum EQueryClassPreview {
    PreviewOrganize = "PreviewSettingSnippetSEO__org-blur",
    PreviewOrganizeImageBlur =  "PreviewSettingSnippetSEO__img-blur",
    PreviewOrganizeBrandName = "PreviewSettingSnippetSEO__brand-name",
    PreviewOrganizeImageLogoLink = "PreviewSettingSnippetSEO__img-logo",
    PreviewOrganizeReference = "PreviewSettingSnippetSEO__reference-page",
    PreviewOrganizeSocialLink = "PreviewSettingSnippetSEO__social-link",
    PreviewRichSnippet = "PreviewSettingSnippetSEO__product-rating",
    PreviewCollection = "PreviewSettingSnippetSEO__collection",
    PreviewFAQ = "PreviewSettingSnippetSEO__FAQ",

}
