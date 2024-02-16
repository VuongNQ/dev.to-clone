import { useState, useEffect, SVGProps, FunctionComponent } from "react";
import logoSm from "../../assets/logo-sm.svg";
import { FormCustomImageType, keyScreen } from "../../type";

const DEFAULT_IMG = ["logo-sm.svg"];

function PreviewCustomImageDemo({
  formCustomImage,
  screen,
  durationTime = 3,
}: {
  formCustomImage: FormCustomImageType;
  screen: keyScreen;
  durationTime: number;
}) {
  const [image, setImage] = useState<
    string | FunctionComponent<SVGProps<SVGSVGElement>> | object
  >(formCustomImage.imgUrl);

  useEffect(() => {
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(image as string);
  }, []);
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    /**  set formCustomImage to image default */
    if (
      !formCustomImage.imgUrl ||
      (typeof formCustomImage.imgUrl === "string" &&
        DEFAULT_IMG.includes(formCustomImage.imgUrl))
    ) {
      if (image === DEFAULT_IMG[0]) return;

      setImage(DEFAULT_IMG[0]);
    } else {
      /** if formCustomImage.imgUrl is file use createObjectURL , is string url   */
      if (typeof formCustomImage.imgUrl === "object") {
        const objectUrl = URL.createObjectURL(formCustomImage.imgUrl);
        setImage(objectUrl);
        return;
      }

      if (image !== formCustomImage.imgUrl) {
        setImage(formCustomImage.imgUrl);
      }
    }
  }, [formCustomImage.imgUrl]);

  return (
    <div
      className={`${screen}-preview`}
      style={{
        zIndex: 10,
        order: formCustomImage.positionIndex,
      }}
    >
      <div className="swift-custom-img">
        {/* {image === DEFAULT_IMG[0] ? (
                    <LogoSm
                        className={`${formCustomImage.size} ${formCustomImage.animation
                            }-${durationTime} ${formCustomImage.isRepeat ? 'infinite' : ''
                            }`}
                    />
                ) : (
                    <img
                        loading="lazy"
                        className={`${formCustomImage.size} ${formCustomImage.animation
                            }-${durationTime} ${formCustomImage.isRepeat ? 'infinite' : ''
                            }`}
                        src={image === DEFAULT_IMG[0] ? logoSm : image as string}
                        alt=""
                    />
                )} */}
        <img
          loading="lazy"
          className={`${formCustomImage.size} ${
            formCustomImage.animation
          }-${durationTime} ${formCustomImage.isRepeat ? "infinite" : ""}`}
          src={image === DEFAULT_IMG[0] ? logoSm : (image as string)}
          alt=""
        />
      </div>
    </div>
  );
}

export default PreviewCustomImageDemo;
