import {
  CustomizeLoadingFormDataType,
  CustomizeLoadingSetting,
  CustomizeLoadingTemplateType,
} from "./type";

type TObject =
  | CustomizeLoadingFormDataType
  | CustomizeLoadingTemplateType
  | CustomizeLoadingSetting;

export const createFormData = (
  object:
    | CustomizeLoadingFormDataType
    | CustomizeLoadingTemplateType
    | CustomizeLoadingSetting,
  form?: FormData,
  namespace?: string
) => {
  const formData = form || new FormData();
  for (const property in object) {
    const formKey = namespace ? `${namespace}[${property}]` : property;
    const valueKey = object[
      property as keyof TObject
    ] as unknown as typeof object;
    if (valueKey instanceof Date) {
      formData.append(formKey, valueKey.toISOString());
    } else if (typeof valueKey === "object" && !(valueKey instanceof File)) {
      if (Array.isArray(valueKey) && valueKey.length <= 0) {
        formData.append(formKey, "");
      } else {
        createFormData(valueKey, formData, formKey);
      }
    } else {
      formData.append(formKey, valueKey);
    }
  }

  return formData;
};
