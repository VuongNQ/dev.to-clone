import { createQueryKeys, inferQueryKeys } from "@lukemorales/query-key-factory";

export const portalQueryKey = createQueryKeys("portal", {
  getTokenPortal:()=>({
    queryKey:['getTokenPortal'],
    queryFn: null
  }),
  getLogCheckup:(page:number)=>({
    queryKey:['getLogCheckup',page],
    queryFn: null
  }),
});

export type TPortalQueryKey = inferQueryKeys<typeof portalQueryKey>;