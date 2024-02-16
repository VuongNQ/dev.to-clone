import {
  CustomizeLoadingDefultStyle,
  CustomizeLoadingSettingDefault,
  listIconsLoadingtype,
} from "./type";
import IconCatSpinner from "./assets/cat-spinner.svg";
import IconDogSpinner from "./assets/dog-spinner.svg";
export const LOADING_SETTING_DEFAULT: CustomizeLoadingSettingDefault = {
  color: "#365698",
  active: 0,
  animation_style: "fade-out",
  duration_time: 3,
  delay_time: 1,
  display_show: "first",
  page_show_type: "every",
  page_show_specific: [],
};
export const LOADING_STYLE_DEFAULT: CustomizeLoadingDefultStyle = {
  template_active: "simple_1",
  simple_1: {
    background: {
      type: "color",
      color: "#FFFFFF",
      src: "",
    },
    formText: {
      font: "font-store",
      size: "medium",
      text: "Loading...",
      color: "#5062E9",
      fontWeight: "regular",
      positionIndex: 1,
    },
    formPercentage: {
      font: "font-store",
      size: "medium",
      color: "#5062E9",
      fontWeight: "regular",
      positionIndex: 4,
    },
    formCustomImage: {
      size: "medium",
      imgUrl: "",
      isRepeat: false,
      animation: "none",
      positionIndex: 3,
    },
    formLoadingIcon: {
      icon: "lds-eclipse",
      size: "medium",
      background: "#5062E9",
      positionIndex: 0,
    },
    formProgressBar: {
      size: "medium",
      loadingColor: "#365698",
      barColor: "#C2C2C2",
      position: "middle",
      stripeColor: "#929FFE",
      positionIndex: 2,
      isUseStripeColor: true,
    },
    componentsDisplay: ["formLoadingIcon", "formText"],
    templateSelected: "simple_1",
  },
  simple_2: {
    background: {
      type: "color",
      color: "#FFFFFF",
      src: "",
    },
    formText: {
      font: "font-store",
      size: "medium",
      text: "Loading...",
      color: "#5062E9",
      fontWeight: "regular",
      positionIndex: 2,
    },
    formPercentage: {
      font: "font-store",
      size: "medium",
      color: "#5062E9",
      fontWeight: "regular",
      positionIndex: 4,
    },
    formCustomImage: {
      size: "medium",
      imgUrl: "logo-sm.svg",
      isRepeat: false,
      animation: "none",
      positionIndex: 0,
    },
    formLoadingIcon: {
      icon: "lds-eclipse",
      size: "small",
      background: "#5062E9",
      positionIndex: 3,
    },
    formProgressBar: {
      size: "medium",
      loadingColor: "#365698",
      barColor: "#C2C2C2",
      position: "middle",
      stripeColor: "#929FFE",
      positionIndex: 1,
      isUseStripeColor: true,
    },
    componentsDisplay: ["formText", "formCustomImage", "formProgressBar"],
    templateSelected: "simple_2",
  },
  simple_3: {
    background: {
      type: "color",
      color: "#FFFFFF",
      src: "",
    },
    formText: {
      font: "font-store",
      size: "medium",
      text: "Loading...",
      color: "#5062E9",
      fontWeight: "regular",
      positionIndex: 4,
    },
    formPercentage: {
      font: "font-store",
      size: "medium",
      color: "#5062E9",
      fontWeight: "regular",
      positionIndex: 1,
    },
    formCustomImage: {
      size: "medium",
      imgUrl: "logo-sm.svg",
      isRepeat: false,
      animation: "none",
      positionIndex: 0,
    },
    formLoadingIcon: {
      icon: "lds-eclipse",
      size: "small",
      background: "#5062E9",
      positionIndex: 3,
    },
    formProgressBar: {
      size: "medium",
      loadingColor: "#365698",
      barColor: "#C2C2C2",
      position: "middle",
      stripeColor: "#929FFE",
      positionIndex: 2,
      isUseStripeColor: true,
    },
    componentsDisplay: ["formCustomImage", "formPercentage", "formProgressBar"],
    templateSelected: "simple_3",
  },
  simple_4: {
    background: {
      type: "color",
      color: "#FFFFFF",
      src: "",
    },
    formText: {
      font: "font-store",
      size: "medium",
      text: "Loading...",
      color: "#5062E9",
      fontWeight: "regular",
      positionIndex: 0,
    },
    formPercentage: {
      font: "font-store",
      size: "medium",
      color: "#5062E9",
      fontWeight: "regular",
      positionIndex: 2,
    },
    formCustomImage: {
      size: "medium",
      imgUrl: "",
      isRepeat: false,
      animation: "none",
      positionIndex: 4,
    },
    formLoadingIcon: {
      icon: "lds-eclipse",
      size: "small",
      background: "#5062E9",
      positionIndex: 1,
    },
    formProgressBar: {
      size: "medium",
      loadingColor: "#365698",
      barColor: "#C2C2C2",
      position: "middle",
      stripeColor: "#929FFE",
      positionIndex: 3,
      isUseStripeColor: true,
    },
    componentsDisplay: ["formText", "formLoadingIcon", "formPercentage"],
    templateSelected: "simple_4",
  },
};
// export const listComponentDefault = [
//     {
//         text: 'Loading icon',
//         value: 'formLoadingIcon',
//         key: 'loading-icon',
//         isDisplay: false,
//     },
//     {
//         text: 'Text',
//         value: 'formText',
//         key: 'text',
//         isDisplay: false,
//     },
//     {
//         text: 'Brand image',
//         value: 'formCustomImage',
//         key: 'image',
//         isDisplay: false,
//     },
//     {
//         text: 'Progress bar',
//         value: 'formProgressBar',
//         key: 'progress-bar',
//         isDisplay: false,
//     },
//     {
//         text: 'Percentage',
//         value: 'formPercentage',
//         key: 'percentage',
//         isDisplay: false,
//     },
// ];
export const LIST_FONT_WEIGHT = [
  {
    label:
      "CustomizeLoading_page.template_customizeLoading.tabs_text.features.2.list_field.0",
    value: "regular",
  },
  {
    label:
      "CustomizeLoading_page.template_customizeLoading.tabs_text.features.2.list_field.1",
    value: "medium",
  },
  {
    label:
      "CustomizeLoading_page.template_customizeLoading.tabs_text.features.2.list_field.2",
    value: "bold",
  },
];

