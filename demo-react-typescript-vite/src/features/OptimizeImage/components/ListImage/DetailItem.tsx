import { Badge, Button, IndexTable, Text } from "@shopify/polaris";
import { RenderThumbnail } from "@swift/components/UIs/Thumbnail";
import { useOptimizeImageService } from "@swift/services/optimizeImageApi";
import {
    IDetailImageRaw,
    IStatusOptimizeImage,
} from "@swift/types/OptimizeImage";
import { formatDateYYYYMMDDStrike } from "@swift/utils/formatDate";
import { convertBytesToFormat } from "@swift/utils/funcString";
import { SyntheticEvent, memo, useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { OptimizeImageContext } from "../../context/optimizeImage";
import { ETypeOptimize } from "../../type";

interface IDetail
    extends Pick<
        IDetailImageRaw,
        | "id"
        | "src"
        | "status"
        | "updated_at"
        | "optimized_size"
        | "alt"
        | "origin_size"
    > {
    index: number;
    selected: boolean;
}

export const RenderDetail = memo(function _({
    id,
    src,
    status,
    updated_at,
    origin_size,
    optimized_size,
    alt,
    // type_id,
    // image_id,
    index,
    selected,
}: IDetail) {
    const { isPlanBlocked, listOptimizing, listRestoring } =
        useContext(OptimizeImageContext);

    const isDisableSelected =
        isPlanBlocked ||
        status === IStatusOptimizeImage.optimizing ||
        status === IStatusOptimizeImage.restoring ||
        listOptimizing.includes(id) ||
        listRestoring.includes(id);

    return (
        <IndexTable.Row
            id={id as unknown as string}
            selected={selected}
            position={index}
            disabled={isDisableSelected}
        >
            <IndexTable.Cell>
                <RenderThumbnail url={src} alt={alt || ""} />
            </IndexTable.Cell>
            <IndexTable.Cell>
                {formatDateYYYYMMDDStrike(updated_at)}
            </IndexTable.Cell>
            <IndexTable.Cell>
                <RenderStatusOptimizeMemo status={status} id={id} />
            </IndexTable.Cell>
            <IndexTable.Cell>
                {origin_size ? convertBytesToFormat(+origin_size) : "-"}
            </IndexTable.Cell>
            <IndexTable.Cell>
                {optimized_size && status === IStatusOptimizeImage.optimized ? (
                    <Text as="p" color="success">
                        {convertBytesToFormat(+optimized_size)}
                    </Text>
                ) : (
                    "-"
                )}
            </IndexTable.Cell>
            <IndexTable.Cell className="action-optimize">
                <RenderActionTableMemo id={+id} status={status} />
            </IndexTable.Cell>
        </IndexTable.Row>
    );
});

const RenderActionTableMemo = memo(function _({
    id,
    status,
}: {
    id: number;
    status: IStatusOptimizeImage;
}) {
    const { t } = useTranslation();
    const {
        isPlanBlocked,
        listOptimize,
        listRestore,
        refModalRestore,
        listOptimizing,
        listRestoring,
        dispatchListOptimizing,
        validateOnOptimize,
    } = useContext(OptimizeImageContext);

    const { callActionOptimize } = useOptimizeImageService();

    const statusLoading =
        listOptimizing.includes(+id) ||
        listRestoring.includes(+id) ||
        status === IStatusOptimizeImage.optimizing ||
        status === IStatusOptimizeImage.restoring;

    const isDisable =
        isPlanBlocked ||
        listOptimize.includes(+id) ||
        listRestore.includes(+id) ||
        statusLoading;

    const actionOptimize = useCallback(() => {
        const { status } = validateOnOptimize({
            typeOptimize:ETypeOptimize.single
        });
        if (status) {
            dispatchListOptimizing({ type: "add", itemId: id });
            callActionOptimize({ listImage: [id] });
        }
    }, [id, callActionOptimize, dispatchListOptimizing, validateOnOptimize]);

    const onAction = (event: SyntheticEvent) => {
        event.stopPropagation();
        if (isDisable) return;
        if (status === IStatusOptimizeImage.optimized) {
            refModalRestore?.current?.setModal({ isActive: true, idItem: id });
        } else {
            actionOptimize();
        }
    };

    return (
        <span className={`inline-block ${status}`} onClick={onAction}>
            <Button disabled={isDisable} loading={statusLoading}>
                {status === IStatusOptimizeImage.optimized
                    ? t("optimize_image.list_image.restore")
                    : t("optimize_image.list_image.optimize")}
            </Button>
        </span>
    );
});

const RenderStatusOptimizeMemo = memo(function _({
    status,
    id,
}: {
    status: IStatusOptimizeImage;
    id: number;
}) {
    const { t } = useTranslation();

    const { listOptimizing, listRestoring } = useContext(OptimizeImageContext);

    const statusItem = listOptimizing.includes(id)
        ? IStatusOptimizeImage.optimizing
        : listRestoring.includes(id)
        ? IStatusOptimizeImage.restoring
        : status;

    if (IStatusOptimizeImage.optimized === statusItem)
        return (
            <Badge
                status={EStatusValueBadgePolaris.Success}
                progress={EProgressValueBadgePolaris.Complete}
            >
                {t(`optimize_image.status.${statusItem}`)}
            </Badge>
        );

    if (
        IStatusOptimizeImage.restored === statusItem ||
        IStatusOptimizeImage.restoring === statusItem
    )
        return (
            <Badge
                status={EStatusValueBadgePolaris.Warning}
                progress={EProgressValueBadgePolaris.Complete}
            >
                {t(`optimize_image.status.${statusItem}`)}
            </Badge>
        );

    return (
        <Badge progress={EProgressValueBadgePolaris.Complete}>
            {t(`optimize_image.status.${statusItem}`)}
        </Badge>
    );
});

enum EStatusValueBadgePolaris {
    Info = "info",
    Success = "success",
    Warning = "warning",
    Critical = "critical",
    Attention = "attention",
    New = "new",
}

enum EProgressValueBadgePolaris {
    Incomplete = "incomplete",
    PartiallyComplete = "partiallyComplete",
    Complete = "complete",
}
