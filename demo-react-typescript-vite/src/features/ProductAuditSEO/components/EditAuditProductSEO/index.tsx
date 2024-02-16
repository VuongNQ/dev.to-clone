import {
	Banner,
	Grid,
	LegacyCard,
	Page,
	SkeletonBodyText,
	SkeletonDisplayText,
	SkeletonPage,
	SkeletonTabs,
	Toast,
} from "@shopify/polaris";
import { ViewMinor } from "@shopify/polaris-icons";
import IconWarningNotEnoughToken from "@swift/assets/images/basicSeo/warning-not-enough-token.jpg";
import ModalBuyMore from "@swift/components/ModalBuyMore";
import ModalSkipTrial from "@swift/components/ModalSkipTrial";
import ModalBaseInfo from "@swift/components/UIs/ModalBase/ModalBaseInfo";
import { useAppSelector } from "@swift/hooks";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import { useAuditProductService } from "@swift/services/auditProductApi";
import { customerData } from "@swift/store/global";
import {
	IFormValidateAudit,
	IPayloadPutDetailAuditProduct,
} from "@swift/types/boostSEO";
import { validationSchemaEditAuditProduct } from "@swift/validation/validationAuditProduct";
import { Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EditAuditProductContext } from "../../contexts/editAuditProduct";
import { ProfileTokenContext } from "../../contexts/profileToken";
import { useEditAuditProduct } from "../../hooks/useEditAuditProduct";
import { useProfileTokenAuditProduct } from "../../hooks/useProfileTokenAuditProduct";
import AIContentEditAuditProduct from "../AIContentEditAuditProduct";
import PreviewEditAuditProduct from "../PreviewEditAuditProduct";
import ProfileToken from "../ProfileToken";
import { SaveContextBar } from "./SaveBar";
import { FormOnTabs } from "./TabsForm";
import "./styles.scss";

