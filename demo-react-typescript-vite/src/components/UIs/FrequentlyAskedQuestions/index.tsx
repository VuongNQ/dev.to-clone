import { Icon, Text } from "@shopify/polaris";
import { HintMajor } from "@shopify/polaris-icons";
import { memo } from "react";
import { Trans, useTranslation } from "react-i18next";
import "./styles.scss";
import IconQuestion from "@swift/assets/svg/general/icon-question.svg";
function FrequentlyAskedQuestionsMemo({
  listQuestion,
  title,
}: ListCollapseType) {
  const { t } = useTranslation();

  return (
    <div className="FrequentlyAskedQuestions ">
      <div className="FrequentlyAskedQuestions__title flex gap-3 items-center p-3">
        <span className="FrequentlyAskedQuestions__icon p-2">
          <Icon source={HintMajor} color="highlight" />
        </span>
        <Text as="h3" variant="headingMd">
          {title}
        </Text>
      </div>

      <div className="FrequentlyAskedQuestions__list flex flex-col gap-5 p-5">
        {listQuestion.map((item, index) => {
          return (
            <div
              className="FrequentlyAskedQuestions__item flex flex-col gap-2"
              key={index}
            >
              <div className="flex gap-2">
                <img src={IconQuestion} alt="" />
                <Text as="h4" variant="headingSm">
                {t(item.title)}
              </Text>
              </div>
              

              <Text as="p" variant="bodyMd" color="subdued">
                <Trans i18nKey={item.content} components={{ break: <br /> }} />
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface ListCollapseType {
  listQuestion: { title: string; content: string }[];
  title: string;
}

const FrequentlyAskedQuestions = memo(FrequentlyAskedQuestionsMemo);

export default FrequentlyAskedQuestions;
