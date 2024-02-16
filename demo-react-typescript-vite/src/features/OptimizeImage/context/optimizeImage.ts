import { ModalBuyMoreHandle } from "@swift/components/ModalBuyMore";
import { ModalSkipTrialHandle } from "@swift/components/ModalSkipTrial";
import { SwiftApiResponse } from "@swift/types/service";
import { Dispatch, RefObject, SetStateAction, createContext } from "react";
import { ModalOptimizeImageHandle } from "../components/Modal";
import {
    EMessageValidateOptimize,
    EPropsModalWarning,
    IActionReducerList,
    IActionSelectedAll,
    IActionSelectedItem,
    IPayloadValidateOnOptimize,
    IResultValidateOptimize,
} from "../type";

const defaultOptimizeImageContext: IOptimizeImageContext = {
    refModalBuyMore: null,
    refModalSkipTrial: null,
    refModalWarningLimited: null,
    refModalRestore: null,
    typeModalWarning: EPropsModalWarning.getMore,
    remainCountOptimize: 0,
    isLoadingOverview: false,
    isFetchingOverview: false,
    isPlanBlocked: false,
    isUnlimitedOptimize: false,
    isRequireSkipTrial: true,
    listOptimize: [],
    listRestore: [],
    listOptimizing: [],
    listRestoring: [],
    dispatchListRestore: () => null,
    dispatchListOptimize: () => null,
    dispatchListOptimizing: () => null,
    dispatchListRestoring: () => null,
    removeAllSelected: () => null,
    setTypeWarning: () => null,
    validateRequireSkipTrial: () => false,
    validateOnOptimize: () => {
        return {
            status: false,
            message: EMessageValidateOptimize.listOptimizeEmpty,
        };
    },
    // service API
    onActionOptimize: () =>
        new Promise((res) =>
            res({
                result: { status: false, data: { data: [] } },
                listIdOptimize: [],
                isOptimizeAll: false,
            })
        ),
    onSelectedAll: () => null,
    onSelectedItem: () => null,
};

export const OptimizeImageContext = createContext<IOptimizeImageContext>(
    defaultOptimizeImageContext
);

interface IOptimizeImageContext {
    refModalBuyMore: RefObject<ModalBuyMoreHandle> | null;
    refModalSkipTrial: RefObject<ModalSkipTrialHandle> | null;
    refModalWarningLimited: RefObject<ModalOptimizeImageHandle> | null;
    refModalRestore: RefObject<ModalOptimizeImageHandle> | null;
    typeModalWarning: EPropsModalWarning;
    remainCountOptimize: number;
    isLoadingOverview: boolean;
    isFetchingOverview: boolean;
    isPlanBlocked: boolean;
    isUnlimitedOptimize: boolean;
    isRequireSkipTrial: boolean;
    listOptimize: Array<number>;
    listRestore: Array<number>;
    listOptimizing: Array<number>;
    listRestoring: Array<number>;
    validateRequireSkipTrial: () => boolean;
    validateOnOptimize: (
       payload:IPayloadValidateOnOptimize
    ) => IResultValidateOptimize;
    dispatchListRestore: (args: IActionReducerList) => void;
    dispatchListOptimize: (args: IActionReducerList) => void;
    dispatchListOptimizing: (args: IActionReducerList) => void;
    dispatchListRestoring: (args: IActionReducerList) => void;

    onSelectedAll: (args: IActionSelectedAll) => void;
    onSelectedItem: (args: IActionSelectedItem) => void;
    removeAllSelected: () => void;
    setTypeWarning: Dispatch<SetStateAction<EPropsModalWarning>>;
    // service API
    onActionOptimize: (isOptimizeAll: boolean) => Promise<{
        result: SwiftApiResponse<{
            data: [];
        }>;
        listIdOptimize: number[];
        isOptimizeAll: boolean;
    }>;
}
