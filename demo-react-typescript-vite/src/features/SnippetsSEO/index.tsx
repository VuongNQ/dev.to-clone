import {
    SkeletonBodyText,
    SkeletonDisplayText,
    SkeletonTabs,
    Toast,
} from "@shopify/polaris";
import TabsPolaris from "@swift/components/UIs/TabsGeneral/TabsPolaris";
import { SNIPPET_SETTING_DEFAULT } from "@swift/constants/constantsSeoAdvanced";
import { queryKeys } from "@swift/queryKeys";
import { useSSnippetSEOService } from "@swift/services/snippetSEOApi";
import {
    EFieldSnippetSetting,
    IDataSnippetSetting,
} from "@swift/types/snippetSEO";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import PreviewSettingSnippetSEO from "./components/PreviewSettingSnippetSEO";
import SettingCollectionSnippetSEO from "./components/SettingCollectionSnippetSEO";
import SettingFAQSSnippetSEO from "./components/SettingFAQSSnippetSEO";
import SettingRichSnippetSEO from "./components/SettingRichSnippetSEO";
import SettingStoreProfileSnippetSEO from "./components/SettingStoreProfileSnippetSEO";
import { TABS_SETTING_SNIPPET } from "./constants";
import "./styles.scss";
import { IDataToastMessage } from "./type";
import StatusActiveExtensionApp from "@swift/components/StatusActiveExtensionApp";

const URL_REDIRECT = `/seo-advanced?tabs=snippets&sub_tabs=`;

