import { useAppBridge } from "@shopify/app-bridge-react";
import { useUnAuthentication } from "@swift/hooks/useUnAuthentication";
import { IDataBoostHistory } from "@swift/types/boostHistory";
import { IDataPagination } from "@swift/types/general";
import { SwiftApiResponse } from "@swift/types/service";
import { initFetchAction } from "@swift/utils/fetchAPI";

const useBoostHistoryService = () => {
  const app = useAppBridge();

  const { redirectUnAuthentication } = useUnAuthentication();

  async function getSpeedHistory({
    page,
  }: {
    page: number;
  }): Promise<SwiftApiResponse<IDataPagination<IDataBoostHistory[]> | null>> {
    try {
      const result = await initFetchAction({
        url: "boost-speed/histories",
        method: "GET",
        app,
        params: {
          page,
        },
      });

      await redirectUnAuthentication(result);

      const { status, data } = await result.json();

      return { status, data };
    } catch (error) {
      return { status: false, data: null };
    }
  }

  async function postSpeedHistory(): Promise<SwiftApiResponse<[]>> {
    try {
      const result = await initFetchAction({
        url: "boost-speed/boost",
        method: "POST",
        app,
      });

      await redirectUnAuthentication(result);

      const { status } = await result.json();

      return { status, data: [] };
    } catch (error) {
      return { status: false, data: [] };
    }
  }

  async function putAutoBoostSpeed(
    isAuto: boolean
  ): Promise<SwiftApiResponse<boolean>> {
    try {
      const result = await initFetchAction({
        url: "boost-speed/settings",
        method: "PUT",
        body: {
          auto: isAuto,
        },
        app,
      });

      await redirectUnAuthentication(result);

      const { status = false } = await result.json();

      if (!status) {
        return {
          status,
          data: false,
        };
      }

      return { status, data: true };
    } catch (error) {
      return { status: false, data: false };
    }
  }

  return { getSpeedHistory, postSpeedHistory,putAutoBoostSpeed };
};

export { useBoostHistoryService };
