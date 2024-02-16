import { Frame, Loading } from "@shopify/polaris";
import AppBridgeProvider from "@swift/components/Providers/AppBridgeProvider";
import AppPreloading from "@swift/routers/AppPreloading";
import PolarisProvider from "@swift/components/Providers/PolarisProvider";
import QueryProvider from "@swift/components/Providers/QueryProvider";
import store from "@swift/store";
import { PropsWithChildren, Suspense } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { useAppDispatch } from "@swift/hooks";
import { useLocation, useNavigate } from "react-router";
import { globalActions } from "@swift/store/global";
import { useOneCommerceOperation } from "@swift/hooks/useOneCommerceOperation";
import { useGeneralAppService } from "@swift/services/generalAppApi";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@swift/queryKeys";
import { EOnBoard } from "@swift/types/general";
import UninstallFeature from "@swift/features/UninstallFeature";

export const Layout: React.FC = () => {
    return (
        <PolarisProvider>
            <AppBridgeProvider>
                <QueryProvider>
                    <ReduxProvider store={store}>
                        <Frame>
                            <Suspense fallback={<Loading />}>
                                <MiddlewareAppLocked>
                                    <AppPreloading />
                                </MiddlewareAppLocked>
                            </Suspense>
                        </Frame>
                    </ReduxProvider>
                </QueryProvider>
            </AppBridgeProvider>
        </PolarisProvider>
    );
};

const MiddlewareAppLocked = ({ children }: PropsWithChildren) => {
    const dispatch = useAppDispatch();

    const location = useLocation();

    const { updateCustomer } = globalActions;

    const isUnInstallPage = location.pathname === "/un-install";

    const {
        addScriptOneCommerceOperationTool,
        addScriptOneTracking,
        initOneCommerce,
    } = useOneCommerceOperation();

    const { getCustomerDetailStore } = useGeneralAppService();
    const navigate = useNavigate();

    const { data: dataCustomer, isLoading } = useQuery({
        ...queryKeys.customer.detail(),
        refetchOnWindowFocus: false,
        queryFn: async () => {
            const { status, data } = await getCustomerDetailStore();
            if (!status || !data) {
                // in case 401 or cannot get detail, default value is app locked
                dispatch(updateCustomer({ app_lock: true }));
                return { app_lock: true };
            }

            dispatch(updateCustomer(data));

            addScriptOneCommerceOperationTool();
            addScriptOneTracking();
            initOneCommerce({
                email: data.email,
                name: data.name,
                myshopify_domain: data.domain || data.shopify_domain,
                plan_name: data.app_plan,
            });
            // auto redirect to home when app not lock
            if (!data.app_lock && isUnInstallPage) navigate("/");
            // console.log("data.onboarding_step", data.onboarding_step);
            // auto redirect to onboarding for new user
            if (data.onboarding_step === EOnBoard.not_onboard)
                navigate("/onboarding");
            return data;
        },
    });

    if (isLoading) return <Loading />;

    if ((!dataCustomer || dataCustomer.app_lock) && !isUnInstallPage)
        return <UninstallFeature />;

    return <>{children}</>;
};
