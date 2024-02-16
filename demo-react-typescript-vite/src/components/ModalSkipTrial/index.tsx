import iconCheckPlan from "@swift/assets/svg/modal/icon-success.svg";
import iconModalWarning from "@swift/assets/svg/modal/warning.svg";
import { PLAN_PRICING } from "@swift/constants/constantPlanPricing";
import { useAppSelector } from "@swift/hooks";
import { useDisclosure } from "@swift/hooks/useDisclosure";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import usePlanPricing from "@swift/hooks/usePlanPricing";
import { customerData } from "@swift/store/global";
import { ModalBaseInfoType } from "@swift/types/general";
import { IntervalPricingType, PlanType } from "@swift/types/planPricing";
import { forwardRef, memo, useCallback, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useSearchParams } from "react-router-dom";
import ModalBaseInfo from "../UIs/ModalBase/ModalBaseInfo";

export type ModalSkipTrialHandle = {
  openModal: () => void;
  closeModal: () => void;
}; 
const ModalSkipTrialRef = forwardRef<ModalSkipTrialHandle>(
  function ModalSkipTrialWithRef(_, ref) {
    const { t } = useTranslation();

    const customer = useAppSelector(customerData);

    const { onRedirectRemoteCurrentTabs } = useFuncRedirect();

    const location = useLocation();

    const [searchParams] = useSearchParams();

    const {  handleChargePlan, URL_ROOT_APP } = usePlanPricing({
      listPLanAllow: [
        PlanType.premium,
        PlanType.premium_plus,
        PlanType.expert_care,
      ],
    });

    const {
      isOpen: isOpenModalTrial,
      onClose: onCloseModalTrial,
      onOpen: onOpenModalTrial,
    } = useDisclosure({ defaultIsOpen: false });

    const [isLoadingSkipTrial, setIsLoadingSkipTrial] =
      useState<boolean>(false);

    /* handle charge skip trial */
    const onOpenModalSkipTrialSuccess = useCallback(() => {
      setModalPlan({
        title_header: t("modal.pricing.check_plan.title", {
          planName: t(PLAN_PRICING[customer?.app_plan || PlanType.free].title),
        }),
        icon: iconCheckPlan,
        des: "modal.pricing.check_plan.des",
        titlePrimaryAction: "common.btn_got_it",
        onPrimaryAction: onCloseModalTrial,
      });

      onOpenModalTrial();
    }, [customer?.app_plan, onCloseModalTrial, onOpenModalTrial, t]);

    const handleChargeSkipTrial = useCallback(async () => {
      setIsLoadingSkipTrial(true);
      const urlRedirect =
        location.pathname +
        (searchParams.has("tabs") ? `?tabs=${searchParams.get("tabs")}` : "");
      const urlRedirectApp = `${URL_ROOT_APP}${urlRedirect}`;

      await handleChargePlan({
        codeDiscount: "",
        interval: customer?.app_plan_interval || IntervalPricingType.monthly,
        isNoTrial: true,
        planName: customer?.app_plan || PlanType.free,
        urlCharge: urlRedirectApp,
        callbackCharged: onOpenModalSkipTrialSuccess,
        callbackRedirectCharge: (value) => {
          onRedirectRemoteCurrentTabs(value);
        },
      });

      setIsLoadingSkipTrial(false);
    }, [URL_ROOT_APP, customer?.app_plan, customer?.app_plan_interval, handleChargePlan, location.pathname, onOpenModalSkipTrialSuccess, onRedirectRemoteCurrentTabs, searchParams]);
    /*end handle charge skip trial */

    const [modalPlan, setModalPlan] = useState<ModalBaseInfoType | null>({
      title_header: t("modal.pricing.skip_trial.title_head", {
        planName: t(PLAN_PRICING[customer?.app_plan || PlanType.free].title),
      }),
      des: "modal.pricing.skip_trial.des",
      icon: iconModalWarning,
      titlePrimaryAction: "common.btn_skip",
      titleSecondaryAction: "common.btn_cancel",
      onPrimaryAction: handleChargeSkipTrial,
    });

    useImperativeHandle(ref, () => ({
      openModal() {
        onOpenModalTrial();
      },
      closeModal() {
        onCloseModalTrial();
      },
    }));

    return (
      <ModalBaseInfo
        isOpenModal={isOpenModalTrial}
        icon={modalPlan?.icon || ""}
        title_header={modalPlan?.title_header}
        des={ typeof modalPlan?.des === "string" ? t(modalPlan?.des) : modalPlan?.des}
        titlePrimaryAction={t(modalPlan?.titlePrimaryAction || "")}
        onPrimaryAction={modalPlan?.onPrimaryAction}
        titleSecondaryAction={t(modalPlan?.titleSecondaryAction || "")}
        onSecondaryAction={onCloseModalTrial}
        isDestructive={modalPlan?.isDestructive}
        onCloseAction={onCloseModalTrial}
        isLoadingPrimaryAction={isLoadingSkipTrial}
      />
    );
  }
);

const ModalSkipTrial = memo(ModalSkipTrialRef)

export default ModalSkipTrial;
