import { queryKeys } from "@swift/queryKeys";
import { PusherGeneral } from "@swift/types/pusher";

import { useQueryClient } from "@tanstack/react-query";
import { Channel } from "pusher-js";
import { useEffect } from "react";

const NotifyScanSpeed = ({ channel }: { channel: Channel }) => {
    const queryClient = useQueryClient();

    const handlePusher = () => {
        queryClient.invalidateQueries({
            queryKey: queryKeys.scanSpeedQueryKey.getScanLogsSpeed().queryKey,
        });
    };

    useEffect(() => {
        /** realtime scanend SEO */
        channel.bind(PusherGeneral.performance_scan, handlePusher);
        /** end realtime scanend SEO */
        return () => {
            channel.unbind(PusherGeneral.performance_scan, handlePusher);
        };
    }, []);

    return <></>;
};

export default NotifyScanSpeed;
