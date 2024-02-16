/* Packages */
import { lazy } from "react";

const PricingRouterLazyLoad = lazy(
  () => import("@swift/features/NewFeaturesAndPricing")
); // Lazy-loaded

function PricingRouter() {
  return <PricingRouterLazyLoad />;
}

export default PricingRouter;
