import { Badge, Button, SkeletonBodyText, SkeletonDisplayText, Text } from "@shopify/polaris";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import { queryKeys } from "@swift/queryKeys";
import { useExtensionService } from "@swift/services/extensionApi";
import { BlockExtentionApp } from "@swift/types/general";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

function StatusActiveExtensionApp({ extension }: IPropsStatusActiveExtensionApp) {
    const { t } = useTranslation();

    const { getStatusExtension } = useExtensionService();

    const { onRedirectAppExtension } = useFuncRedirect();

    const { data: isActiveSEO, isLoading: isLoadingActiveSEO } = useQuery({
        ...queryKeys.extensionQueryKey.getStatusExtensionSEO(),
        enabled: extension === "seo",
        refetchOnWindowFocus: true,
        queryFn: async () => {
            const { status } = await getStatusExtension("seo");
            return status;
        },
    });

    const { data: isActiveSpeed, isLoading: isLoadingActiveSpeed } = useQuery({
        ...queryKeys.extensionQueryKey.getStatusExtensionSpeed(),
        enabled: extension === "speed",
        refetchOnWindowFocus: true,
        queryFn: async () => {
            const { status } = await getStatusExtension("speed");
            return status;
        },
    });

    const statusBadge = useMemo(() => {
        if (extension === "seo")
            return <Badge>{isActiveSEO ? t("common.txt_turn_on") : t("common.txt_turn_off")}</Badge>;
        if (extension === "speed")
            return <Badge>{isActiveSpeed ? t("common.txt_turn_on") : t("common.txt_turn_off")}</Badge>;

        return <></>;
    }, [extension, isActiveSEO, isActiveSpeed, t]);

    const statusButton = useMemo(() => {
        if (extension === "seo")
            return (
                <Button size="slim" primary onClick={() => onRedirectAppExtension(BlockExtentionApp.swift_seo)}>
                    {t("common.btn_turn_on")}
                </Button>
            );

        if (extension === "speed")
            return (
                <Button size="slim" primary onClick={() => onRedirectAppExtension(BlockExtentionApp.swift_speed)}>
                    {t("common.btn_turn_on")}
                </Button>
            );

        return <></>;
    }, [extension, onRedirectAppExtension, t]);

    const ElmSkeleton = useMemo(
        () => (
            <div className="sw__wp-box p-5">
                <div className="flex items-start">
                    <div className="flex flex-1 flex-col gap-2">
                        <div className="flex gap-1 items-center">
                            <div style={{ width: "130px" }}>
                                <SkeletonDisplayText size="small" />
                            </div>
                            <div style={{ width: "50px" }}>
                                <SkeletonDisplayText size="small" />
                            </div>
                        </div>
                        <SkeletonBodyText />
                    </div>
                    <div style={{ width: "80px" }}>
                        <SkeletonDisplayText size="small" />
                    </div>
                </div>
            </div>
        ),
        []
    );

    if ((isLoadingActiveSEO && extension === "seo") || (isLoadingActiveSpeed && extension === "speed")) return ElmSkeleton;

    if (isActiveSpeed && extension === "speed") return <></>;
    if (isActiveSEO && extension === "seo") return <></>;

    return (
        <div className="sw__wp-box p-5">
            <div className="flex items-start">
                <div className="flex flex-1 flex-col gap-2">
                    <div className="flex gap-1 items-center">
                        <Text as="p" variant="headingMd">
                            {t("common.title_extension_app")}
                        </Text>
                        {statusBadge}
                    </div>
                    <Text as="p" variant="bodyMd">
                        {t("common.des_extension_app")}
                    </Text>
                </div>
                {statusButton}
            </div>
        </div>
    );
}

interface IPropsStatusActiveExtensionApp {
    extension: "seo" | "speed";
}

export default StatusActiveExtensionApp;
