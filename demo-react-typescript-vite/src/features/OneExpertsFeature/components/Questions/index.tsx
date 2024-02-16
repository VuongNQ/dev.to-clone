/* Packages */
import { Text } from "@shopify/polaris";
/* translation */
import { useTranslation } from "react-i18next";
/* Styles */
import Parse from "html-react-parser";
import CollapseExperts from "../CollapseExperts";
import "./styles.scss";
const Questions = () => {
  const { t } = useTranslation();

  const list_question = [
    {
      title: "one_expert_page.questions_component.list_question.0.title",
      content: "one_expert_page.questions_component.list_question.0.des",
    },
    {
      title: "one_expert_page.questions_component.list_question.1.title",
      content: "one_expert_page.questions_component.list_question.1.des",
    },
    {
      title: "one_expert_page.questions_component.list_question.2.title",
      content: "one_expert_page.questions_component.list_question.2.des",
    },
    {
      title: "one_expert_page.questions_component.list_question.3.title",
      content: "one_expert_page.questions_component.list_question.3.des",
    },
    {
      title: "one_expert_page.questions_component.list_question.4.title",
      content: "one_expert_page.questions_component.list_question.4.des",
    },
    {
      title: "one_expert_page.questions_component.list_question.5.title",
      content: "one_expert_page.questions_component.list_question.5.des",
    },
  ];

  return (
    <div className="QuestionsComponent">
      <p className="OneExpertPage__topic">
        <Text alignment="start" as="span" variant="headingXs" color="subdued">
          {t("one_expert_page.questions_component.topic")}
        </Text>
      </p>

      <Text alignment="start" as="span" variant="headingXl">
        {t("one_expert_page.questions_component.title")}
      </Text>
      <Text alignment="start" as="p" variant="bodyMd" color="subdued">
        {t("one_expert_page.questions_component.des")}
      </Text>

      <div className="QuestionsComponent__list pt-5">
        {list_question.map((item, index) => {
          return (
            <div className="QuestionsComponent__item" key={index}>
              <CollapseExperts title={t(item.title)}>
                <Text as="p" variant="bodyMd" color="subdued">
                  {Parse(t(item.content))}
                </Text>
              </CollapseExperts>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Questions;
