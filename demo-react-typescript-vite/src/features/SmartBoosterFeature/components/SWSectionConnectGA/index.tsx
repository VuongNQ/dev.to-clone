/* translation */
import { Banner, Button, Select, SkeletonBodyText, Text } from "@shopify/polaris";
import iconGA from "@swift/assets/images/smartBooster/icon-ga.png";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import { queryKeys } from "@swift/queryKeys";
import { useSmartBoosterService } from "@swift/services/smartBoosterApi";
import {
    IDataAccountGA,
    IDataDetailGA,
    IDataSettingGA,
    KeyStepConnectGoogle,
    KeyStepGA,
} from "@swift/types/smartBooster";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import useFuncSmartBooster from "../../hooks/useFuncSmartBooster";

function SWSectionConnectGA() {
    const { t } = useTranslation();

    const { onRedirectRemoteNewTabs } = useFuncRedirect();

    const { getDataStreamsGA, postSaveDataGA } = useSmartBoosterService();

    const { isConnectedGoogle, isAcceptUserFeature } = useFuncSmartBooster();

    const queryClient = useQueryClient();

    // query have been defined in SmartBoosterFeature component
    const { data: infoDataGA, isLoading: isLoadingGetInfoDataGA } = useQuery<IDataDetailGA | null>(
        queryKeys.smartBoosterQueryKey.getSettingGA().queryKey
    );

    const [streamSelected, setStreamSelected] = useState("");

    const [isOpenBannerSuccess, setIsOpenBannerSuccess] = useState(false);

    const handleReturnDataStreams = useCallback((data: IDataAccountGA[]) => {
        let newDataStreams: IDataStreams[] = [];
        const listAccounts = data.filter((item) => item.properties.length !== 0);

        for (let i = 0; i < listAccounts.length; i++) {
            const itemAccount = listAccounts[i];

            if (!itemAccount.properties) continue;

            let tempData: IDataStreams = {
                accountName: itemAccount.name,
                measurementId: "",
                propertiesName: "",
                propertiesDisplayName: "",
            };

            const listProperties = itemAccount.properties.filter((item) => item.dataStreams.length !== 0);

            for (let x = 0; x < listProperties.length; x++) {
                const itemProperties = listProperties[x];
                const listStreams = itemProperties.dataStreams;
                if (!listStreams.length) continue;

                for (let j = 0; j < listStreams.length; j++) {
                    const itemStreams = listStreams[j];
                    if (!itemStreams.webStreamData) continue;

                    tempData = {
                        ...tempData,
                        measurementId: itemStreams.webStreamData.measurementId,
                        propertiesName: itemProperties.name,
                        propertiesDisplayName: itemProperties.displayName,
                    };
                    newDataStreams = [...newDataStreams, tempData];
                }
            }
        }
        return newDataStreams;
    }, []);

    const {
        data: dataStreams,
        isFetching: isLoadingFetchAccountGA,
        refetch: refetchDataStreams,
    } = useQuery({
        ...queryKeys.smartBoosterQueryKey.getDataStreamsGA(),
        enabled: !(infoDataGA && infoDataGA.setting.step === KeyStepGA.connectedFinish) && isAcceptUserFeature,
        queryFn: async () => {
            const { data, status } = await getDataStreamsGA();
            if (status && data.length) {
                const newDataStreams = handleReturnDataStreams(data);
                return newDataStreams;
            }
            return [];
        },
    });

    const handleUpdateSettingInfoDataGA = useCallback(
        (payload: Partial<IDataSettingGA>) => {
            queryClient.setQueryData<IDataDetailGA>(
                queryKeys.smartBoosterQueryKey.getSettingGA().queryKey,
                (oldData) => {
                    if (!oldData) return oldData;
                    let newData = oldData;
                    newData = {
                        ...newData,
                        setting: {
                            ...newData.setting,
                            ...payload,
                        },
                    };
                    return newData;
                }
            );
        },
        [queryClient]
    );

    const { mutate: onConnectPropertyGA, isLoading: isLoadingConnectPropertyGA } = useMutation({
        mutationFn: async ({
            dataStreams,
            streamSelected,
        }: {
            streamSelected: string;
            dataStreams: IDataStreams[];
        }) => {
            //check connected google
            const isConnectedGO = isConnectedGoogle();
            if (!isConnectedGO) return;

            if (!streamSelected.length) return;

            const streamGA = dataStreams.find((item) => item.measurementId === streamSelected);
            if (!streamGA) return;

            const { status, data } = await postSaveDataGA({
                // save step  connected finish from api
                account: streamGA.accountName,
                measurementId: streamGA.measurementId,
                property: streamGA.propertiesName,
                step: KeyStepGA.connectedFinish,
            });

            if (status && data) {
                if (data.is_connected === KeyStepConnectGoogle.disConnected) return;

                // save step  connected finish from context
                handleUpdateSettingInfoDataGA({
                    step: KeyStepGA.connectedFinish,
                    measurementId: streamGA.measurementId,
                    property: streamGA.propertiesName,
                });

                setIsOpenBannerSuccess(true);
            }

            // setIsLoadingConnectPropertyGA(false);
        },
    });

    const { mutate: onDisConnectProperty, isLoading: isLoadingDisConnectProperty } = useMutation({
        mutationFn: async () => {
            //check connected google
            const isConnectedGO = isConnectedGoogle();
            if (!isConnectedGO) return;

            const { status } = await postSaveDataGA({
                // save step  connected Google from api
                account: "",
                measurementId: "",
                property: "",
                step: KeyStepGA.connectedGA,
            });

            if (status) {
                // go back step connect google
                handleUpdateSettingInfoDataGA({
                    step: KeyStepGA.connectedGA,
                });
                refetchDataStreams(); // get again list property to connect GA
            }
        },
    });

    const onToggleOpenBannerSuccess = useCallback(() => {
        setIsOpenBannerSuccess((preValue) => !preValue);
    }, []);

    const optionListStream = useMemo(() => {
        if (!dataStreams || !dataStreams.length) return [];

        const newList = dataStreams.map((item) => {
            const newLabel = item.propertiesName.replace(
                /(properties\/)([0-9]+)/i,
                `${item.measurementId} ($2 - ${item.propertiesDisplayName})`
            );
            return {
                label: newLabel,
                value: item.measurementId,
            };
        });

        if (!streamSelected.length && newList.length) {
            // set value first load default
            setStreamSelected(newList[0].value);
        }

        return newList;
    }, [dataStreams]);

    const eleFormConnectProperty = useMemo(() => {
        if (isLoadingFetchAccountGA) return <SkeletonBodyText />;

        if (!infoDataGA || infoDataGA.setting.step !== KeyStepGA.connectedGA) return <></>;

        return (
            <>
                <div className=" mb-1">
                    <Text alignment="start" as="h2" variant="headingMd">
                        {t("smart_booster_page.section_connect_ga.title")}
                    </Text>
                </div>
                {!dataStreams ||
                    (!dataStreams.length && (
                        <p className="pb-3">
                            {t("smart_booster_page.section_connect_ga.des", {
                                email: infoDataGA.account.email,
                            })}
                        </p>
                    ))}
                <div className="flex gap-3 flex-wrap items-end">
                    <div className="flex items-center gap-3 flex-1 w-100 ">
                        <img src={iconGA} alt="" />
                        {dataStreams && dataStreams.length ? (
                            <div className="w-100 pt-3">
                                <Select
                                    label=""
                                    options={optionListStream}
                                    onChange={(value) => {
                                        setStreamSelected(value);
                                    }}
                                    value={streamSelected}
                                />
                            </div>
                        ) : (
                            <Text as="p" variant="bodyMd" color="subdued">
                                {t("smart_booster_page.section_connect_ga.txt_not_found_properties")}
                            </Text>
                        )}
                    </div>
                    {!dataStreams || !dataStreams.length ? (
                        <Button
                            disabled={isLoadingGetInfoDataGA}
                            primary
                            onClick={() => {
                                onRedirectRemoteNewTabs("https://marketingplatform.google.com/about/analytics/");
                            }}
                        >
                            {t("smart_booster_page.section_connect_ga.btn_create_property")}
                        </Button>
                    ) : (
                        <Button
                            disabled={isLoadingGetInfoDataGA}
                            loading={isLoadingDisConnectProperty || isLoadingConnectPropertyGA}
                            primary
                            onClick={() => {
                                onConnectPropertyGA({
                                    dataStreams: dataStreams || [],
                                    streamSelected: streamSelected,
                                });
                            }}
                        >
                            {t("smart_booster_page.btn_connect_ga")}
                        </Button>
                    )}
                </div>
                <div className=" pt-3">
                    <Text alignment="start" as="p" variant="bodyMd" color="subdued">
                        {t("smart_booster_page.section_connect_ga.sub_des")}
                    </Text>
                </div>
            </>
        );
    }, [
        isLoadingFetchAccountGA,
        infoDataGA,
        t,
        dataStreams,
        optionListStream,
        streamSelected,
        isLoadingGetInfoDataGA,
        isLoadingDisConnectProperty,
        isLoadingConnectPropertyGA,
        onRedirectRemoteNewTabs,
        onConnectPropertyGA,
    ]);

    const eleDisConnectPropertyGA = useMemo(() => {
        if (!infoDataGA || infoDataGA.setting.step !== KeyStepGA.connectedFinish) return <></>;

        const title =
            infoDataGA && infoDataGA.setting && infoDataGA.setting.property
                ? infoDataGA.setting.property.replace(
                      /(properties\/)([0-9]+)/i,
                      `${infoDataGA.setting.measurementId} ($2 - Connect GA)`
                  )
                : "";

        return (
            <div className="flex items-center gap-3">
                <img src={iconGA} alt="" />
                <div className="flex flex-col  gap-1 flex-1 w-100">
                    <Text as="p">{t("smart_booster_page.section_connect_ga.title_connect_success")}</Text>
                    <p className="SWSectionConnectGA__titleGA">{title}</p>
                </div>
                <div
                    style={{
                        color: "var( --p-icon-critical)",
                    }}
                >
                    <Button monochrome outline loading={isLoadingDisConnectProperty} onClick={onDisConnectProperty}>
                        {t("smart_booster_page.btn_dissconnect")}
                    </Button>
                </div>
            </div>
        );
    }, [t, infoDataGA, isLoadingDisConnectProperty]);

    const eleBannerConnectSuccess = useMemo(() => {
        if (!infoDataGA || infoDataGA?.setting.step !== KeyStepGA.connectedFinish || !isOpenBannerSuccess) return <></>;

        return (
            <Banner
                title={t("smart_booster_page.section_connect_ga.banner_success.title")}
                status="success"
                onDismiss={onToggleOpenBannerSuccess}
            >
                {t("smart_booster_page.section_connect_ga.banner_success.des")}
            </Banner>
        );
    }, [t, infoDataGA?.setting.step, isOpenBannerSuccess]);

    return (
        <>
            <div className="sw__wp-box p-5">
                {eleFormConnectProperty}
                {eleDisConnectPropertyGA}
            </div>

            {eleBannerConnectSuccess}
        </>
    );
}

interface IDataStreams {
    accountName: string;
    propertiesName: string;
    propertiesDisplayName: string;
    measurementId: string;
}

export default SWSectionConnectGA;
