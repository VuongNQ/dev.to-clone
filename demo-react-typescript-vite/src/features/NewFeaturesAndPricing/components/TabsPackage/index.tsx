import { PLAN_PRICING } from "@swift/constants/constantPlanPricing";
import { useAppSelector } from "@swift/hooks";
import { customerData, getPricingStore } from "@swift/store/global";
import { IntervalPricingType, PlanType } from "@swift/types/planPricing";
import { discountNumber } from "@swift/utils/funcNumber";
import { memo, useMemo } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  LIST_DESCRIPTION_OVERVIEW_BASIC,
  LIST_DESCRIPTION_OVERVIEW_FREE,
  LIST_DESCRIPTION_OVERVIEW_PREMIUM,
  LIST_DESCRIPTION_OVERVIEW_PREMIUM_PLUS,
  LIST_DESCRIPTION_OVERVIEW_SWIFT_EXPERTS,
  LIST_DES_TABLE_PACKAGE,
  TABS_PRICING,
} from "../../constant";
import {
  DiscountMethodCharge,
  IDataPlanTable,
  PricingSpeedPlan,
} from "../../type";
import BoxPreviewPlanPricing from "../BoxPreviewPlanPricing";
import Promotion from "../Promotion";
import SkeletonBoxLoading from "../SkeletonBoxLoading";
import TableViewMorePlan from "../TableViewMorePlan";
import "./styles.scss";
import usePlanPricing from "@swift/hooks/usePlanPricing";
import { Button, Link } from "@shopify/polaris";
import { useDisclosure } from "@swift/hooks/useDisclosure";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import ModalHireExpert from "@swift/components/ModalHireExpert";
import BoxPlanFree from "../BoxPlanFree";

