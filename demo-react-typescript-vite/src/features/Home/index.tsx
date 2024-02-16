import { Badge, Button, Icon, Layout, Page, Text } from "@shopify/polaris";
import {
    BehaviorMajor,
    CancelSmallMinor,
    FeaturedContentMajor,
    GaugeMinor,
    ProfileMinor,
} from "@shopify/polaris-icons";
import arrowHighLight from "@swift/assets/svg/home/arrow-highlight.svg";
import bannerRocket from "@swift/assets/svg/home/banner-rocket.svg";
import ModalHireExpert from "@swift/components/ModalHireExpert";
import { PLAN_PRICING } from "@swift/constants/constantPlanPricing";
import { useAppSelector } from "@swift/hooks";
import useCrispChat from "@swift/hooks/useCrispChat";
import { useDisclosure } from "@swift/hooks/useDisclosure";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import { customerData, getPricingStore } from "@swift/store/global";
import { EOnBoard } from "@swift/types/general";
import { ITrialDays, PlanType } from "@swift/types/planPricing";
import { useCallback, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import SectionBanner from "./component/SectionBanner";
import SectionFeatures from "./component/SectionFeatures";
import SectionScoreSEO from "./component/SectionScoreSEO";
import SectionScoreSpeed from "./component/SectionScoreSpeed";
import "./styles.scss";

const HomePage = () => {
    const { t } = useTranslation();

    const customer = useAppSelector(customerData);

    const { onRedirectApp } = useFuncRedirect();

    const { onContactSupport } = useCrispChat();

    const {
        isOpen: isOpenHireExperts,
        onClose: onCloseHireExperts,
        onOpen: onOpenHireExperts,
    } = useDisclosure({ defaultIsOpen: false });

    const onUpgradeOrHireExperts = useCallback((type: "hire" | "upgrade") => {
        if (type === "hire") {
            onOpenHireExperts();
            return;
        }
        if (type === "upgrade") {
            onRedirectApp("/pricing");
            return;
        }
    }, []);

    return (
        <div className="Home">
            <Page>
                <Layout>
                    <Layout.Section>
                        <div className="flex justify-between items-center mb-3 Home-header__breadcrumb">
                            <Text as="p">{t("home.breadcrumb")}</Text>
                            <div
                                className={`inline-flex Home-header__contact-support ${!customer ? "hidden" : ""}`}
                                onClick={() => onContactSupport("I would like to get supported on SEO function")}
                            >
                                <Text as="p">{t("common.btn_contact_customer_support")}</Text>
                                <Icon source={BehaviorMajor} color="base" />
                            </div>
                        </div>
                        <div className="p-3 Home__section shadow-xs">
                            <div className="flex items-center justify-between Home-header__store">
                                <div className="Home-header__store-title flex items-center">
                                    <div className="flex items-center">
                                        <Text as="h1" variant="headingMd">
                                            {customer?.name}
                                        </Text>

                                        <Badge>{t(PLAN_PRICING[customer?.app_plan || PlanType.free].title)}</Badge>
                                    </div>
                                    <div className="flex items-center">
                                        <ButtonRedirectPage />
                                    </div>
                                </div>
                                <div className="Home-header__store-addition flex gap-2">
                                    <ButtonRedirectPage />
                                    <div style={{ color: "#0A855C" }}>
                                        <Button
                                            monochrome
                                            outline
                                            icon={GaugeMinor}
                                            onClick={() => {
                                                onRedirectApp("/onboarding");
                                            }}
                                        >
                                            {customer && customer.onboarding_step >= EOnBoard.onBoarded
                                                ? t("onboarding_page.btn_re_boost")
                                                : t("onboarding_page.step1_component.btn")}
                                        </Button>
                                    </div>
                                    <Button
                                        primary
                                        onClick={() =>
                                            onUpgradeOrHireExperts(
                                                customer?.app_plan === PlanType.free ? "upgrade" : "hire"
                                            )
                                        }
                                    >
                                        {customer?.app_plan === PlanType.free
                                            ? `${t("common.btn_upgrade")}`
                                            : `${t("common.btn_hire")}`}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Layout.Section>
                    <Layout.Section>
                        <div className="Home__section shadow-xs p-5">
                            <section className="text-center">
                                {/* <img
                                    src={LogoSvg}
                                    alt="Logo Swift App SEO"
                                    className="mb-4"
                                /> */}
                                <div className="mb-3">
                                    <Text as="h1" variant="heading3xl">
                                        {t("home.title")}
                                    </Text>
                                </div>
                                <Text as="p" color="subdued">
                                    {t("home.subtitle")}🧐
                                </Text>
                            </section>
                            {/* <SectionScore /> */}
                            <div className="Home__box-chart flex gap-5 pt-5">
                                <SectionScoreSEO />
                                <SectionScoreSpeed />
                            </div>
                            <div className="flex justify-center mt-5" style={{
                                gap:"40px"
                            }}>
                                <div className="flex gap-3 items-center">
                                    <div className="Home-point Home-point--red"></div>
                                    <Text as="span" variant="bodyMd">
                                        {t("home.txt_not_good")}
                                    </Text>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div className="Home-point Home-point--yellow"></div>
                                    <Text as="span" variant="bodyMd">
                                        {t("home.txt_normal")}
                                    </Text>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div className="Home-point Home-point--green"></div>
                                    <Text as="span" variant="bodyMd">
                                        {t("home.txt_very_good")}
                                    </Text>
                                </div>
                            </div>
                        </div>
                    </Layout.Section>
                    <Layout.Section>
                        <SectionFeatures />
                    </Layout.Section>
                    <Layout.Section>
                        <SectionBanner />
                    </Layout.Section>
                    <SectionBannerUpgrade />
                </Layout>
                <ModalHireExpert isOpen={isOpenHireExperts} onClose={onCloseHireExperts} />
            </Page>
        </div>
    );
};

const ButtonRedirectPage = () => (
    <>
        <Button icon={ProfileMinor} outline size="slim" url="/profile"></Button>
        <Button icon={FeaturedContentMajor} outline size="slim" url="/feedback"></Button>
    </>
);

const SectionBannerUpgrade = () => {
    const { t } = useTranslation();

    const customer = useAppSelector(customerData);

    const customerPlan = useAppSelector(getPricingStore);

    const showBanner = useMemo(() => {
        if (!customer) return false;
        const planAllow =
            customer.app_plan &&
            [PlanType.free, PlanType.basic, PlanType.premium].includes(customer?.app_plan) &&
            (customerPlan.trial_days ?? 3) !== ITrialDays.isOutTrial;
        try {
            return sessionStorage.getItem("showBanner") !== "hide" && planAllow;
        } catch (error) {
            return planAllow;
        }
    }, [customer, customerPlan.trial_days]);

    const sectionBanner = useRef<HTMLDivElement | null>(null);

    // reset showBanner status on reload page
    // window.onbeforeunload = () => sessionStorage.removeItem("showBanner");

    const setHideBanner = () => {
        if (sectionBanner.current && sectionBanner.current?.parentElement)
            sectionBanner.current.parentElement.hidden = true;
        try {
            sessionStorage.setItem("showBanner", "hide");
        } catch (error) {
            // console.error;
        }
    };

    if (!showBanner) return <></>;

    return (
        <Layout.Section>
            <div className="Home__section shadow-xs p-5 bg-primary Home-banner__bottom" ref={sectionBanner}>
                <section className="flex">
                    <img src={bannerRocket} className="Home-banner__image" loading="lazy" />
                    <div className="Home-banner__upgrade flex-auto">
                        <div className="flex justify-between mb-3 items-start">
                            <Text as="h2" color="text-inverse">
                                {t("home.banner.upgrade.title")}
                            </Text>
                            <Button icon={CancelSmallMinor} plain onClick={setHideBanner}></Button>
                        </div>
                        <div className="flex items-center py-1">
                            <img src={arrowHighLight} className="mr-2" />
                            <Text as="p" color="text-inverse">
                                {t("home.banner.upgrade.improve_first")}
                            </Text>
                        </div>
                        <div className="flex items-center py-1">
                            <img src={arrowHighLight} className="mr-2" />
                            <Text as="p" color="text-inverse">
                                {t("home.banner.upgrade.improve_second")}
                            </Text>
                        </div>
                        <div className="flex items-center py-1">
                            <img src={arrowHighLight} className="mr-2" />
                            <Text as="p" color="text-inverse">
                                {t("home.banner.upgrade.improve_third")}
                            </Text>
                        </div>
                        <div className="Home-banner__upgrade-button mt-3">
                            <Button url="/pricing">{t("home.banner.upgrade.btn")}</Button>
                        </div>
                    </div>
                </section>
            </div>
        </Layout.Section>
    );
};

export default HomePage;
