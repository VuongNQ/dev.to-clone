import NotifySingleContent from "@swift/components/UIs/Notification/SingleContent";
import {
  INIT_BULK_ALT_IMG,
  INIT_BULK_META_TAG,
  INIT_SCAN_MISSING_ALT_IMG,
  INIT_SCAN_MISSING_META_TAG,
} from "@swift/constants/constantsSeoBasic";
import { useAppSelector } from "@swift/hooks";
import { queryKeys } from "@swift/queryKeys";
import { useBoostSEOService } from "@swift/services/boostSEOApi";
import { customerData } from "@swift/store/global";
import { CustomEventSEO } from "@swift/types/CustomEventListener";
import {
  IDataBulkAltImgMetaTag,
  IPusherDataBulkAddAltImgAndMetaTag,
  KeyFeatureBulkAddAltImgAndMetaTag,
  KeyStatusBulkAddAltImgAndMetaTag,
  keyTitleProccessBulkAltMetaTag,
} from "@swift/types/boostSEO";
import { PusherGeneral } from "@swift/types/pusher";
import { dispatchCustomEvent } from "@swift/utils/customEventListen";
import { useQuery } from "@tanstack/react-query";
import { Channel } from "pusher-js";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

const NotifyBulkAltImgMetaTag = ({ channel }: { channel: Channel }) => {
  const { t } = useTranslation();

  const customer = useAppSelector(customerData);

  const { getBulkAddAltImgAndMetaTag } = useBoostSEOService();

  const { data: dataBulkAltMetaTag, refetch: refetchDataBulkAltMetaTag } =
    useQuery({
      ...queryKeys.basicSeo.getBulkAddAltImgAndMetaTag(),
      enabled: !customer,
      queryFn: async () => {
        let newData: IDataBulkAltImgMetaTag = {
          dataBulkAddAltImg: INIT_BULK_ALT_IMG,
          dataBulkAddMetaTag: INIT_BULK_META_TAG,
          dataScanMissingAltImg: INIT_SCAN_MISSING_ALT_IMG,
          dataScanMissingMetaTag: INIT_SCAN_MISSING_META_TAG,
        };

        const { data, status } = await getBulkAddAltImgAndMetaTag();
        if (status && data.length) {
          data.forEach((item) => {
            let key: keyof IDataBulkAltImgMetaTag = "dataBulkAddAltImg";
            if (
              item.feature ===
              KeyFeatureBulkAddAltImgAndMetaTag.bulk_add_alt_images
            ) {
              key = "dataBulkAddAltImg";
            }
            if (
              item.feature ===
              KeyFeatureBulkAddAltImgAndMetaTag.bulk_add_products_meta_tags
            ) {
              key = "dataBulkAddMetaTag";
            }
            if (
              item.feature ===
              KeyFeatureBulkAddAltImgAndMetaTag.scan_missing_alt_product_images
            ) {
              key = "dataScanMissingAltImg";
            }
            if (
              item.feature ===
              KeyFeatureBulkAddAltImgAndMetaTag.scan_missing_products_meta_tags
            ) {
              key = "dataScanMissingMetaTag";
            }

            newData = {
              ...newData,
              [key]: item,
            };
          });
        }
        return newData;
      },
    });

  const handleDispatchEventFinish = (
    data: IPusherDataBulkAddAltImgAndMetaTag
  ) => {
    if (Number(data.storeId) === customer?.id) {
      dispatchCustomEvent({
        eventName: CustomEventSEO.eventBulkMetaTagsAndAltImg,
        data: data,
      });

      refetchDataBulkAltMetaTag();
    }
  };

  useEffect(() => {
    /* Pusher Channel for Bulk Add AltImg And MetaTag SEO */
    channel.bind(PusherGeneral.bulkAltMetaTag, handleDispatchEventFinish);
    /*end  Pusher Channel for Bulk Add AltImg And MetaTag SEO */
    return () => {
      // Pusher Channel for Bulk Add AltImg And MetaTag SEO
      channel.unbind(PusherGeneral.bulkAltMetaTag, handleDispatchEventFinish);
    };
  }, []);

  const displayBulkAddAltImgAndMetaTag = useMemo(() => {
    if (!dataBulkAltMetaTag) return <></>;
    const {
      dataBulkAddAltImg,
      dataBulkAddMetaTag,
      dataScanMissingAltImg,
      dataScanMissingMetaTag,
    } = dataBulkAltMetaTag;

    return (
      <>
        {dataScanMissingAltImg.status &&
          dataScanMissingAltImg.status ==
            KeyStatusBulkAddAltImgAndMetaTag.processing && (
            <NotifySingleContent
              title={t(keyTitleProccessBulkAltMetaTag.title_alt_scan_missing)}
              isOnProcess={true}
            />
          )}

        {dataScanMissingMetaTag.status &&
          dataScanMissingMetaTag.status ==
            KeyStatusBulkAddAltImgAndMetaTag.processing && (
            <NotifySingleContent
              title={t(keyTitleProccessBulkAltMetaTag.title_meta_tags_scan_missing)}
              isOnProcess={true}
            />
          )}

        {dataBulkAddAltImg.status &&
          dataBulkAddAltImg.status ==
            KeyStatusBulkAddAltImgAndMetaTag.processing && (
            <NotifySingleContent
              title={t(keyTitleProccessBulkAltMetaTag.title_alt_img_bulk)}
              isOnProcess={true}
            />
          )}

        {dataBulkAddMetaTag.status &&
          dataBulkAddMetaTag.status ==
            KeyStatusBulkAddAltImgAndMetaTag.processing && (
            <NotifySingleContent
              title={t(keyTitleProccessBulkAltMetaTag.title_meta_tags_bulk)}
              isOnProcess={true}
            />
          )}
      </>
    );
  }, [dataBulkAltMetaTag, t]);

  return displayBulkAddAltImgAndMetaTag;
};

export default NotifyBulkAltImgMetaTag;
