import {
    ButtonGroup,
    Divider,
    IndexTable,
    Text,
    useIndexResourceState,
} from "@shopify/polaris";
import { NonEmptyArray } from "@shopify/polaris/build/ts/src/types";
import { SelectionType } from "@shopify/polaris/build/ts/src/utilities/index-provider/types";
import HistoryEmpty from "@swift/assets/svg/wallet/history-empty.svg";
import DropFilter from "@swift/components/UIs/DropFilter";
import {
    IFilterDay,
    IFilterTypeImage,
    IStatusOptimizeImage,
    PusherEventImages,
    PusherOptimizeImages,
} from "@swift/types/OptimizeImage";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { OptimizeImageContext } from "../../context/optimizeImage";
import { useEventPusherOptimize } from "../../hooks/useEventPusherOptimize";
import useListImage from "../../hooks/useListImage";
import { ESelectionTypePolaris, ETypeOptimize } from "../../type";
import { RenderDetail } from "./DetailItem";
import { SkeletonItem, SkeletonList } from "./SkeletonList";
import "./styles.scss";

const ListImage = () => {
    const { t } = useTranslation();

    const {
        refListTable,
        isBottom,
        listFilterType,
        listFilterDay,
        listFilterStatus,
        filter,
        listImage,
        isLoadingTable,
        isFetchingNextPage,
        dispatchSetFilter,
    } = useListImage();

    const {
        isPlanBlocked,
        listOptimize,
        listRestore,
        listOptimizing,
        listRestoring,
        removeAllSelected,
        onSelectedAll,
        onSelectedItem,
        onActionOptimize,
        refModalRestore,
        validateOnOptimize,
    } = useContext(OptimizeImageContext);

    const { channel } = useEventPusherOptimize({ filter });

    const { mutate: actionOptimize, isLoading: isCallingActionOptimize } =
        useMutation({
            mutationFn: async () => {
                const { status } = validateOnOptimize({
                    typeOptimize:ETypeOptimize.multi
                });
                if (status) return await onActionOptimize(false);
                return false;
            },
        });

    const isDisableOptimizePromoteBulk =
        !listOptimize.length ||
        listOptimizing.length > 0 ||
        isCallingActionOptimize;

    const isDisableRestorePromoteBulk =
        !listRestore.length || listRestoring.length > 0;

    const promotedBulkActions = useMemo(
        () => [
            {
                content: t("optimize_image.list_image.optimize"),
                disabled: isDisableOptimizePromoteBulk,
                onAction: actionOptimize,
            },
            {
                content: t("optimize_image.list_image.restore"),
                disabled: isDisableRestorePromoteBulk,
                onAction: () =>
                    refModalRestore?.current?.setModal({ isActive: true }),
            },
        ],
        [
            t,
            isDisableOptimizePromoteBulk,
            actionOptimize,
            isDisableRestorePromoteBulk,
            refModalRestore,
        ]
    );

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(
            listImage as unknown as { [key: string]: unknown }[]
        );

    const onSelectionChanged = (
        selectionType: SelectionType | ESelectionTypePolaris,
        isSelecting: boolean,
        selection?: string
    ) => {
        if (isPlanBlocked) return;
        handleSelectionChange(
            selectionType as SelectionType,
            isSelecting,
            selection
        );

        if (
            selectionType === ESelectionTypePolaris.Multi ||
            selectionType === ESelectionTypePolaris.All ||
            selectionType === ESelectionTypePolaris.Page
        ) {
            handleMultiSelect(isSelecting);
        }

        if (selectionType === ESelectionTypePolaris.Single) {
            handleSingleSelect(selection, isSelecting);
        }
    };

    const handleSingleSelect = useCallback(
        (selection?: string, isSelecting = false) => {
            const image = listImage.find(
                // bew
                ({ id }) => id.toString() === selection?.toString()
            );
            if (!image) return;

            if (image.status === IStatusOptimizeImage.optimized) {
                onSelectedItem({
                    isOptimize: false,
                    args: {
                        type: isSelecting ? "add" : "remove",
                        itemId: +image.id,
                    },
                });
            } else {
                onSelectedItem({
                    isOptimize: true,
                    args: {
                        type: isSelecting ? "add" : "remove",
                        itemId: +image.id,
                    },
                });
            }
        },
        [listImage, onSelectedItem]
    );

    const handleMultiSelect = useCallback(
        (isSelecting: boolean) => {
            if (!isSelecting) {
                removeAllSelected();
                return;
            }
            const listFilter = listImage.reduce(
                (
                    init: { optimize: Array<number>; restore: Array<number> },
                    current
                ) => {
                    const isOptimized =
                        current.status === IStatusOptimizeImage.optimized;
                    if (isOptimized) init.restore.push(+current.id);
                    else init.optimize.push(+current.id);
                    return init;
                },
                { optimize: [], restore: [] } as {
                    optimize: Array<number>;
                    restore: Array<number>;
                }
            );

            onSelectedAll({
                argsOptimize: { type: "add", itemId: listFilter.optimize },
                argsRestore: { type: "add", itemId: listFilter.restore },
            });
        },
        [listImage, onSelectedAll, removeAllSelected]
    );

    const rowMarkup = listImage.map(
        (
            {
                id,
                src,
                status,
                updated_at,
                origin_size,
                optimized_size,
                alt,
                // type_id,
                image_id,
            },
            index
        ) => (
            <RenderDetail
                id={id}
                src={src}
                status={status}
                updated_at={updated_at}
                origin_size={origin_size}
                optimized_size={optimized_size}
                alt={alt}
                selected={selectedResources.includes(id as unknown as string)}
                index={index}
                key={image_id}
            />
        )
    );

    const headingTable = [
        { title: t("optimize_image.list_image.image") },
        {
            title: t("optimize_image.list_image.last_date"),
        },
        {
            title: t("optimize_image.list_image.status"),
        },
        {
            title: t("optimize_image.list_image.original_size"),
        },
        {
            title: t("optimize_image.list_image.optimized_size"),
        },
        { title: "" },
    ];

    const onEventPusher = useCallback(
        (data: PusherOptimizeImages) => {
            const { optimizedImage } = data;
            if (!optimizedImage) return;
            const { id, status } = optimizedImage;

            const isDone =
                status === IStatusOptimizeImage.optimized ||
                status === IStatusOptimizeImage.restored ||
                status === IStatusOptimizeImage.failed;

            if (selectedResources.includes(id as unknown as string) && isDone)
                handleSelectionChange(
                    ESelectionTypePolaris.Single as unknown as SelectionType,
                    false,
                    id as unknown as string
                );
        },
        [handleSelectionChange, selectedResources]
    );

    useEffect(() => {
        channel.bind(PusherEventImages.compress_images, onEventPusher);

        channel.bind(PusherEventImages.restore_images, onEventPusher);
        return () => {
            channel.unbind(PusherEventImages.compress_images, onEventPusher);

            channel.unbind(PusherEventImages.restore_images, onEventPusher);
        };
    }, [channel, onEventPusher]);

    useEffect(() => {
        handleSelectionChange(
            ESelectionTypePolaris.All as unknown as SelectionType,
            false
        );
        removeAllSelected();
    }, [filter]);

    return (
        <section className="List-image">
            <div className="List-image__filter p-5 flex justify-end">
                <ButtonGroup segmented>
                    <DropFilter
                        disable={isPlanBlocked}
                        value={[filter.type]}
                        setValue={(selected) =>
                            dispatchSetFilter({
                                updateFor: "type",
                                newVal: selected[0] as IFilterTypeImage,
                            })
                        }
                        list={listFilterType}
                    />
                    <DropFilter
                        disable={isPlanBlocked}
                        value={[filter.day.toString()]}
                        setValue={(selected) =>
                            dispatchSetFilter({
                                updateFor: "day",
                                newVal: +selected[0] as IFilterDay,
                            })
                        }
                        list={listFilterDay}
                    />

                    <DropFilter
                        disable={isPlanBlocked}
                        value={[filter.status]}
                        setValue={(selected) =>
                            dispatchSetFilter({
                                updateFor: "status",
                                newVal: selected[0] as IStatusOptimizeImage,
                            })
                        }
                        list={listFilterStatus}
                    />
                </ButtonGroup>
            </div>
            <div
                ref={refListTable}
                className={`List-image__table-wrapper ${
                    isBottom ? "scrolled-bottom" : ""
                }`}
            >
                {isLoadingTable ? (
                    <SkeletonList />
                ) : (
                    <IndexTable
                        itemCount={listImage.length}
                        selectedItemsCount={
                            allResourcesSelected
                                ? "All"
                                : selectedResources.length
                        }
                        onSelectionChange={onSelectionChanged}
                        headings={
                            headingTable as NonEmptyArray<{ title: string }>
                        }
                        promotedBulkActions={promotedBulkActions}
                        emptyState={
                            <>
                                <Divider />
                                <div className="flex items-center justify-center flex-col List-image__empty">
                                    <img src={HistoryEmpty} alt="" />
                                    <Text as="p" color="subdued">
                                        {t("profile.list.no_data")}
                                    </Text>
                                </div>
                            </>
                        }
                    >
                        {rowMarkup}
                        {isFetchingNextPage ? <SkeletonItem /> : null}
                    </IndexTable>
                )}
            </div>
        </section>
    );
};

export default ListImage;
