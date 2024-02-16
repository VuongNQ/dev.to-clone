import { useAppBridge } from "@shopify/app-bridge-react";
import { useAppSelector } from "@swift/hooks";
import { useUnAuthentication } from "@swift/hooks/useUnAuthentication";
import { customerData } from "@swift/store/global";
import { SwiftApiResponse } from "@swift/types/service";
import { initFetchAction } from "@swift/utils/fetchAPI";

const useGoogleApiService = () => {
  const app = useAppBridge();

  const customer = useAppSelector(customerData);

  const { redirectUnAuthentication } = useUnAuthentication();

  async function oauthGoogle({
    feature,
    path,
  }: IPayloadOauthGoogle): Promise<
    SwiftApiResponse<IResponseOauthGoogle | null>
  > {
    if (!customer) return { data: null, status: false };
    try {
      const result = await initFetchAction({
        url: "googleapi/oauth",
        method: "GET",
        params: {
          store_id: customer.id,
          page_path: path,
          feature: feature,
        },
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { data: null, status: false };
    }
  }

  return { oauthGoogle };
};

interface IResponseOauthGoogle {
  redirect_url: string;
}
interface IPayloadOauthGoogle {
  path: string;
  feature: "sitemap" | "ga4";
}

export { useGoogleApiService };
