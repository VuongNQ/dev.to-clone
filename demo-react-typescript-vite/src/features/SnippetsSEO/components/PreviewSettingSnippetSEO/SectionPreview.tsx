import { Divider, Icon, Text } from "@shopify/polaris";
import {
    ChevronUpMinor,
    DropdownMinor,
    StarFilledMinor,
} from "@shopify/polaris-icons";
import { queryKeys } from "@swift/queryKeys";
import {
    EFieldSnippetSetting,
    IDataSnippetSetting,
} from "@swift/types/snippetSEO";
import { useQuery } from "@tanstack/react-query";

import iconImgEmpty from "@swift/assets/images/advancedSeo/icon-img-empty.png";
import iconShare from "@swift/assets/images/advancedSeo/icon-share.png";
import imgResultOrgBlur from "@swift/assets/images/advancedSeo/img-snippet-result-blur-2.png";
import iconBrowser from "@swift/assets/images/basicSeo/icon-browser.png";
import { EQueryClassPreview } from "../../type";

/**  element preview snippet Store profile */

export const ElmOrganization = () => {
    return (
        <>
            <img
                className={EQueryClassPreview.PreviewOrganizeImageBlur}
                src={imgResultOrgBlur}
                alt=""
            />
            <div className="PreviewSettingSnippetSEO__wp-org py-3 ">
                <div className="flex justify-between items-center p-3">
                    <Text as="h4" variant="headingXs">
                        <span
                            className={`txt-one-line ${EQueryClassPreview.PreviewOrganizeBrandName}`}
                        ></span>
                    </Text>
                    <img src={iconShare} alt="" />
                    <img
                        className={
                            EQueryClassPreview.PreviewOrganizeImageLogoLink
                        }
                        src=""
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = iconImgEmpty;
                        }}
                        width="32px"
                        height="32px"
                        alt=""
                    />
                </div>
                <Divider></Divider>
                <div className="flex gap-2 py-2 px-3">
                    <img src={iconBrowser} alt="" />
                    <Text as="p" variant="bodyMd">
                        <span
                            className={`txt-one-line ${EQueryClassPreview.PreviewOrganizeReference}`}
                        ></span>
                    </Text>
                </div>
                <Divider></Divider>
                <div className="flex flex-col gap-5 p-3">
                    <Text alignment="start" as="span" variant="bodyMd">
                        Kiwi description your store
                    </Text>
                    <Text alignment="start" as="span" variant="bodyMd">
                        Profile
                    </Text>

                    <div
                        className={`flex gap-5 ${EQueryClassPreview.PreviewOrganizeSocialLink}`}
                    ></div>
                </div>
            </div>
        </>
    );
};
/** end element preview snippet Store profile */

export const ElmPrevRichSnippet = () => {
    const { data } = useQuery<IDataSnippetSetting>(
        queryKeys.advancedSeo.getSnippetSetting().queryKey
    );

    return (
        <div
            className={`flex flex-col gap-1 py-2 px-3 ${EQueryClassPreview.PreviewRichSnippet} hidden`}
        >
            <div className="flex items-center gap-2">
                <img src={iconBrowser} alt="" />
                <div className="">
                    <Text
                        as="p"
                        variant="bodySm"
                        alignment="start"
                        fontWeight="medium"
                    >
                        <span className="txt-one-line">
                            {data && data[EFieldSnippetSetting.brand_name]}
                        </span>
                    </Text>
                    <Text as="p" variant="bodySm" alignment="start">
                        <span className="txt-one-line">{`${
                            data && data[EFieldSnippetSetting.brand_name]
                        }.myshopify.com > product 1 > 1`}</span>
                    </Text>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="PreviewSettingSnippetSEO__title-result">
                    <Text as="p" alignment="start" variant="headingSm">
                        Product 1
                    </Text>
                </div>
                <Text as="p" alignment="start" variant="bodySm">
                    This is description
                </Text>
            </div>
            <div className="flex gap-2">
                <div className="PreviewSettingSnippetSEO__ratings flex gap-1">
                    <Icon source={StarFilledMinor} color="warning" />
                    <Icon source={StarFilledMinor} color="warning" />
                    <Icon source={StarFilledMinor} color="warning" />
                    <Icon source={StarFilledMinor} color="warning" />
                    <Icon source={StarFilledMinor} color="warning" />
                </div>
                <Text
                    as="span"
                    variant="bodyMd"
                    color="subdued"
                    alignment="start"
                >
                    Rating: 4.9 · 50 votes
                </Text>
            </div>
        </div>
    );
};

