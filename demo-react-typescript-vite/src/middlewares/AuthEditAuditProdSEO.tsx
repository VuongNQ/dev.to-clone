import { useAppSelector } from "@swift/hooks";
import { customerData } from "@swift/store/global";
import { PlanType } from "@swift/types/planPricing";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

const ACCEPT_PLAN_EDIT_AUDIT = [
  PlanType.basic,
  PlanType.premium,
  PlanType.premium_plus,
  PlanType.expert_care,
];

const URL_REDIRECT = "/seo-basic?tabs=audit_product";

const AuthEditAuditProdSEO = ({ children }: PropsWithChildren) => {
  const customer = useAppSelector(customerData);

  // const [searchParams] = useSearchParams();

  // const getIdFromSearchParams = useCallback(() => {
  //   const tabs = searchParams.get("tabs");
  //   if (
  //     searchParams.has("id") &&
  //     tabs &&
  //     tabs === TABS_SMART_SEO_BASIC.audit_product.key
  //   ) {
  //     const idProd = searchParams.get("id") || "";
  //     const covertIdProd = parseInt(idProd);

  //     if (isNaN(covertIdProd)) {
  //       return 0;
  //     }
  //     return Math.abs(covertIdProd);
  //   }

  //   return 0;
  // }, [searchParams]);

  // const [idProd, setIdProd] = useState<number>(getIdFromSearchParams());

  // useEffect(() => {
  //   const idProdParams = getIdFromSearchParams();
  //   if (
  //     idProdParams !== 0 &&
  //     !ACCEPT_PLAN_EDIT_AUDIT.includes(customer?.app_plan || PlanType.free)
  //   ) {
  //     <Navigate to={URL_REDIRECT} replace />;
  //   }
  // }, [searchParams]);

  if (!customer || !ACCEPT_PLAN_EDIT_AUDIT.includes(customer.app_plan)) {
    return <Navigate to={URL_REDIRECT} replace />;
  }

  return children;
};

export default AuthEditAuditProdSEO;
