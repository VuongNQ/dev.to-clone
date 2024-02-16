import { useAppSelector } from "@swift/hooks";
import { usePusher } from "@swift/hooks/usePusher";
import { customerData } from "@swift/store/global";
import { PusherGeneral } from "@swift/types/pusher";
import NotifyBulkAltImgMetaTag from "./components/NotifyBulkAltImgMetaTag";
import NotifyOptimizeTheme from "./components/NotifyOptimizeTheme";
import NotifySEO from "./components/NotifySEO";
import NotifySyncAuditProduct from "./components/NotifySyncAuditProduct";
import NotifyOptimizeImage from "./components/OptimizeImage";
import NotifyReSyncImages from "./components/ReSyncImage";
import { useOptimizeImage } from "./hooks/useOptimizeImage";
import "./styles.scss";
import ToastNotificationEvent, {
    ToastEventHandle,
} from "./components/ToastAfterNotify";
import { useRef } from "react";
import NotifyScanSpeed from "./components/NotifyScanSpeed";

const NotificationApp: React.FC = () => {
    const customer = useAppSelector(customerData);

    const { channel } = usePusher({
        StrChannel: `${PusherGeneral.channel + customer?.id}`,
    });

    const { isShowProcessSyncImage } = useOptimizeImage();

    const refToastNotify = useRef<ToastEventHandle>(null);

    if (customer?.app_lock) return <></>;

    return (
        <>
            <section className="notification-app">
                <NotifyScanSpeed channel={channel} />
                <NotifyOptimizeTheme channel={channel} />
                <NotifySEO channel={channel} />
                <NotifyBulkAltImgMetaTag channel={channel} />
                <NotifySyncAuditProduct channel={channel} />
                <NotifyReSyncImages
                    channel={channel}
                    isShowProcessSyncImage={isShowProcessSyncImage}
                    refToast={refToastNotify}
                />
                <NotifyOptimizeImage
                    channel={channel}
                    refToast={refToastNotify}
                />
            </section>
            <ToastNotificationEvent ref={refToastNotify} />
        </>
    );
};

export default NotificationApp;
