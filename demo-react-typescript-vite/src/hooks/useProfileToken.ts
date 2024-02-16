import { queryKeys } from "@swift/queryKeys";
import useWalletService from "@swift/services/walletApi";
import { customerData, getPricingStore } from "@swift/store/global";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useAppSelector } from ".";
import { ITrialDays, PlanType } from "@swift/types/planPricing";

const useProfileToken = () => {
    const { getDetailWallet } = useWalletService();

    const queryClient = useQueryClient();

    const customerPlan = useAppSelector(getPricingStore);

    const customer = useAppSelector(customerData);

    const {
        data: rawData,
        isLoading,
        isRefetching,
    } = useQuery({
        ...queryKeys.profile.getToken(),
        refetchOnWindowFocus: true,
        queryFn: async () => {
            const { status, data } = await getDetailWallet();
            if (!status || !data || !data["gpt-token"]) return null;
            return data["gpt-token"];
        },
    });

    const { isTokenExpired, hasExpiredTime, numberToken, expires_at, bonus_expires_at, bonus_amount, isBonusExpired } = useMemo(() => {
        if (!rawData)
            return {
                isTokenExpired: false,
                hasExpiredTime: false,
				isBonusExpired: false,
                numberToken: 0,
                bonus_amount: 0,
                expires_at: "",
                bonus_expires_at: "",
            };
        const hasExpiredTime = !!dayjs(rawData.expires_at).isValid();
        const hasExpiredBonus = !!dayjs(rawData.bonus_expires_at).isValid();
        return {
            hasExpiredTime,
            isTokenExpired: hasExpiredTime && new Date().getTime() - new Date(rawData.expires_at).getTime() > 0,
            isBonusExpired: hasExpiredBonus && new Date().getTime() - new Date(rawData.bonus_expires_at).getTime() > 0,
            numberToken: rawData.amount,
            expires_at: rawData.expires_at,
            bonus_expires_at: rawData.bonus_expires_at,
            bonus_amount: rawData.bonus_amount,
        };
    }, [rawData]);

    const isValidTokenChatGPT = useMemo(
        () => numberToken > 100 && hasExpiredTime && !isTokenExpired,
        [hasExpiredTime, isTokenExpired, numberToken]
    );

    const isAllowUseTokenByPlan = useMemo(() => !!(customer && customer.app_plan !== PlanType.free), [customer]);

    const isRequireSkipTrial = useMemo(
        () => (customerPlan.trial_days ?? 3) !== ITrialDays.isOutTrial,
        [customerPlan.trial_days]
    );

    const refetchToken = () =>
        queryClient.invalidateQueries({
            queryKey: queryKeys.profile.getToken().queryKey,
        });

    return {
        isRefetchingProfile: isRefetching,
        isLoadingProfile: isLoading,
        isTokenExpired,
		isBonusExpired,
        hasExpiredTime,
        numberToken,
        expires_at,
        bonus_expires_at,
        bonus_amount,
        isValidTokenChatGPT,
        isAllowUseTokenByPlan,
        isRequireSkipTrial,
        refetchToken,
    };
};

export default useProfileToken;
