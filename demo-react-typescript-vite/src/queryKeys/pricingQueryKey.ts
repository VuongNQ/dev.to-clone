import { createQueryKeys, inferQueryKeys } from "@lukemorales/query-key-factory";
import { CustomerDataState } from "@swift/store/type";

export const pricingQueryKey = createQueryKeys("pricing", {
  currentPlan: (customer: CustomerDataState | null | undefined) => ({
    queryKey: ["currentPlan",{customer}],
    queryFn: null,
  }),
});

export type TPricingQueryKey = inferQueryKeys<typeof pricingQueryKey>;