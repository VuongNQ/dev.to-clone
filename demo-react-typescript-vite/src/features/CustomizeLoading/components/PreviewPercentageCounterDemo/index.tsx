import { formPercentageType, keyScreen } from "../../type";


function PreviewPercentageCounterDemo({ formPercentage, screen, percent = 0 }: {
    formPercentage: formPercentageType, screen: keyScreen, percent: number
}) {

    return (
        <div className={`${screen}-preview`} style={{
            zIndex: 10,
            order: formPercentage.positionIndex
        }}>
            <div className="swift-percentage-counter">
                <p
                    className={`fz-${formPercentage.size} fw-${formPercentage.fontWeight}`}
                    style={{
                        color: formPercentage.color,
                        fontFamily: formPercentage.font,
                    }}
                >
                    {percent}%
                </p>
            </div>
        </div>
    );
}

export default PreviewPercentageCounterDemo;
