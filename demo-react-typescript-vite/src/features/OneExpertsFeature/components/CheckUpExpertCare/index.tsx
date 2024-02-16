import { useCallback, useContext, useMemo, useState } from "react";

//polaris
import { Badge, Button, IndexTable, Text } from "@shopify/polaris";
import { Status } from "@shopify/polaris/build/ts/src/components/Badge";
import { IndexTableHeading } from "@shopify/polaris/build/ts/src/components/IndexTable";
import { NonEmptyArray } from "@shopify/polaris/build/ts/src/types";

//components
import ModalBaseInfo from "@swift/components/UIs/ModalBase/ModalBaseInfo";
import TableGeneral from "@swift/components/UIs/TableBase/TableGeneral";

//constants
import { INNIT_PAGINATION } from "@swift/constants/general";

//hooks
import { useAppSelector } from "@swift/hooks";
import { useDisclosure } from "@swift/hooks/useDisclosure";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import { useModalGeneral } from "@swift/hooks/useModalGeneral";

//react-query
import { queryKeys } from "@swift/queryKeys";
import { useQuery } from "@tanstack/react-query";

//services
import { usePortalService } from "@swift/services/portalApi";

//store
import { customerData } from "@swift/store/global";

//@type
import { ModalBaseInfoType } from "@swift/types/general";
import { PlanType } from "@swift/types/planPricing";
import { ICheckupLogExpertCare } from "@swift/types/portal";

//utils
import { formatDateNameMonthDY } from "@swift/utils/formatDate";

//i18n
import { useTranslation } from "react-i18next";

//other
import { PortalContext } from "../../contexts/PortalContext";
import ButtonExportExpertCare from "../ButtonExportExpertCare";

//icon
import noFile from "../../assets/no-file.svg";

