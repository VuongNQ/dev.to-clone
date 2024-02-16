import PolarisProvider from "@swift/components/Providers/PolarisProvider";
import Loading from "@swift/components/UIs/Loading";
import HomeRouter from "@swift/routers/Home";
import NotFound from "@swift/routers/NotFound";
import { Suspense } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "./Layout";
import OneExpertsRouter from "./OneExpertsRouter";
import PricingRouter from "./PricingRouter";
import ProfileRouter from "./Profile";
import UnInstallRouter from "./UnInstallRouter";
// import SpeedOptimizerRouter from "./SpeedOptimizerRouter";
import FeedbackRouter from "./FeedbackRouter";
import OnboardingRouter from "./OnboardingRouter";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      errorElement={
        <Suspense fallback={<Loading />}>
          <PolarisProvider>
            <NotFound />
          </PolarisProvider>
        </Suspense>
      }
    >
      <Route index element={<HomeRouter />} />
      <Route path="seo-basic" lazy={()=>import('./SeoBasicRouter')} />
      <Route path="seo-advanced" lazy={()=>import('./SeoAdvancedRouter')} />
      <Route path="pricing" element={<PricingRouter />} />
      <Route path="un-install" element={<UnInstallRouter />} />
      <Route path="profile" element={<ProfileRouter />} />
      <Route path="speed-optimizer" lazy={()=>import('./SpeedOptimizerRouter')} />
      <Route path="one-experts" element={<OneExpertsRouter />} />
      <Route path="feedback" element={<FeedbackRouter />} />
      <Route path="onboarding" element={<OnboardingRouter />} />
    </Route>
  )
);
