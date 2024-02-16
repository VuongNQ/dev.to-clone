import { queryKeys } from "@swift/queryKeys";
import {
    IDataBulkAddAltImgAndMetaTag,
    IDataBulkAltImgMetaTag
} from "@swift/types/boostSEO";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export function useScanBulkAltImgAndMetaTag() {
  const queryClient = useQueryClient();

  const handleUpdateSettingBulk = useCallback(
    ({
      key,
      payload,
    }: {
      key: keyof IDataBulkAltImgMetaTag;
      payload: Partial<IDataBulkAddAltImgAndMetaTag>;
    }) => {
      queryClient.setQueryData<IDataBulkAltImgMetaTag>(
        queryKeys.basicSeo.getBulkAddAltImgAndMetaTag().queryKey,
        (oldData) => {
          if (!oldData) return oldData;
          let newData = oldData;
          newData = {
            ...newData,
            [key]: {
              ...newData[key],
              ...payload,
            },
          };

          return newData;
        }
      );
    },
    [queryClient]
  );

  return {
    handleUpdateSettingBulk,
  };
}
