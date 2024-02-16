import { Icon, Page, Text } from "@shopify/polaris";
import { CapturePaymentMinor, StarOutlineMinor } from "@shopify/polaris-icons";
import Breadcrumb from "@swift/components/UIs/Breadcrumb";
import ToggleSwitch from "@swift/components/UIs/ToggleSwitch";
import { BREADCRUMB_PRICING } from "@swift/constants/constantBreadcrumb";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/free-mode";
import TabsPackage from "./components/TabsPackage";
import "./styles.scss";
import TabsServices from "./components/TabsServices";
import { TABS_PRICING } from "./constant";
import ModalBaseInfo from "@swift/components/UIs/ModalBase/ModalBaseInfo";
import { ModalBaseInfoType } from "@swift/types/general";
import { PlanType } from "@swift/types/planPricing";
import { ExpertCareTicketCreated, ITemTabs } from "./type";
import { useAppSelector } from "@swift/hooks";
import { customerData } from "@swift/store/global";
import iconTicket from "./assets/icon-ticket.svg";
import Parse from "html-react-parser";
import iconModalTicketFree from "./assets/ticket-free.svg";
import { useDisclosure } from "@swift/hooks/useDisclosure";
import { handleReturnIndexTabs } from "./helper";

function NewFeaturesAndPricing() {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const customer = useAppSelector(customerData);

    const [searchParams, setSearchParams] = useSearchParams();

    const {
        isOpen: isOpenModal,
        onClose: onCloseModal,
        onOpen: onOpenModal,
    } = useDisclosure({ defaultIsOpen: false });

    const [isToggleAnnual, setIsToggleAnnual] = useState(false);

    const [modalPlan, setModalPlan] = useState<ModalBaseInfoType | null>(null);

    const onToggleAnnual = useCallback(
        () => setIsToggleAnnual((preValue) => !preValue),
        []
    );

    const LIST_TABS: ITemTabs[] = [
        {
            content: TABS_PRICING.package.content,
            icon: CapturePaymentMinor,
            tabs: TABS_PRICING.package.tabs,
            component: (
                <TabsPackage
                    isToggleAnnual={isToggleAnnual}
                    onToggleAnnual={onToggleAnnual}
                />
            ),
        },
        {
            content: TABS_PRICING.services.content,
            icon: StarOutlineMinor,
            tabs: TABS_PRICING.services.tabs,
            component: (
                <TabsServices
                    isToggleAnnual={isToggleAnnual}
                    onToggleAnnual={onToggleAnnual}
                />
            ),
        },
    ];

    const [tabsSelected, setTabsSelected] = useState(
        searchParams.has("tabs")
            ? handleReturnIndexTabs(LIST_TABS, searchParams.get("tabs") || "")
            : 0
    );

    const contentTicketFree = useMemo(
        () => (
            <div className="flex flex-col gap-5 items-center pt-2">
                <div className="NewFeaturesAndPricing__banner-ticket flex gap-2 items-center p-2">
                    <img src={iconTicket} alt="" />
                    <Text as="span" variant="headingXs">
                        {t("pricing_page.modal.free_ticket.banner")}
                    </Text>
                </div>

                <Text as="p" variant="bodyMd">
                    {Parse(t("pricing_page.modal.free_ticket.des"))}
                </Text>
            </div>
        ),
        [t]
    );

    const handleTabChange = useCallback(
        (selectedTabIndex: number) => {
            const nameTabs = LIST_TABS[selectedTabIndex].tabs;
            searchParams.set("tabs", nameTabs);
            setSearchParams(searchParams);
            setTabsSelected(selectedTabIndex);
        },
        [searchParams, setSearchParams]
    );

    /** handle open modal if have param expert_care_ticket_created*/
    const handleOpenModalFreeTicket = useCallback(() => {
        if (
            !customer ||
            (customer && customer.app_plan !== PlanType.expert_care)
        )
            return;

        const expertCareTicketCreated = searchParams.get(
            "expert_care_ticket_created"
        );

        if (
            !expertCareTicketCreated ||
            (expertCareTicketCreated &&
                expertCareTicketCreated === ExpertCareTicketCreated.not_created)
        )
            return;

        searchParams.delete("expert_care_ticket_created");
        setSearchParams(searchParams);

        setModalPlan({
            titleHidden: true,
            title: t("pricing_page.modal.free_ticket.title"),
            icon: iconModalTicketFree,
            des: contentTicketFree,
            titleSecondaryAction: t("common.btn_got_it"),
            titlePrimaryAction: t("common.btn_my_ticket"),
            onPrimaryAction: () => {
                navigate("/one-experts?tabs=ticket");
            },
            onSecondaryAction: onCloseModal,
        });

        onOpenModal();
    }, [
        contentTicketFree,
        customer,
        navigate,
        onCloseModal,
        onOpenModal,
        searchParams,
        setSearchParams,
        t,
    ]);
    /** handle open modal if have param expert_care_ticket_created*/

    useEffect(() => {
        if (searchParams.has("tabs")) {
            const nameTabs = searchParams.get("tabs") || "";
            const indexTabs = handleReturnIndexTabs(LIST_TABS, nameTabs);
            setTabsSelected(indexTabs);
        } else {
            setTabsSelected(0);
        }
    }, []);

    /** open modal have ticket free */
    useEffect(() => {
        handleOpenModalFreeTicket();
    }, [customer?.app_plan]);

    return (
        <>
            <Breadcrumb listBreadcrumb={BREADCRUMB_PRICING} />
            <Page>
                <div className="NewFeaturesAndPricing flex flex-col gap-5">
                    <div className="flex">
                        <div className="flex-1">
                            <Text variant="headingLg" as="h1">
                                {t("new_pricing_page.title")}
                            </Text>
                        </div>
                        <div className="flex gap-2 items-center">
                            <ToggleSwitch
                                isActive={isToggleAnnual}
                                onChangeActive={onToggleAnnual}
                            />
                            <div
                                className="NewFeaturesAndPricing__toggle cursor-pointer"
                                onClick={onToggleAnnual}
                            >
                                <Text as="span" variant="bodyMd">
                                    {t("new_pricing_page.toggle_interval.0")}
                                </Text>{" "}
                                <span className="NewFeaturesAndPricing__txt-highlight">
                                    {t("new_pricing_page.toggle_interval.1")}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="NewFeaturesAndPricing__header p-1 flex gap-2">
                        {LIST_TABS.map((item, index) => (
                            <div
                                key={item.content}
                                className={`NewFeaturesAndPricing__button flex-1 flex gap-1 items-center  justify-center py-2 ${
                                    tabsSelected === index && "active"
                                }`}
                                onClick={() => {
                                    handleTabChange(index);
                                }}
                            >
                                <Icon
                                    source={item.icon}
                                    color={
                                        tabsSelected === index
                                            ? "success"
                                            : "subdued"
                                    }
                                />
                                <Text
                                    as="span"
                                    variant="bodyMd"
                                    color={
                                        tabsSelected === index
                                            ? "success"
                                            : "subdued"
                                    }
                                >
                                    {t(item.content)}
                                </Text>
                            </div>
                        ))}
                    </div>

                    <div className="NewNewFeaturesAndPricing__body">
                        {LIST_TABS[tabsSelected].component}
                    </div>
                </div>

                {/* modal notification*/}
                <ModalBaseInfo
                    isOpenModal={isOpenModal}
                    icon={modalPlan?.icon || ""}
                    title_header={modalPlan?.title_header}
                    des={modalPlan?.des}
                    titlePrimaryAction={modalPlan?.titlePrimaryAction}
                    onPrimaryAction={modalPlan?.onPrimaryAction}
                    title={modalPlan?.title}
                    titleSecondaryAction={modalPlan?.titleSecondaryAction}
                    onSecondaryAction={onCloseModal}
                    isDestructive={modalPlan?.isDestructive}
                    onCloseAction={onCloseModal}
                    titleHidden={modalPlan?.titleHidden}
                    isSmall={true}
                />
            </Page>
        </>
    );
}

export default NewFeaturesAndPricing;
