import { Card, Icon, Page, Text } from "@shopify/polaris";
import OnboardingStepOne from "./components/OnboardingStepOne";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import "./styles.scss";
import OnboardingStepTwo from "./components/OnboardingStepTwo";
import OnboardingStepThree from "./components/OnboardingStepThree";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import { customerData, globalActions } from "@swift/store/global";
import { EOnBoard } from "@swift/types/general";
import { useGeneralAppService } from "@swift/services/generalAppApi";
import { useAppDispatch, useAppSelector } from "@swift/hooks";
import { useBoostHistoryService } from "@swift/services/boostHistoryApi";
import { CircleTickMinor } from "@shopify/polaris-icons";
import { useSegmentService } from "@swift/services/segmentApi";
import { ESegmentOnboarding } from "@swift/types/segment";

const LIST_STEP = [
  {
    step: 1,
    title: "onboarding_page.common.step_start",
  },
  {
    step: 2,
    title: "onboarding_page.common.step_preview",
  },
  {
    step: 3,
    title: "onboarding_page.common.step_finish",
  },
];

function OnboardingFeature() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const customer = useAppSelector(customerData);

  const { putStoreDetail } = useGeneralAppService();

  const { postSpeedHistory } = useBoostHistoryService();

  const [stepOnBoarding, setStepOnBoarding] = useState<number>(1);

  const { onRedirectApp } = useFuncRedirect();

  const { postSegmentOnboarding } = useSegmentService();

  /** update onboarding_step = onBoarded if user install first time  */
  const handleUpdateOnboarding = useCallback(() => {
    if (!customer || customer?.onboarding_step !== EOnBoard.not_onboard) return;

    putStoreDetail({
      onboarding_step: EOnBoard.onBoarded,
    });

    dispatch(
      globalActions.updateCustomer({
        onboarding_step: EOnBoard.onBoarded,
      })
    );
  }, [customer?.onboarding_step]);
  /**end update onboarding_step = onBoarded if user install first time  */

  useEffect(() => {
    handleUpdateOnboarding();
  }, [customer?.onboarding_step]);

  useEffect(() => {
    postSegmentOnboarding(ESegmentOnboarding.tutor_started);
  }, []);

  const eleStepOnboarding = useMemo(() => {
    if (stepOnBoarding === 1) {
      return (
        <OnboardingStepOne
          onNextStep={() => {
            setStepOnBoarding(2);
          }}
        />
      );
    }
    if (stepOnBoarding === 2) {
      return (
        <OnboardingStepTwo
          onNextStep={() => {
            postSpeedHistory();
            setStepOnBoarding(3);
            postSegmentOnboarding(ESegmentOnboarding.tutor_completed);
          }}
        />
      );
    }
    if (stepOnBoarding === 3) {
      return (
        <OnboardingStepThree
          onNextStep={() => {
            onRedirectApp("/pricing");
          }}
        />
      );
    }

    return <></>
  }, [stepOnBoarding, onRedirectApp]);

  return (
    <Page>
      <div className=" flex flex-col items-center">
        <div className="OnboardingFeature__box-step flex justify-between w-100 position-r">
          <div className="OnboardingFeature__lines position-a flex w-100">
            <div
              className={`OnboardingFeature__line flex-1 ${
                stepOnBoarding >= 2 && "active"
              }`}
            ></div>
            <div
              className={`OnboardingFeature__line flex-1 ${
                stepOnBoarding >= 3 && "active"
              }`}
            ></div>
          </div>
          {LIST_STEP.map((item) => (
            <div
              key={`${item.title}`}
              className="OnboardingFeature__step px-1 py-5 flex flex-col gap-1"
            >
              <Icon
                source={CircleTickMinor}
                color={item.step <= stepOnBoarding ? "success" : "base"}
              />
              <Text as="span" variant="bodyMd">
                {t(item.title)}
              </Text>
            </div>
          ))}
        </div>
        {/* <div className="pt-5 px-5 pb-8">{eleStepOnboarding}</div> */}
        <div className="OnboardingFeature__body w-100 mb-5 mt-1">
          <Card>{eleStepOnboarding}</Card>
        </div>
        <div className="OnboardingFeature__copywriting py-2 px-4">
          <Text as="p" variant="bodySm" color="subdued">
            {t("onboarding_page.copywriting")}
          </Text>
        </div>
      </div>
    </Page>
  );
}

export default OnboardingFeature;
