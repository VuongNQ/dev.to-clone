import { LOADING_SETTING_DEFAULT, LOADING_STYLE_DEFAULT } from "../constants";
import {
  CustomizeLoadingStoreType,
  CustomizeLoadingStyle,
  GetSettingCustomLoadingType,
  keySimpele,
  PayloadHandleUpdateStateRedux,
} from "../type";

// usage
export const initialStateCustomLoading: CustomizeLoadingStoreType = {
  settings: LOADING_SETTING_DEFAULT,
  style: {
    simple_1: LOADING_STYLE_DEFAULT.simple_1,
    template_active: "simple_1",
  },
  isDemo: false,
  isChangeData: false,
  isRefresh: false,
};

type AppState = typeof initialStateCustomLoading;
type Action =
  | { type: "get"; payload: GetSettingCustomLoadingType }
  | { type: "update"; payload: Partial<CustomizeLoadingStoreType> }
  | {
      type: "update_style_setting";
      payload: PayloadHandleUpdateStateRedux;
    }
  | { type: "save" }
  | { type: "reset" };

export default function reducerCustomLoading(
  state: AppState,
  action: Action
): AppState {
  switch (action.type) {
    case "get": {
      const newStyleAndSetting = initCustomLoading(action.payload);
      return { ...state, ...newStyleAndSetting };
    }

    case "update": {
      return { ...state, ...action.payload };
    }

    case "update_style_setting": {
      const newState = UpdateStyleOrSettingCustomLoading(state, action.payload);
      return { ...state, ...newState };
    }

    default:
      return state;
  }
}

const initCustomLoading = (payload: GetSettingCustomLoadingType) => {
  const payloadStyle: CustomizeLoadingStyle = payload.style
    ? payload.style
    : {
        simple_1: LOADING_STYLE_DEFAULT.simple_1,
        template_active: "simple_1",
      };
  const payloadSetting = payload.settings
    ? payload.settings
    : LOADING_SETTING_DEFAULT;

  return { settings: payloadSetting, style: payloadStyle };
};

const UpdateStyleOrSettingCustomLoading = (
  state: AppState,
  payload: PayloadHandleUpdateStateRedux
) => {
  let newState: Partial<CustomizeLoadingStoreType> = {
    isChangeData: true,
  };

  if (payload.type === "style" && payload.style) {
    newState = {
      ...newState,
      style: payload.style,
    };
  }

  if (payload.type === "template" && payload.templateActive) {
    const templateActive: keySimpele = state.style.template_active;

    const style: CustomizeLoadingStyle = {
      ...state.style,
      [templateActive]: payload.templateActive,
      template_active: templateActive,
    };
    newState = {
      ...newState,
      style: style,
    };
  }

  if (payload.type === "setting" && payload.settings) {
    newState = {
      ...newState,
      settings: payload.settings,
    };
  }

  return newState;
};
