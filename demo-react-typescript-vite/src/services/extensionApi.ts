import { useAppBridge } from "@shopify/app-bridge-react";
import { useUnAuthentication } from "@swift/hooks/useUnAuthentication";
import { SwiftApiResponse } from "@swift/types/service";
import { initFetchAction } from "@swift/utils/fetchAPI";

const useExtensionService = () => {
  const app = useAppBridge();

  const { redirectUnAuthentication } = useUnAuthentication();

  async function getStatusExtension(
    extension: "seo" | "speed"
  ): Promise<SwiftApiResponse<[]>> {
    try {
      const url = `extensions/${extension}/active`;
      const result = await initFetchAction({
        url: url,
        method: "GET",
        app,
      });

      await redirectUnAuthentication(result);

      const { status, data } = await result.json();

      return { status, data };
    } catch (error) {
      return { status: false, data: [] };
    }
  }

  return { getStatusExtension };
};

export { useExtensionService };

