import {
  IDataOptimizeThemeRedux,
  KeyOptimzie,
} from "@swift/types/optimizeTheme";

export const INIT_DATA_OPTIMIZE_THEME: IDataOptimizeThemeRedux = {
  isAcceptOptimizeTheme: true,
  themeOptimize: null,
  themeMain: null,
  isProgressRunning: false,
  listStepProgress: [],
  listStepProgressTemp: [],
  StepProgressRunning: "",
  stepProgressFail: "",
  StepsSuccessCurrentThemeOptimize: [],
  isFinishProgress: false,
  isCheckDataLog: false,
  isDifferenceThemeMain: false,
  dataDetail: {
    [KeyOptimzie["critical-css"]]: null,
    [KeyOptimzie["lazyload-images"]]: null,
    [KeyOptimzie["optimize-css"]]: null,
    [KeyOptimzie["optimize-js"]]: null,
    [KeyOptimzie["preload-fonts"]]: null,
    [KeyOptimzie["duplicate"]]: null,
    [KeyOptimzie["optimize-html"]]: null,
    [KeyOptimzie["optimize-html-plus"]]: null,
  },
};
