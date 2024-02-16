import { DescriptionPricing, IDataDescription } from "./type";

export const TABS_PRICING = {
  package: {
    content: "new_pricing_page.tabs.0",
    tabs:"pagkage"
  },
  services:{
    content: "new_pricing_page.tabs.1",
    tabs:"services"
  }
};

export const LIST_DESCRIPTION_OVERVIEW_FREE: DescriptionPricing[] = [
  {
    title: "new_pricing_page.descriptions_overview_free.list_des.0",
    isTick: true,
  },
  {
    title: "new_pricing_page.descriptions_overview_free.list_des.1",
    isTick: true,
  },
  {
    title: "new_pricing_page.descriptions_overview_free.list_des.2",
    isTick: true,
  },
  {
    title: "new_pricing_page.descriptions_overview_free.list_des.3",
    isTick: true,
  },
];

export const LIST_DESCRIPTION_OVERVIEW_BASIC: DescriptionPricing[] = [
  {
    title: "new_pricing_page.descriptions_overview_basic.list_des.0",
    isTick: true,
  },
  {
    title: "new_pricing_page.descriptions_overview_basic.list_des.1",
    isTick: true,
  },
  {
    title: "new_pricing_page.descriptions_overview_basic.list_des.2",
    isTick: true,
  },
  {
    title: "new_pricing_page.descriptions_overview_basic.list_des.3",
    isTick: true,
  },
];

export const LIST_DESCRIPTION_OVERVIEW_PREMIUM: DescriptionPricing[] = [
  {
    title: "new_pricing_page.descriptions_overview_premium.list_des.0",
    isTick: true,
  },
  {
    title: "new_pricing_page.descriptions_overview_premium.list_des.1",
    isTick: true,
  },
  {
    title: "new_pricing_page.descriptions_overview_premium.list_des.2",
    isTick: true,
  },
  {
    title: "new_pricing_page.descriptions_overview_premium.list_des.3",
    isTick: true,
  },
];

export const LIST_DESCRIPTION_OVERVIEW_PREMIUM_PLUS: DescriptionPricing[] = [
  {
    title: "new_pricing_page.descriptions_overview_premium_plus.list_des.0",
    isTick: true,
  },
  {
    title: "new_pricing_page.descriptions_overview_premium_plus.list_des.1",
    isTick: true,
  },
  {
    title: "new_pricing_page.descriptions_overview_premium_plus.list_des.2",
    isTick: true,
  },
  {
    title: "new_pricing_page.descriptions_overview_premium_plus.list_des.3",
    isTick: true,
  },
];

export const LIST_DESCRIPTION_OVERVIEW_EXPERT_CARE: DescriptionPricing[] = [
  {
    title: "new_pricing_page.descriptions_overview_expert_care.list_des.0",
    isTick: true,
  },
  {
    title: "new_pricing_page.descriptions_overview_expert_care.list_des.1",
    isTick: true,
  },
  {
    title: "new_pricing_page.descriptions_overview_expert_care.list_des.2",
    isTick: true,
  },
];

export const LIST_DESCRIPTION_OVERVIEW_SWIFT_EXPERTS: DescriptionPricing[] = [
  {
    title: "new_pricing_page.descriptions_overview_swift_experts.list_des.0",
    isTick: true,
  },
  {
    title: "new_pricing_page.descriptions_overview_swift_experts.list_des.1",
    isTick: true,
  },
  {
    title: "new_pricing_page.descriptions_overview_swift_experts.list_des.2",
    isTick: true,
  },
];

