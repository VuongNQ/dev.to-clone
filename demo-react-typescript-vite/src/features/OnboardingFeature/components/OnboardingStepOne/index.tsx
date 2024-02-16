import { Button, Text } from "@shopify/polaris";
import ModalBaseInfo from "@swift/components/UIs/ModalBase/ModalBaseInfo";
import ToggleSwitch from "@swift/components/UIs/ToggleSwitch";
import { PLAN_PRICING } from "@swift/constants/constantPlanPricing";
import { useAppDispatch, useAppSelector } from "@swift/hooks";
import { useDisclosure } from "@swift/hooks/useDisclosure";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import { useBoostHistoryService } from "@swift/services/boostHistoryApi";
import { customerData, globalActions } from "@swift/store/global";
import { PlanType } from "@swift/types/planPricing";
import { isExistInArray } from "@swift/utils/arrayFunc";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import iconStepOne from "../../assets/icon-step-one.svg";
import iconUpgrade from "../../assets/icon-upgrade.svg";
import { ACCEPT_PLANS_AUTO_SPEED } from "../../constant";
import Parse from "html-react-parser";
import "./styles.scss"

let timeOutBoostSpeed: NodeJS.Timeout | null = null;

function OnboardingStepOne({ onNextStep }: IPropsOnboardingStepOne) {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const customer = useAppSelector(customerData);

  const { putAutoBoostSpeed } = useBoostHistoryService();

  const { onRedirectApp } = useFuncRedirect();

  const {
    isOpen: isOpenModalPlan,
    onClose: onCloseModalPlan,
    onOpen: onOpenModalPlan,
  } = useDisclosure({ defaultIsOpen: false });

  const [isLoadingBoost, setIsLoadingBoost] = useState(false);

  const isAcceptPlanCurrent = useMemo(
    () =>
      isExistInArray(
        customer?.app_plan || PlanType.free,
        ACCEPT_PLANS_AUTO_SPEED
      ),
    [customer?.app_plan]
  );

  const { mutate: onChangeAutoBoostSpeed } = useMutation({
    mutationFn: async (isAuto: boolean) => {
      if (!isAcceptPlanCurrent) {
        onOpenModalPlan();
        return;
      }

      dispatch(
        globalActions.updateCustomer({
          is_auto_boost_speed: isAuto,
        })
      );
      const { status } = await putAutoBoostSpeed(isAuto);
      return {
        status,
        isAuto: isAuto,
      };
    },
    onSuccess: (res) => {
      if (!res) return;
      const { status, isAuto } = res;

      if (!status) {
        dispatch(
          globalActions.updateCustomer({
            is_auto_boost_speed: !isAuto,
          })
        );
      }
    },
  });

  const onBoostSpeed = useCallback(() => {
    setIsLoadingBoost(true);

    timeOutBoostSpeed = setTimeout(() => {
      onNextStep();
    }, 500);
  }, []);

  useEffect(() => {
    // user down plan free set is_auto_boost_speed = false
    if (!isAcceptPlanCurrent) {
      // putAutoBoostSpeed(false);
      dispatch(
        globalActions.updateCustomer({
          is_auto_boost_speed: false,
        })
      );
    }
    //end user down plan free set is_auto_boost_speed = false

    return () => {
      clearTimeout(timeOutBoostSpeed as NodeJS.Timeout);
      setIsLoadingBoost(false);
    };
  }, [isAcceptPlanCurrent]);

  const titleModal = useMemo(
    () =>
      Parse(
        `<div className="OnboardingStepOne__upgrade">${t(
          "onboarding_page.get_premium_plus.title",
          {
            plan_premium_plus: `<span>${t(
              PLAN_PRICING[PlanType.premium_plus].title
            )}</span>`,
            plan_expert_care: `<span>${t(
              PLAN_PRICING[PlanType.expert_care].title
            )}</span>`,
          }
        )}</div>`
      ),
    [t]
  );

  const eleUpgrade = useMemo(
    () =>
      !isAcceptPlanCurrent && (
        <div className="flex gap-1">
          <Text alignment="start" as="span" variant="bodyMd">
            {t("onboarding_page.step1_component.auto_boost.sub_des", {
              PlanPremiumPlus: t(PLAN_PRICING["premium_plus"].title),
              PlanExpertCare: t(PLAN_PRICING["expert_care"].title),
            })}
          </Text>

          <Button
            plain
            onClick={() => {
              onRedirectApp(`/pricing`);
            }}
          >
            {t("common.btn_upgrade")}
          </Button>
        </div>
      ),
    [isAcceptPlanCurrent, onRedirectApp, t]
  );

  return (
    <div className="OnboardingStepOne flex flex-col gap-5">
      <div className="flex flex-col gap-2">

        <Text alignment="center" as="p" variant="bodyMd" color="subdued">
          {t("onboarding_page.step1_component.des")}
        </Text>
      </div>
      <div className="flex flex-col gap-5 items-center">
        <img src={iconStepOne} alt="" />
        <Button
          primary
          loading={isLoadingBoost}
          size="large"
          onClick={onBoostSpeed}
        >
          {t("onboarding_page.step1_component.btn")}
        </Button>
        <div className="p-5 flex flex-col gap-3 items-center">
          <div className="flex gap-3">
            <Text alignment="start" as="h4" variant="headingMd">
              {t("onboarding_page.step1_component.auto_boost.title")}
            </Text>
            <ToggleSwitch
              isActive={customer?.is_auto_boost_speed || false}
              onChangeActive={() => {
                onChangeAutoBoostSpeed(!customer?.is_auto_boost_speed || false);
              }}
            />
          </div>
          <Text alignment="start" as="p" variant="bodyMd" color="subdued">
            {t("onboarding_page.step1_component.auto_boost.des")}
          </Text>
          {eleUpgrade}
        </div>
      </div>
      {/* modal warning */}
      <ModalBaseInfo
        isOpenModal={isOpenModalPlan}
        icon={iconUpgrade}
        title_header={t("onboarding_page.get_premium_plus.title_header")}
        title={titleModal}
        titlePrimaryAction={t("common.btn_more_feature")}
        onPrimaryAction={() => {
          onRedirectApp(`/pricing`);
        }}
        titleSecondaryAction={t("common.btn_cancel")}
        onSecondaryAction={onCloseModalPlan}
        onCloseAction={onCloseModalPlan}
      />
    </div>
  );
}
interface IPropsOnboardingStepOne {
  onNextStep: () => void;
}
export default OnboardingStepOne;
