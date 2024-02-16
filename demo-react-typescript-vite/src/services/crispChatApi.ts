import { useAppBridge } from "@shopify/app-bridge-react";
import { useUnAuthentication } from "@swift/hooks/useUnAuthentication";
import { SwiftApiResponse } from "@swift/types/service";
import { initFetchAction } from "@swift/utils/fetchAPI";

const useCrispChatApiService = () => {
  const app = useAppBridge();
  const { redirectUnAuthentication } = useUnAuthentication();

  async function postMessageChatLowScore(
    score: number,
    sessionId:string
  ): Promise<SwiftApiResponse<number>> {
    const newPayload: IPropsPostMessageChatLowScore = {
      session_id: sessionId,
      score: score,
    };
    try {
      const result = await initFetchAction({
        url: "crispchat/after-install",
        method: "POST",
        app,
        body: { ...newPayload },
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: 0 };
    }
  }

  return {
    postMessageChatLowScore,
  };
};

/** interface */
interface IPropsPostMessageChatLowScore {
  session_id: string;
  score: number;
}
/** end interface */

export { useCrispChatApiService };