const TabsPackage = memo(function _({
  isToggleAnnual,
  onToggleAnnual,
}: IPropsTabsPackage) {
  const { t } = useTranslation();

  const customer = useAppSelector(customerData);

  const navigate = useNavigate();

  const { URL_ROOT_APP } = usePlanPricing({});

  const pricingStore = useAppSelector(getPricingStore);

  const {
    isOpen: isOpenHireExperts,
    onClose: onCloseHireExperts,
    onOpen: onOpenHireExperts,
  } = useDisclosure({ defaultIsOpen: false });

  const urlRedirectApp = useMemo(
    () => `${URL_ROOT_APP}/pricing?tabs=${TABS_PRICING.package.tabs}`,
    [URL_ROOT_APP]
  );

  const listPlan = useMemo((): PricingSpeedPlan[] => {
    return [
      {
        title: PLAN_PRICING.free.title,
        price: PLAN_PRICING.free.price,
        discount: 0,
        titleFooter: "new_pricing_page.plan_free.title_footer",
        desFooter: "new_pricing_page.plan_free.des_footer",
        listDescription: LIST_DESCRIPTION_OVERVIEW_FREE,
        titleBody: "new_pricing_page.descriptions_overview_free.title",
        plan: PlanType.free,
        buttonCharge: (
          <Promotion
            urlCharge={urlRedirectApp}
            pricePlan={PLAN_PRICING.free.price}
            planName={PlanType.free}
            methodCharge={IntervalPricingType.forever}
          />
        ),
      },
      {
        title: PLAN_PRICING.basic.title,
        price: isToggleAnnual
          ? PLAN_PRICING.basic.price_annual
          : PLAN_PRICING.basic.price,
        discount: isToggleAnnual ? DiscountMethodCharge.discount_yearly : 0,
        titleFooter: "new_pricing_page.plan_basic.title_footer",
        desFooter: "new_pricing_page.plan_basic.des_footer",
        listDescription: LIST_DESCRIPTION_OVERVIEW_BASIC,
        titleBody: "new_pricing_page.descriptions_overview_basic.title",
        plan: PlanType.basic,
        buttonCharge: (
          <Promotion
            urlCharge={urlRedirectApp}
            pricePlan={
              isToggleAnnual
                ? discountNumber(
                    PLAN_PRICING.basic.price_annual,
                    DiscountMethodCharge.discount_yearly
                  )
                : PLAN_PRICING.basic.price
            }
            planName={PlanType.basic}
            methodCharge={
              isToggleAnnual
                ? IntervalPricingType.annual
                : IntervalPricingType.monthly
            }
          />
        ),
      },
      {
        title: PLAN_PRICING.premium.title,
        price: isToggleAnnual
          ? PLAN_PRICING.premium.price_annual
          : PLAN_PRICING.premium.price,
        discount: isToggleAnnual ? DiscountMethodCharge.discount_yearly : 0,
        listDescription: LIST_DESCRIPTION_OVERVIEW_PREMIUM,
        titleBody: "new_pricing_page.descriptions_overview_premium.title",
        titleFooter: "new_pricing_page.plan_premium.title_footer",
        desFooter: "new_pricing_page.plan_premium.des_footer",
        plan: PlanType.premium,
        // isHighligh: true,
        buttonCharge: (
          <Promotion
            urlCharge={urlRedirectApp}
            // isHighligh={true}
            pricePlan={
              isToggleAnnual
                ? discountNumber(
                    PLAN_PRICING.premium.price_annual,
                    DiscountMethodCharge.discount_yearly
                  )
                : PLAN_PRICING.premium.price
            }
            planName={PlanType.premium}
            methodCharge={
              isToggleAnnual
                ? IntervalPricingType.annual
                : IntervalPricingType.monthly
            }
          />
        ),
      },
      {
        title: PLAN_PRICING.premium_plus.title,
        price: isToggleAnnual
          ? PLAN_PRICING.premium_plus.price_annual
          : PLAN_PRICING.premium_plus.price,
        discount: isToggleAnnual ? DiscountMethodCharge.discount_yearly : 0,
        listDescription: LIST_DESCRIPTION_OVERVIEW_PREMIUM_PLUS,
        titleBody: "new_pricing_page.descriptions_overview_premium_plus.title",
        titleFooter: "new_pricing_page.plan_premium_plus.title_footer",
        desFooter: "new_pricing_page.plan_premium_plus.des_footer",
        plan: PlanType.premium_plus,
        isHighligh: true,
        buttonCharge: (
          <Promotion
            urlCharge={urlRedirectApp}
            isHighligh={true}
            pricePlan={
              isToggleAnnual
                ? discountNumber(
                    PLAN_PRICING.premium_plus.price_annual,
                    DiscountMethodCharge.discount_yearly
                  )
                : PLAN_PRICING.premium_plus.price
            }
            planName={PlanType.premium_plus}
            methodCharge={
              isToggleAnnual
                ? IntervalPricingType.annual
                : IntervalPricingType.monthly
            }
          />
        ),
      },
      {
        title: PLAN_PRICING.swift_experts.title,
        price: isToggleAnnual
          ? PLAN_PRICING.swift_experts.price_annual
          : PLAN_PRICING.swift_experts.price,
        listDescription: LIST_DESCRIPTION_OVERVIEW_SWIFT_EXPERTS,
        titleBody: "new_pricing_page.descriptions_overview_swift_experts.title",
        titleFooter: "new_pricing_page.swift_experts.title_footer",
        desFooter: "new_pricing_page.swift_experts.des_footer",
        plan: PlanType.swift_experts,
        buttonCharge: (
          <div className="flex flex-col items-stretch">
            <Button onClick={onOpenHireExperts}>{t("common.btn_hire")}</Button>
          </div>
        ),
        btnFooter: (
          <div className="flex justify-center">
            <Link
              removeUnderline
              onClick={() => {
                navigate("/one-experts");
              }}
            >
              {t("common.btn_learn")}
            </Link>
          </div>
        ),
      },
    ];
  }, [isToggleAnnual, urlRedirectApp, t]);

  const listPlanTable = useMemo(
    (): IDataPlanTable[] => [
      {
        title: listPlan[0].title,
        price: listPlan[0].price,
        discount: listPlan[0].discount,
        buttonCharge: listPlan[0].buttonCharge,
        plan: listPlan[0].plan,
      },
      {
        title: listPlan[1].title,
        price: listPlan[1].price,
        discount: listPlan[1].discount,
        buttonCharge: listPlan[1].buttonCharge,
        plan: listPlan[1].plan,
      },
      {
        title: listPlan[2].title,
        price: listPlan[2].price,
        discount: listPlan[2].discount,
        buttonCharge: listPlan[2].buttonCharge,
        plan: listPlan[2].plan,
      },
      {
        title: listPlan[3].title,
        price: listPlan[3].price,
        discount: listPlan[3].discount,
        buttonCharge: listPlan[3].buttonCharge,
        plan: listPlan[3].plan,
      },
      {
        title: listPlan[4].title,
        price: listPlan[4].price,
        discount: listPlan[4].discount,
        buttonCharge: listPlan[4].buttonCharge,
        plan: listPlan[4].plan,
      },
    ],
    [listPlan]
  );

  const eleLoading = useMemo(
    () =>
      !customer ||
      (typeof pricingStore.trial_days !== "number" && (
        <>
          <SwiperSlide>
            <SkeletonBoxLoading />
          </SwiperSlide>
          <SwiperSlide>
            <SkeletonBoxLoading />
          </SwiperSlide>
          <SwiperSlide>
            <SkeletonBoxLoading />
          </SwiperSlide>
          <SwiperSlide>
            <SkeletonBoxLoading />
          </SwiperSlide>
        </>
      )),
    [customer, pricingStore]
  );

  const eleListBoxPricing = useMemo(() => {
    if (!customer || !(typeof pricingStore.trial_days === "number"))
      return <></>;

    return listPlan.map((item) => {
      if(item.plan === PlanType.free) return <></>
      return (
        <SwiperSlide
          key={item.plan}
          style={{
            height: "initial",
          }}
        >
          <div className="ListPricingPLan__item-pricing h-100">
            <BoxPreviewPlanPricing {...item} isToggleAnnual={isToggleAnnual} />
          </div>
        </SwiperSlide>
      );
    });
  }, [customer, listPlan, isToggleAnnual, pricingStore]);

  return (
    <>
      <div className="TabsPackage__list-pricing">
        <Swiper
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            // when window width is >= 320px
            360: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            // when window width is >= 640px
            640: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            760: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            // when window width is >= 640px
            860: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {eleLoading}
          {eleListBoxPricing}
        </Swiper>
      </div>

      <TableViewMorePlan
        isToggleAnnual={isToggleAnnual}
        onToggleAnnual={onToggleAnnual}
        listPlanHeader={listPlanTable}
        planHighligh={PlanType.premium_plus}
        dataDesTable={LIST_DES_TABLE_PACKAGE}
        listPlanDes={[
          listPlan[0].plan,
          listPlan[1].plan,
          listPlan[2].plan,
          listPlan[3].plan,
          listPlan[4].plan,
        ]}
      >
        <BoxPlanFree />
      </TableViewMorePlan>

      <ModalHireExpert
        isOpen={isOpenHireExperts}
        onClose={onCloseHireExperts}
      />
    </>
  );
});

interface IPropsTabsPackage {
  isToggleAnnual: boolean;
  onToggleAnnual: () => void;
}

export default TabsPackage;
