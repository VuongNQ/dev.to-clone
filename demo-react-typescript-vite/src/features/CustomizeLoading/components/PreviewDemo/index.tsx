import { Icon } from "@shopify/polaris";
import { DesktopMajor, MobileMajor } from "@shopify/polaris-icons";
import { useContext, useEffect, useMemo, useState } from "react";

// import customLoadingDesktop from "../../assets/custom-loading-desktop.png";
// import customLoadingPhone from "../../assets/custom-loading-phone.png";
import noImgBackground from "../../assets/no-img-background.svg";
import "./styles.scss";

import { isArrayContains } from "@swift/utils/arrayFunc";
import { CustomLoadingContext } from "../../context/ContextCustomLoading";
import { StyleCustomizeLoadingActiveContext } from "../../context/StyleCustomActiveContext";
import { keyScreen } from "../../type";
import PreviewCustomImageDemo from "../PreviewCustomImageDemo";
import PreviewLoadingIconDemo from "../PreviewLoadingIconDemo";
import PreviewPercentageCounterDemo from "../PreviewPercentageCounterDemo";
import PreviewProgressBarDemo from "../PreviewProgressBarDemo";
import PreviewTextDemo from "../PreviewTextDemo";
import PreviewBrowser from "@swift/components/UIs/PreviewBrowser";
import { useAppSelector } from "@swift/hooks";
import { customerData } from "@swift/store/global";

let autoProcess: NodeJS.Timeout | undefined = undefined;

interface IPropsPreviewType {
  runDemo: () => void;
}

function PreviewDemo({ runDemo }: IPropsPreviewType) {
  const { state } = useContext(CustomLoadingContext);

  const customer = useAppSelector(customerData);

  const { styleCustomizeLoadingActive } = useContext(
    StyleCustomizeLoadingActiveContext
  );

  const [preview, setPreview] = useState<undefined | string>(noImgBackground);
  const [screen, setScreen] = useState<keyScreen>("desktop");
  const [autoPercent, setAutoPercent] = useState<number>(0);

  const txtUrl = useMemo(() => `${customer?.domain}`, [customer?.domain]);

  /** handle change screen  */
  const onChangeScreen = (value: keyScreen) => {
    setScreen(value);
  };

  useEffect(() => {
    return () => {
      // free memory when ever this component is unmounted
      URL.revokeObjectURL(preview as string);
    };
  }, []);

  useEffect(() => {
    if (styleCustomizeLoadingActive.background.type !== "image") {
      setPreview(undefined);
      return;
    }

    /**if background.src exist continue, else set image = noImgBackground   */
    if (styleCustomizeLoadingActive.background.src) {
      /**if image type string image = url , else use createObjectURL  */
      if (typeof styleCustomizeLoadingActive.background.src === "string") {
        setPreview(styleCustomizeLoadingActive.background.src);
      } else {
        const objectUrl = URL.createObjectURL(
          styleCustomizeLoadingActive.background.src
        );
        setPreview(objectUrl);
      }
    } else {
      setPreview(noImgBackground);
    }
  }, [styleCustomizeLoadingActive]);

  /**run progress Bar or counter */
  useEffect(() => {
    const componentsDisplay = styleCustomizeLoadingActive.componentsDisplay;

    const isFormProgressBar = isArrayContains(
      componentsDisplay,
      "formProgressBar"
    );
    const isFormPercentage = isArrayContains(
      componentsDisplay,
      "formPercentage"
    );

    if (isFormPercentage || isFormProgressBar) {
      progressBarInterval();
    }
  }, [runDemo]);

  /**run progress bar or counter */
  const progressBarInterval = () => {
    clearInterval(autoProcess);
    const durationTime = state.settings.duration_time || 3;
    let autoPercent = 0;
    autoProcess = setInterval(() => {
      if (autoPercent < 100) {
        autoPercent += 1;
        setAutoPercent(autoPercent);
      }
      if (autoPercent >= 100) {
        clearInterval(autoProcess);
      }
    }, durationTime * 10);
  };

  return (
    <div className="CustomizeLoading-Preview">
    <div 
          style={{
            width: screen === "desktop" ? "100%" : "150px",
            margin:"0 auto"
          }}
        >
          <PreviewBrowser txtUrl={txtUrl} screen={screen}>
            <div className="CustomizeLoading-Preview__body">
              <div className="CustomizeLoading-Preview__wrapper-demo">
                <div className="CustomizeLoading-Preview__demo">
                  {/* <img
                loading="lazy"
                style={{
                  display: screen === "desktop" ? "initial" : "none",
                }}
                src={customLoadingDesktop}
                alt="custom Loading Desktop"
              />

              <img
                loading="lazy"
                style={{
                  display: screen === "mobile" ? "initial" : "none",
                }}
                src={customLoadingPhone}
                alt="custom loading phone"
              /> */}

                  {state.isDemo ? (
                    <div
                      className="CustomizeLoading-Preview__demo-loading"
                      style={{
                        backgroundColor:
                          styleCustomizeLoadingActive.background.type ===
                          "color"
                            ? styleCustomizeLoadingActive.background.color
                            : "#fff",
                      }}
                    >
                      {styleCustomizeLoadingActive.background.type ===
                      "image" ? (
                        <div className="CustomizeLoading-Preview__demo-imgage">
                          <img
                            loading="lazy"
                            src={preview}
                            alt="background image"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                      {isArrayContains(
                        styleCustomizeLoadingActive.componentsDisplay,
                        "formLoadingIcon"
                      ) ? (
                        <PreviewLoadingIconDemo
                          screen={screen}
                          formLoadingIcon={
                            styleCustomizeLoadingActive.formLoadingIcon
                          }
                        />
                      ) : (
                        ""
                      )}
                      {isArrayContains(
                        styleCustomizeLoadingActive.componentsDisplay,
                        "formText"
                      ) ? (
                        <PreviewTextDemo
                          screen={screen}
                          formText={styleCustomizeLoadingActive.formText}
                        />
                      ) : (
                        ""
                      )}
                      {isArrayContains(
                        styleCustomizeLoadingActive.componentsDisplay,
                        "formPercentage"
                      ) ? (
                        <PreviewPercentageCounterDemo
                          percent={autoPercent}
                          screen={screen}
                          formPercentage={
                            styleCustomizeLoadingActive.formPercentage
                          }
                        />
                      ) : (
                        ""
                      )}
                      {isArrayContains(
                        styleCustomizeLoadingActive.componentsDisplay,
                        "formProgressBar"
                      ) ? (
                        <PreviewProgressBarDemo
                          percent={autoPercent}
                          screen={screen}
                          formProgressBar={
                            styleCustomizeLoadingActive.formProgressBar
                          }
                        />
                      ) : (
                        ""
                      )}
                      {isArrayContains(
                        styleCustomizeLoadingActive.componentsDisplay,
                        "formCustomImage"
                      ) ? (
                        <PreviewCustomImageDemo
                          durationTime={state.settings.duration_time}
                          screen={screen}
                          formCustomImage={
                            styleCustomizeLoadingActive.formCustomImage
                          }
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </PreviewBrowser>
        </div>

      <div className="flex items-center justify-center pt-5">
        <div>
          <button
            className={screen === "desktop" ? "button--active" : ""}
            onClick={() => {
              onChangeScreen("desktop");
              runDemo && runDemo();
            }}
          >
            <Icon source={DesktopMajor} color="base" />
          </button>
          <button
            className={screen === "mobile" ? "button--active" : ""}
            onClick={() => {
              onChangeScreen("mobile");
              runDemo && runDemo();
            }}
          >
            <Icon source={MobileMajor} color="base" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreviewDemo;