export const LIST_DESCRIPTION_STORE_ANALYSIS_PACKAGE: IDataDescription[] = [
  {
    title: "new_pricing_page.list_description_store_analysis.0.title",
    free: true,
    basic: true,
    premium: true,
    premium_plus: true,
    expert_care: true,
    swift_experts: true,
  },
  {
    title: "new_pricing_page.list_description_store_analysis.1.title",
    free: "-",
    basic: "10",
    premium: "30",
    premium_plus: "100",
    expert_care: "new_pricing_page.common.txt_unlimited",
    swift_experts: "-",
  },
  {
    title: "new_pricing_page.list_description_store_analysis.2.title",
    free: "-",
    basic: "-",
    premium: "-",
    premium_plus: true,
    expert_care: true,
    swift_experts: "-",
  },
];

export const LIST_DESCRIPTION_STORE_ANALYSIS_SERVICES: IDataDescription[] = [
  LIST_DESCRIPTION_STORE_ANALYSIS_PACKAGE[0],
  LIST_DESCRIPTION_STORE_ANALYSIS_PACKAGE[1],
  {
    title: "new_pricing_page.list_description_store_analysis.3.title",
    free: "-",
    basic: "-",
    premium: "-",
    premium_plus: "-",
    expert_care: true,
    swift_experts: "-",
  },
  {
    title: "new_pricing_page.list_description_store_analysis.4.title",
    free: "-",
    basic: "-",
    premium: "-",
    premium_plus: "-",
    expert_care: true,
    swift_experts: "-",
  },
];

export const LIST_DESCRIPTION_SPEED_PACKAGE: IDataDescription[] = [
  {
    title: "new_pricing_page.list_description_speed.0.title",
    free: true,
    basic: true,
    premium: true,
    premium_plus: true,
    expert_care: true,
    swift_experts: true,
  },
  {
    title: "new_pricing_page.list_description_speed.1.title",
    free: true,
    basic: true,
    premium: true,
    premium_plus: true,
    expert_care: true,
    swift_experts: true,
  },
  {
    title: "new_pricing_page.list_description_speed.2.title",
    free: "-",
    basic: "-",
    premium: true,
    premium_plus: true,
    expert_care: "-",
    swift_experts: "-",
  },
  {
    title: "new_pricing_page.list_description_speed.3.title",
    free: "-",
    basic: "10",
    premium: "30",
    premium_plus: "100",
    expert_care: "new_pricing_page.common.txt_unlimited",
    swift_experts: "-",
  },
  {
    title: "new_pricing_page.list_description_speed.4.title",
    free: "-",
    basic: "60",
    premium: "90",
    premium_plus: "120",
    expert_care: "new_pricing_page.common.txt_unlimited",
    swift_experts: "-",
  },
  {
    title: "new_pricing_page.list_description_speed.5.title",
    free: "-",
    basic: "new_pricing_page.common.txt_basic",
    premium: "new_pricing_page.common.txt_advanced",
    premium_plus: "new_pricing_page.common.txt_advanced",
    expert_care: "new_pricing_page.common.txt_ai_experts",
    swift_experts: "new_pricing_page.common.txt_experts",
  },
  {
    title: "new_pricing_page.list_description_speed.6.title",
    free: "-",
    basic: "new_pricing_page.common.txt_basic",
    premium: "new_pricing_page.common.txt_basic",
    premium_plus: "new_pricing_page.common.txt_advanced",
    expert_care: true,
    swift_experts: true,
  },
  {
    title: "new_pricing_page.list_description_speed.7.title",
    free: "-",
    basic: "-",
    premium: true,
    premium_plus: true,
    expert_care: true,
    swift_experts: "-",
  },
];

