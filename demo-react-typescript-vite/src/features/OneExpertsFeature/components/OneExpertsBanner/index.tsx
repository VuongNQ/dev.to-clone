import { Button, ButtonGroup, Text } from "@shopify/polaris";

import { useTranslation } from "react-i18next";
import oneCommerceLogo from "../../assets/one-commerce-logo.svg";
import oneExpertsBanner from "../../assets/one-experts-banner.png";

import useCrispChat from "@swift/hooks/useCrispChat";
import "./styles.scss";
import { useCallback } from "react";

const OneExpertsBanner = ({
  openModalHireExpert,
}: {
  openModalHireExpert: () => void;
}) => {
  const { t } = useTranslation();

  const { onContactExperts } = useCrispChat();

  const onTalkToExpert = useCallback(() => {
    onContactExperts(
      "I'd like to get expert advice and a speed audit report for my store."
    );
  },[]);

  return (
    <div className="oneExperts">
      <div className="banner__content gap-5">
        <div className="content__wrapper">
          <img
            src={oneCommerceLogo}
            alt="one_commerce_logo"
            className="content__img"
          />

          <div className="banner-content__description flex flex-col gap-3">
            <Text as="h4" variant="headingXl">
              {t("one_expert_page.banner_component.title")}
            </Text>
            <Text as="p" variant="bodyMd" color="subdued">
              {t("one_expert_page.banner_component.des")}
            </Text>
          </div>
          <ButtonGroup>
            <Button onClick={openModalHireExpert}>
              {t("one_expert_page.common.btn_hire")}
            </Button>
            <Button primary onClick={onTalkToExpert}>
              {t("one_expert_page.common.btn_Talk_to")}
            </Button>
          </ButtonGroup>
        </div>

        <div className="oneExperts__img">
          <img src={oneExpertsBanner} alt="one_expert_banner" />
        </div>
      </div>
    </div>
  );
};

export default OneExpertsBanner;
