import { FilterList } from "@swift/components/UIs/DropFilter";
import { INNIT_PAGINATION } from "@swift/constants/general";
import { useDetectScrolledToBottom } from "@swift/hooks/useDetectScrolledToBottom";
import { queryKeys } from "@swift/queryKeys";
import { useOptimizeImageService } from "@swift/services/optimizeImageApi";
import {
    IDetailImageRaw,
    IFilterDay,
    IFilterImage,
    IFilterTypeImage,
    IStatusOptimizeImage,
} from "@swift/types/OptimizeImage";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useReducer, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const useListImage = () => {
    const { t } = useTranslation();

    const { getListImage } = useOptimizeImageService();

    const refListTable = useRef<HTMLDivElement>(null);

    const [refTable, setRefTable] = useState(refListTable.current);

    const { isBottom } = useDetectScrolledToBottom(refTable);

    const listFilterType: Array<FilterList> = [
        {
            value: IFilterTypeImage.all_type,
            label: t("optimize_image.filter.all_type"),
        },
        {
            value: IFilterTypeImage.product,
            label: t("optimize_image.filter.product"),
        },
        {
            value: IFilterTypeImage.collection,
            label: t("optimize_image.filter.collection"),
        },
        {
            value: IFilterTypeImage.article,
            label: t("optimize_image.filter.article"),
        },
        {
            value: IFilterTypeImage.asset,
            label: t("optimize_image.filter.asset"),
        },
    ];

    const listFilterDay: Array<FilterList> = [
        {
            value: IFilterDay.all_time.toString(),
            label: t("optimize_image.filter.all_date"),
        },
        {
            value: IFilterDay.seven_day.toString(),
            label: t("optimize_image.filter.seven_day"),
        },
        {
            value: IFilterDay.thirty_day.toString(),
            label: t("optimize_image.filter.thirty_day"),
        },
        {
            value: IFilterDay.ninety_day.toString(),
            label: t("optimize_image.filter.ninety_day"),
        },
        {
            value: IFilterDay.one_year.toString(),
            label: t("optimize_image.filter.one_year"),
        },
    ];

    const listFilterStatus: Array<FilterList> = [
        {
            value: IStatusOptimizeImage.all,
            label: t("optimize_image.status.all"),
        },
        {
            value: IStatusOptimizeImage.optimized,
            label: t("optimize_image.status.optimized"),
        },
        {
            value: IStatusOptimizeImage.restored,
            label: t("optimize_image.status.restored"),
        },
        {
            value: IStatusOptimizeImage.un_optimized,
            label: t("optimize_image.status.un_optimized"),
        },
    ];

    const taskReducerFilter = (
        filter: IFilterImage,
        action: {
            updateFor: "type" | "day" | "status";
            newVal: IFilterTypeImage | IFilterDay | IStatusOptimizeImage;
        }
    ) => {
        switch (action.updateFor) {
            case "day":
                return {
                    ...filter,
                    day: action.newVal as IFilterDay,
                };
            case "type":
                return {
                    ...filter,
                    type: IFilterTypeImage[action.newVal as IFilterTypeImage],
                };
            case "status":
                return {
                    ...filter,
                    status: IStatusOptimizeImage[
                        action.newVal as IStatusOptimizeImage
                    ],
                };
            default:
                throw Error("Unknown action: " + action.updateFor);
        }
    };

    const [filter, dispatchSetFilter] = useReducer(taskReducerFilter, {
        type: IFilterTypeImage.all_type,
        day: IFilterDay.all_time,
        status: IStatusOptimizeImage.all,
    });

    // properties use query return
    const {
        data: rawData,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage,
        isRefetching,
        refetch: reFetchList,
    } = useInfiniteQuery({
        ...queryKeys.optimizeImage.getListImage(filter),
        refetchOnWindowFocus: false,
        queryFn: async ({ pageParam = 1 }) => {
            const { data, status } = await getListImage({
                filter,
                limit: 10,
                page: pageParam,
            });
            if (!status) return INNIT_PAGINATION;
            return data ? data : INNIT_PAGINATION;
        },
        getNextPageParam: (lastPage) =>
            lastPage.current_page === lastPage.last_page
                ? undefined
                : lastPage.current_page + 1,
    });

    const listImage =
        rawData?.pages.reduce((init: Array<IDetailImageRaw>, current) => {
            return init.concat(...current.data);
        }, [] as Array<IDetailImageRaw>) ?? [];

    const trackChangeTableOnFilter = (targetNode: HTMLElement) => {
        const config = { childList: true };
        const callback = (mutations: MutationRecord[]) => {
            for (const mutation of mutations) {
                if (mutation.type === "childList") {
                    // console.log("A child node has been added or removed.");
                    const scrollElm = (
                        mutation.target as HTMLDivElement
                    ).querySelector(".Polaris-IndexTable-ScrollContainer");
                    // console.log("scrollElm >>>", scrollElm);
                    if (scrollElm) setRefTable(scrollElm as HTMLDivElement);
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    };

    useEffect(() => {
        if (!isFetchingNextPage && hasNextPage && isBottom) fetchNextPage();
    }, [fetchNextPage, hasNextPage, isBottom, isFetchingNextPage]);

    useEffect(() => {
        if (refListTable.current)
            trackChangeTableOnFilter(refListTable.current);
    }, []);

    return {
        refListTable,
        isBottom,
        listFilterStatus,
        listFilterDay,
        listFilterType,
        filter,
        isLoadingTable: isLoading || isRefetching,
        isFetchingNextPage,
        listImage,
        reFetchList,
        dispatchSetFilter,
    };
};

export default useListImage;
