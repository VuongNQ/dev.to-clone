import { useAppBridge } from "@shopify/app-bridge-react";
import { useUnAuthentication } from "@swift/hooks/useUnAuthentication";
import { IPostAutoScanSEO, ProductTag, StatusScanSEOType, TypePageSEOType } from "@swift/types/boostSEO";
import { IResponseLogSpeed } from "@swift/types/scanSpeed";
import { SwiftApiResponse } from "@swift/types/service";
import { initFetchAction } from "@swift/utils/fetchAPI";

const useScanWebsiteService = () => {
    const app = useAppBridge();

    const { redirectUnAuthentication } = useUnAuthentication();

    async function getLogOverview(): Promise<SwiftApiResponse<IScanCompetitorOverview>> {
        try {
            const result = await initFetchAction({
                method: "GET",
                url: "seo/scan/logs/overview",
                app,
            });

            await redirectUnAuthentication(result);

            return await result.json();
        } catch (error) {
            console.error(error);
            return {
                status: false,
                data: { count_competitor_scan: { current: 0, max: 0 } },
            };
        }
    }

    async function postAutoScanSEO({
        isAutoScan,
    }: // isCompetitor,
    IPostAutoScanSEO): Promise<SwiftApiResponse<postAutoScanSEOType>> {
        try {
            const result = await initFetchAction({
                method: "PUT",
                url: "seo/scan/setting-detail",
                body: {
                    is_auto_scan: isAutoScan,
                    // is_competitor: isCompetitor,
                },
                app,
            });

            await redirectUnAuthentication(result);

            return await result.json();
        } catch (error) {
            console.error(error);
            return { status: false, data: { success: false } };
        }
    }

    const postScanSEO = async (): Promise<SwiftApiResponse<postScanSEOType>> => {
        try {
            const result = await initFetchAction({
                method: "POST",
                url: "seo/scan",
                app,
            });

            await redirectUnAuthentication(result);

            return await result.json();
        } catch (error) {
            console.error(error);
            return { status: false, data: { state: "" } };
        }
    };

    const postScanCompetitor = async (payload: { urlScan?: string }): Promise<SwiftApiResponse<postScanSEOType>> => {
        try {
            const result = await initFetchAction({
                method: "POST",
                url: "seo/scan/competitor",
                app,
                body: {
                    url_scan: payload.urlScan,
                },
            });

            await redirectUnAuthentication(result);

            return await result.json();
        } catch (error) {
            console.error(error);
            return { status: false, data: { state: "" } };
        }
    };

    async function getLogSpeed(): Promise<SwiftApiResponse<IResponseLogSpeed | null>> {
        try {
            const result = await initFetchAction({
                method: "GET",
                url: "performance/scan/detail",
                app,
            });

            await redirectUnAuthentication(result);

            return await result.json();
        } catch (error) {
            console.error(error);
            return {
                status: false,
                data: null,
            };
        }
    }

    const postScanSpeed = async (): Promise<SwiftApiResponse<postScanSEOType>> => {
        try {
            const result = await initFetchAction({
                method: "POST",
                url: "performance/scan",
                app,
            });

            await redirectUnAuthentication(result);

            return await result.json();
        } catch (error) {
            console.error(error);
            return { status: false, data: { state: "" } };
        }
    };

    return {
        getLogOverview,
        postAutoScanSEO,
        postScanSEO,
        postScanCompetitor,
        postScanSpeed,
        getLogSpeed,
    };
};

/** interface */
interface postAutoScanSEOType {
    success: boolean;
}
interface postScanSEOType {
    state: string;
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

export interface IPayloadPostScanSEO {
    urlScan?: string;
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

export interface IScanCompetitorOverview {
    count_competitor_scan: ICountCompetitorScan;
}

interface ICountCompetitorScan {
    current: number;
    max: number;
}

/** end interface */

export { useScanWebsiteService };
