import { IntervalPricingType, PlanType } from "@swift/types/planPricing";
import { FunctionComponent, SVGProps } from "react";

export interface DescriptionPricing {
  title: string;
  isTick: boolean;
}
export interface DescriptionAdvancedPricing {
  title: string;
  des: string;
  free: boolean | string;
  premium: boolean | string;
  premiumPlus: boolean | string;
  expertCare: boolean | string;
  swiftExperts: boolean | string;
}
export interface IDataDescription
  extends Record<PlanType, boolean | string> {
  title: string;
  // des: string;
}

export interface PricingSpeedPlan {
  title: string;
  iconTitle?: JSX.Element;
  backgroundHeader?: string;
  des?: string;
  price: number;
  discount?: number;
  // textMethodCharge: string | JSX.Element;
  // textMethodChargeDiscount?: string | JSX.Element;
  listDescription: DescriptionPricing[];
  buttonCharge: JSX.Element;
  // bannerPromotion?: string | JSX.Element;
  // isPlus?: boolean;
  isExperts?: boolean;
  titleBody: string;
  plan: PlanType;
  methodChagre?: IntervalPricingType;
  isToggleAnnual?: boolean;
  titleFooter?: string;
  desFooter?: string;
  btnFooter?:  JSX.Element;
  isHighligh?:boolean
  // txtCurrencyUnit: string;
}
export interface IDataPlanTable
  extends Pick<
    PricingSpeedPlan,
    "title" | "price" | "discount" | "buttonCharge" | "plan"
  > {}

export enum DiscountMethodCharge {
  discount_yearly = 20,
}

export enum ExpertCareTicketCreated {
  created = "1",
  not_created = "0",
}

export interface IModalPromotionSuccesstype {
  isOpen: boolean;
  onClose: () => void;
  planName: PlanType;
}

export interface ITemTabs{
  content: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  tabs: string;
  component: JSX.Element;
}