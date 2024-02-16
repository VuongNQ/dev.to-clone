import { Button } from "@shopify/polaris";
import iconCheckPlan from "@swift/assets/svg/modal/icon-check-plan.svg";
import iconWarning from "@swift/assets/svg/modal/warning.svg";
import ModalBaseInfo from "@swift/components/UIs/ModalBase/ModalBaseInfo";
import { useAppDispatch, useAppSelector } from "@swift/hooks";
import { useDisclosure } from "@swift/hooks/useDisclosure";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import usePlanPricing from "@swift/hooks/usePlanPricing";
import { customerData, getPricingStore, globalActions } from "@swift/store/global";
import { ModalBaseInfoType } from "@swift/types/general";
import {
  IPayloadChargePlan,
  IntervalPricingType,
  PlanType,
} from "@swift/types/planPricing";
import { isExistInArray } from "@swift/utils/arrayFunc";
import { memo, useCallback, useMemo, useState } from "react";
import iconSwitchPlan from "../../assets/switch-plan.svg";
import { useFuncPricing } from "../../hooks/useFuncPricing";
import ModalPromotionForm from "../ModalPromotionForm";

const Promotion = memo(function _({
  pricePlan,
  planName,
  methodCharge,
  sizeButton = "medium",
  isHighligh,
  urlCharge,
}: PromotionType) {

  const dispatch = useAppDispatch()
  
  const customer = useAppSelector(customerData);

  const { onRedirectRemoteCurrentTabs } = useFuncRedirect();

  const pricingStore = useAppSelector(getPricingStore);

  const { handleChargePlan } = usePlanPricing({});

  const {
    titleCurrentPlan,
    titleGetStarted,
    titleSwitchMonthly,
    titleSwitchAnnual,
    titleTrialPlan,
    handleReturnContentModalConfirmDownPlan,
    handleReturnContentModalCheckPlan,
    handleReturnContentModalSwitchPlan,
  } = useFuncPricing();

  const {
    isOpen: isOpenModalForm,
    onOpen: onOpenModalForm,
    onClose: onCloseModalForm,
  } = useDisclosure({
    defaultIsOpen: false,
  });

  const {
    isOpen: isOpenModal,
    onClose: onCloseModal,
    onOpen: onOpenModal,
  } = useDisclosure({ defaultIsOpen: false });

  const [isLoadingShowModalForm] = useState(false);

  const [isLoadingCheckout, setIsLoadingCheckout] = useState<boolean>(false);

  const [modalPlan, setModalPlan] = useState<ModalBaseInfoType | null>(null);

  const methodChargeCurrent = useMemo(
    () => customer?.app_plan_interval || IntervalPricingType.monthly,
    [customer?.app_plan_interval]
  );

  const isConfirmDowPlan = useMemo(() => {
    const planCurrent =
      customer && customer.app_plan ? customer.app_plan : PlanType.free;

    if (planName === PlanType.free) return true;

    if (planName === PlanType.basic) {
      return isExistInArray(planCurrent, LIST_DOWN_PLAN_BASIC);
    }
    if (planName === PlanType.premium) {
      return isExistInArray(planCurrent, LIST_DOWN_PLAN_PREMIUM);
    }

    if (planName === PlanType.premium_plus) {
      return isExistInArray(planCurrent, LIST_DOWN_PLAN_PREMIUM_PLUS);
    }

    return false;
  }, [customer?.app_plan, planName]);

  /** open modal check plan current user  */
  const onOpenModalCheckPlan = useCallback((planName: PlanType) => {
    const dataModal = handleReturnContentModalCheckPlan({
      planName: planName,
    });
    setModalPlan({
      ...dataModal,
      icon: iconCheckPlan,
      onPrimaryAction: onCloseModal,
    });

    onOpenModal();
  }, []);
  /**end open modal check plan current user  */

  /** charge free success */
  const handleChargePlanFreeSuccess = useCallback(() => {
    dispatch(
      globalActions.updateCustomer({
        app_plan: PlanType.free,
      })
    );
    onOpenModalCheckPlan(planName);
  }, [onOpenModalCheckPlan, planName]);
  /** charge free success */

  /* method use charge plan*/
  const handleCharge = useCallback(
    async ({
      interval,
      codeDiscount,
      planName,
    }: Pick<IPayloadChargePlan, "codeDiscount" | "interval" | "planName">) => {
      setIsLoadingCheckout(true);

      const isTrial =
        typeof pricingStore.trial_days === "number" &&
        pricingStore.trial_days > 0
          ? true
          : false;

      await handleChargePlan({
        codeDiscount,
        interval,
        isNoTrial: !isTrial,
        planName: planName,
        urlCharge: urlCharge,
        callbackCharged: () => {
          onCloseModalForm();
          onOpenModalCheckPlan(planName);
        },
        callbackRedirectCharge: (value) => {
          if (planName === PlanType.free) {
            handleChargePlanFreeSuccess();
          } else {
            onRedirectRemoteCurrentTabs(value);
          }
          onRedirectRemoteCurrentTabs(value);
        },
      });

      setIsLoadingCheckout(false);
    },
    [pricingStore.trial_days, urlCharge]
  );
  /* method use charge plan*/

  /** confirm down plan before charge */
  const onConFirmDownGradeOtherPlan = useCallback(() => {
    const dataModal = handleReturnContentModalConfirmDownPlan({
      planNameCharge: planName,
    });

    setModalPlan({
      ...dataModal,
      icon: iconWarning,
      onPrimaryAction: () => {
        /* charge for plan free*/
        if (planName === PlanType.free) {
          handleCharge({
            planName: PlanType.free,
            codeDiscount: "",
            interval: IntervalPricingType.forever,
          });
          return;
        }
        /*end charge for plan free*/
        onCloseModal();
        onOpenModalForm();
      },

      onSecondaryAction: onCloseModal,
    });

    onOpenModal();
  }, []);
  /** confirm down plan before charge */

  /** method use switch plan */
  const onConfirmSwitchPlan = useCallback(() => {
    const dataModal = handleReturnContentModalSwitchPlan({
      planName: planName,
      interval: methodCharge,
    });

    setModalPlan({
      ...dataModal,
      icon: iconSwitchPlan,
      onPrimaryAction: () => {
        onCloseModal();
        onOpenModalForm();
      },
    });

    onOpenModal();
  }, [planName, methodCharge]);
  /** method use switch plan */

  /** method open modal by case  */
  const onOpenModalPromotionForm = useCallback(() => {
    const planCurrent =
      customer && customer.app_plan ? customer.app_plan : PlanType.premium;

    if (isConfirmDowPlan) return onConFirmDownGradeOtherPlan();

    if (planName === planCurrent && methodCharge !== methodChargeCurrent) {
      onConfirmSwitchPlan();
      return;
    }

    onOpenModalForm();
  }, [
    customer?.app_plan,
    isConfirmDowPlan,
    planName,
    methodCharge,
    methodChargeCurrent,
  ]);
  /** method open modal by case  */

  /** user using plan current */
  const isPLanCurrent = useMemo((): boolean => {
    if (!customer) return true;

    if (planName === PlanType.free && planName === customer.app_plan)
      return true;

    if (planName === customer.app_plan && methodCharge === methodChargeCurrent)
      return true;

    return false;
  }, [customer?.app_plan, methodCharge, methodChargeCurrent]);
  /**end user using plan current */

  /** title button content charge */
  const contentTitleBtn = useMemo(() => {
    if (!customer) return titleGetStarted;

    if (planName === PlanType.free && planName === customer.app_plan)
      return titleCurrentPlan;

    if (planName === customer.app_plan && methodCharge === methodChargeCurrent)
      return titleCurrentPlan;

    // if (customer.app_plan !== planName && planName === PlanType.free) {
    //   return titleDowngrade;
    // }

    if (
      planName !== PlanType.free &&
      planName === customer.app_plan &&
      methodCharge !== methodChargeCurrent
    ) {
      if (methodChargeCurrent === IntervalPricingType.monthly)
        return titleSwitchAnnual;

      if (methodChargeCurrent === IntervalPricingType.annual)
        return titleSwitchMonthly;
    }

    if (
      typeof pricingStore.trial_days === "number" &&
      pricingStore.trial_days > 0
    )
      return titleTrialPlan;

    return titleGetStarted;
  }, [
    customer?.app_plan,
    planName,
    methodCharge,
    methodChargeCurrent,
    pricingStore.trial_days,
    titleGetStarted,
    titleCurrentPlan,
    titleSwitchAnnual,
    titleSwitchMonthly,
    titleTrialPlan,
    titleGetStarted,
  ]);
  /** title button content charge */

  return (
    <>
      <div className="flex flex-col items-stretch">
        <Button
          outline={isPLanCurrent && !isHighligh}
          size={sizeButton}
          onClick={onOpenModalPromotionForm}
          loading={isLoadingShowModalForm}
          disabled={isPLanCurrent}
          primary={!isPLanCurrent && isHighligh}
        >
          {contentTitleBtn}
        </Button>
      </div>

      <ModalPromotionForm
        isOpen={isOpenModalForm}
        onClose={onCloseModalForm}
        onChargePlan={({ code }) => {
          handleCharge({
            codeDiscount: code,
            interval: methodCharge,
            planName: planName,
          });
        }}
        pricePlan={pricePlan}
        interval={methodCharge}
        planName={planName}
        isLoadingCharge={isLoadingCheckout}
      />

      {/* modal notification*/}
      <ModalBaseInfo
        isOpenModal={isOpenModal}
        icon={modalPlan?.icon || ""}
        title_header={modalPlan?.title_header}
        des={modalPlan?.des}
        titlePrimaryAction={modalPlan?.titlePrimaryAction}
        onPrimaryAction={modalPlan?.onPrimaryAction}
        title={modalPlan?.title}
        titleSecondaryAction={modalPlan?.titleSecondaryAction}
        onSecondaryAction={onCloseModal}
        isDestructive={modalPlan?.isDestructive}
        onCloseAction={onCloseModal}
        isLoadingPrimaryAction={isLoadingCheckout}
      />
    </>
  );
});

interface PromotionType {
  pricePlan: number;
  planName: PlanType;
  methodCharge: IntervalPricingType;
  sizeButton?: "micro" | "slim" | "medium" | "large";
  isHighligh?: boolean;
  urlCharge: string;
}

const LIST_DOWN_PLAN_PREMIUM_PLUS = [PlanType.expert_care];
const LIST_DOWN_PLAN_PREMIUM = [PlanType.premium_plus, PlanType.expert_care];
const LIST_DOWN_PLAN_BASIC = [
  PlanType.expert_care,
  PlanType.premium,
  PlanType.premium_plus,
];

export default Promotion;
