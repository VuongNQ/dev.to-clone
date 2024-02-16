import { LIST_TASK_OPTIMIZE } from "@swift/features/OptimizeThemeFeature/constant";
import {
  InforActionOpitimizeThemeType,
  KeyOptimzie,
  StatusProccessOptimzie,
} from "@swift/types/optimizeTheme";
import { useCallback } from "react";

const useFuncOptimizeTheme = () => {
  /**find step in list step */
  const handleReturnStepFound = useCallback((KeyStep: KeyOptimzie | string) => {
    const findStep = LIST_TASK_OPTIMIZE.find((item) => item.key === KeyStep);
    return findStep ? findStep : null;
  }, []);

  const handleReturnDataProgress = useCallback(
    (data: Record<KeyOptimzie, InforActionOpitimizeThemeType | null>) => {
      let listStepSuccess: string[] = [];
      let stepOptimizing: KeyOptimzie | "" = "";
      let stepFailed: KeyOptimzie | "" = "";

      for (const property in data) {
        const infoStep = data[property as KeyOptimzie];

        if (infoStep) {
          const keyStep = KeyOptimzie[`${property as KeyOptimzie}`];

          if (infoStep.status === StatusProccessOptimzie.fail) {
            stepFailed = keyStep;
          }

          if (property !== KeyOptimzie.duplicate) {
            if (infoStep.status === StatusProccessOptimzie.done) {
              listStepSuccess = [...listStepSuccess, keyStep];
            }

            if (infoStep.status === StatusProccessOptimzie["in-process"]) {
              stepOptimizing = keyStep;
            }
          }
        }
      }

      return {
        listStepSuccess,
        stepOptimizing,
        stepFailed,
      };
    },
    []
  );

  return {
    handleReturnStepFound,
    handleReturnDataProgress,
  };
};

export default useFuncOptimizeTheme;
