import { queryKeys } from "@swift/queryKeys";
import { useOptimizeImageService } from "@swift/services/optimizeImageApi";
import { IOptimizeStatus } from "@swift/types/OptimizeImage";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useOptimizeImage = () => {
    const { getOverView } = useOptimizeImageService();
    const {
        isLoading: isLoadingOverview,
        isFetching: isFetchingOverview,
        data: overViewQuery,
    } = useQuery({
        ...queryKeys.optimizeImage.getOverView(),
        initialData: null,
        queryFn: async ()=>{
            const {status, data} = await getOverView();
            if(!status || !data) return null;
            return data;
        },
    });

    const isShowProcessSyncImage = useMemo(
        () =>
            !isLoadingOverview &&
            !isFetchingOverview &&
            overViewQuery?.resync_image_status ===
                IOptimizeStatus.processing,
        [isFetchingOverview, isLoadingOverview, overViewQuery?.resync_image_status]
    );

    return {
        isShowProcessSyncImage,
        overViewQuery,
    };
};
