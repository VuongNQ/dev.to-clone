import { AppBridgeState, ClientApplication } from "@shopify/app-bridge/client/types";
import { getSessionToken } from "@shopify/app-bridge/utilities";
import { IFetchAPI } from "@swift/types/general";
import { parseQueryString } from "./funcString";

export const convertInputToFetchOption = (input: IFetchAPI, isMutation = false) => {
    const {
        fullUrl,
        url,
        method,
        params,
        body,
        headers,
        fetchOnMount = false,
        isFormData,
        queryOptions,
        token,
    } = input;
    // const location = useLocation();

    const mergedHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        ...(headers || {}),

        // session: new URLSearchParams(location.search).get('session') || ''
    };

    if (token) {
        mergedHeaders["Authorization"] = `Bearer ${token}`;
    }

    const queryString = parseQueryString(params);

    let requestUrl = `${import.meta.env.VITE_ROOT_API}/api/${url}${queryString.length ? `?${queryString}` : ""
        }`;

    if (fullUrl) {
        requestUrl = `${fullUrl}${queryString.length ? `?${queryString}` : ""}`;
    }

    const options: Record<string, unknown> = {
        method,
        headers: mergedHeaders,
    };

    if (method === "POST" || (method === "PUT" && body)) {
        options["body"] =
            body instanceof FormData && isFormData ? body : JSON.stringify(body);

        if (isFormData) {
            delete (options.headers as Record<string, string>)["Content-Type"];
        }
    }

    const reactQueryOptions = !isMutation
        ? {
            ...queryOptions,
            enabled: fetchOnMount,
        }
        : { ...queryOptions };

    return {
        requestUrl,
        options,
        reactQueryOptions,
    };
};

export async function initFetchAction({
    url = "",
    method = "GET",
    params = {},
    body,
    headers,
    fetchOnMount = false,
    isFormData = false,
    queryOptions = {},
    app,
    fullUrl,
}: IFetchAppAPI) {
    const token = await getSessionToken(app);
    const { requestUrl, options } = convertInputToFetchOption({
        fullUrl,
        url,
        method,
        params,
        body,
        headers,
        fetchOnMount,
        isFormData,
        queryOptions,
        token,
    });
    return fetch(requestUrl, options);
}

interface IFetchAppAPI extends IFetchAPI {
    app: ClientApplication<AppBridgeState>;
}