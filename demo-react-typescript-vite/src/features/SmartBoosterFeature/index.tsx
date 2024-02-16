import { queryKeys } from "@swift/queryKeys";
import { useSmartBoosterService } from "@swift/services/smartBoosterApi";
import { KeyStepConnectGoogle, KeyStepGA } from "@swift/types/smartBooster";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useRef } from "react";
import SWSectionConnectGA from "./components/SWSectionConnectGA";
import SWSectionConnectGoogle from "./components/SWSectionConnectGoogle";
import SWSectionDisConnectGA from "./components/SWSectionDisConnectGA";
import SWSectionReportCountry from "./components/SWSectionReportChart";
import SectionStepsConnectGA from "./components/SectionStepsConnectGA";
import TableOverViewReportGA from "./components/TableOverViewReportGA";
import { SkeletonBodyText } from "@shopify/polaris";
import useFuncSmartBooster from "./hooks/useFuncSmartBooster";
import StatusActiveExtensionApp from "@swift/components/StatusActiveExtensionApp";

const SmartBoosterFeature = () => {
  const { getSettingGA } = useSmartBoosterService();

  const { isAcceptUserFeature } = useFuncSmartBooster();

  const refStepConnectGA = useRef<HTMLTableElement | null>(null);

  const { data: infoDataGA, isLoading: isLoadingGetInfoDataGA } = useQuery({
    ...queryKeys.smartBoosterQueryKey.getSettingGA(),
    // refetchOnWindowFocus: true,
    queryFn: async () => {
      const { data, status } = await getSettingGA();
      if (status && data.length) {
        const newData = data[0];
        return newData;
      }
      return null;
    },
  });

  const onFocusStepConnectGA = useCallback(() => {
    if (refStepConnectGA.current) {
      refStepConnectGA.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [refStepConnectGA]);

  const eleOperationGA = useMemo(() => {
    if (isLoadingGetInfoDataGA && isAcceptUserFeature)
      return (
        <div className="sw__wp-box mb-5 p-5">
          <SkeletonBodyText lines={5} />
        </div>
      );

    if (
      isAcceptUserFeature &&
      infoDataGA &&
      infoDataGA.setting.is_connected === KeyStepConnectGoogle.connected
    )
      return (
        <>
          <SWSectionDisConnectGA />
          <SWSectionConnectGA />
        </>
      );
    return <SWSectionConnectGoogle onOpenCollapse={onFocusStepConnectGA} />;
  }, [infoDataGA, isAcceptUserFeature, isLoadingGetInfoDataGA, onFocusStepConnectGA]);

  const eleReport = useMemo(() => {
    if (!infoDataGA || !isAcceptUserFeature) return <></>;
    if (infoDataGA.setting.step !== KeyStepGA.connectedFinish) return <></>;

    return (
      <>
        <SWSectionReportCountry />
        <TableOverViewReportGA />
      </>
    );
  }, [infoDataGA, isAcceptUserFeature]);

  const eleClipConnectGA = useMemo(() => {
    if (isAcceptUserFeature && infoDataGA && infoDataGA.setting.step === KeyStepGA.connectedFinish)
      return <></>;

    return <SectionStepsConnectGA refStepConnectGA={refStepConnectGA} />;
  }, [infoDataGA, isAcceptUserFeature]);

  return (
    <div className="p-5 flex flex-col gap-5">
      {eleOperationGA}
      <StatusActiveExtensionApp extension="speed" />
      {eleReport}
      {eleClipConnectGA}
    </div>
  );
};

export default SmartBoosterFeature;
