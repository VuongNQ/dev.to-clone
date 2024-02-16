import { Icon, Spinner } from "@shopify/polaris";
import { CircleInformationMajor } from "@shopify/polaris-icons";
import NotiCollapsible from "@swift/components/UIs/Notification/NotiCollapsible";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import "./styles.scss";

import { useDisclosure } from "@swift/hooks/useDisclosure";
import useFuncOptimizeTheme from "@swift/hooks/useFuncOptimizeTheme";
import { queryKeys } from "@swift/queryKeys";
import { useOptimizeThemeService } from "@swift/services/optimizeThemeApi";
import {
  IDataDetailOptimizeTheme,
  InforActionOpitimizeThemeType,
  KeyOptimzie,
  PayloadPusherOpitimizeTheme,
  StatusProccessOptimzie,
} from "@swift/types/optimizeTheme";
import { EChannelOptimizeTheme } from "@swift/types/pusher";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Channel } from "pusher-js";
import NotifyOptimizationInfo from "./NotifyOptimationInfo";
import NotifyOptimizationStatus from "./NotifyOptimationStatus";

const TIME_NOTIFY_STEP_SUCCESS = 4000;

const INIT_DATA_STEP_SUCCESS: InforActionOpitimizeThemeType = {
  file_count: 100,
  progress: 100,
  status: StatusProccessOptimzie.done,
  total_file: 100,
};

