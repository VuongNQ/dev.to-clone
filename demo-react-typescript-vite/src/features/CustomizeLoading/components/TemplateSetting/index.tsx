import TabsPolaris, {
  IRefTabsPolaris,
} from "@swift/components/UIs/TabsGeneral/TabsPolaris";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomLoadingContext } from "../../context/ContextCustomLoading";
import TemplateSettingCounter from "../TemplateSettingCounter";
import TemplateSettingCustomImage from "../TemplateSettingCustomImage";
import TemplateSettingIcon from "../TemplateSettingIcon";
import TemplateSettingProgressBar from "../TemplateSettingProgressBar";
import TemplateSettingStyleLoading from "../TemplateSettingStyleLoading";
import TemplateSettingText from "../TemplateSettingText";

const TAB_ICON_ACCEPT = ["simple_1", "simple_4"];
const TAB_TEXT_ACCEPT = ["simple_1", "simple_2", "simple_4"];
const TAB_BAR_ACCEPT = ["simple_2", "simple_3"];
const TAB_COUNTER_ACCEPT = ["simple_3", "simple_4"];
const TAB_CUSTOM_IMAGE_ACCEPT = ["simple_2", "simple_3"];

export default function TemplateSetting() {
  const { t } = useTranslation();

  const { state } = useContext(CustomLoadingContext);

  const refTabs = useRef<IRefTabsPolaris>(null);

  const LIST_SETTING = [
    {
      id: "Icon-1",
      content: t("CustomizeLoading_page.template_customizeLoading.list_tabs.0"),
      component: <TemplateSettingIcon />,
      theme: TAB_ICON_ACCEPT,
      tabs: "Icon",
    },
    {
      id: "Text-1",
      content: t("CustomizeLoading_page.template_customizeLoading.list_tabs.1"),
      component: <TemplateSettingText />,
      theme: TAB_TEXT_ACCEPT,
      tabs: "Text",
    },
    {
      id: "Bar-1",
      content: t("CustomizeLoading_page.template_customizeLoading.list_tabs.2"),
      component: <TemplateSettingProgressBar />,
      theme: TAB_BAR_ACCEPT,
      tabs: "Bar",
    },
    {
      id: "Counter-1",
      content: t("CustomizeLoading_page.template_customizeLoading.list_tabs.3"),
      component: <TemplateSettingCounter />,
      theme: TAB_COUNTER_ACCEPT,
      tabs: "Counter",
    },
    {
      id: "CustomImage-1",
      content: t("CustomizeLoading_page.template_customizeLoading.list_tabs.4"),
      component: <TemplateSettingCustomImage />,
      theme: TAB_CUSTOM_IMAGE_ACCEPT,
      tabs: "CustomImage",
    },
  ];

  const [listTemplateAccept, setListTemplateAccept] = useState(LIST_SETTING);

  useEffect(() => {
    if (!state.style) return;
    /**change list tab when template loading change  */
    const newList = LIST_SETTING.filter((item) =>
      item.theme.includes(state.style.template_active)
    );
    refTabs.current?.onResetTabs();
    setListTemplateAccept(newList);
   
  }, [state.style.template_active]);

  return (
    <div className="flex flex-col gap-3 px-3 pb-3">
      <TemplateSettingStyleLoading />

      <TabsPolaris
        paramsQuery=""
        urlRedirect={""}
        listTabs={listTemplateAccept}
        isUseSearchParams={false}
        isNotChangeTabs={state.isChangeData}
        ref={refTabs}
      />

      {/* <div className="TemplateSetting__tabs">
        <Tabs
          tabs={listTemplateAccept}
          selected={tabsSelected}
          onSelect={handleTabChange}
        ></Tabs>
        <Divider></Divider>
        {listTemplateAccept[tabsSelected].component}
      </div> */}
    </div>
  );
}
