import { useAppBridge } from "@shopify/app-bridge-react";
import { useUnAuthentication } from "@swift/hooks/useUnAuthentication";
import {
  IAssessmentStatus,
  IDataDetailAuditProduct,
  IDataItemAuditProduct,
  IGetCountProductAudit,
  IPayloadGetListAuditProduct,
  IPayloadPutDetailAuditProduct,
  generateContentAI,
} from "@swift/types/boostSEO";
import { IDataPagination } from "@swift/types/general";
import { SwiftApiResponse } from "@swift/types/service";
import { initFetchAction } from "@swift/utils/fetchAPI";

const useAuditProductService = () => {
  const app = useAppBridge();

  const { redirectUnAuthentication } = useUnAuthentication();

  async function getListAuditProduct({
    filters,
    params,
  }: IPayloadGetListAuditProduct): Promise<
    SwiftApiResponse<IDataPagination<IDataItemAuditProduct[]> | null>
  > {
    let newFilter = filters;

    if (filters.assessment_status && !filters.assessment_status[0].length) {
      newFilter = {
        keyword: newFilter.keyword,
      };
    }

    try {
      const result = await initFetchAction({
        url: "audit-products/list",
        method: "POST",
        app,
        body: { filters: newFilter },
        params: {
          ...params,
          limit: 10,
        },
      });

      await redirectUnAuthentication(result);

      const { status, data } = await result.json();

      return { status, data };
    } catch (error) {
      return { status: false, data: null };
    }
  }

  async function getCountProductAudit(): Promise<
    // payload: IFilterAuditProduct
    SwiftApiResponse<IGetCountProductAudit | null>
  > {
    try {
      const result = await initFetchAction({
        url: "audit-products/count",
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

  async function postAnalyzeProduct(
    payload: IPayloadPostAnalyzeProduct
  ): Promise<SwiftApiResponse<IPostAnalyzeProduct | null>> {
    try {
      const result = await initFetchAction({
        url: "audit-products/evaluate",
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

  async function postSyncProduct(): Promise<SwiftApiResponse<[]>> {
    try {
      const result = await initFetchAction({
        url: "audit-products/sync",
        method: "POST",
        app,
      });

      await redirectUnAuthentication(result);

      const { status, data } = await result.json();

      return { status, data };
    } catch (error) {
      return { status: false, data: [] };
    }
  }

  async function getDetailAuditProduct(payload: {
    productId: number;
  }): Promise<SwiftApiResponse<IDataDetailAuditProduct | null>> {
    try {
      const result = await initFetchAction({
        url: `audit-products/${payload.productId}`,
        method: "GET",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      return { status: false, data: null };
    }
  }

  async function putDetailAuditProduct(
    payload: IPayloadPutDetailAuditProduct
  ): Promise<SwiftApiResponse<boolean>> {
    try {
      const result = await initFetchAction({
        url: `audit-products/${payload.productId}`,
        method: "PUT",
        app,
        body: { ...payload },
        // para:payload
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      return { status: false, data: true };
    }
  }

  async function generateProductContentAI(
    payload: IPayloadGenerateProductContentAI
  ): Promise<SwiftApiResponse<IGenerateProductContentAI | null>> {
    try {
      const result = await initFetchAction({
        url: `audit-products/generate-content`,
        method: "POST",
        app,
        body: { ...payload },
      });

      await redirectUnAuthentication(result);

      return (await result.json()) as SwiftApiResponse<IGenerateProductContentAI>;
    } catch (error) {
      return { status: false, data: null };
    }
  }

  return {
    getListAuditProduct,
    postAnalyzeProduct,
    postSyncProduct,
    getDetailAuditProduct,
    generateProductContentAI,
    putDetailAuditProduct,
    getCountProductAudit,
  };
};

export interface IPayloadPostAnalyzeProduct {
  product_id: number;
}

interface IPostAnalyzeProduct {
  store_id: string;
  product_id: number;
  is_evaluated: boolean;
  assessment_status: IAssessmentStatus;
  last_assessment: string;
  usage: {
    used_tokens: number;
    available_tokens: number;
  };
}

interface IPayloadGenerateProductContentAI {
  content_type: generateContentAI;
  product_id: number;
  keywords?:string;
  tone:string;
  language:string
}
interface IGenerateProductContentAI {
  content: string;
  usage: {
    used_tokens: number;
    available_tokens: number;
  };
}

export { useAuditProductService };
