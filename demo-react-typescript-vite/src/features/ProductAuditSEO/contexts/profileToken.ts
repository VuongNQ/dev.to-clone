
import { ModalBuyMoreHandle } from "@swift/components/ModalBuyMore";
import { RefObject, createContext } from "react";

const ProfileTokenContextDefaultValue: IProfileToken = {
    isOpenModalWarningToken: false,
    isLoadingProfile: false,
    isRefetchingProfile: false,
    isTokenExpired: false,
    isBonusExpired: false,
    hasExpiredTime: false,
    isValidTokenChatGPT: false,
    isAllowUseTokenByPlan: false,
    numberToken: 0,
    bonus_amount: 0,
    expires_at: '',
    bonus_expires_at: '',
    refModalBuyMore: null,
    validateSkipTrial: ()=>false,
    onCloseModalWarningToken: () => null,
    onOpenModalWarningToken: () => null,
    refetchToken: ()=>new Promise(()=>null),
};

export const ProfileTokenContext = createContext<IProfileToken>(
    ProfileTokenContextDefaultValue
);

interface IProfileToken {
    isOpenModalWarningToken: boolean;
    isLoadingProfile: boolean;
    isRefetchingProfile: boolean;
    isTokenExpired: boolean;
    isBonusExpired: boolean;
    hasExpiredTime: boolean;
    isValidTokenChatGPT: boolean;
	isAllowUseTokenByPlan: boolean;
    numberToken: number;
    bonus_amount: number;
    expires_at: string | Date;
    bonus_expires_at: string | Date;
    refModalBuyMore: RefObject<ModalBuyMoreHandle> | null;
    validateSkipTrial: ()=>boolean;
    onCloseModalWarningToken: () => void;
    onOpenModalWarningToken: () => void;
    refetchToken:()=>Promise<void>
}