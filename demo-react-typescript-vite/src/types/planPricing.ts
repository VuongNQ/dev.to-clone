export enum PlanType {
    premium = "premium",
    free = "free",
    basic = "basic",
    premium_plus = "premium_plus",
    expert_care = "expert_care",
    swift_experts = "swift_experts", // key to translate
  }
  

export type PlanPricingType = {
    [key in PlanType]: {
        key: PlanType;
        title: string;
        price: number,
        price_annual: number
        des?: string;
    };
};

export enum IntervalPricingType {
    forever = 'forever',
    monthly = 'monthly',
    annual = 'annual',
}

export enum ITrialDays {
    isOutTrial = 0,
}

export interface IIPackagePricingImage {
    [key: string]: IPackagePricingOptimizeImage;
}
export interface IPackagePricingOptimizeImage {
    price: number;
    name: string;
    title: string;
    images: number;
}

export interface IWalletPricing {
    [key: string]: IPackagePricingToken;
}

export interface IPackagePricingToken {
    price: number;
    name: string;
    title: string;
    tokens: number;
    time_to_use: number;
}

export interface IListBuyMore {
    price: number;
    discount: number;
    value: number;
    note?: string;
    id: number;
}

 export interface IDataPlanPricingStore {
    has_expert_ticket: boolean;
    interval: IntervalPricingType;
    plan: PlanType;
    trial_days: number;
  }

  export interface IPayloadChargePlan {
    urlCharge: string;
    isNoTrial: boolean;
    codeDiscount: string;
    planName: PlanType;
    interval: IntervalPricingType;
    callbackRedirectCharge?: (value: string) => void;
    callbackCharged?: () => void;
  }

  export enum ETypePromotionCode {
    percent ="percent",
    fixed_amount = "fixed_amount"
  }
  
  export interface IDataPromotionCode {
    limit: number;
    type: ETypePromotionCode;
    value: number;
  }