import { createQueryKeys, inferQueryKeys } from "@lukemorales/query-key-factory";
import { IGetHistoryToken } from "@swift/types/wallet";

export const profileQueryKey = createQueryKeys("profile", {
  getToken:()=>({
    queryKey:['chat-gpt-token'],
    queryFn: null
  }),
  getPackagesBuyToken:()=>({
    queryKey: ["packages-token"],
    queryFn: null
  }),
  getPackagesBuyOptimization:()=>({
    queryKey: ["packages-image"],
    queryFn: null
  }),
  loadHistory: ({filterBy, range}: IGetHistoryToken) => ({
    queryKey: [filterBy, range],
    queryFn: null,
  })
});

export type TProfileQueryKey = inferQueryKeys<typeof profileQueryKey>;