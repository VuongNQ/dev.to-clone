import { Button, Card, Text } from "@shopify/polaris";
import { PLAN_PRICING } from "@swift/constants/constantPlanPricing";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import { useAppDispatch, useAppSelector } from "@swift/hooks";
import { customerData, getPricingStore, globalActions } from "@swift/store/global";
import { useFuncPricing } from "../../hooks/useFuncPricing";
import { useCallback, useMemo, useState } from "react";
import { IPayloadChargePlan, IntervalPricingType, PlanType } from "@swift/types/planPricing";
import { ModalBaseInfoType } from "@swift/types/general";
import iconWarning from "@swift/assets/svg/modal/warning.svg";
import usePlanPricing from "@swift/hooks/usePlanPricing";
import { useDisclosure } from "@swift/hooks/useDisclosure";
import ModalBaseInfo from "@swift/components/UIs/ModalBase/ModalBaseInfo";
import iconCheckPlan from "@swift/assets/svg/modal/icon-check-plan.svg";

const BoxPlanFree = () => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const customer = useAppSelector(customerData);

    const pricingStore = useAppSelector(getPricingStore);

    const { handleChargePlan } = usePlanPricing({});

    const {
        titleCurrentPlan,
        titleGetStarted,
        handleReturnContentModalConfirmDownPlan,
        handleReturnContentModalCheckPlan,
    } = useFuncPricing();

    const { isOpen: isOpenModal, onClose: onCloseModal, onOpen: onOpenModal } = useDisclosure({ defaultIsOpen: false });

    const [modalPlan, setModalPlan] = useState<ModalBaseInfoType | null>(null);

    const [isLoadingCheckout, setIsLoadingCheckout] = useState<boolean>(false);

    /** open modal check plan current user  */
    const onOpenModalCheckPlan = useCallback((planName: PlanType) => {
        const dataModal = handleReturnContentModalCheckPlan({
            planName: planName,
        });
        setModalPlan({
            ...dataModal,
            icon: iconCheckPlan,
            onPrimaryAction: onCloseModal,
        });

        onOpenModal();
    }, []);
    /**end open modal check plan current user  */

    /** charge free success */
    const handleChargePlanFreeSuccess = useCallback(() => {
        dispatch(
            globalActions.updateCustomer({
                app_plan: PlanType.free,
            })
        );
        onOpenModalCheckPlan(PlanType.free);
    }, []);
    /** charge free success */

    /* method use charge plan*/
    const handleCharge = useCallback(
        async ({
            interval,
            codeDiscount,
            planName,
        }: Pick<IPayloadChargePlan, "codeDiscount" | "interval" | "planName">) => {
            setIsLoadingCheckout(true);

            const isTrial = typeof pricingStore.trial_days === "number" && pricingStore.trial_days > 0 ? true : false;

            await handleChargePlan({
                codeDiscount,
                interval,
                isNoTrial: !isTrial,
                planName: planName,
                urlCharge: "",
                callbackCharged: () => {
                    onOpenModalCheckPlan(PlanType.free);
                },
                callbackRedirectCharge: () => {
                    handleChargePlanFreeSuccess();
                },
            });

            setIsLoadingCheckout(false);
        },
        []
    );
    /* method use charge plan*/

    /** confirm down plan before charge */
    const onConFirmDownGradeOtherPlan = useCallback(() => {
        const dataModal = handleReturnContentModalConfirmDownPlan({
            planNameCharge: PlanType.free,
        });

        setModalPlan({
            ...dataModal,
            icon: iconWarning,
            onPrimaryAction: () => {
                handleCharge({
                    planName: PlanType.free,
                    codeDiscount: "",
                    interval: IntervalPricingType.forever,
                });
            },
            onSecondaryAction: onCloseModal,
        });

        onOpenModal();
    }, []);
    /** confirm down plan before charge */

    /** title button content charge */
    const contentTitleBtn = useMemo(() => {
        if (customer?.app_plan !== PlanType.free) return titleGetStarted;

        return titleCurrentPlan;
    }, [customer?.app_plan, titleCurrentPlan, titleGetStarted]);

    return (
        <div className="BoxPlanFree">
            <Card>
                <div className="flex items-start">
                    <div className="flex-1 flex gap-2 flex-col">
                        <div className="flex gap-2">
                            <Text as="h3" variant="heading2xl">
                                {t(PLAN_PRICING.free.title)}
                            </Text>
                            <sup>
                                <Text as="span" variant="headingLg" color="success">
                                    $0
                                </Text>
                            </sup>
                        </div>
                        <Text as="h3" variant="bodyMd" color="subdued">
                            {t(PLAN_PRICING.free.des || "")}
                        </Text>
                    </div>
                    <Button
                        disabled={!customer || customer.app_plan === PlanType.free}
                        outline={!customer || customer.app_plan === PlanType.free}
                        onClick={onConFirmDownGradeOtherPlan}
                    >
                        {contentTitleBtn}
                    </Button>
                </div>
            </Card>

            {/* modal notification*/}
            <ModalBaseInfo
                isOpenModal={isOpenModal}
                icon={modalPlan?.icon || ""}
                title_header={modalPlan?.title_header}
                des={modalPlan?.des}
                titlePrimaryAction={modalPlan?.titlePrimaryAction}
                onPrimaryAction={modalPlan?.onPrimaryAction}
                title={modalPlan?.title}
                titleSecondaryAction={modalPlan?.titleSecondaryAction}
                onSecondaryAction={onCloseModal}
                isDestructive={modalPlan?.isDestructive}
                onCloseAction={onCloseModal}
                isLoadingPrimaryAction={isLoadingCheckout}
            />
        </div>
    );
};

export default BoxPlanFree;
