import {
  createQueryKeys,
  inferQueryKeys,
} from "@lukemorales/query-key-factory";

export const oneExpertsQueryKey = createQueryKeys("oneExpertsQueryKey", {
  getListTicket: (page: number) => ({
    queryKey: ["getListTicket", page],
    queryFn: null,
  }),
  getRecordTickets: () => ({
    queryKey: ["getRecordTickets"],
    queryFn: null,
  }),
});

export type TOneExpertsQueryKey = inferQueryKeys<typeof oneExpertsQueryKey>;
