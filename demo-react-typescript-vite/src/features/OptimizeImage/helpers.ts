import { IDetailImageRaw } from "@swift/types/OptimizeImage";
import { IDataPagination } from "@swift/types/general";

export const getUpdatedListImage = (listTotal: IParamUpdateListImage) => {
    const { id, size, optimized_size, src, status, listPaging } = listTotal;
    return listPaging.map((item) => {
        const { data } = item;
        const selected = data.findIndex((img) => img.id === id);
        if (selected === -1) return { ...item };
        const updated = {
            ...data[selected],
            size,
            status,
            optimized_size,
            src,
        };
        data.splice(selected, 1, updated);
        return { ...item, data };
    });
};

interface IParamUpdateListImage
    extends Pick<
        IDetailImageRaw,
        "id" | "size" | "optimized_size" | "src" | "status"
    > {
    listPaging: IDataPagination<IDetailImageRaw[]>[];
}
