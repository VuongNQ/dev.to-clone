import { Toast } from "@shopify/polaris";
import { forwardRef, useCallback, useState, useImperativeHandle } from "react";
import { useTranslation } from "react-i18next";
import { EStatusActiveToast } from "../../types";

export type ToastEventHandle = {
    setToast: (toastType: EStatusActiveToast) => void;
};

export const ToastNotificationEvent = forwardRef<ToastEventHandle>(
    function ModalBuyMoreWithRef(_, ref) {
        const { t } = useTranslation();

        const [activeToast, setActiveToast] = useState<EStatusActiveToast>(
            EStatusActiveToast.none
        );

        const toggleActiveToast = useCallback(
            (status: EStatusActiveToast) => setActiveToast(status),
            []
        );

        useImperativeHandle(ref, () => ({
            setToast(toastType) {
                setActiveToast(toastType);
            },
        }));

        return (
            <>
                {activeToast === EStatusActiveToast.isOptimize && (
                    <Toast
                        content={t("optimize_image.toast.optimize_success")}
                        onDismiss={() => {
                            toggleActiveToast(EStatusActiveToast.none);
                        }}
                    />
                )}
                {activeToast === EStatusActiveToast.isRestore && (
                    <Toast
                        content={t("optimize_image.toast.restore_success")}
                        onDismiss={() => {
                            toggleActiveToast(EStatusActiveToast.none);
                        }}
                    />
                )}
                {activeToast === EStatusActiveToast.isSyncImagesDone && (
                    <Toast
                        content={t("optimize_image.toast.sync_images")}
                        onDismiss={() => {
                            toggleActiveToast(EStatusActiveToast.none);
                        }}
                    />
                )}
            </>
        );
    }
);

export default ToastNotificationEvent;
