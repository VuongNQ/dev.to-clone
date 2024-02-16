import { Button, Text, Toast } from "@shopify/polaris";
import FeaturesUseAccordingPlan, {
  IRefFeaturesUseAccordingPlan,
} from "@swift/components/FeaturesUseAccordingPlan";
import { CustomEventSEO } from "@swift/types/CustomEventListener";
import {
  IPusherDataBulkAddAltImgAndMetaTag,
  KeyFeatureBulkAddAltImgAndMetaTag,
} from "@swift/types/boostSEO";
import {
  subscribeCustomEvent,
  unsubscribeCustomEvent,
} from "@swift/utils/customEventListen";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ACCEPT_PLANS_BULK_ALT_META_TAG } from "../../constants";
import "./styles.scss";

const BulkMetaTagsAndAltImg = memo(function _({
  onCallbackBulk,
  des,
  subDes,
  subTitle,
  title,
  txtDateUpdate,
  isShowColRight,
  titleBtn,
  isLoading = false,
  isUseScanMissing,
  onCallbackScanMissing,
  isPrimaryBtn = true,
}: IBulkMetaTagsAndAltImgProps) {
  const { t } = useTranslation();

  const refFeaturesUseAccordingPlan =
    useRef<IRefFeaturesUseAccordingPlan>(null);

  const [toastMessage, setToastMessage] = useState<{
    isToast: boolean;
    message: string;
    isError?: boolean;
  }>({
    isToast: false,
    message: "",
    isError: false,
  });

  const handleUpToastFinish = useCallback(
    (data: CustomEventInit<IPusherDataBulkAddAltImgAndMetaTag>) => {
      let content = "";
      if (
        data.detail?.feature ===
        KeyFeatureBulkAddAltImgAndMetaTag.bulk_add_alt_images
      ) {
        content = "smartSEO.alt_images.add_bulk.toast_bulk_success";
      }

      if (
        data.detail?.feature ===
        KeyFeatureBulkAddAltImgAndMetaTag.bulk_add_products_meta_tags
      ) {
        content = "smartSEO.meta_title.add_bulk.toast_bulk_success";
      }

      if (
        data.detail?.feature ===
        KeyFeatureBulkAddAltImgAndMetaTag.scan_missing_alt_product_images
      ) {
        content = "smartSEO.alt_images.add_bulk.toast_scan_missing_success";
      }

      if (
        data.detail?.feature ===
        KeyFeatureBulkAddAltImgAndMetaTag.scan_missing_products_meta_tags
      ) {
        content = "smartSEO.meta_title.add_bulk.toast_scan_missing_success";
      }

      setToastMessage({
        isToast: true,
        message: content,
      });
    },
    []
  );

  const onAction = useCallback(() => {
    if (isUseScanMissing) {
      return onCallbackScanMissing();
    }
    refFeaturesUseAccordingPlan.current?.onActionPrimary();
  }, [isUseScanMissing, onCallbackScanMissing]);

  /** listen event syncAuditProduct to show toast */
  useEffect(() => {
    subscribeCustomEvent({
      eventName: CustomEventSEO.eventBulkMetaTagsAndAltImg,
      listener: handleUpToastFinish,
    });

    return () => {
      unsubscribeCustomEvent({
        eventName: CustomEventSEO.eventBulkMetaTagsAndAltImg,
        listener: handleUpToastFinish,
      });
    };
  }, []);
  /**end listen event syncAuditProduct to show toast */

  const eleDomEleHeader = useMemo(() => {
    return (
      <div className="BulkMetaTagsAndAltImg flex items-center gap-3">
        <div className="BulkMetaTagsAndAltImg__left flex-1">
          <div className="mb-3">
            <div className="pb-2">
              <Text variant="headingMd" as="h3">
                {title}
              </Text>
            </div>
            <Text variant="bodyMd" as="p" color="subdued">
              {des}
            </Text>
          </div>
          <Button
            loading={isLoading}
            onClick={onAction}
            primary={isPrimaryBtn}
          >
            {titleBtn}
          </Button>
        </div>

        <div
          className={`BulkMetaTagsAndAltImg__right flex flex-col gap-3 ${
            isShowColRight ? "block" : "hidden"
          }`}
        >
          <div>
            <Text alignment="center" variant="bodyMd" as="span">
              {subTitle}
            </Text>
            <Text alignment="center" variant="headingLg" as="h4">
              {subDes}
            </Text>
          </div>
          <Text alignment="center" variant="bodySm" as="span" color="subdued">
            {txtDateUpdate}
          </Text>
        </div>
      </div>
    );
  }, [des, isLoading, isPrimaryBtn, isShowColRight, onAction, subDes, subTitle, title, titleBtn, txtDateUpdate]);

  const eleToast = useMemo(
    () =>
      toastMessage.isToast && (
        <Toast
          error={toastMessage.isError}
          content={t(toastMessage.message)}
          onDismiss={() => {
            setToastMessage({
              isToast: false,
              message: "",
            });
          }}
          duration={5000}
        />
      ),
    [t, toastMessage.isError, toastMessage.isToast, toastMessage.message]
  );

  return (
    <>
      <FeaturesUseAccordingPlan
        ref={refFeaturesUseAccordingPlan}
        className="sw__wp-box p-5"
        listPLanAllow={ACCEPT_PLANS_BULK_ALT_META_TAG}
        contentUpGrade={t("optimize_theme.auto_optimize.upgrade")}
        onActionPrimary={onCallbackBulk}
        eleHeader={eleDomEleHeader}
      />
      {eleToast}
    </>
  );
});

interface IBulkMetaTagsAndAltImgProps {
  title: string;
  des: string;
  subTitle: string;
  subDes: string;
  txtDateUpdate: string;
  titleBtn: string;
  onCallbackBulk: () => void;
  onCallbackScanMissing: () => void;
  isShowColRight: boolean;
  isLoading?: boolean;
  isUseScanMissing: boolean;
  isPrimaryBtn?: boolean;
}

export default BulkMetaTagsAndAltImg;
