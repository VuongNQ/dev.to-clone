import { ChoiceList } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { CustomLoadingContext } from "../../context/ContextCustomLoading";
import { StyleCustomizeLoadingActiveContext } from "../../context/StyleCustomActiveContext";
import InputColor from "../InputColor";
import UploadFileImage from "../UploadFileImage";
import { keyTypeBackground } from "../../type";

function BackgroundSetting() {
  const { t } = useTranslation();

  const { dispatch } = useContext(CustomLoadingContext);

  const { styleCustomizeLoadingActive } = useContext(
    StyleCustomizeLoadingActiveContext
  );

  const formBackground = styleCustomizeLoadingActive.background;

  /**change background color */
  const handleChangeColor = (value: string) => {
    const payload = {
      ...styleCustomizeLoadingActive,
      background: {
        ...formBackground,
        color: value,
      },
    };
    dispatch({
      type: "update_style_setting",
      payload: { type: "template", templateActive: payload },
    });
  };

  /**change background type*/
  const handleChangeBackgroundType = (value: string[]) => {
    const payload = {
      ...styleCustomizeLoadingActive,
      background: {
        ...formBackground,
        type: value[0] as keyTypeBackground,
      },
    };
    dispatch({
      type: "update_style_setting",
      payload: { type: "template", templateActive: payload },
    });
  };

  const handleChangeBackgroundImage = (file: string | null | File) => {
    if (file === null) {
      return;
    }

    const payload = {
      ...styleCustomizeLoadingActive,
      background: {
        ...formBackground,
        src: file,
      },
    };
    dispatch({
      type: "update_style_setting",
      payload: { type: "template", templateActive: payload },
    });
  };

  return (
    <div className="flex flex-col gap-3 px-3">
      <div className="flex justify-between items-center">
        <ChoiceList
          title=""
          choices={[
            {
              label: t(
                "CustomizeLoading_page.background_customizeLoading.features.0.lable"
              ),
              value: "color",
            },
          ]}
          selected={styleCustomizeLoadingActive.background.type as string[]}
          onChange={handleChangeBackgroundType}
        />
        <InputColor
          disabled={
            styleCustomizeLoadingActive.background.type === "image"
              ? true
              : false
          }
          color={
            styleCustomizeLoadingActive
              ? styleCustomizeLoadingActive.background.color
              : "#365698"
          }
          setColor={handleChangeColor}
        />
      </div>
      <div className="flex flex-col gap-3">
        <ChoiceList
          title=""
          choices={[
            {
              label: t(
                "CustomizeLoading_page.background_customizeLoading.features.1.lable"
              ),
              value: "image",
            },
          ]}
          selected={styleCustomizeLoadingActive.background.type as string[]}
          onChange={handleChangeBackgroundType}
        />
        <UploadFileImage
          disabled={
            styleCustomizeLoadingActive.background.type === "color" ||
            (styleCustomizeLoadingActive.background.src &&
              styleCustomizeLoadingActive.background.src !== "")
              ? true
              : false
          }
          image={styleCustomizeLoadingActive.background.src}
          setFile={handleChangeBackgroundImage}
        />
      </div>
    </div>
  );
}

export default BackgroundSetting;
