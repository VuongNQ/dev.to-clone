import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import { useAuditProductService } from "@swift/services/auditProductApi";
import { IDataDetailAuditProduct, generateContentAI } from "@swift/types/boostSEO";
import { EErrorsKeyContent, IErrorsResponseUsingToken } from "@swift/types/wallet";
import { useCallback, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProfileTokenContext } from "../contexts/profileToken";
import { IDataInputConfigLoading } from "../type";

export function useEditAuditProduct(){
    const { onRedirectApp } = useFuncRedirect();
    const [searchParams, setSearchParams] = useSearchParams();

    const { getDetailAuditProduct, postAnalyzeProduct } = useAuditProductService();

    const [dataDetailAuditProduct, setDataAuditProduct] = useState<IDataDetailAuditProduct | null>(null);

    const [isLoadingDetailAuditProduct, setIsLoadingDetailAuditProduct] = useState(true);

    const [isLoadingAnalyzeAuditProduct, setIsLoadingAnalyzeAuditProduct] = useState(false);

    const [isLoadingPutAuditProduct, setIsLoadingPutAuditProduct] = useState(false);

    const [inputConfigLoading, setInputConfigLoading] = useState<IDataInputConfigLoading>({
		isLoadingAnalyze:false,
		isLoadingReAnalyze:false,
		typeGenerate:generateContentAI.title
	});

    const { refetchToken } = useContext(ProfileTokenContext);

    /**fetch Detail Audit Product  */
    const fetchDataDetailAudit = useCallback(async (productId: number) => {
        setIsLoadingDetailAuditProduct(true);

        const { data, status } = await getDetailAuditProduct({
            productId,
        });
        if (status && data) {
            setDataAuditProduct(data);
        } else {
            // onRedirectApp("/not-found");
            onRedirectApp("/seo-basic?tabs=audit_product");
        }

        setIsLoadingDetailAuditProduct(false);
    }, []);
    /**end fetch Detail Audit Product  */

    /**post Analyze Audit Product  */
    const handlePostAnalyzeProduct = useCallback(
        async (productId: number) => {
            setIsLoadingAnalyzeAuditProduct(true);

            const { data, status, errors, message } = await postAnalyzeProduct({
                product_id: productId,
            });

            let usedToken = 0;

            if (!status || !data) {
                setIsLoadingAnalyzeAuditProduct(false);
                if (errors && hasErrorsToken(errors)) {
                    onRedirectApp("/seo-basic?tabs=audit_product");
                }
                return { status, usedToken, message, errors };
            }

            refetchToken();

            const { assessment_status, is_evaluated, last_assessment, product_id, usage } = data;

            usedToken = usage.used_tokens || 0;

            if (dataDetailAuditProduct)
                setDataAuditProduct({
                    ...dataDetailAuditProduct,
                    audit_product: {
                        assessment_status,
                        is_evaluated,
                        last_assessment,
                        product_id,
                    },
                });

            setIsLoadingAnalyzeAuditProduct(false);
            return { status, usedToken };
        },
        [dataDetailAuditProduct]
    );
    /**end post Analyze Audit Product  */

    /** fetch data by productId */
    // useEffect(() => {
    //   if (productId === 0) return;

    //   fetchDataDetailAudit(productId);
    // }, [productId]);
    /**end fetch data by productId */

    const handleUpdateDataAuditProduct = useCallback(
        (payload: Partial<IDataDetailAuditProduct>) => {
            if (!dataDetailAuditProduct) return;

            setDataAuditProduct({
                ...dataDetailAuditProduct,
                ...payload,
            });
        },
        [dataDetailAuditProduct]
    );

    const hasErrorsToken = (errors: unknown) => {
        try {
            const { type, instance } = errors as IErrorsResponseUsingToken;
            const isCorrectError = instance === EErrorsKeyContent.instance;
            const hasError = type === EErrorsKeyContent.notEnoughToken || type === EErrorsKeyContent.tokenExpired;

            return isCorrectError && hasError;
        } catch (error) {
            return false;
        }
    };

    /**
     *
     * @param id id product detail
     *
     * des: redirect when click act more from product overview of shopify admin
     */
    const handleRedirectFirstProd = (id: number) => {
        const isRedirect = searchParams.get("is_prd_first");
        if (isRedirect !== "true") return;

        searchParams.delete("is_prd_first");
        setSearchParams(searchParams);
        onRedirectApp(`/seo-basic?tabs=audit_product&id=${id}`);
    };

    return {
        isLoadingDetailAuditProduct,
        isLoadingAnalyzeAuditProduct,
        isLoadingPutAuditProduct,
        dataDetailAuditProduct,
        handlePostAnalyzeProduct,
        setIsLoadingPutAuditProduct,
        fetchDataDetailAudit,
        handleUpdateDataAuditProduct,
        hasErrorsToken,
        handleRedirectFirstProd,
		inputConfigLoading,
		setInputConfigLoading
    };
}
