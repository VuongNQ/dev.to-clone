import { memo, useCallback, useMemo, useState } from "react";
//polaris
import {
    Badge,
    Button,
    Icon,
    IndexTable,
    Link,
    Text,
    Tooltip,
} from "@shopify/polaris";
import { NonEmptyArray } from "@shopify/polaris/build/ts/src/types";
import { IndexTableHeading } from "@shopify/polaris/build/ts/src/components/IndexTable";
import { Status } from "@shopify/polaris/build/ts/src/components/Badge";

//hooks
import { useAppSelector } from "@swift/hooks";

//store
import { customerData } from "@swift/store/global";

//react-query
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@swift/queryKeys";

//i18n
import { useTranslation } from "react-i18next";

//@type
import { ListTicket } from "@swift/types/oneExperts";

//component
import TableGeneral from "@swift/components/UIs/TableBase/TableGeneral";

//constant
import { INNIT_PAGINATION } from "@swift/constants/general";

//service
import { useOneExpertService } from "@swift/services/oneExpertApi";

//utils
import { formatDateNameMonthDY } from "@swift/utils/formatDate";

//icon
import noFile from "../../assets/no-file.svg";
import { QuestionMarkMinor } from "@shopify/polaris-icons";

//style
import "./styles.scss";

const LIST_RECORD_TICKET = [
    {
        title: "one_expert_page.ticket_Management.list_status.0.title",
        des: "one_expert_page.ticket_Management.list_status.0.des",
        status: "warning",
    },
    {
        title: "one_expert_page.ticket_Management.list_status.1.title",
        des: "one_expert_page.ticket_Management.list_status.1.des",
        status: "info",
    },
    {
        title: "one_expert_page.ticket_Management.list_status.2.title",
        des: "one_expert_page.ticket_Management.list_status.2.des",
        status: "success",
    },
    {
        title: "one_expert_page.ticket_Management.list_status.3.title",
        des: "one_expert_page.ticket_Management.list_status.3.des",
        status: "base",
    },
];

const TicketManagement = memo(function TicketManagement({
    openModalHireExpert,
    listRecordTicket,
}: {
    openModalHireExpert: () => void;
    listRecordTicket: ListTicket[];
}) {
    const { t } = useTranslation();

    const { getListTicket } = useOneExpertService();

    const customer = useAppSelector(customerData);

    const [numberPage, setNumberPage] = useState(1);

    const { data: pagination, isFetching } = useQuery({
        ...queryKeys.boostHistoryQueryKey.getSpeedHistory(numberPage),
        enabled: customer ? true : false,
        queryFn: async () => {
            const { status, data } = await getListTicket(numberPage, 10);
            if (status) {
                return data;
            }
            return INNIT_PAGINATION;
        },
    });

    const headings = [
        { title: t("one_expert_page.ticket_Management.header_table.0") },
        { title: t("one_expert_page.ticket_Management.header_table.1") },
        { title: t("one_expert_page.ticket_Management.header_table.2") },
        { title: t("one_expert_page.ticket_Management.header_table.3") },
        { title: t("one_expert_page.ticket_Management.header_table.4") },
        { title: t("one_expert_page.ticket_Management.header_table.5") },
        { title: t("one_expert_page.ticket_Management.header_table.6") },
        { title: t("") },
    ] as NonEmptyArray<IndexTableHeading>;

    const onChangePage = useCallback(
        async (status: "prev" | "next") => {
            let newPage = numberPage;
            if (status === "next") {
                newPage = newPage + 1;
            } else {
                newPage = newPage - 1;
            }
            setNumberPage(newPage);
        },
        [numberPage]
    );

    const rowTickets = useMemo(() => {
        if (!pagination || !pagination.data.length) return <></>;

        return pagination.data.map(
            (
                {
                    ticket_id,
                    created_at,
                    assigned,
                    status,
                    updated_at,
                    report_link,
                    number_of_tickets,
                    total_price,
                },
                index
            ) => {
                let textStatus = "";
                let colorStatus: Status = "new";

                if (status === 1) {
                    textStatus = t(
                        "one_expert_page.ticket_Management.list_status.0.title"
                    );
                    colorStatus = "warning";
                }

                if (status === 2) {
                    textStatus = t(
                        "one_expert_page.ticket_Management.list_status.1.title"
                    );
                    colorStatus = "info";
                }

                if (status === 3) {
                    textStatus = t(
                        "one_expert_page.ticket_Management.list_status.2.title"
                    );
                    colorStatus = "success";
                }

                if (status === 4) {
                    textStatus = t(
                        "one_expert_page.ticket_Management.list_status.3.title"
                    );
                }

                return (
                    <IndexTable.Row
                        id={ticket_id}
                        key={ticket_id}
                        position={index}
                    >
                        <IndexTable.Cell>{`${ticket_id}`}</IndexTable.Cell>
                        <IndexTable.Cell>
                            {formatDateNameMonthDY(created_at)}
                        </IndexTable.Cell>
                        <IndexTable.Cell>{assigned}</IndexTable.Cell>
                        <IndexTable.Cell>
                            <Badge progress="complete" status={colorStatus}>
                                {textStatus}
                            </Badge>
                        </IndexTable.Cell>
                        <IndexTable.Cell>{number_of_tickets}</IndexTable.Cell>
                        <IndexTable.Cell>{`$${total_price}`}</IndexTable.Cell>
                        <IndexTable.Cell>
                            {formatDateNameMonthDY(updated_at)}
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                            {report_link ? (
                                <Link
                                    removeUnderline
                                    url={report_link}
                                    external
                                >
                                    {t("common.btn_view")}
                                </Link>
                            ) : (
                                "-"
                            )}
                        </IndexTable.Cell>
                    </IndexTable.Row>
                );
            }
        );
    }, [t, pagination]);

    const emptyStateMarkup = (
        <div className="TicketManagement__no-data flex flex-col	justify-center items-center gap-5">
            <img src={noFile} alt="" />
            <h3>{t("one_expert_page.ticket_Management.no_ticket")}</h3>
            <Button primary onClick={openModalHireExpert}>
                {t("common.btn_hire")}
            </Button>
        </div>
    );

    return (
        <div className="TicketManagement p-5">
            <div className="TicketManagement__header flex justify-between flex-wrap">
                {LIST_RECORD_TICKET.map((item, index) => (
                    <div
                        className={`TicketManagement__record TicketManagement__record--${item.status} p-5 flex flex-col gap-3`}
                        key={index}
                    >
                        <div className="TicketManagement__record-title flex gap-1 items-center">
                            <Text as="h3" variant="headingMd">
                                {t(item.title)}
                            </Text>
                            <Tooltip content={t(item.des)}>
                                <Icon source={QuestionMarkMinor} color="base" />
                            </Tooltip>
                        </div>
                        <Text as="h3" variant="heading2xl">
                            {listRecordTicket.length
                                ? listRecordTicket[index].count
                                : 0}
                        </Text>
                    </div>
                ))}
            </div>
            <div className="mt-5">
                <TableGeneral
                    headings={headings}
                    pagination={pagination || INNIT_PAGINATION}
                    isLoading={isFetching}
                    rowMarkup={rowTickets}
                    onChangePageNext={() => {
                        onChangePage("next");
                    }}
                    onChangePagePrev={() => {
                        onChangePage("prev");
                    }}
                    emptyStateMarkup={emptyStateMarkup}
                />
            </div>
        </div>
    );
});

export default TicketManagement;
