import { useAppBridge } from "@shopify/app-bridge-react";
import { GetTotal } from "@swift/features/OptimizeImage/type";
import { useUnAuthentication } from "@swift/hooks/useUnAuthentication";
import {
    IDetailImageRaw,
    IFilterDay,
    IFilterTypeImage,
    IPayloadGetListImage,
    IPayloadOptimizeImage,
    IStatusOptimizeImage,
} from "@swift/types/OptimizeImage";
import { IAutoOptimizeSetting, IDataPagination } from "@swift/types/general";
import { SwiftApiResponse, SwiftApiResponseBase } from "@swift/types/service";
import { initFetchAction } from "@swift/utils/fetchAPI";

export const useOptimizeImageService = () => {
    const app = useAppBridge();

    const { redirectUnAuthentication } = useUnAuthentication();

    async function getOverView(): Promise<SwiftApiResponse<GetTotal | null>> {
        try {
            const result = await initFetchAction({
                url: "optimize-images/overview",
                app,
            });

            await redirectUnAuthentication(result);

            return await result.json();
        } catch (error) {
            console.error(error);
            return {
                status: false,
                message: JSON.stringify(error),
                data: null,
            };
        }
    }

    async function getSettingOptimize(): Promise<
        SwiftApiResponse<Partial<IAutoOptimizeSetting> | null>
    > {
        try {
            const result = await initFetchAction({
                url: "optimization-settings",
                app,
            });

            await redirectUnAuthentication(result);

            return await result.json();
        } catch (error) {
            console.error(error);
            return {
                status: false,
                message: JSON.stringify(error),
                data: null,
            };
        }
    }

    async function getListImage({
        page,
        filter,
        limit = 10,
    }: IPayloadGetListImage): Promise<
        SwiftApiResponse<IDataPagination<Array<IDetailImageRaw>> | null>
    > {
        try {
            const storeFilter = () => {
                const { day, status, type } = filter;
                const parseFilter: {
                    day?: IFilterDay;
                    status?: [IStatusOptimizeImage];
                    type?: [IFilterTypeImage];
                } = {};
                if (day !== IFilterDay.all_time) parseFilter.day = day;
                if (status !== IStatusOptimizeImage.all)
                    parseFilter.status = [status];
                if (type !== IFilterTypeImage.all_type)
                    parseFilter.type = [type];
                return { filters: { ...parseFilter } };
            };

            const result = await initFetchAction({
                url: "optimize-images/list",
                method: "POST",
                params: {
                    limit, // mặc định 1 page hiện 10 item
                    page,
                    order_by: "updated_at", // id | created_at | status | type | update_at
                    order_type: "desc", // asc | desc
                },
                body: storeFilter(),
                app,
            });

            await redirectUnAuthentication(result);

            return await result.json();
        } catch (error) {
            console.error(error);
            return {
                status: false,
                message: JSON.stringify(error),
                data: null,
            };
        }
    }

    async function getRedirectUrlPayment(
        url_redirect: string,
        plan: number
    ): Promise<
        SwiftApiResponse<{ redirect_url: string }> | SwiftApiResponseBase
    > {
        try {
            const result = await initFetchAction({
                url: "pricing/buy-images",
                method: "POST",
                body: { url_redirect, plan },
                app,
            });

            await redirectUnAuthentication(result);

            return await result.json();
        } catch (error) {
            console.error(error);
            return { status: false, message: JSON.stringify(error) };
        }
    }

    async function getRedirectUrlPaymentImage(
        url_redirect: string,
        plan: number
    ): Promise<SwiftApiResponse<{ redirect_url: string } | null>> {
        try {
            const result = await initFetchAction({
                url: "pricing/buy-images",
                method: "POST",
                body: { url_redirect, plan },
                app,
            });

            await redirectUnAuthentication(result);

            const { status = false, data } = await result.json();

            return { status, data };
        } catch (error) {
            console.error(error);
            return { status: false, data: null };
        }
    }

    async function callActionRestore(
        listImage: number[]
    ): Promise<
        SwiftApiResponse<{ valid_ids: number[]; invalid_ids: number[] }>
    > {
        try {
            const result = await initFetchAction({
                url: "optimize-images/restore",
                method: "POST",
                body: { optimized_ids: listImage },
                app,
            });

            await redirectUnAuthentication(result);

            return await result.json();
        } catch (error) {
            console.error(error);
            return {
                status: false,
                message: JSON.stringify(error),
                data: { valid_ids: [], invalid_ids: [] },
            };
        }
    }

    async function callActionOptimize({
        listImage,
        level = 80,
        optimizeType,
    }: IPayloadOptimizeImage): Promise<SwiftApiResponse<{ data: [] }>> {
        const option: Record<string, string | number | number[]> = {
            image_quality: level, // 60 | 80 | 100, default optimize level is 80
            optimized_ids: listImage || [], // []: Optimize all
        };
        if (optimizeType) option["optimize_all_type"] = optimizeType; // all | un_optimized | restored

        // console.log('>>>>>>data>>>>', data);
        try {
            const result = await initFetchAction({
                url: "optimize-images",
                method: "POST",
                body: option,
                app,
            });

            await redirectUnAuthentication(result);

            return await result.json();
        } catch (error) {
            console.error(error);
            return {
                status: false,
                message: JSON.stringify(error),
                data: { data: [] },
            };
        }
    }

    async function callSetAutoOptimizeImage(
        isActive = false
    ): Promise<SwiftApiResponse<Array<string>>> {
        try {
            const result = await initFetchAction({
                url: "optimization-settings",
                method: "POST",
                body: {
                    auto_optimize_image: isActive,
                },
                app,
            });

            await redirectUnAuthentication(result);

            return await result.json();
        } catch (error) {
            console.error(error);
            return {
                status: false,
                message: JSON.stringify(error),
                data: [],
            };
        }
    }

    async function callSyncStoreImage(): Promise<
        SwiftApiResponse<{ data: [] }>
    > {
        try {
            const result = await initFetchAction({
                url: "optimize-images/resync-image",
                method: "POST",
                app,
            });

            await redirectUnAuthentication(result);

            return await result.json();
        } catch (error) {
            // console.error(error);
            return {
                status: false,
                message: JSON.stringify(error),
                data: { data: [] },
            };
        }
    }

    return {
        getListImage,
        getRedirectUrlPayment,
        getOverView,
        getSettingOptimize,
        getRedirectUrlPaymentImage,
        callActionRestore,
        callActionOptimize,
        callSetAutoOptimizeImage,
        callSyncStoreImage,
    };
};
