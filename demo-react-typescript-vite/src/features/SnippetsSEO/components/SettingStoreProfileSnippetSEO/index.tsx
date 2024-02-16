import {
    Button,
    ContextualSaveBar,
    Divider,
    Text,
    TextField,
} from "@shopify/polaris";
import iconImgEmpty from "@swift/assets/images/advancedSeo/icon-img-empty.png";

import { useAppSelector } from "@swift/hooks";
import { useSSnippetSEOService } from "@swift/services/snippetSEOApi";
import { customerData } from "@swift/store/global";
import {
    EFieldSnippetOrganization,
    EFieldSnippetSetting,
    IDataSnippetOrganization,
} from "@swift/types/snippetSEO";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { updatePreViewStoreProfile } from "../../helper";
import useFuncSnippets from "../../hooks/useFuncSnippets";
import {
    EQueryClassPreview,
    IDataToastMessage,
    IPropSectionSetting,
} from "../../type";
import { validationSchemaOrganization } from "../../validations/validationOrganization";
import SettingSocialProfileSnippetSEO from "../SettingSocialProfileSnippetSEO";
import "./styles.scss";

function SettingStoreProfileSnippetSEO({
    isDataChange,
    setIsDataChange,
    setToastMessage,
    refPreview,
}: IPropsSettingStoreProfileSnippetSEO) {
    const { t } = useTranslation();

    const { postSnippetOrganization } = useSSnippetSEOService();

    const { dataResSnippet, refetchDataResSnippet } = useFuncSnippets();

    const customer = useAppSelector(customerData);

    const handleUpdatePreview = useCallback(
        (setting: IDataSnippetOrganization) => {
            updatePreViewStoreProfile(
                refPreview.current?.querySelector(
                    `.${EQueryClassPreview.PreviewOrganize}`
                ),
                setting
            );
        },
        [refPreview]
    );

    const INIT_DATA = useMemo(
        (): IDataSnippetOrganization => ({
            brand_name:
                (dataResSnippet &&
                    dataResSnippet[EFieldSnippetSetting.brand_name]) ||
                null,
            // industry: dataResSnippet[EFieldSnippetSetting.industry],
            [EFieldSnippetOrganization.active]:
                (dataResSnippet &&
                    dataResSnippet[
                        EFieldSnippetSetting.is_organization_active
                    ]) ||
                false,
            logo_link:
                (dataResSnippet &&
                    dataResSnippet[EFieldSnippetSetting.logo_link]) ||
                null,
            reference_page:
                (dataResSnippet &&
                    dataResSnippet[EFieldSnippetSetting.reference_page]) ||
                null,
            social_links:
                (dataResSnippet &&
                    dataResSnippet[EFieldSnippetSetting.social_links]) ||
                null,
        }),
        [dataResSnippet]
    );

    const { mutate: onSaveSetting, isLoading: isLoadingSaveSetting } =
        useMutation({
            mutationFn: useCallback(
                async (payload: IDataSnippetOrganization) => {
                    if (!customer) return { status: false, message: "" };
                    const clone = { ...payload };
                    if (
                        customer.domain &&
                        customer.domain.length &&
                        customer.domain !==
                            payload[EFieldSnippetOrganization.reference_page]
                    ) {
                        clone[EFieldSnippetOrganization.reference_page] = [
                            "https://",
                            "http://",
                        ].some((i) => (customer.domain || "").includes(i))
                            ? customer.domain
                            : `https://${customer.domain}`;
                    }
                    const res = await postSnippetOrganization(clone);
                    return res;
                },
                [customer, postSnippetOrganization]
            ),
            onSuccess: (res) => {
                const { status, message } = res;

                if (status) {
                    refetchDataResSnippet();
                    setToastMessage({
                        isToast: true,
                        message: t(
                            "boostSEO.common.toast_message.toast_save_success"
                        ),
                    });
                    setIsDataChange(false);
                } else {
                    setToastMessage({
                        isToast: true,
                        message: t(message || ""),
                        isError: true,
                    });
                }
            },
        });

    const handleCheckChangeData = useCallback(
        (value: IDataSnippetOrganization) => {
            const dataLocal = value;
            const isAlike =
                JSON.stringify(dataLocal) === JSON.stringify(INIT_DATA);
            setIsDataChange(!isAlike);
            handleUpdatePreview({
                ...dataLocal,
                active: true,
            });
        },
        [INIT_DATA, handleUpdatePreview, setIsDataChange]
    );

    useEffect(() => {
        handleUpdatePreview({
            ...INIT_DATA,
            active: true,
        });
        return () => {
            setIsDataChange(false);
            handleUpdatePreview({
                ...INIT_DATA,
                active: false,
            });
        };
    }, []);

    return (
        <Formik
            initialValues={INIT_DATA}
            validationSchema={validationSchemaOrganization}
            onSubmit={(value) => {
                onSaveSetting(value);
            }}
            validate={(value) => {
                handleCheckChangeData(value);
            }}
            onReset={() => {
                setIsDataChange(false);
                handleUpdatePreview({
                    ...INIT_DATA,
                    active: true,
                });
            }}
            enableReinitialize
        >
            {({
                handleSubmit,
                resetForm,
                isValid,
                values,
                setFieldValue,
                errors,
            }) => (
                <div className="SettingStoreProfileSnippetSEO p-5 flex flex-col gap-5">
                    <div className="SettingStoreProfileSnippetSEO__box flex gap-5">
                        <div className="flex-1">
                            <Text as="p" variant="bodyMd">
                                {t("smartSEO.snippet.store_profile.des")}
                            </Text>
                        </div>
                        <div style={{ color: "#D82C0D" }}>
                            <Button
                                primary={
                                    !values[EFieldSnippetOrganization.active]
                                }
                                size="slim"
                                outline={
                                    values[EFieldSnippetOrganization.active]
                                }
                                monochrome
                                onClick={() => {
                                    setFieldValue(
                                        EFieldSnippetOrganization.active,
                                        !values[
                                            EFieldSnippetOrganization.active
                                        ]
                                    );
                                }}
                            >
                                {!values[EFieldSnippetOrganization.active]
                                    ? t("smartSEO.snippet.btn_show")
                                    : t("smartSEO.snippet.btn_hide")}
                            </Button>
                        </div>
                    </div>
                    {values[EFieldSnippetOrganization.active] && (
                        <div className="SettingStoreProfileSnippetSEO__body p-5 flex flex-col gap-5">
                            <div className="SettingStoreProfileSnippetSEO__box flex gap-5">
                                <div className="flex flex-col flex-1 gap-3">
                                    <Text as="h4" variant="headingSm">
                                        {t(
                                            "smartSEO.snippet.store_profile.company.title"
                                        )}
                                    </Text>
                                    <Text
                                        as="h4"
                                        variant="bodyMd"
                                        color="subdued"
                                    >
                                        {t(
                                            "smartSEO.snippet.store_profile.company.des"
                                        )}
                                    </Text>
                                </div>
                                <div className="SettingStoreProfileSnippetSEO__logo-company flex items-start flex-1 gap-5">
                                    {values[
                                        EFieldSnippetOrganization.logo_link
                                    ] &&
                                    values[EFieldSnippetOrganization.logo_link]
                                        .length ? (
                                        <img
                                            src={
                                                values[
                                                    EFieldSnippetOrganization
                                                        .logo_link
                                                ]
                                            }
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null; // prevents looping
                                                currentTarget.src =
                                                    iconImgEmpty;
                                            }}
                                            width="36px"
                                            height="36px"
                                            alt=""
                                        />
                                    ) : (
                                        <img
                                            src={iconImgEmpty}
                                            width="36px"
                                            height="36px"
                                            alt=""
                                        />
                                    )}

                                    <div className="flex-1">
                                        <TextField
                                            label=""
                                            placeholder="Enter link image"
                                            value={
                                                values[
                                                    EFieldSnippetOrganization
                                                        .logo_link
                                                ] || ""
                                            }
                                            onChange={(value) => {
                                                setFieldValue(
                                                    EFieldSnippetOrganization.logo_link,
                                                    value
                                                );
                                            }}
                                            autoComplete="off"
                                            error={
                                                errors[
                                                    EFieldSnippetOrganization
                                                        .logo_link
                                                ]
                                                    ? t(
                                                          errors[
                                                              EFieldSnippetOrganization
                                                                  .logo_link
                                                          ]
                                                      )
                                                    : ""
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <Divider></Divider>
                            <div className="SettingStoreProfileSnippetSEO__box flex gap-5">
                                <div className="flex flex-col flex-1 gap-3">
                                    <Text as="h4" variant="headingSm">
                                        {t(
                                            "smartSEO.snippet.store_profile.brand.title"
                                        )}
                                    </Text>
                                    <Text
                                        as="h4"
                                        variant="bodyMd"
                                        color="subdued"
                                    >
                                        {t(
                                            "smartSEO.snippet.store_profile.brand.des"
                                        )}
                                    </Text>
                                </div>
                                <div className="flex flex-col flex-1 gap-3">
                                    <TextField
                                        label="Brand name"
                                        placeholder="{Store name}"
                                        value={
                                            values[
                                                EFieldSnippetOrganization
                                                    .brand_name
                                            ] || ""
                                        }
                                        onChange={(value) => {
                                            setFieldValue(
                                                EFieldSnippetOrganization.brand_name,
                                                value
                                            );
                                        }}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            <Divider></Divider>
                            <div className="SettingStoreProfileSnippetSEO__box flex gap-5">
                                <div className="flex flex-col flex-1 gap-3">
                                    <Text as="h4" variant="headingSm">
                                        {t(
                                            "smartSEO.snippet.store_profile.reference.title"
                                        )}
                                    </Text>
                                    <Text
                                        as="h4"
                                        variant="bodyMd"
                                        color="subdued"
                                    >
                                        {t(
                                            "smartSEO.snippet.store_profile.reference.des"
                                        )}
                                    </Text>
                                </div>
                                <div className="flex flex-col flex-1 gap-3 ">
                                    <TextField
                                        label="Reference page"
                                        placeholder="Enter your domain / wiki page"
                                        value={
                                            values[
                                                EFieldSnippetOrganization
                                                    .reference_page
                                            ] || ""
                                        }
                                        readOnly
                                        onChange={(value) => {
                                            setFieldValue(
                                                EFieldSnippetOrganization.reference_page,
                                                value
                                            );
                                        }}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>

                            <Divider></Divider>
                            <SettingSocialProfileSnippetSEO />
                        </div>
                    )}

                    {isDataChange && (
                        <ContextualSaveBar
                            message={t("setting_page.language.save_bar.title")}
                            saveAction={{
                                content: t("common.btn_save"),
                                onAction: handleSubmit,
                                loading: isLoadingSaveSetting,
                                disabled: !isValid,
                            }}
                            discardAction={{
                                content: t("common.btn_discard"),
                                onAction: resetForm,
                                disabled: isLoadingSaveSetting,
                            }}
                        />
                    )}
                </div>
            )}
        </Formik>
    );
}

interface IPropsSettingStoreProfileSnippetSEO extends IPropSectionSetting {
    isDataChange: boolean;
    setIsDataChange: (value: boolean) => void;
    setToastMessage: (value: IDataToastMessage) => void;
}

export default SettingStoreProfileSnippetSEO;
