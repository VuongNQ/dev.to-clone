import {
  IDataPlanPricingStore,
  IntervalPricingType,
  PlanPricingType,
  PlanType,
} from "@swift/types/planPricing";

export const PLAN_PRICING: PlanPricingType = {
  free: {
    key: PlanType.free,
    title: "new_pricing_page.plan_free.title",
    price: 0,
    price_annual: 0,
    des: "new_pricing_page.plan_free.des",
  },
  basic: {
    key: PlanType.basic,
    title: "new_pricing_page.plan_basic.title",
    price: 9,
    price_annual: 108,
    // des: "new_pricing_page.plan_free.des",
  },
  premium: {
    key: PlanType.premium,
    title: "new_pricing_page.plan_premium.title",
    price: 19,
    price_annual: 228,
    // des: "new_pricing_page.plan_premium.des",
  },
  premium_plus: {
    key: PlanType.premium_plus,
    title: "new_pricing_page.plan_premium_plus.title",
    price: 29,
    price_annual: 348,
    // des: "new_pricing_page.plan_premium_plus.des",
  },
  expert_care: {
    key: PlanType.expert_care,
    title: "new_pricing_page.plan_expert_care.title",
    price: 49,
    price_annual: 588,
    // des: "new_pricing_page.plan_expert_care.des",
  },
  swift_experts: {
    key: PlanType.swift_experts,
    title: "new_pricing_page.swift_experts.title",
    price: 150,
    price_annual: 150,
    // des: "new_pricing_page.swift_experts.des",
  },
};

export const INIT_DATA_PLAN_STORE: IDataPlanPricingStore = {
  has_expert_ticket: false,
  interval: IntervalPricingType.forever,
  plan: PlanType.free,
  trial_days: 3,
};
