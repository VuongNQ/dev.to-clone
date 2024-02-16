/* Packages */
import { Button, Text } from "@shopify/polaris";
/* translation */
import { useTranslation } from "react-i18next";

import google from "@swift/assets/images/smartBooster/google.png";

import { queryKeys } from "@swift/queryKeys";
import { useSmartBoosterService } from "@swift/services/smartBoosterApi";
import { IDataDetailGA } from "@swift/types/smartBooster";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function SWSectionDisConnectGA() {
  const { t } = useTranslation();

  const { postDisConnectGA } = useSmartBoosterService();

  const queryClient = useQueryClient();

  // query have been defined in SmartBoosterFeature component
  const { data: infoDataGA } = useQuery<IDataDetailGA | null>(
    queryKeys.smartBoosterQueryKey.getSettingGA().queryKey
  );

  const { mutate: onDisConnect, isLoading: isLoadingDisConnect } = useMutation({
    mutationFn: async () => {
      const { status } = await postDisConnectGA();
      if (status) {
        queryClient.setQueryData<IDataDetailGA | null>(
          queryKeys.smartBoosterQueryKey.getSettingGA().queryKey,
          () => {
            return null;
          }
        );
      }

      return status;
    },
  });

  return (
    <div className="sw__wp-box flex gap-5 items-center p-5">
      <img src={google} alt="" />
      <div className="flex-1">
        <Text as="span">
          {t("smart_booster_page.section_disconnect_google.title")}
        </Text>
        <Text as="p" color="subdued">
          {infoDataGA && infoDataGA.account.email}
        </Text>
      </div>
      <div
        style={{
          color: "var( --p-icon-critical)",
        }}
      >
        <Button
          monochrome
          outline
          onClick={onDisConnect}
          loading={isLoadingDisConnect}
        >
          {t("smart_booster_page.btn_dissconnect")}
        </Button>
      </div>
    </div>
  );
}

export default SWSectionDisConnectGA;
