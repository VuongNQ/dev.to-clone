import { Page, Toast } from "@shopify/polaris";
import Breadcrumb from "@swift/components/UIs/Breadcrumb";
import TabsGeneral from "@swift/components/UIs/TabsGeneral";
import { BREADCRUMB_SEO_BASIC } from "@swift/constants/constantBreadcrumb";
import {
    PAGES_SEO,
    TABS_SMART_SEO_BASIC,
} from "@swift/constants/constantsGeneral";
import {
    DEFAULT_ALT_IMAGE,
    DEFAULT_DATA_ALT_IMG_META_TAG,
    DEFAULT_META_DESCRIPTION,
    DEFAULT_META_TITLE,
} from "@swift/constants/constantsSeoBasic";
import { SettingAltImgMetaTagContext } from "@swift/contexts/SettingAltImgMetaTagContext";
import { useSettingAltImgMetaTag } from "@swift/features/MetaTagAndAltImgSEOFeature/hooks/useSettingAltImgMetaTag";
import { useToastGeneral } from "@swift/hooks/useToastGeneral";
import { queryKeys } from "@swift/queryKeys";
import { useBoostSEOService } from "@swift/services/boostSEOApi";
import { ProductTag } from "@swift/types/boostSEO";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { lazy, useMemo } from "react";
import { useTranslation } from "react-i18next";

const TabMetaTagsSEO = lazy(
    () => import("@swift/features/MetaTagAndAltImgSEOFeature/components/TabMetaTagsSEO")
);

const TabsAltImagesSEO = lazy(
    () => import("@swift/features/MetaTagAndAltImgSEOFeature/components/TabsAltImagesSEO")
);

const ProductAuditSEO = lazy(
    () =>
        import("@swift/features/ProductAuditSEO")
);

const WebsiteScanSEO = lazy(() => import("@swift/features/WebsiteScan"));


export function Component() {
    const { t } = useTranslation();

    const queryClient = useQueryClient();

    const { getSettingProductBoostSEO, postSaveSettingProductBoostSEO } =
        useBoostSEOService();

    const {toastInfo,toggleIsOpenToast} = useToastGeneral()

    const { data: dataAltImgMetaTag, isFetching: isLoadingDataAltImgMetaTag } =
        useQuery({
            ...queryKeys.basicSeo.getAltImgMetaTag(),
            refetchOnWindowFocus: false,
            queryFn: async () => {
                const { data, status } = await getSettingProductBoostSEO();
                if (!status || !data) return DEFAULT_DATA_ALT_IMG_META_TAG;
                return {
                    auto_add_alt_image:
                        data.auto_add_alt_image === 1 ? true : false,
                    auto_add_meta_tags:
                        data.auto_add_meta_tags === 1 ? true : false,
                    product_alt_image_format: data.product_alt_image_format
                        ? (data.product_alt_image_format.split(
                              " "
                          ) as ProductTag[])
                        : DEFAULT_ALT_IMAGE,
                    product_meta_title_format: data.product_meta_title_format
                        ? (data.product_meta_title_format.split(
                              " "
                          ) as ProductTag[])
                        : DEFAULT_META_TITLE,
                    product_meta_description_format:
                        data.product_meta_description_format
                            ? (data.product_meta_description_format.split(
                                  " "
                              ) as ProductTag[])
                            : DEFAULT_META_DESCRIPTION,
                };
            },
        });

    const dataSettingAltImgMetaTag = useSettingAltImgMetaTag(dataAltImgMetaTag);

    const {
        mutate: onSaveAltImgMetaTag,
        isLoading: isLoadingSaveAltImgMetaTag,
    } = useMutation({
        ...queryKeys.basicSeo.postAltImgMetaTag(),
        mutationFn: async () => {
            const res = await postSaveSettingProductBoostSEO(
                dataSettingAltImgMetaTag.dataAltImgMetaTagState
            );
            return res;
        },
        onSuccess: () => {
            dataSettingAltImgMetaTag.setIsChangeData(false);
            // Invalidate and refetch
            queryClient.invalidateQueries({
                queryKey: queryKeys.basicSeo.getAltImgMetaTag().queryKey,
            });

            toggleIsOpenToast({
                isError: false,
                isOpen: true,
                message: t("boostSEO.common.toast_message.toast_save_success"),
            });
        },
    });

    const TABS_BASIC = [
        {
            id: TABS_SMART_SEO_BASIC.scan_website.key,
            content: t(TABS_SMART_SEO_BASIC.scan_website.title),
            component: <WebsiteScanSEO />,
            tabs: TABS_SMART_SEO_BASIC.scan_website.key,
        },
        {
            id: TABS_SMART_SEO_BASIC.alt_images.key,
            content: t(TABS_SMART_SEO_BASIC.alt_images.title),
            component: <TabsAltImagesSEO />,
            tabs: TABS_SMART_SEO_BASIC.alt_images.key,
        },
        {
            id: TABS_SMART_SEO_BASIC.meta_title.key,
            content: t(TABS_SMART_SEO_BASIC.meta_title.title),
            component: <TabMetaTagsSEO />,
            tabs: TABS_SMART_SEO_BASIC.meta_title.key,
        },
        {
            id: TABS_SMART_SEO_BASIC.audit_product.key,
            content: t(TABS_SMART_SEO_BASIC.audit_product.title),
            component: <ProductAuditSEO />,
            tabs: TABS_SMART_SEO_BASIC.audit_product.key,
        },
    ];

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
        [toastInfo]
    );

    return (
        <div className="SeoBasicFeature">
            <Breadcrumb
                listBreadcrumb={[
                    BREADCRUMB_SEO_BASIC[0],
                    BREADCRUMB_SEO_BASIC[1],
                ]}
            />
            <Page
                title={t(`${PAGES_SEO["basic_SEO"].title}`)}
                subtitle={t(`${PAGES_SEO["basic_SEO"].des}`)}
            >
                <SettingAltImgMetaTagContext.Provider
                    value={{
                        ...dataSettingAltImgMetaTag,
                        dataAltImgMetaTag: dataAltImgMetaTag
                            ? dataAltImgMetaTag
                            : DEFAULT_DATA_ALT_IMG_META_TAG,
                        isLoadFetchData: isLoadingDataAltImgMetaTag,
                        isLoadingSaveAltImgMetaTag: isLoadingSaveAltImgMetaTag,
                        onSaveAltImgMetaTag: () => {
                            onSaveAltImgMetaTag();
                        },
                    }}
                >
                    <TabsGeneral
                        paramsQuery="tabs"
                        menu={TABS_BASIC}
                        urlRedirect="/seo-basic?tabs="
                        isNotChangeTabs={dataSettingAltImgMetaTag.isChangeData}
                        onResetForm={() => {
                            dataSettingAltImgMetaTag.handleRevertDataOrigin();
                        }}
                    />
                </SettingAltImgMetaTagContext.Provider>
                {toastMarkup}
            </Page>
        </div>
    );
}
