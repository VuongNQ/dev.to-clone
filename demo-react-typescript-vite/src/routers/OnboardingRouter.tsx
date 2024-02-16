/* Packages */
import { lazy } from "react";

const OnboardingFeature = lazy(
  () => import("@swift/features/OnboardingFeature")
); // Lazy-loaded

function OnboardingRouter() {
  return <OnboardingFeature />;
}

export default OnboardingRouter;
