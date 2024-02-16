import { Badge, Icon, RadioButton, Text } from "@shopify/polaris";
import { StarOutlineMinor } from "@shopify/polaris-icons";
import IconChatGPT from "@swift/assets/svg/wallet/icon-chat-gpt.svg";
import IconImageOptimize from "@swift/assets/svg/wallet/icon-optimize-image.svg";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import usePlanPricing from "@swift/hooks/usePlanPricing";
import { queryKeys } from "@swift/queryKeys";
import { usePricingApiService } from "@swift/services/pricingApi";
import {
    IListBuyMore,
    IPackagePricingOptimizeImage,
    IPackagePricingToken,
} from "@swift/types/planPricing";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    forwardRef,
    memo,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useSearchParams } from "react-router-dom";
import ModalBaseInfo from "../UIs/ModalBase/ModalBaseInfo";
import SkeletonBasic from "../UIs/Skeletons/SkeletonBasic";
import "./styles.scss";

export type ModalBuyMoreHandle = {
    setModal: (isActive: boolean) => void;
};

const ModalBuyMoreRef = forwardRef<ModalBuyMoreHandle, Props>(function _(
    { type }: Props,
    ref
) {
    const { t } = useTranslation();

    const { getPricingToken, getPricingImages, callGetRedirectUrlBuyMore } =
        usePricingApiService();

    const [searchParams] = useSearchParams();

    const location = useLocation();

    const { URL_ROOT_APP } = usePlanPricing({});

    const { onRedirectRemoteCurrentTabs } = useFuncRedirect();

    const configOptimizeImage = {
        title: t("optimize_image.buy_more.title"),
        subTitle: t("optimize_image.buy_more.content"),
    };

    const configTokenGPT = {
        title: t("profile.token.modal_buy_more.title"),
        subTitle: t("profile.token.modal_buy_more.sub_title"),
    };

    const [modalBuyMore, setModalBuyMore] = useState(false);

    const [packagePricing, setPackagePricing] = useState<number>(0);

    const callGetList = async () => {
        const { status, data } =
            type === "image"
                ? await getPricingImages()
                : await getPricingToken();
        if (!status || !data) return [];
        return Object.keys(data).reduce(
            (list: IListBuyMore[], k: string, idx: number) => {
                const item = storeRawData(data[k], idx);
                list.push(item);
                // default check 1 package
                if (idx === 0) setPackagePricing(item.value);
                return list;
            },
            [] as IListBuyMore[]
        );
    };

    const { isLoading: isLoadingListToken, data: rawDataPackageToken } =
        useQuery({
            ...queryKeys.profile.getPackagesBuyToken(),
            enabled: type === "token",
            refetchOnWindowFocus: false,
            queryFn: callGetList,
        });

    const {
        isLoading: isLoadingListOptimization,
        data: rawDataPackageOptimization,
    } = useQuery({
        ...queryKeys.profile.getPackagesBuyOptimization(),
        enabled: type === "image",
        refetchOnWindowFocus: false,
        queryFn: callGetList,
    });

    const storeParamCallback = () => {
        const params = new URLSearchParams("");
        if (searchParams.has("tabs"))
            params.set("tabs", searchParams.get("tabs") || "");

        if (
            type === "token" &&
            location.pathname.includes("seo-basic") &&
            searchParams.has("id")
        ) {
            params.set("id", searchParams.get("id") || "");
        }
        const lastParam = params.toString();
        return lastParam.length ? `?${lastParam}` : "";
    };

    const mutationBuyMore = useMutation({
        mutationFn: () => {
            return callGetRedirectUrlBuyMore(
                URL_ROOT_APP + location.pathname + storeParamCallback(),
                packagePricing,
                type
            );
        },
        onSuccess(data) {
            if (!data || !data.status || !data.data?.confirmation_url) return;
            onRedirectRemoteCurrentTabs(data.data?.confirmation_url);
        },
    });

    const storeRawData = (
        rawData: IPackagePricingOptimizeImage | IPackagePricingToken,
        idx: number
    ) => {
        if (type === "image") {
            const { price, images } = rawData as IPackagePricingOptimizeImage;
            return storeListBuyMore(idx, price, images, "");
        }
        const { price, tokens, time_to_use } = rawData as IPackagePricingToken;
        return storeListBuyMore(idx, price, tokens, `${time_to_use}`);
    };

    const listPackage = useMemo(() => {
        return type === "token"
            ? rawDataPackageToken ?? []
            : rawDataPackageOptimization ?? [];
    }, [rawDataPackageToken, rawDataPackageOptimization, type]);

    const isLoadingStatus =
        type === "image" ? isLoadingListOptimization : isLoadingListToken;

    const storeListBuyMore = (
        idx: number,
        price: number,
        value: number,
        note: string
    ) => {
        return {
            discount: idx === 1 ? 10 : idx === 2 ? 15 : 0,
            price,
            value,
            note,
            id: idx,
        } as IListBuyMore;
    };

    useImperativeHandle(ref, () => ({
        setModal(isActive = false) {
            setModalBuyMore(isActive);
        },
    }));

    useEffect(() => {
        if (modalBuyMore) setPackagePricing(listPackage[0].value);
    }, [modalBuyMore, listPackage]);

    const renderListVertical = listPackage.map((item: IListBuyMore) => (
        <div
            className={`flex items-center flex-row gap-3 px-3 py-5 block-detail ${
                packagePricing === item.value ? "selected" : ""
            }`}
            onClick={(event) => {
                event.preventDefault();
                setPackagePricing(item.value);
            }}
            key={item.id}
        >
            <div
                className={`${
                    item.id < listPackage.length - 1 ? "hidden" : "flex"
                } items-center highlight`}
            >
                <Icon source={StarOutlineMinor} />
                <Text as="span" variant="headingXs" color="text-inverse">
                    {t("modal.buy_more.best_price")}
                </Text>
            </div>
            <RadioButton checked={packagePricing === item.value} label />
            <div className="flex-auto py-2">
                <div className="flex items-center flex-row gap-2">
                    <img
                        src={type === "token" ? IconChatGPT : IconImageOptimize}
                    />
                    <Text as="p" variant="headingMd">
                        {item.value.toLocaleString("en-US")}
                    </Text>
                    {item.discount > 0 && (
                        <Badge status="success">
                            {`Save ${item.discount.toString()} %`}
                        </Badge>
                    )}
                </div>
            </div>
            <Text as="p" variant="headingMd">
                ${item.price.toFixed(1)}
            </Text>
        </div>
    ));

    return (
        <>
            <ModalBaseInfo
                title_header={
                    type === "image"
                        ? configOptimizeImage.title
                        : configTokenGPT.title
                }
                isOpenModal={modalBuyMore}
                titlePrimaryAction={t("common.btn_continue")}
                titleSecondaryAction={t("common.btn_cancel")}
                isDisablePrimaryAction={!packagePricing}
                isLoadingPrimaryAction={mutationBuyMore.isLoading}
                isDisableSecondaryAction={
                    mutationBuyMore.isLoading || !packagePricing
                }
                onCloseAction={() => setModalBuyMore(false)}
                onSecondaryAction={() => setModalBuyMore(false)}
                isSmall
                onPrimaryAction={() => mutationBuyMore.mutate()}
            >
                <section className="ModalBuyMore__vertical">
                    <p>
                        {t(
                            type === "token"
                                ? "profile.token.modal.content"
                                : "optimize_image.buy_more.content"
                        )}
                    </p>
                    <div className="wrapper-vertical flex flex-col gap-5 py-5">
                        {isLoadingStatus
                            ? [...Array(3)].map((_, index) => (
                                  <SkeletonBasic
                                      key={index}
                                      width="340px"
                                      height="70px"
                                  />
                              ))
                            : renderListVertical}
                    </div>
                </section>
            </ModalBaseInfo>
        </>
    );
});

const ModalBuyMore = memo(ModalBuyMoreRef);

export default ModalBuyMore;

interface Props {
    type: "image" | "token";
}
