import { Banner, Button, Spinner, Text } from "@shopify/polaris";
import { DeleteMajor } from "@shopify/polaris-icons";
import iconModalSuccess from "@swift/assets/svg/modal/icon-success.svg";
import iconModalWarning from "@swift/assets/svg/modal/warning.svg";
import { useAppSelector } from "@swift/hooks";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import { queryKeys } from "@swift/queryKeys";
import { useOptimizeThemeService } from "@swift/services/optimizeThemeApi";
import { customerData } from "@swift/store/global";
import { ModalBaseInfoType } from "@swift/types/general";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import iconModalPublish from "../../assets/icon-publish.svg";
import { OptimizeThemeContext } from "../../contexts/OptimizeThemeContext";
import "./styles.scss";

function PublishThemeOptimize({
  setModalSetting,
  onOpenModal,
  onCloseModal,
}: IPopsPublishThemeOptimize) {
  const { t } = useTranslation();

  const { previewThemeOptimize, publishTheme, deleteTheme } =
    useOptimizeThemeService();

  const { onRedirectRemoteNewTabs } = useFuncRedirect();

  const queryClient = useQueryClient();

  const customer = useAppSelector(customerData);

  const { isAcceptUseOptimizeTheme, isHasStepRunning, dataOptimize } =
    useContext(OptimizeThemeContext);

  const [isPublishSuccess, setIsPublishSuccess] = useState<boolean>(false);

  const nameThemeOptimize = useMemo(
    () => dataOptimize?.data?.optimized_theme_name || "",
    [dataOptimize?.data?.optimized_theme_name]
  );

  const { mutate: onPreviewThemeOptimize, isLoading: isLoadingPreviewTheme } =
    useMutation({
      mutationFn: async () => {
        const id = dataOptimize?.data?.optimized_theme_id;
        if (!id) return null; // not have optimize theme
        return await previewThemeOptimize(id);
      },
      onSuccess: (res) => {
        if (!res) return;
        const { status, data } = res;

        if (status) {
          onRedirectRemoteNewTabs(data.url);
        }
      },
    });

  const { mutate: onPublishTheme, isLoading: isLoadingPublish } = useMutation({
    mutationFn: async () => {
      return await publishTheme();
    },
    onSuccess: (res) => {
      const { status, data } = res;

      if (status && data) {
        setIsPublishSuccess(true);
        onOpenModalPublishSuccess(data.name);
      }

      queryClient.invalidateQueries({
        queryKey: queryKeys.optimizeTheme.getDetailOptimize().queryKey,
      });
    },
  });

  const { mutate: onDeleteTheme, isLoading: isLoadingDeleteTheme } =
    useMutation({
      mutationFn: async () => {
        const id = dataOptimize?.data?.optimized_theme_id;
        if (!id) return null; // not have optimize theme
        return await deleteTheme(id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.optimizeTheme.getDetailOptimize().queryKey,
        });
      },
    });

  const onConFirmModalPublishTheme = useCallback(() => {
    setModalSetting({
      title_header: "optimize_theme.modal_publish.title_head",
      title: nameThemeOptimize || "",
      icon: iconModalPublish,
      desKey: "optimize_theme.modal_publish.des",
      titleSecondaryAction: "common.btn_cancel",
      titlePrimaryAction: "optimize_theme.btn_publish",
      onPrimaryAction: async () => {
        onCloseModal();
        onPublishTheme();
      },
    });

    onOpenModal();
  }, [onPublishTheme, nameThemeOptimize]);

  /** set modal success publish theme */
  const onOpenModalPublishSuccess = useCallback(
    (nameThemeOptimize: string) => {
      setModalSetting({
        title_header: "optimize_theme.modal_publish_success.title_head",
        title: nameThemeOptimize || "",
        des: "optimize_theme.modal_publish_success.des",
        icon: iconModalSuccess,
        titlePrimaryAction: "common.btn_got_it",
        // titleSecondaryAction: "common.btn_got_it",
        onPrimaryAction: () => {
          onCloseModal();
          // onRedirectRemoteNewTabs(`https://${customer?.domain}`);
        },
      });

      onOpenModal();
    },
    [setModalSetting]
  );

  const onConfirmDeleteTheme = useCallback(() => {
    setModalSetting({
      title_header: "optimize_theme.modal_delete_theme.title_head",
      desKey: "optimize_theme.modal_delete_theme.des",
      icon: iconModalWarning,
      titlePrimaryAction: "common.btn_delete",
      titleSecondaryAction: "common.btn_cancel",
      onPrimaryAction: () => {
        onCloseModal();
        onDeleteTheme();
      },
      isDestructive: true,
    });

    onOpenModal();
  }, [onDeleteTheme]);

  const isDisablePublishBtn = useMemo((): boolean => {
    if (
      !isAcceptUseOptimizeTheme ||
      isHasStepRunning ||
      dataOptimize?.isLoading ||
      isLoadingDeleteTheme
    )
      return true;

    return false;
  }, [
    isAcceptUseOptimizeTheme,
    isHasStepRunning,
    dataOptimize?.isLoading,
    isLoadingDeleteTheme,
  ]);

  const isDisableDeleteBtn = useMemo((): boolean => {
    if (
      !isAcceptUseOptimizeTheme ||
      dataOptimize?.isLoading ||
      isLoadingPublish ||
      isHasStepRunning
    )
      return true;

    return false;
  }, [
    isAcceptUseOptimizeTheme,
    dataOptimize?.isLoading,
    isLoadingPublish,
    isHasStepRunning,
  ]);

  const eleListBtnAction = useMemo(() => {
    if (!nameThemeOptimize || !nameThemeOptimize.length) return <></>;

    return (
      <div className="PublishedTheme__btn-action flex items-center gap-2 p-5">
        <div className="flex-1 txt-one-line">
          <Text as="h3" variant="headingMd">
            {nameThemeOptimize}
          </Text>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onPreviewThemeOptimize}
            loading={isLoadingPreviewTheme}
          >
            {t("optimize_theme.btn_preview")}
          </Button>
          <Button
            disabled={isDisablePublishBtn}
            primary
            onClick={onConFirmModalPublishTheme}
            loading={isLoadingPublish}
          >
            {t("optimize_theme.btn_publish_now")}
          </Button>

          <div style={{ color: "var(--p-icon-critical)" }}>
            <Button
              outline
              monochrome
              disabled={isDisableDeleteBtn}
              onClick={onConfirmDeleteTheme}
              loading={isLoadingDeleteTheme}
              icon={DeleteMajor}
            ></Button>
          </div>
        </div>
      </div>
    );
  }, [nameThemeOptimize, onPreviewThemeOptimize, isLoadingPreviewTheme, t, isDisablePublishBtn, onConFirmModalPublishTheme, isLoadingPublish, isDisableDeleteBtn, onConfirmDeleteTheme, isLoadingDeleteTheme]);

  const eleBannerLoadingPublish = useMemo(() => {
    if (!isLoadingPublish) return <></>;

    const TitleContent = (
      <span className="PublishedTheme__info">
        <span className="PublishedTheme__info-title">
          {t("optimize_theme.publish_theme.banner.title")}
        </span>
        <Spinner accessibilityLabel="Publish theme changes" size="small" />
      </span>
    ) as unknown as string;

    return (
      <Banner title={TitleContent} status="info">
        <Text as="p" variant="bodyMd">
          {t("optimize_theme.publish_theme.banner.des")}
        </Text>
      </Banner>
    );
  }, [t, isLoadingPublish]);

  const eleBannerPublishSuccess = useMemo(() => {
    if (!isPublishSuccess) return <></>;

    const btnView = (
      <Button
        onClick={() => {
          onRedirectRemoteNewTabs(`https://${customer?.domain}`);
        }}
        plain
      >
        {t("optimize_theme.btn_view_store")}
      </Button>
    );

    return (
      <Banner
        title={t("optimize_theme.publish_theme.banner_success.title")}
        status="success"
        onDismiss={() => {
          setIsPublishSuccess(false);
        }}
      >
        <p>
          {t("optimize_theme.publish_theme.banner_success.des")} {btnView}
        </p>
      </Banner>
    );
  }, [t, isPublishSuccess, onRedirectRemoteNewTabs]);

  return (
    <div className="flex flex-col gap-5">
      {eleListBtnAction}
      {eleBannerLoadingPublish}
      {eleBannerPublishSuccess}
    </div>
  );
}

interface IPopsPublishThemeOptimize {
  setModalSetting: (payload: ModalBaseInfoType) => void;
  onOpenModal: () => void;
  onCloseModal: () => void;
}
export default PublishThemeOptimize;
