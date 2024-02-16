import { Tabs } from "@shopify/polaris";
import InputSelect from "@swift/components/UIs/InputSelect";
import SkeletonBasic from "@swift/components/UIs/Skeletons/SkeletonBasic";
import {
    DataFilterLogAudit,
    EStatusDataLogAuditScanSEO,
    ItemDataLogAudits,
    StatusScanSEOType,
    TypePageSEOType,
} from "@swift/types/boostSEO";
import { isExistInArray } from "@swift/utils/arrayFunc";
import { handleReturnDataLogAudits } from "@swift/utils/funcSupportSeo";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { WebsiteScanContext } from "../../contexts/websiteScan";
import LoadingCheckListSEO from "../LoadingCheckListSEO";
import { EleBannerCompare } from "./ElementSupport";
import {
    RenderCompetitorAudit,
    RenderCompetitorAuditWithoutData,
} from "./RenderAuditCompetitor";
import {
    RenderStoreAudit,
    RenderStoreAuditWithoutData,
} from "./RenderAuditStore";
import "./styles.scss";

const CheckListProblemScanSEO = () => {
    const { t } = useTranslation();

    const [searchParams, setSearchParams] = useSearchParams();

    const {
        dataScanStore,
        dataScanCompetitor,
        isLoadingOnScanCompetitor,
        isLoadingDataScanCompetitorSEO,
        isLoadingOnScanStore,
        isShowCompetitor,
        isLoadingDataScanStoreSEO,
        isAllowPlan,
    } = useContext(WebsiteScanContext);

    const {
        dataAudits: dataAuditsStore,
        dataScanLog,
        statusScan: statusScanStore,
    } = dataScanStore;

    const {
        dataAudits: dataAuditsCompetitor,
        currentUrl: urlScanCompetitor,
        statusScan: statusScanCompetitor,
    } = dataScanCompetitor;

    const isScanningSEO =
        statusScanStore === StatusScanSEOType.scanning || isLoadingOnScanStore;

    const isLoading =
        isLoadingDataScanStoreSEO || isLoadingDataScanCompetitorSEO;

    const listPageScanned = useMemo(
        () => dataScanLog?.types_of_urls_scanned || [],
        [dataScanLog?.types_of_urls_scanned]
    );

    const isScanCCompetitorSEO =
        isLoadingOnScanCompetitor ||
        statusScanCompetitor === StatusScanSEOType.scanning;

    const isHadCompetitor =
        isAllowPlan &&
        isShowCompetitor &&
        urlScanCompetitor.length &&
        dataAuditsCompetitor;

    const LIST_PAGE_STORE = useMemo(
        (): {
            value: TypePageSEOType;
            label: string;
        }[] => [
            // {
            //   value: TypePageSEOType.all,
            //   label: "All page",
            // },
            {
                value: TypePageSEOType.homepage_url,
                label: t("smartSEO.web_scan.ingredient_page.0"),
            },
            {
                value: TypePageSEOType.collection_url,
                label: t("smartSEO.web_scan.ingredient_page.1"),
            },
            {
                value: TypePageSEOType.product_url,
                label: t("smartSEO.web_scan.ingredient_page.2"),
            },
            {
                value: TypePageSEOType.article_url,
                label: t("smartSEO.web_scan.ingredient_page.3"),
            },
        ],
        [t]
    );

    const TABS_PROBLEM_SCAN = useMemo(
        () => [
            {
                id: "criticalIssues",
                content: t("boostSEO.scan_web.tabs.2"),
                status: EStatusDataLogAuditScanSEO.critical,
            },
            {
                id: "improvement",
                content: t("boostSEO.scan_web.tabs.1"),
                status: EStatusDataLogAuditScanSEO.warning,
            },
            {
                id: "passedAudits",
                content: t("boostSEO.scan_web.tabs.0"),
                status: EStatusDataLogAuditScanSEO.success,
            },
            {
                id: "manualCheck",
                content: t("boostSEO.scan_web.tabs.3"),
                status: EStatusDataLogAuditScanSEO.undefined,
            },
        ],
        [t]
    );

    const [selectedTypePage, setSelectedTypePage] = useState<string[]>([
        LIST_PAGE_STORE[0].value,
    ]);

    const [selectedTabsIssue, setSelectedTabsIssue] = useState(0);

    const [dataLogAuditsStore, setDataLogAuditsStore] =
        useState<DataFilterLogAudit>({
            criticalIssues: [],
            improvement: [],
            passedAudits: [],
            manualCheck: [],
        });

    const [dataLogAuditsCompetitor, setDataLogAuditsCompetitor] = useState<{
        criticalIssues: ItemDataLogAudits[];
        improvement: ItemDataLogAudits[];
        passedAudits: ItemDataLogAudits[];
    }>({
        criticalIssues: [],
        improvement: [],
        passedAudits: [],
    });

    const optionSelectPage = useMemo(() => {
        const newOption = LIST_PAGE_STORE.filter((item) =>
            isExistInArray(item.value, listPageScanned)
        );
        return [...newOption];
    }, [LIST_PAGE_STORE, listPageScanned]);

    const { propsRenderStoreAudit, propsRenderCompetitorAudit } =
        useMemo(() => {
            const status = TABS_PROBLEM_SCAN[selectedTabsIssue].status;
            const selectedList = TABS_PROBLEM_SCAN[selectedTabsIssue].id;

            return {
                propsRenderStoreAudit: {
                    status,
                    list: dataLogAuditsStore[
                        selectedList as keyof typeof dataLogAuditsStore
                    ],
                },
                propsRenderCompetitorAudit: {
                    status,
                    list: dataLogAuditsCompetitor[
                        selectedList as keyof typeof dataLogAuditsCompetitor
                    ],
                },
            };
        }, [
            TABS_PROBLEM_SCAN,
            dataLogAuditsCompetitor,
            dataLogAuditsStore,
            selectedTabsIssue,
        ]);

    const propsWithoutData = {
        isShowCompetitor,
        isScanCCompetitorSEO,
    };

    const handleChangeTabsIssue = useCallback(
        (selectedTabIndex: number) => setSelectedTabsIssue(selectedTabIndex),
        []
    );

    const handleChangeTypePage = useCallback(
        (value: string[]) => {
            const pageSelected = value[0];
            handleSetDataLogAuditsStore(pageSelected as TypePageSEOType);
            setSelectedTypePage(value);
            // searchParams.set("filter_page", pageSelected);
            // setSearchParams(searchParams);
        },
        [dataAuditsStore]
    );

    /** handle set data log audits store  */
    const handleSetDataLogAuditsStore = useCallback(
        (key: TypePageSEOType) => {
            const newData = handleReturnDataLogAudits({
                dataAudits: dataAuditsStore,
                key: key,
                // callbackFixImgAlt: () => {
                //   onChangePage({
                //     page: PageSEOType.basic_SEO,
                //     nameTabs: ITabsSEOBasic.alt_images,
                //   });
                // },
                // callbackMetaDescription: () => {
                //   onChangePage({
                //     page: PageSEOType.basic_SEO,
                //     nameTabs: ITabsSEOBasic.meta_title,
                //   });
                // },
            });

            setDataLogAuditsStore(newData);
        },
        [dataAuditsStore]
    );
    /** end handle set data log audits store */

    /** handle set data log audits competitor  */
    const handleSetDataLogAuditsCompetitor = useCallback(
        (key: TypePageSEOType) => {
            const newData = handleReturnDataLogAudits({
                dataAudits: dataAuditsCompetitor,
                key: key,
            });
            setDataLogAuditsCompetitor(newData);
        },
        [dataAuditsCompetitor]
    );
    /** end handle set data log audits competitor */

    /** show dataLogAuditsStore by params 'filter_page' in the first time */
    useEffect(() => {
        if (
            isLoading ||
            !searchParams.has("filter_page") ||
            !dataAuditsStore ||
            !optionSelectPage.length
        )
            return;

        const filterPage = searchParams.get("filter_page") || "";
        const findItem = optionSelectPage.find((item) => {
            return item.value === filterPage;
        });
        if (findItem) {
            searchParams.delete("filter_page");
            setSearchParams(searchParams);
            setSelectedTypePage([filterPage]);
            handleSetDataLogAuditsStore(filterPage as TypePageSEOType);
        }
    }, [optionSelectPage.length, !!dataAuditsStore, isLoading]);
    /** show dataLogAuditsStore by params 'filter_page' in the first time */

    /** update dataLogAuditsStore when  dataAuditsStore change */
    useEffect(() => {
        if (!dataAuditsStore) return;
        handleSetDataLogAuditsStore(selectedTypePage[0] as TypePageSEOType);
    }, [dataAuditsStore]);
    /** update dataLogAuditsStore when  dataAuditsStore change */

    /** update dataLogAuditsCompetitor when  dataAuditsCompetitor change */
    useEffect(() => {
        if (!dataAuditsCompetitor) return;
        handleSetDataLogAuditsCompetitor(
            selectedTypePage[0] as TypePageSEOType
        );
    }, [dataAuditsCompetitor]);
    /** update dataLogAuditsCompetitor when  dataAuditsCompetitor change */

    /** update dataLogAuditsStore, dataLogAuditsCompetitor if isCompare = true, only compare type page === home page */
    useEffect(() => {
        if (!isShowCompetitor) return;
        const typePage = selectedTypePage[0];

        if (typePage === TypePageSEOType.homepage_url) return;

        setSelectedTypePage([TypePageSEOType.homepage_url]);
        handleSetDataLogAuditsStore(TypePageSEOType.homepage_url);
        handleSetDataLogAuditsCompetitor(TypePageSEOType.homepage_url);
    }, [isShowCompetitor]);
    /** end update dataLogAuditsStore, dataLogAuditsCompetitor if isCompare = true, only compare type page === home page */

    const eleTabsSelect = useMemo(() => {
        const classDiv =
            "CheckListProblemScanSEO__menu flex justify-between items-center gap-3 py-3 pl-3 pr-5";
        if (isShowCompetitor && !urlScanCompetitor.length) return <></>;
        if (isScanningSEO)
            return (
                <div className={classDiv}>
                    <div className="flex">
                        {[...Array(3)].map((_, index) => (
                            <div className="mr-2" key={index}>
                                <SkeletonBasic width="80px" height="24px" />
                            </div>
                        ))}
                    </div>
                    <SkeletonBasic width="80px" height="24px" />
                </div>
            );
        if (!dataAuditsStore) return <></>;

        return (
            <div className={classDiv}>
                <Tabs
                    tabs={TABS_PROBLEM_SCAN}
                    selected={selectedTabsIssue}
                    onSelect={handleChangeTabsIssue}
                ></Tabs>
                {!isShowCompetitor && (
                    <InputSelect
                        size="medium"
                        options={optionSelectPage}
                        selected={selectedTypePage}
                        setSelected={handleChangeTypePage}
                    />
                )}
            </div>
        );
    }, [
        isShowCompetitor,
        urlScanCompetitor.length,
        isScanningSEO,
        dataAuditsStore,
        TABS_PROBLEM_SCAN,
        selectedTabsIssue,
        optionSelectPage,
        selectedTypePage,
    ]);

    const isShowAuditStore = useMemo(() => {
        if (!isScanningSEO && dataScanStore.dataAudits) return true;
        return false;
    }, [dataScanStore.dataAudits, isScanningSEO]);

    if (isLoading)
        return (
            <div className="py-5">
                <LoadingCheckListSEO numberList={2} />
            </div>
        );

    return (
        <div className="CheckListProblemScanSEO">
            {/* banner compare */}
            <EleBannerCompare />
            {/*end banner compare */}

            <div className="CheckListProblemScanSEO__body">
                {eleTabsSelect}

                <div className="CheckListProblemScanSEO__check-list flex">
                    {isShowAuditStore ? (
                        <RenderStoreAudit {...propsRenderStoreAudit} />
                    ) : (
                        <RenderStoreAuditWithoutData
                            {...propsWithoutData}
                            isScanSEO={isScanningSEO}
                        />
                    )}

                    {!isScanCCompetitorSEO && isHadCompetitor ? (
                        <RenderCompetitorAudit
                            {...propsRenderCompetitorAudit}
                        />
                    ) : (
                        <RenderCompetitorAuditWithoutData
                            {...propsWithoutData}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckListProblemScanSEO;
