import { Text, TextField } from "@shopify/polaris";
import InputSelect from "@swift/components/UIs/InputSelect";
import { stripTags } from "@swift/utils/funcString";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    LIST_FONT_SIZE,
    LIST_FONT_STYLE,
    LIST_FONT_WEIGHT,
} from "../../constants";
import { CustomLoadingContext } from "../../context/ContextCustomLoading";
import { StyleCustomizeLoadingActiveContext } from "../../context/StyleCustomActiveContext";
import InputColor from "../InputColor";
import "./styles.scss";

function TemplateSettingText() {
  const { styleCustomizeLoadingActive } = useContext(
    StyleCustomizeLoadingActiveContext
  );

  const { dispatch } = useContext(CustomLoadingContext);

  const { t } = useTranslation();

  const [textLoading, setTextLoading] = useState(
    styleCustomizeLoadingActive
      ? styleCustomizeLoadingActive.formText.text
      : "Loading..."
  );

  //   useEffect(() => {
  //     if (state.isSave || state.isRefresh) {
  //       setTextLoading(
  //         styleCustomizeLoadingActive
  //           ? styleCustomizeLoadingActive.formText.text
  //           : ""
  //       );
  //       /**set value default when refresh = true */
  //       if (state.isRefresh) {
  //         dispatch({
  //           type: "update",
  //           payload: { isRefresh: false },
  //         });
  //       }
  //     }
  //   }, [state.isSave, state.isRefresh]);
  /**change text loading*/
  const handleChangeTextLoading = (value: string) => {
    const newString = stripTags(value);
    setTextLoading(value);
    handleChangeFormText("text", newString);
  };
  /**change form text*/
  const handleChangeFormText = (key: string, value: string) => {
    const payload = {
      ...styleCustomizeLoadingActive,
      formText: {
        ...styleCustomizeLoadingActive.formText,
        [key]: value,
      },
    };

    dispatch({
      type: "update_style_setting",
      payload: { type: "template", templateActive: payload },
    });
  };

  return (
    <div className="TemplateSettingText flex flex-col gap-3 pt-3">
      <TextField
        label={t(
          "CustomizeLoading_page.template_customizeLoading.tabs_text.features.0.lable"
        )}
        maxLength={30}
        value={textLoading}
        onChange={handleChangeTextLoading}
        autoComplete="off"
      />

      <div className="flex justify-between items-center">
        <Text as="span" variant="bodyMd">
          {t("CustomizeLoading_page.common.color.lable")}
        </Text>
        <InputColor
          color={styleCustomizeLoadingActive.formText.color}
          setColor={(value: string) => {
            handleChangeFormText("color", value);
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
          selected={[styleCustomizeLoadingActive.formText.font]}
          setSelected={(value) => {
            handleChangeFormText("font", value[0]);
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Text as="span" variant="bodyMd">
          {t("CustomizeLoading_page.common.size.lable")}
        </Text>
        <InputSelect
          options={LIST_FONT_SIZE}
          selected={[styleCustomizeLoadingActive.formText.size]}
          setSelected={(value) => {
            handleChangeFormText("size", value[0]);
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
          selected={[styleCustomizeLoadingActive.formText.fontWeight]}
          setSelected={(value) => {
            handleChangeFormText("fontWeight", value[0]);
          }}
        />
      </div>
    </div>
  );
}
export default TemplateSettingText;
