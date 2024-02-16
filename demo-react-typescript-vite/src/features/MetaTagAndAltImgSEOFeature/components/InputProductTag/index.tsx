import { Button, Text, TextField } from "@shopify/polaris";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { ProductTag } from "@swift/types/boostSEO";

function InputProductTag({
  listProductTag,
  setValue,
  value,
  label,
  resetDefaultValue,
  isDescription,
  isMetaTitle,
  isAltImage,
  messageError,
}: InputProductTagType) {
  const { t } = useTranslation();
  /** toggle product tag */
  const onToggleProductTag = (prdTag: ProductTag) => {
    const productTag = value;
    const isPrdTagExist = productTag.find((item) => item === prdTag);
    let newData: ProductTag[];

    if (isPrdTagExist) {
      newData = productTag.filter((item) => item !== prdTag);
    } else {
      newData = [...productTag, prdTag];
    }

    setValue(newData);
  };
  /** set toggle product tag */

  /** set defalut product tag */
  const onSetDefaultProductTag = () => {
    setValue(resetDefaultValue);
  };
  /** end set defalut product tag*/

  const isActiveProductTag = ({
    listProductTagDefault,
    productTag,
  }: {
    listProductTagDefault: ProductTag[];
    productTag: ProductTag;
  }) => {
    const isActive = listProductTagDefault.find((item) => item === productTag);

    return isActive ? true : false;
  };

  const displayInput = useMemo(() => {
    const newValue = isMetaTitle
      ? value.join(" | ")
      : isDescription
      ? value.join("  ")
      : value.join(", ");

    return (
      <TextField
        autoComplete="true"
        multiline={
          isMetaTitle && newValue.length >= 59
            ? 2
            : isDescription && newValue.length >= 61
            ? 2
            : true
        }
        label=""
        value={newValue}
        error={messageError}
      />
    );
  }, [value, isDescription, isMetaTitle, isAltImage, messageError]);

  return (
    <div className="InputProductTag">
      <div className="InputProductTag__header">
        <Text as="span" variant="bodyMd">
          {label}
        </Text>
        <Button plain onClick={onSetDefaultProductTag}>
          {t("common.btn_reset_default")}
        </Button>
      </div>

      {displayInput}

      <div className="InputProductTag__list-tag">
        {listProductTag.map((item) => (
          <button
            key={item}
            className={`InputProductTag__btn-tag ${
              isActiveProductTag({
                listProductTagDefault: value,
                productTag: item,
              }) && "active"
            }`}
            onClick={() => {
              onToggleProductTag(item);
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

interface InputProductTagType {
  value: ProductTag[];
  listProductTag: ProductTag[] | [];
  setValue: (value: ProductTag[]) => void;
  label: string;
  resetDefaultValue: ProductTag[];
  isAltImage?: boolean;
  isMetaTitle?: boolean;
  isDescription?: boolean;
  messageError?: string;
}

export default InputProductTag;
