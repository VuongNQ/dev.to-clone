import InputSelect from "@swift/components/UIs/InputSelect";
import { useTranslation } from "react-i18next";
import { useContext, useMemo } from "react";
import { StyleCustomizeLoadingActiveContext } from "../../context/StyleCustomActiveContext";
import { CustomLoadingContext } from "../../context/ContextCustomLoading";
import UploadFileImage from "../UploadFileImage";
import { LIST_ANIMATION, LIST_FONT_SIZE } from "../../constants";
import { Text } from "@shopify/polaris";

const DEFAULT_IMG = ["logo-sm.svg"];

function TemplateSettingCustomImage() {
  const { t } = useTranslation();

  const { styleCustomizeLoadingActive } = useContext(
    StyleCustomizeLoadingActiveContext
  );

  const { dispatch } = useContext(CustomLoadingContext);

  /**change form CustomImage*/
  const handleChangeFormCustomImage = (
    key: string,
    value: string | null | File
  ) => {
    if (key === "imgUrl" && value === null) {
      return;
    }

    const payload = {
      ...styleCustomizeLoadingActive,
      formCustomImage: {
        ...styleCustomizeLoadingActive.formCustomImage,
        [key]: value,
      },
    };

    dispatch({
      type: "update_style_setting",
      payload: { type: "template", templateActive: payload },
    });
  };

  const isDisabledChooseImage = useMemo((): boolean => {
    const newImgUrl = styleCustomizeLoadingActive.formCustomImage.imgUrl;

    if (!newImgUrl) return false;

    if (typeof newImgUrl === "object") return true;

    if (
      !DEFAULT_IMG[0].includes(typeof newImgUrl === "string" ? newImgUrl : "")
    ) {
      return true;
    }

    return false;
  }, [styleCustomizeLoadingActive.formCustomImage.imgUrl]);

  return (
    <div className="flex flex-col gap-3 pt-3">
      <div className="flex flex-col gap-1">
        <Text as="span" variant="bodyMd">
          {t(
            "CustomizeLoading_page.template_customizeLoading.tabs_customImage.features.0.lable"
          )}
        </Text>
        <UploadFileImage
          image={
            !DEFAULT_IMG.includes(
              typeof styleCustomizeLoadingActive.formCustomImage.imgUrl ===
                "string"
                ? styleCustomizeLoadingActive.formCustomImage.imgUrl
                : ""
            )
              ? styleCustomizeLoadingActive.formCustomImage.imgUrl
              : null
          }
          disabled={isDisabledChooseImage}
          setFile={(value: string | null | File) => {
            handleChangeFormCustomImage("imgUrl", value);
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Text as="span" variant="bodyMd">
          {t("CustomizeLoading_page.common.size.lable")}
        </Text>
        <InputSelect
          options={LIST_FONT_SIZE}
          selected={[styleCustomizeLoadingActive.formCustomImage.size]}
          setSelected={(value) => {
            handleChangeFormCustomImage("size", value[0]);
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <Text as="span" variant="bodyMd">
          {t(
            "CustomizeLoading_page.template_customizeLoading.tabs_customImage.features.1.lable"
          )}
        </Text>
        <InputSelect
          options={LIST_ANIMATION}
          selected={[styleCustomizeLoadingActive.formCustomImage.animation]}
          setSelected={(value) => {
            handleChangeFormCustomImage("animation", value[0]);
          }}
        />
      </div>
    </div>
  );
}

export default TemplateSettingCustomImage;