export const LIST_DESCRIPTION_SPEED_SERVICES: IDataDescription[] = [
  {
    title: "new_pricing_page.list_description_speed.2.title",
    free: "-",
    basic: "-",
    premium: "-",
    premium_plus: "-",
    expert_care: true,
    swift_experts: true,
  },
  {
    title: "new_pricing_page.list_description_speed.8.title",
    free: "-",
    basic: "-",
    premium: "-",
    premium_plus: "-",
    expert_care: "new_pricing_page.common.txt_unlimited",
    swift_experts: "new_pricing_page.common.txt_unlimited",
  },
  LIST_DESCRIPTION_SPEED_PACKAGE[5],
  {
    title: "new_pricing_page.list_description_speed.9.title",
    free: "-",
    basic: "-",
    premium: "-",
    premium_plus: "-",
    expert_care: true,
    swift_experts: true,
  },
  {
    title: "new_pricing_page.list_description_speed.10.title",
    free: "-",
    basic: "-",
    premium: "-",
    premium_plus: "-",
    expert_care: true,
    swift_experts: true,
  },
  {
    title: "new_pricing_page.list_description_speed.11.title",
    free: "-",
    basic: "-",
    premium: "-",
    premium_plus: "-",
    expert_care: true,
    swift_experts: true,
  },
  LIST_DESCRIPTION_SPEED_PACKAGE[6],
  LIST_DESCRIPTION_SPEED_PACKAGE[7],
]

export const LIST_DESCRIPTION_SEO_PACKAGE: IDataDescription[] = [
  {
    title: "new_pricing_page.list_description_seo.0.title",
    free: "-",
    basic : true,
    premium: true,
    premium_plus: true,
    expert_care: true,
    swift_experts: "-",
  },
  {
    title: "new_pricing_page.list_description_seo.1.title",
    free: "-",
    basic : "2,000",
    premium: "5,000",
    premium_plus: "10,000",
    expert_care: "50,000",
    swift_experts: "-",
  },
  {
    title: "new_pricing_page.list_description_seo.2.title",
    free: "-",
    basic : "-",
    premium: "-",
    premium_plus: true,
    expert_care: true,
    swift_experts: "-",
  },
  {
    title: "new_pricing_page.list_description_seo.3.title",
    free: true,
    basic : true,
    premium: true,
    premium_plus: true,
    expert_care: true,
    swift_experts: "-",
  },
  {
    title: "new_pricing_page.list_description_seo.4.title",
    free: "-",
    basic : "-",
    premium: "-",
    premium_plus: true,
    expert_care: true,
    swift_experts: "-",
  },
  {
    title: "new_pricing_page.list_description_seo.5.title",
    free: "-",
    basic : "-",
    premium: "-",
    premium_plus: true,
    expert_care: true,
    swift_experts: "-",
  },
  {
    title: "new_pricing_page.list_description_seo.6.title",
    free: true,
    basic : true,
    premium: true,
    premium_plus: true,
    expert_care: true,
    swift_experts: "-",
  },
  {
    title: "new_pricing_page.list_description_seo.7.title",
    free: "-",
    basic : "5",
    premium: "10",
    premium_plus: "30",
    expert_care: "new_pricing_page.common.txt_unlimited",
    swift_experts: "-",
  },
  {
    title: "new_pricing_page.list_description_seo.8.title",
    free: "-",
    basic : "-",
    premium: "-",
    premium_plus: true,
    expert_care: true,
    swift_experts: "-",
  },
  {
    title: "new_pricing_page.list_description_seo.9.title",
    free: true,
    basic : true,
    premium: true,
    premium_plus: true,
    expert_care: true,
    swift_experts: "-",
  },
  {
    title: "new_pricing_page.list_description_seo.10.title",
    free: "-",
    basic : true,
    premium: true,
    premium_plus: true,
    expert_care: true,
    swift_experts: "-",
  },
  {
    title: "new_pricing_page.list_description_seo.11.title",
    free: "-",
    basic : "-",
    premium: "-",
    premium_plus: true,
    expert_care: true,
    swift_experts: "-",
  },
  {
    title: "new_pricing_page.list_description_seo.12.title",
    free: "-",
    basic : "-",
    premium: "-",
    premium_plus: true,
    expert_care: true,
    swift_experts: "-",
  },
];

