import {
  createQueryKeys,
  inferQueryKeys,
} from "@lukemorales/query-key-factory";
import { IPayloadGetListAuditProduct } from "@swift/types/boostSEO";

export const basicSeoQueryKey = createQueryKeys("basicSeo", {
  getScanLogsOverview:()=>({
    queryKey: ["getScanLogsOverview"],
  }),
  getScanLogsStoreSEO: () => ({
    queryKey: ["getScanLogsStoreSEO"],
    queryFn: null,
  }),
  getScanLogsCompetitorSEO: () => ({
    queryKey: ["getScanLogsCompetitorSEO"],
    queryFn: null,
  }),
  getAltImgMetaTag: () => ({
    queryKey: ["getAltImgMetaTag"],
    queryFn: null,
  }),
  postAltImgMetaTag: () => ({
    queryKey: ["postAltImgMetaTag"],
  }),
  auditProdList: ({ filters, params }: IPayloadGetListAuditProduct) => ({
    queryKey: ["auditProdList", { filters }, params.page],
    queryFn: null,
  }),
  getAutoScanSEO: () => ({
    queryKey: ["getAutoScanSEO"],
    queryFn: null,
  }),
  getBulkAddAltImgAndMetaTag: () => ({
    queryKey: ["getBulkAddAltImgAndMetaTag"],
    queryFn: null,
  }),
});

export type TBasicSeoQueryKey = inferQueryKeys<typeof basicSeoQueryKey>;
