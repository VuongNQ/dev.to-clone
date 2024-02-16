import { useAppSelector } from "@swift/hooks";
import { queryKeys } from "@swift/queryKeys";
import { customerData } from "@swift/store/global";
import { PusherGeneral } from "@swift/types/pusher";

import { useQueryClient } from "@tanstack/react-query";
import { Channel } from "pusher-js";
import { useEffect } from "react";

const NotifySEO = ({ channel }: { channel: Channel }) => {
    const customer = useAppSelector(customerData);
    const queryClient = useQueryClient();

    const handlePusher = (data: { storeId: string; domainScan: string }) => {
        if (
            Number(data.storeId) === customer?.id &&
            data.domainScan !== customer?.shopify_domain
        ) {
            queryClient.invalidateQueries({
                queryKey:
                    queryKeys.basicSeo.getScanLogsCompetitorSEO().queryKey,
            });

            queryClient.invalidateQueries({
                queryKey: queryKeys.basicSeo.getScanLogsOverview().queryKey,
            });

            return;
        }
        queryClient.invalidateQueries({
            queryKey: queryKeys.basicSeo.getScanLogsStoreSEO().queryKey,
        });
    };

    useEffect(() => {
        /** realtime scanend SEO */
        channel.bind(PusherGeneral.eventScanSEO, handlePusher);
        /** end realtime scanend SEO */
        return () => {
            channel.unbind(PusherGeneral.eventScanSEO, handlePusher);
        };
    }, []);

    return <></>;
};

export default NotifySEO;
