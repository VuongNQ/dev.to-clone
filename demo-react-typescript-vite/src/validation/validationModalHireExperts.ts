import { REGEX_NUMBER, REGEX_NUMBER_INTEGER, REGEX_NUMBER_LARGE_THAN_0, REGEX_NUMBER_POSITIVE } from "@swift/constants/constantRegex";
import { EFormHireExperts } from "@swift/types/modalHireExperts";
import * as Yup from "yup";

export const validationModalHireExperts = Yup.object().shape({
    [EFormHireExperts.number_of_tickets]: Yup.string()
        .required("modal.hire_experts.error_required")
        .matches(REGEX_NUMBER, "modal.hire_experts.error_required")
        .matches(REGEX_NUMBER_POSITIVE, "modal.hire_experts.error_min_ticket")
        .matches(REGEX_NUMBER_LARGE_THAN_0, "modal.hire_experts.error_min_ticket")
        .matches(REGEX_NUMBER_INTEGER, "modal.hire_experts.error_integer"),
    [EFormHireExperts.extra_price]: Yup.string()
        .matches(REGEX_NUMBER, "modal.hire_experts.error_required")
        .matches(REGEX_NUMBER_POSITIVE, "modal.hire_experts.error_min_extra_price")
        .matches(REGEX_NUMBER_INTEGER, "modal.hire_experts.error_integer"),
});
