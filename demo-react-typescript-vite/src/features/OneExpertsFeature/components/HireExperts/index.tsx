import { Button, ButtonGroup, Text } from "@shopify/polaris";
import useCrispChat from "@swift/hooks/useCrispChat";
import Parse from "html-react-parser";
import { useTranslation } from "react-i18next";
import hireExperts from "../../assets/hire-experts.svg";
import "./styles.scss";

const HireExperts = ({
  openModalHireExpert,
}: {
  openModalHireExpert: () => void;
}) => {
  const { t } = useTranslation();

  const { onContactExperts } = useCrispChat();

  const ontalkToExpert = () => {
    onContactExperts(
      "I'd like to get expert advice and a speed audit report for my store."
    );
  };

  return (
    <div className="HireExpertsComponent">
      <div className="flex items-center gap-5">
        <img
          loading="lazy"
          src={hireExperts}
          alt=""
          className="HireExpertsComponent__image"
        />
        <div className="HireExpertsComponent__right">
          <div className="HireExpertsComponent__title pb-5">
            <Text as="h4" variant="headingXl">
              {Parse(t("one_expert_page.perfomance_component.title"))}
            </Text>
          </div>

          <ButtonGroup>
            <Button onClick={() => openModalHireExpert()}>
              {t("one_expert_page.common.btn_hire")}
            </Button>
            <Button primary onClick={ontalkToExpert}>
              {t("one_expert_page.common.btn_Talk_to")}
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default HireExperts;
