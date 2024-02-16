import { REGEX_URL, REGEX_URL_IMG } from "@swift/constants/constantRegex";
import {
  EFieldSnippetOrganization,
  EFieldSocialLinksSnippetSetting,
} from "@swift/types/snippetSEO";
import * as Yup from "yup";

export const validationSchemaOrganization = Yup.object().shape({
  [EFieldSnippetOrganization.active]: Yup.bool(),
  // [EFieldSnippetOrganization.industry]: Yup.string().nullable().default(null),
  [EFieldSnippetOrganization.logo_link]: Yup.string()
    .matches(REGEX_URL_IMG, "smartSEO.snippet.store_profile.invalid_logo_link")
    .nullable()
    .default(null),
  [EFieldSnippetOrganization.brand_name]: Yup.string().nullable().default(null),
  [EFieldSnippetOrganization.reference_page]: Yup.string()
    .nullable()
    .default(null),
  [EFieldSnippetOrganization.social_links]: Yup.object()
    .shape({
      [EFieldSocialLinksSnippetSetting.facebook]: Yup.string()
        .matches(REGEX_URL, "smartSEO.snippet.store_profile.invalid_facebook")
        .nullable()
        .default(null),
      [EFieldSocialLinksSnippetSetting.twitter]: Yup.string()
        .matches(REGEX_URL, "smartSEO.snippet.store_profile.invalid_ twitter")
        .nullable()
        .default(null),
      [EFieldSocialLinksSnippetSetting.instagram]: Yup.string()
        .matches(REGEX_URL, "smartSEO.snippet.store_profile.invalid_ instagram")
        .nullable()
        .default(null),
      [EFieldSocialLinksSnippetSetting.youtube]: Yup.string()
        .matches(REGEX_URL, "smartSEO.snippet.store_profile.invalid_youtube")
        .nullable()
        .default(null),
      [EFieldSocialLinksSnippetSetting.linkedin]: Yup.string()
        .matches(REGEX_URL, "smartSEO.snippet.store_profile.invalid_linkedin")
        .nullable()
        .default(null),
      [EFieldSocialLinksSnippetSetting.snapchat]: Yup.string()
        .matches(REGEX_URL, "smartSEO.snippet.store_profile.invalid_snapchat")
        .nullable()
        .default(null),
    })
    .nullable()
    .default(null),
});
