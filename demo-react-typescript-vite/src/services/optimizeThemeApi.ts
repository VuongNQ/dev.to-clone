import { useAppBridge } from "@shopify/app-bridge-react";
import { useUnAuthentication } from "@swift/hooks/useUnAuthentication";
import { IAutoOptimizeSetting, IDataPagination } from "@swift/types/general";
import {
  GetLogOptimzieFailedType,
  IDataDetailOptimizeTheme,
  IDataHistoryOptimize,
  IPayloadGetHistoryOptimize,
  KeyOptimzie,
  MessageOptimize,
} from "@swift/types/optimizeTheme";
import { SwiftApiResponse } from "@swift/types/service";
import { initFetchAction } from "@swift/utils/fetchAPI";

const useOptimizeThemeService = () => {
  const app = useAppBridge();

  const { redirectUnAuthentication } = useUnAuthentication();

  const returnUrlApiActionOptimize = (step: KeyOptimzie) => {
    if (step === KeyOptimzie["critical-css"])
      return "optimize-theme/tech/critical-css";
    if (step === KeyOptimzie["lazyload-images"])
      return "optimize-theme/tech/lazyload-images";
    if (step === KeyOptimzie["optimize-css"])
      return "optimize-theme/tech/optimize-css";
    if (step === KeyOptimzie["optimize-js"])
      return "optimize-theme/tech/optimize-js";
    if (step === KeyOptimzie["preload-fonts"])
      return "optimize-theme/tech/preload-fonts";
    if (step === KeyOptimzie["optimize-html"])
      return "optimize-theme/tech/optimize-html";
    if (step === KeyOptimzie["optimize-html-plus"])
      return "optimize-theme/tech/optimize-html-plus";
    return "";
  };

  async function postActionOptimize(
    step: KeyOptimzie
  ): Promise<SwiftApiResponse<PostActionOptimizeType | null>> {
    const urlApi = returnUrlApiActionOptimize(step);

    try {
      const result = await initFetchAction({
        url: urlApi,
        method: "POST",
        app,
        body: {
          optimize: step,
        },
      });

      await redirectUnAuthentication(result);

      if (result.status === 403) {
        return {
          status: false,
          data: null,
          message: MessageOptimize.not_allow_optimize,
        };
      }

      return await result.json();
    } catch (error) {
      return { status: false, data: null };
    }
  }

  async function getHistoryOptimize({
    filters,
    params,
  }: IPayloadGetHistoryOptimize): Promise<
    SwiftApiResponse<IDataPagination<IDataHistoryOptimize[]> | null>
  > {
    try {
      const result = await initFetchAction({
        url: "optimize-theme/history",
        method: "POST",
        app,
        body: { ...filters },
        params: {
          ...params,
          limit: 10,
        },
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      return { status: false, data: null };
    }
  }

  async function getHistoryOptimizeDetail(
    themeId: number
  ): Promise<SwiftApiResponse<IDataDetailOptimizeTheme | null>> {
    try {
      const result = await initFetchAction({
        url: `optimize-theme/history/detail/${themeId}`,
        method: "GET",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      return { status: false, data: null };
    }
  }

  async function publishTheme(): Promise<
    SwiftApiResponse<IDataPublishTheme | null>
  > {
    try {
      const result = await initFetchAction({
        url: "optimize-theme/publish",
        method: "POST",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      return { status: false, data: null };
    }
  }

  async function deleteTheme(
    theme_id: number
  ): Promise<SwiftApiResponse<boolean>> {
    try {
      const result = await initFetchAction({
        url: `themes/${theme_id}`,
        method: "DELETE",
        app,
      });

      await redirectUnAuthentication(result);

      const { status } = await result.json();

      return { status, data: true };
    } catch (error) {
      return { status: false, data: false };
    }
  }

  async function previewThemeOptimize(
    theme_id: number
  ): Promise<SwiftApiResponse<PreviewThemeOptimizeType>> {
    try {
      const result = await initFetchAction({
        url: `themes/${theme_id}/preview-link`,
        method: "GET",
        app,
      });

      await redirectUnAuthentication(result);

      const { status, data } = await result.json();

      return { status, data };
    } catch (error) {
      return { status: false, data: { url: "" } };
    }
  }

  // async function getDetailOptimizeTheme(): Promise<
  //   SwiftApiResponse<IDataDetailOptimizeTheme | null>
  // > {
  //   try {
  //     const result = await initFetchAction({
  //       url: `optimize-theme/detail`,
  //       method: "GET",
  //       app,
  //     });

  //     await redirectUnAuthentication(result);

  //     const { status, data } = await result.json();

  //     return { status, data };
  //   } catch (error) {
  //     return { status: false, data: null };
  //   }
  // }

  async function getLogOptimizeFailed(): Promise<
    SwiftApiResponse<GetLogOptimzieFailedType[] | null>
  > {
    try {
      const result = await initFetchAction({
        url: `optimize-theme/assets-fail`,
        method: "GET",
        app,
      });

      await redirectUnAuthentication(result);

      const { status, data } = await result.json();

      return { status, data };
    } catch (error) {
      return { status: false, data: null };
    }
  }

  async function postRetryOptimizeFail(
    step: string
  ): Promise<SwiftApiResponse<GetLogOptimzieFailedType[] | null>> {
    try {
      const result = await initFetchAction({
        url: `optimize-theme/try-again`,
        method: "POST",
        app,
        body: {
          optimize: step,
        },
      });

      await redirectUnAuthentication(result);

      const { status, data } = await result.json();

      return { status, data };
    } catch (error) {
      return { status: false, data: null };
    }
  }

  async function getOptimizeThemeAutoSetting(): Promise<
    SwiftApiResponse<IResAutoOptimizeSetting | null>
  > {
    try {
      const result = await initFetchAction({
        url: `optimization-settings`,
        method: "GET",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      return { status: false, data: null };
    }
  }
  async function postOptimizeThemeAutoSetting(
    payload: Partial<IAutoOptimizeSetting>
  ): Promise<SwiftApiResponse<IResAutoOptimizeSetting | null>> {
    try {
      const result = await initFetchAction({
        url: `optimization-settings`,
        method: "POST",
        app,
        body: { ...payload },
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      return { status: false, data: null };
    }
  }

  async function getDetailOptimize(): Promise<
    SwiftApiResponse<IDataDetailOptimizeTheme | null>
  > {
    try {
      const result = await initFetchAction({
        url: `optimize-theme/detail`,
        method: "GET",
        app,
      });

      await redirectUnAuthentication(result);

      const { status, data } = await result.json();

      return { status, data };
    } catch (error) {
      return { status: false, data: null };
    }
  }

  return {
    postActionOptimize,
    publishTheme,
    deleteTheme,
    previewThemeOptimize,
    // getDetailOptimizeTheme,
    getLogOptimizeFailed,
    postRetryOptimizeFail,
    getHistoryOptimize,
    getHistoryOptimizeDetail,
    getOptimizeThemeAutoSetting,
    postOptimizeThemeAutoSetting,
    getDetailOptimize,
  };
};

// async function getDetailOptimizeTheme({
//   app,
// }: {
//   app: ClientApplication<AppBridgeState>;
// }): Promise<SwiftApiResponse<IDataDetailOptimizeTheme | null>> {
//   try {
//     const result = await initFetchAction({
//       url: `optimize-theme/detail`,
//       method: "GET",
//       app,
//     });

//     const { status, data } = await result.json();

//     return { status, data };
//   } catch (error) {
//     return { status: false, data: null };
//   }
// }

interface PreviewThemeOptimizeType {
  url: string;
}

interface PostActionOptimizeType {
  theme_id: number;
  optimize_type: KeyOptimzie;
  in_progress: boolean;
  // "critical-css"?: StatusProccessOptimzie;
  // "lazyload-images"?: StatusProccessOptimzie;
  // "optimize-css"?: StatusProccessOptimzie;
  // "optimize-js"?: StatusProccessOptimzie;
  // "preload-fonts"?: StatusProccessOptimzie;
}

interface IResAutoOptimizeSetting extends IAutoOptimizeSetting {
  store_id: number;
}

interface IDataPublishTheme {
  name: string;
  id: number;
}
export { useOptimizeThemeService };

