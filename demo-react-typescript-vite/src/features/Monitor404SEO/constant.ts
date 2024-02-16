import { IDataSettingMonitor } from "@swift/types/monitor404SEO";
import { PlanType } from "@swift/types/planPricing";

export const LIST_QUESTION_MONITOR = [
  {
    title: "monitor_404.list_question.0.title",
    content: "monitor_404.list_question.0.des",
  },
  {
    title: "monitor_404.list_question.1.title",
    content: "monitor_404.list_question.1.des",
  },
];

export const INI_DATA_MONITOR: IDataSettingMonitor = {
  is_redirect_to_home: false,
  is_send_email: false,
};


export const ACCEPT_PLAN_MONITOR = [PlanType.premium_plus,PlanType.expert_care];