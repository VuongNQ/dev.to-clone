/* Packages */
import { MediaCard, VideoThumbnail } from "@shopify/polaris";
import "./styles.scss";
/* translation */
import { useTranslation } from "react-i18next";

import bannerSmartBooster from "@swift/assets/images/smartBooster/thumail-min.png";

import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import usePlanPricing from "@swift/hooks/usePlanPricing";
import { useGoogleApiService } from "@swift/services/googleApi";
import { useMutation } from "@tanstack/react-query";
import useFuncSmartBooster from "../../hooks/useFuncSmartBooster";
import FeaturesUseAccordingPlan, { IRefFeaturesUseAccordingPlan } from "@swift/components/FeaturesUseAccordingPlan";
import { useMemo, useRef } from "react";
import { ACCEPT_PLANS } from "../../constant";

function SWSectionConnectGoogle({
  onOpenCollapse,
}: IPropsSWSectionConnectGoogle) {
  const { t } = useTranslation();

  const { oauthGoogle } = useGoogleApiService();

  const { URL_ROOT_APP } = usePlanPricing({});

  const { isConnectedGoogle } = useFuncSmartBooster();

  const { onRedirectRemoteCurrentTabs } = useFuncRedirect();

  const refFeaturesUseAccordingPlan =
  useRef<IRefFeaturesUseAccordingPlan>(null);

  const { mutate: onConnectGoogle, isLoading: isLoadingConnectGoogle } =
    useMutation({
      mutationFn: async () => {
        const isConnected = await isConnectedGoogle();
        if (isConnected) return;

        const url = `${URL_ROOT_APP}/speed-optimizer?tabs=smart_booster`;
        const response = await oauthGoogle({
          // generate link redirect app google
          path: url,
          feature: "ga4",
        });

        if (response.status && response.data) {
          onRedirectRemoteCurrentTabs(response.data.redirect_url);
          return;
        }
      },
    });

  const eleDomEleHeader = useMemo(
    () => (
      <div className="SWSectionConnectGoogle__wp-connect mb-5">
        <MediaCard
          title={t("smart_booster_page.banner.title")}
          primaryAction={{
            content: t("smart_booster_page.btn_connect"),
            onAction: () =>{
              refFeaturesUseAccordingPlan.current?.onActionPrimary();
            },
            loading: isLoadingConnectGoogle,
          }}
          description={t("smart_booster_page.banner.des")}
          size="small"
        >
          <VideoThumbnail
            videoLength={156}
            thumbnailUrl={bannerSmartBooster}
            onClick={onOpenCollapse}
          />
        </MediaCard>
      </div>
    ),
    [isLoadingConnectGoogle, onOpenCollapse, t]
  );
  
  return (
    <FeaturesUseAccordingPlan
      ref={refFeaturesUseAccordingPlan}
      // className="sw__wp-box p-5"
      listPLanAllow={ACCEPT_PLANS}
      contentUpGrade={t("smart_booster_page.txt_upgrade")}
      onActionPrimary={onConnectGoogle}
      eleHeader={eleDomEleHeader}
    />
  );
}

interface IPropsSWSectionConnectGoogle {
  onOpenCollapse: () => void;
}
export default SWSectionConnectGoogle;
