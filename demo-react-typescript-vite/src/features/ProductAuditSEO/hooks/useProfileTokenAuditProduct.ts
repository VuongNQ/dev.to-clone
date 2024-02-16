import { ModalBuyMoreHandle } from "@swift/components/ModalBuyMore";
import { ModalSkipTrialHandle } from "@swift/components/ModalSkipTrial";
import { useDisclosure } from "@swift/hooks/useDisclosure";
import useProfileToken from "@swift/hooks/useProfileToken";
import { useCallback, useRef } from "react";

export const useProfileTokenAuditProduct = () => {
    const refModalSkipTrial = useRef<ModalSkipTrialHandle>(null);

    
    const refModalBuyMore = useRef<ModalBuyMoreHandle>(null);

    const {
        isRefetchingProfile,
        isValidTokenChatGPT,
        isLoadingProfile,
        isTokenExpired,
        isBonusExpired,
        hasExpiredTime,
        numberToken,
        expires_at,
        bonus_expires_at,
        bonus_amount,
        isAllowUseTokenByPlan,
        isRequireSkipTrial,
        refetchToken,
    } = useProfileToken();

    const {
        isOpen: isOpenModalWarningToken,
        onClose: onCloseModalWarningToken,
        onOpen: onOpenModalWarningToken,
    } = useDisclosure({});

    const validateSkipTrial = useCallback(() => {
        if (isRequireSkipTrial) {
            refModalSkipTrial.current?.openModal();
            return false;
        }
        return true;
    }, [isRequireSkipTrial]);

    return {
        isRefetchingProfile,
        isValidTokenChatGPT,
        isLoadingProfile,
        isTokenExpired,
        hasExpiredTime,
        numberToken,
        expires_at,
        isOpenModalWarningToken,
        isAllowUseTokenByPlan,
        refModalSkipTrial,
        refModalBuyMore,
        bonus_expires_at,
        bonus_amount,
        isBonusExpired,
		validateSkipTrial,
        onCloseModalWarningToken,
        onOpenModalWarningToken,
        refetchToken,
    };
};
