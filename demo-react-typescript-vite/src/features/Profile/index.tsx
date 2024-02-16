import { Button, Card, Icon, Layout, Page, Tabs, Text, Tooltip } from "@shopify/polaris";
import { QuestionMarkMajor } from "@shopify/polaris-icons";
import Banner from "@swift/assets/images/wallet/banner.jpg";
import IconAbovePlanFree from "@swift/assets/svg/wallet/icon-above-free.svg";
import DisableChatGPT from "@swift/assets/svg/wallet/icon-chat-gpt-disable.svg";
import ChatGPT from "@swift/assets/svg/wallet/icon-chat-gpt.svg";
import IconPlanFree from "@swift/assets/svg/wallet/icon-free-plan.svg";
import BuyMore from "@swift/assets/svg/wallet/icon-modal-buy-more-token.svg";
import ModalBuyMore, { ModalBuyMoreHandle } from "@swift/components/ModalBuyMore";
import ModalSkipTrial, { ModalSkipTrialHandle } from "@swift/components/ModalSkipTrial";
import Breadcrumb from "@swift/components/UIs/Breadcrumb";
import InputSelect from "@swift/components/UIs/InputSelect";
import SkeletonBasic from "@swift/components/UIs/Skeletons/SkeletonBasic";
import { BREADCRUMB_PROFILE } from "@swift/constants/constantBreadcrumb";
import { PLAN_PRICING } from "@swift/constants/constantPlanPricing";
import { useAppSelector } from "@swift/hooks";
import useProfileToken from "@swift/hooks/useProfileToken";
import { customerData } from "@swift/store/global";
import { EDaysFilter } from "@swift/types/general";
import { PlanType } from "@swift/types/planPricing";
import { formatDateNameMonthDY } from "@swift/utils/formatDate";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import DeActiveApp from "./components/DeactiveApp";
import ListToken from "./components/ListToken";
import "./styles.scss";

