import { useAppSelector } from "@swift/hooks";
import { queryKeys } from "@swift/queryKeys";
import { useSmartBoosterService } from "@swift/services/smartBoosterApi";
import { customerData } from "@swift/store/global";
import { PlanType } from "@swift/types/planPricing";
import { IDataDetailGA, KeyStepConnectGoogle } from "@swift/types/smartBooster";
import { isExistInArray } from "@swift/utils/arrayFunc";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { ACCEPT_PLANS } from "../constant";

function useFuncSmartBooster() {
  const queryClient = useQueryClient();

  const customer = useAppSelector(customerData);

  const { getSettingGA } = useSmartBoosterService();

  const handleUpdateSettingInfoDataGA = useCallback(
    (payload: IDataDetailGA | null) => {
      queryClient.setQueryData<IDataDetailGA | null>(
        queryKeys.smartBoosterQueryKey.getSettingGA().queryKey,
        (oldData) => {
          if (!payload) return payload;

          let newData = oldData;
          newData = {
            ...payload,
          };
          return newData;
        }
      );
    },
    [queryClient]
  );

  const isConnectedGoogle = useCallback(async () => {
    const { data, status } = await getSettingGA();

    if (status) {
      if (!data.length) {
        handleUpdateSettingInfoDataGA(null);
        return false;
      }

      const newData = data[0];
      if (newData.setting.is_connected === KeyStepConnectGoogle.connected) {
        handleUpdateSettingInfoDataGA(newData);
        return true;
      }
    }
    return false;
  }, [getSettingGA, handleUpdateSettingInfoDataGA]);

  const isAcceptUserFeature = useMemo(
    () => isExistInArray(customer?.app_plan || PlanType.free, ACCEPT_PLANS),
    [customer?.app_plan]
  );

  return {
    isConnectedGoogle,
    isAcceptUserFeature
  };
}

export default useFuncSmartBooster;