function NotifyOptimizeTheme({ channel }: { channel: Channel }) {
  const { t } = useTranslation();

  const queryClient = useQueryClient();

  const { getDetailOptimize } = useOptimizeThemeService();

  const { handleReturnStepFound, handleReturnDataProgress } =
    useFuncOptimizeTheme();

  const {
    isOpen: isOpenNotify,
    onOpen: onOpenNotify,
    onClose: onCloseNotify,
  } = useDisclosure({
    defaultIsOpen: true,
  });

  // /**end modal theme fail */

  const [stepsFinishOptimize, setStepsFinishOptimize] = useState<string[]>([]);

  const { data: newDataOptimize, refetch: refetchDataOptimize } = useQuery({
    ...queryKeys.optimizeTheme.getDetailOptimize(),
    queryFn: async () => {
      const { data, status } = await getDetailOptimize();
      if (status) {
        return data;
      }
      return null;
    },
  });

  const dataProgress = useMemo(() => {
    if (!newDataOptimize) return null;
    const { stats } = newDataOptimize;
    const data = handleReturnDataProgress(stats);
    return data;
  }, [newDataOptimize, handleReturnDataProgress]);

  /** toggle button collapsible */
  const handleToggle = useCallback(() => {
    if (!isOpenNotify) {
      onOpenNotify();
    } else {
      onCloseNotify();
    }
  }, [isOpenNotify]);
  /** end toggle button collapsible */

  /**handle step success  if  progress success*/
  const handleRemoveStepSuccess = useCallback(() => {
    if (!stepsFinishOptimize.length) return;

    const timeOut = setTimeout(() => {
      setStepsFinishOptimize((preValue) => {
        if (!preValue.length) {
          clearTimeout(timeOut);
          return [];
        }
        const listStepFinish = [...preValue];
        listStepFinish.shift();
        return listStepFinish;
      });
    }, TIME_NOTIFY_STEP_SUCCESS);
  }, [stepsFinishOptimize]);
  /**end handle step success  if  progress success*/

  /** set data query step success */
  const handleUpdateStepSuccess = useCallback(
    (optimize_type: KeyOptimzie) => {
      queryClient.setQueryData<IDataDetailOptimizeTheme>(
        queryKeys.optimizeTheme.getDetailOptimize().queryKey,
        (oldData) => {
          if (!oldData) return oldData;
          let newData = oldData;
          newData = {
            ...newData,
            stats: {
              ...oldData.stats,
              [optimize_type]: INIT_DATA_STEP_SUCCESS,
            },
          };

          return newData;
        }
      );
    },
    [queryClient]
  );
  /**end set data query step success */

  // /**end handle Update Step Listen Pusher */
  const handleListenPusher = useCallback(
    (data: PayloadPusherOpitimizeTheme) => {
      const { status, optimize } = data;

      if (status) {
        setStepsFinishOptimize([optimize]);
        if (optimize === KeyOptimzie.duplicate) {
          refetchDataOptimize();
        } 

        handleUpdateStepSuccess(optimize);
        queryClient.invalidateQueries({
          queryKey: queryKeys.optimizeTheme.getHistoryOptimize({
            filters: { keyword: "" },
            params: { page: 1, limit: 10 },
          }).queryKey,
        });
      } else {
        refetchDataOptimize();
      }
    },
    [handleUpdateStepSuccess, queryClient, refetchDataOptimize]
  );
  /** subscribe pusher  */

  useEffect(() => {
    /** realtime update step progress */
    channel.bind(EChannelOptimizeTheme.optimized, handleListenPusher);

    return () => {
      // Pusher Channel for Bulk Add AltImg And MetaTag SEO
      channel.unbind(EChannelOptimizeTheme.optimized, handleListenPusher);
    };
  }, []);

  useEffect(() => {
    handleRemoveStepSuccess();
  }, [handleRemoveStepSuccess, stepsFinishOptimize]);

  /**show title notify collapsible */
  const displayTitleNotifyCollapsible = useMemo(() => {
    if (!newDataOptimize) return "";
    const dataDuplicate = newDataOptimize.stats.duplicate;

    if (
      dataDuplicate &&
      dataDuplicate.status === StatusProccessOptimzie["in-process"]
    ) {
      return t("optimize_theme.notify.title_copy");
    }

    return `${t("optimize_theme.notify.title")}  (1/1)`;
  }, [newDataOptimize, t]);
  /**end show title notify collapsible */

  const eleStatusIcon = useMemo(() => {
    if (!dataProgress || !isOpenNotify) return <></>;

    return dataProgress.stepFailed.length ? (
      <Icon source={CircleInformationMajor} color="critical" />
    ) : (
      <Spinner accessibilityLabel="Publish theme changes" size="small" />
    );
  }, [dataProgress, isOpenNotify]);

  /** show notify copy theme */
  const eleNotifyCopTheme = useMemo(() => {
    if (!newDataOptimize) return <></>;

    const dataDuplicate = newDataOptimize.stats.duplicate;
    if (!dataDuplicate) return <></>;

    if (dataDuplicate.status === StatusProccessOptimzie["in-process"]) {
      return (
        <NotifyOptimizationInfo
          title={t("optimize_theme.list_task.copy-theme.title")}
          des={t("optimize_theme.list_task.copy-theme.des_proccess")}
          proccess={dataDuplicate.progress}
          isCopy={true}
        />
      );
    }
    return "";
  }, [newDataOptimize, t]);
  /** end show notify copy theme */

  /** show notify Proccess  running step */
  const eleNotifyProccess = useMemo(() => {
    if (!newDataOptimize || !dataProgress) return <></>;

    const dataDuplicate = newDataOptimize.stats.duplicate;

    if (
      dataDuplicate?.status === StatusProccessOptimzie["in-process"] ||
      dataProgress.stepFailed.length
    )
      return <></>;

    if (!dataProgress.stepOptimizing.length) return <></>;

    const step = handleReturnStepFound(dataProgress.stepOptimizing);
    if (step && step.key !== KeyOptimzie.duplicate) {
      return (
        <NotifyOptimizationInfo
          title={t(step.title)}
          des={t(step.desProccess)}
          proccess={newDataOptimize.stats[step.key]?.progress || 0}
        />
      );
    }

    return "";
  }, [newDataOptimize, dataProgress, handleReturnStepFound, t]);
  /** end show notify Proccess  running step */

  /** element show Step finished in Proccess Optimize */
  const eleStepsFinishOptimize = useMemo(() => {
    if (!stepsFinishOptimize.length) return <></>;

    return stepsFinishOptimize.map((item, index) => (
      <NotifyOptimizationStatus
        key={index}
        title={handleReturnStepFound(item)?.title || ""}
        des={t("optimize_theme.notify.status.0")}
        isFail={false}
      />
    ));
  }, [handleReturnStepFound, stepsFinishOptimize, t]);
  /** end element show Step finished in Proccess Optimize */

  return (
    <>
      {dataProgress &&
      !dataProgress.stepFailed.length &&
      dataProgress.stepOptimizing.length ? (
        <NotiCollapsible
          isOpen={isOpenNotify}
          title={displayTitleNotifyCollapsible}
          // isOnProcess={!stepProgressFail || !isOpen}
          onCollapse={handleToggle}
          prependIcon={eleStatusIcon}
        >
          <div className="NotifyOptimizeTheme__list flex flex-col gap-3 pt-3">
            {eleNotifyCopTheme}

            {eleNotifyProccess}

            {eleStepsFinishOptimize}
          </div>
        </NotiCollapsible>
      ) : (
        ""
      )}
    </>
  );
}

export default NotifyOptimizeTheme;
