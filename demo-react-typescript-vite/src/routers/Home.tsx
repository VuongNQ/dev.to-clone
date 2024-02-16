/* Packages */
import { lazy } from "react";

const HomeLazyLoad = lazy(() => import("@swift/features/Home")); // Lazy-loaded

function HomeRouter() {
	return <HomeLazyLoad />;
}

export default HomeRouter;
