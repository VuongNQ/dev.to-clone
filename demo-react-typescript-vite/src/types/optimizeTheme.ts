export enum KeyOptimzie {
  "critical-css" = "critical-css",
  "lazyload-images" = "lazyload-images",
  "optimize-css" = "optimize-css",
  "optimize-js" = "optimize-js",
  "preload-fonts" = "preload-fonts",
  duplicate = "duplicate",
  "optimize-html" = "optimize-html",
  "optimize-html-plus" = "optimize-html-plus",
}
export enum StatusProccessOptimzie {
  "in-process" = "in-process",
  "done" = "done",
  "fail" = "failed",
}

export enum MessageOptimize {
  not_allow_optimize = "not allow",
}
export interface IDataDetailOptimizeTheme {
  origin_theme_id: number;
  optimized_theme_id: number | null;
  optimized_theme_name: string | null;
  stats: Record<KeyOptimzie, InforActionOpitimizeThemeType | null>;
  count_themes: number;
}

// export interface DataDetailOptimzieThemeType {
//   duplicate: InforActionOpitimizeThemeType | null;
//   "optimize-css": InforActionOpitimizeThemeType | null;
//   "optimize-js": InforActionOpitimizeThemeType | null;
//   "lazyload-images": InforActionOpitimizeThemeType | null;
//   "preload-fonts": InforActionOpitimizeThemeType | null;
//   "critical-css": InforActionOpitimizeThemeType | null;
//   "optimize-html": InforActionOpitimizeThemeType | null;
//   "optimize-html-plus": InforActionOpitimizeThemeType | null;
// }
export interface InforActionOpitimizeThemeType {
  progress: number;
  total_file: number;
  file_count: number;
  status: StatusProccessOptimzie;
}

export interface GetLogOptimzieFailedType {
  id: number;
  optimize_theme_tracking_id: number;
  asset_key: string;
  asset_src: string;
  created_at: string;
  updated_at: string;
}
export interface PayloadPusherOpitimizeTheme {
  shopifyDomain: string;
  optimize: KeyOptimzie;
  status: boolean;
  originThemeId: number;
}

export interface IPayloadGetHistoryOptimize {
  filters: IFilterHistoryOptimize;
  params: {
    limit?: number;
    page: number;
  };
}

export interface IFilterHistoryOptimize {
  keyword: string; // Optional
  last_optimized?: string[];
  last_publish?: string[];
}

export interface IDataHistoryOptimize {
  id: number;
  store_id: number;
  theme_id: number;
  theme_name: string;
  files_optimized: number;
  optimized_at: string;
  publish_at: null | string;
}

export interface IDataOptimizeThemeRedux {
  isAcceptOptimizeTheme: boolean;
  themeOptimize: ThemeOptimizeType | null;
  themeMain: ThemeOptimizeType | null;
  isProgressRunning: boolean;
  listStepProgress: KeyOptimzie[];
  listStepProgressTemp: KeyOptimzie[];
  StepProgressRunning: KeyOptimzie | "";
  stepProgressFail: KeyOptimzie | "";
  StepsSuccessCurrentThemeOptimize: KeyOptimzie[];
  isFinishProgress: boolean;
  isCheckDataLog: boolean;
  dataDetail: Record<KeyOptimzie, InforActionOpitimizeThemeType | null>;
  isDifferenceThemeMain: boolean;
}

export interface ThemeOptimizeType {
  id: number;
  name?: string;
}
