/* Packages */
import { lazy } from "react";

const OneExpertsFeature = lazy(
  () => import("@swift/features/OneExpertsFeature")
); // Lazy-loaded

function OneExpertsRouter() {
  return <OneExpertsFeature />;
}

export default OneExpertsRouter;
