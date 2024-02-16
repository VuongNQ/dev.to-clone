import { Scrollable, Text, Tooltip } from "@shopify/polaris";
import HistoryEmpty from "@swift/assets/svg/wallet/history-empty.svg";
import { INNIT_PAGINATION } from "@swift/constants/general";
import { queryKeys } from "@swift/queryKeys";
import useWalletService from "@swift/services/walletApi";
import { EDaysFilter } from "@swift/types/general";
import { EFeatureKey, ETransactionType, IWalletDetailHistory, TFilterWalletBy } from "@swift/types/wallet";
import { formatMDYAMPMAtString } from "@swift/utils/formatDate";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { SkeletonTransaction } from "../Skeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
interface Props {
    filterBy: TFilterWalletBy;
    range: EDaysFilter;
}

const ListToken: React.FC<Props> = ({ filterBy, range }: Props) => {
    const { t } = useTranslation();

    const { getHistoryToken } = useWalletService();

    const scrollParentRef = useRef<HTMLDivElement | null>(null);

    const {
        data: rawData,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
    } = useInfiniteQuery({
        ...queryKeys.profile.loadHistory({
            filterBy,
            range,
        }),
        refetchOnWindowFocus: false,
        queryFn: async ({ pageParam = 1 }) => {
            const { data, status } = await getHistoryToken({
                filterBy,
                range,
                page: pageParam,
            });
            if (!status) return INNIT_PAGINATION;
            return data ? data : INNIT_PAGINATION;
        },
        getNextPageParam: (lastPage) =>
            lastPage.current_page === lastPage.last_page ? undefined : lastPage.current_page + 1,
    });

    const history = useMemo(() => {
        if (!rawData || !rawData.pages.length) return [];
        return rawData.pages.reduce((init: Array<IWalletDetailHistory>, current) => {
            return init.concat(...current.data);
        }, [] as Array<IWalletDetailHistory>);
    }, [rawData]);

    const onScrolled = () => {
        if (!scrollParentRef.current || isFetchingNextPage) return;
        const scrollable = scrollParentRef.current.lastChild as HTMLDivElement;
        const { scrollHeight, scrollTop, clientHeight } = scrollable;
        const isReachedBottom = Math.round(scrollHeight - scrollTop) === clientHeight;
        if (hasNextPage && isReachedBottom) fetchNextPage();
    };

    if (isLoading)
        return (
            <div className="Profile-right__history-body">
                <div className="Profile-right__history-body-list">
                    {[...Array(6)].map((_, index) => (
                        <SkeletonTransaction isLast={index === 5} key={Math.random() * 6} />
                    ))}
                </div>
            </div>
        );

    if (!isLoading && !history.length)
        return (
            <div className="Profile-right__history-body">
                <div className="flex items-center justify-center flex-col Profile-right__history-body__empty">
                    <img src={HistoryEmpty} alt="" />
                    <Text as="p" color="subdued">
                        {t("profile.list.no_data")}
                    </Text>
                </div>
            </div>
        );

    return (
        <div className="Profile-right__history-body">
            <div className="Profile-right__history-body-list" ref={scrollParentRef}>
                <Scrollable
                    shadow={history.length >= 10 && hasNextPage}
                    style={{ height: "556px" }}
                    horizontal={false}
                    onScrolledToBottom={onScrolled}
                >
                    {history
                        // .filter((i) => i.transaction_type !== ETransactionType.reset)
                        .map(
                            (
                                {
                                    // id,
                                    // store_id,
                                    // wallet_id,
                                    transaction_type,
                                    amount,
                                    balance,
                                    feature,
                                    // feature_id,
                                    note,
                                    created_at,
                                    // updated_at,
                                },
                                index
                            ) => (
                                <div
                                    className="flex items-center justify-between Profile-right__history-body__list-detail"
                                    key={index}
                                >
                                    <div className="flex flex-col gap-1">
                                        <div className="txt-one-line">
                                            <RenderTitle
                                                note={note}
                                                transaction_type={transaction_type}
                                                feature={feature}
                                            />
                                        </div>
                                        {![
                                            "gpt-token-free",
                                            "gpt-token-buy",
                                            "gpt-token-plan-change",
                                            "gpt-token-plan-new-cycle",
                                        ].includes(feature) && transaction_type !== ETransactionType.reset ? (
                                            <Text as="p" variant="bodySm">
                                                {t("profile.list.detail.type")}:{" "}
                                                {t(EFeatureKey[feature as keyof typeof EFeatureKey])}
                                            </Text>
                                        ) : ""}
                                        <Text as="p" variant="bodySm">
                                            {t("profile.list.detail.date")}: {formatMDYAMPMAtString(created_at)}
                                        </Text>
                                        <Text as="p" variant="bodySm">
                                            {t("profile.list.detail.balance")}: {balance.toLocaleString("en-US")} Token
                                        </Text>
                                    </div>
                                    <Text
                                        as="span"
                                        variant="bodyLg"
                                        color={
                                            [ETransactionType.deposit, ETransactionType.received,ETransactionType.reset].includes(
                                                transaction_type
                                            )
                                                ? "success"
                                                : "critical"
                                        }
                                    >
                                        {[ETransactionType.deposit, ETransactionType.received,ETransactionType.reset].includes(
                                            transaction_type
                                        )
                                            ? "+"
                                            : "-"}
                                        {amount.toLocaleString("en-US")}
                                    </Text>
                                </div>
                            )
                        )}
                    {isFetchingNextPage && <SkeletonTransaction />}
                </Scrollable>
            </div>
        </div>
    );
};

const RenderTitle = ({
    transaction_type,
    feature,
    note,
}: Pick<IWalletDetailHistory, "transaction_type" | "note" | "feature">) => {
    const { t } = useTranslation();

    const mapKeyTrans = {
        [ETransactionType.withdrawal]: t("profile.list.title.token_downgrade_plan"),
        [ETransactionType.received]: t(
            feature === "gpt-token-plan-change"
                ? "profile.list.title.token_upgrade_plan"
                : "profile.list.title.token_new_cycle"
        ),
        [ETransactionType.deposit]: t("profile.list.title.gpt_token_buy"),
        [ETransactionType.used]: "",
        [ETransactionType.reset]: t("profile.list.title.gpt_token_restored"),
    };

    if (transaction_type !== ETransactionType.used || !note.length)
        return (
            <Text as="span" variant="bodyMd">
                {mapKeyTrans[transaction_type]}
            </Text>
        );

    return (
        <Tooltip content={note}>
            <Text as="span" variant="bodyMd">
                {note}
            </Text>
        </Tooltip>
    );
};

export default ListToken;
