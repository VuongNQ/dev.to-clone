import { Button, Collapsible, Icon, ProgressBar, Text } from "@shopify/polaris";
import { ChevronDownMinor, ChevronUpMinor } from "@shopify/polaris-icons";
import { percentNumberNumberAndTotal } from "@swift/utils/funcNumber";
import { PropsWithChildren, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";

const CollapsibleSubmitSiteMap = memo(function _({
  numberTaskComplete,
  children,
  isLoadingDisconnect,
  onConfirmDisconnect,
}: PropsWithChildren<IPropsCollapsibleSubmitSiteMap>) {
  const { t } = useTranslation();

  const [isOpenCollapsible, setIsOpenCollapsible] = useState(true);

  const onToggle = useCallback(() => {
    setIsOpenCollapsible((value) => !value);
  }, []);

  return (
    <>
      <div className="CollapsibleSubmitSiteMap__console-header flex gap-5 items-start justify-between">
        <div className="flex flex-col gap-2">
          <Text as="h2" variant="headingMd">
            {t("smartSEO.site_map.section_google_search_console.title")}
          </Text>
          <Text as="p" variant="bodyMd" color="subdued">
            {t("smartSEO.site_map.section_google_search_console.des")}
          </Text>
        </div>

        {numberTaskComplete >= 1 && (
          <span style={{ color: "#D72C0D" }}>
            <Button
              outline
              monochrome
              onClick={onConfirmDisconnect}
              loading={isLoadingDisconnect}
            >
              {t("common.btn_disconnect")}
            </Button>
          </span>
        )}
      </div>

      <div
        className={`CollapsibleSubmitSiteMap__btn pt-3 ${
          isOpenCollapsible && "active"
        }`}
        onClick={onToggle}
      >
        <span>
          {t(
            "smartSEO.site_map.section_google_search_console.txt_task_complete",
            {
              numberComplete: numberTaskComplete,
              total: 4,
            }
          )}
        </span>
        <div className="CollapsibleSubmitSiteMap__proccess flex-1">
          <ProgressBar
            progress={percentNumberNumberAndTotal(numberTaskComplete, 4)}
            size="small"
            color="primary"
          />
        </div>
        <Icon
          color="base"
          source={isOpenCollapsible ? ChevronUpMinor : ChevronDownMinor}
        />
      </div>

      <Collapsible
        open={isOpenCollapsible}
        id="collapse-searchConsole-sitemap"
        transition={{
          duration: "500ms",
          timingFunction: "ease-in-out",
        }}
        expandOnPrint
      >
        <div>{children}</div>
      </Collapsible>
    </>
  );
});

interface IPropsCollapsibleSubmitSiteMap {
  numberTaskComplete: number;
  onConfirmDisconnect: () => void;
  isLoadingDisconnect: boolean;
}

export default CollapsibleSubmitSiteMap;
