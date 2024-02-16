import {
  createQueryKeys,
  inferQueryKeys,
} from "@lukemorales/query-key-factory";
import {
  IDataDetailOptimizeTheme,
  IPayloadGetHistoryOptimize,
} from "@swift/types/optimizeTheme";

export const optimizeThemeQueryKey = createQueryKeys("optimizeTheme", {
  getDetailOptimize: () => ({
    queryKey: ["getDetailOptimize"],
    queryFn: (): IDataDetailOptimizeTheme | null => null,
  }),
  getOptimizeThemeAutoSetting: () => ({
    queryKey: ["getOptimizeThemeAutoSetting"],
    queryFn: null,
  }),
  getHistoryOptimize: ({ filters, params }: IPayloadGetHistoryOptimize) => ({
    queryKey: ["getHistoryOptimize", { filters }, params.page],
    queryFn: null,
  }),
  getHistoryOptimizeDetail: (themeId: number) => ({
    queryKey: ["getHistoryOptimizeDetail", themeId],
    queryFn: null,
  }),
  getLogOptimizeFailed: () => ({
    queryKey: ["getLogOptimizeFailed"],
    queryFn: null,
  }),
});

export type TOptimizeThemeQueryKey = inferQueryKeys<
  typeof optimizeThemeQueryKey
>;