function TabsSnippetsSEO() {
    const { t } = useTranslation();

    const { getSnippetSetting } = useSSnippetSEOService();

    const refPreview = useRef<HTMLDivElement>(null);

    const [toastMessage, setToastMessage] = useState<IDataToastMessage>({
        isToast: false,
        message: "",
        isError: false,
    });

    const [isDataChange, setIsDataChange] = useState(false);

    const { isInitialLoading: isLoadingDataSnippet } = useQuery({
        ...queryKeys.advancedSeo.getSnippetSetting(),
        queryFn: async () => {
            const { status, data } = await getSnippetSetting();
            if (status && data) {
                return {
                    brand_name: data[EFieldSnippetSetting.brand_name],
                    faqs: data[EFieldSnippetSetting.faqs],
                    // industry: data[EFieldSnippetSetting.industry],
                    is_faq_active: data[EFieldSnippetSetting.is_faq_active],
                    is_collection_active:
                        data[EFieldSnippetSetting.is_collection_active],
                    is_organization_active:
                        data[EFieldSnippetSetting.is_organization_active],
                    is_product_active:
                        data[EFieldSnippetSetting.is_product_active],
                    logo_link: data[EFieldSnippetSetting.logo_link],
                    product_review_app:
                        data[EFieldSnippetSetting.product_review_app],
                    reference_page: data[EFieldSnippetSetting.reference_page],
                    social_links: data[EFieldSnippetSetting.social_links],
                    is_blog_active: data[EFieldSnippetSetting.is_blog_active],
                } as IDataSnippetSetting;
            }
            return SNIPPET_SETTING_DEFAULT;
        },
    });

    const LIST_TABS = [
        {
            id: TABS_SETTING_SNIPPET.store_profile.key,
            content: t(TABS_SETTING_SNIPPET.store_profile.title),
            component: (
                <SettingStoreProfileSnippetSEO
                    isDataChange={isDataChange}
                    setIsDataChange={setIsDataChange}
                    setToastMessage={setToastMessage}
                    refPreview={refPreview}
                />
            ),
            tabs: TABS_SETTING_SNIPPET.store_profile.key,
        },
        {
            id: TABS_SETTING_SNIPPET.rich_snippets.key,
            content: t(TABS_SETTING_SNIPPET.rich_snippets.title),
            component: (
                <SettingRichSnippetSEO
                    isDataChange={isDataChange}
                    setIsDataChange={setIsDataChange}
                    setToastMessage={setToastMessage}
                    refPreview={refPreview}
                />
            ),
            accessibilityLabel: TABS_SETTING_SNIPPET.rich_snippets.title,
            panelID: TABS_SETTING_SNIPPET.rich_snippets.key,
            tabs: TABS_SETTING_SNIPPET.rich_snippets.key,
        },
        {
            id: TABS_SETTING_SNIPPET.collection.key,
            content: t(TABS_SETTING_SNIPPET.collection.title),
            component: (
                <SettingCollectionSnippetSEO
                    isDataChange={isDataChange}
                    setIsDataChange={setIsDataChange}
                    setToastMessage={setToastMessage}
                    refPreview={refPreview}
                />
            ),
            accessibilityLabel: TABS_SETTING_SNIPPET.collection.title,
            panelID: TABS_SETTING_SNIPPET.collection.key,
            tabs: TABS_SETTING_SNIPPET.collection.key,
        },
        {
            id: TABS_SETTING_SNIPPET.faq.key,
            content: t(TABS_SETTING_SNIPPET.faq.title),
            component: (
                <SettingFAQSSnippetSEO
                    isDataChange={isDataChange}
                    setIsDataChange={setIsDataChange}
                    setToastMessage={setToastMessage}
                    refPreview={refPreview}
                />
            ),
            accessibilityLabel: TABS_SETTING_SNIPPET.faq.title,
            panelID: TABS_SETTING_SNIPPET.faq.key,
            tabs: TABS_SETTING_SNIPPET.faq.key,
        },
    ];

    const eleToastMessage = useMemo(
        () =>
            toastMessage.isToast ? (
                <Toast
                    error={toastMessage.isError}
                    content={t(toastMessage.message)}
                    onDismiss={() => {
                        setToastMessage({
                            isToast: false,
                            message: "",
                        });
                    }}
                    duration={5000}
                />
            ) : null,
        [toastMessage]
    );

    if (isLoadingDataSnippet)
        return (
            <div className="p-5 flex flex-col gap-5">
                <div className="TabsSnippetsSEO__section">
                    <div className="PreviewSettingSnippetSEO__header-top p-5 flex gap-5">
                        <div style={{ width: "100px" }}>
                            <SkeletonDisplayText size="medium" />
                        </div>
                        <div className="PreviewSettingSnippetSEO__wp-form flex flex-col gap-4 flex-1 over-hidden">
                            <SkeletonDisplayText size="medium" />
                            <div className="flex gap-3">
                                <SkeletonBodyText />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="TabsSnippetsSEO__section">
                    <SkeletonTabs count={4} />
                    <div className="SettingStoreProfileSnippetSEO p-5 flex flex-col gap-5">
                        <div className="flex gap-5">
                            <SkeletonBodyText lines={2} />
                            <div
                                style={{
                                    width: "154px",
                                }}
                            >
                                <SkeletonDisplayText size="medium" />
                            </div>
                        </div>
                        <div className="SettingStoreProfileSnippetSEO__body p-5 flex flex-col gap-5">
                            <SkeletonBodyText lines={5} />
                            <SkeletonBodyText lines={5} />
                            <SkeletonBodyText lines={5} />
                            <SkeletonBodyText lines={5} />
                        </div>
                    </div>
                </div>
            </div>
        );

    return (
        <div
            className="TabsSnippetsSEO p-5 flex flex-col gap-5"
            ref={refPreview}
        >
            <PreviewSettingSnippetSEO />
            <StatusActiveExtensionApp extension="seo" />
            <div className="TabsSnippetsSEO__section">
                <TabsPolaris
                    paramsQuery="sub_tabs"
                    urlRedirect={URL_REDIRECT}
                    listTabs={LIST_TABS}
                    isNotChangeTabs={isDataChange}
                    isUseSearchParams={true}
                />
                {/* toast message */}
                {eleToastMessage}
                {/*end toast message */}
            </div>
        </div>
    );
}

export default TabsSnippetsSEO;
