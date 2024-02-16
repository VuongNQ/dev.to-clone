export function useOneCommerceOperation() {
  const addScriptOneCommerceOperationTool = () => {
    (function (
      w: Window,
      d: Document,
      s: string,
      l: keyof Pick<Window, "shData">,
      i: string
    ) {
      w[l] = w[l] || [];
      w[l].push({ event: "loaded", data: { app_id: i } });
      const f = d.getElementsByTagName(s)[0],
        j = d.createElement(s) as HTMLScriptElement;
      j.defer = true;
      j.src = "https://cdn.socialhead.io/operation/app.js";
      f.parentNode?.insertBefore(j, f);
    })(window, document, "script", "shData", "swift");
  };

  const addScriptOneTracking = () => {
    const script = document.createElement("script");
    script.src =
      "https://onecommerce.io/t/client.js?a=630744987e6967118bf78d4f&z=9823749";
    script.defer = true;
    document.body.appendChild(script);
  };

  const initOneCommerce = (payload: oneCommerceType) => {
    window.shData?.push({
      event: "init",
      data: {
        email: payload.email,
        name: payload.name,
        myshopify_domain: payload.myshopify_domain,
        plan_name: payload.plan_name,
        language_code: "en",
      },
    });
  };

  return {
    addScriptOneCommerceOperationTool,
    addScriptOneTracking,
    initOneCommerce,
  };
}

interface oneCommerceType {
  email: string;
  name: string;
  myshopify_domain: string;
  plan_name: string;
  language_code?: string;
}

declare global {
  interface Window {
    shData: { event: string; data: oneCommerceType | { app_id: string } }[];
  }
}
