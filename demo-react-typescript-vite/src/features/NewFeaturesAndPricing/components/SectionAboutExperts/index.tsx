import { Text } from "@shopify/polaris";
import { Trans, useTranslation } from "react-i18next";
import avatarExperts from "../../assets/avatar-experts.png";
import partners1 from "../../assets/partners-1.png";
import partners2 from "../../assets/partners-2.png";
import partners3 from "../../assets/partners-3.png";
import Parse from "html-react-parser";
import "./styles.scss";

function SectionAboutExperts() {
  const { t } = useTranslation();

  return (
    <div className="SectionAboutExperts p-5 flex flex-col gap-5 text-center">
      <Text as="h2" variant="heading2xl">
        {t("new_pricing_page.section_experts.title")}
      </Text>
      <div>
        <img src={avatarExperts} alt="" />
      </div>
      <div className="txt-underline">
        <Text as="p" variant="bodyLg">
          {t("new_pricing_page.section_experts.link")}
        </Text>
      </div>
      <Text as="p" variant="bodyMd" color="subdued">
        <Trans
          i18nKey={"new_pricing_page.section_experts.des"}
          components={{ break: <br /> }}
        />
      </Text>

      <Text as="h4" variant="headingMd" color="subdued">
        {Parse(
          t("new_pricing_page.section_experts.bub_des", {
            ele_user:
              "<span className='SectionAboutExperts__number'>100,000</span>",
          })
        )}
      </Text>

      <div className="flex gap-5 justify-center">
        <img src={partners1} alt="" />
        <img src={partners2} alt="" />
        <img src={partners3} alt="" />
      </div>
    </div>
  );
}

export default SectionAboutExperts;
