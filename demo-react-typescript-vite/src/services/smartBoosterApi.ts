import { useAppBridge } from "@shopify/app-bridge-react";
import { useUnAuthentication } from "@swift/hooks/useUnAuthentication";
import { SwiftApiResponse } from "@swift/types/service";
import {
  IDataAccountGA,
  IDataDetailGA,
  IResponseOverViewReport,
  KeyStepConnectGoogle,
  KeyStepGA,
} from "@swift/types/smartBooster";
import { initFetchAction } from "@swift/utils/fetchAPI";

const useSmartBoosterService = () => {
  const app = useAppBridge();

  const { redirectUnAuthentication } = useUnAuthentication();

  /** GA 4 */

  async function getSettingGA(): Promise<SwiftApiResponse<IDataDetailGA[]>> {
    try {
      const result = await initFetchAction({
        method: "GET",
        url: "googleapi/ga4",
        app,
      });

      await redirectUnAuthentication(result);

      const { data, status = false } = await result.json();

      return { data, status };
    } catch (error) {
      console.error(error);
      return { data: [], status: false };
    }
  }

  async function postDisConnectGA(): Promise<SwiftApiResponse<boolean>> {
    try {
      const result = await initFetchAction({
        url: "googleapi/ga4/disconnect",
        method: "POST",
        app,
      });

      await redirectUnAuthentication(result);

      const { status = false } = await result.json();

      return { status, data: true };
    } catch (error) {
      return { status: false, data: false };
    }
  }

  async function getDataStreamsGA(): Promise<
    SwiftApiResponse<IDataAccountGA[]>
  > {
    try {
      const result = await initFetchAction({
        url: "googleapi/ga4/dataStreams",
        method: "GET",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      return { status: false, data: [] };
    }
  }

  async function postSaveDataGA(
    payload: IPayloadSaveDataGA
  ): Promise<SwiftApiResponse<IResponsePostSaveDataGA | null>> {
    try {
      const result = await initFetchAction({
        url: "googleapi/ga4/save",
        method: "POST",
        app,
        body: { ...payload },
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      return { status: false, data: null };
    }
  }

  async function getOverViewReport(
    offset: number
  ): Promise<SwiftApiResponse<IResponseOverViewReport>> {
    try {
      const result = await initFetchAction({
        url: "googleapi/ga4/runReport",
        method: "GET",
        app,
        params: { offset: offset, limit: 10 },
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      return {
        status: false,
        data: { rowCount: null, metricHeaders: [], dimensionHeaders: [] },
      };
    }
  }

  async function getReportCountry(): Promise<
    SwiftApiResponse<IResponseOverViewReport>
  > {
    try {
      const result = await initFetchAction({
        url: "googleapi/ga4/runReportCountry",
        method: "GET",
        app,
        params: {
          limit: 7,
        },
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      return {
        status: false,
        data: { rowCount: null, metricHeaders: [], dimensionHeaders: [] },
      };
    }
  }

  async function getReportUser(): Promise<
    SwiftApiResponse<IResponseOverViewReport>
  > {
    try {
      const result = await initFetchAction({
        url: "googleapi/ga4/runReportUser",
        method: "GET",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      return {
        status: false,
        data: { rowCount: null, metricHeaders: [], dimensionHeaders: [] },
      };
    }
  }

  /** end GA 4 */

  return {
    getSettingGA,
    postDisConnectGA,
    getDataStreamsGA,
    postSaveDataGA,
    getOverViewReport,
    getReportCountry,
    getReportUser,
  };
};

interface IPayloadSaveDataGA {
  step: KeyStepGA;
  account: string;
  property: string;
  measurementId: string;
}

interface IResponsePostSaveDataGA {
  account: string;
  created_at: string;
  id: number;
  is_connected: KeyStepConnectGoogle;
  measurementId: string;
  property: string;
  step: KeyStepGA;
  store_id: number;
  updated_at: string;
}

export { useSmartBoosterService };
