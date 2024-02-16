import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { customerData } from "@swift/store/global";
import { useAppSelector } from ".";
import { BlockExtentionApp } from "@swift/types/general";

const useFuncRedirect = () => {
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const customer = useAppSelector(customerData);

  const onRedirectApp = (url: string) => {
    redirect.dispatch(Redirect.Action.APP, url);
  };
  const onRedirectRemoteCurrentTabs = (url: string) => {
    redirect.dispatch(Redirect.Action.REMOTE, url);
  };

  const onRedirectRemoteNewTabs = (url: string) => {
    redirect.dispatch(Redirect.Action.REMOTE, {
      url: url,
      newContext: true,
    })
  };

  const onRedirectAppExtension = (blockApp: BlockExtentionApp) => {
    const IDAppExtension = import.meta.env.VITE_SHOPIFY_SWIFT_OPTIMIZE_ID;
    const url = `https://${customer?.shopify_domain}/admin/themes/current/editor?context=apps&activateAppId=${IDAppExtension}/${blockApp}`
    redirect.dispatch(Redirect.Action.REMOTE, {
      url: url,
      newContext: true,
    })
  };

  return {
    onRedirectApp,
    onRedirectRemoteCurrentTabs,
    onRedirectRemoteNewTabs,
    onRedirectAppExtension
  };
};

export default useFuncRedirect;
