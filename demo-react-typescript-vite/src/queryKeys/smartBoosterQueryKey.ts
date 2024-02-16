import {
  createQueryKeys,
  inferQueryKeys,
} from "@lukemorales/query-key-factory";

export const smartBoosterQueryKey = createQueryKeys("smartBoosterQueryKey", {
  getSettingGA: () => ({
    queryKey: ["getSettingGA"],
    queryFn: null,
  }),
  getDataStreamsGA: () => ({
    queryKey: ["getDataStreamsGA"],
    queryFn: null,
  }),
  getReportCountry: () => ({
    queryKey: ["getReportCountry"],
    queryFn: null,
  }),
  getReportUser: () => ({
    queryKey: ["getReportUser"],
    queryFn: null,
  }),
  getOverViewReport: (page:number) => ({
    queryKey: ["getOverViewReport",page],
    queryFn: null,
  }),
});

export type TSmartBoosterQueryKey = inferQueryKeys<typeof smartBoosterQueryKey>;
