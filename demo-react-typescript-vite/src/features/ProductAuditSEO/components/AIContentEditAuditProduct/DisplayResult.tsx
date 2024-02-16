import { Button, Icon, List, SkeletonBodyText, Text, Toast } from "@shopify/polaris";
import {
    CircleCancelMinor,
    CircleDisableMinor,
    CircleTickMinor,
    StarOutlineMinor,
} from "@shopify/polaris-icons";
import emptyAnalysis from "@swift/assets/images/basicSeo/empty-analysis-audit.png";
import analysisError from "@swift/assets/images/basicSeo/no-data-table.png";
import iconGpt from "@swift/assets/svg/basicSEO/icon-gpt.svg";
import { ILastAssessmentJSON } from "@swift/types/boostSEO";
import { PropsWithChildren, useCallback, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { EditAuditProductContext } from "../../contexts/editAuditProduct";
import { ProfileTokenContext } from "../../contexts/profileToken";
import { useProductContentAnalysis } from "../../hooks/useProductContentAnalysis";
import BadgeStatusAuditProduct from "../BadgeStatusAuditProduct";
import CollapsibleAIContentEditAuditSEO from "../CollapsibleAIContentEditAuditSEO";
import { useToastGeneral } from "@swift/hooks/useToastGeneral";

const LIST_ISSUE_FIX = [
    {
        stringFind: "Meta",
        linkRedirect: "meta_Tag",
    },
    {
        stringFind: "Product",
        linkRedirect: "product_content",
    },
];

export const ResultAnalytic = ({
    detail,
    isDataChange,
    productID,
    isHaveAssessment = false,
}: IResultAnalytic) => {
    const { isError, onAnalyzeProduct, tokenUsed } =
        useProductContentAnalysis(productID);

    const { t } = useTranslation();

    const { inputConfigLoading,isLoadingAnalyzeAuditProduct, isLoadingPutAuditProduct } =
        useContext(EditAuditProductContext);

    const {
        isRefetchingProfile,
        isTokenExpired,
        isValidTokenChatGPT,
        onOpenModalWarningToken,
    } = useContext(ProfileTokenContext);

    const { toastInfo, toggleIsOpenToast } = useToastGeneral();

    const handleOnAnalyze = useCallback(async () => {
        if (!isValidTokenChatGPT){
            onOpenModalWarningToken();
        }
        else {
         const res = await onAnalyzeProduct()
         if(!res) return
         const {message} = res
         toggleIsOpenToast({
            isOpen: true,
            message: message || "",
            isError:true
          });
        }
    }, [isValidTokenChatGPT, onAnalyzeProduct, onOpenModalWarningToken,toggleIsOpenToast]);

    const displayElement = useMemo(() => {
        if (isError) {
            return <DisplayElementError actionAnalyze={handleOnAnalyze} />;
        }

        if (isHaveAssessment) {
            return (
                <DisplayElementAssessment status={detail.optimization_level}>
                    <DisplayIssues
                        listIssue={detail.poorly_optimized_elements}
                    />
                    <DisplaySuggestion
                        listSuggest={detail.comments_and_suggestions}
                    />
                </DisplayElementAssessment>
            );
        }

        return <DisplayElementNoData actionAnalyze={handleOnAnalyze} />;
    }, [
        detail.comments_and_suggestions,
        detail.optimization_level,
        detail.poorly_optimized_elements,
        handleOnAnalyze,
        isError,
        isHaveAssessment,
    ]);

    const toastMarkup = useMemo(
        () =>
          toastInfo.isOpen && (
            <Toast
              content={toastInfo.message}
              error={toastInfo.isError}
              onDismiss={() => {
                toggleIsOpenToast({ isOpen: false });
              }}
            />
          ),
        [toastInfo.isError, toastInfo.isOpen, toastInfo.message, toggleIsOpenToast]
      );

    return (
        <>
            <div className="AIContentEditAuditProduct">
                <div className="AIContentEditAuditProduct__header flex gap-2 items-center p-5">
                    <img src={iconGpt} alt="" />
                    <h4 className="AIContentEditAuditProduct__title-section">
                        {t(
                            "smartSEO.audit_product.edit_audit_product.preview_AI.title"
                        )}
                    </h4>
                </div>
                {displayElement}
                <p
                    className={`AIContentEditAuditProduct__token-used ${
                        !tokenUsed ? "hidden" : "flex"
                    }`}
                >
                    {t(
                        "smartSEO.audit_product.edit_audit_product.token_analysis_used",
                        {
                            number: tokenUsed,
                        }
                    )}
                </p>
                {isHaveAssessment && (
                    <div className="px-5 py-3 flex justify-center">
                        <Button
                            loading={isLoadingAnalyzeAuditProduct}
                            onClick={handleOnAnalyze}
                            disabled={
                                isLoadingPutAuditProduct ||
                                isDataChange ||
                                isRefetchingProfile ||
                                isTokenExpired || inputConfigLoading.isLoadingAnalyze || inputConfigLoading.isLoadingReAnalyze
                            }
                            primary
                        >
                            {t(
                                "smartSEO.audit_product.edit_audit_product.btn_analyze"
                            )}
                        </Button>
                    </div>
                )}
            </div>

            <DisplayReportOverview
                listWell={detail.well_optimized_elements}
                listPoorly={detail.poorly_optimized_elements}
            />
            {toastMarkup}
        </>
    );
};

const DisplayElementNoData = ({ actionAnalyze }: IDisplayElement) => {
    const { t } = useTranslation();

    const { isLoadingAnalyzeAuditProduct, isLoadingPutAuditProduct ,inputConfigLoading} =
        useContext(EditAuditProductContext);

    const { isRefetchingProfile, isTokenExpired } =
        useContext(ProfileTokenContext);

    return (
        <div className="AIContentEditAuditProduct__no-data p-5 flex flex-col justify-center items-center gap-3">
            <img src={emptyAnalysis} alt="" />
            <Text as="h3" variant="bodyMd">
                {t(
                    "smartSEO.audit_product.edit_audit_product.preview_AI.title_analyze"
                )}
            </Text>
            <Text as="h3" variant="bodyMd" color="subdued" alignment="center">
                {t(
                    "smartSEO.audit_product.edit_audit_product.preview_AI.des_analyze"
                )}
            </Text>

            <Button
                disabled={
                    isLoadingPutAuditProduct ||
                    isRefetchingProfile ||
                    isTokenExpired ||  inputConfigLoading.isLoadingAnalyze || inputConfigLoading.isLoadingReAnalyze
                }
                primary
                loading={isLoadingAnalyzeAuditProduct}
                onClick={actionAnalyze}
            >
                {t("smartSEO.audit_product.edit_audit_product.btn_analyze")}
            </Button>
        </div>
    );
};

const DisplayElementAssessment = ({
    status,
    children,
}: PropsWithChildren<{
    status: ILastAssessmentJSON["optimization_level"];
}>) => {
    const { t } = useTranslation();

    const { isLoadingAnalyzeAuditProduct } = useContext(
        EditAuditProductContext
    );

    return isLoadingAnalyzeAuditProduct ? (
        <div className="p-5">
            <SkeletonBodyText lines={10} />
        </div>
    ) : (
        <>
            <BadgeStatusAuditProduct
                isBackground
                title={t(
                    "smartSEO.audit_product.edit_audit_product.txt_optimization_level"
                )}
                status={status}
            />

            <div className="flex flex-col gap-5 px-3 mt-5">{children}</div>
        </>
    );
};

const DisplayElementError = ({ actionAnalyze }: IDisplayElement) => {
    const { t } = useTranslation();
    const { isRefetchingProfile, isTokenExpired } =
        useContext(ProfileTokenContext);

    const { inputConfigLoading} =
    useContext(EditAuditProductContext);
    
    return (
        <div className="AIContentEditAuditProduct__no-data p-5 flex flex-col justify-center items-center gap-3">
            <img src={analysisError} alt="" />
            <Text as="h3" variant="bodyMd" color="subdued" alignment="center">
                {t(
                    "smartSEO.audit_product.edit_audit_product.preview_AI.des_analyze_error"
                )}
            </Text>
            <Button
                onClick={actionAnalyze}
                loading={isRefetchingProfile}
                disabled={!isTokenExpired ||  inputConfigLoading.isLoadingAnalyze || inputConfigLoading.isLoadingReAnalyze}
            >
                {t("common.btn_ok")}
            </Button>
        </div>
    );
};

const DisplayIssues = ({
    listIssue,
}: {
    listIssue: ILastAssessmentJSON["poorly_optimized_elements"];
}) => {
    const { t } = useTranslation();

    const [searchParams, setSearchParams] = useSearchParams();

    const handleRedirectTabsEditAudit = useCallback(
        (nameTabs: string) => {
            searchParams.set("sub_tabs", nameTabs);
            setSearchParams(searchParams);
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },
        [searchParams, setSearchParams]
    );

    const titleContent = (
        <div className="flex gap-2 items-center">
            <Icon source={CircleDisableMinor} color="critical" />
            <span>
                {t(
                    "smartSEO.audit_product.edit_audit_product.preview_AI.title_issues"
                )}
            </span>
        </div>
    );

    const bodyContent = (
        <div className="AIContentEditAuditProduct__list-issues">
            <List type="bullet">
                {listIssue?.map((itemPoor) => {
                    const findIssueFix = LIST_ISSUE_FIX.find((itemIssue) => {
                        const stringIssue =
                            itemIssue.stringFind.toLocaleLowerCase();
                        const stringPoor = itemPoor.toLocaleLowerCase();

                        return stringPoor.includes(stringIssue);
                    });

                    // const titleIssue = `${t("smartSEO.audit_product.edit_audit_product.preview_AI.txt_missing")}${itemPoor}`.toLocaleLowerCase();
                    const titleIssue = `${itemPoor}`.toLocaleLowerCase();

                    return (
                        <List.Item key={itemPoor}>
                            <div className="flex items-center	justify-between">
                                <span className="AIContentEditAuditProduct__title-issue">
                                    {titleIssue}
                                </span>
                                {findIssueFix && (
                                    <Button
                                        onClick={() => {
                                            handleRedirectTabsEditAudit(
                                                findIssueFix.linkRedirect
                                            );
                                        }}
                                        plain
                                        monochrome
                                    >
                                        Fix
                                    </Button>
                                )}
                            </div>
                        </List.Item>
                    );
                })}
            </List>
        </div>
    );

    if (!listIssue?.length) return <></>;

    return (
        <CollapsibleAIContentEditAuditSEO
            title={titleContent}
            bodyContent={bodyContent}
        />
    );
};

const DisplaySuggestion = ({
    listSuggest,
}: {
    listSuggest: ILastAssessmentJSON["comments_and_suggestions"];
}) => {
    const { t } = useTranslation();
    const titleContent = (
        <div className="flex gap-2 items-center">
            <Icon source={StarOutlineMinor} color="success" />
            <span>
                {t(
                    "smartSEO.audit_product.edit_audit_product.preview_AI.title_suggestion"
                )}
            </span>
        </div>
    );

    if (!listSuggest?.length) return <></>;

    return (
        <CollapsibleAIContentEditAuditSEO
            title={titleContent}
            bodyContent={
                <div className="AIContentEditAuditProduct__box-suggestion">
                    {typeof listSuggest === "string"
                        ? listSuggest
                        : listSuggest?.map((content, index) => (
                              <div className="mb-3" key={index}>
                                  <Text as="p">- {content}</Text>
                              </div>
                          ))}
                </div>
            }
        />
    );
};

const DisplayReportOverview = ({ listWell, listPoorly }: IListResult) => {
    if (!listPoorly?.length && !listWell?.length) return <></>;
    return (
        <div className="sw__wp-box">
            <div className="flex flex-col gap-3 p-5">
                {listPoorly?.map((item) => (
                    <div
                        key={item}
                        className="AIContentEditAuditProduct__item-report flex gap-2 items-center"
                    >
                        <Icon source={CircleCancelMinor} color="critical" />
                        <span className="flex-1"> {item}</span>
                    </div>
                ))}

                {listWell?.map((item) => (
                    <div
                        key={item}
                        className="AIContentEditAuditProduct__item-report flex gap-2 items-center"
                    >
                        <Icon source={CircleTickMinor} color="success" />
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

interface IListResult {
    listWell: ILastAssessmentJSON["well_optimized_elements"];
    listPoorly: ILastAssessmentJSON["poorly_optimized_elements"];
}

interface IResultAnalytic {
    detail: ILastAssessmentJSON;
    isDataChange: boolean;
    productID: number;
    isHaveAssessment: boolean;
}

interface IDisplayElement {
    actionAnalyze: () => void;
}
