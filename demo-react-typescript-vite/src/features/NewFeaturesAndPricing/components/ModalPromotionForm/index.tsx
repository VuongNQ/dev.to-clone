import { Banner, Button, Icon, Modal, Text, TextField } from "@shopify/polaris";
import { CancelMinor } from "@shopify/polaris-icons";
import { PLAN_PRICING } from "@swift/constants/constantPlanPricing";
import { useAppSelector } from "@swift/hooks";
import { usePricingApiService } from "@swift/services/pricingApi";
import { customerData, getPricingStore } from "@swift/store/global";
import {
  ETypePromotionCode,
  IDataPromotionCode,
  IntervalPricingType,
  PlanType,
} from "@swift/types/planPricing";
import { handleTotalPriceByPercenNumber } from "@swift/utils/funcNumber";
import { useMutation } from "@tanstack/react-query";
import parse from "html-react-parser";
import { KeyboardEvent, memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";

const INIT_FORM_DATA: IFormDataType = {
  newTotal: null,
  promotionCode: null,
  discount: null,
  typePromotion: null,
};

const ModalPromotionForm = memo(function _({
  isOpen = false,
  onClose,
  pricePlan,
  interval,
  planName,
  onChargePlan,
  isLoadingCharge,
}: IPropsModalPromotionFormType) {
  const { t } = useTranslation();

  const { checkPromotionCode } = usePricingApiService();

  const pricingStore = useAppSelector(getPricingStore);

  const customer = useAppSelector(customerData);

  const [formData, setFormData] = useState<IFormDataType>(INIT_FORM_DATA);

  const [formState, setFormState] = useState<boolean>(false);
  const [formValidate, setFormValidate] = useState<string | null>(null);
  const [dataInput, setDataInput] = useState<string>("");

  const [isShowBanner, setIsShowBanner] = useState<boolean>(true);

  /** apply code */
  const { mutate: onApplyCode, isLoading: isLoadingApplyCode } = useMutation({
    mutationFn: async () => {
      const storeId = customer?.id ? customer?.id : 0;
      return await checkPromotionCode(dataInput, storeId, planName);
    },
    onSuccess: (res) => {
      const { status, data, errors } = res;

      if (status && data) {
        handleDiscountTotalPrice({
          code: dataInput,
          promotion: data.promotion,
        });
        setFormState(false);
      } else {
        handleMessageErrorFormValidate(errors?.type);
        setFormData(INIT_FORM_DATA);
      }
    },
  });

  const onToggleBanner = useCallback(() => {
    setIsShowBanner((preValue) => !preValue);
  }, []);

  const handleValidateForm = useCallback(
    (value: string) => {
      if (value === "") {
        setFormValidate(
          t("new_pricing_page.modal_promotion_component.error_0")
        );
      } else {
        setFormValidate(null);
      }
    },
    [t]
  );

  /* apply promotion code  */
  const onSubmitForm = useCallback(() => {
    const isValidateForm = true;
    handleValidateForm(dataInput);

    if (formData.promotionCode && dataInput === formData.promotionCode) {
      return;
    }

    if (formState !== isValidateForm) {
      setFormState(isValidateForm);
    }

    if (isValidateForm && formValidate === null && dataInput !== "") {
      onApplyCode();
    }
  }, [
    dataInput,
    formData.promotionCode,
    formState,
    formValidate,
    handleValidateForm,
    onApplyCode,
  ]);

  /* apply promotion code when envent enter */
  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 13) {
      onSubmitForm();
    }
  };

  /* handle return message error api */
  const handleMessageErrorFormValidate = useCallback(
    (typeError?: number) => {
      if (!typeError) return;

      setFormValidate(
        t(
          "new_pricing_page.modal_promotion_component." +
            `${typeError}`.toLocaleLowerCase()
        )
      );
    },
    [t]
  );
  /* handle return message error api */

  /* handle calculator total price when add promotion code success */
  const handleDiscountTotalPrice = useCallback(
    (payload: { code: string; promotion: IDataPromotionCode }) => {
      const { code, promotion } = payload;

      if (promotion.type === ETypePromotionCode.percent) {
        const newTotalPrice = handleTotalPriceByPercenNumber(
          pricePlan,
          promotion.value
        );

        setFormData({
          newTotal: newTotalPrice,
          promotionCode: code,
          discount: promotion.value,
          typePromotion: promotion.type,
        });
        return;
      }

      if (promotion.type === ETypePromotionCode.fixed_amount) {
        const newTotalPrice = pricePlan - promotion.value;

        setFormData({
          newTotal: newTotalPrice,
          promotionCode: code,
          discount: promotion.value,
          typePromotion: promotion.type,
        });
        return;
      }
    },
    [pricePlan]
  );
  /*end handle calculator total price when add promotion code success */

  /* handle cancel use promotion code */
  const onCancelPromotion = useCallback(() => {
    setFormData({
      ...formData,
      newTotal: null,
      promotionCode: null,
      discount: null,
    });
  }, []);
  /*end handle cancel use promotion code */

  /** handle reset modal like the first time */
  const handleResetModal = useCallback(() => {
    setFormData(INIT_FORM_DATA);

    if (formState !== false) {
      setFormState(false);
    }

    if (dataInput !== "") {
      setDataInput("");
    }
  }, [dataInput, formState]);
  /**end handle reset modal like the first time */


  const onCloseModal = useCallback(() =>{
    onClose && onClose()
    handleResetModal()
  },[handleResetModal, onClose])

  const onCharge = useCallback(async () => {
    const code = formData.promotionCode || "";
    await onChargePlan({ code: code });
    // handleResetModal();
  }, [formData.promotionCode, onChargePlan]);

  const eleBannerNote = useMemo(
    () =>
      isShowBanner ? (
        <div className=" ModalPromotionForm__footer">
          <Banner onDismiss={onToggleBanner}>
            <p>{t("new_pricing_page.modal_promotion_form.banner.des")}</p>
          </Banner>
        </div>
      ) : (
        <></>
      ),
    [isShowBanner, onToggleBanner, t]
  );

  return (
    <Modal
      small
      open={isOpen}
      onClose={onCloseModal}
      title={t("new_pricing_page.modal_promotion_form.title")}
      primaryAction={{
        content: `${t("common.btn_check_out")}`,
        onAction: onCharge,
        loading: isLoadingCharge,
      }}
      secondaryActions={[
        {
          content: `${t("common.btn_cancel")}`,
          onAction: onCloseModal,
        },
      ]}
    >
      <div className="ModalPromotionForm__main">
        <div
          className="ModalPromotionForm__row ModalPromotionForm__box-form"
          onKeyDown={handleKeyPress}
        >
          <TextField
            label=""
            value={dataInput}
            placeholder={t("new_pricing_page.modal_promotion_form.plaholder")}
            readOnly={formData.promotionCode ? true : false}
            maxLength={225}
            onChange={(event) => {
              setDataInput(event);
              if (formState) {
                handleValidateForm(event);
              }
            }}
            error={formState && formValidate ? parse(formValidate) : ""}
            autoComplete="off"
            connectedRight={
              <Button
                loading={isLoadingApplyCode}
                onClick={onSubmitForm}
                primary
                disabled={formData.promotionCode ? true : false}
              >
                {t("new_pricing_page.modal_promotion_form.btn_apply")}
              </Button>
            }
          />
        </div>

        <div className=" p-5 sw__wp-box">
          <div className="ModalPromotionForm__box-plan flex flex-col gap-4 pb-5">
            <div className="ModalPromotionForm__row-price">
              <Text as="span" variant="bodyMd" color="subdued">
                {t("new_pricing_page.modal_promotion_form.infor_price.0.col1")}
              </Text>
              <Text as="span" variant="headingMd">
                {t(PLAN_PRICING[planName].title)}
              </Text>
            </div>
            <div className="ModalPromotionForm__row-price">
              <Text as="span" variant="bodyMd" color="subdued">
                {t("new_pricing_page.modal_promotion_form.infor_price.1.col1")}
              </Text>
              <div className="ModalPromotionForm__price-col2">
                <Text as="span" variant="headingMd">
                  {`$${pricePlan}`}
                </Text>
                <sub>
                  /{" "}
                  {interval && interval === "annual"
                    ? t("new_pricing_page.common.txt_annually")
                    : t("new_pricing_page.common.text_monthly")}
                </sub>
              </div>
            </div>
            <div className="ModalPromotionForm__row-price">
              <Text as="span" variant="bodyMd" color="subdued">
                {t("new_pricing_page.modal_promotion_form.infor_price.2.col1")}
              </Text>
              <Text as="span" variant="headingMd">
                {pricingStore.trial_days}{" "}
                {t("new_pricing_page.modal_promotion_form.infor_price.2.col2")}
              </Text>
            </div>
          </div>
          <div className="ModalPromotionForm__box-promo-code pt-5 flex gap-3 justify-between items-center">
            <div className="ModalPromotionForm__promo-left">
              <Text as="span" variant="bodyMd" color="subdued">
                {t("new_pricing_page.modal_promotion_form.infor_price.3.col1")}
              </Text>
              {formData.promotionCode ? (
                <div className="ModalPromotionForm__promo-discount pl-2 pr-1 py-1">
                  <Text as="span" variant="bodySm">
                    {formData.promotionCode}
                  </Text>
                  <a onClick={onCancelPromotion}>
                    <Icon source={CancelMinor} color="base" />
                  </a>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="ModalPromotionForm__promo-right">
              -{formData.promotionCode ? formData.discount + "%" : ""}
            </div>
          </div>
        </div>

        <div className=" ModalPromotionForm__box-total">
          <Text as="span" variant="heading2xl">
            {t("new_pricing_page.modal_promotion_form.infor_price.4.col1")}
          </Text>
          <Text as="span" variant="heading2xl" color="success">
            ${formData.promotionCode ? formData.newTotal : pricePlan}
          </Text>
        </div>

        {eleBannerNote}
      </div>
    </Modal>
  );
});

interface IFormDataType {
  newTotal: number | null;
  promotionCode: string | null;
  discount: number | null;
  typePromotion: ETypePromotionCode | null;
}

interface IPropsModalPromotionFormType {
  isOpen: boolean;
  onClose: () => void;
  planName: PlanType;
  onChargePlan: ({ code }: { code: string }) => void;
  pricePlan: number;
  interval: IntervalPricingType;
  isLoadingCharge: boolean;
}

export default ModalPromotionForm;
