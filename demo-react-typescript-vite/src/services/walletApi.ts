import { useAppBridge } from "@shopify/app-bridge-react";
import { useUnAuthentication } from "@swift/hooks/useUnAuthentication";
import { IDataPagination } from "@swift/types/general";
import { SwiftApiResponse } from "@swift/types/service";
import { IWalletDetail, IWalletDetailHistory, IGetHistoryToken } from "@swift/types/wallet";
import { initFetchAction } from "@swift/utils/fetchAPI";

import dayjs from "dayjs";

const useWalletService = () => {
    const app = useAppBridge();

    const { redirectUnAuthentication } = useUnAuthentication();

    async function getDetailWallet(): Promise<SwiftApiResponse<IWalletDetail | null>> {
        try {
            const result = await initFetchAction({
                method: "GET",
                url: "wallet/detail",
                app,
            });

            await redirectUnAuthentication(result);

            const { status = false, data } = await result.json();

            return { status, data };
        } catch (error) {
            return {
                status: false,
                data: null,
            };
        }
    }

    async function getHistoryToken({
        filterBy,
        range = 0,
        page = 1,
    }: IGetHistoryToken): Promise<SwiftApiResponse<IDataPagination<IWalletDetailHistory[]> | null>> {
        const body: { filters?: { transaction_type: string }; range?: string[] } = {};

        if (filterBy !== "all") {
            body.filters = {
                transaction_type: filterBy === "usage" ? "used" : "deposit", // used, deposit
            };
        }

        if (range && range > 0) {
            const currentDay = dayjs();
            body.range = [
                currentDay.format("YYYY-MM-DD") + " 23:59:59",
                currentDay.subtract(range, "days").format("YYYY-MM-DD") + " 00:00:00",
            ];
        }

        try {
            const result = await initFetchAction({
                method: "POST",
                url: "wallet/history",
                body,
                params: {
                    page,
                    limit: 10,
                },
                app,
            });

            await redirectUnAuthentication(result);

            const { status = false, data } = await result.json();

            return { status, data };
        } catch (error) {
            return {
                status: false,
                data: null,
            };
        }
    }

    return {
        getHistoryToken,
        getDetailWallet,
    };
};
export default useWalletService;
