/* Packages */
import { Page } from "@shopify/polaris";
import Breadcrumb from "@swift/components/UIs/Breadcrumb";
import TabsGeneral from "@swift/components/UIs/TabsGeneral";
import { BREADCRUMB_SPEED_OPTIMIZER } from "@swift/constants/constantBreadcrumb";
import { MENU_APP } from "@swift/constants/constantMenu";
import { TABS_SPEED_OPTIMIZER } from "@swift/constants/constantTabs";
import { lazy } from "react";
import { useTranslation } from "react-i18next";

// Lazy-loaded
const SmartBoosterFeature = lazy(
  () => import("@swift/features/SmartBoosterFeature")
); // Lazy-loaded

const CustomizeLoadingFeature = lazy(
  () => import("@swift/features/CustomizeLoading")
); // Lazy-loaded

const OptimizeImage = lazy(() => import("@swift/features/OptimizeImage"));

const BoostHistoryFeature = lazy(
  () => import("@swift/features/BoostHistoryFeature")
);

const OptimizeThemeFeature = lazy(
  () => import("@swift/features/OptimizeThemeFeature")
);

export function Component() {
  const { t } = useTranslation();

  const TABS_SPEED = [
    {
      id: TABS_SPEED_OPTIMIZER.smart_booster.key,
      content: t(TABS_SPEED_OPTIMIZER.smart_booster.title),
      component: <SmartBoosterFeature />,
      tabs: TABS_SPEED_OPTIMIZER.smart_booster.key,
    },
    {
      id: TABS_SPEED_OPTIMIZER.optimize_images.key,
      content: t(TABS_SPEED_OPTIMIZER.optimize_images.title),
      component: <OptimizeImage />,
      tabs: TABS_SPEED_OPTIMIZER.optimize_images.key,
    },
    {
      id: TABS_SPEED_OPTIMIZER.optimize_theme.key,
      content: t(TABS_SPEED_OPTIMIZER.optimize_theme.title),
      component: <OptimizeThemeFeature />,
      tabs: TABS_SPEED_OPTIMIZER.optimize_theme.key,
    },
    {
      id: TABS_SPEED_OPTIMIZER.customize_loading.key,
      content: t(TABS_SPEED_OPTIMIZER.customize_loading.title),
      component: <CustomizeLoadingFeature />,
      tabs: TABS_SPEED_OPTIMIZER.customize_loading.key,
    },
    {
      id: TABS_SPEED_OPTIMIZER.boost_history.key,
      content: t(TABS_SPEED_OPTIMIZER.boost_history.title),
      component: <BoostHistoryFeature />,
      tabs: TABS_SPEED_OPTIMIZER.boost_history.key,
    },
  ];

  return (
    <>
      <Breadcrumb listBreadcrumb={BREADCRUMB_SPEED_OPTIMIZER} />
      <Page
        title={t("advanced_mode_page.title")}
        subtitle={t("advanced_mode_page.des")}
      >
        <TabsGeneral
          menu={TABS_SPEED}
          urlRedirect={`${MENU_APP[2].destination}?tabs=`}
          paramsQuery="tabs"
        />
      </Page>
    </>
  );
}
