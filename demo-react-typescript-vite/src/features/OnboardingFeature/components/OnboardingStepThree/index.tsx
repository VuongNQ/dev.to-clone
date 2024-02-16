import { Button, Text } from "@shopify/polaris";
import {
    SmileyJoyMajor,
    SmileyNeutralMajor
} from "@shopify/polaris-icons";
import ModalBaseInfo from "@swift/components/UIs/ModalBase/ModalBaseInfo";
import useCrispChat from "@swift/hooks/useCrispChat";
import { useDisclosure } from "@swift/hooks/useDisclosure";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import iconStepThree from "../../assets/icon-step-three.svg";
import iconModalNeedHelp from "../../assets/need-help.svg";
function OnboardingStepThree({ onNextStep }: IPropsOnboardingStepThree) {
  const { t } = useTranslation();

  const { onContactSupport } = useCrispChat();

  const { isOpen, onClose, onOpen } = useDisclosure({
    defaultIsOpen: false,
  });

  const onOpenChat = useCallback(() => {
    onContactSupport(
      "I have used Boost Speed tool and need further assistance to improve our speed performance."
    );
    onClose();
  }, [onContactSupport]);

  return (
    <div className="OnboardingStepOne flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Text alignment="center" as="h2" variant="heading2xl" color="success">
          {t("onboarding_page.step3_component.title")}
        </Text>
        <Text alignment="center" as="p" variant="bodyMd" color="subdued">
          {t("onboarding_page.step1_component.des")}
        </Text>
      </div>
      <div className="flex flex-col gap-5 items-center pb-5">
        <img src={iconStepThree} alt="" />
      </div>
      <Text alignment="center" as="p" variant="headingMd">
        {t("onboarding_page.step3_component.des")}
      </Text>
      <div className="flex gap-2 justify-center pt-5">
        <div style={{ color: "#007F5F" }}>
          <Button
            size="large"
            monochrome
            outline
            icon={SmileyJoyMajor}
            onClick={() => {
              onNextStep();
            }}
          >
            {t("onboarding_page.step3_component.btn_yes")}
          </Button>
        </div>
        <div style={{ color: "#B98900" }}>
          <Button
            monochrome
            outline
            onClick={onOpen}
            size="large"
            icon={SmileyNeutralMajor}
          >
            {t("onboarding_page.step3_component.btn_no")}
          </Button>
        </div>
      </div>
      <ModalBaseInfo
        isOpenModal={isOpen}
        title_header={t("onboarding_page.step3_component.modal.title_header")}
        title={t("onboarding_page.step3_component.modal.title")}
        icon={iconModalNeedHelp}
        des={t("onboarding_page.step3_component.modal.des")}
        titleSecondaryAction={t("common.btn_cancel")}
        onSecondaryAction={onClose}
        titlePrimaryAction={t(
          "onboarding_page.step3_component.modal.titlePrimaryAction"
        )}
        onPrimaryAction={onOpenChat}
        onCloseAction={onClose}
        isSmall
      />
    </div>
  );
}
interface IPropsOnboardingStepThree {
  onNextStep: () => void;
}
export default OnboardingStepThree;
