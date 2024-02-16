import { NavigationMenu } from "@shopify/app-bridge-react";
import { GlobeMajor } from "@shopify/polaris-icons";
import InputSelect from "@swift/components/UIs/InputSelect";
import { MENU_SHOPIFY } from "@swift/constants/constantMenu";
import NotificationApp from "@swift/features/NotificationApp";
import { useAppDispatch, useAppSelector } from "@swift/hooks";
import useCrispChat from "@swift/hooks/useCrispChat";
import useScrollToTopChangePage from "@swift/hooks/useScrollToTopChangePage";
import { queryKeys } from "@swift/queryKeys";
import { useGeneralAppService } from "@swift/services/generalAppApi";
import { usePricingApiService } from "@swift/services/pricingApi";
import { useSegmentService } from "@swift/services/segmentApi";
import { customerData, globalActions } from "@swift/store/global";
import { IDataCrispChat } from "@swift/types/general";
import { SUPPORTED_APP_LOCALES } from "@swift/utils/i18nUtils";
import { useQuery } from "@tanstack/react-query";
import i18next from "i18next";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

const AppPreloading = () => {

    const customer = useAppSelector(customerData);

    const dispatch = useAppDispatch();

    const { getInitCrisp } = useGeneralAppService();

    const { postSegmentPageView } = useSegmentService();

    const { initCrispChat } = useCrispChat();

    const { getCurrentPlan } = usePricingApiService();

    const { updatePricingAction, updatePlanAndIntervalAction } = globalActions;

    useQuery({
        ...queryKeys.pricing.currentPlan(customer),
        refetchOnWindowFocus: true,
        enabled: !!customer,
        retry: 2, //retry trường hợp api ko trả về data
        queryFn: async () => {
            const { data, status } = await getCurrentPlan();

            if (data && status) {
                dispatch(
                    updatePricingAction({
                        trial_days: data.trial_days,
                        has_expert_ticket: data.has_expert_ticket,
                    })
                );
                dispatch(
                    updatePlanAndIntervalAction({
                        app_plan: data.plan,
                        app_plan_interval: data.interval,
                    })
                );
            }
            // response ko trả về data
            if (!status) {
                throw new Error("Network response was not ok");
            }

            return data;
        },
    });

    const { data: dataCrispChat } = useQuery({
        ...queryKeys.crisp.getCrispChat(customer),
        enabled: !!(customer && !customer.app_lock),
        refetchOnWindowFocus: false,
        queryFn: async () => {
            // if (!dataCustomer) return;
            const { data } = await getInitCrisp();

            return data;
        },
    });

    useQuery({
        ...queryKeys.crisp.initCrispChatWidget(dataCrispChat),
        enabled: Boolean(dataCrispChat),
        refetchOnWindowFocus: false,
        queryFn: async () => {
            if (!dataCrispChat || !customer || customer.app_lock) return;
            initCrispChat(dataCrispChat as IDataCrispChat, customer);
            return null;
        },
    });
    
    useScrollToTopChangePage();

    /** post segment page view */
    useEffect(() => {
        postSegmentPageView();
    }, [window.location.pathname]);
    /**end post segment page view */

    return (
        <>
            <NavigationMenu
                navigationLinks={
                    customer && !customer.app_lock ? MENU_SHOPIFY : []
                }
                matcher={(link, location) =>
                    link.destination ===
                    (
                        location as {
                            search: string;
                            hash: string;
                            pathname: string;
                        }
                    ).pathname
                }
            />
            <NotificationApp />
            <Outlet />
            <section style={{ marginTop: "var(--p-space-3)" }}>
                <div className="flex justify-center">
                    <ChangeLanguage />
                </div>
            </section>
        </>
    );
};

function ChangeLanguage() {
    const { t } = useTranslation();

    const countriesLangue: Record<string, string> = {
        en: t("country.english"),
        fr: t("country.france"),
        de: t("country.german"),
        ja: t("country.japanese"),
        pt: t("country.portuguese"),
        es: t("country.spanish"),
    };
    const listAction = SUPPORTED_APP_LOCALES.map((l) => ({
        label: countriesLangue[l],
        value: l,
    }));
    return (
        <InputSelect
            options={listAction}
            selected={[i18next.language]}
            setSelected={(value) => i18next.changeLanguage(value[0])}
            icon={GlobeMajor}
            plain
            monochrome
            removeUnderline
        />
    );
}

export default AppPreloading;
