import { ModalBuyMoreHandle } from "@swift/components/ModalBuyMore";
import { ModalSkipTrialHandle } from "@swift/components/ModalSkipTrial";
import { useAppSelector } from "@swift/hooks";
import { queryKeys } from "@swift/queryKeys";
import { useOptimizeImageService } from "@swift/services/optimizeImageApi";
import { customerData, getPricingStore } from "@swift/store/global";
import { IStatusOptimizeImage } from "@swift/types/OptimizeImage";
import {
    ITrialDays,
    IntervalPricingType,
    PlanType,
} from "@swift/types/planPricing";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useReducer, useRef, useState } from "react";
import { ModalOptimizeImageHandle } from "../components/Modal";
import {
    ELevelOptimize,
    EMessageValidateOptimize,
    EPropsModalWarning,
    ETypeOptimize,
    GetTotal,
    IActionReducerList,
    IActionSelectedAll,
    IActionSelectedItem,
    IPayloadValidateOnOptimize,
    IResultValidateOptimize,
} from "../type";

export const useOptimize = () => {
    const customer = useAppSelector(customerData);

    const customerPlan = useAppSelector(getPricingStore);

    const refModalBuyMore = useRef<ModalBuyMoreHandle>(null);

    const refModalSkipTrial = useRef<ModalSkipTrialHandle>(null);

    const refModalRestore = useRef<ModalOptimizeImageHandle>(null);

    const refModalWarningLimited = useRef<ModalOptimizeImageHandle>(null);

    const [typeModalWarning, setTypeWarning] = useState<EPropsModalWarning>(
        EPropsModalWarning.getMore
    );

    const isPlanBlocked = useMemo(
        () => customer?.app_plan === PlanType.free,
        [customer]
    );

    const isUnlimitedOptimize = useMemo(
        () =>
            customer?.app_plan === PlanType.expert_care &&
            customer?.app_plan_interval === IntervalPricingType.annual &&
            customerPlan.trial_days === ITrialDays.isOutTrial,
        [customer, customerPlan]
    );

    const isRequireSkipTrial = useMemo(
        () => (customerPlan.trial_days ?? 3) !== ITrialDays.isOutTrial,
        [customerPlan.trial_days]
    );

    const tasksReducerList = (
        list: Array<number>,
        action: IActionReducerList
    ) => {
        switch (action.type) {
            case "add":
                if (Array.isArray(action.itemId))
                    list = [...new Set([...list, ...action.itemId])];
                else list.push(action.itemId);
                return list.slice(0);
            case "remove":
                if (!action.itemId) return [];
                else return list.filter((i) => i !== action.itemId);
            default:
                throw Error("Unknown action: " + action.type);
        }
    };

    const [listOptimize, dispatchListOptimize] = useReducer(
        tasksReducerList,
        []
    );

    const [listRestore, dispatchListRestore] = useReducer(tasksReducerList, []);

    const [listRestoring, dispatchListRestoring] = useReducer(
        tasksReducerList,
        []
    );

    const [listOptimizing, dispatchListOptimizing] = useReducer(
        tasksReducerList,
        []
    );

    // query function is define on feature notification so just get data from cache
    const {
        isLoading: isLoadingOverview,
        isFetching: isFetchingOverview,
        data: overViewQuery,
    } = useQuery<GetTotal | null>({
        queryKey: queryKeys.optimizeImage.getOverView().queryKey,
    });

    const onSelectedAll = ({
        argsOptimize,
        argsRestore,
    }: IActionSelectedAll) => {
        dispatchListOptimize(argsOptimize);
        dispatchListRestore(argsRestore);
    };

    const onSelectedItem = ({ args, isOptimize }: IActionSelectedItem) => {
        if (isOptimize) {
            dispatchListOptimize(args);
        } else {
            dispatchListRestore(args);
        }
    };

    const remainCountOptimize = useMemo(
        () =>
            (customer?.default_images_available || 0) +
            (customer?.buymore_images_available || 0),
        [customer]
    );

    const validateRequireSkipTrial = useCallback(() => {
        if (isRequireSkipTrial) {
            refModalSkipTrial?.current?.openModal();
            return false;
        }
        return true;
    }, [isRequireSkipTrial]);

    const validateOnOptimize = useCallback(
        ({typeOptimize,filterOptimize}:IPayloadValidateOnOptimize): IResultValidateOptimize => {
            const isOutRemainOptimization =
                !remainCountOptimize ||
                (typeOptimize === ETypeOptimize.multi &&
                    remainCountOptimize < listOptimize.length);
            if (isUnlimitedOptimize)
                return {
                    status: true,
                    message: EMessageValidateOptimize.isUnlimitedOptimize,
                };
            else if (
                typeOptimize === ETypeOptimize.multi &&
                !listOptimize.length
            )
                return {
                    status: false,
                    message: EMessageValidateOptimize.listOptimizeEmpty,
                };
            else if (isOutRemainOptimization) {
                const returnVal = {
                    status: false,
                    message: EMessageValidateOptimize.outRemainCountOptimize,
                };
                if (isRequireSkipTrial) {
                    setTypeWarning(EPropsModalWarning.limitedMulti);
                    refModalWarningLimited.current?.setModal({
                        isActive: true,
                    });
                } else refModalBuyMore.current?.setModal(true);

                return returnVal;
            } else if (
                typeOptimize === ETypeOptimize.all) {
                if((filterOptimize === IStatusOptimizeImage.restored && 
                    remainCountOptimize < (overViewQuery?.total_restored_images || 0)) || (filterOptimize !== IStatusOptimizeImage.restored && 
                        remainCountOptimize <
                        (overViewQuery?.total_un_optimized_images || 0) +
                            (overViewQuery?.total_restored_images || 0))){
                    setTypeWarning(EPropsModalWarning.limitedAll);
                    refModalWarningLimited.current?.setModal({ isActive: true });
                    return {
                        status: false,
                        message:
                            EMessageValidateOptimize.warningRemainCountOptimize,
                    };
                }
               
            }
            return {
                status: true,
                message: EMessageValidateOptimize.isAllowOptimize,
            };
        },
        [
            remainCountOptimize,
            listOptimize.length,
            isUnlimitedOptimize,
            overViewQuery?.total_un_optimized_images,
            overViewQuery?.total_restored_images,
            isRequireSkipTrial,
        ]
    );

    const { callActionOptimize } = useOptimizeImageService();

    const storeParams = useCallback(
        (isOptimizeAll = false) => {
            const params: {
                listImage: number[];
                level: number;
                optimizeType?: IStatusOptimizeImage;
            } = {
                listImage: isOptimizeAll ? [] : listOptimize,
                level: ELevelOptimize.normalPercent,
            };
            if (isOptimizeAll) {
                params.optimizeType = IStatusOptimizeImage.all;
            }
            return params;
        },
        [listOptimize]
    );

    const onActionOptimize = useCallback(
        async (isOptimizeAll: boolean) => {
            const { listImage, level, optimizeType } =
                storeParams(isOptimizeAll);
            const result = await callActionOptimize({
                listImage,
                level,
                optimizeType,
            });
            return { result, listIdOptimize: listImage, isOptimizeAll };
        },
        [callActionOptimize, storeParams]
    );

    const removeAllSelected = () => {
        dispatchListOptimize({ type: "remove", itemId: 0 });
        dispatchListRestore({ type: "remove", itemId: 0 });
    };

    return {
        // ref react node
        refModalWarningLimited,
        refModalRestore,
        refModalBuyMore,
        refModalSkipTrial,
        // variable
        isRequireSkipTrial,
        isLoadingOverview,
        isFetchingOverview,
        isPlanBlocked,
        isUnlimitedOptimize,
        typeModalWarning,
        remainCountOptimize,
        listOptimize,
        listRestore,
        listRestoring,
        listOptimizing,
        // method
        validateRequireSkipTrial,
        validateOnOptimize,
        dispatchListRestore,
        dispatchListOptimize,
        dispatchListOptimizing,
        dispatchListRestoring,
        onSelectedAll,
        onSelectedItem,
        removeAllSelected,
        setTypeWarning,

        // service API
        onActionOptimize,
    };
};
