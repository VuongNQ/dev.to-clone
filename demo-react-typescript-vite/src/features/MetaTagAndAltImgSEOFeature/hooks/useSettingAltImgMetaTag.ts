import { DEFAULT_DATA_ALT_IMG_META_TAG } from "@swift/constants/constantsSeoBasic";
import { DataAltImgMetaTagType } from "@swift/types/boostSEO";
import { useCallback, useEffect, useState } from "react";

export function useSettingAltImgMetaTag(
    dataAltImgMetaTag: DataAltImgMetaTagType | undefined
) {
    const [dataAltImgMetaTagState, setDataAltImgMetaTagState] =
        useState<DataAltImgMetaTagType>(DEFAULT_DATA_ALT_IMG_META_TAG);

    const [isChangeData, setIsChangeData] = useState<boolean>(false);

    /**handle change dataAltImgMetaTagState  */
    const handleSetDataAltImgMetaTagState = useCallback(
        (value: Partial<DataAltImgMetaTagType>) => {
            setDataAltImgMetaTagState((old) => {
                return { ...old, ...value };
            });
        },
        []
    );
    /**end handle change dataAltImgMetaTagState  */

    /**handle Check alt img, meta tag local change  */
    const handleCheckDataAltImgMetaTagLocalChange = useCallback(() => {
        const isAlike =
            JSON.stringify(dataAltImgMetaTagState) ===
            JSON.stringify(dataAltImgMetaTag)
                ? true
                : false;

        setIsChangeData(!isAlike);
    }, [dataAltImgMetaTagState, dataAltImgMetaTag]);
    /**end handle Check Data State change  */

    /**on revert data origin */
    const handleRevertDataOrigin = useCallback(() => {
        if (!dataAltImgMetaTag) return;
        setDataAltImgMetaTagState(dataAltImgMetaTag);
    }, [dataAltImgMetaTag]);
    /**endrevert data origin  */

    /** check update isChangeData when dataAltImgMetaTagState change */
    useEffect(() => {
        if (!dataAltImgMetaTag) return;
        handleCheckDataAltImgMetaTagLocalChange();
    }, [dataAltImgMetaTagState]);
    /** check update isChangeData when dataAltImgMetaTagState change*/

    /** check update isChangeData when dataAltImgMetaTagState change */
    useEffect(() => {
        if (!dataAltImgMetaTag) return;
        handleSetDataAltImgMetaTagState(dataAltImgMetaTag);
    }, [dataAltImgMetaTag]);
    /** check update isChangeData when dataAltImgMetaTagState change*/

    return {
        isChangeData,
        setIsChangeData,
        handleSetDataAltImgMetaTagState,
        dataAltImgMetaTagState,
        handleRevertDataOrigin,
    };
}
