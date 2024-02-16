import { IDataDetailAuditProduct, generateContentAI } from "@swift/types/boostSEO";
import { SwiftApiResponseBase } from "@swift/types/service";
import { createContext } from "react";
import { IDataInputConfigLoading } from "../type";

const EditAuditProductContextDefaultValue: IEditAuditProductContext = {
  isLoadingDetailAuditProduct: false,
  isLoadingAnalyzeAuditProduct:false,
  isLoadingPutAuditProduct: false,
  dataDetailAuditProduct: null,
  handlePostAnalyzeProduct: () =>
    new Promise((res) => res({ status: false, usedToken: 0 })),
  setIsLoadingPutAuditProduct: () => null,
  fetchDataDetailAudit: async () => null,
  handleUpdateDataAuditProduct: () => null,
  hasErrorsToken: () => false,
  inputConfigLoading:{
    isLoadingAnalyze:false,
    isLoadingReAnalyze:false,
    typeGenerate:generateContentAI.title
  },
  setInputConfigLoading:() => null
};

export const EditAuditProductContext = createContext<IEditAuditProductContext>(
  EditAuditProductContextDefaultValue
);

export interface IEditAuditProductContext {
  isLoadingDetailAuditProduct: boolean;
  isLoadingAnalyzeAuditProduct: boolean;
  inputConfigLoading:IDataInputConfigLoading,
  isLoadingPutAuditProduct: boolean;
  dataDetailAuditProduct: IDataDetailAuditProduct | null;
  handlePostAnalyzeProduct: (productId: number) => Promise<{
    usedToken: number;
  } & Pick<SwiftApiResponseBase, "errors" | "message" | "status">>;
  setIsLoadingPutAuditProduct: (value: boolean) => void;
  fetchDataDetailAudit: (productId: number) => void;
  handleUpdateDataAuditProduct: (
    payload: Partial<IDataDetailAuditProduct>
  ) => void;
  hasErrorsToken: (errors: unknown) => boolean;
  setInputConfigLoading: (payload: IDataInputConfigLoading) => void;
}
