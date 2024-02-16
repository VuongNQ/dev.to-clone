import { useAppBridge } from "@shopify/app-bridge-react";
import { useAppQuery } from "@swift/hooks/useAppQuery";
import { useUnAuthentication } from "@swift/hooks/useUnAuthentication";
import {
  DataLogsType,
  IDataBulkAddAltImgAndMetaTag,
  ProductTag,
  ScanSettingType,
  StatusScanSEOType,
  TypePageSEOType,
} from "@swift/types/boostSEO";
import { SwiftApiResponse } from "@swift/types/service";
import {
  convertInputToFetchOption,
  initFetchAction,
} from "@swift/utils/fetchAPI";

const useBoostSEOService = () => {
  const app = useAppBridge();
  const { redirectUnAuthentication } = useUnAuthentication();

  const getScanLogsSEO = async (
    payload: IPayloadScanLogsSEOPayloadType
  ): Promise<SwiftApiResponse<DataLogsType | null>> => {
    const paramsOption = storeParamsGetScan(payload);
    try {
      const result = await initFetchAction({
        method: "GET",
        url: "seo/scan/logs",
        params: {
          ...(paramsOption as unknown as Record<string, string | number>),
        },
        app,
      });

      await redirectUnAuthentication(result);

      const { status = false, data } = await result.json();

      if (!data || (data && data.data.length === 0))
        return { status, data: null };

      return { status, data: data.data[0] };
    } catch (error) {
      console.error(error);
      return { status: false, data: null };
    }
  };

  async function getDetailScanSettingSEO(): Promise<
    SwiftApiResponse<ScanSettingType | null>
  > {
    try {
      const result = await initFetchAction({
        method: "GET",
        url: "seo/scan/setting-detail",
        // params: {
        //     domain_scan,
        // },
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: null };
    }
  }

  async function getIsStoreWaited(): Promise<
    SwiftApiResponse<{
      is_waiting_store: boolean;
    } | null>
  > {
    try {
      const result = await initFetchAction({
        method: "GET",
        url: "waiting-store/is-waiting-store",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: null };
    }
  }

  async function postStoreWaiting(): Promise<SwiftApiResponse<boolean>> {
    try {
      const result = await initFetchAction({
        method: "POST",
        url: "waiting-store/add",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: false };
    }
  }

  async function postSaveSettingProductBoostSEO(
    payload: Partial<IPostSEOImageType>
  ): Promise<SwiftApiResponse<[]>> {
    try {
      const bodyParams: Record<string, unknown> = {};

      for (const key in payload) {
        const prop = key as keyof IPostSEOImageType;

        bodyParams[key] = Array.isArray(payload[prop])
          ? (payload[prop] as Array<ProductTag>).join(" ")
          : payload[prop];
      }

      const result = await initFetchAction({
        method: "POST",
        url: "boost-seo-setting",
        body: bodyParams,
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: [] };
    }
  }

  async function getSettingProductBoostSEO(): Promise<
    SwiftApiResponse<IPostSeoImage | null>
  > {
    try {
      const result = await initFetchAction({
        method: "GET",
        url: "boost-seo-setting",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: null };
    }
  }

  async function postScanMissingAltImage(): Promise<SwiftApiResponse<[]>> {
    try {
      const result = await initFetchAction({
        method: "POST",
        url: "boost-seo-setting/scan-missing-alt-images",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: [] };
    }
  }

  async function postBulkAddAltImg(): Promise<SwiftApiResponse<[]>> {
    try {
      const result = await initFetchAction({
        method: "POST",
        url: "boost-seo-setting/bulk-add-alt-images",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: [] };
    }
  }

  async function postScanMissingMetaTag(): Promise<SwiftApiResponse<[]>> {
    try {
      const result = await initFetchAction({
        method: "POST",
        url: "boost-seo-setting/scan-missing-meta-tags",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: [] };
    }
  }

  async function postBulkAddMetaTag(): Promise<SwiftApiResponse<[]>> {
    try {
      const result = await initFetchAction({
        method: "POST",
        url: "boost-seo-setting/bulk-add-meta-tags",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: [] };
    }
  }

  async function getBulkAddAltImgAndMetaTag(): Promise<
    SwiftApiResponse<IDataBulkAddAltImgAndMetaTag[]>
  > {
    try {
      const result = await initFetchAction({
        method: "GET",
        url: "boost-seo-setting/boost-seo-logs",
        app,
      });

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: [] };
    }
  }

  return {
    getScanLogsSEO,
    getDetailScanSettingSEO,
    postStoreWaiting,
    getIsStoreWaited,
    postSaveSettingProductBoostSEO,
    getSettingProductBoostSEO,
    postBulkAddAltImg,
    postBulkAddMetaTag,
    getBulkAddAltImgAndMetaTag,
    postScanMissingAltImage,
    postScanMissingMetaTag,
  };
};

export const useGetSettingProductSEO = () => {
  const { requestUrl, options } = convertInputToFetchOption({
    url: "boost-seo-setting",
  });
  return useAppQuery<SwiftApiResponse<IPostSeoImage | null>>({
    url: requestUrl,
    fetchInit: options,
    queryKey: ["boost-seo-setting"],
  });
};

function storeParamsGetScan(payload: IPayloadScanLogsSEOPayloadType) {
  const {
    page,
    limit,
    url_type,
    StatusScan,
    domain_scan,
    is_competitor = false,
  } = payload;
  let paramsOption: getScanLogsSEOOptionType = {
    page,
    limit,
    is_competitor: is_competitor,
  };

  if (StatusScan) {
    paramsOption = {
      ...paramsOption,
      status: StatusScan,
    };
  }

  if (domain_scan && domain_scan !== "") {
    paramsOption = {
      ...paramsOption,
      domain_scan: domain_scan,
    };
  }

  if (url_type) {
    paramsOption = {
      ...paramsOption,
      url_type,
    };
  }
  return paramsOption;
}

/** interface */
interface getScanLogsSEOOptionType {
  page: number;
  limit: number;
  is_competitor?: boolean;
  url_type?: TypePageSEOType;
  status?: StatusScanSEOType;
  domain_scan?: string;
}

export interface IPostSeoImage {
  id: number;
  store_id: number;
  auto_add_alt_image: 0 | 1;
  auto_add_meta_tags: 0 | 1;
  product_alt_image_format: string | null;
  product_meta_title_format: string | null;
  product_meta_description_format: string | null;
}

export interface IPayloadScanLogsSEOPayloadType {
  page: number;
  limit: number;
  is_competitor?: boolean;
  url_type?: TypePageSEOType;
  StatusScan?: StatusScanSEOType;
  domain_scan?: string;
}

export interface IPostSEOImageType {
  auto_add_alt_image: boolean;
  auto_add_meta_tags: boolean;
  product_alt_image_format: Array<ProductTag> | string;
  product_meta_title_format: Array<ProductTag> | string;
  product_meta_description_format: Array<ProductTag> | string;
}

export enum EKeyPayloadSaveSettingProductSEO {
  auto_add_alt_image = "auto_add_alt_image",
  auto_add_meta_tags = "auto_add_meta_tags",
}

/** end interface */

export { useBoostSEOService };
