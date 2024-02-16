/* Packages */
import { Button, Page } from "@shopify/polaris";
import IconUninstall from "@swift/assets/svg/unInstall/icon-uninstall.svg";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import { queryKeys } from "@swift/queryKeys";
import { useGeneralAppService } from "@swift/services/generalAppApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import "./styles.scss";

const UninstallFeature = () => {
    const { t } = useTranslation();

    const queryClient = useQueryClient();

    const { callSetAppLock } = useGeneralAppService();

    const { onRedirectRemoteCurrentTabs, onRedirectApp } = useFuncRedirect();

    const { mutate: activeApp, isLoading } = useMutation({
        mutationFn: () => callSetAppLock(false),
        onSuccess(res) {
            const { status } = res;

            if (status) {
                queryClient.invalidateQueries({
                    queryKey: queryKeys.customer.detail().queryKey,
                });
                onRedirectApp("/");
            } else {
                onRedirectRemoteCurrentTabs(
                    "https://apps.shopify.com/swift?search_id=8458b92d-1a15-493b-8adb-c1d0495472f4"
                );
            }
        },
    });

    return (
        <Page>
            <div className="uninstall-page">
                <img src={IconUninstall} alt="" />
                <h2>{t("uninstall_page.title")}</h2>
                <p>{Parse(t("uninstall_page.des"))}</p>
                <Button onClick={activeApp} primary loading={isLoading}>
                    {t("uninstall_page.btn")}
                </Button>
            </div>
        </Page>
    );
};
export default UninstallFeature;
