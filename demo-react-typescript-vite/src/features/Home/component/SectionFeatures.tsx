import { Button, HorizontalGrid, Text } from "@shopify/polaris";
import { ITabsOptimizer } from "@swift/types/speedOptimizer";
import { PropsWithChildren, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import IconFeatureChatGPTBasic from "../assets/icon-feature-chatGPT-basic.svg";

const LIST_FEATURE = [
    {
        title: "home.feature.optimize_theme.title",
        content: "home.feature.optimize_theme.content",
        link: `/speed-optimizer?tabs=${ITabsOptimizer.optimize_theme}`,
    },
    {
        title: "home.feature.optimize_image.title",
        content: "home.feature.optimize_image.content",
        link: `/speed-optimizer?tabs=${ITabsOptimizer.optimize_images}`,
    },
    {
        title: "home.feature.audit_product.title",
        content: "home.feature.audit_product.content",
        link: `/seo-basic?tabs=audit_product`,
        icon: IconFeatureChatGPTBasic,
    },
    {
        title: "home.feature.ga.title",
        content: "home.feature.ga.content",
        link: `/speed-optimizer?tabs=smart_booster`,
    },
    {
        title: "home.feature.custom_loading.title",
        content: "home.feature.custom_loading.content",
        link: `/speed-optimizer?tabs=customize_loading`,
    },
    {
        title: "home.feature.scan_competitor.title",
        content: "home.feature.scan_competitor.content",
        link: `/seo-basic?tabs=scan_website`,
    },
    {
        title: "home.feature.broken_link.title",
        content: "home.feature.broken_link.content",
        link: `/seo-advanced?tabs=monitor`,
    },
    {
        title: "home.feature.snippet.title",
        content: "home.feature.snippet.content",
        link: `/seo-advanced?tabs=snippets`,
    },
    {
        title: "home.feature.site_map.title",
        content: "home.feature.site_map.content",
        link: `/seo-advanced?tabs=site_map`,
    },
];
const SectionFeatures = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const [isShowMore, setIsShowMore] = useState(false);

    return (
        <div className="Home-features">
            <HorizontalGrid gap="5" columns={{ sm: 1, md: 3 }}>
                {LIST_FEATURE.slice(0, !isShowMore ? 3 : LIST_FEATURE.length).map((i, index) =>
                    !isShowMore ? (
                        <BlockDetail key={index} title={t(i.title)} description={t(i.content)} icon={i.icon}>
                            <Button outline size="slim" onClick={() => navigate(i.link)}>
                                {t("boostSEO.common.btn_setting")}
                            </Button>
                        </BlockDetail>
                    ) : (
                        <BlockDetail key={index} title={t(i.title)} description={t(i.content)} icon={i.icon}>
                            <Button outline size="slim" onClick={() => navigate(i.link)}>
                                {t("boostSEO.common.btn_setting")}
                            </Button>
                        </BlockDetail>
                    )
                )}
            </HorizontalGrid>
            <div className="flex justify-center mt-5">
                <Button
                    onClick={() => {
                        setIsShowMore((preValue) => !preValue);
                    }}
                    plain
                >
                    {isShowMore ? t("home.feature.btn_show_less") : t("home.feature.btn_show_more")}
                </Button>
            </div>
        </div>
    );
};

const BlockDetail = ({
    title,
    description,
    icon,
    children,
}: PropsWithChildren<{
    title: string;
    description: string;
    icon?: string;
    background?: string;
    hasHighlight?: boolean;
}>) => (
    <div className={`Home__section shadow-xs`}>
        <div className="Home-features__block ">
            <div className="flex pt-4 pb-1 pr-5 justify-between">
                <div className="flex gap-2">
                    <div className="highlight"></div>
                    <Text as="h5" variant="headingMd">
                        {title}
                    </Text>
                </div>
                {icon && <img src={icon} />}
            </div>

            <div className="pt-1 px-4 pb-2">
                <Text as="p" variant="bodyMd" color="subdued">
                    {description}
                </Text>
            </div>
            <div className="px-4 pb-5 action">{children}</div>
        </div>
    </div>
);

export default SectionFeatures;
