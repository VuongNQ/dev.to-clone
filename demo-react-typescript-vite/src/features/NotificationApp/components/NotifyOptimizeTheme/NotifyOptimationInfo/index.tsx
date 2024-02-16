import { memo } from "react";
import gifCopyProgress from "../../../assets/gif-copy-progress.gif"
import gifOptimizingProgress from "../../../assets/gif-optimizing-progress.gif"

const NotifyOptimizationInfo = memo(function NotifyOptimizationInfo({
  title,
  des,
  isCopy = false,
}: {
  title: string;
  des: string;
  proccess: number;
  isCopy?: boolean;
}) {
  return (
    <div className="NotifyOptimation__box">
      <div className="NotifyOptimation__content">
        <div className="NotifyOptimation__header">
          <span className="NotifyOptimation__title">{title}</span>
          {/* <div className="NotifyOptimation__wrapper-lottie">
            <div className="NotifyOptimation__lottie">
              <lottie-player
                src={
                  isCopy
                    ? "https://assets5.lottiefiles.com/packages/lf20_7PhD2J.json"
                    : "https://assets7.lottiefiles.com/packages/lf20_p8bfn5to.json"
                }
                background="transparent"
                speed={1}
                style={{
                  width: isCopy ? "66.36px" : "90.36px",
                  height: isCopy ? "58px" : "73px",
                }}
                loop
                autoplay
                keepLastFrame={true}
              />
            </div>
          </div> */}
          <div className="NotifyOptimation__wrapper-lottie">
          <img className={`NotifyOptimation__img ${isCopy ? 'NotifyOptimation__img--copy' : "NotifyOptimation__img--optimizing"}`} src={isCopy ? gifCopyProgress : gifOptimizingProgress} alt="" />
          </div>
       
        </div>
        <p className="NotifyOptimation__des">{des}</p>
      </div>
    </div>
  );
}) 

export default NotifyOptimizationInfo;
