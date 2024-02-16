import { KeyOptimzie } from "@swift/types/optimizeTheme";

export interface ThemeStoreType {
  admin_graphql_api_id: string;
  created_at: string;
  id: number;
  name: string;
  previewable: boolean;
  processing: boolean;
  role: "main" | "unpublished";
  theme_store_id: number | null;
  updated_at: string;
}

export interface ThemeRelationship {
  child: string | "null";
  parent: string | "null";
}

export interface ButtonListTaskType {
  disabled: boolean;
  colorActive: string;
}
export interface NotifyOptimationStatusType {
  title: string;
  des: string;
  isFail: boolean;
  hanldeRepair?: () => void;
  hanldeSkip?: () => void;
}

export interface ModalOptimizeType {
  title: string;
  des: string;
  isFail: boolean;
  hanldeRepair: () => void;
  hanldeSkip: () => void;
}

export interface NotifyType {
  KeyStep: string;
  percentProgress: number;
}

export interface progressOptimizeType {
  "critical-css": number | string;
  "lazyload-images": number | string;
}

export interface isLoadingCheckThemeType {
  "lazyload-images": boolean;
  "critical-css": boolean;
  callApiCheck: boolean;
}

export interface dataLogOptimizeType {
  listLog: listLogType;
  total: number;
}

export type listLogType = (string | number | JSX.Element)[][];

export interface HandleFindStepinListStepType {
  key: KeyOptimzie | "";
  title: string;
  des: string;
  desProccess: string;
}
