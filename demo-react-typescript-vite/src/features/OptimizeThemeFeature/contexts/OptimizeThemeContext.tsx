import {
  IDataDetailOptimizeTheme,
  KeyOptimzie,
} from "@swift/types/optimizeTheme";
import { UseQueryResult } from "@tanstack/react-query";
import { createContext } from "react";

const initialOptimizeThemeContext: IDataOptimizeThemeContext = {
  stepRunning: "",
  isAcceptUseOptimizeTheme: false,
  isLimitTheme: false,
  dataProgress: null,
  isHasStepRunning: false,
  setStepRunning: () => {
    console.log("setStepRunning");
  },
};

export const OptimizeThemeContext = createContext<IDataOptimizeThemeContext>(
  initialOptimizeThemeContext
);

/**interface */
interface IDataOptimizeThemeContext {
  stepRunning: KeyOptimzie | "";
  setStepRunning: (payload: "" | KeyOptimzie) => void;
  isAcceptUseOptimizeTheme: boolean;
  isLimitTheme: boolean;
  dataOptimize?: UseQueryResult<IDataDetailOptimizeTheme, unknown>;
  dataProgress: {
    listStepSuccess: string[];
    stepOptimizing: string;
    stepFailed: string;
  } | null;
  // isSkipTrial: boolean;
  isHasStepRunning: boolean;
}

/**end interface */
