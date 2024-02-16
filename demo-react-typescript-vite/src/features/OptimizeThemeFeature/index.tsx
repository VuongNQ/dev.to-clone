import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { Banner, Text } from "@shopify/polaris";
import ModalSkipTrial, { ModalSkipTrialHandle } from "@swift/components/ModalSkipTrial";
import ModalBaseInfo from "@swift/components/UIs/ModalBase/ModalBaseInfo";
import useCrispChat from "@swift/hooks/useCrispChat";
import { useDisclosure } from "@swift/hooks/useDisclosure";
import useFuncOptimizeTheme from "@swift/hooks/useFuncOptimizeTheme";
import { queryKeys } from "@swift/queryKeys";
import { useOptimizeThemeService } from "@swift/services/optimizeThemeApi";
import { ModalBaseInfoType } from "@swift/types/general";
import { GetLogOptimzieFailedType, KeyOptimzie } from "@swift/types/optimizeTheme";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Parse from "html-react-parser";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import iconModalCopyThemeFail from "./assets/copy-theme-fail.svg";
import iconModalOptimizeFail from "./assets/optimize-fail.svg";
import ActionOptimizeTheme from "./components/ActionOptimizeTheme";
import AutoOptimizeTheme from "./components/AutoOptimizeTheme";
import ModalUpGrade from "./components/ModalUpGrade";
import PublishThemeOptimize from "./components/PublishThemeOptimize";
import TableActionOptimize from "./components/TableHistoryOptimize";
import { OptimizeThemeContext } from "./contexts/OptimizeThemeContext";
import useOptimizeTheme from "./hooks/useOptimizeTheme";
import usePlanPricing from "@swift/hooks/usePlanPricing";

const MESS_CHAT_OPTIMIZE_FAILED =
    "I'm having trouble optimizing my theme due to file errors. Can you please assist me in resolving this issue?";

