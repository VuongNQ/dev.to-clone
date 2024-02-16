import TabsPolaris from "@swift/components/UIs/TabsGeneral/TabsPolaris";
import { TABS_EDIT_AUDIT } from "@swift/constants/constantsSeoBasic";
import { IFieldValidate } from "@swift/types/boostSEO";
import { useFormikContext } from "formik";
import { lazy, useContext } from "react";
import { useTranslation } from "react-i18next";
import { EditAuditProductContext } from "../../contexts/editAuditProduct";

const MetaTagEditAuditProduct = lazy(
    () => import("../MetaTagEditAuditProduct")
);
const ProductContentEditAuditProduct = lazy(
    () => import("../ProductContentEditAuditProduct")
);

export const FormOnTabs = ({ idProd, isDataChange }: IPropsTabForm) => {
    const { t } = useTranslation();

    const URL_REDIRECT = `/seo-basic?tabs=audit_product&id=${idProd}&sub_tabs=`;

    const LIST_TABS = [
        {
            id: TABS_EDIT_AUDIT.meta_Tag.key,
            content: t(TABS_EDIT_AUDIT.meta_Tag.title),
            component: <MetaTagEditAuditProduct />,
            accessibilityLabel: TABS_EDIT_AUDIT.meta_Tag.title,
            panelID: TABS_EDIT_AUDIT.meta_Tag.key,
            tabs: TABS_EDIT_AUDIT.meta_Tag.key,
        },
        {
            id: TABS_EDIT_AUDIT.product_content.key,
            content: t(TABS_EDIT_AUDIT.product_content.title),
            component: <ProductContentEditAuditProduct />,
            accessibilityLabel: TABS_EDIT_AUDIT.product_content.title,
            panelID: TABS_EDIT_AUDIT.product_content.key,
            tabs: TABS_EDIT_AUDIT.product_content.key,
        },
    ];

    const { dataDetailAuditProduct } = useContext(EditAuditProductContext);

    const { setFieldValue, resetForm } = useFormikContext();

    const onResetForm = () => {
        // on reset form, field description_html will be trigger on change, so need update origin value of field title to bypass on validate function
        setFieldValue(IFieldValidate.title, dataDetailAuditProduct?.title);
        setTimeout(resetForm, 100);
    };

    return (
        <div className="EditAuditProduct__tabs">
            <TabsPolaris
                paramsQuery="sub_tabs"
                urlRedirect={URL_REDIRECT}
                listTabs={LIST_TABS}
                isNotChangeTabs={isDataChange}
                onResetForm={onResetForm}
                isUseSearchParams
            />
        </div>
    );
};

interface IPropsTabForm {
    idProd: number;
    isDataChange: boolean;
}