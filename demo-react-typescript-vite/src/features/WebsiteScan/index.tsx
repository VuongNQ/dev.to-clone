import { Button, Icon, Text } from "@shopify/polaris";
import { AlertMinor, CancelSmallMinor } from "@shopify/polaris-icons";
import imgCompetitor from "@swift/assets/images/basicSeo/img-competitor.png";
import SkeletonBasic from "@swift/components/UIs/Skeletons/SkeletonBasic";
import { REGEX_URL } from "@swift/constants/constantRegex";
import {
    IFieldValidateCompetitorSEO,
    StatusScanSEOType,
    boostSEOState,
} from "@swift/types/boostSEO";
import { validationSchemaCompetitorSEO } from "@swift/validation/validationSEO";
import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import { memo, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import CheckListProblemScanSEO from "./components/CheckListProblemScanSEO";
import ReScanStoreCheckListSEO from "./components/ReScanStoreCheckListSEO";
import { WebsiteScanContext } from "./contexts/websiteScan";
import { useWebScan } from "./hooks/useWebScan";
import "./styles.scss";
import { useAppSelector } from "@swift/hooks";
import { customerData } from "@swift/store/global";
import { PlanType } from "@swift/types/planPricing";

const WebsiteScanSEO = () => {
    const initContext = useWebScan();

    return (
        <div className="TabsCheckListSEO">
            <WebsiteScanContext.Provider value={initContext}>
                {initContext.isLoadingDataScanStoreSEO ? (
                    <EleLoadingBannerScore />
                ) : (
                    <EleBannerScore />
                )}

                {/* section input scan competitor */}
                <div className={`TabsCheckListSEO__wp-competitor`}>
                    <div className="FormScanCompetitor flex flex-col gap-3">
                        <Formik
                            initialValues={{
                                ...initContext.dataScanCompetitor,
                            }}
                            validationSchema={validationSchemaCompetitorSEO}
                            onSubmit={(value) => {
                                initContext.onScanCompetitor(value.currentUrl);
                            }}
                            enableReinitialize={true}
                            component={DetailFormScan}
                        />
                    </div>
                </div>
            </WebsiteScanContext.Provider>

            {/*end section input scan competitor */}
        </div>
    );
};

const DetailFormScan = memo(function _({
    errors,
    submitForm,
    isValid,
}: FormikProps<boostSEOState>) {
    const { t } = useTranslation();

    const {
        dataScanStore,
        dataScanCompetitor,
        isLoadingOnScanCompetitor,
        isLoadingDataScanCompetitorSEO,
        isLoadingOnScanStore,
        isShowCompetitor,
        isAllowPlan,
        isOutRemainScan,
        onToggleCompetitor,
    } = useContext(WebsiteScanContext);

    const isStatusDisable =
        !isAllowPlan ||
        dataScanStore?.statusScan === StatusScanSEOType.scanning ||
        isLoadingOnScanStore ||
        isOutRemainScan;

    const isDisableScan = isStatusDisable || !isValid;

    const isLoadingScan =
        isLoadingDataScanCompetitorSEO ||
        isLoadingOnScanCompetitor ||
        dataScanCompetitor?.statusScan === StatusScanSEOType.scanning;

    const renderToggleCompetitor = useMemo(
        () => (
            <div
                className="flex justify-end pb-3 gap-2 cursor-pointer"
                onClick={onToggleCompetitor}
            >
                <Text as="span" variant="bodyMd" color="subdued">
                    {t("smartSEO.web_scan.title_btn_hide_competitor")}
                </Text>
                <Button icon={CancelSmallMinor} plain></Button>
            </div>
        ),
        [onToggleCompetitor, t]
    );

    const renderShowError = useMemo(
        () =>
            errors.currentUrl
                ? !errors.currentUrl?.includes(`${REGEX_URL}`) && (
                      <p className="global__error-message gap-1 mt-2">
                          <Icon source={AlertMinor} color="critical" />
                          {t(errors.currentUrl || "")}
                      </p>
                  )
                : null,
        [errors.currentUrl, t]
    );

    const renderFieldInput = useMemo(
        () => (
            <Field name={IFieldValidateCompetitorSEO.currentUrl}>
                {({ field, meta }: FieldProps) => (
                    <div className="flex-1">
                        <input
                            type="search"
                            {...field}
                            // placeholder={t(
                            //   "boostSEO.com petitor.input_placeholder"
                            // )}
                            placeholder={"onecomecer.io/"}
                            className={`global__input py-2 px-3 ${
                                meta.error &&
                                !meta.error.includes(`${REGEX_URL}`) &&
                                "global__input--error"
                            }`}
                            disabled={isStatusDisable}
                        />
                    </div>
                )}
            </Field>
        ),
        [isStatusDisable]
    );

    const renderButtonScan = useMemo(
        () => (
            <Button
                disabled={isDisableScan}
                primary
                onClick={() => {
                    if (!errors.currentUrl) submitForm();
                }}
                loading={isLoadingScan}
            >
                {t("boostSEO.competitor.btn_scan")}
            </Button>
        ),
        [errors.currentUrl, isDisableScan, isLoadingScan, submitForm, t]
    );

    return (
        <Form
            onKeyDown={(e) => {
                if (e.key === "Enter") submitForm();
            }}
        >
            {isShowCompetitor && (
                <div className="px-5 pb-5 pt-3">
                    {renderToggleCompetitor}
                    <div className="flex gap-2">
                        {renderFieldInput}
                        {renderButtonScan}
                    </div>
                    {renderShowError}
                    <ShowRemainCompetitor />
                </div>
            )}
            <CheckListProblemScanSEO />
        </Form>
    );
});

const ShowRemainCompetitor = () => {
    const { t } = useTranslation();

    const customer = useAppSelector(customerData);

    const { isAllowPlan, remainScan } = useContext(WebsiteScanContext);

    const contentCount =
        customer?.app_plan === PlanType.expert_care
            ? t("smartSEO.web_scan.unlimited_remain_competitor")
            : isAllowPlan
            ? t("smartSEO.web_scan.count_remain_competitor", {
                  remain: remainScan?.count_competitor_scan.current || 0,
                  total: remainScan?.count_competitor_scan.max || 0,
              })
            : t("smartSEO.web_scan.des_competitor");

    return <p className="pt-3"><Text as="span" variant="bodyMd" color="subdued">{contentCount}</Text></p>;
};

/** show toast Connect to Google Search Console */

const EleBannerScore = () => {
    const { t } = useTranslation();

    const { isShowCompetitor, onToggleCompetitor } =
        useContext(WebsiteScanContext);


    return (
        <div className="TabsCheckListSEO__header flex w-100">
            <div className="TabsCheckListSEO__header-left">
                <ReScanStoreCheckListSEO />
            </div>
            <div className="TabsCheckListSEO__header-right flex flex-col items-center justify-center gap-2">
                <img src={imgCompetitor} alt="" />
                <Button
                    primary
                    size="slim"
                    disabled={isShowCompetitor}
                    onClick={onToggleCompetitor}
                >
                    {t("smartSEO.web_scan.btn_scan_competitor")}
                </Button>
            </div>
        </div>
    );
};

const EleLoadingBannerScore = () => (
    <div className="TabsCheckListSEO__header flex w-100 ">
        <div className="TabsCheckListSEO__header-left flex p-5 gap-5">
            <SkeletonBasic height="120px" width="120px" shape="circle" />
            <div className="flex flex-col gap-3">
                <SkeletonBasic height="16px" width="200px" shape="square" />
                <SkeletonBasic height="16px" width="200px" shape="square" />
                <SkeletonBasic height="16px" width="200px" shape="square" />
                <SkeletonBasic height="28px" width="91px" shape="square" />
            </div>
        </div>
        <div className="TabsCheckListSEO__header-right flex flex-col items-center justify-center gap-2">
            <SkeletonBasic height="80px" width="80px" shape="square" />
            <SkeletonBasic height="28px" width="134px" shape="square" />
        </div>
    </div>
);

export default WebsiteScanSEO;
