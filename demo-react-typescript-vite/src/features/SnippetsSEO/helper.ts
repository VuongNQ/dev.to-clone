import iconFb from "@swift/assets/images/advancedSeo/icon-fb.png";
import iconInst from "@swift/assets/images/advancedSeo/icon-inst.png";
import iconLinkedin from "@swift/assets/images/advancedSeo/icon-linkedin.png";
import iconSnapchat from "@swift/assets/images/advancedSeo/icon-snapchat.png";
import iconTwitter from "@swift/assets/images/advancedSeo/icon-twitter.png";
import iconYoutube from "@swift/assets/images/advancedSeo/icon-youtube.png";
import {
    EFieldSnippetOrganization,
    EFieldSnippetSetting,
    EFieldSocialLinksSnippetSetting,
    IDataSnippetOrganization
} from "@swift/types/snippetSEO";
import { EQueryClassPreview } from "./type";

export const updatePreViewStoreProfile = (
    nodePreview: Element | null | undefined,
    setting: IDataSnippetOrganization
) => {
    if (!nodePreview) return;
    const ElmImgBlur = nodePreview.querySelector(
            `.${EQueryClassPreview.PreviewOrganizeImageBlur}`
        ) as HTMLImageElement,
        ElmBrandName = nodePreview.querySelector(
            `.${EQueryClassPreview.PreviewOrganizeBrandName}`
        ) as HTMLElement,
        ELmImgStore = nodePreview.querySelector(
            `.${EQueryClassPreview.PreviewOrganizeImageLogoLink}`
        ) as HTMLImageElement,
        ELmReferentPage = nodePreview.querySelector(
            `.${EQueryClassPreview.PreviewOrganizeReference}`
        ) as HTMLElement,
        ElmSocial = nodePreview.querySelector(
            `.${EQueryClassPreview.PreviewOrganizeSocialLink}`
        ) as HTMLElement;

    if (!setting[EFieldSnippetOrganization.active]) {
        ElmImgBlur?.classList.remove("hidden");
        return;
    }

    ElmImgBlur?.classList.add("hidden");
    ElmBrandName.textContent = setting[EFieldSnippetSetting.brand_name];
    ELmImgStore.src = setting[EFieldSnippetSetting.logo_link] || "";
    ELmReferentPage.textContent = setting[EFieldSnippetSetting.reference_page];

    const socials = setting[EFieldSnippetOrganization.social_links];
    ElmSocial.innerHTML = ""; // clear all current status

    const listSort = [
        { key: EFieldSocialLinksSnippetSetting.twitter, icon: iconTwitter },
        { key: EFieldSocialLinksSnippetSetting.youtube, icon: iconYoutube },
        { key: EFieldSocialLinksSnippetSetting.linkedin, icon: iconLinkedin },
        { key: EFieldSocialLinksSnippetSetting.snapchat, icon: iconSnapchat },
        { key: EFieldSocialLinksSnippetSetting.instagram, icon: iconInst },
        { key: EFieldSocialLinksSnippetSetting.facebook, icon: iconFb },
    ];

    if (socials && Object.keys(socials).length)
        listSort.forEach(({ key, icon }) => {
            ElmSocial.insertAdjacentHTML(
                "afterbegin",
                `<img class="${
                    !socials[key]?.length && "hidden"
                }" src=${icon} alt="" />`
            );
        });
};

export const updatePreviewActive = (
    nodePreview: Element | null | undefined,
    isActive: boolean
) => {
    if (!nodePreview) return;
    if (isActive) nodePreview.classList.remove("hidden");
    else nodePreview.classList.add("hidden");
};