export const ElmPrevCollectionSnippet = () => {
    const { data } = useQuery<IDataSnippetSetting>(
        queryKeys.advancedSeo.getSnippetSetting().queryKey
    );

    return (
        <div
            className={`flex flex-col gap-1 py-2 px-3 ${EQueryClassPreview.PreviewCollection} hidden`}
        >
            <div className="flex items-center gap-2">
                <img src={iconBrowser} alt="" />
                <div className="">
                    <Text
                        as="p"
                        variant="bodySm"
                        alignment="start"
                        fontWeight="medium"
                    >
                        <span className="txt-one-line">
                            {data && data[EFieldSnippetSetting.brand_name]}
                        </span>
                    </Text>
                    <Text as="p" variant="bodySm" alignment="start">
                        <span className="txt-one-line">{`${
                            data && data[EFieldSnippetSetting.brand_name]
                        }.myshopify.com`}</span>
                    </Text>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="PreviewSettingSnippetSEO__title-result">
                    <Text as="p" alignment="start" variant="headingSm">
                        Home page
                    </Text>
                </div>
                <Text as="p" alignment="start" variant="bodySm">
                    This is description
                </Text>
            </div>
            <Text as="span" variant="bodyMd" color="subdued" alignment="start">
                Collection 1 · Collection 2 · ...
            </Text>
        </div>
    );
};

export const ElmPrevFAQSnippet = () => {
    const { data } = useQuery<IDataSnippetSetting>(
        queryKeys.advancedSeo.getSnippetSetting().queryKey
    );

    return (
        <div
            className={`flex flex-col gap-1 py-2 px-3 ${EQueryClassPreview.PreviewFAQ} hidden`}
        >
            <div className="flex items-center gap-2">
                <img src={iconBrowser} alt="" />
                <div className="">
                    <Text
                        as="p"
                        variant="bodySm"
                        alignment="start"
                        fontWeight="medium"
                    >
                        <span className="txt-one-line">
                            {data && data[EFieldSnippetSetting.brand_name]}
                        </span>
                    </Text>
                    <Text as="p" variant="bodySm" alignment="start">
                        <span className="txt-one-line">{`${
                            data && data[EFieldSnippetSetting.brand_name]
                        }.myshopify.com > Blogs > news`}</span>
                    </Text>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="PreviewSettingSnippetSEO__title-result">
                    <Text as="p" alignment="start" variant="headingSm">
                        Blogs
                    </Text>
                </div>
                <div className="txt-two-line">
                    <Text as="p" alignment="start" variant="bodySm">
                        It is comfy and trendy, fashionable, made of
                        environmentally friendly materials, sustainable, all
                        sizes available
                    </Text>
                </div>
            </div>
            <div>
                <div className="flex flex-col gap-2 py-2">
                    <div className="flex gap-2 items-center">
                        <div className="flex-1 txt-one-line">
                            <Text as="h4" variant="bodySm" alignment="start">
                                Consider the Type of Material and Fabric
                            </Text>
                        </div>
                        <Icon source={DropdownMinor} color="base" />
                    </div>
                </div>
                <div className="flex flex-col gap-2 py-2">
                    <div className="flex gap-2 items-center">
                        <div className="flex-1 txt-one-line">
                            <Text as="h4" variant="headingXs" alignment="start">
                                What is a blog post?
                            </Text>
                        </div>
                        <Icon source={ChevronUpMinor} color="base" />
                    </div>
                    <div className="flex-1 txt-two-line">
                        <Text
                            as="p"
                            variant="bodySm"
                            color="subdued"
                            alignment="start"
                        >
                            A blog post is an individual web page on your
                            website that dives into a particular sub-topic of
                            your blog.
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
};
