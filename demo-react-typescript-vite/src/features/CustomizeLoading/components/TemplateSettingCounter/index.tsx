import InputSelect from "@swift/components/UIs/InputSelect";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { StyleCustomizeLoadingActiveContext } from "../../context/StyleCustomActiveContext";
import { CustomLoadingContext } from "../../context/ContextCustomLoading";
import InputColor from "../InputColor";
import {
  LIST_FONT_SIZE,
  LIST_FONT_STYLE,
  LIST_FONT_WEIGHT,
} from "../../constants";
import { Text } from "@shopify/polaris";

function TemplateSettingCounter() {
  const { t } = useTranslation();

  const { styleCustomizeLoadingActive } = useContext(
    StyleCustomizeLoadingActiveContext
  );

  const { dispatch } = useContext(CustomLoadingContext);

  /**change form Percentage*/
  const handleChangeFormPercentage = (key: string, value: string) => {
    const payload = {
      ...styleCustomizeLoadingActive,
      formPercentage: {
        ...styleCustomizeLoadingActive.formPercentage,
        [key]: value,
      },
    };

    dispatch({
      type: "update_style_setting",
      payload: { type: "template", templateActive: payload },
    });
  };

  return (
    <div className="flex flex-col gap-3 pt-3">
      <div className="flex justify-between items-center">
        <Text as="span" variant="bodyMd">
          {t("CustomizeLoading_page.common.color.lable")}
        </Text>
        <InputColor
          color={styleCustomizeLoadingActive.formPercentage.color}
          setColor={(value) => {
            handleChangeFormPercentage("color", value);
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Text as="span" variant="bodyMd">
          {t(
            "CustomizeLoading_page.template_customizeLoading.tabs_text.features.1.lable"
          )}
        </Text>
        <InputSelect
          options={LIST_FONT_STYLE}
          selected={[styleCustomizeLoadingActive.formPercentage.font]}
          setSelected={(value) => {
            handleChangeFormPercentage("font", value[0]);
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Text as="span" variant="bodyMd">
          {t("CustomizeLoading_page.common.size.lable")}
        </Text>
        <InputSelect
          options={LIST_FONT_SIZE}
          selected={[styleCustomizeLoadingActive.formPercentage.size]}
          setSelected={(value) => {
            handleChangeFormPercentage("size", value[0]);
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Text as="span" variant="bodyMd">
          {t(
            "CustomizeLoading_page.template_customizeLoading.tabs_text.features.2.lable"
          )}
        </Text>
        <InputSelect
          options={LIST_FONT_WEIGHT}
          selected={[styleCustomizeLoadingActive.formPercentage.fontWeight]}
          setSelected={(value) => {
            handleChangeFormPercentage("fontWeight", value[0]);
          }}
        />
      </div>
    </div>
  );
}

export default TemplateSettingCounter;