function OptimizeThemeFeature() {
    const { t } = useTranslation();

    const queryClient = useQueryClient();

    const { getLogOptimizeFailed, postRetryOptimizeFail } = useOptimizeThemeService();

    const { handleReturnStepFound } = useFuncOptimizeTheme();

    const refModalSkipTrial = useRef<ModalSkipTrialHandle>(null);

    const app = useAppBridge();

    const redirect = Redirect.create(app);

    const { onContactSupport } = useCrispChat();

    const { isSkipTrial } = usePlanPricing({});

    const {
        isAcceptUseOptimizeTheme,
        isLimitTheme,
        dataOptimize,
        dataProgress,
        isHasStepRunning,
        stepRunning,
        setStepRunning,
    } = useOptimizeTheme();

    const { isOpen: isOpenModal, onClose: onCloseModal, onOpen: onOpenModal } = useDisclosure({ defaultIsOpen: false });

    const [modalSetting, setModalSetting] = useState<ModalBaseInfoType | null>(null);

    const isHaveStepFailed = useMemo(
        () => (dataProgress && dataProgress.stepFailed.length ? true : false),
        [dataProgress?.stepFailed]
    );

    /** call every have  step optimize fail */
    useQuery({
        ...queryKeys.optimizeTheme.getLogOptimizeFailed(),
        enabled: isHaveStepFailed && isAcceptUseOptimizeTheme,
        queryFn: async () => {
            const { status, data } = await getLogOptimizeFailed();

            if (status && data) {
                handleDataLogFailed({ dataLog: data });
            }
            return null;
        },
    });
    /** call every have  step optimize fail */

    const { mutate: onRetryOptimizeFail, isLoading: isLoadingRetryOptimizeFail } = useMutation({
        mutationFn: async (stepOptimize: KeyOptimzie) => {
            return await postRetryOptimizeFail(stepOptimize);
        },
        onSuccess: (res) => {
            const { status } = res;
            if (status) {
                queryClient.invalidateQueries({
                    queryKey: queryKeys.optimizeTheme.getDetailOptimize().queryKey,
                });
                onCloseModal();
            }
        },
    });

    const onRedirectManagerTheme = useCallback(() => {
        redirect.dispatch(Redirect.Action.ADMIN_PATH, {
            path: "/themes",
            newContext: true,
        });
    }, [redirect]);

    /** handle return description modal fail */
    const handleReturnDescriptionModal = useCallback(
        ({
            listFileError,
            stepFail,
            titleStepFailed,
        }: {
            listFileError?: string[];
            stepFail: "" | KeyOptimzie;
            titleStepFailed: string;
        }) => {
            let desElement: string | JSX.Element = "";

            if (listFileError && listFileError.length) {
                desElement = listFileError.join(", ");
            }

            const desContent =
                stepFail === KeyOptimzie.duplicate
                    ? t("optimize_theme.modal_copy_failed.des", {
                          fileName: desElement,
                      })
                    : t("optimize_theme.modal_optimize_fail.des", {
                          nameStep: titleStepFailed,
                          fileName: desElement,
                      });

            return desContent;
        },
        [t]
    );

    /** handle return description modal fail */

    /** receive and handle DataLogFailed  */
    const handleOpenModalOptimizeFailed = useCallback(
        (arrFileError: string[]) => {
            const stepFailed = dataProgress ? dataProgress.stepFailed : "";
            const stepTryAgain =
                stepFailed === KeyOptimzie.duplicate
                    ? dataProgress
                        ? dataProgress.stepOptimizing
                        : KeyOptimzie["preload-fonts"]
                    : stepFailed;

            if (!stepFailed) return;
            const findStep = handleReturnStepFound(stepFailed);

            if (!findStep && stepFailed !== KeyOptimzie.duplicate) return;

            const iconModal = stepFailed === KeyOptimzie.duplicate ? iconModalCopyThemeFail : iconModalOptimizeFail;

            const titleHeader =
                stepFailed === KeyOptimzie.duplicate
                    ? "optimize_theme.modal_copy_failed.title_header"
                    : t("optimize_theme.modal_optimize_fail.title_header", {
                          nameStep: findStep?.title || "",
                      });

            let desElement = handleReturnDescriptionModal({
                listFileError: arrFileError,
                stepFail: stepFailed,
                titleStepFailed: findStep?.title || "",
            });

            if (stepFailed === KeyOptimzie.duplicate && !arrFileError.length) {
                desElement = t("optimize_theme.modal_copy_failed.des_server_trouble");
            }

            setModalSetting({
                title_header: titleHeader,
                des: Parse(desElement),
                icon: iconModal,
                titlePrimaryAction: "common.btn_contact",
                onPrimaryAction: () => {
                    onContactSupport(MESS_CHAT_OPTIMIZE_FAILED);
                    onCloseModal();
                },
                titleSecondaryAction: "common.btn_try_again",
                onSecondaryAction: () => {
                    onRetryOptimizeFail(stepTryAgain || KeyOptimzie["preload-fonts"]);
                },
            });
            onOpenModal();
        },
        [
            dataProgress,
            handleReturnDescriptionModal,
            handleReturnStepFound,
            onCloseModal,
            onContactSupport,
            onOpenModal,
            onRetryOptimizeFail,
            t,
        ]
    );

    const handleDataLogFailed = useCallback(
        ({ dataLog }: { dataLog: GetLogOptimzieFailedType[] }) => {
            let arrFileError: string[] = [];

            if (dataLog.length) {
                dataLog.slice(0, 5).forEach((item) => {
                    arrFileError = [...arrFileError, item.asset_key];
                });
            }

            handleOpenModalOptimizeFailed(arrFileError);
        },
        [handleOpenModalOptimizeFailed]
    );
    /**end  receive and handle DataLogFailed */

    const eleWaringLimitTheme = useMemo(() => {
        if (!isLimitTheme || dataOptimize.isLoading || !isSkipTrial) return <></>;

        return (
            <div className="OptimizeTheme__warning">
                <Banner
                    title={t("optimize_theme.banner_limit_theme.title")}
                    action={{
                        content: t("optimize_theme.btn_manage"),
                        onAction: onRedirectManagerTheme,
                    }}
                    status="warning"
                >
                    <p>{t("optimize_theme.banner_limit_theme.des")}</p>
                </Banner>
            </div>
        );
    }, [isLimitTheme, dataOptimize.isLoading, isSkipTrial, t, onRedirectManagerTheme]);

    const eleUpgrade = useMemo(() => !isAcceptUseOptimizeTheme && <ModalUpGrade />, [isAcceptUseOptimizeTheme]);

    const eleBannerSkipTrial = useMemo(() => {
        if (!isAcceptUseOptimizeTheme || isSkipTrial || dataOptimize.isLoading) return <></>;

        return (
            <Banner
                action={{
                    content: t("common.btn_skip"),
                    onAction: () => {
                        refModalSkipTrial.current?.openModal();
                    },
                }}
                status="warning"
            >
                <p>{t("optimize_theme.banner_skip_trial.des")}</p>
            </Banner>
        );
    }, [isAcceptUseOptimizeTheme, isSkipTrial, dataOptimize.isLoading, t]);

    return (
        <div
            className="OptimizeTheme flex flex-col gap-5 p-5 position-r"
            style={{ height: `${isAcceptUseOptimizeTheme ? "auto" : "632px"}` }}
        >
            <OptimizeThemeContext.Provider
                value={{
                    stepRunning,
                    isAcceptUseOptimizeTheme,
                    isLimitTheme,
                    dataOptimize,
                    dataProgress,
                    isHasStepRunning,
                    setStepRunning,
                }}
            >
                <PublishThemeOptimize
                    setModalSetting={setModalSetting}
                    onCloseModal={onCloseModal}
                    onOpenModal={onOpenModal}
                />
                {eleUpgrade}
                <Text as="p" variant="bodyMd" color="subdued">
                    {t("optimize_theme.banner_warning_police.des")}
                </Text>

                {eleWaringLimitTheme}
                {eleBannerSkipTrial}
                {/* {eleBannerThemeChange} */}

                <AutoOptimizeTheme
                    setModalSetting={setModalSetting}
                    onCloseModal={onCloseModal}
                    onOpenModal={onOpenModal}
                />

                <ActionOptimizeTheme
                    setModalSetting={setModalSetting}
                    onCloseModal={onCloseModal}
                    onOpenModal={onOpenModal}
                />

                <TableActionOptimize />
            </OptimizeThemeContext.Provider>

            <ModalSkipTrial ref={refModalSkipTrial} />

            <ModalBaseInfo
                isOpenModal={isOpenModal}
                icon={modalSetting?.icon || ""}
                title_header={t(modalSetting?.title_header || "")}
                titleHidden={modalSetting?.titleHidden}
                title={typeof modalSetting?.title === "string" ? t(modalSetting?.title || "") : modalSetting?.title}
                des={typeof modalSetting?.des === "string" ? t(modalSetting?.des) : modalSetting?.des}
                desKey={modalSetting?.desKey || ""}
                titlePrimaryAction={t(modalSetting?.titlePrimaryAction || "")}
                onPrimaryAction={modalSetting?.onPrimaryAction}
                titleSecondaryAction={t(modalSetting?.titleSecondaryAction || "")}
                onSecondaryAction={modalSetting?.onSecondaryAction ? modalSetting.onSecondaryAction : onCloseModal}
                isDestructive={modalSetting?.isDestructive}
                onCloseAction={onCloseModal}
                isLoadingSecondaryAction={isLoadingRetryOptimizeFail}
            />
        </div>
    );
}

export default OptimizeThemeFeature;
