import { useAppBridge } from "@shopify/app-bridge-react";
import { useUnAuthentication } from "@swift/hooks/useUnAuthentication";
import { IDataSettingMonitor } from "@swift/types/monitor404SEO";
import { SwiftApiResponse } from "@swift/types/service";
import { initFetchAction } from "@swift/utils/fetchAPI";

const useMonitor404SEOService = () => {
  const app = useAppBridge();
  const { redirectUnAuthentication } = useUnAuthentication();

  async function getSetting(): Promise<
    SwiftApiResponse<IDataSettingMonitor>
  > {
    try {
      const result = await initFetchAction({
        method: "GET",
        url: "broken-link/settings",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data:{is_redirect_to_home:false,is_send_email:false} };
    }
  }

  async function postSaveSetting(
    payload: Partial<IDataSettingMonitor>
  ): Promise<SwiftApiResponse<boolean>> {
    try {
      const result = await initFetchAction({
        url: "broken-link/settings",
        method: "POST",
        app,
        body: { ...payload },
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { data: false, status: false };
    }
  }

  /**end api sitemap**/

  return {
    getSetting,
    postSaveSetting,
  };
};

export { useMonitor404SEOService };

