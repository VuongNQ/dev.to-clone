import { Spinner } from "@shopify/polaris";
import BannerSpinner from "@swift/components/UIs/BannerSpinner";
import SkeletonBasic from "@swift/components/UIs/Skeletons/SkeletonBasic";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";

const LoadingCheckListSEO = memo(function _({
	domain,
	numberList,
	isShowBanner = false,
}: {
	domain?: string;
	numberList: number;
	isShowBanner?: boolean;
}) {
	const { t } = useTranslation();

	const displayList = useMemo(
		() =>
			Array.from(Array(numberList).keys()).map((item) => (
				<div className="LoadingCheckListSEO__box p-5" key={item}>
					<div className="LoadingCheckListSEO__row">
						<SkeletonBasic shape="circle" width="20px" />
						<SkeletonBasic />
					</div>
					<div className="LoadingCheckListSEO__row">
						<div
							style={{
								height: "20px",
								width: "20px",
								opacity: "0",
							}}
						></div>
						<SkeletonBasic />
					</div>
					<div className="LoadingCheckListSEO__row">
						<div
							style={{
								height: "20px",
								width: "20px",
								opacity: "0",
							}}
						></div>
						<SkeletonBasic />
					</div>
				</div>
			)),
		[numberList]
	);

	return (
		<div className="LoadingCheckListSEO">
			{displayList}

			{isShowBanner && (
				<div className="LoadingCheckListSEO__banner">
					<BannerSpinner
						hideIcon={true}
						spinner={<Spinner accessibilityLabel="" size="small" />}
						des={
							<span className="LoadingCheckListSEO__des-banner">
								{t("smartSEO.web_scan.loading_scan_seo.des")}
							</span>
						}
						title={t("smartSEO.web_scan.loading_scan_seo.title", {
							storeName: domain,
						})}
					/>
				</div>
			)}
		</div>
	);
});

export default LoadingCheckListSEO;
