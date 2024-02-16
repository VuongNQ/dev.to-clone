import { IOptimizeStatus, IStatusOptimizeImage } from "@swift/types/OptimizeImage";
export interface FilterList {
    value: string;
    label: string;
    active: boolean;
}

export enum ActionModalRestore {
    close = "close",
    refresh = "refresh",
}

export enum TypeActionOptimize {
    all = "all",
    single = "single",
    multi = "multi",
}

export interface GetTotal {
    total_optimized_images: number;
    total_origin_size: number;
    total_saved: number;
    total_un_optimized_images: number;
    optimize_status: IOptimizeStatus;
    resync_image_status: IOptimizeStatus;
    total_images: number;
    total_restored_images: number;
    enable_resync_image: boolean;
}

export enum ESelectionTypePolaris {
    All = "all",
    Page = "page",
    Multi = "multi",
    Single = "single",
}
export interface IPropsModalWarning {
    type: EPropsModalWarning;
}

export enum EPropsModalWarning {
    upgrade = "upgrade",
    limitedAll = "limitedAll",
    limitedMulti = "limitedMulti",
    getMore = "getMore",
}

export interface IActionReducerList {
    type: "add" | "remove";
    itemId: number | Array<number>;
}

export interface IResultValidateOptimize {
    status: boolean;
    message: EMessageValidateOptimize;
}

export enum EMessageValidateOptimize {
    listOptimizeEmpty = "listOptimizeEmpty",
    outRemainCountOptimize = "outRemainCountOptimize",
    warningRemainCountOptimize = "warningRemainCountOptimize",
    isUnlimitedOptimize = "isUnlimitedOptimize",
    isAllowOptimize = "isAllowOptimize",
}

export interface IActionSelectedAll {
    argsOptimize: IActionReducerList;
    argsRestore: IActionReducerList;
}

export interface IActionSelectedItem {
    args: IActionReducerList;
    isOptimize: boolean;
}

export enum ETypeOptimize {
    all = "all",
    single = "single",
    multi = "multi",
}

export enum ELevelOptimize {
    normalPercent = 80,
    highPercent = 100,
}


export interface IPayloadValidateOnOptimize {typeOptimize: ETypeOptimize,filterOptimize?:IStatusOptimizeImage}