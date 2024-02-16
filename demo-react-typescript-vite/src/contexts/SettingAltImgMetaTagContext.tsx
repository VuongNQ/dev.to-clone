import { DEFAULT_DATA_ALT_IMG_META_TAG } from "@swift/constants/constantsSeoBasic";
import { DataAltImgMetaTagType } from "@swift/types/boostSEO";
import { createContext } from "react";

const defaultDataSettingAltImgMetaTag: ISettingAltImgMetaTagContext = {
  isChangeData: false,
  setIsChangeData: () => null,
  dataAltImgMetaTag: DEFAULT_DATA_ALT_IMG_META_TAG,
  dataAltImgMetaTagState: DEFAULT_DATA_ALT_IMG_META_TAG,
  onSaveAltImgMetaTag: () => null,
  handleSetDataAltImgMetaTagState: () => null,
  handleRevertDataOrigin: () => null,
  isLoadFetchData: true,
  isLoadingSaveAltImgMetaTag: true,
};

export const SettingAltImgMetaTagContext =
  createContext<ISettingAltImgMetaTagContext>(defaultDataSettingAltImgMetaTag);

interface ISettingAltImgMetaTagContext {
  isChangeData: boolean;
  setIsChangeData: (value: boolean) => void;
  dataAltImgMetaTag: DataAltImgMetaTagType;
  dataAltImgMetaTagState: DataAltImgMetaTagType;
  onSaveAltImgMetaTag: () => void;
  handleSetDataAltImgMetaTagState: (
    payload: Partial<DataAltImgMetaTagType>
  ) => void;
  handleRevertDataOrigin: () => void;
  isLoadFetchData: boolean;
  isLoadingSaveAltImgMetaTag: boolean;
}
