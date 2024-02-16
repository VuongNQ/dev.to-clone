import { ContextualSaveBar, Divider, Text, Toast } from "@shopify/polaris";
import {
    DEFAULT_META_DESCRIPTION,
    DEFAULT_META_TITLE,
    LIST_QUESTION_META_TITLE,
} from "@swift/constants/constantsSeoBasic";
import { useAppSelector } from "@swift/hooks";
import { customerData } from "@swift/store/global";
import {
    EStatusHandledTotal,
    IDataBulkAltImgMetaTag,
    KeyStatusBulkAddAltImgAndMetaTag,
    ProductTag,
} from "@swift/types/boostSEO";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import InputProductTag from "../InputProductTag";
import "./styles.scss";

import iconBrowser from "@swift/assets/images/basicSeo/icon-browser.png";
import IconGoogle from "@swift/assets/images/basicSeo/icon-google.png";
import FrequentlyAskedQuestions from "@swift/components/UIs/FrequentlyAskedQuestions";
import { SettingAltImgMetaTagContext } from "@swift/contexts/SettingAltImgMetaTagContext";
import { useToastGeneral } from "@swift/hooks/useToastGeneral";
import { queryKeys } from "@swift/queryKeys";
import { useBoostSEOService } from "@swift/services/boostSEOApi";
import { formatMDYAMPMAtString } from "@swift/utils/formatDate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useScanBulkAltImgAndMetaTag } from "../../hooks/useScanBulkAltImgAndMetaTag";
import BulkMetaTagsAndAltImg from "../BulkMetaTagsAndAltImg";
import AutoMetaTagsSEO from "../AutoMetaTagsSEO";

const LIST_PRODUCT_META_TITLE = [
    ProductTag.PRODUCT_TITLE_FORMAT,
    ProductTag.PRODUCT_TYPE_FORMAT,
    ProductTag.PRODUCT_CATEGORY_FORMAT,
    ProductTag.SHOP_NAME_FORMAT,
];

const LIST_PRODUCT_META_DESCRIPTION = [
    ProductTag.SHOP_NAME_FORMAT,
    ProductTag.PRODUCT_TITLE_FORMAT,
    ProductTag.PRODUCT_DESCRIPTION_FORMAT,
    ProductTag.PRODUCT_TYPE_FORMAT,
    ProductTag.PRODUCT_PRICE_FORMAT,
    ProductTag.PRODUCT_VENDOR_FORMAT,
];

