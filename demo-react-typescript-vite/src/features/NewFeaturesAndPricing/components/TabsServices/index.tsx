import { PLAN_PRICING } from "@swift/constants/constantPlanPricing";
import { useAppSelector } from "@swift/hooks";
import { customerData, getPricingStore } from "@swift/store/global";
import { IntervalPricingType, PlanType } from "@swift/types/planPricing";
import { discountNumber } from "@swift/utils/funcNumber";
import { memo, useMemo } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button, Link } from "@shopify/polaris";
import ModalHireExpert from "@swift/components/ModalHireExpert";
import { useDisclosure } from "@swift/hooks/useDisclosure";
import usePlanPricing from "@swift/hooks/usePlanPricing";
import { useTranslation } from "react-i18next";
import {
    LIST_DESCRIPTION_OVERVIEW_EXPERT_CARE,
    LIST_DESCRIPTION_OVERVIEW_SWIFT_EXPERTS,
    LIST_DES_TABLE_SERVICES,
    TABS_PRICING,
} from "../../constant";
import {
    DiscountMethodCharge,
    IDataPlanTable,
    PricingSpeedPlan,
} from "../../type";
import BoxPreviewPlanPricing from "../BoxPreviewPlanPricing";
import Promotion from "../Promotion";
import SectionAboutExperts from "../SectionAboutExperts";
import SkeletonBoxLoading from "../SkeletonBoxLoading";
import TableViewMorePlan from "../TableViewMorePlan";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import useCrispChat from "@swift/hooks/useCrispChat";

const TabsServices = memo(function _({
    isToggleAnnual,
    onToggleAnnual,
}: IPropsTabsServices) {
    const { t } = useTranslation();

    const customer = useAppSelector(customerData);

    const navigate = useNavigate();

    const pricingStore = useAppSelector(getPricingStore);

    const { URL_ROOT_APP } = usePlanPricing({});

    const { onContactSupport } = useCrispChat();

    const urlRedirectApp = useMemo(
        () => `${URL_ROOT_APP}/pricing?tabs=${TABS_PRICING.services.tabs}`,
        [URL_ROOT_APP]
    );

    const {
        isOpen: isOpenHireExperts,
        onClose: onCloseHireExperts,
        onOpen: onOpenHireExperts,
    } = useDisclosure({ defaultIsOpen: false });

    const buttonChargeExpertCare = useMemo(() => {
        if (pricingStore.has_expert_ticket || isToggleAnnual)
            return (
                <Promotion
                    urlCharge={urlRedirectApp}
                    pricePlan={
                        isToggleAnnual
                            ? discountNumber(
                                  PLAN_PRICING.expert_care.price_annual,
                                  DiscountMethodCharge.discount_yearly
                              )
                            : PLAN_PRICING.expert_care.price
                    }
                    planName={PlanType.expert_care}
                    methodCharge={
                        isToggleAnnual
                            ? IntervalPricingType.annual
                            : IntervalPricingType.monthly
                    }
                />
            );

        return (
            <div className="flex flex-col">
                <Button
                    onClick={() => {
                        onContactSupport(
                            "Please guide me on subscribing to Expert Care"
                        );
                    }}
                >
                    {t("common.btn_contact")}
                </Button>
            </div>
        );
    }, [
        isToggleAnnual,
        onContactSupport,
        pricingStore.has_expert_ticket,
        t,
        urlRedirectApp,
    ]);

    const listPlan = useMemo((): PricingSpeedPlan[] => {
        return [
            {
                title: PLAN_PRICING.expert_care.title,
                price: isToggleAnnual
                    ? PLAN_PRICING.expert_care.price_annual
                    : PLAN_PRICING.expert_care.price,
                discount: isToggleAnnual
                    ? DiscountMethodCharge.discount_yearly
                    : 0,
                listDescription: LIST_DESCRIPTION_OVERVIEW_EXPERT_CARE,
                titleBody:
                    "new_pricing_page.descriptions_overview_expert_care.title",
                titleFooter: "new_pricing_page.plan_expert_care.title_footer",
                desFooter: "new_pricing_page.plan_expert_care.des_footer",
                plan: PlanType.expert_care,
                buttonCharge: buttonChargeExpertCare,
            },
            {
                title: PLAN_PRICING.swift_experts.title,
                price: isToggleAnnual
                    ? PLAN_PRICING.swift_experts.price_annual
                    : PLAN_PRICING.swift_experts.price,
                listDescription: LIST_DESCRIPTION_OVERVIEW_SWIFT_EXPERTS,
                titleBody:
                    "new_pricing_page.descriptions_overview_swift_experts.title",
                titleFooter: "new_pricing_page.swift_experts.title_footer",
                desFooter: "new_pricing_page.swift_experts.des_footer",
                plan: PlanType.swift_experts,
                isHighligh: true,
                buttonCharge: (
                    <div className="flex flex-col items-stretch">
                        <Button primary onClick={onOpenHireExperts}>
                            {t("common.btn_hire")}
                        </Button>
                    </div>
                ),
                btnFooter: (
                    <div className="flex justify-center">
                        <Link
                            monochrome
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
    }, [
        buttonChargeExpertCare,
        isToggleAnnual,
        navigate,
        onOpenHireExperts,
        t,
    ]);

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
                </>
            )),
        [customer, pricingStore]
    );

    const eleListBoxPricing = useMemo(() => {
        if (!customer || !(typeof pricingStore.trial_days === "number"))
            return <></>;

        return listPlan.map((item) => {
            return (
                <SwiperSlide
                    key={item.plan}
                    style={{
                        height: "initial",
                    }}
                >
                    <div className="ListPricingPLan__item-pricing h-100">
                        <BoxPreviewPlanPricing
                            {...item}
                            isToggleAnnual={isToggleAnnual}
                        />
                    </div>
                </SwiperSlide>
            );
        });
    }, [customer, listPlan, isToggleAnnual, pricingStore]);

    return (
        <>
            <div className="TabsServices__list-pricing">
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
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        760: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        // when window width is >= 640px
                        860: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                    }}
                >
                    {eleLoading}
                    {eleListBoxPricing}
                </Swiper>
            </div>

            <ModalHireExpert
                isOpen={isOpenHireExperts}
                onClose={onCloseHireExperts}
            />

            <TableViewMorePlan
                planHighligh={PlanType.swift_experts}
                isToggleAnnual={isToggleAnnual}
                onToggleAnnual={onToggleAnnual}
                listPlanHeader={listPlanTable}
                dataDesTable={LIST_DES_TABLE_SERVICES}
                listPlanDes={[listPlan[0].plan, listPlan[1].plan]}
            />

            <SectionAboutExperts />
        </>
    );
});

interface IPropsTabsServices {
    isToggleAnnual: boolean;
    onToggleAnnual: () => void;
}

export default TabsServices;
