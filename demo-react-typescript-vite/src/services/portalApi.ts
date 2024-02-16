import { useAppBridge } from "@shopify/app-bridge-react";
import { useUnAuthentication } from "@swift/hooks/useUnAuthentication";
import { IFetchAPI } from "@swift/types/general";
import { IDataGetTokenPortal, IDataListCheckupLogExpertCare, PortalListCheckupLogExpertCare } from "@swift/types/portal";
import { SwiftApiResponse } from "@swift/types/service";
import { convertInputToFetchOption, initFetchAction } from "@swift/utils/fetchAPI";
import dayjs from "dayjs";

const usePortalService = () => {
  const app = useAppBridge();

  const { redirectUnAuthentication } = useUnAuthentication();

  const fetchPortal = async (payload: IFetchAPI & IUseFetchPortal) => {
    const originalRequest = convertInputToFetchOption(payload);

    const isExpired = dayjs.unix(payload.exp || 0).diff(dayjs()) < 1;

    if (isExpired) {
      const { status, data } = await getTokenPortal();
      if (status && data) {
        const newRequest = convertInputToFetchOption({
          ...payload,
          token: data.token,
        });
        payload.setToken(data);
        return fetch(newRequest.requestUrl, newRequest.options);
      }
    }

    return fetch(originalRequest.requestUrl, originalRequest.options);
  };

  async function getTokenPortal(): Promise<
    SwiftApiResponse<IDataGetTokenPortal | null>
  > {
    try {
      const result = await initFetchAction({
        method: "POST",
        url: "portal/token",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();

      // dispatch({ type: "update_token", payload: data });
    } catch (error) {
      const data = { status: false, data: null };

      // dispatch({ type: "update_token", payload: null });

      return data;
    }
  }

  async function getListCheckupLogExpertCare({
    token,
    exp,
    setToken,
    page,
    limit = 10,
  }: IUseFetchPortal & IPayloadGetListCheckupLogExpertCare): Promise<
    PortalListCheckupLogExpertCare<IDataListCheckupLogExpertCare[] | null>
  > {
    try {
      const result = await fetchPortal({
        method: "GET",
        url: "v1/client/stores/speed/checkup-logs?",
        fullUrl: `${
          import.meta.env.VITE_PORTAL_API
        }/v1/client/stores/speed/checkup-logs`,
        token: token,
        exp,
        setToken,
        params: {
          page: page,
          limit: limit,
        },
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      return { data: null, code: 500, totalItems: 0, totalPages: 0, type: 1 };
    }
  }

  async function getReportCheckup({
    token,
    exp,
    setToken,
    id,
  }: IUseFetchPortal & IPayloadGetReportCheckup): Promise<{
    code: number;
    res?: Response;
  }> {
    try {
      const result = await fetchPortal({
        method: "GET",
        url: "v1/client/stores/speed/checkup-logs?",
        fullUrl: `${
          import.meta.env.VITE_PORTAL_API
        }/v1/client/stores/speed/checkup-logs/${id}/export-report`,
        token: token,
        exp,
        setToken,
      });
      const contentType = result.headers.get("Content-Type");

      if (contentType === "application/json") {
        return await result.json();
      }

      await redirectUnAuthentication(result);

      return {
        code: 200,
        res: result,
      };
    } catch (error) {
      return { code: 500 };
    }
  }

  return { getTokenPortal, getListCheckupLogExpertCare, getReportCheckup };
};

export interface PortalApiResponse<T> {
  message: string;
  code: number;
  type: number;
  data: T;
}

interface IPayloadGetListCheckupLogExpertCare {
  page: number;
  limit?: number;
}

interface IPayloadGetReportCheckup {
  id: number;
}

interface IUseFetchPortal extends IDataGetTokenPortal {
  setToken: (value: IDataGetTokenPortal | null) => void;
}

export { usePortalService };
