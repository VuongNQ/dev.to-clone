/* Packages */
import { Text } from "@shopify/polaris";

/* translation */
import { useTranslation } from "react-i18next";
import iconCheckup from "../../assets/icon-checkup.svg";
import iconGoodPrice from "../../assets/icon-good-price.svg";
import iconHelpful from "../../assets/icon-helpful.svg";
import iconLifetime from "../../assets/icon-lifetime.svg";
import iconNoCheat from "../../assets/icon-no-cheat.svg";
import iconQuantity from "../../assets/icon-quantity.svg";
import iconReliable from "../../assets/icon-reliable.svg";
import iconReport from "../../assets/icon-report.svg";
import iconSpeed from "../../assets/icon-speed.svg";
/* Styles */
import "./styles.scss";

const Experience = () => {
  const { t } = useTranslation();

  return (
    <div className="ExperienceComponent">
      <p className="OneExpertPage__topic">
        <Text alignment="start" as="span" variant="headingXs" color="subdued">
          {t("one_expert_page.experience_component.topic")}
        </Text>
      </p>

      <Text alignment="start" as="span" variant="headingXl">
        {t("one_expert_page.experience_component.title")}
      </Text>
      <Text alignment="start" as="p" variant="bodyMd" color="subdued">
        {t("one_expert_page.experience_component.des")}
      </Text>

      <div className="ExperienceComponent__list">
        <div className="ExperienceComponent__item ExperienceComponent__item--border-green">
          <div className="ExperienceComponent__top ExperienceComponent__top--bgr-green">
            <img src={iconReliable} alt="" />
            <Text alignment="start" as="span" variant="headingMd">
              {t("one_expert_page.experience_component.reliable_title")}
            </Text>
          </div>
          <div className="ExperienceComponent__container">
            <div className="ExperienceComponent__body">
              <div className="ExperienceComponent__subtitle">
                <img src={iconSpeed} alt="" />

                <Text alignment="start" as="span" variant="bodyMd">
                  {t(
                    "one_expert_page.experience_component.reliable_sub_title1"
                  )}
                </Text>
              </div>

              <Text alignment="start" as="p" variant="bodySm" color="subdued">
                {t("one_expert_page.experience_component.reliable_des1")}
              </Text>
            </div>
            <div className="ExperienceComponent__body">
              <div className="ExperienceComponent__subtitle">
                <img src={iconNoCheat} alt="" />

                <Text alignment="start" as="span" variant="bodyMd">
                  {t(
                    "one_expert_page.experience_component.reliable_sub_title2"
                  )}
                </Text>
              </div>

              <Text alignment="start" as="p" variant="bodySm" color="subdued">
                {t("one_expert_page.experience_component.reliable_des2")}
              </Text>
            </div>
          </div>
        </div>
        <div className="ExperienceComponent__item ExperienceComponent__item--border-green">
          <div className="ExperienceComponent__top ExperienceComponent__top--bgr-green">
            <img src={iconQuantity} alt="" />

            <Text alignment="start" as="span" variant="headingMd">
              {t("one_expert_page.experience_component.quality_title")}
            </Text>
          </div>
          <div className="ExperienceComponent__container">
            <div className="ExperienceComponent__body">
              <div className="ExperienceComponent__subtitle">
                <img src={iconGoodPrice} alt="" />

                <Text alignment="start" as="span" variant="bodyMd">
                  {t("one_expert_page.experience_component.quality_sub_title1")}
                </Text>
              </div>
              <Text alignment="start" as="p" variant="bodySm" color="subdued">
                {t("one_expert_page.experience_component.quality_des1")}
              </Text>
            </div>
            <div className="ExperienceComponent__body">
              <div className="ExperienceComponent__subtitle">
                <img src={iconReport} alt="" />
                <Text alignment="start" as="span" variant="bodyMd">
                  {t("one_expert_page.experience_component.quality_sub_title2")}
                </Text>
              </div>
              <Text alignment="start" as="p" variant="bodySm" color="subdued">
                {t("one_expert_page.experience_component.quality_des2")}
              </Text>
            </div>
          </div>
        </div>
        <div className="ExperienceComponent__item ExperienceComponent__item--border-green">
          <div className="ExperienceComponent__top ExperienceComponent__top--bgr-green">
            <img src={iconHelpful} alt="" />
            <Text alignment="start" as="span" variant="headingMd">
              {t("one_expert_page.experience_component.helpful_title")}
            </Text>
          </div>
          <div className="ExperienceComponent__container">
            <div className="ExperienceComponent__body">
              <div className="ExperienceComponent__subtitle">
                <img src={iconLifetime} alt="" />
                <Text alignment="start" as="span" variant="bodyMd">
                  {t("one_expert_page.experience_component.helpful_sub_title1")}
                </Text>
              </div>
              <Text alignment="start" as="p" variant="bodySm" color="subdued">
                {t("one_expert_page.experience_component.helpful_des1")}
              </Text>
            </div>
            <div className="ExperienceComponent__body">
              <div className="ExperienceComponent__subtitle">
                <img src={iconCheckup} alt="" />
                <Text alignment="start" as="span" variant="bodyMd">
                  {t("one_expert_page.experience_component.helpful_sub_title2")}
                </Text>
              </div>
              <Text alignment="start" as="p" variant="bodySm" color="subdued">
                {t("one_expert_page.experience_component.helpful_des2")}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
