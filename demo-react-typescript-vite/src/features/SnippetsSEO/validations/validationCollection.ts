import {
  EFieldSnippetCollection
} from "@swift/types/snippetSEO";
import * as Yup from "yup";

export const validationSchemaCollection = Yup.object().shape({
  [EFieldSnippetCollection.active]: Yup.bool(),

});