const Profile: React.FC = () => {
    const { t } = useTranslation();

    const customer = useAppSelector(customerData);

    const refModalBuyMore = useRef<ModalBuyMoreHandle>(null);

    const refModalSkipTrial = useRef<ModalSkipTrialHandle>(null);

    const {
        isLoadingProfile,
        isTokenExpired,
        isBonusExpired,
        numberToken,
        bonus_amount,
        bonus_expires_at,
        isRequireSkipTrial,
        isAllowUseTokenByPlan,
        // refetchToken
    } = useProfileToken();

    const navigate = useNavigate();

    const isFreePlan = useMemo(() => !customer || customer.app_plan === PlanType.free, [customer]);

    const [filterDay, setFilterDay] = useState<TStatusFilterDay>("all_time");

    const [selected, setSelected] = useState(0);

    const statusFilterDate = [
        {
            value: "all_time" as TStatusFilterDay,
            label: t("profile.filter.all_time"),
        },
        {
            value: "seven_day" as TStatusFilterDay,
            label: t("profile.filter.seven_day"),
        },
        {
            value: "thirty_day" as TStatusFilterDay,
            label: t("profile.filter.thirty_day"),
        },
        {
            value: "ninety_day" as TStatusFilterDay,
            label: t("profile.filter.ninety_day"),
        },
    ];

    const tabs = [
        {
            id: "all" as TStatusFilterBy,
            content: t("profile.filter.tabs.all"),
        },
        {
            id: "purchase" as TStatusFilterBy,
            content: t("profile.filter.tabs.purchase"),
        },
        {
            id: "usage" as TStatusFilterBy,
            content: t("profile.filter.tabs.usage"),
        },
    ];

    const propsButtonPlan = {
        primary: isFreePlan,
        plain: !isFreePlan,
        removeUnderline: !isFreePlan,
        onClick: () => navigate("/pricing"),
    };

    const onBuyMore = useCallback(() => {
        if (isRequireSkipTrial) {
            refModalSkipTrial.current?.openModal();
            return;
        }
        refModalBuyMore.current?.setModal(true);
    }, [isRequireSkipTrial]);

    const filterBy = useMemo(() => tabs[selected].id, [selected]);

    const range = useMemo(() => EDaysFilter[filterDay], [filterDay]);

    const handleTabChange = useCallback((selectedTabIndex: number) => setSelected(selectedTabIndex), []);

    const renderNote = useMemo(() => {
        if (bonus_amount < 0 || isBonusExpired) return <></>;
        return (
            <div className="Profile__note">
                <Text as="p" variant="bodySm" alignment="start" color={isBonusExpired ? "critical" : "subdued"}>
                {`${bonus_amount.toLocaleString("en-US")} ${t("profile.token.expired_date", {
                    date: formatDateNameMonthDY(bonus_expires_at),
                })}`}
            </Text>
            </div>
        );
    }, [bonus_amount, bonus_expires_at, isBonusExpired, t]);

    return (
        <>
            <Breadcrumb listBreadcrumb={BREADCRUMB_PROFILE} />
            <Page title="Profile">
                <Layout>
                    <Layout.Section>
                        <div className="Profile__wp">
                            <Card padding={{ sm: "0", md: "5" }}>
                                <div className="Profile__section flex">
                                    <section className="Profile-left text-center">
                                        <div className="flex flex-col p-3 items-center Profile-left__plan">
                                            <img src={isFreePlan ? IconPlanFree : IconAbovePlanFree} />
                                            <div className="Profile-left__plan-define">
                                                <Text as="span" variant="headingSm">
                                                    {t("profile.plan_current.title", {
                                                        plan: t(
                                                            PLAN_PRICING[customer?.app_plan || PlanType.free].title
                                                        ),
                                                    })}
                                                </Text>
                                            </div>
                                            <Button {...propsButtonPlan}>
                                                {t(isFreePlan ? "common.btn_upgrade" : "common.btn_more_feature")}
                                            </Button>
                                        </div>
                                        <div className="flex items-center gap-1 mb-1">
                                            <Text as="span" variant="bodySm">
                                                {t("profile.token.sub_title")}
                                            </Text>
                                            <Tooltip content={t("profile.token.tooltip")}>
                                                <Icon source={QuestionMarkMajor} color="base" />
                                            </Tooltip>
                                        </div>
                                        <div className="Profile-left__title">
                                            {isLoadingProfile ? (
                                                <SkeletonBasic height="32px" />
                                            ) : (
                                                <Tooltip
                                                    active={isTokenExpired}
                                                    content={
                                                        "Usage time has expired. To continue using, please buy more tokens."
                                                    }
                                                    activatorWrapper="div"
                                                >
                                                    <img src={isTokenExpired ? DisableChatGPT : ChatGPT} />
                                                    <div className="flex-1">
                                                        <Text as="p" variant="headingMd" alignment="start">
                                                            {numberToken.toLocaleString("en-US")}
                                                        </Text>
                                                    </div>
                                                    {isAllowUseTokenByPlan && <img src={BuyMore} onClick={onBuyMore} />}
                                                </Tooltip>
                                            )}
                                        </div>
                                        {isLoadingProfile && (
                                            <div className="w-100 mt-1">
                                                <SkeletonBasic width="50%" height="16px" />
                                            </div>
                                        )}
                                        {renderNote}
                                        <img src={Banner} className="Profile-left__banner" alt="" />
                                        <DeActiveApp />
                                    </section>
                                    <section className="Profile-right">
                                        <Text as="h5" variant="headingSm">
                                            {t("profile.list.title_header")}
                                        </Text>
                                        <div className="mt-3 Profile-right__history">
                                            <div className="flex p-3 items-center justify-between Profile-right__history-head">
                                                <Tabs tabs={tabs} onSelect={handleTabChange} selected={selected} />
                                                <InputSelect
                                                    options={statusFilterDate}
                                                    selected={[filterDay]}
                                                    setSelected={(value) => setFilterDay(value[0] as TStatusFilterDay)}
                                                />
                                            </div>
                                            <ListToken filterBy={filterBy} range={range} />
                                        </div>
                                    </section>
                                </div>
                            </Card>
                        </div>
                    </Layout.Section>
                </Layout>
            </Page>
            <ModalBuyMore type="token" ref={refModalBuyMore} />
            <ModalSkipTrial ref={refModalSkipTrial} />
        </>
    );
};

export default Profile;

type TStatusFilterBy = "all" | "purchase" | "usage";

type TStatusFilterDay = "all_time" | "seven_day" | "thirty_day" | "ninety_day";
