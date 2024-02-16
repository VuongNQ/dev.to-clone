import { REGEX_URL } from "@swift/constants/constantRegex";
import * as Yup from "yup";


export const validationSchemaCompetitorSEO = Yup.object().shape({
  currentUrl: Yup.string()
    .required("boostSEO.competitor.input_validate_required")
    .matches(REGEX_URL,"boostSEO.competitor.input_validate_format_url"),
});
