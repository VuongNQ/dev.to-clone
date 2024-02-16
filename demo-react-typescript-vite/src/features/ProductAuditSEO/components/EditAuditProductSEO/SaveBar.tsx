import { ContextualSaveBar } from "@shopify/polaris";
import { IFieldValidate } from "@swift/types/boostSEO";
import { IMaxStringProductAudit } from "@swift/validation/validationAuditProduct";
import { useFormikContext } from "formik";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { EditAuditProductContext } from "../../contexts/editAuditProduct";

export const SaveContextBar = ({
    isShowBar,
    callBackToast,
}: IPropsContextualSaveBar) => {
    const { t } = useTranslation();

    const { errors, submitForm, setFieldValue, resetForm } = useFormikContext();

    const { isLoadingPutAuditProduct, dataDetailAuditProduct } = useContext(
        EditAuditProductContext
    );

    const handleValidateSubmit = (errors: object, actionSubmit: () => void) => {
        const listError = Object.values(errors);
        const listKeys = Object.keys(errors);
        const bindingMax = () => {
            switch (listKeys[0]) {
                case IFieldValidate.title:
                    return IMaxStringProductAudit.title_tag_advise;
                case IFieldValidate.title_tag:
                    return IMaxStringProductAudit.meta_title_advise;
                case IFieldValidate.description_tag:
                    return IMaxStringProductAudit.meta_description_advise;
                default:
                    return "";
            }
        };
        if (listError.length > 0) {
            callBackToast(
                t(listError[0], {
                    maxAdvise: bindingMax(),
                })
            );
        } else {
            actionSubmit();
        }
    };

    if (!isShowBar) return <></>;

    return (
        <ContextualSaveBar
            message={t("setting_page.language.save_bar.title")}
            saveAction={{
                content: t("common.btn_save"),
                onAction: () => {
                    handleValidateSubmit(errors, submitForm);
                },
                loading: isLoadingPutAuditProduct,
                // disabled: !isValid,
            }}
            discardAction={{
                content: t("common.btn_discard"),
                onAction: () => {
                    // setStatusResetForm(true);
                    // on reset form, field description_html will be trigger on change, so need update origin value of field title to bypass on validate function
                    setFieldValue(
                        IFieldValidate.title,
                        dataDetailAuditProduct?.title
                    );
                    setTimeout(resetForm, 100);
                },
                disabled: isLoadingPutAuditProduct,
            }}
        />
    );
};

interface IPropsContextualSaveBar {
    isShowBar: boolean;
    callBackToast: (message: string) => void;
}
