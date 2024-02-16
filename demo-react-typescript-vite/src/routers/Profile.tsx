/* Packages */
import { lazy } from "react";

const ProfileLazyLoad = lazy(() => import("@swift/features/Profile")); // Lazy-loaded

function ProfileRouter() {
	return <ProfileLazyLoad />;
}

export default ProfileRouter;
