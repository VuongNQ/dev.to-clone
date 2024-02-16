import { useAppBridge } from "@shopify/app-bridge-react";
import { useAppSelector } from "@swift/hooks";
import { useUnAuthentication } from "@swift/hooks/useUnAuthentication";
import { customerData } from "@swift/store/global";
import { IDataConnectGoogle, IDataSitemap } from "@swift/types/advancedSEO";
import {
	ProductTag,
	StatusScanSEOType,
	TypePageSEOType
} from "@swift/types/boostSEO";
import { SwiftApiResponse } from "@swift/types/service";
import {
	initFetchAction
} from "@swift/utils/fetchAPI";

const useAdvancedSEOService = () => {
  const app = useAppBridge();
  const customer = useAppSelector(customerData);
  const { redirectUnAuthentication } = useUnAuthentication();

  /**api sitemap**/
  async function getDetailSitemap(): Promise<
    SwiftApiResponse<IDataSitemap | null>
  > {
    try {
      const result = await initFetchAction({
        method: "GET",
        url: "googleapi/sitemap",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: null };
    }
  }

  async function oauthGoogle({
    path,
  }: {
    path: string;
  }): Promise<SwiftApiResponse<IDataConnectGoogle | null>> {
    if (!customer) return { data: null, status: false };
    try {
      const result = await initFetchAction({
        url: "googleapi/oauth",
        method: "GET",
        params: {
          store_id: customer.id,
          page_path: path,
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

  async function addSite(): Promise<SwiftApiResponse<[] | null>> {
    try {
      const result = await initFetchAction({
        method: "POST",
        url: "googleapi/add-site",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: null };
    }
  }

  async function verifySiteOwnership(): Promise<SwiftApiResponse<[] | null>> {
    try {
      const result = await initFetchAction({
        method: "GET",
        url: "googleapi/verify-site-ownership",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: null };
    }
  }

  async function submitSitemap(): Promise<SwiftApiResponse<[] | null>> {
    try {
      const result = await initFetchAction({
        method: "POST",
        url: "googleapi/submit-sitemap",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: null };
    }
  }

  async function disconnectSearchConsole(): Promise<
    SwiftApiResponse<[] | null>
  > {
    try {
      const result = await initFetchAction({
        method: "POST",
        url: "googleapi/disconnect-search-console",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: null };
    }
  }

  /**end api sitemap**/

  return {
    oauthGoogle,
    addSite,
    verifySiteOwnership,
    submitSitemap,
    getDetailSitemap,
    disconnectSearchConsole,
  };
};

/** interface */
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

export { useAdvancedSEOService };

