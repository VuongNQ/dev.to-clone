import {
	Badge,
	Button,
	HorizontalGrid,
	Text
} from "@shopify/polaris";
import chatGPT from "@swift/assets/svg/home/chatGPT.svg";
import SkeletonBasic from "@swift/components/UIs/Skeletons/SkeletonBasic";
import ToggleSwitch from "@swift/components/UIs/ToggleSwitch";
import {
	DEFAULT_ALT_IMAGE,
	DEFAULT_META_DESCRIPTION,
	DEFAULT_META_TITLE,
} from "@swift/constants/constantsSeoBasic";
import {
	EKeyPayloadSaveSettingProductSEO,
	IPostSEOImageType,
	useBoostSEOService,
	useGetSettingProductSEO,
} from "@swift/services/boostSEOApi";
import { useMutation } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SectionSeoBasic = () => {
	const { t } = useTranslation();

	const navigate = useNavigate();

	const { postSaveSettingProductBoostSEO } = useBoostSEOService();

	const { isLoading, data, isSuccess, refetch } = useGetSettingProductSEO();

	const settingProductSEO = useMutation({
		mutationFn: ({
			setting,
			value,
		}: {
			setting: EKeyPayloadSaveSettingProductSEO;
			value: boolean;
		}) => {
			const payload: Partial<IPostSEOImageType> = {
				[setting as keyof IPostSEOImageType]: value,
			};

			const hadSetting = !!data && data.status && !!data.data;

			if (setting === EKeyPayloadSaveSettingProductSEO.auto_add_alt_image) {
				payload.product_alt_image_format = hadSetting
					? (data.data?.product_alt_image_format as string)
					: DEFAULT_ALT_IMAGE;
			}
			if (setting === EKeyPayloadSaveSettingProductSEO.auto_add_meta_tags) {
				payload.product_meta_description_format = hadSetting
					? (data.data?.product_meta_description_format as string)
					: DEFAULT_META_DESCRIPTION;
				payload.product_meta_title_format = hadSetting
					? (data.data?.product_meta_title_format as string)
					: DEFAULT_META_TITLE;
			}

			return postSaveSettingProductBoostSEO(payload);
		},
		onSuccess() {
			refetch();
		},
	});

	if (isLoading || !data || !isSuccess) return <SkeletonBasicSEO />;

	return (
		<HorizontalGrid gap="5" columns={{sm: 1,md: 4}}>
			<BlockDetail
				title={t("home.seo_basic.alt_image_title")}
				description={t("home.seo_basic.alt_image_description")}
			>
				<Button
					outline
					size="slim"
					onClick={() => navigate("/seo-basic?tabs=alt_images")}
				>
					{t("boostSEO.common.btn_setting")}
				</Button>
				<ToggleSwitch
					isActive={
						!isLoading &&
						isSuccess &&
						!!data.data &&
						!!data.data.auto_add_alt_image
					}
					loading={settingProductSEO.isLoading}
					onChangeActive={(event) => {
						event.preventDefault();
						settingProductSEO.mutate({
							setting: EKeyPayloadSaveSettingProductSEO.auto_add_alt_image,
							value: event.currentTarget.checked,
						});
					}}
				/>
			</BlockDetail>

			<BlockDetail
				title={t("home.seo_basic.meta_tag_title")}
				description={t("home.seo_basic.meta_tag_description")}
			>
				<Button
					outline
					size="slim"
					onClick={() => navigate("/seo-basic?tabs=meta_title")}
				>
					{t("boostSEO.common.btn_setting")}
				</Button>
				<ToggleSwitch
					isActive={
						!isLoading &&
						isSuccess &&
						!!data.data &&
						!!data.data.auto_add_meta_tags
					}
					loading={settingProductSEO.isLoading}
					onChangeActive={(event) => {
						event.preventDefault();
						settingProductSEO.mutate({
							setting: EKeyPayloadSaveSettingProductSEO.auto_add_meta_tags,
							value: event.currentTarget.checked,
						});
					}}
				/>
			</BlockDetail>

			<BlockDetail
				title={t("home.seo_basic.product_audit_title")}
				description={t("home.seo_basic.product_audit_description")}
				background="bg-primary-subdued"
				// badgeName="Beta"
			>
				<Button
					outline
					size="slim"
					onClick={() => navigate("/seo-basic?tabs=audit_product")}
				>
					{t("boostSEO.common.btn_setting")}
				</Button>
				<img src={chatGPT} />
			</BlockDetail>

			<BlockDetail
				title={t("home.seo_basic.sitemap_title")}
				description={t("home.seo_basic.sitemap_description")}
			>
				<Button outline size="slim" onClick={() => navigate("/seo-advanced")}>
					{t("boostSEO.common.btn_setting")}
				</Button>
			</BlockDetail>
		</HorizontalGrid>
	);
};

const BlockDetail = ({
	background = "",
	title,
	description,
	badgeName,
	children,
}: PropsWithChildren<{
	title: string;
	description: string;
	badgeName?: string;
	background?: string;
}>) => (
	<div className={`Home__section p-5 ${background}`}>
		<div className="Home-seo-basic_block">
			<div className="flex product">
				<Text as="h5" variant="headingMd">
					{title}
				</Text>
				{badgeName ? (
					<Badge size="small" status="success">
						{badgeName}
					</Badge>
				) : null}
			</div>

			<Text as="p" variant="bodyMd" color="subdued">
				{description}
			</Text>
			<div className="flex items-center justify-between action">{children}</div>
		</div>
	</div>
);

const SkeletonBasicSEO = () => (
	<HorizontalGrid gap="5" columns={4}>
		{[...Array(4)].map(() => (
			<SkeletonBasic width="222.5px" height="180px" key={Math.random() * 40} />
		))}
	</HorizontalGrid>
);

export default SectionSeoBasic;
