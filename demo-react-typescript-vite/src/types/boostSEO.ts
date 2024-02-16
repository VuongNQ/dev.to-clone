// audit product
export enum IAssessmentStatus {
  unknown = "unknown",
  un_evaluated = "un-evaluated",
  poorly_optimized = "poorly-optimized",
  well_optimized = "well-optimized",
  all = "",
}

export interface IGetCountProductAudit {
  "well-optimized": number;
  "poorly-optimized": number;
  unknown: number;
  "un-evaluated": number;
}

export enum generateContentAI {
  meta_title = "meta-title",
  title = "title",
  description = "description",
  meta_description = "meta-description",
}

export interface IDataItemAuditProduct {
  id: number;
  title: string;
  main_image_src: string | null;
  audit_product?: {
    product_id: number;
    assessment_status: IAssessmentStatus;
  };
}

export interface IDataDetailAuditProduct {
  id: number;
  store_id: number;
  title: string | null;
  description_html: string | null;
  title_tag: string | null;
  description_tag: string | null;
  handle: string;
  audit_product?: {
    product_id: number;
    assessment_status: IAssessmentStatus;
    is_evaluated: boolean;
    last_assessment: string;
  };
}

export enum syncStatus {
  processing = "processing",
  done = "done",
}

export interface IPayloadGetListAuditProduct {
  filters: IFilterAuditProduct;
  params: IParamsGetListAuditProduct;
}

export interface IParamsGetListAuditProduct {
  limit?: number;
  page: number;
  order_by?: "id" | "created_at";
  order_type?: "asc" | "desc";
}

export interface IFilterAuditProduct {
  keyword?: string;
  assessment_status?: IAssessmentStatus[];
}

export interface IPayloadPutDetailAuditProduct {
  title?: string;
  description_html?: string;
  title_tag?: string;
  description_tag?: string;
  productId: number;
}

export interface IPostAutoScanSEO {
  isAutoScan: boolean;
  // isCompetitor: boolean;
}

export enum KeyFeatureBulkAddAltImgAndMetaTag {
  bulk_add_alt_images = "bulk_add_alt_images",
  bulk_add_products_meta_tags = "bulk_add_products_meta_tags",
  scan_missing_alt_product_images = "scan_missing_alt_product_images",
  scan_missing_products_meta_tags = "scan_missing_products_meta_tags",
}

export enum KeyStatusBulkAddAltImgAndMetaTag {
  processing = "processing",
  done = "done",
}

export interface IDataBulkAddAltImgAndMetaTag {
  id: number;
  store_id: number;
  feature: KeyFeatureBulkAddAltImgAndMetaTag;
  handled_total: number | EStatusHandledTotal;
  status: KeyStatusBulkAddAltImgAndMetaTag | null;
  note?: string;
  updated_at?: string;
}

export enum EStatusHandledTotal {
  not_handled = -1,
  handled = 0,
}

export enum keyTitleProccessBulkAltMetaTag {
  title_alt_img_bulk = "smartSEO.alt_images.add_bulk.notify_bulk_add",
  title_alt_scan_missing = "smartSEO.alt_images.add_bulk.notify_scan_missing",
  title_meta_tags_bulk = "smartSEO.meta_title.add_bulk.notify_bulk_add",
  title_meta_tags_scan_missing = "smartSEO.meta_title.add_bulk.notify_scan_missing",
}

export interface IPusherDataBulkAddAltImgAndMetaTag {
  feature: KeyFeatureBulkAddAltImgAndMetaTag;
  status: KeyStatusBulkAddAltImgAndMetaTag;
  storeId: string;
  boostSeoLog: IDataBulkAddAltImgAndMetaTag;
}

export interface SmartSEOType {
  onScanSEO: (isCompetitor: boolean) => void;
  dataScanLog: DataLogsType | null;
}

export enum ITabsSEOBasic {
  scan_website = "scan_website",
  alt_images = "alt_images",
  meta_title = "meta_title",
  audit_product = "audit_product",
}

export enum ITabsSEOAdvance {
  snippets = "snippets",
  monitor = "monitor",
  redirections = "redirections",
  site_map = "site_map",
}

export enum PageSEOType {
  boost_SEO = "boost_SEO",
  basic_SEO = "basic_SEO",
  advance_SEO = "advance_SEO",
}

export interface PageSeoType {
  key: string;
  title: string;
  des: string;
}

export interface DatatableAltimage {
  currentPage?: number;
  limit?: number;
  from: number;
  last_page_url: string | null;
  next_page_url: string | null;
  to: number;
  total: number;
  data: DataAltimageType[];
}

export interface DataAltimageType {
  img: JSX.Element;
  content: string;
  action: JSX.Element;
}

export interface DatatableMetaTitle {
  currentPage?: number;
  limit?: number;
  from: number;
  last_page_url: string | null;
  next_page_url: string | null;
  to: number;
  total: number;
  data: DataMetaTitleType[];
}

