import { Button, Icon, SkeletonBodyText } from "@shopify/polaris";
import { ExternalSmallMinor } from "@shopify/polaris-icons";
import { useAppSelector } from "@swift/hooks";
import { customerData } from "@swift/store/global";
import { formatMDYAMPMAtString } from "@swift/utils/formatDate";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";

let timeOutSession: NodeJS.Timeout | undefined = undefined;

function GenerateSiteMapSEO() {
  const { t } = useTranslation();

  const customer = useAppSelector(customerData);

  const [isLoading, setIsLoading] = useState(false);

  const onGenerateLink = () => {
    setIsLoading(true);
    timeOutSession = setTimeout(() => {
      setIsLoading(false);
      clearTimeout(timeOutSession);
    }, 1000);
  };

  if (isLoading)
    return (
      // <LegacyCard sectioned>
        <SkeletonBodyText lines={6} />
      // </LegacyCard>
    );

  return (
    <div className="GenerateSiteMapSEO__sitemap flex justify-between items-start gap-5">
      <div className="flex flex-col	gap-2">
        <h2 className="GenerateSiteMapSEO__title-section">
          {t("smartSEO.site_map.section_generate.title")}
        </h2>
        {customer && (
          <>
            <a
              rel="noreferrer"
              target="_blank"
              href={`https://${customer.domain || customer.shopify_domain}/sitemap.xml`}
              className="GenerateSiteMapSEO__txt-link"
            >
              {`https://${customer.domain || customer.shopify_domain}/sitemap.xml`}{" "}
              <Icon source={ExternalSmallMinor} color="interactive" />
            </a>
            <span className="GenerateSiteMapSEO__scan-time">
              {t("smartSEO.site_map.txt_last_scan_time")}{" "}
              {formatMDYAMPMAtString("")}
            </span>
          </>
        )}
      </div>
      <Button onClick={onGenerateLink} outline>
        {t("common.btn_generate_link")}
      </Button>
    </div>
  );
}

export default GenerateSiteMapSEO;
