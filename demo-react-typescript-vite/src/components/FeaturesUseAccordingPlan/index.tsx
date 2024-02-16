import { Button, Divider, Text } from "@shopify/polaris";
import usePlanPricing from "@swift/hooks/usePlanPricing";
import { PlanType } from "@swift/types/planPricing";
import {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from "react";
import { useTranslation } from "react-i18next";
import ModalSkipTrial, { ModalSkipTrialHandle } from "../ModalSkipTrial";

const FeaturesUseAccordingPlan = forwardRef<
    IRefFeaturesUseAccordingPlan,
    IPropsFeaturesUseAccordingPlan
>(function _(
    {
        listPLanAllow,
        eleHeader,
        isMustSkipTrial = false,
        onActionPrimary,
        className,
        contentUpGrade,
    }: IPropsFeaturesUseAccordingPlan,
    ref
) {
    const { t } = useTranslation();

    const { isSkipTrial } = usePlanPricing({});

    const { isAllowPlan } = usePlanPricing({ listPLanAllow });

    const refSkipTrial = useRef<ModalSkipTrialHandle>(null);

    const [isShowEleUpGrade, setIsShowEleUpGrade] = useState<boolean>(false);

    const validationPlan = useCallback(() => {
        if (!isAllowPlan) {
            setIsShowEleUpGrade(true);
            return false;
        }
        if (isMustSkipTrial && !isSkipTrial) {
            refSkipTrial.current?.openModal();
            return false;
        }
        return true;
    }, [isAllowPlan, isMustSkipTrial, isSkipTrial]);

    const onAcceptActionPrimary = useCallback(() => {
        if (!validationPlan()) return;

        return onActionPrimary && onActionPrimary();
    }, [onActionPrimary, validationPlan]);

    useImperativeHandle(
        ref,
        () => ({
            onActionPrimary() {
                onAcceptActionPrimary();
            },
            onValidPlan: validationPlan,
        }),
        [onAcceptActionPrimary, validationPlan]
    );

    const eleUpgrade = useMemo(() => {
        if (isAllowPlan || !isShowEleUpGrade) return <></>;

        return (
            <>
                <Divider></Divider>
                <div className="flex gap-1">
                    <Text variant="bodyMd" as="p">
                        {contentUpGrade}{" "}
                    </Text>
                    <Button url="/pricing" plain>
                        {t("common.btn_upgrade")}
                    </Button>
                </div>
            </>
        );
    }, [contentUpGrade, isAllowPlan, isShowEleUpGrade, t]);

    return (
        <div className={`${className} flex flex-col gap-3`}>
            {eleHeader}
            {eleUpgrade}
            <ModalSkipTrial ref={refSkipTrial} />
        </div>
    );
});

export const ButtonActiveAccordingPlan = ({
    isActive,
    onAction,
    isDisable = false
}: IPropsButtonActiveAccordingPlan) => {
    const { t } = useTranslation();
    return (
        <Button
            // loading={isLoadFetchData}
            outline={isActive}
            size="slim"
            monochrome
            primary={!isActive}
            onClick={onAction}
            disabled={isDisable}
        >
            {isActive ? t("common.btn_de_active") : t("common.btn_active")}
        </Button>
    );
};

interface IPropsFeaturesUseAccordingPlan {
    listPLanAllow: PlanType[];
    isMustSkipTrial?: boolean;
    eleHeader: JSX.Element;
    onActionPrimary?: () => void;
    className?: string;
    contentUpGrade: string;
}

interface IPropsButtonActiveAccordingPlan {
    isActive: boolean;
    onAction: () => void;
    isDisable?: boolean
}
export interface IRefFeaturesUseAccordingPlan {
    onActionPrimary: () => void;
    onValidPlan: () => boolean;
}

export default FeaturesUseAccordingPlan;
