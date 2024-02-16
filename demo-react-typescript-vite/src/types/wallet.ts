export interface IWalletDetailHistory {
    id: number;
    store_id: number;
    wallet_id: number;
    transaction_type: TTransactionType;
    amount: number;
    balance: number;
    feature: TFeatureKey;
    feature_id: number;
    note: string;
    created_at: string;
    updated_at: string;
}

type TTransactionType =
    | ETransactionType.deposit
    | ETransactionType.withdrawal
    | ETransactionType.used
    | ETransactionType.received
    | ETransactionType.reset;

export enum ETransactionType {
    deposit = "deposit",
    withdrawal = "withdrawal",
    used = "used",
    received = "received",
    reset = "reset"
}

export type TFeatureKey =
    | "gpt-token-free"
    | "gpt-token-buy"
    | "evaluate-product-page"
    | "generate-product-meta-title"
    | "generate-product-meta-description"
    | "generate-product-title"
    | "generate-product-description"
    | "gpt-token-plan-new-cycle"
    | "gpt-token-plan-change"
    | "gpt-token-plan-end-trial"
    | "gpt-token-plan-new-cycle";

export enum EFeatureKey {
    "gpt-token-free" = "profile.list.title.gpt_token_free",
    "gpt-token-buy" = "profile.list.title.gpt_token_buy",
    "evaluate-product-page" = "profile.list.title.evaluate_product_page",
    "generate-product-meta-title" = "profile.list.title.product_meta_title",
    "generate-product-meta-description" = "profile.list.title.generate_product_meta_description",
    "generate-product-title" = "profile.list.title.generate_product_title",
    "generate-product-description" = "profile.list.title.generate_product_description",
    "gpt-token-plan-new-cycle" = "gpt-token-plan-new-cycle",
    "gpt-token-plan-change" = "gpt-token-plan-change",
}

export interface IWalletDetail {
    "gpt-token": GPTToken | null;
}

export interface GPTToken {
    id:               number;
    store_id:         number;
    type:             string;
    amount:           number;
    bonus_amount:     number;
    note:             string;
    expires_at:       Date;
    bonus_expires_at: Date;
    created_at:       Date;
    updated_at:       Date;
    raw_amount:       number;
    raw_expires_at:   Date;
}

export type TFilterWalletBy = "all" | "usage" | "purchase";

export interface IErrorsResponseUsingToken {
    type: TErrorKey;
    instance: string;
}

export type TErrorKey = "wallet-not-enough-tokens" | "wallet-tokens-expired";

export enum EErrorsKeyContent {
    instance = "audit-product",
    notEnoughToken = "wallet-not-enough-tokens",
    tokenExpired = "wallet-tokens-expired",
}

export interface IGetHistoryToken {
    filterBy: TFilterWalletBy;
    range?: number;
    page?: number;
}
