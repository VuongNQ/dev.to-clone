import NotifySingleContent from "@swift/components/UIs/Notification/SingleContent";
import { MENU_APP } from "@swift/constants/constantMenu";
import { INIT_DATA_REDUX_AUDIT_PROD, getFilterAudit, updateFilter } from "@swift/features/ProductAuditSEO/store";
import { useAppDispatch, useAppSelector } from "@swift/hooks";
import { customerData, globalActions } from "@swift/store/global";
import { CustomEventSEO } from "@swift/types/CustomEventListener";
import { syncStatus } from "@swift/types/boostSEO";
import { PusherGeneral } from "@swift/types/pusher";

import { dispatchCustomEvent } from "@swift/utils/customEventListen";
import { Channel } from "pusher-js";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
const NotifySyncAuditProduct = ({ channel }: { channel: Channel }) => {
  const { t } = useTranslation();

  const location = useLocation();

  const dispatchState = useAppDispatch();

  const filterAudit = useAppSelector(getFilterAudit);

  const customer = useAppSelector(customerData);

  const handleEventPusherReSync = async () => {
    dispatchState(
      globalActions.updateCustomer({
        sync_product_status: "done",
      })
    );

    dispatchCustomEvent({
      eventName: CustomEventSEO.eventSyncAuditProduct,
      data: "",
    });
  };

  useEffect(() => {
    channel.bind(PusherGeneral.eventSyncAuditProd, handleEventPusherReSync);
    return () => {
      channel.unbind(PusherGeneral.eventSyncAuditProd, handleEventPusherReSync);
    };
  }, []);

  useEffect(() => {
    const pathname = location.pathname;
    const isAlike =
      JSON.stringify(filterAudit) ===
      JSON.stringify(INIT_DATA_REDUX_AUDIT_PROD.filterAudit)
        ? true
        : false;

    if (isAlike) return;

    const isInPageSEO = pathname.includes(MENU_APP[1].destination);
    if (isInPageSEO) return;

    dispatchState(updateFilter(INIT_DATA_REDUX_AUDIT_PROD.filterAudit));
  }, [location]);

  if (customer?.sync_product_status !== syncStatus.processing) return <></>;

  return (
    <NotifySingleContent
      title={t("smartSEO.audit_product.notify_sync")}
      isOnProcess={true}
    />
  );
};

export default NotifySyncAuditProduct;