function EditAuditProductSEO({ idProd }: IPropsEditAuditProductSEO) {
    const { t } = useTranslation();

    const customer = useAppSelector(customerData);

    const { onRedirectRemoteNewTabs } = useFuncRedirect();

    const dataDetailAudit = useEditAuditProduct();

    const dataProfileToken = useProfileTokenAuditProduct();

    const [stopAnnouncements, setStopAnnouncements] = useState(false);

    const INNIT_DATA: IFormValidateAudit = {
        title: dataDetailAudit.dataDetailAuditProduct?.title || "",
        description_html:
            dataDetailAudit.dataDetailAuditProduct?.description_html || "",
        title_tag: dataDetailAudit.dataDetailAuditProduct?.title_tag || "",
        description_tag:
            dataDetailAudit.dataDetailAuditProduct?.description_tag || "",
    };

    const [isDataChange, setIsDataChange] = useState(false);

    const [toastMessage, setToastMessage] = useState<{
        isToast: boolean;
        message: string;
        isError?: boolean;
    }>({
        isToast: false,
        message: "",
        isError: false,
    });

    const onViewStore = useCallback(() => {
        const url = `https://${customer?.domain}/products/${dataDetailAudit.dataDetailAuditProduct?.handle}`;
        onRedirectRemoteNewTabs(url);
    }, [dataDetailAudit.dataDetailAuditProduct]);

    const handleChangeData = useCallback(
        (value: IFormValidateAudit) => {
            if (!dataDetailAudit || !dataDetailAudit.dataDetailAuditProduct)
                return;

            const dataLocal = value;

            const dataContext: IFormValidateAudit = {
                title: dataDetailAudit.dataDetailAuditProduct.title || "",
                description_html:
                    dataDetailAudit.dataDetailAuditProduct.description_html ||
                    "",
                title_tag:
                    dataDetailAudit.dataDetailAuditProduct.title_tag || "",
                description_tag:
                    dataDetailAudit.dataDetailAuditProduct.description_tag ||
                    "",
            };

            const isAlike =
                JSON.stringify(dataLocal) === JSON.stringify(dataContext);
            setIsDataChange(!isAlike);
        },
        [dataDetailAudit.dataDetailAuditProduct]
    );

    const { putDetailAuditProduct } = useAuditProductService();

    const onSave = useCallback(
        async (payload: IFormValidateAudit) => {
            const { setIsLoadingPutAuditProduct, fetchDataDetailAudit } =
                dataDetailAudit;

            setIsLoadingPutAuditProduct(true);

            const newPayload: IPayloadPutDetailAuditProduct = {
                ...payload,
                productId: idProd,
            };
            const { status, errors } = await putDetailAuditProduct(newPayload);

            if (status) {
                setIsDataChange(false);
                setToastMessage({
                    isToast: true,
                    message: t(
                        "boostSEO.common.toast_message.toast_save_success"
                    ),
                });
                fetchDataDetailAudit(idProd);
            } else {
                if (!errors) return;
                const listError = Object.values(errors);
                setToastMessage({
                    isToast: true,
                    message: t(listError[0]),
                    isError: true,
                });
            }
            setIsLoadingPutAuditProduct(false);
        },
        [dataDetailAudit, idProd, t]
    );

    const handleWarning = () => {
        dataProfileToken.onCloseModalWarningToken();
        if (dataProfileToken.validateSkipTrial())
            dataProfileToken.refModalBuyMore.current?.setModal(true);
    };

    useEffect(() => {
        dataDetailAudit.fetchDataDetailAudit(idProd);
    }, []);

    if (dataDetailAudit.isLoadingDetailAuditProduct)
        return (
            <SkeletonPage primaryAction>
                <Grid>
                    <Grid.Cell
                        columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
                    >
                        <LegacyCard sectioned>
                            <SkeletonTabs />
                            <div className="mt-5">
                                <SkeletonBodyText lines={15} />
                            </div>
                        </LegacyCard>
                    </Grid.Cell>
                    <Grid.Cell
                        columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
                    >
                        <LegacyCard>
                            <LegacyCard.Section>
                                <SkeletonDisplayText size="medium" />
                            </LegacyCard.Section>

                            <LegacyCard.Section>
                                <SkeletonBodyText lines={15} />
                            </LegacyCard.Section>
                        </LegacyCard>
                    </Grid.Cell>
                </Grid>
            </SkeletonPage>
        );

    return (
        <Page
            backAction={{
                content: dataDetailAudit.dataDetailAuditProduct?.title || "",
                url: `/seo-basic?tabs=audit_product`,
            }}
            title={dataDetailAudit.dataDetailAuditProduct?.title || ""}
            secondaryActions={[
                {
                    content: t(
                        "smartSEO.audit_product.edit_audit_product.btn_view"
                    ),
                    onAction: onViewStore,
                    icon: ViewMinor,
                },
            ]}
        >
            <section className="mb-5" hidden={stopAnnouncements}>
                <Banner onDismiss={() => setStopAnnouncements(true)}>
                    <p>{t("smartSEO.audit_product.noti_using_token")}</p>
                </Banner>
            </section>
            <ProfileTokenContext.Provider value={dataProfileToken}>
                <EditAuditProductContext.Provider value={dataDetailAudit}>
                    <Formik
                        initialValues={INNIT_DATA}
                        validationSchema={validationSchemaEditAuditProduct}
                        validate={handleChangeData}
                        onSubmit={onSave}
                        onReset={handleChangeData}
                        validateOnChange
                        validateOnBlur={false}
                    >
                        {({ values }) => (
                            <div className="EditAuditProduct flex gap-5 mb-5">
                                <div className="EditAuditProduct__left flex flex-col gap-5">
                                    <FormOnTabs
                                        idProd={idProd}
                                        isDataChange={isDataChange}
                                    />
                                    <SaveContextBar
                                        isShowBar={isDataChange}
                                        callBackToast={(message) => {
                                            setToastMessage({
                                                isToast: true,
                                                message,
                                                isError: true,
                                            });
                                        }}
                                    />
                                    <PreviewEditAuditProduct
                                        descriptionTag={values.description_tag}
                                        titleTag={values.title_tag}
                                    />
                                </div>

                                <div className="EditAuditProduct__right flex flex-col gap-5">
                                    <div className="EditAuditProduct__token p-5">
                                        <ProfileToken />
                                    </div>
                                    <AIContentEditAuditProduct
                                        isDataChange={isDataChange}
                                        idProd={idProd}
                                    />
                                </div>
                            </div>
                        )}
                    </Formik>
                    <ModalSkipTrial ref={dataProfileToken.refModalSkipTrial} />

                    <ModalBaseInfo
                        isOpenModal={dataProfileToken.isOpenModalWarningToken}
                        title_header={t("profile.modal_noti.header")}
                        icon={IconWarningNotEnoughToken}
                        title={t("profile.modal_noti.title")}
                        desKey="profile.modal_noti.description"
                        onCloseAction={
                            dataProfileToken.onCloseModalWarningToken
                        }
                        titlePrimaryAction={t("common.btn_get_more")}
                        titleSecondaryAction={t("common.btn_cancel")}
                        onPrimaryAction={handleWarning}
                        onSecondaryAction={
                            dataProfileToken.onCloseModalWarningToken
                        }
                        isSmall
                    />

                    <ModalBuyMore
                        type={"token"}
                        ref={dataProfileToken.refModalBuyMore}
                    />
                </EditAuditProductContext.Provider>
            </ProfileTokenContext.Provider>
            {/* toast message */}
            {toastMessage.isToast ? (
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
            ) : null}
            {/*end toast message */}
        </Page>
    );
}

interface IPropsEditAuditProductSEO {
    idProd: number;
}

export default EditAuditProductSEO;
