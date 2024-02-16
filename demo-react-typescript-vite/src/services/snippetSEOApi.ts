import { useAppBridge } from "@shopify/app-bridge-react";
import { useUnAuthentication } from "@swift/hooks/useUnAuthentication";
import { SwiftApiResponse } from "@swift/types/service";
import {
  IDataSnippetCollection,
  IDataSnippetFAQ,
  IDataSnippetOrganization,
  IDataSnippetProduct,
  IDataSnippetSetting,
} from "@swift/types/snippetSEO";
import { initFetchAction } from "@swift/utils/fetchAPI";

const useSSnippetSEOService = () => {
  const app = useAppBridge();

  const { redirectUnAuthentication } = useUnAuthentication();

  async function getSnippetSetting(): Promise<
    SwiftApiResponse<IDataResSnippetSetting | null>
  > {
    try {
      const result = await initFetchAction({
        method: "GET",
        url: "snippets/detail",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: null };
    }
  }

  async function postSnippetOrganization(
    payload: IDataSnippetOrganization
  ): Promise<SwiftApiResponse<boolean>> {
    try {
      const result = await initFetchAction({
        method: "POST",
        url: "snippets/organization",
        app,
        body: { ...payload },
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: false };
    }
  }
  async function postSnippetCollection(
    payload: IDataSnippetCollection
  ): Promise<SwiftApiResponse<boolean>> {
    try {
      const result = await initFetchAction({
        method: "POST",
        url: "snippets/collection",
        app,
        body: { ...payload },
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: false };
    }
  }
  async function postSnippetProduct(
    payload: IDataSnippetProduct
  ): Promise<SwiftApiResponse<boolean>> {
    try {
      const result = await initFetchAction({
        method: "POST",
        url: "snippets/product",
        app,
        body: { ...payload },
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: false };
    }
  }
  async function postSnippetFQA(
    payload: IDataSnippetFAQ
  ): Promise<SwiftApiResponse<boolean>> {
    try {
      const result = await initFetchAction({
        method: "POST",
        url: "snippets/faq",
        app,
        body: { ...payload },
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, data: false };
    }
  }

  return {
    getSnippetSetting,
    postSnippetOrganization,
    postSnippetCollection,
    postSnippetProduct,
    postSnippetFQA,
  };
};

/** interface */
interface IDataResSnippetSetting
  extends IDataSnippetSetting{
  id: number;
  store_id: number;
  created_at: string;
  updated_at: string;
}
/** end interface */

export { useSSnippetSEOService };
