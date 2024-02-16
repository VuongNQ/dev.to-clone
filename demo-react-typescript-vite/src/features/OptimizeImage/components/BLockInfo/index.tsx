import {
    Button,
    Card,
    HorizontalGrid,
    Text,
    Toast,
    Tooltip,
} from "@shopify/polaris";
import SkeletonBasic from "@swift/components/UIs/Skeletons/SkeletonBasic";
import { useAppSelector } from "@swift/hooks";
import { queryKeys } from "@swift/queryKeys";
import { useOptimizeImageService } from "@swift/services/optimizeImageApi";
import { customerData } from "@swift/store/global";
import {
    EQueryKeyOptimizeImage,
    IDetailImageRaw,
    IFilterDay,
    IFilterImage,
    IFilterTypeImage,
    IOptimizeStatus,
    IStatusOptimizeImage,
} from "@swift/types/OptimizeImage";
import { IDataPagination } from "@swift/types/general";
import {
    InfiniteData,
    QueryCacheNotifyEvent,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import IconOptimization from "../../assets/icon-optimization.svg";
import IconQuestionMark from "../../assets/icon-question-mark.svg";
import { OptimizeImageContext } from "../../context/optimizeImage";
import { ELevelOptimize, ETypeOptimize, GetTotal } from "../../type";
import "./styles.scss";

const BlockDetail = () => {
    return (
        <div className="Block-detail">
            <HorizontalGrid gap="5" columns={{ md: 1, lg: 3 }}>
                <BLockSync />
                <BlockOptimizeAll />
                <BlockOptimization />
            </HorizontalGrid>
        </div>
    );
};

const BLockSync = () => {
    const { t } = useTranslation();

    const { callSyncStoreImage } = useOptimizeImageService();

    const { isLoadingOverview, isPlanBlocked, isFetchingOverview } =
        useContext(OptimizeImageContext);

    const { overViewQuery, updateOverviewStatusProcessing } = useBlockDetail();

    const {
        isLoading: isLoadingCallSync,
        mutate: callSync,
        data: syncResponse,
    } = useMutation({
        mutationFn: callSyncStoreImage,
        onSuccess(data) {
            const { status, message = "" } = data;
            if (status && message.includes("Operation successful."))
                updateOverviewStatusProcessing({
                    resync_image_status: IOptimizeStatus.processing,
                });
            else setActiveToast(true);
        },
    });

    const isLoadingSync =
        isLoadingCallSync ||
        isLoadingOverview ||
        overViewQuery?.resync_image_status === IOptimizeStatus.processing;

    const [activeToast, setActiveToast] = useState(false);

    return (
        <Card>
            <div className="flex items-center mb-2">
                <Text as="p">
                    {t("optimize_image.block_detail.total_title")}
                </Text>
                <Tooltip
                    content={t("optimize_image.filter.sync_images_tooltip")}
                    activatorWrapper="div"
                >
                    <img src={IconQuestionMark} />
                </Tooltip>
            </div>
            <div className="flex items-center justify-between Block-detail_content">
                {isFetchingOverview ? (
                    <SkeletonBasic width="50px" />
                ) : (
                    <Text as="p" variant="headingMd">
                        {overViewQuery?.total_images || 0}
                    </Text>
                )}
                <Button
                    primary
                    disabled={
                        isPlanBlocked ||
                        !overViewQuery?.enable_resync_image ||
                        isFetchingOverview
                    }
                    loading={isLoadingSync}
                    onClick={callSync}
                    size="slim"
                >
                    {t("optimize_image.button.re_sync_images")}
                </Button>
            </div>
            {activeToast ? (
                <Toast
                    content={syncResponse?.message || ""}
                    onDismiss={() => setActiveToast(false)}
                />
            ) : null}
        </Card>
    );
};

const BlockOptimizeAll = () => {
    const { t } = useTranslation();

    const { overViewQuery, updateOverviewStatusProcessing, queryClient } =
        useBlockDetail();

    const { callActionOptimize } = useOptimizeImageService();

    const queryCache = queryClient.getQueryCache();

    const { total_restored_images, total_un_optimized_images } = useMemo(
        () => ({
            total_restored_images: overViewQuery?.total_restored_images || 0,
            total_un_optimized_images:
                overViewQuery?.total_un_optimized_images || 0,
        }),
        [overViewQuery]
    );

    const {
        isFetchingOverview,
        isLoadingOverview,
        isPlanBlocked,
        validateOnOptimize,
    } = useContext(OptimizeImageContext);

    const [isListEmpty, setStatusListEmpty] = useState(false);

    const [filter, setFilter] = useState<IFilterImage>({
        status: IStatusOptimizeImage.all,
        type: IFilterTypeImage.all_type,
        day: IFilterDay.all_time,
    });

    const unOptimize = useMemo(() => {
        if (isListEmpty) return 0;
        return filter.status === IStatusOptimizeImage.restored
            ? total_restored_images
            : filter.status === IStatusOptimizeImage.un_optimized
            ? total_un_optimized_images
            : total_restored_images + total_un_optimized_images;
    }, [
        filter.status,
        isListEmpty,
        total_restored_images,
        total_un_optimized_images,
    ]);

    const { mutate: actionOptimizeAll, isLoading } = useMutation({
        mutationFn: useCallback(async () => {
            const { status /* message */ } = validateOnOptimize(
              {
                typeOptimize:  ETypeOptimize.all,
                filterOptimize: filter.status 
              }
            );
            if (!status) return false;

            const { status: statusAPI } = await callActionOptimize({
                listImage: [],
                level: ELevelOptimize.normalPercent,
                optimizeType: [
                    IStatusOptimizeImage.restored,
                    IStatusOptimizeImage.un_optimized,
                ].includes(filter.status)
                    ? filter.status
                    : IStatusOptimizeImage.all,
            });
            if (!statusAPI) return false;
            return true;
        }, [callActionOptimize, filter.status, validateOnOptimize]),
        onSuccess: (data) => {
            if (data)
                updateOverviewStatusProcessing({
                    optimize_status: IOptimizeStatus.processing,
                });
        },
    });

    const isDisableButton =
        isFetchingOverview ||
        isPlanBlocked ||
        isLoading ||
        overViewQuery?.optimize_status === IOptimizeStatus.processing;

    useEffect(() => {
        const callBack = (event: QueryCacheNotifyEvent) => {
            const { type, query } = event;
            if (type !== "updated") return;
            const keys = query.queryKey as string[];

            if (
                keys.length !== 5 || //example ['optimizeImage', 'getListImage', 'all_type', 0, 'all']
                !keys.includes(EQueryKeyOptimizeImage.optimizeImage) ||
                !keys.includes(EQueryKeyOptimizeImage.getListImage)
            )
                return;

            const status = keys[keys.length - 1] as IStatusOptimizeImage,
                typeFilter = keys[keys.length - 3] as IFilterTypeImage,
                day =
                    IFilterDay[
                        keys[keys.length - 2] as keyof typeof IFilterDay
                    ];

            setFilter({ status, day, type: typeFilter });
            if (!query.state.data) return;

            const data = query.state.data as InfiniteData<
                IDataPagination<IDetailImageRaw[]>
            >;

            setStatusListEmpty(
                !(data?.pageParams || []).length ||
                    (data?.pages[0].total || 0) === 0
            );
        };
        const unsubscribe = queryCache.subscribe(callBack);
        return () => {
            unsubscribe();
        };
    }, [queryCache]);

    return (
        <Card>
            <div className="flex items-center mb-2">
                <Text as="p">
                    {t("optimize_image.block_detail.un_optimized_title")}
                </Text>
            </div>
            <div className="flex items-center justify-between Block-detail_content">
                {isFetchingOverview ? (
                    <SkeletonBasic width="50px" />
                ) : (
                    <Text as="p" variant="headingMd">
                        {unOptimize}
                    </Text>
                )}
                <Button
                    outline
                    loading={isLoadingOverview || isLoading}
                    disabled={isDisableButton}
                    onClick={actionOptimizeAll}
                    size="slim"
                >
                    {t("optimize_image.button.optimize_all")}
                </Button>
            </div>
        </Card>
    );
};

const BlockOptimization = () => {
    const { t } = useTranslation();

    const customer = useAppSelector(customerData);

    const { isFetching: isLoadingCustomer } = useQuery(
        queryKeys.customer.detail().queryKey
    );

    const {
        isUnlimitedOptimize,
        isPlanBlocked,
        refModalBuyMore,
        validateRequireSkipTrial,
    } = useContext(OptimizeImageContext);

    return (
        <Card>
            <div className="flex items-center mb-2">
                <Text as="p">
                    {t("optimize_image.block_detail.available_title")}
                </Text>
                <Tooltip
                    content={t("optimize_image.plan.available_tooltip")}
                    activatorWrapper="div"
                >
                    <img src={IconQuestionMark} />
                </Tooltip>
            </div>
            <div className="flex items-center justify-between Block-detail_content">
                <div className="inline-flex items-center">
                    <img src={IconOptimization} className="mr-3" />
                    {isLoadingCustomer ? (
                        <SkeletonBasic width="50px" />
                    ) : (
                        <Text as="p" variant="headingMd">
                            {isUnlimitedOptimize
                                ? t("optimize_image.plan.unlimited")
                                : (customer?.default_images_available || 0) +
                                  (customer?.buymore_images_available || 0)}
                        </Text>
                    )}
                </div>
                {!isUnlimitedOptimize && (
                    <Button
                        outline
                        disabled={isPlanBlocked || isLoadingCustomer}
                        size="slim"
                        onClick={() => {
                            if (validateRequireSkipTrial())
                                refModalBuyMore?.current?.setModal(true);
                        }}
                    >
                        {t("common.btn_get_more")}
                    </Button>
                )}
            </div>
        </Card>
    );
};

const useBlockDetail = () => {
    const queryClient = useQueryClient();

    // query function is define on feature notification so just get data from cache
    const { data: overViewQuery } = useQuery<GetTotal | null>(
        queryKeys.optimizeImage.getOverView().queryKey
    );

    const updateOverviewStatusProcessing = ({
        resync_image_status,
        optimize_status,
    }: Partial<GetTotal>) => {
        queryClient.setQueryData<GetTotal>(
            queryKeys.optimizeImage.getOverView().queryKey,
            (currentOverview) => {
                if (!currentOverview) return currentOverview;
                const clone = { ...currentOverview };

                if (resync_image_status)
                    clone.resync_image_status = resync_image_status;

                if (optimize_status) clone.optimize_status = optimize_status;

                return { ...clone };
            }
        );
    };

    return {
        queryClient,
        overViewQuery,
        updateOverviewStatusProcessing,
    };
};

export default BlockDetail;
