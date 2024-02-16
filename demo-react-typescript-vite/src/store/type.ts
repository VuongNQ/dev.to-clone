import { EOnBoard } from "@swift/types/general";
import { IntervalPricingType, PlanType } from "@swift/types/planPricing";

// export interface CustomerData {
//   id: number;
//   name: string;
//   shopify_domain: string;
//   domain: string;
//   shopify_plan: string;
//   shopify_theme: string;
//   theme_id: string;
//   owner: string;
//   email: string;
//   phone: string;
//   timezone: string;
//   country: string;
//   currency: string;
//   app_status: boolean;
//   app_version: string;
//   pricing_version: number;
//   app_plan: PlanType;
//   expert_onboarding_required: number;
//   affiliate_partner_id: null;
//   billing_id: string;
//   billing_on: null;
//   used_trial: number;
//   trial_on: null;
//   trial_end: null;
//   trial_type: null;
//   cancelled_on: Date;
//   deleted_at: null;
//   have_optimized: number;
//   is_show_rating_bar: number;
//   default_images_available: number;
//   buymore_images_available: number;
//   created_at: Date;
//   updated_at: Date;
//   plan_info: PlanInfo;
//   pricing_version_current: number;
//   real_images_available: number;
//   update_required: boolean;
//   show_confirm_restore_image: boolean;
//   reject_app: boolean;
//   integration: null;
//   test: null;
//   enable_resync_image: boolean;
//   resync_image_status: "processing" | "done";
//   sync_product_status: "processing" | "done";
//   app_lock: boolean;
//   is_auto_boost_speed: 1 | 0;
//   onboarding_step: number;
//   is_send_crispchat: IKeySendScripChat;
//   is_preloading_active: boolean;
// }

// export enum IKeySendScripChat {
//   unsent = 0,
//   sent = 1,
// }

export interface CustomerDataState {
  id:                  number;
  name:                string;
  shopify_domain:      string;
  domain:              string | null;
  shopify_plan:        string;
  owner:               string;
  email:               string;
  phone:               string;
  timezone:            string;
  country:             string;
  currency:            string;
  app_status:          boolean;
  app_lock:            boolean;
  app_version:         string;
  app_plan:            PlanType;
  app_plan_interval:   IntervalPricingType;
  billing_id:          string;
  billing_on:          null;
  used_trial:          boolean;
  trial_on:            null;
  trial_end:           null;
  trial_type:          null;
  cancelled_on:        null;
  deleted_at:          null;
  onboarding_step:     EOnBoard;
  is_send_crispchat:   boolean;
  created_at:          Date;
  updated_at:          Date;
  // plan_info:           PlanInfo;
  sync_product_status: string;
  default_images_available: number;
  buymore_images_available: number;
  is_auto_boost_speed: boolean;
  theme_limit: number
}

export interface PlanInfo {
  price:                       number;
  price_annual:                number;
  name:                        string;
  title:                       string;
  next_plan:                   string;
  free_token_for_first_charge: number;
  level:                       number;
}