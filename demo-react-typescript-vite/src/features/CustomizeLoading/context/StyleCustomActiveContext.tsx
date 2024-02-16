import { createContext } from "react";
import { LOADING_STYLE_DEFAULT } from "../constants";
import { CustomizeLoadingTemplateType } from "../type";


const initStyleCustomizeLoadingActiveContext: IDataInitStyleCustomizeLoadingActiveContext = {
    styleCustomizeLoadingActive: LOADING_STYLE_DEFAULT.simple_1
};

interface IDataInitStyleCustomizeLoadingActiveContext {
    styleCustomizeLoadingActive:CustomizeLoadingTemplateType
}

export const StyleCustomizeLoadingActiveContext = createContext<IDataInitStyleCustomizeLoadingActiveContext>(
    initStyleCustomizeLoadingActiveContext
);
