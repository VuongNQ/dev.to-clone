import { ITabsSEOAdvance } from "@swift/types/boostSEO";
import { IDataSnippetSetting } from "@swift/types/snippetSEO";

export const TABS_SEO_ADVANCE = {
    [ITabsSEOAdvance.site_map]: {
        key: ITabsSEOAdvance.site_map,
        title: "boostSEO.list_tabs.site_map.title",
        des: "boostSEO.list_tabs.site_map.des",
        desPage: "smartSEO.site_map.des",
    },
    [ITabsSEOAdvance.redirections]: {
        key: ITabsSEOAdvance.redirections,
        title: "boostSEO.list_tabs.redirections.title",
        des: "boostSEO.list_tabs.redirections.des",
    },
    [ITabsSEOAdvance.snippets]: {
        key: ITabsSEOAdvance.snippets,
        title: "boostSEO.list_tabs.snippets.title",
        des: "boostSEO.list_tabs.snippets.des",
    },
    [ITabsSEOAdvance.monitor]: {
        key: ITabsSEOAdvance.monitor,
        title: "boostSEO.list_tabs.monitor.title",
        des: "boostSEO.list_tabs.monitor.des",
    },
};

export const SNIPPET_SETTING_DEFAULT: IDataSnippetSetting = {
    brand_name: "",
    faqs: [],
    is_faq_active: false,
    is_collection_active: false,
    is_organization_active: false,
    is_product_active: false,
    is_blog_active: false,
    logo_link: "",
    product_review_app: "auto",
    reference_page: "",
    social_links: null,
};