function TabMetaTagsSEO() {
    const { t } = useTranslation();

    const { postBulkAddMetaTag, postScanMissingMetaTag } = useBoostSEOService();

    const customer = useAppSelector(customerData);

    const { handleUpdateSettingBulk } = useScanBulkAltImgAndMetaTag();

    const {
        dataAltImgMetaTagState,
        handleSetDataAltImgMetaTagState,
        isChangeData,
        handleRevertDataOrigin,
        onSaveAltImgMetaTag,
        isLoadingSaveAltImgMetaTag,
    } = useContext(SettingAltImgMetaTagContext);

    const { toastInfo, toggleIsOpenToast } = useToastGeneral();

    const [formState, setFormState] = useState({
        product_meta_title_format: {
            isValid: true,
            message: "",
        },
        product_meta_description_format: {
            isValid: true,
            message: "",
        },
    });

    const { data: dataBulkAltMetaTag, isLoading: isLoadingFetchData } =
        useQuery<IDataBulkAltImgMetaTag>(
            queryKeys.basicSeo.getBulkAddAltImgAndMetaTag().queryKey
        );

    const dataBulkAddMetaTag = useMemo(() => {
        if (!dataBulkAltMetaTag) return null;
        const { dataBulkAddMetaTag } = dataBulkAltMetaTag;
        return dataBulkAddMetaTag;
    }, [dataBulkAltMetaTag]);

    const dataScanMissingMetaTag = useMemo(() => {
        if (!dataBulkAltMetaTag) return null;
        const { dataScanMissingMetaTag } = dataBulkAltMetaTag;
        return dataScanMissingMetaTag;
    }, [dataBulkAltMetaTag]);

    const {
        mutate: onPostBulkAddMetaTag,
        isLoading: isLoadingPostBulkAddMetaTag,
    } = useMutation({
        mutationFn: async () => {
            const { status } = await postBulkAddMetaTag();

            if (status) {
                handleUpdateSettingBulk({
                    key: "dataBulkAddMetaTag",
                    payload: {
                        status: KeyStatusBulkAddAltImgAndMetaTag.processing,
                    },
                });
                return;
            }
        },
    });

    const {
        mutate: onPostScanMissingMetaTag,
        isLoading: isLoadingPostScanMissingMetaTag,
    } = useMutation({
        mutationFn: async () => {
            const { status } = await postScanMissingMetaTag();

            if (status) {
                handleUpdateSettingBulk({
                    key: "dataScanMissingMetaTag",
                    payload: {
                        status: KeyStatusBulkAddAltImgAndMetaTag.processing,
                    },
                });
                return;
            }
        },
    });

    /**handle validate meta tag */
    const handleValidateMetaTag = useCallback(() => {
        const formStateTemp = {
            product_meta_title_format: { isValid: true, message: "" },
            product_meta_description_format: { isValid: true, message: "" },
        };

        for (const property in formState) {
            const value =
                dataAltImgMetaTagState[
                    property as keyof typeof dataAltImgMetaTagState
                ];
            // const value = formState[property as keyof typeof formState]
            if (typeof value !== "boolean" && value.length <= 0) {
                formStateTemp[property as keyof typeof formState].isValid =
                    false;
                formStateTemp[property as keyof typeof formState].message = t(
                    "boostSEO.validate_alt_img_meta_tag"
                );
            }
        }

        setFormState(formStateTemp);
    }, [formState, dataAltImgMetaTagState, t]);
    /**end handle validate meta tag */

    /** tracking validate */
    useEffect(() => {
        handleValidateMetaTag();
    }, [
        dataAltImgMetaTagState.product_meta_title_format,
        dataAltImgMetaTagState.product_meta_description_format,
    ]);
    /** end tracking validate */

    /** check enable button save */
    const isSubmitSave = useMemo(() => {
        for (const property in formState) {
            const isValid =
                formState[property as keyof typeof formState].isValid;

            if (!isValid) {
                return false;
            }
        }

        return true;
    }, [formState]);
    /** end check enable button save */

    const toastMarkup = useMemo(
        () =>
            toastInfo.isOpen ? (
                <Toast
                    content={toastInfo.message}
                    error={toastInfo.isError}
                    onDismiss={() => {
                        toggleIsOpenToast({ isOpen: false });
                    }}
                />
            ) : null,
        [
            toastInfo.isOpen,
            toastInfo.message,
            toastInfo.isError,
            toggleIsOpenToast,
        ]
    );

    const isLoadingBtn = useMemo(
        () =>
            isLoadingFetchData ||
            isLoadingPostBulkAddMetaTag ||
            isLoadingPostScanMissingMetaTag ||
            dataBulkAddMetaTag?.status ===
                KeyStatusBulkAddAltImgAndMetaTag.processing ||
            dataScanMissingMetaTag?.status ===
                KeyStatusBulkAddAltImgAndMetaTag.processing,
        [
            dataBulkAddMetaTag?.status,
            dataScanMissingMetaTag?.status,
            isLoadingFetchData,
            isLoadingPostBulkAddMetaTag,
            isLoadingPostScanMissingMetaTag,
        ]
    );

    const isScanMissingFirstTime = useMemo(() => {
        if (!dataScanMissingMetaTag) return true;
        if (
            dataScanMissingMetaTag.handled_total ===
            EStatusHandledTotal.not_handled
        )
            return true;

        return false;
    }, [dataScanMissingMetaTag]);

    const isAddBulk = useMemo(() => {
        if (
            dataScanMissingMetaTag &&
            dataScanMissingMetaTag.status ===
                KeyStatusBulkAddAltImgAndMetaTag.done &&
            dataScanMissingMetaTag.handled_total > 0
        )
            return true;

        return false;
    }, [dataScanMissingMetaTag]);

    const isScanMissingAgain = useMemo(() => {
        if (dataScanMissingMetaTag?.handled_total === 0) return true;

        if (
            dataScanMissingMetaTag?.handled_total ===
                EStatusHandledTotal.not_handled &&
            dataBulkAddMetaTag &&
            dataBulkAddMetaTag.status === KeyStatusBulkAddAltImgAndMetaTag.done
        )
            return true;

        return false;
    }, [dataBulkAddMetaTag, dataScanMissingMetaTag?.handled_total]);

    const subTitleBulk = useMemo(() => {
        if (isAddBulk || dataScanMissingMetaTag?.handled_total === 0)
            return t("smartSEO.meta_title.sub_title_scan_missing");

        if (isScanMissingAgain)
            return t("smartSEO.meta_title.add_bulk.sub_title");

        return t("smartSEO.meta_title.add_bulk_no_image.sub_title");
    }, [
        dataScanMissingMetaTag?.handled_total,
        isAddBulk,
        isScanMissingAgain,
        t,
    ]);

    const subDesBulk = useMemo(() => {
        const handledTotal = isAddBulk
            ? dataScanMissingMetaTag?.handled_total
            : isScanMissingAgain
            ? dataBulkAddMetaTag?.handled_total
            : 0;

        if (handledTotal && handledTotal > 0)
            return t("smartSEO.meta_title.add_bulk.sub_des", {
                number: handledTotal,
            });

        return t("smartSEO.meta_title.add_bulk_no_image.sub_des");
    }, [
        dataBulkAddMetaTag?.handled_total,
        dataScanMissingMetaTag?.handled_total,
        isAddBulk,
        isScanMissingAgain,
        t,
    ]);

    const titleBtn = useMemo(() => {
        if (isAddBulk) return t("smartSEO.meta_title.add_bulk.btn_add");

        if (isScanMissingAgain) return t("boostSEO.common.btn_re_scan");

        return t("smartSEO.meta_title.add_bulk.btn_scan_missing");
    }, [isAddBulk, isScanMissingAgain, t]);

    const txtDateUpdate = useMemo(() => {
        if (isScanMissingAgain)
            return t("common.txt_last_update", {
                number: formatMDYAMPMAtString(
                    dataBulkAddMetaTag?.updated_at || ""
                ),
            });

        return t("common.txt_last_update", {
            number: formatMDYAMPMAtString(
                dataScanMissingMetaTag?.updated_at || ""
            ),
        });
    }, [
        dataBulkAddMetaTag?.updated_at,
        dataScanMissingMetaTag?.updated_at,
        isScanMissingAgain,
        t,
    ]);

    return (
        <div className="TabMetaTitleSEO flex flex-col gap-5 p-5">
            {/* section preview */}
            <div className="TabMetaTitleSEO__wp-preview p-5 sw__wp-box">
                <h4 className="gap-2 flex items-center pb-3">
                    <img src={IconGoogle} alt="" />
                    <Text as="span" variant="headingMd">{t("smartSEO.audit_product.section_preview_title")}</Text>
                </h4>
                <Divider />
                <div className="pt-3 flex gap-2 items-start">
                    <img src={iconBrowser} alt="" />
                    <div className="flex flex-col gap-1 flex-1">
                        <p>{customer?.domain || customer?.shopify_domain}</p>
                        <h2 className="TabMetaTitleSEO__store-name">
                            {dataAltImgMetaTagState.product_meta_title_format.join(
                                " | "
                            )}
                        </h2>
                        <p className="TabMetaTitleSEO__preview-des">
                            {dataAltImgMetaTagState.product_meta_description_format.join(
                                "  "
                            )}
                        </p>
                    </div>
                </div>
                <p className="TabMetaTitleSEO__des-example mt-3">
                    {t("smartSEO.meta_title.section_example.des")}
                </p>
            </div>
            {/*end section preview */}

            <div className="TabMetaTitleSEO__form p-5 sw__wp-box">
                <div className="flex flex-col gap-3">
                    <Text as="h3" variant="headingMd">
                        {t("smartSEO.meta_title.form_title")}
                    </Text>
                    <Divider></Divider>
                    <div className="TabsAltImagesSEO__input">
                        <InputProductTag
                            label={t(
                                "smartSEO.meta_title.form_label_meta_title"
                            )}
                            listProductTag={LIST_PRODUCT_META_TITLE}
                            value={
                                dataAltImgMetaTagState.product_meta_title_format
                            }
                            setValue={(value) => {
                                handleSetDataAltImgMetaTagState({
                                    product_meta_title_format: value,
                                });
                            }}
                            resetDefaultValue={DEFAULT_META_TITLE}
                            isMetaTitle={true}
                            messageError={
                                formState.product_meta_title_format.message
                            }
                        />
                    </div>
                    <div className="TabsAltImagesSEO__input">
                        <InputProductTag
                            label={t("smartSEO.meta_title.form_label_meta_des")}
                            listProductTag={LIST_PRODUCT_META_DESCRIPTION}
                            value={
                                dataAltImgMetaTagState.product_meta_description_format
                            }
                            setValue={(value) => {
                                handleSetDataAltImgMetaTagState({
                                    product_meta_description_format: value,
                                });
                            }}
                            resetDefaultValue={DEFAULT_META_DESCRIPTION}
                            isDescription={true}
                            messageError={
                                formState.product_meta_description_format
                                    .message
                            }
                        />
                    </div>
                </div>
            </div>
            {/* Auto meta tags */}
            <AutoMetaTagsSEO />
            {/* Auto meta tags */}

            {/* Bulk MetaTags And AltImg */}
            <div className="TabMetaTitleSEO__bulk">
                <BulkMetaTagsAndAltImg
                    title={t("smartSEO.meta_title.add_bulk.title")}
                    des={t("smartSEO.meta_title.add_bulk.des")}
                    isShowColRight={isAddBulk || isScanMissingAgain}
                    subTitle={subTitleBulk}
                    subDes={subDesBulk}
                    titleBtn={titleBtn}
                    onCallbackBulk={onPostBulkAddMetaTag}
                    onCallbackScanMissing={onPostScanMissingMetaTag}
                    txtDateUpdate={txtDateUpdate}
                    isLoading={isLoadingBtn}
                    isUseScanMissing={
                        isScanMissingFirstTime || isScanMissingAgain
                    }
                    isPrimaryBtn={!isScanMissingAgain}
                />
            </div>
            {/* Bulk MetaTags And AltImg */}

            <FrequentlyAskedQuestions
                listQuestion={LIST_QUESTION_META_TITLE}
                title={t("boostSEO.title_question")}
            />

            {isChangeData && (
                <ContextualSaveBar
                    message={t("setting_page.language.save_bar.title")}
                    saveAction={{
                        content: t("common.btn_save"),
                        onAction: onSaveAltImgMetaTag,
                        loading: isLoadingSaveAltImgMetaTag,
                        disabled: !isSubmitSave,
                    }}
                    discardAction={{
                        content: t("common.btn_discard"),
                        onAction: () => {
                            handleRevertDataOrigin();
                        },
                        disabled: isLoadingSaveAltImgMetaTag,
                    }}
                />
            )}
            {toastMarkup}
        </div>
    );
}

export default TabMetaTagsSEO;
