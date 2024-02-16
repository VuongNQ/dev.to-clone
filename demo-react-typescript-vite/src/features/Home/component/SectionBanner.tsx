import { HorizontalGrid, Text } from "@shopify/polaris";
import BannerRankingSEO from "@swift/assets/images/home/banner-seo-rank.webp";
import Expert from "@swift/assets/svg/home/expert.svg";
import SmartSEO from "@swift/assets/svg/home/smart-seo.svg";
import UpSpeed from "@swift/assets/svg/home/up-speed.svg";
import { useTranslation } from "react-i18next";

const SectionBanner = () => {
	const { t } = useTranslation();

	const listBanner = [
		{
			icon: UpSpeed,
			title: t("home.banner.first.title"),
			description: t("home.banner.first.description"),
		},
		{
			icon: SmartSEO,
			title: t("home.banner.second.title"),
			description: t("home.banner.second.description"),
		},
		{
			icon: Expert,
			title: t("home.banner.third.title"),
			description: t("home.banner.third.description"),
		},
	];

	return (
		<div className="p-8 Home__section shadow-xs">
			<div className="Home-banner">
				<Text as="h1" variant="heading3xl" alignment="center">
					{t("home.banner.title")}
				</Text>
				<Text as="p" alignment="center" color="subdued">
					{t("home.banner.description")}
				</Text>
				<HorizontalGrid gap="8" columns={{ sm: 1, md: 2 }}>
					<img src={BannerRankingSEO} className="banner-ranking" loading="lazy" />
					<div className="flex flex-col h-100 justify-between gap-4">
						{listBanner.map((i) => (
							<div
								className="Home-banner__detail flex items-start"
								key={i.title}
							>
								<img src={i.icon} className="mr-4" />
								<div className="content">
									<Text as="h5" variant="headingMd">
										{i.title}
									</Text>
									<Text as="p" variant="bodyMd" color="subdued">
										{i.description}
									</Text>
								</div>
							</div>
						))}
					</div>
				</HorizontalGrid>
			</div>
		</div>
	);
};

export default SectionBanner;
