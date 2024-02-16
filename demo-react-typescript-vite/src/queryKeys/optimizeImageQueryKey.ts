import {
    createQueryKeys,
    inferQueryKeys,
} from "@lukemorales/query-key-factory";
import { EQueryKeyOptimizeImage, IFilterImage } from "@swift/types/OptimizeImage";

export const optimizeImageQueryKey = createQueryKeys(EQueryKeyOptimizeImage.optimizeImage, {
    [EQueryKeyOptimizeImage.getSettingOptimize]: () => ({
        queryKey: ["setting"],
    }),
    [EQueryKeyOptimizeImage.getOverView]: () => ({
        queryKey: ["overview"],
    }),
    [EQueryKeyOptimizeImage.getListImage] : ({ type, day, status }: IFilterImage) => ({
        queryKey: [type, day, status],
    }),
});

export type TBasicSeoQueryKey = inferQueryKeys<typeof optimizeImageQueryKey>;
