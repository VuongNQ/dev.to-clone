import {
    Divider,
    ResourceItem,
    ResourceList,
    SkeletonDisplayText,
    SkeletonThumbnail,
} from "@shopify/polaris";
import SkeletonBasic from "@swift/components/UIs/Skeletons/SkeletonBasic";

export const SkeletonList = () => {
    const listDemo = Array.from({ length: 8 }, (_, i) => i).map((i) => {
        return {
            id: (new Date().getTime() + i).toString(),
        };
    });

    return (
        <ResourceList
            items={listDemo}
            renderItem={(item) => {
                const { id } = item;
                return (
                    <>
                        <Divider />
                        <ResourceItem id={id} url={""}>
                            <div className="skeleton-table-image">
                                <SkeletonThumbnail />
                                <SkeletonThumbnail />
                                <SkeletonDisplayText />
                                <SkeletonDisplayText />
                                <SkeletonDisplayText />
                                <SkeletonDisplayText />
                                <SkeletonDisplayText />
                            </div>
                        </ResourceItem>
                    </>
                );
            }}
        />
    );
};

export const SkeletonItem = () => {
    return (
        <>
            <tr>
                <td colSpan={7}>
                    <Divider />
                </td>
            </tr>
            <tr>
                <td>
                    <div className="flex items-center justify-center">
                        <SkeletonBasic
                            width="18px"
                            height="18px"
                            shape={"square"}
                        />
                    </div>
                </td>
                <td>
                    <div className="flex items-center py-3">
                        <SkeletonBasic
                            width="38px"
                            height="38px"
                            shape={"square"}
                        />
                    </div>
                </td>
                <td>
                    <SkeletonBasic height="28px" />
                </td>
                <td>
                    <SkeletonBasic height="28px" />
                </td>
                <td>
                    <SkeletonBasic height="28px" />
                </td>
                <td>
                    <SkeletonBasic height="28px" />
                </td>
                <td>
                    <SkeletonBasic height="28px" />
                </td>
            </tr>
        </>
    );
};
