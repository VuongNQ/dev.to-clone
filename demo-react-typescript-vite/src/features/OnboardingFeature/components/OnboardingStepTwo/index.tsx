import { Banner, Button, List, Text } from "@shopify/polaris";
import { useAppSelector } from "@swift/hooks";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import { customerData } from "@swift/store/global";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import iconStepTwo from "../../assets/icon-step-two.svg";
import Confetti from "react-confetti";
import "./styles.scss"

function OnboardingStepTwo({ onNextStep }: IPropsOnboardingStepTwo) {
  const { t } = useTranslation();

  const customer = useAppSelector(customerData);

  const { onRedirectRemoteNewTabs } = useFuncRedirect();

  const [isShowBanner, setIsShowBanner] = useState(true);

  const onPreviewStore = useCallback(() => {
    onNextStep();
    onRedirectRemoteNewTabs(`https://${customer?.domain}`);
  }, [customer?.domain]);

  const eleBanner = useMemo(
    () =>
      isShowBanner && (
        <Banner
          title={t("onboarding_page.step2_component.box_note.title")}
          status="warning"
          onDismiss={() => {
            setIsShowBanner(false);
          }}
        >
          <List type="number">
            <List.Item>
              {t("onboarding_page.step2_component.box_note.note1")}
            </List.Item>
            <List.Item>
              {t("onboarding_page.step2_component.box_note.note2")}
            </List.Item>
            <List.Item>
              {t("onboarding_page.step2_component.box_note.note3")}
            </List.Item>
          </List>
        </Banner>
      ),
    [isShowBanner, t]
  );

  return (
    <div className="OnboardingStepTwo flex flex-col gap-5">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={200}
        recycle={false}
      />
      <div className="flex flex-col gap-2">
        <Text alignment="center" as="h2" variant="heading2xl" color="success">
          {t("onboarding_page.step2_component.title")}
        </Text>
        <Text alignment="center" as="p" variant="bodyMd" color="subdued">
          {t("onboarding_page.step2_component.des")}
        </Text>
      </div>
      <div className="flex flex-col gap-5 items-center">
        <img src={iconStepTwo} alt="" />
        {eleBanner}
      </div>
      <div className="flex gap-2 justify-center">
        <Button
          size="large"
          outline={true}
          onClick={() => {
            onRedirectRemoteNewTabs(
              "https://help.onecommerce.io/article/6250148e9c7cf413cd74cc40"
            );
          }}
        >
          {t("onboarding_page.step2_component.btn_learn")}
        </Button>
        <Button primary size="large" onClick={onPreviewStore}>
          {t("onboarding_page.step2_component.btn_preview")}
        </Button>
      </div>
    </div>
  );
}
interface IPropsOnboardingStepTwo {
  onNextStep: () => void;
}
export default OnboardingStepTwo;
