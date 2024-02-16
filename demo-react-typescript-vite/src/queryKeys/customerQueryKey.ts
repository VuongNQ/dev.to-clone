import {
  createQueryKeys,
  inferQueryKeys,
} from "@lukemorales/query-key-factory";

export const customerQueryKey = createQueryKeys("customer", {
  detail: () => ({
    queryKey: ["detail"],
    queryFn: null,
  }),
});

export type TCustomerQueryKey = inferQueryKeys<typeof customerQueryKey>;
