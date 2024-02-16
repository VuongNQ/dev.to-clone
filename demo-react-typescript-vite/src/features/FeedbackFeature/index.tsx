import { Page } from "@shopify/polaris";
import Breadcrumb from "@swift/components/UIs/Breadcrumb";
import { BREADCRUMB_FEEDBACK } from "@swift/constants/constantBreadcrumb";
import { useAppSelector } from "@swift/hooks";
import useFeedback from "@swift/hooks/useFeedback";
import { customerData } from "@swift/store/global";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const FeedbackFeature = () => {
  const { t } = useTranslation();

  const { createEleFeedback } = useFeedback();

  const customer = useAppSelector(customerData);

  const refFeedback = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!refFeedback.current || !customer) return;

    const payload = {
      el: refFeedback.current,
      data: {
        domain: customer.shopify_domain,
      },
    };

    createEleFeedback(payload);
  }, [refFeedback,  customer?.shopify_domain]);

  return (
    <>
      <Breadcrumb listBreadcrumb={BREADCRUMB_FEEDBACK} />
      <Page title={t("feedback.title")} subtitle={t("feedback.des")}>
          <div ref={refFeedback} id="suggestionPage"></div>
      </Page>
    </>
  );
};

export default FeedbackFeature;
