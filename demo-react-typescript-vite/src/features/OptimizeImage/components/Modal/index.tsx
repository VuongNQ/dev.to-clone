import IconWarningSmall from "@swift/assets/svg/modal/warning-small.svg";
import ModalBaseInfo from "@swift/components/UIs/ModalBase/ModalBaseInfo";
import { useOptimizeImageService } from "@swift/services/optimizeImageApi";
import { useMutation } from "@tanstack/react-query";
import {
    forwardRef,
    useCallback,
    useContext,
    useImperativeHandle,
    useMemo,
    useState,
} from "react";
import { useTranslation } from "react-i18next";
import { OptimizeImageContext } from "../../context/optimizeImage";
import { IPropsModalWarning } from "../../type";
import { useNavigate } from "react-router-dom";

interface IModalOptimizeImageHandle {
    isActive: boolean;
    idItem?: number;
}

export type ModalOptimizeImageHandle = {
    setModal: ({ isActive, idItem }: IModalOptimizeImageHandle) => void;
};
export const ModalRestore = forwardRef<ModalOptimizeImageHandle>(
    function ModalRestoreWithRef(_, ref) {
        const { t } = useTranslation();

        const { callActionRestore } = useOptimizeImageService();

        const [isActive, setActive] = useState(false);

        const [idRestore, setIdRestore] = useState(0);

        const { listRestore, dispatchListRestoring } =
            useContext(OptimizeImageContext);

        const onRestore = useCallback(async () => {
            const isSingleRestore = idRestore > 0;
            const result = isSingleRestore
                ? callActionRestore([idRestore])
                : callActionRestore(listRestore);

            const { status, data } = await result;

            if (!status || data.invalid_ids.length) return;

            dispatchListRestoring({
                type: "add",
                itemId: isSingleRestore ? idRestore : listRestore,
            });
        }, [dispatchListRestoring, idRestore, listRestore, callActionRestore]);

        const { isLoading, mutate } = useMutation({
            mutationFn: onRestore,
            onSuccess(/* data, variables, context */) {
                setActive(false);
                setIdRestore(0);
            },
        });

        useImperativeHandle(ref, () => ({
            setModal({ isActive = false, idItem = 0 }) {
                setActive(isActive);
                setIdRestore(idItem);
            },
        }));

        return (
            <ModalBaseInfo
                isSmall
                isDestructive
                isOpenModal={isActive}
                titlePrimaryAction={t("optimize_image.restore.modal_approve")}
                title_header={t("optimize_image.restore.modal_title")}
                des={t("optimize_image.restore.modal_content_top")}
                titleSecondaryAction={t("common.btn_cancel")}
                isLoadingPrimaryAction={isLoading}
                icon={IconWarningSmall}
                onPrimaryAction={mutate}
                onCloseAction={() => setActive(false)}
                onSecondaryAction={() => setActive(false)}
            />
        );
    }
);

export const ModalWarningOptimization = forwardRef<
    ModalOptimizeImageHandle,
    IPropsModalWarning
>(function ModalRestoreWithRef({ type }: IPropsModalWarning, ref) {
    const { t } = useTranslation();

    const [isActive, setActive] = useState(false);

    const {
        refModalBuyMore,
        onActionOptimize,
        validateRequireSkipTrial,
        remainCountOptimize,
    } = useContext(OptimizeImageContext);

    const navigate = useNavigate();

    const { mutate: actionOptimize, isLoading } = useMutation({
        mutationFn: async (isOptimizeAll: boolean) => {
            await onActionOptimize(isOptimizeAll);
            setActive(false);
        },
    });

    const propsModal = useMemo(() => {
        const actionClose = {
            onSecondaryAction: () => setActive(false),
            onCloseAction: () => setActive(false),
        };

        const actionGetMore = () => {
            setActive(false);
            if (validateRequireSkipTrial())
                refModalBuyMore?.current?.setModal(true);
        };

        const propsLimited: { [key: string]: unknown } = {
            title_header: t("optimize_image.modal_warning.title"),
            des: `${t("optimize_image.modal_warning.content_top")} ${t(
                "optimize_image.modal_warning.content_bottom"
            )}`,
            titlePrimaryAction: t("common.btn_get_more"),
            isDisablePrimaryAction: isLoading,
            onPrimaryAction: actionGetMore,
            onCloseAction: () => setActive(false),
        };

        if (remainCountOptimize > 1) {
            propsLimited["titleSecondaryAction"] = t(
                "optimize_image.modal_warning.continue"
            );

            propsLimited["isLoadingSecondaryAction"] = isLoading;
        }

        const props = {
            upgrade: {
                title_header: t("common.btn_upgrade_plan"),
                desKey: "optimize_image.auto_optimize.modal_require_plan",
                titlePrimaryAction: t("common.btn_upgrade"),
                titleSecondaryAction: t("common.btn_cancel"),
                onPrimaryAction: () => navigate("/pricing"),
                ...actionClose,
            },
            limitedAll: {
                ...propsLimited,
                onSecondaryAction: () => actionOptimize(true),
            },
            limitedMulti: {
                ...propsLimited,
                onSecondaryAction: () => actionOptimize(false),
            },
            getMore: {
                title_header: t("optimize_image.modal_warning.get_more.title"),
                desKey: "optimize_image.modal_warning.get_more.content",
                titlePrimaryAction: t("common.btn_get_more"),
                titleSecondaryAction: t("common.btn_cancel"),
                onPrimaryAction: actionGetMore,
                ...actionClose,
            },
        };
        return props[type];
    }, [
        t,
        type,
        isLoading,
        refModalBuyMore,
        remainCountOptimize,
        navigate,
        actionOptimize,
        validateRequireSkipTrial,
    ]);

    useImperativeHandle(ref, () => ({
        setModal({ isActive = false }) {
            setActive(isActive);
        },
    }));

    return (
        <ModalBaseInfo
            {...propsModal}
            isOpenModal={isActive}
            icon={IconWarningSmall}
            onCloseAction={() => setActive(false)}
            isSmall
        />
    );
});