export const LIST_FONT_SIZE = [
  {
    label: "CustomizeLoading_page.common.size.list_field.0",
    value: "very_small",
  },
  {
    label: "CustomizeLoading_page.common.size.list_field.1",
    value: "small",
  },
  {
    label: "CustomizeLoading_page.common.size.list_field.2",
    value: "medium",
  },
  {
    label: "CustomizeLoading_page.common.size.list_field.3",
    value: "large",
  },
  {
    label: "CustomizeLoading_page.common.size.list_field.4",
    value: "very_large",
  },
];

export const LIST_FONT_STYLE = [
  {
    label: "Arvo",
    value: "Arvo",
  },
  {
    label: "Alegreya",
    value: "Alegreya",
  },
  {
    label: "Cabin",
    value: "Cabin",
  },
  {
    label: "Crimson Text",
    value: "Crimson Text",
  },
  {
    label: "Font store",
    value: "font-store",
  },
  {
    label: "Open Sans",
    value: "Open Sans",
  },
  {
    label: "Poppins",
    value: "Poppins",
  },
  {
    label: "Roboto",
    value: "Roboto",
  },
  {
    label: "Lora",
    value: "Lora",
  },

  {
    label: "Merriweather",
    value: "Merriweather",
  },
  {
    label: "Playfair Display",
    value: "Playfair Display",
  },
];

