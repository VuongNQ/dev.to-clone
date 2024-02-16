import { useCallback, useContext, useState } from "react";
import { EditAuditProductContext } from "../contexts/editAuditProduct";
import { ProfileTokenContext } from "../contexts/profileToken";

export const useProductContentAnalysis = (productID: number) => {
    const [tokenUsed, setTokenUsed] = useState(0);

    const [isError, setIsError] = useState(false);

    const { isValidTokenChatGPT, onOpenModalWarningToken, refetchToken } =
        useContext(ProfileTokenContext);

    const { handlePostAnalyzeProduct } = useContext(EditAuditProductContext);

    const onAnalyzeProduct = useCallback(async () => {
        if (!isValidTokenChatGPT) {
            onOpenModalWarningToken();
            return;
        }
        setIsError(false);

        const { status, usedToken,message, errors} = (await handlePostAnalyzeProduct(
            productID
        ));
        setTokenUsed(usedToken);
        refetchToken();
        
        if(status) return

        if (!status && errors && !Array.isArray(errors)) {
            setIsError(true);
        }

        return {
            message
        }
    }, [
        isValidTokenChatGPT,
        handlePostAnalyzeProduct,
        onOpenModalWarningToken,
        productID,
        refetchToken,
    ]);

    return {
        isError,
        tokenUsed,
        onAnalyzeProduct,
    };
};
