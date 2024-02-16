import {
  DataAltImgMetaTagType,
  EStatusHandledTotal,
  IAssessmentStatus,
  IDataBulkAddAltImgAndMetaTag,
  KeyFeatureBulkAddAltImgAndMetaTag,
  ProductTag,
} from "@swift/types/boostSEO";
import { PlanType } from "@swift/types/planPricing";

export const CRITICAL_ISSUES = {
  id: "criticalIssues",
  title: "boostSEO.page_home.record_score.poor_score.title",
  color: "var(--p-text-critical)",
  colorBackground: "var(--p-surface-critical-subdued)",
  colorVerticalLine: "var(--p-surface-critical-subdued-depressed)",
};

export const DEFAULT_ALT_IMAGE = [ProductTag.PRODUCT_TITLE_FORMAT];

export const DEFAULT_META_TITLE = [
  ProductTag.PRODUCT_TITLE_FORMAT,
  ProductTag.SHOP_NAME_FORMAT,
];

export const DEFAULT_META_DESCRIPTION = [
  ProductTag.PRODUCT_DESCRIPTION_FORMAT,
  ProductTag.SHOP_NAME_FORMAT,
];

export const DEFAULT_DATA_ALT_IMG_META_TAG: DataAltImgMetaTagType = {
  auto_add_alt_image: false,
  auto_add_meta_tags: false,
  product_alt_image_format: DEFAULT_ALT_IMAGE,
  product_meta_title_format: DEFAULT_META_TITLE,
  product_meta_description_format: DEFAULT_META_DESCRIPTION,
};

export const LIST_QUESTION_META_TITLE = [
  {
    title: "smartSEO.meta_title.question.0.title",
    content: "smartSEO.meta_title.question.0.des",
  },
  {
    title: "smartSEO.meta_title.question.1.title",
    content: "smartSEO.meta_title.question.1.des",
  },
  {
    title: "smartSEO.meta_title.question.2.title",
    content: "smartSEO.meta_title.question.2.des",
  },
];

export const LIST_QUESTION_ALT_IMG = [
  {
    title: "smartSEO.alt_images.question.0.title",
    content: "smartSEO.alt_images.question.0.des",
  },
  {
    title: "smartSEO.alt_images.question.1.title",
    content: "smartSEO.alt_images.question.1.des",
  },
  {
    title: "smartSEO.alt_images.question.2.title",
    content: "smartSEO.alt_images.question.2.des",
  },
  {
    title: "smartSEO.alt_images.question.3.title",
    content: "smartSEO.alt_images.question.3.des",
  },
];

export const ASSESSMENT_STATUS: Record<IAssessmentStatus, string> = {
  [IAssessmentStatus.poorly_optimized]:
    "smartSEO.audit_product.assessment_status.poorly_optimized",
  [IAssessmentStatus.un_evaluated]:
    "smartSEO.audit_product.assessment_status.un_evaluated",
  [IAssessmentStatus.unknown]:
    "smartSEO.audit_product.assessment_status.unknown",
  [IAssessmentStatus.well_optimized]:
    "smartSEO.audit_product.assessment_status.well_optimized",
  [IAssessmentStatus.all]: "smartSEO.audit_product.assessment_status.all",
};

export const TABS_EDIT_AUDIT = {
  meta_Tag: {
    key: "meta_Tag",
    title: "boostSEO.list_tabs.meta_title.title",
  },
  product_content: {
    key: "product_content",
    title: "smartSEO.audit_product.edit_audit_product.tabs_product",
  },
};

export const MESSAGE_WARNING_AUDIT_DETAIL = {
  title: "smartSEO.audit_product.message_warning.field_title",
  description_html:
    "smartSEO.audit_product.message_warning.field_description_html",
  title_tag: "smartSEO.audit_product.message_warning.field_title_tag",
  description_tag:
    "smartSEO.audit_product.message_warning.field_description_tag",
};

export const ACCEPT_PLAN = [PlanType.basic,PlanType.premium,PlanType.premium_plus,PlanType.expert_care];

export const ACCEPT_PLAN_AUTO_SCAN = [PlanType.premium_plus,PlanType.expert_care];

export const INIT_BULK_ALT_IMG: IDataBulkAddAltImgAndMetaTag = {
  feature: KeyFeatureBulkAddAltImgAndMetaTag.bulk_add_alt_images,
  handled_total: EStatusHandledTotal.not_handled,
  id: -1,
  status: null,
  store_id: -1,
};
export const INIT_BULK_META_TAG: IDataBulkAddAltImgAndMetaTag = {
  feature: KeyFeatureBulkAddAltImgAndMetaTag.bulk_add_products_meta_tags,
  handled_total:  EStatusHandledTotal.not_handled,
  id: -1,
  status: null,
  store_id: -1,
};
export const INIT_SCAN_MISSING_ALT_IMG: IDataBulkAddAltImgAndMetaTag = {
  feature: KeyFeatureBulkAddAltImgAndMetaTag.bulk_add_products_meta_tags,
  handled_total:  EStatusHandledTotal.not_handled,
  id: -1,
  status: null,
  store_id: -1,
};
export const INIT_SCAN_MISSING_META_TAG: IDataBulkAddAltImgAndMetaTag = {
  feature: KeyFeatureBulkAddAltImgAndMetaTag.bulk_add_products_meta_tags,
  handled_total:  EStatusHandledTotal.not_handled,
  id: -1,
  status: null,
  store_id: -1,
};
