import { formProgressBarType, keyScreen } from "../../type";

function PreviewProgressBarDemo({ formProgressBar, screen, percent = 0 }:  {
    formProgressBar: formProgressBarType,
    screen: keyScreen,
    percent: number,
}) {
    const isIsUseStripeColor = () => {
        let isActiveUseStripeColor = false;

        if (formProgressBar) {
            const getIsUseStripeColor = formProgressBar.isUseStripeColor;

            isActiveUseStripeColor = getIsUseStripeColor;

            if (typeof getIsUseStripeColor === 'boolean') {
                return isActiveUseStripeColor;
            }

            if (typeof getIsUseStripeColor === 'string') {
                if (getIsUseStripeColor === 'true') {
                    isActiveUseStripeColor = true;
                } else {
                    isActiveUseStripeColor = false;
                }
            }
        }

        return isActiveUseStripeColor;
    };

    return (
        <div
            className={`${screen}-preview`}
            style={{
                zIndex: 10,
                order: formProgressBar.positionIndex,
            }}
        >
            <div className={`swift-progress-bar ${formProgressBar.position}`}>
                <div
                    className={`progress-bar ${formProgressBar.size}`}
                    style={{
                        backgroundColor: formProgressBar.barColor,
                    }}
                >
                    <div
                        className={`progress-bar-percent`}
                        style={{
                            width: `${percent}%`,
                            background:
                                isIsUseStripeColor() &&
                                formProgressBar.position === 'middle'
                                    ? `repeating-linear-gradient(-45deg, ${formProgressBar.loadingColor} 0, ${formProgressBar.loadingColor} 10px,${formProgressBar.stripeColor} 30px, ${formProgressBar.stripeColor} 60px)`
                                    : formProgressBar.loadingColor,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default PreviewProgressBarDemo;