function CheckUpExpertCare() {
    const { t } = useTranslation();

    const { onRedirectApp } = useFuncRedirect();

    const { returnModalCheckPlan } = useModalGeneral();

    const customer = useAppSelector(customerData);

    const { infoPortal, isLoading, setInfoPortal } = useContext(PortalContext);

    const { getListCheckupLogExpertCare } = usePortalService();

    const {
        isOpen: isOpenModal,
        onClose: onCloseModal,
        onOpen: onOpenModal,
    } = useDisclosure({ defaultIsOpen: false });

    const [modalSetting, setModalSetting] = useState<ModalBaseInfoType | null>(
        null
    );

    const [numberPage, setNumberPage] = useState(1);

    const { data: pagination, isFetching: isLoadingFetchData } = useQuery({
        ...queryKeys.portal.getLogCheckup(numberPage),
        queryFn: async () => {
            const infoToken = infoPortal
                ? { ...infoPortal }
                : {
                      exp: 0,
                      token: "",
                  };

            const { code, data, totalItems, totalPages } =
                await getListCheckupLogExpertCare({
                    ...infoToken,
                    page: numberPage,
                    setToken: setInfoPortal,
                });

            if (code === 200 && data) {
                return {
                    current_page: numberPage,
                    data: data,
                    total: totalItems,
                    last_page: totalPages,
                    next_page_url:
                        totalPages === numberPage ? null : `${numberPage}`,
                };
            }
            return INNIT_PAGINATION;
        },
    });

    const headings = [
        { title: t("one_expert_page.checkup_expert_care.table_header.0") },
        { title: t("one_expert_page.checkup_expert_care.table_header.1") },
        { title: t("one_expert_page.checkup_expert_care.table_header.2") },
        { title: t("one_expert_page.checkup_expert_care.table_header.3") },
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

    const onUpGradeExpertCare = useCallback(async () => {
        if (!customer) return onRedirectApp("/pricing");

        if (customer.app_plan !== PlanType.expert_care)
            return onRedirectApp("/pricing?tabs=services");

        handleShowModalUpgradeSuccess(customer.app_plan);

        // fetchLogCheckup(numberPage);
    }, [infoPortal, isLoadingFetchData, customer?.app_plan]);

    const handleShowModalUpgradeSuccess = useCallback(
        (plan: PlanType) => {
            const contentModal = returnModalCheckPlan(plan);
            setModalSetting({
                ...contentModal,
                onPrimaryAction: onCloseModal,
            });
            onOpenModal();
        },
        [onCloseModal, onOpenModal, returnModalCheckPlan]
    );

    const rowTable = useMemo(() => {
        if (!pagination || !pagination.data.length) return <></>;

        return pagination.data.map(
            ({ id, assigneeFullName, status, updatedAt }, index) => {
                let textStatus = "";
                let colorStatus: Status = "new";

                switch (status) {
                    case ICheckupLogExpertCare.awaiting:
                        textStatus = t(
                            "one_expert_page.checkup_expert_care.status.awaiting"
                        );
                        colorStatus = "critical";
                        break;
                    case ICheckupLogExpertCare.monitoring:
                        textStatus = t(
                            "one_expert_page.checkup_expert_care.status.monitoring"
                        );
                        colorStatus = "success";
                        break;
                    case ICheckupLogExpertCare.cancel:
                        textStatus = t(
                            "one_expert_page.checkup_expert_care.status.cancel"
                        );
                        colorStatus = "new";
                        break;
                    default:
                        colorStatus = "new";
                        textStatus = t(
                            "one_expert_page.checkup_expert_care.status.delivered"
                        );
                        break;
                }

                return (
                    <IndexTable.Row id={`${id}`} key={id} position={index}>
                        <IndexTable.Cell>
                            {formatDateNameMonthDY(updatedAt)}
                        </IndexTable.Cell>
                        <IndexTable.Cell>{assigneeFullName}</IndexTable.Cell>
                        <IndexTable.Cell>
                            <Badge progress="complete" status={colorStatus}>
                                {textStatus}
                            </Badge>
                        </IndexTable.Cell>
                        <IndexTable.Cell>
                            {status === ICheckupLogExpertCare.delivered ? (
                                <ButtonExportExpertCare
                                    id={id}
                                    onNotExport={() => {
                                        // setPagination(INNIT_PAGINATION);
                                    }}
                                />
                            ) : (
                                "-"
                            )}
                        </IndexTable.Cell>
                    </IndexTable.Row>
                );
            }
        );
    }, [t, pagination]);

    const eleUpGrade = useMemo(
        () => (
            <div className="TicketManagement__no-data flex flex-col	justify-center items-center gap-5">
                <img src={noFile} alt="" />
                <Text as="p" variant="bodyMd" color="subdued">{t("one_expert_page.ticket_Management.no_ticket")}</Text>
                <Button primary onClick={onUpGradeExpertCare}>
                    {t("one_expert_page.ticket_Management.btn_upgrade")}
                </Button>
            </div>
        ),
        [t, onUpGradeExpertCare]
    );

    const eleDomMain = useMemo(() => {
        if (!pagination?.data?.length) {
            return eleUpGrade;
        }
        return (
            <TableGeneral
                headings={headings}
                numberRowSkeleton={10}
                pagination={pagination || INNIT_PAGINATION}
                isLoading={isLoading || isLoadingFetchData}
                rowMarkup={rowTable}
                onChangePageNext={() => {
                    onChangePage("next");
                }}
                onChangePagePrev={() => {
                    onChangePage("prev");
                }}
            />
        );
    }, [
        customer?.app_plan,
        pagination,
        isLoading,
        isLoadingFetchData,
        rowTable,
        onChangePage,
    ]);

    return (
        <div className="p-5">
            {eleDomMain}
            {/* modal notification*/}
            <ModalBaseInfo
                isOpenModal={isOpenModal}
                icon={modalSetting?.icon || ""}
                title_header={modalSetting?.title_header}
                des={modalSetting?.des}
                titlePrimaryAction={modalSetting?.titlePrimaryAction}
                onPrimaryAction={modalSetting?.onPrimaryAction}
                title={modalSetting?.title}
                titleSecondaryAction={modalSetting?.titleSecondaryAction}
                onSecondaryAction={
                    modalSetting?.onSecondaryAction
                        ? modalSetting.onSecondaryAction
                        : onCloseModal
                }
                isDestructive={modalSetting?.isDestructive}
                onCloseAction={onCloseModal}
            />
        </div>
    );
}

export default CheckUpExpertCare;
