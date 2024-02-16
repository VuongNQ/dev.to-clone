import { Button, Text, TextProps } from "@shopify/polaris";
import { Circle } from "rc-progress";
import "./styles.scss";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

function ChartScoreSpeed({
    point,
    showBackgroundScore = false,
    width = "120px",
    height = "120px",
    variant,
    titleScore,
    onReScan,
}: ChartScoreType & Pick<TextProps, "variant">) {
    const { t } = useTranslation();

    const refChart = useRef(null);

    useEffect(() => {
        if (!refChart.current) return;
        const rootChart = document.querySelector(".ChartScoreSpeed__circle-custom");
        const circle = document.querySelector(".ChartScoreSpeed__circle-custom > circle.rc-progress-circle-trail");
        if (!rootChart || !circle) return;
        const elmCircle = circle as HTMLElement;
        const [, last] = elmCircle.style.strokeDasharray.split(",");
        elmCircle.style.strokeDasharray = `0, ${last}`;
        // 187 là tổng quản đường point phải chạy
        elmCircle.style.strokeDashoffset = `-${Math.round(187 * (+point / 100))}`;
        elmCircle.style.stroke = "#ffffffb5";
        rootChart.appendChild(circle);
    }, [point]);

    return (
        <div
            className="ChartScoreSpeed__chart"
            style={{
                width: width,
                height: height,
            }}
        >
            <div className={`ChartScoreSpeed__wrap-border ${point > 0 && "hidden"}`}></div>
            {showBackgroundScore ? (
                <div
                    className="ChartScoreSpeed__chart-number ChartScoreSpeed__chart-background"
                    style={{
                        // backgroundColor: color,
                        width: `${Math.round(+width.replace("px", "") * (1.3 / 3))}px`,
                        height: `${Math.round(+height.replace("px", "") * (1.3 / 3))}px`,
                    }}
                >
                    <Text variant={variant} as="p">
                        {point}
                    </Text>
                </div>
            ) : (
                <div
                    className="ChartScoreSpeed__chart-number flex flex-col gap-2"
                    // style={{ color: color }}
                >
                    {titleScore ? (
                        <Text as="span" alignment="center" variant="bodySm" color="subdued">
                            {titleScore}
                        </Text>
                    ) : (
                        <></>
                    )}
                    <Text alignment="center" variant={variant} as="p">
                        {point}
                    </Text>
                </div>
            )}
            <div ref={refChart}>
                <Circle
                    percent={100}
                    className="ChartScoreSpeed__circle-custom"
                    strokeWidth={7}
                    trailWidth={7}
                    strokeLinecap="round"
                    strokeColor={{
                        "0%": "#FD5749",
                        "60%": "#FFC700",
                        "100%": "#0A855C",
                        "120%": "#FD5749",
                    }}
                    gapPosition="bottom"
                    gapDegree={130}
                />
            </div>
            {onReScan && (
                <div className="ChartScore__btn-re-scan">
                    <div className="position-a ChartScore__brg"></div>
                    <div className="position-a ChartScore__re-scan flex items-center justify-center">
                        <Button onClick={onReScan} size="slim">
                            {t("common.btn_re_scan")}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

interface ChartScoreType {
    point: number;
    showBackgroundScore?: boolean;
    width?: string;
    height?: string;
    titleScore?: string;
    onReScan?: () => void;
}
export default ChartScoreSpeed;
