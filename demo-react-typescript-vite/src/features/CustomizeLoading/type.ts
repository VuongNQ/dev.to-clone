export interface CustomizeLoadingStoreType
  extends CustomizeLoadingStylesAndSettingStoreType {
  isDemo: boolean;
  isChangeData: boolean;
  isRefresh: boolean;
}
export interface CustomizeLoadingStylesAndSettingStoreType {
  settings: CustomizeLoadingSetting;
  style: CustomizeLoadingStyle;
}

export interface CustomizeLoadingStyle {
  id?: number;
  template_active: keySimpele;
  simple_1?: CustomizeLoadingTemplateType;
  simple_2?: CustomizeLoadingTemplateType;
  simple_3?: CustomizeLoadingTemplateType;
  simple_4?: CustomizeLoadingTemplateType;
  created_at?: string;
  updated_at?: string;
}

export interface CustomizeLoadingDefultStyle {
  id?: number;
  template_active: keySimpele;
  simple_1: CustomizeLoadingTemplateType;
  simple_2: CustomizeLoadingTemplateType;
  simple_3: CustomizeLoadingTemplateType;
  simple_4: CustomizeLoadingTemplateType;
}

export type keySimpele = "simple_1" | "simple_2" | "simple_3" | "simple_4";

export type keyTypeBackground = "color" | "image";

export interface CustomizeLoadingTemplateType {
  background: BackgroundType;
  formText: formTextType;
  formPercentage: formPercentageType;
  formCustomImage: FormCustomImageType;
  formLoadingIcon: FormLoadingIconType;
  formProgressBar: formProgressBarType;
  componentsDisplay: string[];
  templateSelected: keySimpele;
}

export interface FormLoadingIconType {
  icon: string;
  size: string;
  background: string;
  positionIndex: number;
}
export interface FormCustomImageType {
  size: string;
  imgUrl: string | File;
  isRepeat: boolean;
  animation: "none" | "fade-in" | "fade-out";
  positionIndex: number;
}
export interface formTextType {
  font: string;
  size: string;
  text: string;
  color: string;
  fontWeight: string;
  positionIndex: number;
}
export interface formPercentageType {
  font: string;
  size: string;
  color: string;
  fontWeight: string;
  positionIndex: number;
}
export interface formProgressBarType {
  size: string;
  loadingColor: string;
  barColor: string;
  position: string;
  stripeColor: string;
  positionIndex: number;
  isUseStripeColor: boolean;
}

export interface BackgroundType {
  type: keyTypeBackground | string[];
  color: string;
  src: string | File;
}
export interface CustomizeLoadingSetting {
  id?: number;
  color: string;
  active: number;
  animation_style: string;
  duration_time: number;
  delay_time: number;
  display_show: "first" | "everytime";
  page_show_type: "every" | "specific";
  page_show_specific: string[];
  created_at?: string;
  updated_at?: string;
}
export interface CustomizeLoadingSettingDefault {
  id?: number;
  color: string;
  active: number;
  animation_style: string;
  duration_time: number;
  delay_time: number;
  display_show: "first" | "everytime";
  page_show_type: "every" | "specific";
  page_show_specific: string[];
  created_at?: string;
  updated_at?: string;
}

export type keyScreen = "desktop" | "mobile";

export interface listIconsLoadingtype {
  key: string;
  type: string;
  class: string;
  img?: string;
  code: string;
}

export interface ListFontWeightType {
  label: string;
  value: string;
}

export interface CustomizeLoadingFormDataType {
  settings: CustomizeLoadingSetting;
  style: CustomizeLoadingTemplateType;
}

export interface PayloadHandleUpdateStateRedux {
  type: "style" | "setting" | "template";
  settings?: CustomizeLoadingSetting;
  style?: CustomizeLoadingStyle;
  templateActive?: CustomizeLoadingTemplateType
}

export interface GetSettingCustomLoadingType {
  settings: CustomizeLoadingSetting | null;
  style: CustomizeLoadingStyle | null;
}

export interface GetSettingCustomLoadingType {
  settings: CustomizeLoadingSetting | null;
  style: CustomizeLoadingStyle | null;
}
