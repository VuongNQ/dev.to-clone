import { EKeyAutoOptimizeSetting } from "@swift/types/general";
import * as Yup from "yup";

export const validationSchemaAutoOptimizeTheme = Yup.object().shape({
  [EKeyAutoOptimizeSetting.auto_optimize_theme]: Yup.bool().default(false),
//   auto_optimize_image: Yup.number().default(0),
  [EKeyAutoOptimizeSetting.setting_theme]: Yup.array(Yup.string())
    .nullable()
    .default([])
    .when("auto_optimize_theme", {
      is: true,
      then: (schema) => schema.min(1, "optimize_theme.auto_optimize.validate.0"),
    }),
});