export const LIST_DESCRIPTION_SEO_SERVICES: IDataDescription[]  = [
  LIST_DESCRIPTION_SEO_PACKAGE[0],
  LIST_DESCRIPTION_SEO_PACKAGE[1],
  LIST_DESCRIPTION_SEO_PACKAGE[2],
  LIST_DESCRIPTION_SEO_PACKAGE[3],
  LIST_DESCRIPTION_SEO_PACKAGE[4],
  LIST_DESCRIPTION_SEO_PACKAGE[5],
  LIST_DESCRIPTION_SEO_PACKAGE[6],
  LIST_DESCRIPTION_SEO_PACKAGE[7],
  LIST_DESCRIPTION_SEO_PACKAGE[8],
  {
    title: "new_pricing_page.list_description_seo.13.title",
    free: "-",
    basic : "-",
    premium: "-",
    premium_plus: "-",
    expert_care: true,
    swift_experts: "-",
  },
  LIST_DESCRIPTION_SEO_PACKAGE[11],
  LIST_DESCRIPTION_SEO_PACKAGE[12],
]

export const LIST_DESCRIPTION_SUPPORT_PACKAGE: IDataDescription[] = [
  {
    title: "new_pricing_page.list_description_support.0.title",
    free: true,
    basic: true,
    premium: true,
    premium_plus: true,
    expert_care: true,
    swift_experts: true,
  },
  {
    title: "new_pricing_page.list_description_support.1.title",
    free: "-",
    basic: true,
    premium: true,
    premium_plus: true,
    expert_care: true,
    swift_experts: true,
  },
  {
    title: "new_pricing_page.list_description_support.2.title",
    free: "-",
    basic: "-",
    premium: true,
    premium_plus: true,
    expert_care: true,
    swift_experts: true,
  },
  {
    title: "new_pricing_page.list_description_support.4.title",
    free: "-",
    basic: "-",
    premium: "-",
    premium_plus: "-",
    expert_care: true,
    swift_experts: true,
  },
  {
    title: "new_pricing_page.list_description_support.5.title",
    free: "-",
    basic: "-",
    premium: "-",
    premium_plus: "-",
    expert_care: true,
    swift_experts: true,
  },
];

export const LIST_DESCRIPTION_SUPPORT_SERVICES: IDataDescription[] =[
  LIST_DESCRIPTION_SUPPORT_PACKAGE[0],
  {
    title: "new_pricing_page.list_description_support.3.title",
    free: "-",
    basic: "-",
    premium: "-",
    premium_plus: "-",
    expert_care: true,
    swift_experts: true,
  },
  LIST_DESCRIPTION_SUPPORT_PACKAGE[3],
  LIST_DESCRIPTION_SUPPORT_PACKAGE[4],
]

export const LIST_DES_TABLE_PACKAGE = [
  {
    title: "new_pricing_page.list_description_store_analysis.title",
    listDesTable: LIST_DESCRIPTION_STORE_ANALYSIS_PACKAGE,
  },
  {
    title: "new_pricing_page.list_description_seo.title",
    listDesTable: LIST_DESCRIPTION_SEO_PACKAGE,
  },
  {
    title: "new_pricing_page.list_description_speed.title",
    listDesTable: LIST_DESCRIPTION_SPEED_PACKAGE,
  },
  {
    title: "new_pricing_page.list_description_support.title",
    listDesTable: LIST_DESCRIPTION_SUPPORT_PACKAGE,
  },
];

export const LIST_DES_TABLE_SERVICES = [
  {
    title: "new_pricing_page.list_description_store_analysis.title",
    listDesTable: LIST_DESCRIPTION_STORE_ANALYSIS_SERVICES,
  },
  {
    title: "new_pricing_page.list_description_speed.title",
    listDesTable: LIST_DESCRIPTION_SPEED_SERVICES,
  },
  {
    title: "new_pricing_page.list_description_seo.title",
    listDesTable: LIST_DESCRIPTION_SEO_SERVICES,
  },
  {
    title: "new_pricing_page.list_description_support.title",
    listDesTable: LIST_DESCRIPTION_SUPPORT_SERVICES,
  },
];
