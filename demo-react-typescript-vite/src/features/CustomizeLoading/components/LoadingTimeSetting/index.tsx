import { useTranslation } from "react-i18next";
/**component */
import { useContext } from "react";
import { CustomLoadingContext } from "../../context/ContextCustomLoading";
import InputSelect from "@swift/components/UIs/InputSelect";
import {
  LIST_ANIMATION_PAGE,
  lIST_DELAY_TIME,
  lIST_DURATION_TIME,
} from "../../constants";
import { Text } from "@shopify/polaris";

const LoadingTimeSetting = () => {
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

  return (
    <div className="px-3 flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <p>
          {t(
            "CustomizeLoading_page.loadingTime_customizeLoading.features.0.lable"
          )}
        </p>
        <InputSelect
          options={lIST_DELAY_TIME}
          selected={[`${state.settings.delay_time}`]}
          setSelected={(value) => {
            handleChange("delay_time", Number(value[0]));
          }}
        />
        <Text as="p" variant="bodyMd" color="subdued">
          {t(
            "CustomizeLoading_page.loadingTime_customizeLoading.features.0.des"
          )}
        </Text>
      </div>

      <div className="flex flex-col gap-1">
        <p>
          {t(
            "CustomizeLoading_page.loadingTime_customizeLoading.features.1.lable"
          )}
        </p>
        <InputSelect
          options={LIST_ANIMATION_PAGE}
          selected={[state.settings.animation_style]}
          setSelected={(value) => {
            handleChange("animation_style", value[0]);
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <p>
          {t(
            "CustomizeLoading_page.loadingTime_customizeLoading.features.2.lable"
          )}
        </p>
        <InputSelect
          options={lIST_DURATION_TIME}
          selected={[`${state.settings.duration_time}`]}
          setSelected={(value) => {
            handleChange("duration_time", Number(value[0]));
          }}
        />
        <Text as="p" variant="bodyMd" color="subdued">
          {t(
            "CustomizeLoading_page.loadingTime_customizeLoading.features.2.des"
          )}
        </Text>
      </div>
    </div>
  );
};

export default LoadingTimeSetting;
