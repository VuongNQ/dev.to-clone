import ReactDOM from "react-dom/client";
import App from "./App";
// import { initI18n } from "./utils/i18nUtils";
import { parseQueryString } from "./utils/funcString";
import { initI18n } from "./utils/i18nUtils";

const validateInstall = async () => {
    const search = new URLSearchParams(location.search),
        embedded = search.get("embedded"),
        session = search.get("session"),
        host = search.get("host"),
        shop = search.get("shop"),
        hmac = search.get("hmac"),
        isInstalled = !!embedded && !!session && !!host && !!shop,
        urlHandleError = `https://admin.shopify.com/store/${search.get(
            "shop"
        )}`;

    if (isInstalled)
        return {
            isInstalled,
            redirect: urlHandleError,
        };

    const queryString = parseQueryString({
        host: host || "",
        shop: shop || "",
        hmac: hmac || "",
    });

    const requestUrl = `${import.meta.env.VITE_API_INSTALL}?${queryString}`;
    try {
        const raw = await fetch(requestUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const parse: {
            status: boolean;
            message: string;
            data: string;
        } = await raw.json();

        return {
            isInstalled,
            redirect: parse.status && parse.data ? parse.data : urlHandleError,
        };
    } catch (error) {
        return {
            isInstalled,
            redirect: urlHandleError,
        };
    }
};
validateInstall().then((rs) => {
    const { isInstalled, redirect } = rs;
    if (isInstalled) {
        initI18n().then(() => {
            ReactDOM.createRoot(document.getElementById("root")!).render(
                <App />
            );
        });
    } else {
        location.replace(redirect);
    }
});
