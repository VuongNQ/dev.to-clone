import { Text } from "@shopify/polaris";
import imgResultBlur from "@swift/assets/images/advancedSeo/img-snippet-result-blur-1.png";
import iconCamera from "@swift/assets/svg/advancedSEO/icon-camera.svg";
import iconMic from "@swift/assets/svg/advancedSEO/icon-mic.svg";
import { queryKeys } from "@swift/queryKeys";
import {
	EFieldSnippetSetting,
	IDataSnippetSetting,
} from "@swift/types/snippetSEO";
import { useQuery } from "@tanstack/react-query";
import {
	ElmOrganization,
	ElmPrevCollectionSnippet,
	ElmPrevFAQSnippet,
	ElmPrevRichSnippet,
} from "./SectionPreview";
import "./styles.scss";
import { EQueryClassPreview } from "../../type";

const PreviewSettingSnippetSEO = () => {
    const { data } = useQuery<IDataSnippetSetting>(
        queryKeys.advancedSeo.getSnippetSetting().queryKey
    );

    return (
        <div className="PreviewSettingSnippetSEO position-r">
            <div className="PreviewSettingSnippetSEO__header">
                <div className="PreviewSettingSnippetSEO__header-top p-5 flex gap-5">
                    <img
                        className="PreviewSettingSnippetSEO__logo-google"
                        src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                        alt=""
                    />
                    <div className="PreviewSettingSnippetSEO__wp-form flex flex-col gap-4 flex-1 px-1">
                        <div className="PreviewSettingSnippetSEO__form flex flex-1 items-center justify-between px-3 py-2">
                            <Text as="h4" variant="bodyLg">
                                <span className="txt-one-line">
                                    {data?.[EFieldSnippetSetting.brand_name] ||
                                        ""}
                                </span>
                            </Text>
                            <div className="PreviewSettingSnippetSEO__group-btn flex items-center gap-4">
                                <span className="PreviewSettingSnippetSEO__icon-close flex">
                                    {IconClose}
                                </span>

                                <div className="PreviewSettingSnippetSEO__line"></div>
                                <img
                                    width="24px"
                                    height="24px"
                                    src={iconMic}
                                    alt=""
                                />
                                <img
                                    width="24px"
                                    height="24px"
                                    src={iconCamera}
                                    alt=""
                                />
                                <span className="PreviewSettingSnippetSEO__icon-search flex">
                                    {" "}
                                    {IconSearch}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="PreviewSettingSnippetSEO__badge px-3">
                                News
                            </div>
                            <div className="PreviewSettingSnippetSEO__badge px-3">
                                Images
                            </div>
                            <div className="PreviewSettingSnippetSEO__badge px-3">
                                Reviews
                            </div>
                            <div className="PreviewSettingSnippetSEO__badge px-3">
                                Shopping
                            </div>
                            <div className="PreviewSettingSnippetSEO__badge px-3">
                                Salary
                            </div>
                        </div>
                    </div>
                </div>
                <div className="PreviewSettingSnippetSEO__body">
                    <div className="p-5">
                        <Text
                            alignment="start"
                            as="p"
                            variant="bodyMd"
                            color="subdued"
                        >
                            About 1,580,000 results (0.48 seconds){" "}
                        </Text>
                    </div>
                    <div className="PreviewSettingSnippetSEO__wp-preview flex">
                        <div className="PreviewSettingSnippetSEO__result-blur position-r">
                            <img
                                className="PreviewSettingSnippetSEO__img-blur"
                                src={imgResultBlur}
                                alt=""
                            />
                            <div className="PreviewSettingSnippetSEO__preview-result position-a flex flex-col">
                                <ElmPrevRichSnippet />
                                <ElmPrevCollectionSnippet />
                                <ElmPrevFAQSnippet />
                            </div>
                        </div>
                        <div className={EQueryClassPreview.PreviewOrganize}>
                            <ElmOrganization />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const IconSearch = (
    <svg
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
    >
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
    </svg>
);
const IconClose = (
    <svg
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
    >
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
    </svg>
);
export default PreviewSettingSnippetSEO;
