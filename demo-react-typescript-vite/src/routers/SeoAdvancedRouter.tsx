import { Page } from "@shopify/polaris";
import Breadcrumb from "@swift/components/UIs/Breadcrumb";
import TabsGeneral from "@swift/components/UIs/TabsGeneral";
import { BREADCRUMB_SEO_ADVANCED } from "@swift/constants/constantBreadcrumb";
import { PAGES_SEO } from "@swift/constants/constantsGeneral";
import { TABS_SEO_ADVANCE } from "@swift/constants/constantsSeoAdvanced";
import { lazy } from "react";
import { useTranslation } from "react-i18next";

const TabsSiteMapSEO = lazy(() => import("@swift/features/SiteMapSEO"));

const TabsSnippetsSEO = lazy(() => import("@swift/features/SnippetsSEO"));

const Monitor404SEO = lazy(() => import("@swift/features/Monitor404SEO"));

export function Component() {
    const { t } = useTranslation();

    const TABS_ADVANCED = [
        {
            id: TABS_SEO_ADVANCE.site_map.key,
            content: t(TABS_SEO_ADVANCE.site_map.title),
            component: <TabsSiteMapSEO />,
            tabs: TABS_SEO_ADVANCE.site_map.key,
        },
        {
            id: TABS_SEO_ADVANCE.snippets.key,
            content: t(TABS_SEO_ADVANCE.snippets.title),
            component: <TabsSnippetsSEO />,
            tabs: TABS_SEO_ADVANCE.snippets.key,
        },
        {
            id: TABS_SEO_ADVANCE.monitor.key,
            content: t(TABS_SEO_ADVANCE.monitor.title),
            component: <Monitor404SEO />,
            tabs: TABS_SEO_ADVANCE.monitor.key,
        },
    ];

    return (
        <>
            <Breadcrumb listBreadcrumb={BREADCRUMB_SEO_ADVANCED} />
            <Page
                title={t(`${PAGES_SEO["advance_SEO"].title}`)}
                subtitle={t(`${PAGES_SEO["advance_SEO"].des}`)}
            >
                <TabsGeneral
                    menu={TABS_ADVANCED}
                    urlRedirect="/seo-advanced?tabs="
                    paramsQuery="tabs"
                />
            </Page>
        </>
    );
}
