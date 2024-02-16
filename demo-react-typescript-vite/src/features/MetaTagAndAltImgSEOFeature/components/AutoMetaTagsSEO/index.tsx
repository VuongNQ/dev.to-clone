import FeaturesUseAccordingPlan, {
  IRefFeaturesUseAccordingPlan,
} from "@swift/components/FeaturesUseAccordingPlan";
import { SettingAltImgMetaTagContext } from "@swift/contexts/SettingAltImgMetaTagContext";
import { useContext, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ACCEPT_PLANS_AUTO_ALT_META_TAG } from "../../constants";
import { Button, Text } from "@shopify/polaris";

const AutoMetaTagsSEO = () => {
  const { t } = useTranslation();

  const refFeaturesUseAccordingPlan =
    useRef<IRefFeaturesUseAccordingPlan>(null);

  const {
    dataAltImgMetaTagState,
    handleSetDataAltImgMetaTagState,
    isLoadFetchData,
  } = useContext(SettingAltImgMetaTagContext);

  const eleDomEleHeader = useMemo(() => {
    const isActive = dataAltImgMetaTagState.auto_add_meta_tags;

    return (
      <div className="flex gap-5 items-center">
        <div className="flex-1">
          <Text as="h4" variant="bodyMd" color="subdued">
            {t("smartSEO.meta_title.section_auto_setting.des")}
          </Text>
        </div>
        <div style={{ color: "var(--p-icon-critical)" }}>
          <Button
            loading={isLoadFetchData}
            outline={isActive}
            size="slim"
            monochrome
            primary={!isActive}
            onClick={() => {
              refFeaturesUseAccordingPlan.current?.onActionPrimary();
            }}
          >
            {isActive ? t("common.btn_de_active") : t("common.btn_active")}
          </Button>
        </div>
      </div>
    );
  }, [dataAltImgMetaTagState.auto_add_meta_tags, isLoadFetchData, t]);

  return (
    <FeaturesUseAccordingPlan
      ref={refFeaturesUseAccordingPlan}
      className="sw__wp-box p-5"
      listPLanAllow={ACCEPT_PLANS_AUTO_ALT_META_TAG}
      contentUpGrade={t("optimize_theme.auto_optimize.upgrade")}
      onActionPrimary={() => {
        handleSetDataAltImgMetaTagState({
          auto_add_meta_tags: !dataAltImgMetaTagState.auto_add_meta_tags,
        });
      }}
      eleHeader={eleDomEleHeader}
    />
  );
};

export default AutoMetaTagsSEO;
