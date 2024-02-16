/*styles */
import { Button, Text } from "@shopify/polaris";
import { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CustomLoadingContext } from "../../context/ContextCustomLoading";

function ActiveLoadingScreen() {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(CustomLoadingContext);

  /**handle update state setting redux  */
  const handleChange = (key: string, value: string | number) => {
    const payload = {
      ...state.settings,
      [key]: value,
    };

    dispatch({
      type: "update_style_setting",
      payload: { type: "setting", settings: payload },
    });
  };

  const isActive = useMemo(
    () => (state.settings.active === 1 ? true : false),
    [state.settings.active]
  );

  return (
    <div className="ActiveLoadingScreen flex items-center gap-2">
      <div className="flex flex-1 flex-col gap-2">
        <Text as="h3" variant="headingMd">
          {t("CustomizeLoading_page.title")}
        </Text>
        <Text as="p" variant="bodyMd" color="subdued">
          {t("CustomizeLoading_page.des")}
        </Text>
      </div>

      <div style={{ color: "#D82C0D" }}>
        <Button
          primary={!isActive}
          size="slim"
          outline={isActive}
          monochrome
          onClick={() => {
            handleChange("active", !state.settings.active ? 1 : 0);
          }}
        >
          {!isActive
            ? t("CustomizeLoading_page.btn_active")
            : t("CustomizeLoading_page.btn_de_active")}
        </Button>
      </div>
    </div>
  );
}

export default ActiveLoadingScreen;
