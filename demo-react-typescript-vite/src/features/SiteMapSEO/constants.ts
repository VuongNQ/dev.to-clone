import {
  IDataSitemap,
  IKeyInfoSitemap,
  IKeyStatusConnectSitemap,
} from "@swift/types/advancedSEO";
import sitemapConsole from "@swift/assets/images/advancedSeo/sitemap-console.png";
import { PlanType } from "@swift/types/planPricing";


export const MESS_DISCONNECTED =
  "Your website is not currently connected to Google Search Console";

export const LIST_QUESTION_SITEMAP = [
  {
    title: "smartSEO.site_map.list_question.0.title",
    content: "smartSEO.site_map.list_question.0.des",
  },
  {
    title: "smartSEO.site_map.list_question.1.title",
    content: "smartSEO.site_map.list_question.1.des",
  },
];

export const MESSAGE_GOOGLE_SEARCH_CONSOLE = {
  [IKeyInfoSitemap.isConnected]:
    "smartSEO.site_map.section_google_search_console.task_connect.message_success",
  [IKeyInfoSitemap.verifiedSite]:
    "smartSEO.site_map.section_google_search_console.task_add_site.message_success",
  [IKeyInfoSitemap.isVerified]:
    "smartSEO.site_map.section_google_search_console.task_verify_site.message_success",
  [IKeyInfoSitemap.isSubmitted]:
    "smartSEO.site_map.section_google_search_console.task_submit_sitemap.message_success",
};

export const ACCEPT_PLANS_SITEMAP = [
  PlanType.basic,
  PlanType.premium,
  PlanType.premium_plus,
  PlanType.expert_care,
];

export const INIT_DATA_SITE_MAP: IDataSitemap = {
  is_connected: IKeyStatusConnectSitemap.dis_connected,
  verified_site: null,
  is_verified: IKeyStatusConnectSitemap.dis_connected,
  is_submitted: IKeyStatusConnectSitemap.dis_connected,
};

export const LIST_STEP_CONNECT_SITEMAP: Record<
  IKeyInfoSitemap,
  {
    title: string;
    des?: string;
    img?: string;
    titleBtn: string;
  }
> = {
  [IKeyInfoSitemap.isConnected]: {
    title: "smartSEO.site_map.section_google_search_console.task_connect.title",
    des: "smartSEO.site_map.section_google_search_console.task_connect.des",
    img: sitemapConsole,
    titleBtn:
      "smartSEO.site_map.section_google_search_console.task_connect.btn",
  },
  [IKeyInfoSitemap.verifiedSite]: {
    title:
      "smartSEO.site_map.section_google_search_console.task_add_site.title",
    titleBtn:
      "smartSEO.site_map.section_google_search_console.task_add_site.btn",
  },
  [IKeyInfoSitemap.isVerified]: {
    title:
      "smartSEO.site_map.section_google_search_console.task_verify_site.title",
    titleBtn:
      "smartSEO.site_map.section_google_search_console.task_verify_site.btn",
  },
  [IKeyInfoSitemap.isSubmitted]: {
    title:
      "smartSEO.site_map.section_google_search_console.task_submit_sitemap.title",
    titleBtn:
      "smartSEO.site_map.section_google_search_console.task_submit_sitemap.btn",
  },
};
