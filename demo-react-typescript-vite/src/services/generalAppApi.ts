import { useAppBridge } from "@shopify/app-bridge-react";
import { useUnAuthentication } from "@swift/hooks/useUnAuthentication";
import { CustomerDataState } from "@swift/store/type";
import { EOnBoard, IDataCrispChat } from "@swift/types/general";
import { SwiftApiResponse } from "@swift/types/service";
import {
    convertInputToFetchOption,
    initFetchAction,
} from "@swift/utils/fetchAPI";

const useGeneralAppService = () => {
    const app = useAppBridge();

    const { redirectUnAuthentication } = useUnAuthentication();

    async function getGenerateEmbedUrl(
        pathCB?: string
    ): Promise<SwiftApiResponse<getGenerateEmbedUrlType>> {
        let params;
        if (pathCB) {
            params = {
                path: pathCB,
            };
        }
        try {
            const result = await initFetchAction({
                url: "generate-embedded-app-url",
                app,
                params,
            });

            await redirectUnAuthentication(result);

            return await result.json();
        } catch (error) {
            console.error(error);
            return { status: false, data: { url: "" } };
        }
    }

    async function getInitCrisp(): Promise<{
        status: boolean;
        data: IDataCrispChat | null;
    }> {
        try {
            const result = await initFetchAction({
                url: "stores/crisp-chat",
                app,
                method: "GET",
            });

            await redirectUnAuthentication(result);

            return await result.json();
        } catch (error) {
            return { status: false, data: null };
        }
    }

    async function getCustomerDetailStore(): Promise<
        SwiftApiResponse<CustomerDataState | null>
    > {
        try {
            const result = await initFetchAction({
                // url: "store",
                url: "stores/detail",
                app,
            });

            await redirectUnAuthentication(result);

            return await result.json();
        } catch (error) {
            console.error(error);
            return { status: false, data: null };
        }
    }

    async function postUserFirstInstallApp(
        payload: IPostUserFirstInstallApp
    ): Promise<SwiftApiResponse<number>> {
        try {
            const result = await initFetchAction({
                url: "crispchat/after-install",
                method: "POST",
                app,
                body: { ...payload },
            });

            await redirectUnAuthentication(result);

            return await result.json();
        } catch (error) {
            console.error(error);
            return { status: false, data: 0 };
        }
    }

    async function putStoreDetail(
        payload: IPayloadPutStoreDetail
    ): Promise<SwiftApiResponse<boolean>> {
        try {
            const result = await initFetchAction({
                method: "PUT",
                url: "stores/detail",
                body: { ...payload },
                app,
            });

            // await redirectUnAuthentication(result);

            const { status = false } = await result.json();

            return { status, data: true };
        } catch (error) {
            return {
                status: false,
                data: false,
            };
        }
    }

    async function callSetAppLock(
        isLock: boolean
    ): Promise<SwiftApiResponse<boolean>> {
        try {
            const result = await initFetchAction({
                url: `stores/${isLock ? "lock" : "unlock"}`,
                method: "PUT",
                app,
            });

            await redirectUnAuthentication(result);

            return await result.json();
        } catch (error) {
            console.error(error);
            return { status: false, data: false };
        }
    }

    return {
        getGenerateEmbedUrl,
        getInitCrisp,
        getCustomerDetailStore,
        postUserFirstInstallApp,
        putStoreDetail,
        callSetAppLock,
    };
};

const getCheckScopeStore = async () => {
    try {
        const { requestUrl, options } = convertInputToFetchOption({
            url: "check-update",
        });
        const result = await fetch(requestUrl, options);

        return await result.json();
    } catch (error) {
        console.error(error);
        return { status: false, data: 0 };
    }
};

export { getCheckScopeStore, useGeneralAppService };

interface getGenerateEmbedUrlType {
    url: string;
}

interface IPostUserFirstInstallApp {
    session_id: string;
    score: number;
}

interface IPayloadPutStoreDetail {
    app_lock?: boolean;
    onboarding_step?: EOnBoard;
}
