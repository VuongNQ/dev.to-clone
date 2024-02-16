import { Button, HorizontalGrid, Text } from "@shopify/polaris";
import ImproveQM from "@swift/assets/svg/home/improve-question-mark.svg";
import IssuesQM from "@swift/assets/svg/home/issues-question-mark.svg";
import PassedQM from "@swift/assets/svg/home/passed-question-mark.svg";
import Performant from "@swift/assets/svg/home/performant-question-mark.svg";
import ChartScore from "@swift/components/UIs/ChartScore";
import SkeletonBasic from "@swift/components/UIs/Skeletons/SkeletonBasic";
import { useAppDispatch, useAppSelector } from "@swift/hooks";
import { useCountNumber } from "@swift/hooks/useCountNumber";
import { useScanBoostSEO } from "@swift/hooks/useScanBoostSEO";
import { queryKeys } from "@swift/queryKeys";
import { useBoostSEOService } from "@swift/services/boostSEOApi";
import { useCrispChatApiService } from "@swift/services/crispChatApi";
import { useScanWebsiteService } from "@swift/services/scanWebsiteApi";
import { customerData, globalActions } from "@swift/store/global";
import { StatusScanSEOType } from "@swift/types/boostSEO";
import { formatMDYAMPMAtString } from "@swift/utils/formatDate";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

let timeOutSession: NodeJS.Timeout | undefined = undefined;

