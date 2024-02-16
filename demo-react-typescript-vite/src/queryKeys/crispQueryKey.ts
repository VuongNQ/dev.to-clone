import {
  createQueryKeys,
  inferQueryKeys,
} from "@lukemorales/query-key-factory";
import { CustomerDataState } from "@swift/store/type";
import { IDataCrispChat } from "@swift/types/general";

export const crispQueryKey = createQueryKeys("crisp", {
  getCrispChat: (customer: CustomerDataState | null | undefined) => ({
    queryKey: ["getCrisp", { customer }],
    queryFn: null,
  }),
  initCrispChatWidget: (dataCrispChat: IDataCrispChat | null | undefined) => ({
    queryKey: ["initCrispChat", { dataCrispChat }],
    queryFn: null,
  }),
});

export type TCrispQueryKey = inferQueryKeys<typeof crispQueryKey>;
