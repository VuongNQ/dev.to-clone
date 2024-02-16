import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EditAuditProductSEO from "./components/EditAuditProductSEO";
import TableAuditProductSEO from "./components/TableAuditProductSEO";
import AuthEditAuditProdSEO from "@swift/middlewares/AuthEditAuditProdSEO";

function ProductAuditSEO() {
	const [searchParams] = useSearchParams();

	const getIdFromSearchParams = useCallback(() => {
		if (searchParams.has("id")) {
			const idProd = searchParams.get("id") || "";
			const covertIdProd = parseInt(idProd);

			if (isNaN(covertIdProd)) {
				return 0;
			}
			return Math.abs(covertIdProd);
		}

		return 0;
	}, [searchParams]);

	const [idProd, setIdProd] = useState<number>(getIdFromSearchParams());

	
	useEffect(() => {
		const idProdParams = getIdFromSearchParams();

		if (idProd === idProdParams) return;

		setIdProd(idProdParams);
	}, [searchParams, idProd]);


	const eleMainDom = useMemo(
		() => (idProd !== 0 ? <AuthEditAuditProdSEO><EditAuditProductSEO idProd={idProd} /></AuthEditAuditProdSEO>  : <TableAuditProductSEO />),
		[idProd]
	);

	return <>{eleMainDom}</>;
}

export default ProductAuditSEO;
