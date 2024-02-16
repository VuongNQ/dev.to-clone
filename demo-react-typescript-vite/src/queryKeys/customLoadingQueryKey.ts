import {
  createQueryKeys,
  inferQueryKeys,
} from "@lukemorales/query-key-factory";

export const customLoadingQueryKey = createQueryKeys("customLoading", {
  getSettingCustomLoading: () => ({
    queryKey: ["getSettingCustomLoading"],
    queryFn: null,
  }),
});

export type TCustomLoadingQueryKey = inferQueryKeys<typeof customLoadingQueryKey>;
