import NotifySingleContent from "@swift/components/UIs/Notification/SingleContent";
import { useAppSelector } from "@swift/hooks";
import { customerData } from "@swift/store/global";
import {
    IPusherProcessOptimizeData,
    IPusherRestoreImageEnd,
    ListJobOptimize,
    PusherEventImages,
    PusherOptimizeImages,
} from "@swift/types/OptimizeImage";
import { Channel } from "pusher-js";
import { RefObject, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import { ToastEventHandle } from "../ToastAfterNotify";
import { EStatusActiveToast } from "../../types";

interface INotifyImage {
    channel: Channel;
    refToast: RefObject<ToastEventHandle>;
}

const NotifyOptimizeImage = ({ channel, refToast }: INotifyImage) => {
    const { t } = useTranslation();

    const [listJob, setJobs] = useState<ListJobOptimize>({
        /*  sfa: { total: 12, images: 3 },
			sfa2: { total: 5, images: 3 }, */
    });

    const customer = useAppSelector(customerData);

    const updateShowListJob = (
        logId: number,
        totalImages: number,
        totalImageOptimized = 0
    ) => {
        setJobs((current: ListJobOptimize) => {
            if (!(logId in current))
                current[logId] = {
                    total: totalImages,
                    images: totalImageOptimized,
                    isDone: false,
                };
            else current[logId].images = totalImageOptimized;
            return { ...current };
        });
    };

    const handleEndJob = (logId: number) => {
        setJobs((current: ListJobOptimize) => {
            if (logId in current){
                current[logId].isDone = true;
                setTimeout(()=>refToast.current?.setToast(EStatusActiveToast.isOptimize), 100);
            }
            return { ...current };
        });
    };

    const handleEventPusher = useCallback(
        (data: IPusherProcessOptimizeData) => {
            const { logId, totalImages, optimizedImageNumber } = data;

            if (totalImages === 1) return;

            // console.log(optimizedImage, logId, listJob[logId], listJob);
            if (optimizedImageNumber === totalImages) {
                handleEndJob(logId);
                return;
            }

            if (Object.keys(listJob).length >= 6) return;
            updateShowListJob(logId, totalImages, optimizedImageNumber);
        },
        [listJob]
    );
    const handleEventProcessing = useCallback(
        (data: PusherOptimizeImages) => {
            const { logId, totalImages, optimizedImage } = data;

            if (totalImages === 1) return;

            if (!optimizedImage && logId in listJob) {
                handleEndJob(logId);
                return;
            }

            // trường hợp chưa có gì trong list thì miễn cưỡng thêm 1 item để noti hiển thị đồng thời với bên list table image
            if (!Object.keys(listJob).length) {
                updateShowListJob(logId, totalImages);
                return;
            }
        },
        [listJob]
    );

    const handleOnRestoreEnd = (data: IPusherRestoreImageEnd) => {
        const { imageNumber, totalImages } = data;
        if (imageNumber === totalImages && totalImages > 1)
            refToast.current?.setToast(EStatusActiveToast.isRestore);
    };

    useEffect(() => {
        // console.log('MyComponent was mounted');
        if (!customer) return;

        channel.bind(PusherEventImages.optimize_end, handleEventPusher);

        channel.bind(PusherEventImages.compress_images, handleEventProcessing);

        channel.bind(PusherEventImages.restore_end, handleOnRestoreEnd);

        return () => {
            // console.log('MyComponent was unmounted');
            channel.unbind(PusherEventImages.optimize_end, handleEventPusher);

            channel.unbind(
                PusherEventImages.compress_images,
                handleEventProcessing
            );
            channel.unbind(PusherEventImages.restore_end, handleOnRestoreEnd);
        };
    }, [channel, customer, handleEventProcessing, handleEventPusher]);

    return Object.keys(listJob).length ? (
        <>
            {Object.keys(listJob)
                .filter((key) => {
                    return !listJob[key].isDone;
                })
                .map((key) => (
                    <NotifySingleContent
                        key={key}
                        title={t("optimize_image.notification.optimize")}
                        after={`(${listJob[key].images}/${listJob[key].total})`}
                        isOnProcess={true}
                    />
                ))}
        </>
    ) : (
        <></>
    );
};

export default NotifyOptimizeImage;
