import * as Yup from "yup";
// Define the form validation schema using Yup
export enum IMaxStringProductAudit {
  // meta_title_allow = 255,
  meta_title_advise = 70,
  meta_description_allow = 1024, 
  meta_description_advise = 320,
  title_tag_allow = 512,
  title_tag_advise = 255,
  title_tag_warning = 50,
}

export const validationSchemaEditAuditProduct = Yup.object().shape({
  title: Yup.string().required("smartSEO.audit_product.validate.title_required").max(IMaxStringProductAudit.title_tag_advise, "smartSEO.audit_product.validate.title_max"),
  title_tag: Yup.string(),
  description_tag: Yup.string(),
  description_html: Yup.string(),
});
