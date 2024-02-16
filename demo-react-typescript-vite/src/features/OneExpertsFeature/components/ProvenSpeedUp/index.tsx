import { Text } from "@shopify/polaris";
import Parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import aliReview from "../../assets/ali-review.svg";
import noteTag from "../../assets/one-commerce-note-tag.svg";
import note from "../../assets/one-commerce-note.svg";
import provenAchievement from "../../assets/proven-achievement.svg";
import transcy from "../../assets/transcy.svg";
import "./styles.scss";
const ProvenSpeedUp = () => {
  const { t } = useTranslation();

  return (
    <div className="ProvenSpeedUpComponent flex sw__wp-box p-5">
      <div className="ProvenSpeedUpComponent__container-right">
        <div className="ProvenSpeedUpComponent__reviews">
          <div className="ProvenSpeedUpComponent__item-review ">
            <div className="ProvenSpeedUpComponent__app">
              <img loading="lazy" src={aliReview} alt="" />
              <Text alignment="start" as="span" variant="headingMd">
                AliReviews
              </Text>
            </div>
            <Text alignment="start" as="span" variant="heading2xl">
              10,000+
            </Text>
            <Text alignment="start" as="span" variant="bodySm" color="subdued">
              {t("one_expert_page.proven_component.text_positive")}
            </Text>
          </div>

          <div className="ProvenSpeedUpComponent__item-review ">
            <div className="ProvenSpeedUpComponent__app">
              <img loading="lazy" src={transcy} alt="" />
              <Text alignment="start" as="span" variant="headingMd">
                Transcy
              </Text>
            </div>
            <Text alignment="start" as="span" variant="heading2xl">
              4,300+
            </Text>
            <Text alignment="start" as="span" variant="bodySm" color="subdued">
              {t("one_expert_page.proven_component.text_positive")}
            </Text>
          </div>
        </div>

        <div className="ProvenSpeedUpComponent__reviews">
          <div className="ProvenSpeedUpComponent__item-review ">
            <div className="ProvenSpeedUpComponent__app">
              <img loading="lazy" src={note} alt="note" />
            </div>

            <Text alignment="start" as="span" variant="heading2xl">
              1,000,000+
            </Text>
            <Text alignment="start" as="span" variant="bodySm" color="subdued">
              {t("one_expert_page.proven_component.text_worldwide")}
            </Text>
          </div>

          <div className="ProvenSpeedUpComponent__item-review">
            <div className="ProvenSpeedUpComponent__app">
              <img loading="lazy" src={noteTag} alt="note Tag" />
            </div>
            <Text alignment="start" as="span" variant="heading2xl">
              7+
            </Text>
            <Text alignment="start" as="span" variant="bodySm" color="subdued">
              {t("one_expert_page.proven_component.text_years")}
            </Text>
          </div>
        </div>
      </div>
      <div className="ProvenSpeedUpComponent__container-left">
        <p className="OneExpertPage__topic">
          <Text alignment="start" as="span" variant="headingXs" color="subdued">
            {t("one_expert_page.proven_component.topic")}
          </Text>
        </p>

        <Text alignment="start" as="span" variant="headingXl">
          {t("one_expert_page.proven_component.title")}
        </Text>

        <Text alignment="start" as="p" variant="bodyMd" color="subdued">
          {Parse(t("one_expert_page.proven_component.des"))}
        </Text>

        <div className="ProvenSpeedUpComponent__list-achievement">
          <div className="ProvenSpeedUpComponent__achievement">
            <img src={provenAchievement} alt="" />
            <Text alignment="start" as="p" variant="bodyMd">
              {t("one_expert_page.proven_component.des_achieve1")}
            </Text>
          </div>
          <div className="ProvenSpeedUpComponent__achievement">
            <img src={provenAchievement} alt="" />
            <Text alignment="start" as="p" variant="bodyMd">
              {t("one_expert_page.proven_component.des_achieve2")}
            </Text>
          </div>
          <div className="ProvenSpeedUpComponent__achievement">
            <img src={provenAchievement} alt="" />
            <Text alignment="start" as="p" variant="bodyMd">
              {t("one_expert_page.proven_component.des_achieve3")}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProvenSpeedUp;
