import { KeyOptimzie } from "@swift/types/optimizeTheme";
import { PlanType } from "@swift/types/planPricing";
import extractCriticalCss from "./assets/extract-critical-css.svg";
import lazyLoadImages from "./assets/lazyload-images.svg";
import minifyHTMLfiles from "./assets/minify-HTML-files.svg";
import minifyCss from "./assets/minify-css.svg";
import minifyJavascript from "./assets/minify-javascript.svg";
import optimizeHtmlPlus from "./assets/optimize-html-plus.svg";
import preloadWebFonts from "./assets/preload-web-fonts.svg";

export const LIST_TASK_OPTIMIZE = [
  {
    key: KeyOptimzie["optimize-html"],
    title: "Clean up HTML files",
    des: `optimize_theme.list_task.${KeyOptimzie["optimize-html"]}.des`,
    desProccess: `optimize_theme.list_task.${KeyOptimzie["optimize-html"]}.des_proccess`,
    img: minifyHTMLfiles,
    isUseTrial: true,
    acceptPlan: [PlanType.basic,PlanType.premium, PlanType.premium_plus, PlanType.expert_care],
  },
  {
    key: KeyOptimzie["preload-fonts"],
    title: "Preload web fonts",
    des: `optimize_theme.list_task.${KeyOptimzie["preload-fonts"]}.des`,
    desProccess: `optimize_theme.list_task.${KeyOptimzie["preload-fonts"]}.des_proccess`,
    img: preloadWebFonts,
    isUseTrial: true, 
    acceptPlan: [PlanType.basic,PlanType.premium, PlanType.premium_plus, PlanType.expert_care],
  },
  {
    key: KeyOptimzie["optimize-html-plus"],
    title: "HTML file optimization",
    des: `optimize_theme.list_task.${KeyOptimzie["optimize-html-plus"]}.des`,
    desProccess: `optimize_theme.list_task.${KeyOptimzie["optimize-html-plus"]}.des_proccess`,
    img: optimizeHtmlPlus,
    isUseTrial: false,
    // badge: "Beta",
    // badge: 'pricing_page.common.txt_plus',
    explainUse: `optimize_theme.list_task.${KeyOptimzie["optimize-html-plus"]}.explan_use`,
    acceptPlan: [PlanType.premium_plus, PlanType.expert_care],
  },
  {
    key: KeyOptimzie["critical-css"],
    title: "Extract critical CSS",
    des: `optimize_theme.list_task.${KeyOptimzie["critical-css"]}.des`,
    desProccess: `optimize_theme.list_task.${KeyOptimzie["critical-css"]}.des_proccess`,
    explainUse:"optimize_theme.txt_upgrade",
    img: extractCriticalCss,
    isUseTrial: false,
    acceptPlan: [PlanType.premium, PlanType.premium_plus, PlanType.expert_care],
  },
  {
    key: KeyOptimzie["lazyload-images"],
    title: "Lazyload images",
    des: `optimize_theme.list_task.${KeyOptimzie["lazyload-images"]}.des`,
    desProccess: `optimize_theme.list_task.${KeyOptimzie["lazyload-images"]}.des_proccess`,
    explainUse:"optimize_theme.txt_upgrade",
    img: lazyLoadImages,
    isUseTrial: false,
    acceptPlan: [PlanType.premium, PlanType.premium_plus, PlanType.expert_care],
  },
  {
    key: KeyOptimzie["optimize-css"],
    title: "Minify CSS",
    des: `optimize_theme.list_task.${KeyOptimzie["optimize-css"]}.des`,
    desProccess: `optimize_theme.list_task.${KeyOptimzie["optimize-css"]}.des_proccess`,
    explainUse:"optimize_theme.txt_upgrade",
    img: minifyCss,
    isUseTrial: false,
    acceptPlan: [PlanType.premium, PlanType.premium_plus, PlanType.expert_care],
  },
  {
    key: KeyOptimzie["optimize-js"],
    title: "Minify JavaScript files",
    des: `optimize_theme.list_task.${KeyOptimzie["optimize-js"]}.des`,
    desProccess: `optimize_theme.list_task.${KeyOptimzie["optimize-js"]}.des_proccess`,
    explainUse:"optimize_theme.txt_upgrade",
    img: minifyJavascript,
    isUseTrial: false,
    acceptPlan: [PlanType.premium, PlanType.premium_plus, PlanType.expert_care],
  },
];

export const ACCEPT_PLANS = [
  PlanType.basic,
  PlanType.premium,
  PlanType.premium_plus,
  PlanType.expert_care,
];
export const ACCEPT_PLANS_AUTO_OPTIMIZE = [
  PlanType.premium_plus,
  PlanType.expert_care,
];

export const OPTION_FEATURE_OPTIMIZE = [
  {
    label: LIST_TASK_OPTIMIZE[0].title,
    value: LIST_TASK_OPTIMIZE[0].key,
  },
  {
    label: LIST_TASK_OPTIMIZE[1].title,
    value: LIST_TASK_OPTIMIZE[1].key,
  },
  {
    label: LIST_TASK_OPTIMIZE[2].title,
    value: LIST_TASK_OPTIMIZE[2].key,
  },
  {
    label: LIST_TASK_OPTIMIZE[3].title,
    value: LIST_TASK_OPTIMIZE[3].key,
  },
  {
    label: LIST_TASK_OPTIMIZE[4].title,
    value: LIST_TASK_OPTIMIZE[4].key,
  },
  {
    label: LIST_TASK_OPTIMIZE[5].title,
    value: LIST_TASK_OPTIMIZE[5].key,
  },
  {
    label: LIST_TASK_OPTIMIZE[6].title,
    value: LIST_TASK_OPTIMIZE[6].key,
  },
];
