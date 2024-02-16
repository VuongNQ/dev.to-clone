import { useSegmentService } from "@swift/services/segmentApi";
import { CustomerDataState } from "@swift/store/type";
import { IDataCrispChat } from "@swift/types/general";

const useCrispChat = () => {
  const { postSegmentContactSupport, postSegmentContactExperts } =
    useSegmentService();

  function openCrispChat() {
    if (typeof window.$crisp == "undefined") return;
    if (Array.isArray(window.$crisp)) return;

    window.$crisp.push(["do", "chat:open"]);
  }

  const onContactExperts = (message: string) => {
    if (typeof window.$crisp == "undefined") return;
    if (Array.isArray(window.$crisp)) return;

    window.$crisp.push(["do", "chat:open"]);
    window.$crisp.push(["do", "message:send", ["text", message]]);
    postSegmentContactExperts();
  };

  const onContactSupport = (message: string) => {
    if (typeof window.$crisp == "undefined") return;
    if (Array.isArray(window.$crisp)) return;

    window.$crisp.push(["do", "chat:open"]);
    window.$crisp.push(["do", "message:send", ["text", message]]);
    postSegmentContactSupport();
  };

  const onSendMessageCrisp = (message: string) => {
    if (typeof window.$crisp == "undefined") return;
    if (Array.isArray(window.$crisp)) return;

    window.$crisp.push(["do", "chat:open"]);
    window.$crisp.push(["do", "message:send", ["text", message]]);
  };

  const initCrispChat = (data: IDataCrispChat, store: CustomerDataState) => {
    let countTimer = 0;
    let timer: NodeJS.Timeout | null = null;
    if (!window) return;
    window.$crisp && (window.$crisp = []);
    window.CRISP_WEBSITE_ID =
      import.meta.env.VITE_CRISP_WEBSITE_ID || process.env.CRISP_WEBSITE_ID;
    const arr = [];
    window.CRISP_TOKEN_ID = store ? `${store.id}` : "";
    (function () {
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();

    timer = setInterval(() => {
      const isCrisp = !!window.$crisp;
      if (isCrisp) {
        clearInterval(timer as NodeJS.Timeout);

        if (Array.isArray(window.$crisp)) return;

        for (const property in data) {
          const item = data[property as keyof IDataCrispChat];
          if (item != null) {
            arr.push([property, item]);
            window.$crisp.push([
              "set",
              "session:data",
              [property, item as string],
            ]);
          }
        }
        window.$crisp.push(["set", "user:email", store.email]);
        window.$crisp.push(["set", "user:nickname", store.owner]);
        window.$crisp.push(["set", "session:segments", [["swift"]]])
      } else {
        if (countTimer > 10) {
          clearInterval(timer as NodeJS.Timeout);
        }
        countTimer += 1;
      }
    }, 500);
  };

  return {
    openCrispChat,
    onSendMessageCrisp,
    onContactExperts,
    onContactSupport,
    initCrispChat,
  };
};

declare global {
  interface Window {
    $crisp:
      | {
          push: (value: (string | string[] | string[][])[]) => void;
          get: (value: string) => string;
        }
      | [];
    CRISP_WEBSITE_ID: string;
    CRISP_TOKEN_ID: string;
  }
}

export default useCrispChat;
