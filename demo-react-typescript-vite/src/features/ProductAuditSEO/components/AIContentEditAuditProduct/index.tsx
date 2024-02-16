import { IAssessmentStatus, ILastAssessmentJSON } from "@swift/types/boostSEO";
import { isValidJSON } from "@swift/utils/funcString";
import { memo, useContext, useMemo } from "react";
import { EditAuditProductContext } from "../../contexts/editAuditProduct";
import { ResultAnalytic } from "./DisplayResult";
import { convertDataStringToDataObject } from "./helper";
import "./styles.scss";

const AIContentEditAuditProductMemo = ({
    idProd,
    isDataChange,
}: IAIContentEditAuditProduct) => {
    const { dataDetailAuditProduct } = useContext(EditAuditProductContext);

    const storeDataAnalysis = useMemo(() => {
        const defaultValue: ILastAssessmentJSON = {
            optimization_level: IAssessmentStatus.all,
            assessment: "",
            comments_and_suggestions: "",
            well_optimized_elements: [],
            poorly_optimized_elements: [],
            used_tokens_amount: 0,
        };
        if (!dataDetailAuditProduct || !dataDetailAuditProduct.audit_product)
            return defaultValue;

        const isJsonData = isValidJSON(
            dataDetailAuditProduct.audit_product.last_assessment
        );

        if (!isJsonData) {
            const { suggest, listPoor, listWell } =
                convertDataStringToDataObject(
                    dataDetailAuditProduct.audit_product.last_assessment
                );
            return {
                ...defaultValue,
                optimization_level:
                    dataDetailAuditProduct.audit_product.assessment_status,
                comments_and_suggestions: suggest,
                well_optimized_elements: listWell,
                poorly_optimized_elements: listPoor,
            };
        }

        const {
            optimization_level,
            assessment,
            comments_and_suggestions,
            well_optimized_elements,
            poorly_optimized_elements,
            used_tokens_amount,
        } = {
            ...JSON.parse(dataDetailAuditProduct.audit_product.last_assessment),
        } as ILastAssessmentJSON;

        return {
            optimization_level: optimization_level,
            assessment: assessment ?? "",
            comments_and_suggestions: comments_and_suggestions ?? [],
            well_optimized_elements: well_optimized_elements ?? [],
            poorly_optimized_elements: poorly_optimized_elements ?? [],
            used_tokens_amount,
        };
    }, [dataDetailAuditProduct]);

    return (
        <ResultAnalytic
            productID={idProd}
            isHaveAssessment={
                !!dataDetailAuditProduct &&
                !!dataDetailAuditProduct.audit_product
            }
            isDataChange={isDataChange}
            detail={storeDataAnalysis}
        />
    );
};

const AIContentEditAuditProduct = memo(AIContentEditAuditProductMemo);

export default AIContentEditAuditProduct;

interface IAIContentEditAuditProduct {
    isDataChange: boolean;
    idProd: number;
}
