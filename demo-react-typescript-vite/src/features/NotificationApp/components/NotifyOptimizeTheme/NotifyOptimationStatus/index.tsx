import { Button, ButtonGroup } from '@shopify/polaris';
import { Icon } from '@shopify/polaris';
import { CircleTickMajor, CircleAlertMajor } from '@shopify/polaris-icons';
import { NotifyOptimationStatusType } from '@swift/features/OptimizeThemeFeature/type';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const NotifyOptimizationStatus = memo(function NotifyOptimizationStatus({
    isFail,
    title,
    des,
    hanldeRepair,
    hanldeSkip,
}: NotifyOptimationStatusType) {
    const { t } = useTranslation();
    return (
        <div
            className={
                isFail
                    ? 'NotifyOptimation__box NotifyOptimation__box--fail'
                    : 'NotifyOptimation__box'
            }
        >
            <div className="NotifyOptimation__status">
                <Icon
                    source={isFail ? CircleAlertMajor : CircleTickMajor}
                    color={isFail ? 'critical' : 'success'}
                />
                <div className="NotifyOptimation__status__content">
                    <p className="NotifyOptimation__title">{title}</p>
                    <p className="NotifyOptimation__des">{des}</p>
                    {isFail && (
                        <ButtonGroup>
                            <Button
                                plain
                                destructive
                                onClick={() => {
                                    hanldeRepair && hanldeRepair();
                                }}
                            >
                           {t('optimize_theme.btn.3')}
                            </Button>
                            <Button
                                plain
                                primary
                                onClick={() => {
                                    hanldeSkip && hanldeSkip();
                                }}
                            >
                                {t('optimize_theme.btn.4')}
                            </Button>
                        </ButtonGroup>
                    )}
                </div>
            </div>
        </div>
    );
})

export default NotifyOptimizationStatus;
