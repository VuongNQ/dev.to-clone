/* Packages */
import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge/utilities";
import { lazy, useEffect } from "react";

const FeedbackFeatureLazyLoad = lazy(() => import("@swift/features/FeedbackFeature")); // Lazy-loaded

function FeedbackRouter() {
	const app = useAppBridge();
	useEffect(() => {
		window.appBridge = app;
		window.getTokenAppBridge = () => getSessionToken(app)
	})
	return <FeedbackFeatureLazyLoad />;
}

export default FeedbackRouter;