export const LIST_ICONS_LOADING: listIconsLoadingtype[] = [
  {
    key: "lds-facebook",
    type: "html",
    class: "d-flex",
    code: '<div class="lds-facebook"><div></div><div></div><div></div></div>',
  },
  {
    key: "lds-ring",
    type: "html",
    class: "d-flex",
    code: '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>',
  },
  {
    key: "lds-eclipse",
    type: "html",
    class: "d-flex",
    code:
      '<?xml version="1.0" encoding="utf-8"?>' +
      '<svg class="lds-eclipse" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; display: block; shape-rendering: auto; animation-play-state: running; animation-delay: 0s;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">' +
      '<path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#5062E9" stroke="none" style="animation-play-state: running; animation-delay: 0s;">' +
      '<animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51" style="animation-play-state: running; animation-delay: 0s;"></animateTransform>' +
      "</path>",
  },
  {
    key: "lds-default",
    type: "html",
    class: "d-flex",
    code: '<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>',
  },

  {
    key: "lds-ellipsis",
    type: "html",
    class: "d-flex",
    code:
      '<svg class="lds-ellipsis" version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">' +
      '<circle fill="#5062E9" stroke="none" cx="8" cy="50" r="8">' +
      '<animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1"/>' +
      "</circle>" +
      '<circle fill="#5062E9" stroke="none" cx="50" cy="50" r="8">' +
      '<animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2"/>' +
      "</circle>" +
      '<circle fill="#5062E9" stroke="none" cx="92" cy="50" r="8">' +
      '<animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3"/>' +
      "</circle>" +
      "</svg>",
  },
  {
    key: "lds-dual-ring",
    type: "html",
    class: "d-flex",
    code: '<div class="lds-dual-ring"></div>',
  },
  {
    key: "lds-preloader",
    type: "html",
    class: "d-flex",
    code: '<div class="preloader"><div class="preloader__loading"></div></div>',
  },
  {
    key: "lds-pen-ring",
    type: "html",
    class: "d-flex",
    code:
      '<div class="lds-pen-ring">' +
      '<div class="lds-pen-ring__loading">' +
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><path d="M85.5,42c-0.2-0.8-0.5-1.7-0.8-2.5c-0.3-0.9-0.7-1.6-1-2.3c-0.3-0.7-0.6-1.3-1-1.9c0.3,0.5,0.5,1.1,0.8,1.7  c0.2,0.7,0.6,1.5,0.8,2.3s0.5,1.7,0.8,2.5c0.8,3.5,1.3,7.5,0.8,12c-0.4,4.3-1.8,9-4.2,13.4c-2.4,4.2-5.9,8.2-10.5,11.2  c-1.1,0.7-2.2,1.5-3.4,2c-0.5,0.2-1.2,0.6-1.8,0.8s-1.3,0.5-1.9,0.8c-2.6,1-5.3,1.7-8.1,1.8l-1.1,0.1L53.8,84c-0.7,0-1.4,0-2.1,0  c-1.4-0.1-2.9-0.1-4.2-0.5c-1.4-0.1-2.8-0.6-4.1-0.8c-1.4-0.5-2.7-0.9-3.9-1.5c-1.2-0.6-2.4-1.2-3.7-1.9c-0.6-0.3-1.2-0.7-1.7-1.1  l-0.8-0.6c-0.3-0.1-0.6-0.4-0.8-0.6l-0.8-0.6L31.3,76l-0.2-0.2L31,75.7l-0.1-0.1l0,0l-1.5-1.5c-1.2-1-1.9-2.1-2.7-3.1  c-0.4-0.4-0.7-1.1-1.1-1.7l-1.1-1.7c-0.3-0.6-0.6-1.2-0.9-1.8c-0.2-0.5-0.6-1.2-0.8-1.8c-0.4-1.2-1-2.4-1.2-3.7  c-0.2-0.6-0.4-1.2-0.5-1.9c-0.1-0.6-0.2-1.2-0.3-1.8c-0.3-1.2-0.3-2.4-0.4-3.7c-0.1-1.2,0-2.5,0.1-3.7c0.2-1.2,0.3-2.4,0.6-3.5  c0.1-0.6,0.3-1.1,0.4-1.7l0.1-0.8l0.3-0.8c1.5-4.3,3.8-8,6.5-11c0.8-0.8,1.4-1.5,2.1-2.1c0.9-0.9,1.4-1.3,2.2-1.8  c1.4-1.2,2.9-2,4.3-2.8c2.8-1.5,5.5-2.3,7.7-2.8s4-0.7,5.2-0.6c0.6-0.1,1.1,0,1.4,0s0.4,0,0.4,0h0.1c2.7,0.1,5-2.2,5-5  c0.1-2.7-2.2-5-5-5c-0.2,0-0.2,0-0.3,0c0,0-0.2,0.1-0.6,0.1c-0.4,0-1,0-1.8,0.1c-1.6,0.1-4,0.4-6.9,1.2c-2.9,0.8-6.4,2-9.9,4.1  c-1.8,1-3.6,2.3-5.4,3.8C26,21.4,25,22.2,24.4,23c-0.2,0.2-0.4,0.4-0.6,0.6c-0.2,0.2-0.5,0.4-0.6,0.7c-0.5,0.4-0.8,0.9-1.3,1.4  c-3.2,3.9-5.9,8.8-7.5,14.3l-0.3,1l-0.2,1.1c-0.1,0.7-0.3,1.4-0.4,2.1c-0.3,1.5-0.4,2.9-0.5,4.5c0,1.5-0.1,3,0.1,4.5  c0.2,1.5,0.2,3,0.6,4.6c0.1,0.7,0.3,1.5,0.4,2.3c0.2,0.8,0.5,1.5,0.7,2.3c0.4,1.6,1.1,3,1.7,4.4c0.3,0.7,0.7,1.4,1.1,2.1  c0.4,0.8,0.8,1.4,1.2,2.1c0.5,0.7,0.9,1.4,1.4,2s0.9,1.3,1.5,1.9c1.1,1.3,2.2,2.7,3.3,3.5l1.7,1.6c0,0,0.1,0.1,0.1,0.1c0,0,0,0,0,0  c0,0,0,0,0,0l0.1,0.1l0.1,0.1h0.2l0.5,0.4l1,0.7c0.4,0.2,0.6,0.5,1,0.7l1.1,0.6c0.8,0.4,1.4,0.9,2.1,1.2c1.4,0.7,2.9,1.5,4.4,2  c1.5,0.7,3.1,1,4.6,1.5c1.5,0.3,3.1,0.7,4.7,0.8c1.6,0.2,3.1,0.2,4.7,0.2c0.8,0,1.6-0.1,2.4-0.1l1.2-0.1l1.1-0.1  c3.1-0.4,6.1-1.3,8.9-2.4c0.8-0.3,1.4-0.6,2.1-0.9s1.3-0.7,2-1.1c1.3-0.7,2.6-1.7,3.7-2.5c0.5-0.4,1-0.9,1.6-1.3l0.8-0.6l0.2-0.2  c0,0,0.1-0.1,0.1-0.1c0.1-0.1,0,0,0,0v0.1l0.1-0.1l0.4-0.4c0.5-0.5,1-1,1.5-1.5c0.3-0.3,0.5-0.5,0.8-0.8l0.7-0.8  c0.9-1.1,1.8-2.2,2.5-3.3c0.4-0.6,0.7-1.1,1.1-1.7c0.3-0.7,0.6-1.2,0.9-1.8c2.4-4.9,3.5-9.8,3.7-14.4C87.3,49.7,86.6,45.5,85.5,42z"></path></svg>' +
      "</div>" +
      '<div class="lds-pen-ring__loading">' +
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve"><path d="M85.5,42c-0.2-0.8-0.5-1.7-0.8-2.5c-0.3-0.9-0.7-1.6-1-2.3c-0.3-0.7-0.6-1.3-1-1.9c0.3,0.5,0.5,1.1,0.8,1.7  c0.2,0.7,0.6,1.5,0.8,2.3s0.5,1.7,0.8,2.5c0.8,3.5,1.3,7.5,0.8,12c-0.4,4.3-1.8,9-4.2,13.4c-2.4,4.2-5.9,8.2-10.5,11.2  c-1.1,0.7-2.2,1.5-3.4,2c-0.5,0.2-1.2,0.6-1.8,0.8s-1.3,0.5-1.9,0.8c-2.6,1-5.3,1.7-8.1,1.8l-1.1,0.1L53.8,84c-0.7,0-1.4,0-2.1,0  c-1.4-0.1-2.9-0.1-4.2-0.5c-1.4-0.1-2.8-0.6-4.1-0.8c-1.4-0.5-2.7-0.9-3.9-1.5c-1.2-0.6-2.4-1.2-3.7-1.9c-0.6-0.3-1.2-0.7-1.7-1.1  l-0.8-0.6c-0.3-0.1-0.6-0.4-0.8-0.6l-0.8-0.6L31.3,76l-0.2-0.2L31,75.7l-0.1-0.1l0,0l-1.5-1.5c-1.2-1-1.9-2.1-2.7-3.1  c-0.4-0.4-0.7-1.1-1.1-1.7l-1.1-1.7c-0.3-0.6-0.6-1.2-0.9-1.8c-0.2-0.5-0.6-1.2-0.8-1.8c-0.4-1.2-1-2.4-1.2-3.7  c-0.2-0.6-0.4-1.2-0.5-1.9c-0.1-0.6-0.2-1.2-0.3-1.8c-0.3-1.2-0.3-2.4-0.4-3.7c-0.1-1.2,0-2.5,0.1-3.7c0.2-1.2,0.3-2.4,0.6-3.5  c0.1-0.6,0.3-1.1,0.4-1.7l0.1-0.8l0.3-0.8c1.5-4.3,3.8-8,6.5-11c0.8-0.8,1.4-1.5,2.1-2.1c0.9-0.9,1.4-1.3,2.2-1.8  c1.4-1.2,2.9-2,4.3-2.8c2.8-1.5,5.5-2.3,7.7-2.8s4-0.7,5.2-0.6c0.6-0.1,1.1,0,1.4,0s0.4,0,0.4,0h0.1c2.7,0.1,5-2.2,5-5  c0.1-2.7-2.2-5-5-5c-0.2,0-0.2,0-0.3,0c0,0-0.2,0.1-0.6,0.1c-0.4,0-1,0-1.8,0.1c-1.6,0.1-4,0.4-6.9,1.2c-2.9,0.8-6.4,2-9.9,4.1  c-1.8,1-3.6,2.3-5.4,3.8C26,21.4,25,22.2,24.4,23c-0.2,0.2-0.4,0.4-0.6,0.6c-0.2,0.2-0.5,0.4-0.6,0.7c-0.5,0.4-0.8,0.9-1.3,1.4  c-3.2,3.9-5.9,8.8-7.5,14.3l-0.3,1l-0.2,1.1c-0.1,0.7-0.3,1.4-0.4,2.1c-0.3,1.5-0.4,2.9-0.5,4.5c0,1.5-0.1,3,0.1,4.5  c0.2,1.5,0.2,3,0.6,4.6c0.1,0.7,0.3,1.5,0.4,2.3c0.2,0.8,0.5,1.5,0.7,2.3c0.4,1.6,1.1,3,1.7,4.4c0.3,0.7,0.7,1.4,1.1,2.1  c0.4,0.8,0.8,1.4,1.2,2.1c0.5,0.7,0.9,1.4,1.4,2s0.9,1.3,1.5,1.9c1.1,1.3,2.2,2.7,3.3,3.5l1.7,1.6c0,0,0.1,0.1,0.1,0.1c0,0,0,0,0,0  c0,0,0,0,0,0l0.1,0.1l0.1,0.1h0.2l0.5,0.4l1,0.7c0.4,0.2,0.6,0.5,1,0.7l1.1,0.6c0.8,0.4,1.4,0.9,2.1,1.2c1.4,0.7,2.9,1.5,4.4,2  c1.5,0.7,3.1,1,4.6,1.5c1.5,0.3,3.1,0.7,4.7,0.8c1.6,0.2,3.1,0.2,4.7,0.2c0.8,0,1.6-0.1,2.4-0.1l1.2-0.1l1.1-0.1  c3.1-0.4,6.1-1.3,8.9-2.4c0.8-0.3,1.4-0.6,2.1-0.9s1.3-0.7,2-1.1c1.3-0.7,2.6-1.7,3.7-2.5c0.5-0.4,1-0.9,1.6-1.3l0.8-0.6l0.2-0.2  c0,0,0.1-0.1,0.1-0.1c0.1-0.1,0,0,0,0v0.1l0.1-0.1l0.4-0.4c0.5-0.5,1-1,1.5-1.5c0.3-0.3,0.5-0.5,0.8-0.8l0.7-0.8  c0.9-1.1,1.8-2.2,2.5-3.3c0.4-0.6,0.7-1.1,1.1-1.7c0.3-0.7,0.6-1.2,0.9-1.8c2.4-4.9,3.5-9.8,3.7-14.4C87.3,49.7,86.6,45.5,85.5,42z"></path></svg>' +
      "</div>" +
      "</div>",
  },
  {
    key: "lds-loader",
    type: "html",
    class: "p-t-10",
    code:
      '<div class="lds-loader lds-loader__loading">' +
      '<span class="slice"></span>' +
      '<span class="slice"></span>' +
      '<span class="slice"></span>' +
      '<span class="slice"></span>' +
      '<span class="slice"></span>' +
      '<span class="slice"></span>' +
      "</div>",
  },
  {
    key: "lds-gegga",
    type: "html",
    class: "d-flex",
    code:
      '<svg class="lds-gegga" viewBox="0 0 200 200">' +
      "<defs>" +
      '<linearGradient id="linjärGradient">' +
      '<stop class="stopp1" offset="0" />' +
      '<stop class="stopp2" offset="1" />' +
      "</linearGradient>" +
      '<linearGradient y2="160" x2="160" y1="40" x1="40" gradientUnits="userSpaceOnUse" id="gradient" xlink:href="#linjärGradient"/>' +
      "</defs>" +
      '<path class="halvan" d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64"/>' +
      '<circle class="strecken" cx="100" cy="100" r="64" />' +
      "</svg>",
  },
  {
    key: "cat-spinner",
    type: "html",
    class: "d-flex",
    img: "catSpinner",
    code: IconCatSpinner,
  },
  {
    key: "dog-spinner",
    type: "html",
    class: "d-flex",
    img: "dogSpinner",
    code: IconDogSpinner,
  },
];

