import { useAppSelector } from "@swift/hooks";
import useFuncOptimizeTheme from "@swift/hooks/useFuncOptimizeTheme";
import { queryKeys } from "@swift/queryKeys";
import { customerData } from "@swift/store/global";
import {
    IDataDetailOptimizeTheme,
    KeyOptimzie,
} from "@swift/types/optimizeTheme";
import { PlanType } from "@swift/types/planPricing";
import { isExistInArray } from "@swift/utils/arrayFunc";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { ACCEPT_PLANS } from "../constant";

function useOptimizeTheme() {
    const customer = useAppSelector(customerData);

    const [stepRunning, setStepRunning] = useState<KeyOptimzie | "">("");

    const { handleReturnDataProgress } = useFuncOptimizeTheme();

    const isAcceptUseOptimizeTheme = useMemo(
        () => isExistInArray(customer?.app_plan || PlanType.free, ACCEPT_PLANS),
        [customer?.app_plan]
    );

    const dataOptimize = useQuery<IDataDetailOptimizeTheme>(
        queryKeys.optimizeTheme.getDetailOptimize().queryKey
    );

    /**
     * validate limit base on plan of shopify
     * with ShopifyPlus, user can add up to 100 themes
     * more detail: https://help.shopify.com/en/manual/intro-to-shopify/pricing-plans/plans-features/shopify-plus-plan
     * other plan Shopify will be check limit on 20 theme
     */
    const isLimitTheme = useMemo(() => {
        if (!customer || !dataOptimize.data) return false;
        const { count_themes } = dataOptimize.data;
        const { theme_limit } = customer;
        return count_themes === theme_limit;
    }, [customer, dataOptimize.data]);

    const dataProgress = useMemo(() => {
        if (!dataOptimize.data) return null;
        const { stats } = dataOptimize.data;
        const data = handleReturnDataProgress(stats);
        return data;
    }, [dataOptimize.data, handleReturnDataProgress]);

    const isHasStepRunning = useMemo(() => {
        return !!stepRunning.length;
    }, [stepRunning]);

    useEffect(() => {
        if (!dataProgress) return;
        setStepRunning(dataProgress.stepOptimizing);
    }, [dataProgress?.stepOptimizing]);

    return {
        stepRunning,
        isAcceptUseOptimizeTheme,
        isLimitTheme,
        dataOptimize,
        dataProgress,
        isHasStepRunning,
        setStepRunning,
    };
}

export default useOptimizeTheme;
