import NotifySingleContent from "@swift/components/UIs/Notification/SingleContent";
import { useAppSelector } from "@swift/hooks";
import { queryKeys } from "@swift/queryKeys";
import { customerData } from "@swift/store/global";
import { PusherEventImages } from "@swift/types/OptimizeImage";
import { PlanType } from "@swift/types/planPricing";
import { useQueryClient } from "@tanstack/react-query";
import { Channel } from "pusher-js";
import { RefObject, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useSearchParams } from "react-router-dom";
import { ToastEventHandle } from "../ToastAfterNotify";
import { EStatusActiveToast } from "../../types";

interface INotifyImage {
    channel: Channel;
    isShowProcessSyncImage: boolean;
    refToast: RefObject<ToastEventHandle>;
}

const NotifyReSyncImages = ({
    channel,
    isShowProcessSyncImage,
    refToast,
}: INotifyImage) => {
    const { t } = useTranslation();

    const customer = useAppSelector(customerData);

    const location = useLocation();

    const [searchParams] = useSearchParams();

    const queryClient = useQueryClient();

    const handleEventPusherReSync = useCallback(() => {
        // console.log(data);
        const isOptimizeImagePage =
            location.pathname.includes("speed-optimizer") &&
            searchParams.has("tabs") &&
            searchParams.get("tabs") === "optimize_images";

        if (!isOptimizeImagePage)
            queryClient.invalidateQueries(
                queryKeys.optimizeImage.getOverView().queryKey
            );
        refToast.current?.setToast(EStatusActiveToast.isSyncImagesDone);
    }, [location.pathname, queryClient, refToast, searchParams]);

    useEffect(() => {
        if (!customer) return;

        channel.bind(PusherEventImages.resync_images, handleEventPusherReSync);

        return () => {
            channel.unbind(
                PusherEventImages.resync_images,
                handleEventPusherReSync
            );
        };
    }, [channel, customer, handleEventPusherReSync]);

    if (customer?.app_plan === PlanType.free || !isShowProcessSyncImage)
        return <></>;

    return (
        <NotifySingleContent
            title={t("optimize_image.notification.re_syncing")}
            isOnProcess={true}
        />
    );
};

export default NotifyReSyncImages;