const SectionScore = () => {
	const { t } = useTranslation();

	const customer = useAppSelector(customerData);

	const dispatch = useAppDispatch()

	const { postScanSEO } = useScanWebsiteService();

	const {postMessageChatLowScore} = useCrispChatApiService()

	const { getScanLogsSEO } = useBoostSEOService();

	const navigate = useNavigate();

	const { data: scanLogSEO, isLoading } = useQuery({
		...queryKeys.basicSeo.getScanLogsStoreSEO(),
		refetchOnWindowFocus: false,
		queryFn: async () => {
			const res = await getScanLogsSEO({
				limit: 1,
				page: 1,
				is_competitor: false,
			});
			return res.data;
		},
	});

	const {
		dataScanSEO: { scoresSEO, statusScan, dataScanLog },
		setDataScanSEO
	} = useScanBoostSEO(scanLogSEO);

	const scanSEO = useMutation({
		mutationFn: () => postScanSEO(),
		onSuccess() {
			setDataScanSEO((old) => {
				return {
					...old,
					statusScan: StatusScanSEOType.scanning,
				};
			})
		},
	});

	/** fun to post score speed website user and send message the first time */
	const handlePostMessageScoreLow = useCallback(( score: number,sessionId:string) =>{
	timeOutSession = setTimeout(async() =>{
		const {status} = await postMessageChatLowScore(score,sessionId)

		if(status){
			dispatch(
			globalActions.updateCustomer({
				is_send_crispchat:true
			})
			);
		}
		
		clearTimeout(timeOutSession);
		},5000)
	},[dispatch, postMessageChatLowScore])
	/**end fun to post score speed website user and send message the first time */

	const updated_at = useMemo(
		() => dataScanLog?.updated_at || "",
		[dataScanLog]
	);

	const { countPoint, setMaxNumber } = useCountNumber({
		numberMin: 0,
		numberMax: 0,
	});

	const isLoadingScan =
		isLoading || scanSEO.isLoading || statusScan === StatusScanSEOType.scanning;

	const hadScanned = !!scanLogSEO && statusScan === StatusScanSEOType.scanned;

	useEffect(() => {
		setMaxNumber(scoresSEO.scoreTotal);
	}, [scoresSEO.scoreTotal]);

	/** send message low score speed web user */
	useEffect(() => {
		if(!customer || customer.is_send_crispchat) return
		
		if(!scoresSEO.scorePerformance) return

		if (!window.$crisp) return 
			
		if (Array.isArray(window.$crisp)) return 
			
		const sessionId = window.$crisp.get("session:identifier");
		if (!sessionId) return

		handlePostMessageScoreLow(scoresSEO.scorePerformance,sessionId)
	},[customer?.is_send_crispchat,window.$crisp,scoresSEO.scorePerformance])
	/**end send message low score speed web user */

	return (
		<section className="Home-detail">
			<HorizontalGrid gap="2" columns={{ sm: 1, md: 2 }}>
				<div className="flex flex-col items-center">
					{isLoadingScan ? (
						<SkeletonBasic shape="circle" width="202px" height="202px" />
					) : (
						<ChartScore
							width="202px"
							height="202px"
							variant="heading4xl"
							showBackgroundScore
							point={countPoint}
						/>
					)}

					<div className="mt-2 mb-4">
						<Text as="h1" variant="headingXl">
							{t("home.txt_score")}
						</Text>
					</div>
					<div className="flex justify-around mb-3">
						<RangeScore classRange="critical" range="0-49" />
						<RangeScore classRange="warning" range="50-89" />
						<RangeScore classRange="passed" range="90-100" />
					</div>

					{isLoadingScan ? (
						<SkeletonBasic width="160px" height="20px" />
					) : (
						<Text variant="bodySm" as="p" color="subdued">
							{hadScanned
								? t("common.txt_last_scan",{
									score_number:formatMDYAMPMAtString(updated_at)
								}) 
								: ""}
						</Text>
					)}
				</div>
				<div className="Home-detail__score">
					<HorizontalGrid gap="4" columns={2}>
						<BlockScoreDetail
							classType="issues"
							title={t("smartSEO.web_scan.tabs_scan.0")}
							iconQM={IssuesQM}
							score={scoresSEO.scorePoor}
							isLoading={isLoadingScan}
						/>
						<BlockScoreDetail
							classType="improve"
							title={t("smartSEO.web_scan.tabs_scan.1")}
							iconQM={ImproveQM}
							score={scoresSEO.scoreFair}
							isLoading={isLoadingScan}
						/>
						<BlockScoreDetail
							classType="passed"
							title={t("smartSEO.web_scan.tabs_scan.2")}
							iconQM={PassedQM}
							score={scoresSEO.scoreGood}
							isLoading={isLoadingScan}
						/>
						<BlockScoreDetail
							classType="performant"
							title={t("home.score_block.title_performance")}
							iconQM={Performant}
							score={scoresSEO.scorePerformance || 0}
							isLoading={isLoadingScan}
						/>
					</HorizontalGrid>
					{scoresSEO.scoreTotal < 90 && (
						<Text as="p" variant="bodyMd" alignment="center">
							{t("home.score_warning")}
						</Text>
					)}
				</div>
			</HorizontalGrid>
			<div className="flex justify-center Home-detail__action">
				<Button
					primary
					size="large"
					loading={isLoadingScan}
					onClick={() => scanSEO.mutate()}
				>
					{t('home.score_block.btn_scan')}
				</Button>
				{hadScanned && (
					<Button outline size="large" onClick={() => navigate("/seo-basic")}>
						{t('home.score_block.btn_view_detail')}
					</Button>
				)}
			</div>
		</section>
	);
};

const BlockScoreDetail = ({
	classType,
	title,
	iconQM,
	score,
	isLoading = false,
}: {
	classType: string;
	title: string;
	iconQM: string;
	score: number;
	isLoading: boolean;
}) =>
	isLoading ? (
		<SkeletonBasic width="180px" height="101px" />
	) : (
		<div className={`Home-detail__score-detail ${classType}`}>
			<div className="flex justify-center items-center mb-3">
				<Text as="p" alignment="center" fontWeight="semibold" variant="bodySm">
					{title}
				</Text>
				<img src={iconQM} hidden />
			</div>
			<Text as="h1" variant="heading3xl">
				{score}
			</Text>
		</div>
	);

const RangeScore = ({
	classRange,
	range,
}: {
	classRange: string;
	range: string;
}) => (
	<div
		className={`Home-detail__range-score inline-flex items-center ${classRange}`}
	>
		<span className={`${classRange} mr-3`}></span>
		<Text as="p" variant="bodyMd">
			{range}
		</Text>
	</div>
);

export default SectionScore;
