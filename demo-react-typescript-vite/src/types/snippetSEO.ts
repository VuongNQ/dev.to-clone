export enum EFieldSocialLinksSnippetSetting {
  facebook = "facebook",
  twitter = "twitter",
  instagram = "instagram",
  youtube = "youtube",
  linkedin = "linkedin",
  snapchat = "snapchat",
}

export interface IDataSocialLinksSnippet {
  [EFieldSocialLinksSnippetSetting.facebook]?: string | null;
  [EFieldSocialLinksSnippetSetting.instagram]?: string | null;
  [EFieldSocialLinksSnippetSetting.snapchat]?: string | null;
  [EFieldSocialLinksSnippetSetting.youtube]?: string | null;
  [EFieldSocialLinksSnippetSetting.linkedin]?: string | null;
  [EFieldSocialLinksSnippetSetting.twitter]?: string | null;
}

export enum EFieldSnippetOrganization {
  active = "active",
  logo_link = "logo_link",
  brand_name = "brand_name",
  reference_page = "reference_page",
  social_links = "social_links",
  // industry = "industry",
}
export interface IDataSnippetOrganization {
  [EFieldSnippetOrganization.active]: boolean;
  [EFieldSnippetOrganization.social_links]: IDataSocialLinksSnippet | null;
  [EFieldSnippetOrganization.reference_page]: string | null;
  [EFieldSnippetOrganization.logo_link]: string | null;
  [EFieldSnippetOrganization.brand_name]: string | null;
  // [EFieldSnippetOrganization.industry]: string | null;
}

export enum EFieldSnippetCollection {
  active = "active",
}
export interface IDataSnippetCollection {
  [EFieldSnippetCollection.active]: boolean;
}

export enum EFieldSnippetProduct {
  active = "active",
  product_review_app = "product_review_app",
}
export interface IDataSnippetProduct {
  [EFieldSnippetProduct.active]: boolean;
  [EFieldSnippetProduct.product_review_app]: string | null;
}

export enum EFieldFQASnippet {
  id = "id",
  answer = "answer",
  question = "question",
}

export interface IDataItemFQASnippet {
  [EFieldFQASnippet.id]?: number;
  [EFieldFQASnippet.answer]: string;
  [EFieldFQASnippet.question]: string;
}
export enum EFieldSnippetFAQ {
  active = "active",
  faqs = "faqs",
}
export interface IDataSnippetFAQ {
  [EFieldSnippetFAQ.active]: boolean;
  [EFieldSnippetFAQ.faqs]: IDataItemFQASnippet[] | null;
}

export interface IDataSettingSnippet
  extends IDataSnippetOrganization,
    IDataSnippetCollection,
    IDataSnippetProduct,
    IDataSnippetFAQ {}

export interface IDataSnippetSetting {
  [EFieldSnippetSetting.is_organization_active]: boolean;
  [EFieldSnippetSetting.is_faq_active]: boolean;
  [EFieldSnippetSetting.is_product_active]: boolean;
  [EFieldSnippetSetting.is_collection_active]: boolean;
  // [EFieldSnippetSetting.industry]: string | null;
  [EFieldSnippetSetting.logo_link]: string | null;
  [EFieldSnippetSetting.brand_name]: string | null;
  [EFieldSnippetSetting.reference_page]: string | null;
  [EFieldSnippetSetting.social_links]: IDataSocialLinksSnippet | null;
  [EFieldSnippetSetting.product_review_app]: string | null;
  [EFieldSnippetSetting.faqs]: IDataFQASnippet[] | null;
  [EFieldSnippetSetting.is_blog_active]: boolean;
}
export interface IDataFQASnippet {
  [EFieldFQASnippet.id]: number;
  [EFieldFQASnippet.answer]: string;
  [EFieldFQASnippet.question]: string;
}

export enum EFieldSnippetSetting {
  is_organization_active = "is_organization_active",
  is_blog_active = "is_blog_active",
  is_product_active = "is_product_active",
  is_collection_active = "is_collection_active",
  // industry = "industry",
  logo_link = "logo_link",
  brand_name = "brand_name",
  reference_page = "reference_page",
  social_links = "social_links",
  product_review_app = "product_review_app",
  faqs = "faqs",
  is_faq_active = "is_faq_active",
}
