import { Text } from "@shopify/polaris";
import { PropsWithChildren } from "react";
import iconBack from "@swift/assets/images/general/icon-back.png";
import iconGroup from "@swift/assets/images/general/icon-group.png";
import iconNavi from "@swift/assets/images/general/icon-navi.png";
import iconPlus from "@swift/assets/images/general/icon-plus.png";
import "./styles.scss";

function PreviewBrowser({
  txtUrl,
  children,
  screen  = "desktop",
}: PropsWithChildren<IPropsPreviewBrowser>) {
  return (
    <div className="sw__wp-box">
      <div className="PreviewBrowser__preview flex items-center gap-5 py-2 px-3">
        <div
          className="PreviewBrowser__bar flex gap-5 items-center justify-around"
          style={{
            display: screen === "mobile" ? "none" : "flex",
          }}
        >
          <div className="flex gap-1">
            <div className="PreviewBrowser__circle PreviewBrowser__circle--red"></div>
            <div className="PreviewBrowser__circle PreviewBrowser__circle--yellow"></div>
            <div className="PreviewBrowser__circle PreviewBrowser__circle--green"></div>
          </div>
          <img src={iconNavi} alt="" />
        </div>
        <div className="PreviewBrowser__form-preview flex-1 flex px-3 py-2 items-center w-100">
          <div className="flex-1 txt-one-line">
            <Text as="span" variant="bodySm">
              {txtUrl}
            </Text>
          </div>
          <img src={iconBack} alt="" />
        </div>
        <div
          className="PreviewBrowser__bottom flex gap-5 items-center justify-around"
          style={{
            display: screen === "mobile" ? "none" : "flex",
          }}
        >
          <img src={iconPlus} alt="" />
          <img src={iconGroup} alt="" />
        </div>
      </div>
      {children}
    </div>
  );
}

interface IPropsPreviewBrowser {
  txtUrl: string;
  screen?: "desktop" | "mobile";
}
export default PreviewBrowser;
