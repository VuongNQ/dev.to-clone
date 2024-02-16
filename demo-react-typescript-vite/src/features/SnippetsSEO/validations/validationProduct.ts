import { EFieldSnippetProduct } from "@swift/types/snippetSEO";
import * as Yup from "yup";

export const validationSchemaProduct = Yup.object().shape({
  [EFieldSnippetProduct.active]: Yup.bool(),
  [EFieldSnippetProduct.product_review_app]: Yup.string()
    .nullable()
    .default(null),
});
