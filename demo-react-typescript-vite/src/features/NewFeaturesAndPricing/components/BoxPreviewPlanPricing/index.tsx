import { Card, Icon, Text } from "@shopify/polaris";
import {
  CancelMinor,
  GiftCardMinor,
  StarOutlineMinor,
  TickMinor,
} from "@shopify/polaris-icons";
import { PlanType } from "@swift/types/planPricing";
import { discountNumber } from "@swift/utils/funcNumber";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useFuncPricing } from "../../hooks/useFuncPricing";
import { PricingSpeedPlan } from "../../type";
import "./styles.scss";

const BoxPreviewPlanPricing = memo(function _({
  des,
  listDescription,
  price,
  title,
  iconTitle,
  buttonCharge,
  discount,
  titleFooter,
  desFooter,
  titleBody,
  plan,
  isToggleAnnual,
  isHighligh = false,
  btnFooter
}: PricingSpeedPlan) {
  const { t } = useTranslation();

  const {
    txtUnitPriceMonth,
    txtUnitPriceAnnual,
    txtUnitPriceTicket,
    txtUnitPricePlanFee,
    titleOneTimeCharge
  } = useFuncPricing();

  const pricingDisCount = useMemo(
    () => (discount && Boolean(discount) ? discountNumber(price, discount) : 0),
    [discount]
  );

  const isDiscount = useMemo(() => !!discount, [discount]);

  const titleUnitPrice = useMemo(() => {
    if (plan === PlanType.free) return txtUnitPricePlanFee;

    if (plan === PlanType.swift_experts) return txtUnitPriceTicket;

    if (isToggleAnnual) return txtUnitPriceAnnual;

    if (!isToggleAnnual) return txtUnitPriceMonth;

    return ""
  }, [
    isToggleAnnual,
    plan,
    txtUnitPriceMonth,
    txtUnitPriceAnnual,
    txtUnitPriceTicket,
    txtUnitPricePlanFee,
  ]);

  const bannerFreeTicket = useMemo(() => {
    if (plan !== PlanType.expert_care) return "";

    return (
      <div className="flex gap-2">
        <Icon source={GiftCardMinor} color="success" />
        <div className="flex-1">
          <Text as="span" variant="bodySm" color="success">
            <Text as="span" variant="headingXs" color="success">
              {t("new_pricing_page.banner_promo.0")}
            </Text>{" "}
            {t("new_pricing_page.banner_promo.1")}
          </Text>
        </div>
      </div>
    );
  }, [plan, t]);

  return (
    <div
      className={`BoxPreviewPlanPricing ${
        isHighligh && "BoxPreviewPlanPricing__highlight"
      }`}
    >
      <Card padding="0">
        {isHighligh && (
          <div className="BoxPreviewPlanPricing__badge position-a flex gap-1 px-2 items-center">
            <Icon source={StarOutlineMinor} color="base" />
            <Text as="span" variant="headingXs">
              {t("new_pricing_page.txt_badge_best_price")}
            </Text>
          </div>
        )}
        <div className="BoxPreviewPlanPricing__header flex flex-col px-5 pt-5 pb-2">
          <div className="BoxPreviewPlanPricing__title-header">
            {iconTitle}
            <div className="position-r">
              <Text as="h3" variant="headingMd">
                {t(title)}
              </Text>
            </div>
          </div>
          {des && (
            <Text as="p" alignment="center" variant="bodyMd" color="subdued">
              {t(des)}
            </Text>
          )}
        </div>

        <div className="BoxPreviewPlanPricing__body flex flex-1 flex-col">
          {/* box pricing */}
          <div className="BoxPreviewPlanPricing__wrapper-pricing flex flex-col">
            <div className="BoxPreviewPlanPricing__box-pricing flex gap-2 items-baseline flex-col px-5 pb-3">
              <div className="flex items-end">
                <div className="BoxPreviewPlanPricing__num-pricing">
                  <Text
                    as="h2"
                    variant="heading4xl"
                    color={isHighligh ? "success" : undefined}
                  >
                    {isDiscount
                      ? `$${Math.floor(pricingDisCount / 12)}`
                      : `$${price}`}
                  </Text>
                </div>
                <Text as="span" variant="bodyMd" color="subdued">
                  {plan !== PlanType.free
                    ? isDiscount
                      ? txtUnitPriceMonth
                      : titleUnitPrice
                    : ""}
                </Text>
              </div>

              {plan === PlanType.free && isToggleAnnual && (
                <Text as="span" variant="bodySm">
                  {titleUnitPrice}
                </Text>
              )}

              {plan === PlanType.swift_experts && isToggleAnnual && (
                <Text as="span" variant="bodySm">
                  {titleOneTimeCharge}
                </Text>
              )}

              <div>
                {isDiscount && (
                  <p className="BoxPreviewPlanPricing__discount">
                    <del>${price}</del> ${pricingDisCount} {titleUnitPrice}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* end box pricing */}

          {/* box button charge plan  */}
          <div className="px-5 py-3">{buttonCharge}</div>
          {/*end box button charge plan  */}

          {/* box des pricing  */}
          <div className="BoxPreviewPlanPricing__wrapper-review pt-3 flex-1 px-5 py-3 gap-2">
            <Text as="span" variant="headingXs" color="success">
              {t(titleBody)}
            </Text>
            <div className="BoxPreviewPlanPricing__list-review flex flex-col gap-2">
              {listDescription.map((item) => (
                <div
                  key={item.title}
                  className="BoxPreviewPlanPricing__item-review flex gap-2"
                >
                  {item.isTick ? (
                    <Icon source={TickMinor} color="success" />
                  ) : (
                    <Icon source={CancelMinor} color="critical" />
                  )}

                  <div className="flex-1 over-hidden">
                    <Text as="span" variant="bodySm">
                      {t(item.title)}
                    </Text>
                  </div>
                </div>
              ))}
              {bannerFreeTicket}
            </div>
          </div>
          {/* end des box pricing */}
        </div>

        <div className="BoxPreviewPlanPricing__footer flex flex-col gap-2 px-5 py-3">
          {titleFooter && (
            <Text as="h3" alignment="start" variant="headingXs">
              {t(titleFooter)}
            </Text> 
          )}

          {desFooter && (
            <Text as="p" variant="bodyMd" alignment="start" color="subdued">
              {t(desFooter)}
            </Text>
          )}
          
          {btnFooter && btnFooter}
        </div>
      </Card>
    </div>
  );
});

export default BoxPreviewPlanPricing;
