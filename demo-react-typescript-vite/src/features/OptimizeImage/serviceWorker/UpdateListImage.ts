import { IDetailImageRaw } from "@swift/types/OptimizeImage";
import { IDataPagination } from "@swift/types/general";
import { InfiniteData } from "@tanstack/react-query";
import { getUpdatedListImage } from "../helpers";

self.onmessage = (e: MessageEvent<string>) => {
    const { id, size, optimized_size, src, status, list } = JSON.parse(
        e.data
    ) as IWorkerListImage;
    const listUpdate = getUpdatedListImage({
        id,
        size,
        optimized_size,
        src,
        status,
        listPaging: list.pages,
    });

    self.postMessage(JSON.stringify(listUpdate));
};
export {};
interface IWorkerListImage
    extends Pick<
        IDetailImageRaw,
        "id" | "size" | "optimized_size" | "src" | "status"
    > {
    list: InfiniteData<IDataPagination<IDetailImageRaw[]>>;
}
