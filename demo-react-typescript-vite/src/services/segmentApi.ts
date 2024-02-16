import { useAppBridge } from "@shopify/app-bridge-react";
import { MENU_APP } from "@swift/constants/constantMenu";
import { PLAN_PRICING } from "@swift/constants/constantPlanPricing";
import { useAppSelector } from "@swift/hooks";
import { useUnAuthentication } from "@swift/hooks/useUnAuthentication";
import { customerData } from "@swift/store/global";
import { PlanType } from "@swift/types/planPricing";
import {
  PostSegmentPageViewTypeParams,
  ESegmentOnboarding,
} from "@swift/types/segment";
import { SwiftApiResponse } from "@swift/types/service";
import { initFetchAction } from "@swift/utils/fetchAPI";

const useSegmentService = () => {
  const app = useAppBridge();

  const customer = useAppSelector(customerData);

  const { redirectUnAuthentication } = useUnAuthentication();

  const dataCustomer = {
    store_id: customer?.id,
    email: customer?.email,
    plan: customer?.app_plan,
    price: PLAN_PRICING[customer?.app_plan || PlanType.free].price,
    owner: customer?.owner,
    phone: customer?.phone,
    country: customer?.country,
    shopify_domain: customer?.domain,
  };

  async function postSegmentOnboarding(
    Type: ESegmentOnboarding
  ): Promise<SwiftApiResponse<boolean>> {
    if (!customer)
      return {
        status: false,
        data: false,
      };

    try {
      const result = await initFetchAction({
        method: "POST",
        url: `events`,
        app,
        body: {
          data: { ...dataCustomer, event_name: Type },
          event_type: "onboarding",
        },
      });

      await redirectUnAuthentication(result);

      const { status = false } = await result.json();

      return { status, data: true };
    } catch (error) {
      console.error(error);
      return {
        status: false,
        data: false,
      };
    }
  }

  async function postSegmentContactSupport(): Promise<
    SwiftApiResponse<boolean>
  > {
    if (!customer)
      return {
        status: false,
        data: false,
      };

    try {
      const result = await initFetchAction({
        method: "POST",
        url: `events`,
        app,
        body: {
          data: { ...dataCustomer, event_name: "Contact Support" },
          event_type: "contact_support",
        },
      });

      await redirectUnAuthentication(result);

      const { status = false } = await result.json();

      return { status, data: true };
    } catch (error) {
      console.error(error);
      return {
        status: false,
        data: false,
      };
    }
  }

  async function postSegmentContactExperts(): Promise<
    SwiftApiResponse<boolean>
  > {
    if (!customer)
      return {
        status: false,
        data: false,
      };

    try {
      const result = await initFetchAction({
        method: "POST",
        url: `events`,
        app,
        body: {
          data: { ...dataCustomer, event_name: "Contact Expert" },
          event_type: "contact_expert",
        },
      });

      await redirectUnAuthentication(result);

      const { status = false } = await result.json();

      return { status, data: true };
    } catch (error) {
      console.error(error);
      return {
        status: false,
        data: false,
      };
    }
  }

  async function postSegmentPageView(): Promise<SwiftApiResponse<boolean>> {
    if (!customer)
      return {
        status: false,
        data: false,
      };

    const findPage = MENU_APP.find(
      (item) => item.destination === window.location.pathname
    );

    const payload: PostSegmentPageViewTypeParams = {
      path: window.location.pathname,
      search: window.location.search,
      referrer: "",
      title: findPage?.label || "",
      url: window.location.href,
    };
    try {
      const result = await initFetchAction({
        method: "POST",
        url: `events`,
        app,
        body: { data: payload, event_type: "page_viewed" },
      });

      await redirectUnAuthentication(result);

      const { status = false } = await result.json();

      return { status, data: true };
    } catch (error) {
      console.error(error);
      return {
        status: false,
        data: false,
      };
    }
  }

  return {
    postSegmentOnboarding,
    postSegmentContactExperts,
    postSegmentContactSupport,
    postSegmentPageView,
  };
};

export { useSegmentService };
