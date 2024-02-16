import { useAppBridge } from "@shopify/app-bridge-react";
import { GetSettingCustomLoadingType } from "@swift/features/CustomizeLoading/type";
import { useUnAuthentication } from "@swift/hooks/useUnAuthentication";
import { SwiftApiResponse } from "@swift/types/service";
import { initFetchAction } from "@swift/utils/fetchAPI";

const useCustomizeLoadingService = () => {
  const app = useAppBridge();

  const { redirectUnAuthentication } = useUnAuthentication();

  async function saveCustomLoading(
    payload: FormData
  ): Promise<SwiftApiResponse<boolean>> {
    try {
      const result = await initFetchAction({
        url: "loading-screen/settings",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "POST",
        body: payload,
        app,
        isFormData: true,
      });

      await redirectUnAuthentication(result)

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: false };
    }
  }

  async function getSettingCustomLoading(): Promise<
    SwiftApiResponse<GetSettingCustomLoadingType>
  > {
    try {
      const result = await initFetchAction({
        method: "GET",
        url: "loading-screen/settings",
        app,
      });

      await redirectUnAuthentication(result)

      return await result.json();
    } catch (error) {
      console.error(error);
      return {
        status: false,
        data: {
          settings: null,
          style: null,
        },
      };
    }
  }

  return { saveCustomLoading, getSettingCustomLoading };
};

export { useCustomizeLoadingService };
