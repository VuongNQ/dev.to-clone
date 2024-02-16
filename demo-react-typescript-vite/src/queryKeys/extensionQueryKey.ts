import {
    createQueryKeys,
    inferQueryKeys,
  } from "@lukemorales/query-key-factory";
  
  export const extensionQueryKey = createQueryKeys("extensionQueryKey", {
    getStatusExtensionSEO: () => ({
      queryKey: ["getStatusExtensionSEO"],
      queryFn: null,
    }),
    getStatusExtensionSpeed: () => ({
      queryKey: ["getStatusExtensionSpeed"],
      queryFn: null,
    }),
  });
  
  export type TCustomLoadingQueryKey = inferQueryKeys<typeof extensionQueryKey>;
  