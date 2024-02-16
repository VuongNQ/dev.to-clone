import { ContextualSaveBar, Text } from "@shopify/polaris";
import FeaturesUseAccordingPlan, {
    ButtonActiveAccordingPlan,
    IRefFeaturesUseAccordingPlan,
} from "@swift/components/FeaturesUseAccordingPlan";
import ModalConfirmChangeTabs from "@swift/components/UIs/ModalBase/ModalConfirmChangeTabs";
import { useAppSelector } from "@swift/hooks";
import { useNavigateBlocker } from "@swift/hooks/useNavigateBlocker";
import { queryKeys } from "@swift/queryKeys";
import { useOptimizeImageService } from "@swift/services/optimizeImageApi";
import { customerData, getPricingStore } from "@swift/store/global";
import { EKeyAutoOptimizeSetting } from "@swift/types/general";
import {
    ITrialDays,
    IntervalPricingType,
    PlanType,
} from "@swift/types/planPricing";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { OptimizeImageContext } from "../../context/optimizeImage";
import { EPropsModalWarning } from "../../type";
import "./styles.scss";

/**
 * Action auto just for plan above premium plus
 * Sync style setting with ContextualSaveBar confirm save and ModalConfirmChangeTabs on had update setting
 * using FeaturesUseAccordingPlan component to sync flow handle with other feature like optimize theme, auto bulk alt image, meta tag
 *
 * @returns JSX component
 */
const AutoOptimize = () => {
    const { t } = useTranslation();

    const customer = useAppSelector(customerData);

    const customerPlan = useAppSelector(getPricingStore);

    const { callSetAutoOptimizeImage, getSettingOptimize } =
        useOptimizeImageService();

    const refFeaturesUseAccordingPlan =
        useRef<IRefFeaturesUseAccordingPlan>(null);

    const {
        isUnlimitedOptimize,
        remainCountOptimize,
        refModalWarningLimited,
        setTypeWarning,
    } = useContext(OptimizeImageContext);

    const queryClient = useQueryClient();

    const [isActive, setActive] = useState(false);

    const { data: isActiveCurrent, isLoading } = useQuery({
        ...queryKeys.optimizeImage.getSettingOptimize(),
        queryFn: async () => {
            const { status, data } = await getSettingOptimize();
            if (!status || !data) return false;
            return data[EKeyAutoOptimizeSetting.auto_optimize_image];
        },
        onSuccess(data) {
            setActive(!!data);
        },
    });

    const isChangeSetting = isActiveCurrent !== isActive;

    const allowAutoPlans = [PlanType.premium_plus, PlanType.expert_care];

    const isAllowByPlan =
        (customer?.app_plan_interval === IntervalPricingType.annual &&
            customer &&
            customer.app_plan === PlanType.premium) ||
        !!(customer && allowAutoPlans.includes(customer.app_plan));

    const hasRemainOptimization =
        isUnlimitedOptimize || remainCountOptimize > 0;

    const isTrialPlan =
        (customerPlan?.trial_days ?? 3) !== ITrialDays.isOutTrial;

    const isAllowAuto =
        !isLoading && isAllowByPlan && !isTrialPlan && hasRemainOptimization;

    const { isBlocking, initBlockRefresh, confirmNavigate, cancelNavigate } =
        useNavigateBlocker(isChangeSetting && isAllowAuto);

    const handleChangeSetting = () => {
        if (!refFeaturesUseAccordingPlan.current?.onValidPlan()) return;

        if (!hasRemainOptimization) {
            setTypeWarning(EPropsModalWarning.getMore);
            refModalWarningLimited?.current?.setModal({
                isActive: true,
            });
            return;
        }
        setActive((current) => !current);
    };

    const { mutate: callSetting, isLoading: isUpdating } = useMutation({
        mutationFn: (isActive: boolean) => callSetAutoOptimizeImage(isActive),
        onSuccess: () =>
            queryClient.setQueryData<boolean>(
                queryKeys.optimizeImage.getSettingOptimize().queryKey,
                isActive
            ),
    });

    useEffect(() => {
        if (isChangeSetting) return initBlockRefresh();
    }, [initBlockRefresh, isChangeSetting]);

    return (
        <section className="Auto-optimize">
            <FeaturesUseAccordingPlan
                ref={refFeaturesUseAccordingPlan}
                className="sw__wp-box p-5"
                listPLanAllow={allowAutoPlans}
                contentUpGrade={t("optimize_theme.auto_optimize.upgrade")}
                eleHeader={
                    <div className="flex items-center justify-between">
                        <div className="mr-5">
                            <Text as="p">
                                {t("optimize_image.auto_optimize.content")}
                            </Text>
                        </div>
                        <ButtonActiveAccordingPlan
                            isActive={isActive && isAllowAuto}
                            onAction={handleChangeSetting}
                            isDisable={isLoading || isUpdating}
                        />
                    </div>
                }
                isMustSkipTrial={true}
            />
            {isAllowAuto && isChangeSetting ? (
                <ContextualSaveBar
                    message={t("setting_page.language.save_bar.title")}
                    saveAction={{
                        content: t("common.btn_save"),
                        onAction: () => callSetting(isActive),
                        loading: isUpdating,
                    }}
                    discardAction={{
                        content: t("common.btn_discard"),
                        onAction: () => {
                            setActive(!!isActiveCurrent);
                        },
                        disabled: isUpdating,
                    }}
                />
            ) : null}
            <ModalConfirmChangeTabs
                isOpen={isBlocking && isAllowAuto}
                onClose={cancelNavigate}
                onPrimaryAction={() => {
                    confirmNavigate();
                }}
            />
        </section>
    );
};

export default AutoOptimize;
