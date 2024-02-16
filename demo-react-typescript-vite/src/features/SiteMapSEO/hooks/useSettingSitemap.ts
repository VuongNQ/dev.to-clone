import iconModalWarning from "@swift/assets/svg/modal/warning.svg";
import { MESSAGE_PLAN_NOT_USE } from "@swift/constants/general";
import useCrispChat from "@swift/hooks/useCrispChat";
import { useDisclosure } from "@swift/hooks/useDisclosure";
import { useModalGeneral } from "@swift/hooks/useModalGeneral";
import {
  IDataSitemap,
  IKeyStatusConnectSitemap,
} from "@swift/types/advancedSEO";
import { ModalBaseInfoType } from "@swift/types/general";
import { PlanType } from "@swift/types/planPricing";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

export function useSettingSitemap() {
  const { onContactSupport } = useCrispChat();

  const { returnModalCheckPlan } = useModalGeneral();

  const { t } = useTranslation();

  const [modalSetting, setModalSetting] = useState<ModalBaseInfoType | null>(
    null
  );

  const returnModalDisconnect = useCallback((): ModalBaseInfoType => {
    return {
      title_header: t("modal.sitemap.disconnect.title_header"),
      des: t("modal.sitemap.disconnect.des"),
      isDestructive: true,
      icon: iconModalWarning,
      titlePrimaryAction: t("common.btn_disconnect"),
      titleSecondaryAction: t("common.btn_cancel"),
    };
  }, [t]);

  const returnModalError = useCallback(
    (payload: ModalBaseInfoType): ModalBaseInfoType => {
      return {
        title_header: payload.title_header,
        des: payload.des,
        errorID: payload.errorID,
        icon: iconModalWarning,
        titlePrimaryAction: t("common.btn_contact"),
        titleSecondaryAction: t("common.btn_cancel"),
      };
    },
    [t]
  );

  const {
    isOpen: isOpenModal,
    onClose: onCloseModal,
    onOpen: onOpenModal,
  } = useDisclosure({ defaultIsOpen: false });



  const OpenModalError = useCallback(
    (payload: ModalBaseInfoType) => {
      const contentModal = returnModalError(payload);
      setModalSetting({
        ...contentModal,
        onPrimaryAction: () => {
          onCloseModal();
          onContactSupport(
            "Hi, I'm having trouble using the sitemap function. Could you please help me fix this error?"
          );
        },
        onSecondaryAction: onCloseModal,
      });

      onOpenModal();
    },
    [onCloseModal, onContactSupport, onOpenModal, returnModalError]
  );

  const openModalCheckPlan = useCallback(
    (plan: PlanType) => {
      const contentModal = returnModalCheckPlan(plan);
      setModalSetting({
        ...contentModal,
        onPrimaryAction: onCloseModal,
      });
      onOpenModal();
    },
    [onCloseModal, onOpenModal, returnModalCheckPlan]
  );

  const handleActionStepError = useCallback(
    ({
      message,
      errorID,
      title_header,
      plan,
    }: { message?: string; plan: PlanType } & Pick<
      ModalBaseInfoType,
      "title_header" | "errorID"
    >) => {
      // check plan not use feature
      const isPlanNotUse =
        message &&
        message
          .toLocaleLowerCase()
          .includes(MESSAGE_PLAN_NOT_USE.toLocaleLowerCase())
          ? true
          : false;
      if (isPlanNotUse) return openModalCheckPlan(plan);
      // end check plan not use feature

      OpenModalError({
        title_header: title_header,
        des: message,
        errorID: errorID,
      });
    },
    [OpenModalError, openModalCheckPlan]
  );


  const handleReturnCountTaskComplete = useCallback(
    (infoSitemap: IDataSitemap) => {
      let numTaskComplete = 0;

      const { is_connected, is_submitted, is_verified, verified_site } =
        infoSitemap;
      if (is_connected === IKeyStatusConnectSitemap.connected) {
        numTaskComplete = numTaskComplete + 1;
      }
      if (is_submitted === IKeyStatusConnectSitemap.connected) {
        numTaskComplete = numTaskComplete + 1;
      }
      if (is_verified === IKeyStatusConnectSitemap.connected) {
        numTaskComplete = numTaskComplete + 1;
      }
      if (typeof verified_site === "string" && verified_site.length) {
        numTaskComplete = numTaskComplete + 1;
      }
      return numTaskComplete;
    },
    []
  );

  return {
    modalSetting,
    isOpenModal,
    setModalSetting,
    onOpenModal,
    onCloseModal,
    returnModalDisconnect,
    handleReturnCountTaskComplete,
    handleActionStepError,
    openModalCheckPlan
  };
}
