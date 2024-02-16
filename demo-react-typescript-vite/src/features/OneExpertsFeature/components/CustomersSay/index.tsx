import { Text } from "@shopify/polaris";
import avatart1 from "../../assets/av1.png";
import avatart2 from "../../assets/av2.png";
import avatart3 from "../../assets/av3.png";
import { useTranslation } from "react-i18next";
import "./styles.scss";

const CustomersSay = () => {
  const { t } = useTranslation();

  const DATA = [
    {
      avatar: avatart1,
      title: t("one_expert_page.customer_say_component.review_title1"),
      sub_title: t("one_expert_page.customer_say_component.review_sub_title1"),
      des: t("one_expert_page.customer_say_component.review_des1"),
      colorIcon: "CustomersSayComponent__footer--aqua",
    },
    {
      avatar: avatart2,
      title: t("one_expert_page.customer_say_component.review_title2"),
      sub_title: t("one_expert_page.customer_say_component.review_sub_title2"),
      des: t("one_expert_page.customer_say_component.review_des2"),
      colorIcon: "CustomersSayComponent__footer--yellow",
    },
    {
      avatar: avatart3,
      title: t("one_expert_page.customer_say_component.review_title3"),
      sub_title: t("one_expert_page.customer_say_component.review_sub_title3"),
      des: t("one_expert_page.customer_say_component.review_des3"),
      colorIcon: "CustomersSayComponent__footer--violet",
    },
  ];
  return (
    <div className="CustomersSayComponent">
      <Text alignment="start" as="h3" variant="headingXl">
        {t("one_expert_page.customer_say_component.title")}
      </Text>
      <ul className="CustomersSayComponent__list">
        {DATA.map((item) => (
          <li
            key={item.title}
            className="CustomersSayComponent__item flex flex-col gap-5"
          >
            <div className="CustomersSayComponent__top">
              <div className="CustomersSayComponent__avatar">
                <img loading="lazy" src={item.avatar} alt="Algot Larsson" />
              </div>
              <div className="CustomersSayComponent__title">
                <Text alignment="start" as="p" variant="bodyMd">
                  {item.title}
                </Text>
                <Text alignment="start" as="p" variant="bodySm" color="subdued">
                  {item.sub_title}
                </Text>
              </div>
            </div>
            <div className="flex-1">
              <Text alignment="start" as="p" variant="bodyMd">
                {item.des}
              </Text>
            </div>
            <div
              className={`CustomersSayComponent__footer text-right ${item.colorIcon}`}
            >
              {iconBranchMark}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const iconBranchMark = (
  <svg
    width="10"
    height="8"
    viewBox="0 0 10 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.80145 0.271484H2.42255L0.426453 7.51758H3.73505L4.80145 0.271484ZM9.61395 0.271484H7.23505L5.23895 7.51758H8.54755L9.61395 0.271484Z"
      fill="none"
    />
  </svg>
);
export default CustomersSay;
