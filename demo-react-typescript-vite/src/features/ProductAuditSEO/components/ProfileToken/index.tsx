import { Button, Icon, SkeletonDisplayText, Tooltip, Text } from "@shopify/polaris";
import { QuestionMarkMinor } from "@shopify/polaris-icons";
import IconChatGPTDisable from "@swift/assets/svg/wallet/icon-chat-gpt-disable.svg";
import IconChatGPT from "@swift/assets/svg/wallet/icon-chat-gpt.svg";
import { formatDateNameMonthDY } from "@swift/utils/formatDate";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ProfileTokenContext } from "../../contexts/profileToken";
import "./styles.scss";

const ProfileToken = () => {
    const { t } = useTranslation();
    const {
        isRefetchingProfile,
        isTokenExpired,
        isBonusExpired,
        bonus_amount,
        bonus_expires_at,
        numberToken,
        isAllowUseTokenByPlan,
        refModalBuyMore,
        validateSkipTrial,
    } = useContext(ProfileTokenContext);

    if (isRefetchingProfile) return <SkeletonProfile />;

    return (
        <>
            <div className="flex items-center justify-between pb-2">
                <div className="flex items-center justify-start">
                    <img src={isTokenExpired ? IconChatGPTDisable : IconChatGPT} />
                    <span className={`Wallet__token ml-2 ${isTokenExpired ? "expired" : ""}`}>
                        {isTokenExpired ? (
                            <Tooltip content={t("profile.token.tooltip_expired")}>
                                {numberToken.toLocaleString("en-US")}
                            </Tooltip>
                        ) : (
                            numberToken.toLocaleString("en-US")
                        )}
                    </span>
                </div>
                <div className="text-right">
                    <Button
                        size="slim"
                        onClick={() => {
                            if (validateSkipTrial()) refModalBuyMore?.current?.setModal(true);
                        }}
                        outline
                        disabled={!isAllowUseTokenByPlan}
                    >
                        {t("common.btn_get_more")}
                    </Button>
                </div>
            </div>
            <div className="flex items-center justify-between pb-2">
                <div className="inline-flex items-center">
                    <span className="Wallet__sub-header mr-2">{t("profile.token.sub_title")}</span>

                    <Tooltip content={t("profile.token.tooltip")}>
                        <Icon source={QuestionMarkMinor} color="base" />
                    </Tooltip>
                </div>
            </div>
            <div className={`flex Wallet__expiration ${isBonusExpired && "hidden"}`}>
                <Text as="p" variant="bodySm" alignment="start" color="subdued">
                    {`${bonus_amount.toLocaleString("en-US")} ${t("profile.token.expired_date", {
                        date: formatDateNameMonthDY(bonus_expires_at),
                    })}`}
                </Text>
            </div>
        </>
    );
};

const SkeletonProfile = () => {
    return (
        <>
            <div className="flex items-center justify-between pb-2 Skeleton__top">
                <SkeletonDisplayText size="medium" />
                <SkeletonDisplayText size="medium" />
            </div>
            <div className="flex items-center justify-between pb-2 Skeleton__bottom">
                <div className="flex items-center justify-start">
                    <SkeletonDisplayText size="medium" />
                    <SkeletonDisplayText size="medium" />
                </div>
                <SkeletonDisplayText size="medium" />
            </div>
            <div className="flex items-center justify-between Skeleton__bottom">
                <SkeletonDisplayText size="medium" />
            </div>
        </>
    );
};

export default ProfileToken;
