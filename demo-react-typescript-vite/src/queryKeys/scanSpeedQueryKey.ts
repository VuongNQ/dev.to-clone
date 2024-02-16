import {
  createQueryKeys,
  inferQueryKeys,
} from "@lukemorales/query-key-factory";

export const scanSpeedQueryKey = createQueryKeys("scanSpeedQueryKey", {
  getScanLogsSpeed:()=>({
    queryKey: ["getScanLogsSpeed"],
  }),

});

export type TBasicSeoQueryKey = inferQueryKeys<typeof scanSpeedQueryKey>;
