import { Divider, Text } from "@shopify/polaris";
import "./styles.scss";

import iconBrowser from "@swift/assets/images/basicSeo/icon-browser.png";
import IconGoogle from "@swift/assets/images/basicSeo/icon-google.png";
import { useAppSelector } from "@swift/hooks";
import { customerData } from "@swift/store/global";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const PreviewEditAuditProduct = memo(function PreviewEditAuditProductMemo({
  titleTag,
  descriptionTag,
}: IPreviewEditAuditProduct) {
  const { t } = useTranslation();

  const customer = useAppSelector(customerData);

  return (
    <div className="PreviewEditAuditProduct p-5">
      <h4 className="PreviewEditAuditProduct__title-header gap-2 flex items-center pb-3">
        <img src={IconGoogle} alt="" />
        <strong>{t("smartSEO.audit_product.section_preview_title")}</strong>
      </h4>
      <Divider />
      <div className="pt-3 flex gap-2 items-start">
        <img src={iconBrowser} alt="" />
        <div className="flex flex-col gap-1 flex-1">
          <Text as="span" variant="bodyMd">{customer?.domain || customer?.shopify_domain}</Text>
          <h2 className="PreviewEditAuditProduct__store-name">
            <Text as="span" variant="headingMd">{titleTag}</Text>
          </h2>
          <p className="PreviewEditAuditProduct__preview-des">
            {descriptionTag}
          </p>
        </div>
      </div>
    </div>
  );
});

interface IPreviewEditAuditProduct {
  titleTag: string;
  descriptionTag: string;
}
export default PreviewEditAuditProduct;
