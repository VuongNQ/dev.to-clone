import FrequentlyAskedQuestions from "@swift/components/UIs/FrequentlyAskedQuestions";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import { LIST_QUESTION_SITEMAP } from "./constants";
import GenerateSiteMapSEO from "./components/GenerateSiteMapSEO";
import SearchConsoleSiteMapSEO from "./components/SearchConsoleSiteMapSEO";

function TabsSiteMapSEO() {
  const { t } = useTranslation();

  return (
    <div className="TabsSiteMapSEO p-5 flex flex-col gap-5">
      <div className="TabsSiteMapSEO__box-section p-5 ">
        <GenerateSiteMapSEO />
      </div>

      <div className="TabsSiteMapSEO__box-section p-5 ">
        <SearchConsoleSiteMapSEO />
      </div>
      <FrequentlyAskedQuestions
        listQuestion={LIST_QUESTION_SITEMAP}
        title={t("boostSEO.title_question")}
      />
    </div>
  );
}

export default TabsSiteMapSEO;
