import { ITabsSEOBasic, PageSEOType } from "@swift/types/boostSEO";

export const PAGES_SEO = {
  [PageSEOType.boost_SEO]: {
    key: PageSEOType.boost_SEO,
    title: "boostSEO.page_home.title",
    des: "boostSEO.page_home.des",
  },
  [PageSEOType.basic_SEO]: {
    key: PageSEOType.basic_SEO,
    title: "smartSEO.SEO_basic.title",
    des: "smartSEO.SEO_basic.des",
  },
  [PageSEOType.advance_SEO]: {
    key: PageSEOType.advance_SEO,
    title: "smartSEO.SEO_advance.title",
    des: "smartSEO.SEO_advance.des",
  },
};

export const TABS_SMART_SEO_BASIC = {
  [ITabsSEOBasic.scan_website]: {
    key: ITabsSEOBasic.scan_website,
    title: "boostSEO.list_tabs.scan_website.title",
    des: "boostSEO.list_tabs.scan_website.des",
  },
  [ITabsSEOBasic.alt_images]: {
    key: ITabsSEOBasic.alt_images,
    title: "boostSEO.list_tabs.alt_images.title",
    des: "boostSEO.list_tabs.alt_images.des",
  },
  [ITabsSEOBasic.meta_title]: {
    key: ITabsSEOBasic.meta_title,
    title: "boostSEO.list_tabs.meta_title.title",
    des: "boostSEO.list_tabs.meta_title.des",
  },
  [ITabsSEOBasic.audit_product]: {
    key: ITabsSEOBasic.audit_product,
    title: "boostSEO.list_tabs.audit_product.title",
    des: "boostSEO.list_tabs.audit_product.des",
  },
};

export const MAXIMUM_TOTAL_SHOPIFY = 10000;