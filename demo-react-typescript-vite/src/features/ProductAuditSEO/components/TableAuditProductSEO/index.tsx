import { useCallback, useEffect, useMemo, useRef, useState } from "react";

//polaris
import {
    Button,
    IndexTable,
    Scrollable,
    SkeletonDisplayText,
    SkeletonThumbnail,
    Toast,
    Tooltip,
    Text,
} from "@shopify/polaris";
import { IndexTableHeading } from "@shopify/polaris/build/ts/src/components/IndexTable";
import { NonEmptyArray } from "@shopify/polaris/build/ts/src/types";

//react-query
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@swift/queryKeys";

//@type
import { CustomEventSEO } from "@swift/types/CustomEventListener";
import { IAssessmentStatus, IDataItemAuditProduct, IParamsGetListAuditProduct } from "@swift/types/boostSEO";
import { PlanType } from "@swift/types/planPricing";

//component
import InputSearch from "@swift/components/UIs/InputSearch";
import InputSelect from "@swift/components/UIs/InputSelect";
import { RenderThumbnail } from "@swift/components/UIs/Thumbnail";
import SkeletonTable from "@swift/components/UIs/SkeletonTable";

//asset
import noDataTable from "@swift/assets/images/basicSeo/no-data-table.png";
import upgradePlan from "@swift/assets/images/basicSeo/upgrade-plan.png";

//constants
import { PLAN_PRICING } from "@swift/constants/constantPlanPricing";
import { ASSESSMENT_STATUS } from "@swift/constants/constantsSeoBasic";
import { INNIT_PAGINATION } from "@swift/constants/general";

//hooks
import { useAppDispatch, useAppSelector } from "@swift/hooks";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import { useEditAuditProduct } from "../../hooks/useEditAuditProduct";

//service
import { useAuditProductService } from "@swift/services/auditProductApi";

//store
import { customerData, globalActions } from "@swift/store/global";
import { INIT_DATA_REDUX_AUDIT_PROD, getFilterAudit, updateFilter } from "../../store";

//i18n
import { useTranslation } from "react-i18next";

//utils
import { subscribeCustomEvent, unsubscribeCustomEvent } from "@swift/utils/customEventListen";

//other
import Parse from "html-react-parser";
import BadgeStatusAuditProduct from "../BadgeStatusAuditProduct";

//style
import "./styles.scss";

