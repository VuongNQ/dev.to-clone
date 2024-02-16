import { useAppDispatch, useAppSelector } from "@swift/hooks";
import { usePusher } from "@swift/hooks/usePusher";
import { queryKeys } from "@swift/queryKeys";
import { customerData, globalActions } from "@swift/store/global";
import {
    IDetailImageRaw,
    IFilterImage,
    IPusherProcessOptimizeData,
    IPusherRestoreImageEnd,
    IStatusOptimizeImage,
    PusherEventImages,
    PusherOptimizeImages,
} from "@swift/types/OptimizeImage";
import { IDataPagination } from "@swift/types/general";
import { PusherGeneral } from "@swift/types/pusher";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { useCallback, useContext, useEffect } from "react";
import { OptimizeImageContext } from "../context/optimizeImage";
import { getUpdatedListImage } from "../helpers";

const getUpdateList: Worker = new Worker(
    new URL("../serviceWorker/UpdateListImage.ts", import.meta.url).href,
    { type: "module" }
);

export const useEventPusherOptimize = ({ filter }: IHookEventPusher) => {
    const customer = useAppSelector(customerData);

    const dispatchState = useAppDispatch();

    const queryClient = useQueryClient();

    const { channel } = usePusher({
        StrChannel: `${PusherGeneral.channel + customer?.id}`,
    });

    const {
        dispatchListOptimize,
        dispatchListRestore,
        dispatchListOptimizing,
        dispatchListRestoring,
    } = useContext(OptimizeImageContext);

    const dispatchContext = useCallback(
        (status: IStatusOptimizeImage, id: number) => {
            const removeRestore = () => {
                dispatchListRestore({ type: "remove", itemId: id });
                dispatchListRestoring({ type: "remove", itemId: id });
            };
            const removeOptimize = () => {
                dispatchListOptimize({ type: "remove", itemId: id });
                dispatchListOptimizing({ type: "remove", itemId: id });
            };

            if (status === IStatusOptimizeImage.optimizing)
                dispatchListOptimizing({ type: "add", itemId: id }); // incase optimize all or some reason item not in list optimizing

            if (status === IStatusOptimizeImage.restoring)
                dispatchListRestoring({ type: "add", itemId: id }); // some reason item not in list restoring

            // after item done job background BE
            if (status === IStatusOptimizeImage.optimized) removeOptimize();

            if (status === IStatusOptimizeImage.restored) removeRestore();

            if (status === IStatusOptimizeImage.failed) {
                removeOptimize();
                removeRestore();
            }
        },
        [
            dispatchListOptimize,
            dispatchListOptimizing,
            dispatchListRestore,
            dispatchListRestoring,
        ]
    );

    const updateListImage = useCallback(
        (optimizedImage: IDetailImageRaw) => {
            const { id, size, optimized_size, src, status } = optimizedImage;
            queryClient.setQueryData<
                InfiniteData<IDataPagination<IDetailImageRaw[]>>
            >(
                queryKeys.optimizeImage.getListImage(filter).queryKey,
                (listData) => ({
                    pages: getUpdatedListImage({
                        id,
                        size,
                        optimized_size,
                        src,
                        status,
                        listPaging: listData?.pages || [],
                    }),

                    pageParams: listData?.pageParams ?? [],
                })
            );
        },
        [filter, queryClient]
    );

    const reFetchOverView = useCallback(
        () =>
            queryClient.refetchQueries(
                queryKeys.optimizeImage.getOverView().queryKey
            ),
        [queryClient]
    );

    const reFetchListImage = useCallback(
        () =>
            queryClient.refetchQueries(
                queryKeys.optimizeImage.getListImage(filter).queryKey
            ),
        [filter, queryClient]
    );

    const initProcessUpdate = useCallback(
        (optimizedImage: IDetailImageRaw) => {
            dispatchContext(optimizedImage.status, optimizedImage.id);

            if (window.Worker) {
                // console.log("using worker");
                getUpdateList.postMessage(
                    JSON.stringify({
                        ...optimizedImage,
                        list: queryClient.getQueryData(
                            queryKeys.optimizeImage.getListImage(filter)
                                .queryKey
                        ),
                    })
                );
            } else updateListImage(optimizedImage);
        },
        [dispatchContext, filter, queryClient, updateListImage]
    );

    const handleEventPusherReSync = useCallback(() => {
        // console.log(data);
        reFetchOverView();
        reFetchListImage();
    }, [reFetchListImage, reFetchOverView]);

    /**
     * Handle Pusher when a image change status on optimize
     * all case:
     * - normal process, image change status from optimizing to optimized
     * - in case out remain optimization, just refetch overview data and optimization
     */
    const onEventOptimize = useCallback(
        async (data: PusherOptimizeImages) => {
            const { optimizedImage } = data;
            // in case store out remain optimization
            if (!optimizedImage) {
                reFetchOverView();
                dispatchState(
                    globalActions.updateCustomer({
                        buymore_images_available: 0,
                        default_images_available: 0,
                    })
                );
                return;
            }
            initProcessUpdate(optimizedImage);
        },
        [dispatchState, initProcessUpdate, reFetchOverView]
    );

    /**
     * handle Pusher end Optimize
     * all case:
     * - on totalImages === image optimize, this normal case
     * - when out of remain optimization, just show toast optimize done
     */
    const onEventOptimizeEnd = useCallback(
        (data: IPusherProcessOptimizeData) => {
            const { totalImages, optimizedImageNumber } = data;

            const isTotalAboveOne = totalImages > 1;
            const isJobDone = totalImages === optimizedImageNumber;

            if (isJobDone) {
                reFetchOverView();

                queryClient.invalidateQueries(
                    queryKeys.customer.detail().queryKey
                );

                if (isTotalAboveOne) reFetchListImage();
            }
        },
        [queryClient, reFetchListImage, reFetchOverView]
    );

    const onEventRestore = useCallback(
        (data: PusherOptimizeImages) => {
            const { optimizedImage } = data;
            if (optimizedImage) initProcessUpdate(optimizedImage);
        },
        [initProcessUpdate]
    );

    const onEventRestoreEnd = useCallback(
        (data: IPusherRestoreImageEnd) => {
            const { imageNumber, totalImages } = data;
            if (totalImages > 1 && totalImages === imageNumber) {
                reFetchOverView();
                reFetchListImage();
            }
        },
        [reFetchListImage, reFetchOverView]
    );

    useEffect(() => {
        channel.bind(PusherEventImages.compress_images, onEventOptimize);

        channel.bind(PusherEventImages.optimize_end, onEventOptimizeEnd);

        channel.bind(PusherEventImages.restore_images, onEventRestore);

        channel.bind(PusherEventImages.restore_end, onEventRestoreEnd);

        channel.bind(PusherEventImages.resync_images, handleEventPusherReSync);

        return () => {
            channel.unbind(PusherEventImages.compress_images, onEventOptimize);
            channel.unbind(PusherEventImages.optimize_end, onEventOptimizeEnd);
            channel.unbind(PusherEventImages.restore_images, onEventRestore);
            channel.unbind(PusherEventImages.restore_end, onEventRestoreEnd);
            channel.unbind(
                PusherEventImages.resync_images,
                handleEventPusherReSync
            );
        };
    }, [
        channel,
        handleEventPusherReSync,
        onEventOptimize,
        onEventOptimizeEnd,
        onEventRestore,
        onEventRestoreEnd,
    ]);

    useEffect(() => {
        if (!window.Worker) return;
        // init worker when mount comment, but in case worker not onmessage, run getUpdateList.terminate() after un-mount component using this hook
        getUpdateList.onmessage = (e: MessageEvent<string>) => {
            const response = JSON.parse(e.data) as unknown as IDataPagination<
                IDetailImageRaw[]
            >[];
            // console.log("getUpdateList >>>>>", response);

            queryClient.setQueryData<
                InfiniteData<IDataPagination<IDetailImageRaw[]>>
            >(
                queryKeys.optimizeImage.getListImage(filter).queryKey,
                (listData) => ({
                    pages: [...response] ?? [],
                    pageParams: listData?.pageParams ?? [],
                })
            );
        };
    }, [filter, queryClient]);

    return {
        channel: channel,
    };
};

interface IHookEventPusher {
    filter: IFilterImage;
}
