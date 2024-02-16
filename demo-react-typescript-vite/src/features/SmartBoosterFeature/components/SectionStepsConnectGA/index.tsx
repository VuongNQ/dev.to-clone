import { Text } from "@shopify/polaris";
import "./styles.scss";
import { LegacyRef } from "react";
import { useTranslation } from "react-i18next";

function SectionStepsConnectGA({
  refStepConnectGA,
}: IPropsSectionStepsConnectGA) {
  const { t } = useTranslation();

  return (
    <div className="SectionStepsConnectGA sw__wp-box">
      <div className="SectionStepsConnectGA__header p-5">
        <Text as="h3" variant="headingMd">
          {t("smart_booster_page.section_step.title")}
        </Text>
      </div>

      <div className="SectionStepsConnectGA__video" ref={refStepConnectGA}>
        <video
          width="100%"
          height="100%"
          controls
          src="https://static-swift.perfectapps.io/default/364228902_6540323566050149_2705982315279058218_n.mp4"
        ></video>

        {/* <iframe
          // width="100%"
          // height="100%"
          src="https://static-swift.perfectapps.io/default/364228902_6540323566050149_2705982315279058218_n.mp4"
          title="YouTube video player"
          allow="fullscreen accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        ></iframe> */}
      </div>
    </div>
  );
}

interface IPropsSectionStepsConnectGA {
  refStepConnectGA: LegacyRef<HTMLDivElement> | undefined;
}

export default SectionStepsConnectGA;