export const SIZES_BAR = [
  {
    value: "very_small",
    label: "CustomizeLoading_page.common.size.list_field.0",
  },
  {
    value: "small",
    label: "CustomizeLoading_page.common.size.list_field.1",
  },
  {
    value: "medium",
    label: "CustomizeLoading_page.common.size.list_field.2",
  },
  {
    value: "large",
    label: "CustomizeLoading_page.common.size.list_field.3",
  },
];

export const LIST_POSITION = [
  {
    label:
      "CustomizeLoading_page.template_customizeLoading.tabs_bar.features.2.list_field.0",
    value: "top",
  },
  {
    label:
      "CustomizeLoading_page.template_customizeLoading.tabs_bar.features.2.list_field.1",
    value: "middle",
  },
  {
    label:
      "CustomizeLoading_page.template_customizeLoading.tabs_bar.features.2.list_field.2",
    value: "bottom",
  },
];

export const SIZE_ICON = [
  {
    value: "very-small",
    label: "CustomizeLoading_page.common.size.list_field.0",
  },
  {
    value: "small",
    label: "CustomizeLoading_page.common.size.list_field.1",
  },
  {
    value: "medium",
    label: "CustomizeLoading_page.common.size.list_field.2",
  },
  {
    value: "large",
    label: "CustomizeLoading_page.common.size.list_field.3",
  },
];

