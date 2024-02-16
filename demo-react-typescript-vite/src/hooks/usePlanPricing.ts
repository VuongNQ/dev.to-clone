import { KEY_ERROR } from "@swift/constants/general";
import { useAppSelector } from "@swift/hooks";
import { usePricingApiService } from "@swift/services/pricingApi";
import { customerData, getPricingStore } from "@swift/store/global";
import {
    IPayloadChargePlan,
    IntervalPricingType,
    PlanType,
} from "@swift/types/planPricing";
import { isExistInArray } from "@swift/utils/arrayFunc";
import { useCallback, useMemo } from "react";
import useFuncRedirect from "./useFuncRedirect";

const usePlanPricing = ({ listPLanAllow }: IPropsUsePlanPricing) => {
    const customer = useAppSelector(customerData);

    const pricingStore = useAppSelector(getPricingStore);

    const { postChargePlan } = usePricingApiService();

    const { onRedirectRemoteCurrentTabs } = useFuncRedirect();

    const currentPlan = useMemo(
        () => customer?.app_plan || PlanType.free,
        [customer?.app_plan]
    );

    const URL_ROOT_APP = useMemo(
        () =>
            customer
                ? `https://${customer.shopify_domain}/admin/apps/${
                      import.meta.env.VITE_URL_APP
                  }`
                : "",
        [customer?.shopify_domain]
    );

    const isSkipTrial = useMemo(() => {
        if (!pricingStore.trial_days) return true;
        if (pricingStore.trial_days > 0) return false;
        return true;
    }, [pricingStore.trial_days]);

    // check allow plan use feature
    const isAllowPlan = useMemo(() => {
        if (!customer) return false;
        if (!listPLanAllow) return true;

        return isExistInArray(currentPlan, listPLanAllow);
    }, [currentPlan, customer, listPLanAllow]);

    const chargeSkipTrial = useCallback(
        async ({
            interval,
            urlRedirect,
        }: {
            interval: IntervalPricingType;
            urlRedirect: string;
        }) => {
            try {
                const urlRedirectApp = `${URL_ROOT_APP}${urlRedirect}`;

                if (customer) {
                    const { data, status } = await postChargePlan({
                        code: "",
                        interval: interval,
                        plan: customer.app_plan,
                        redirect_url: urlRedirectApp,
                        isNoTrial: true,
                    });

                    if (status) {
                        onRedirectRemoteCurrentTabs(
                            data ? data.confirmation_url : ""
                        );
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
        [URL_ROOT_APP, customer, postChargePlan, onRedirectRemoteCurrentTabs]
    );

    const handleChargePlan = useCallback(
        async ({
            urlCharge,
            codeDiscount,
            isNoTrial,
            interval,
            planName,
            callbackCharged,
            callbackRedirectCharge,
        }: IPayloadChargePlan) => {
            const { data, status, errors } = await postChargePlan({
                code: codeDiscount,
                interval: interval,
                plan: planName,
                redirect_url: urlCharge,
                isNoTrial: isNoTrial,
            });

            if (status) {
                callbackRedirectCharge &&
                    callbackRedirectCharge(data ? data.confirmation_url : "");
                return;
            }

            const isThisPlan =
                errors &&
                !Array.isArray(errors) &&
                errors.type.includes(KEY_ERROR.ALREADY_CURRENT_PLAN);
            if (isThisPlan) {
                callbackCharged && callbackCharged();
                return;
            }
        },
        [postChargePlan]
    );

    return {
        chargeSkipTrial,
        URL_ROOT_APP,
        handleChargePlan,
        isAllowPlan,
        currentPlan,
        isSkipTrial,
    };
};

interface IPropsUsePlanPricing {
    listPLanAllow?: PlanType[];
}

export default usePlanPricing;
