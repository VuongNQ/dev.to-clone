import {
  createQueryKeys,
  inferQueryKeys,
} from "@lukemorales/query-key-factory";

export const boostHistoryQueryKey = createQueryKeys("boostHistoryQueryKey", {
  getSpeedHistory: (page:number) => ({
    queryKey: ["getSpeedHistory",page],
    queryFn: null,
  }),
});

export type TBoostHistoryQueryKey = inferQueryKeys<typeof boostHistoryQueryKey>;