export const LIST_ANIMATION = [
  {
    label:
      "CustomizeLoading_page.template_customizeLoading.tabs_customImage.features.1.list_field.0",
    value: "none",
  },
  {
    label:
      "CustomizeLoading_page.template_customizeLoading.tabs_customImage.features.1.list_field.1",
    value: "fade-in",
  },
  {
    label:
      "CustomizeLoading_page.template_customizeLoading.tabs_customImage.features.1.list_field.2",
    value: "fade-out",
  },
];

export const LIST_ANIMATION_PAGE = [
  {
    label:
      "CustomizeLoading_page.loadingTime_customizeLoading.features.1.list_field.0",
    value: "fade-out",
  },
  {
    label:
      "CustomizeLoading_page.loadingTime_customizeLoading.features.1.list_field.1",
    value: "fade-out-left",
  },
  {
    label:
      "CustomizeLoading_page.loadingTime_customizeLoading.features.1.list_field.2",
    value: "fade-out-right",
  },
  {
    label:
      "CustomizeLoading_page.loadingTime_customizeLoading.features.1.list_field.3",
    value: "zoom-out",
  },
];

export const lIST_DURATION_TIME = [
  {
    label: "1s",
    value: '1',
  },
  {
    label: "2s",
    value: '2',
  },
  {
    label: "3s",
    value: '3',
  },
  {
    label: "4s",
    value: '4',
  },
  {
    label: "5s",
    value: '5',
  },
];

export const lIST_DELAY_TIME = [
  {
    label: "0s",
    value: "0",
  },
  {
    label: "1s",
    value: "1",
  },
  {
    label: "2s",
    value: "2",
  },
  {
    label: "3s",
    value: "3",
  },
  {
    label: "4s",
    value: "4",
  },
  {
    label: "5s",
    value: "5",
  },
];

