import { EFieldFQASnippet, EFieldSnippetFAQ } from "@swift/types/snippetSEO";
import * as Yup from "yup";

export const validationSchemaFAQ = Yup.object().shape({
  [EFieldSnippetFAQ.active]: Yup.bool(),
  [EFieldSnippetFAQ.faqs]: Yup.array(
    Yup.object().shape({
      [EFieldFQASnippet.answer]: Yup.string().required(
        "smartSEO.snippet.fqa_invalid_answer"
      ),
      [EFieldFQASnippet.question]: Yup.string().required(
        "smartSEO.snippet.fqa_invalid_question"
      ),
    })
  )
    // .when(EFieldSnippetFAQ.active, {
    //   is: true,
    //   then: (schema) =>
    //     schema.min(1, "optimize_theme.auto_optimize.validate.0"),
    // })
    .nullable()
    .default(null),
});
