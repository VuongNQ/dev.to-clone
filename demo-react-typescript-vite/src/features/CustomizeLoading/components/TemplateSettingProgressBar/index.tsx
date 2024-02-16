import { Checkbox, Text } from "@shopify/polaris";
import InputSelect from "@swift/components/UIs/InputSelect";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { StyleCustomizeLoadingActiveContext } from "../../context/StyleCustomActiveContext";
import { CustomLoadingContext } from "../../context/ContextCustomLoading";
import InputColor from "../InputColor";
import { LIST_POSITION, SIZES_BAR } from "../../constants";
import { useMemo } from "react";

function TemplateSettingProgressBar() {
  const { t } = useTranslation();

  const { styleCustomizeLoadingActive } = useContext(
    StyleCustomizeLoadingActiveContext
  );

  const { dispatch } = useContext(CustomLoadingContext);

  /**change form Progress Bar*/
  const handleChangeFormProgressBar = (
    key: string,
    value: string | boolean
  ) => {
    const payload = {
      ...styleCustomizeLoadingActive,
      formProgressBar: {
        ...styleCustomizeLoadingActive.formProgressBar,
        [key]: value,
      },
    };

    dispatch({
      type: "update_style_setting",
      payload: { type: "template", templateActive: payload },
    });
  };

  const isDisabled =
    styleCustomizeLoadingActive?.formProgressBar.position === "middle"
      ? false
      : true;

  const isIsUseStripeColor = useMemo(() => {
    let isActiveUseStripeColor = false;

    if (styleCustomizeLoadingActive) {
      const getIsUseStripeColor =
        styleCustomizeLoadingActive.formProgressBar.isUseStripeColor;

      isActiveUseStripeColor = getIsUseStripeColor;

      if (typeof getIsUseStripeColor === "boolean") {
        return isActiveUseStripeColor;
      }

      if (typeof getIsUseStripeColor === "string") {
        if (getIsUseStripeColor === "true") {
          isActiveUseStripeColor = true;
        } else {
          isActiveUseStripeColor = false;
        }
      }
    }

    return isActiveUseStripeColor;
  }, [styleCustomizeLoadingActive]);

  return (
    <div className="flex flex-col gap-3 pt-3">
      <div className="flex justify-between items-center">
        <Text as="span" variant="bodyMd">
          {t(
            "CustomizeLoading_page.template_customizeLoading.tabs_bar.features.0.lable"
          )}
        </Text>
        <InputColor
          color={styleCustomizeLoadingActive.formProgressBar.loadingColor}
          setColor={(value) => {
            handleChangeFormProgressBar("loadingColor", value);
          }}
        />
      </div>

      <div className="flex justify-between items-center">
        <Text as="span" variant="bodyMd">
          {t(
            "CustomizeLoading_page.template_customizeLoading.tabs_bar.features.1.lable"
          )}
        </Text>
        <InputColor
          color={styleCustomizeLoadingActive.formProgressBar.barColor}
          setColor={(value) => {
            handleChangeFormProgressBar("barColor", value);
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Text as="span" variant="bodyMd">
          {t(
            "CustomizeLoading_page.template_customizeLoading.tabs_bar.features.2.lable"
          )}
        </Text>
        <InputSelect
          options={LIST_POSITION}
          selected={[styleCustomizeLoadingActive.formProgressBar.position]}
          setSelected={(value) => {
            handleChangeFormProgressBar("position", value[0]);
          }}
        />
      </div>

      <div
        className="flex flex-col gap-1"
        style={{
          opacity: isDisabled ? "0.5" : "1",
        }}
      >
        <Text as="span" variant="bodyMd">
          {t("CustomizeLoading_page.common.size.lable")}
        </Text>
        <InputSelect
          disabled={isDisabled}
          options={SIZES_BAR}
          selected={[styleCustomizeLoadingActive.formProgressBar.size]}
          setSelected={(value) => {
            handleChangeFormProgressBar("size", value[0]);
          }}
        />
      </div>

      <div
        className="TemplateTabs__color-field"
        style={{
          opacity: isDisabled ? "0.5" : "1",
        }}
      >
        <Checkbox
          disabled={isDisabled}
          label={t(
            "CustomizeLoading_page.template_customizeLoading.tabs_bar.features.3.lable"
          )}
          checked={isIsUseStripeColor}
          onChange={(value) => {
            handleChangeFormProgressBar("isUseStripeColor", value);
          }}
        />
      </div>
      {isIsUseStripeColor && (
        <div
          className="flex justify-between items-center"
          style={{
            opacity: isDisabled ? "0.5" : "1",
          }}
        >
          <Text as="span" variant="bodyMd">
            {t(
              "CustomizeLoading_page.template_customizeLoading.tabs_bar.features.4.lable"
            )}
          </Text>
          <InputColor
            disabled={isDisabled}
            color={styleCustomizeLoadingActive.formProgressBar.stripeColor}
            setColor={(value) => {
              handleChangeFormProgressBar("stripeColor", value);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default TemplateSettingProgressBar;
