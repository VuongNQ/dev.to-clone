import { useAppBridge } from "@shopify/app-bridge-react";
import { useUnAuthentication } from "@swift/hooks/useUnAuthentication";
import {
  IDataPromotionCode,
  IIPackagePricingImage,
  IWalletPricing,
  IntervalPricingType,
  PlanType,
} from "@swift/types/planPricing";
import { SwiftApiResponse } from "@swift/types/service";
import { initFetchAction } from "@swift/utils/fetchAPI";

const usePricingApiService = () => {
  const app = useAppBridge();

  const { redirectUnAuthentication } = useUnAuthentication();

  async function getCurrentPlan(): Promise<SwiftApiResponse<getPlanType>> {
    try {
      const result = await initFetchAction({
        method: "GET",
        url: "pricing/subscription/plans/current",
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      return {
        data: {
          plan: PlanType.free,
          interval: IntervalPricingType.forever,
          has_expert_ticket: false,
          trial_days: 0,
        },
        status: false,
      };
    }
  }

  async function getPricingImages(): Promise<
    SwiftApiResponse<IIPackagePricingImage | null>
  > {
    try {
      const result = await initFetchAction({
        method: "GET",
        url: "pricing/image/packages",
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

  async function getPricingToken(): Promise<
    SwiftApiResponse<IWalletPricing | null>
  > {
    try {
      const result = await initFetchAction({
        method: "GET",
        url: "pricing/token/packages",
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

  async function postChargePlan({
    code,
    plan,
    isNoTrial,
    interval,
    redirect_url,
  }: IPayloadPostChargePlan): Promise<
    SwiftApiResponse<IResPostChargePlan | null>
  > {
    try {
      const result = await initFetchAction({
        url: "pricing/subscription/charge",
        method: "POST",
        body: {
          plan: plan,
          discount_code: code,
          no_trial: isNoTrial,
          from_embedded: true,
          interval: interval ? interval : IntervalPricingType.annual,
          redirect_url: redirect_url ? redirect_url : "",
        },
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      return { status: false, data: null };
    }
  }



  async function checkPromotionCode(
    code: string,
    store_id: number,
    plan: string
  ): Promise<IPayloadCheckPromotionCodeType> {
    try {
      const result = await initFetchAction({
        method: "POST",
        url: "pricing/subscription/discounts/check",
        body: {
          code: code,
          store_id: store_id,
          plan: plan,
        },
        app,
      });

      await redirectUnAuthentication(result);

      return await result.json();
    } catch (error) {
      console.error(error);
      return { status: false, errors: { type: 0 } };
    }
  }

	async function callGetRedirectUrlBuyMore(
		redirect_url: string,
		planPackage: number, 
    type: "image" | "token"
	): Promise<SwiftApiResponse<{ confirmation_url: string } | null>> {
		try {
			const result = await initFetchAction({
				url: type === "image" ? "pricing/image/charge" : "pricing/token/charge",
				method: "POST",
				body: { redirect_url, package: planPackage },
				app,
			});

			await redirectUnAuthentication(result);

			const { status = false, data } = await result.json();

			return { status, data };
		} catch (error) {
			// console.error(error);
			return {
				status: false,
				data: null,
			};
		}
	}

  return {
    getCurrentPlan,
    postChargePlan,
    getPricingToken,
    getPricingImages,
    checkPromotionCode,
    callGetRedirectUrlBuyMore
  };
};

export interface IResPostChargePlan {
  confirmation_url: string;
}
export interface getPlanType {
  plan: PlanType;
  interval: IntervalPricingType;
  has_expert_ticket: boolean;
  trial_days: number; // minium = 0
}

export { usePricingApiService };

interface IPayloadPostChargePlan {
  code: string;
  plan: string;
  isNoTrial: boolean;
  interval: IntervalPricingType;
  redirect_url: string;
}

interface IPayloadCheckPromotionCodeType {
  status: boolean;
  data?: {
    promotion: IDataPromotionCode;
  };
  errors?: {
    type: number;
  };
}
