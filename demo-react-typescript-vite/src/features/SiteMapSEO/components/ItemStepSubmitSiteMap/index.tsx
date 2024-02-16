import { Button, Text } from "@shopify/polaris";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import "./style.scss";
import iconSuccess from "../../assets/icon-success.png";

const ItemStepSubmitSiteMap = memo(function _({
  des,
  img,
  isDisabled,
  isLoading,
  onClickStep,
  statusStep,
  title,
  titleBtn,
  numberOrder,
}: IPropsItemStepSubmitSiteMap) {
  const { t } = useTranslation();

  const eleButtonSuccess = useMemo(
    () => (
      <div className="text-center">
        <img
        className="ItemStepSubmitSiteMap__icon-success"
        src={iconSuccess}
        alt=""
      />
      </div>
    ),
    []
  );

  const eleButtonAction = useMemo(
    () => (
      <div className="ItemStepSubmitSiteMap__btn-connect">
        <Button disabled={isDisabled} loading={isLoading} onClick={onClickStep}>
          {t(titleBtn)}
        </Button>
      </div>
    ),
    [onClickStep, isDisabled, isLoading, t, titleBtn]
  );

  return (
    <div
      className={`ItemStepSubmitSiteMap__item-tasks flex gap-5 justify-between py-5 items-stretch`}
    >
      <div className="flex flex-1 gap-5 flex-wrap items-center">
        <div className={`${img && !statusStep && "height-100"}`}>
          <div
            className={`ItemStepSubmitSiteMap__number-step ${
              statusStep && "active"
            }`}
          >
            {numberOrder}
          </div>
        </div>
        <div>
          <Text as="h3" variant="headingSm">
            {t(title)}
          </Text>

          {des && !statusStep && (
            <Text as="p" variant="bodyMd" color="subdued">
              {t(des)}
            </Text>
          )}

          {img && !statusStep && <img src={img} alt="" className="mt-5" />}
        </div>
      </div>
      {statusStep ? eleButtonSuccess : eleButtonAction}
    </div>
  );
});

interface IPropsItemStepSubmitSiteMap {
  img?: string;
  title: string;
  des?: string;
  numberOrder: number;
  titleBtn: string;
  statusStep: boolean;
  isDisabled: boolean;
  isLoading: boolean;
  onClickStep: () => void;
}

export default ItemStepSubmitSiteMap;
