import parse from "html-react-parser";
import { useMemo } from "react";
import { LIST_ICONS_LOADING } from "../../constants";
import { FormLoadingIconType, keyScreen } from "../../type";
import styled from "styled-components";

interface IWrapperLoading {
  icon: string;
  color: string;
}

const WrapperLoading = styled.div<IWrapperLoading>`
  color: ${(props) => props.color};

  ${({ color, icon }) => {
    if (icon === "lds-facebook" || icon === "lds-default") {
      return `.${icon} div{
                background: ${color};
            }`;
    }

    if (icon === "lds-ring") {
      return `.${icon} div{
                border-color: ${color} transparent transparent transparent;
            }`;
    }

    if (icon === "lds-dual-ring") {
      return `.${icon}:after{
                border-color: ${color} transparent  ${color} transparent;
            }`;
    }

    if (icon === "lds-ellipsis") {
      return `.${icon} circle{
                fill: currentColor
            }`;
    }
  }}
`;

interface PreviewLoadingIcontype {
  formLoadingIcon: FormLoadingIconType;
  screen: keyScreen;
}

function PreviewLoadingIconDemo({
  formLoadingIcon,
  screen = "desktop",
}: PreviewLoadingIcontype) {
  const currentIcon = useMemo(() => {
    const findIcon = LIST_ICONS_LOADING.find(
      (icon) => formLoadingIcon.icon == icon.key
    );

    if (!findIcon) {
      return LIST_ICONS_LOADING[0];
    }

    return findIcon;
  }, [formLoadingIcon]);

  return (
    <div
      style={{
        zIndex: 10,
        order: formLoadingIcon.positionIndex,
      }}
      className={`preview-loading-icon preview-loading-icon__${screen} ${formLoadingIcon.size}`}
    >
      <div className={`preview-icon-${currentIcon.key}`}>
        <WrapperLoading
          color={formLoadingIcon ? formLoadingIcon.background : "#5062E9"}
          icon={currentIcon.key}
        >
          {currentIcon.key === "dog-spinner" ||
          currentIcon.key === "cat-spinner" ? (
            <img loading="lazy" src={currentIcon.code} />
          ) : (
            parse(currentIcon.code)
          )}
        </WrapperLoading>
      </div>
    </div>
  );
}

export default PreviewLoadingIconDemo;