function TableAuditProductSEO() {
    const { t } = useTranslation();
    const scrollableRef = useRef<HTMLDivElement | null>(null);

    const { onRedirectApp } = useFuncRedirect();

    const customer = useAppSelector(customerData);

    const filterAudit = useAppSelector(getFilterAudit);

    const dispatchState = useAppDispatch();

    const { getListAuditProduct, postSyncProduct /* getCountProductAudit */ } = useAuditProductService();

    const { handleRedirectFirstProd } = useEditAuditProduct();

    const [isLoadingSyncProduct, setIsLoadingSyncProduct] = useState(false);

    const [paramsAudit, setParamsAudit] = useState<IParamsGetListAuditProduct>({
        page: 1,
    });

    const isAllowUseTokenByPlan = useMemo(() => !!(customer && customer.app_plan !== PlanType.free), [customer]);

    const resourceName = {
        singular: "product",
        plural: "products",
    };

    // const [dataCountProductAudit, setGetCountProductAudit] =
    //   useState<IGetCountProductAudit>({
    //     "poorly-optimized": 0,
    //     "un-evaluated": 0,
    //     "well-optimized": 0,
    //     unknown: 0,
    //   });

    const [toastMessage, setToastMessage] = useState({
        isToast: false,
        message: "",
    });

    const optionAssessmentStatus = useMemo(
        () => [
            {
                value: IAssessmentStatus.all,
                label: t(ASSESSMENT_STATUS[IAssessmentStatus.all]),
            },
            {
                value: IAssessmentStatus.well_optimized,
                label: t(ASSESSMENT_STATUS["well-optimized"]),
            },
            {
                value: IAssessmentStatus.un_evaluated,
                label: t(ASSESSMENT_STATUS["un-evaluated"]),
            },
            {
                value: IAssessmentStatus.unknown,
                label: t(ASSESSMENT_STATUS["unknown"]),
            },
            {
                value: IAssessmentStatus.poorly_optimized,
                label: t(ASSESSMENT_STATUS["poorly-optimized"]),
            },
        ],
        [t]
    );

    const {
        data: rawData,
        isFetching,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
    } = useInfiniteQuery({
        ...queryKeys.basicSeo.auditProdList({
            filters: filterAudit,
            params: paramsAudit,
        }),
        refetchOnWindowFocus: false,
        queryFn: async ({ pageParam = 1 }) => {
            const { data, status } = await getListAuditProduct({
                filters: filterAudit,
                params: { page: pageParam },
            });

            if (data && data.data.length) {
                const firstPrd = data.data[0];
                handleRedirectFirstProd(firstPrd.id);
            }
            if (!status) return INNIT_PAGINATION;
            return data ? data : INNIT_PAGINATION;
        },
        getNextPageParam: (lastPage) =>
            lastPage.current_page === lastPage.last_page ? undefined : lastPage.current_page + 1,
    });

    const dataProductAudit = useMemo(() => {
        if (!isAllowUseTokenByPlan || !rawData || !rawData.pages.length) return [];

        return rawData.pages.reduce((init: Array<IDataItemAuditProduct>, current) => {
            return init.concat(...current.data);
        }, [] as Array<IDataItemAuditProduct>);
    }, [rawData]);

    const onScrolled = () => {
        if (!scrollableRef.current) return;
        const scrollable = scrollableRef.current.lastChild as HTMLDivElement;
        const { scrollHeight, scrollTop, clientHeight } = scrollable;
        const isReachedBottom = Math.round(scrollHeight - scrollTop) === clientHeight;
        if (hasNextPage && isReachedBottom && !isFetching) {
            fetchNextPage();
        }
    };

    /** redirect page edit  */
    const onEdit = useCallback((id: number) => {
        onRedirectApp(`/seo-basic?tabs=audit_product&id=${id}`);
    }, []);
    /**end redirect page edit  */

    /** get Count Product Audit */
    // const fetchCountProductAudit = useCallback(
    //   async (payload: IFilterAuditProduct) => {
    //     const { status, data } = await getCountProductAudit(payload);

    //     if (status && data) {
    //       setGetCountProductAudit(data);
    //     }
    //   },
    //   []
    // );
    /**end get Count Product Audit */

    /** click sync product */
    const onResyncProduct = useCallback(async () => {
        setIsLoadingSyncProduct(true);
        const { status } = await postSyncProduct();
        if (status) {
            dispatchState(
                globalActions.updateCustomer({
                    sync_product_status: "processing",
                })
            );
        }
        setIsLoadingSyncProduct(false);
    }, []);
    /** click sync product */

    const handleSyncProdFinish = useCallback(() => {
        dispatchState(updateFilter(INIT_DATA_REDUX_AUDIT_PROD.filterAudit));

        setParamsAudit({
            page: 1,
        });

        if (paramsAudit.page === 1) {
            // refetchListAuditProduct();
        }

        setToastMessage({
            isToast: true,
            message: t("smartSEO.audit_product.toast_sync_success"),
        });
    }, [paramsAudit, t]);

    /** fetch data first time and sync data time and listen event syncAuditProduct to show toast*/
    useEffect(() => {
        subscribeCustomEvent({
            eventName: CustomEventSEO.eventSyncAuditProduct,
            listener: handleSyncProdFinish,
        });

        return () => {
            unsubscribeCustomEvent({
                eventName: CustomEventSEO.eventSyncAuditProduct,
                listener: handleSyncProdFinish,
            });
        };
    }, []);
    /** fetch data first time and sync data time and listen event syncAuditProduct to show toast*/

    const headings = [
        { title: t("smartSEO.audit_product.table_headings.0") },
        { title: t("smartSEO.audit_product.table_headings.1") },
        { title: t("smartSEO.audit_product.table_headings.2") },
        { title: "", hidden: true },
    ] as NonEmptyArray<IndexTableHeading>;

    const rowMarkup = useMemo(
        () =>
            dataProductAudit.map(({ audit_product, id, main_image_src, title }, index) => (
                <IndexTable.Row id={`${id}`} key={id} position={index}>
                    <IndexTable.Cell>
                        <RenderThumbnail url={main_image_src || ""} />
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                        <Tooltip content={title}>
                            <p className="TableAuditProductSEO__name-prd">{title}</p>
                        </Tooltip>
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                        <BadgeStatusAuditProduct
                            status={audit_product ? audit_product.assessment_status : IAssessmentStatus.un_evaluated}
                        />
                    </IndexTable.Cell>
                    <IndexTable.Cell>
                        <div className="text-r">
                            <Button
                                size="slim"
                                onClick={() => {
                                    onEdit(id);
                                }}
                            >
                                {t("smartSEO.audit_product.btn_edit")}
                            </Button>
                        </div>
                    </IndexTable.Cell>
                </IndexTable.Row>
            )),
        [dataProductAudit, t]
    );

    const displayBodyTable = useMemo(
        () => (
            <>
                <tr>
                    <td className="TableAuditProductSEO__prd-issues p-4" colSpan={4}>
                        {Parse(
                            t("smartSEO.audit_product.table_row_issues", {
                                number: rawData?.pages[0].total,
                            })
                        )}
                    </td>
                </tr>
                {rowMarkup}
            </>
        ),
        [t, rowMarkup, rawData?.pages[0]?.total]
    );

    const propsButton = {
        loading: isLoadingSyncProduct || customer?.sync_product_status !== "done",
        onClick: onResyncProduct,
    };

    const renderContentTable = useMemo(
        () => (
            <div className="TableGeneral__no-data flex flex-col justify-center items-center">
                {!isAllowUseTokenByPlan ? <img src={upgradePlan} alt="" /> : <img src={noDataTable} />}
                <p className="TableGeneral__txt--no-data text-center">
                    {t(
                        isAllowUseTokenByPlan
                            ? "smartSEO.audit_product.no_data_product"
                            : "smartSEO.audit_product.noti_upgrade_plan"
                    )}
                </p>
                {!isAllowUseTokenByPlan ? (
                    <div className="pt-4">
                        <Button url="/pricing" primary>
                            {t("common.btn_get_upgrade", {
                                planName: t(PLAN_PRICING.basic.title),
                            })}
                        </Button>
                    </div>
                ) : null}
            </div>
        ),
        [isAllowUseTokenByPlan, t]
    );

    const eleToast = useMemo(
        () =>
            toastMessage.isToast ? (
                <Toast
                    content={toastMessage.message}
                    onDismiss={() => {
                        setToastMessage({
                            isToast: false,
                            message: "",
                        });
                    }}
                    duration={5000}
                />
            ) : null,
        [toastMessage]
    );

    const eleFilter = useMemo(
        () => (
            <div className="TableAuditProductSEO__header flex items-center gap-2 justify-between">
                <div className="flex-1">
                    <InputSearch
                        initValue={filterAudit.keyword || ""}
                        StringPlaceholder={t("smartSEO.audit_product.input_placeholder")}
                        eventTextChange={(value) => {
                            dispatchState(updateFilter({ keyword: value }));
                            setParamsAudit({
                                page: 1,
                            });
                        }}
                        disabled={!isAllowUseTokenByPlan}
                    />
                </div>
                <InputSelect
                    disabled={!isAllowUseTokenByPlan}
                    // classAdds="list-filter type-image"
                    options={optionAssessmentStatus}
                    selected={filterAudit.assessment_status as string[]}
                    setSelected={(value) => {
                        dispatchState(
                            updateFilter({
                                assessment_status: value as IAssessmentStatus[],
                            })
                        );
                        setParamsAudit({
                            page: 1,
                        });
                    }}
                />
                {isAllowUseTokenByPlan ? (
                    <Button primary {...propsButton}>
                        {t("smartSEO.audit_product.btn_sync")}
                    </Button>
                ) : null}
            </div>
        ),
        [filterAudit, isAllowUseTokenByPlan, optionAssessmentStatus, propsButton]
    );

    return (
        <div className="TableAuditProductSEO p-5">
            <div className="TableAuditProductSEO__container">
                {eleFilter && <div className="p-3">{eleFilter}</div>}
                <div className="TableAuditProductSEO__headerTable flex flex-col ">
                    <>
                        <div className="headerTable_listLabel flex ">
                            {headings.map((item: IndexTableHeading, index: number) => (
                                <div className="headerTable_labelHeading" key={index}>
                                    {item.title}
                                </div>
                            ))}
                        </div>
                        <div className="headerTable_countItem p-4">
                            Total
                            <Text as="span" variant="bodyMd">
                                {isAllowUseTokenByPlan && `${rawData?.pages[0]?.total || 0} product(s)`}
                            </Text>
                        </div>
                    </>
                </div>
                <div className="TableAuditProductSEO__wp ">
                    <div className="TableAuditProductSEO__scrollable" ref={scrollableRef}>
                        <Scrollable
                            style={{ height: isAllowUseTokenByPlan ? "450px" : "300px" }}
                            onScrolledToBottom={onScrolled}
                        >
                            {
                                <IndexTable
                                    resourceName={resourceName}
                                    headings={headings}
                                    itemCount={isLoading ? 1 : rawData?.pages[0]?.total || 0}
                                    selectable={false}
                                    emptyState={renderContentTable}
                                >
                                    {isLoading ? (
                                        <SkeletonTable numberRow={10} numberCol={headings.length} isUseImage={true} />
                                    ) : !isAllowUseTokenByPlan ? (
                                        renderContentTable
                                    ) : (
                                        displayBodyTable
                                    )}
                                </IndexTable>
                            }
                            {isFetchingNextPage && (
                                <div className="SkeletonTable flex items-center">
                                    <div className="contain-skeleton-text">
                                        <SkeletonThumbnail />
                                    </div>
                                    <div className="contain-skeleton-text">
                                        <SkeletonDisplayText size="medium" />
                                    </div>
                                    <div className="contain-skeleton-text">
                                        <SkeletonDisplayText size="medium" />
                                    </div>
                                    <div className="contain-skeleton-text">
                                        <SkeletonDisplayText size="medium" />
                                    </div>
                                </div>
                            )}
                        </Scrollable>
                    </div>

                    {eleToast}
                </div>
            </div>
        </div>
    );
}

export default TableAuditProductSEO;