export interface DataMetaTitleType {
  date: string;
  status: JSX.Element;
  editedItems: string;
  details: JSX.Element;
  action: JSX.Element;
}

export enum TypePageSEOType {
  // all = "",
  homepage_url = "homepage_url",
  collection_url = "collection_url",
  product_url = "product_url",
  article_url = "article_url",
}

export enum StatusScanSEOType {
  not_scan = "not_scan",
  scanning = "scanning",
  scanned = "scanned",
}
export interface LogsType {
  current_page: number;
  data: DataLogsType[];
  first_page_url: string | null;
  from: number;
  last_page: number;
  last_page_url: string | null;
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface DataLogsType {
  id: number;
  setting_id: number;
  status: StatusScanSEOType;
  number_of_pages_measured: number;
  data: null;
  created_at: string;
  updated_at: string;
  setting: ScanSettingType;
  detail_logs: { [K in TypePageSEOType]?: ItemDetailLogsType };
  types_of_urls_scanned: TypePageSEOType[];
}

export interface DataLogsStateType {
  types_of_urls_scanned: TypePageSEOType[];
  updated_at: string;
}

export interface ScanSettingType {
  id: number;
  store_id: number;
  domain_scan: string;
  is_competitor: boolean;
  homepage_url: string | null;
  collection_url: string | null;
  product_url: string | null;
  article_url: string | null;
  is_auto_scan: boolean;
  data: null;
  created_at: string;
  updated_at: string;
}

export interface ItemDetailLogsType {
  id: number;
  log_id: number;
  type: StatusScanSEOType;
  current_url: string;
  score: number;
  number_of_good_scores: number;
  number_of_fair_scores: number;
  number_of_poor_scores: number;
  performance_score: number;
  data: { audits: ItemAuditsType[] };
  created_at: string;
  updated_at: string;
}

export interface ItemAuditsType {
  id: string;
  title: string;
  description: string;
  score: number;
}
export interface ScoresSEOType {
  scoreTotal: number;
  scoreGood: number;
  scoreFair: number;
  scorePoor: number;
  scorePerformance?: number;
}

export interface ItemDataLogAudits {
  description: string;
  id: string;
  score: number | null;
  title: string;
  onFix?: () => void;
}
export interface DataFilterLogAudit {
  criticalIssues: ItemDataLogAudits[];
  improvement: ItemDataLogAudits[];
  passedAudits: ItemDataLogAudits[];
  manualCheck: ItemDataLogAudits[];
}
export interface boostSEOState {
  currentUrl: string;
  scoresSEO: ScoresSEOType;
  dataScanLog: DataLogsStateType | null;
  dataAudits: { [K in TypePageSEOType]?: ItemAuditsType[] } | null;
  statusScan: StatusScanSEOType;
  // isLoadingGetBoostSEO: boolean;
}

export enum ProductTag {
  PRODUCT_TITLE_FORMAT = "product_title",
  PRODUCT_TYPE_FORMAT = "product_type",
  PRODUCT_CATEGORY_FORMAT = "product_category",
  PRODUCT_DESCRIPTION_FORMAT = "product_description",
  PRODUCT_PRICE_FORMAT = "product_price",
  PRODUCT_VENDOR_FORMAT = "product_vendor",
  SHOP_NAME_FORMAT = "shop_name",
}

export interface DataAltImgMetaTagType {
  auto_add_alt_image: boolean;
  auto_add_meta_tags: boolean;
  product_alt_image_format: ProductTag[];
  product_meta_title_format: ProductTag[];
  product_meta_description_format: ProductTag[];
}

export interface IFormValidateAudit {
  title: string;
  description_html: string;
  title_tag: string;
  description_tag: string;
}

export enum IFieldValidate {
  title = "title",
  title_tag = "title_tag",
  description_tag = "description_tag",
  description_html = "description_html",
}

export interface IWarningEditAudit {
  isFirstChange: boolean;
  isOpen: boolean;
}

export enum IFieldValidateCompetitorSEO {
  currentUrl = "currentUrl",
}

export enum EStatusDataLogAuditScanSEO {
  critical = "critical",
  success = "success",
  warning = "warning",
  undefined = "undefined",
}

export interface ILastAssessmentJSON {
  optimization_level: IAssessmentStatus;
  assessment: string | null;
  comments_and_suggestions: string[] | string | null;
  well_optimized_elements: string[] | null;
  poorly_optimized_elements: string[] | null;
  used_tokens_amount: number;
}

export interface IDataBulkAltImgMetaTag {
  dataBulkAddAltImg: IDataBulkAddAltImgAndMetaTag;
  dataBulkAddMetaTag: IDataBulkAddAltImgAndMetaTag;
  dataScanMissingAltImg: IDataBulkAddAltImgAndMetaTag;
  dataScanMissingMetaTag: IDataBulkAddAltImgAndMetaTag;
}
