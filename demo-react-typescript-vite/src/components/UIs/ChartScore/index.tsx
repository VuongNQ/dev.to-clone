import { Button, Text, TextProps } from "@shopify/polaris";
import { colorTotalScore } from "@swift/utils/funcSupportSeo";
import { Circle } from "rc-progress";
import { useMemo } from "react";
import "./styles.scss";
import { useTranslation } from "react-i18next";

function ChartScore({
    point,
    showBackgroundScore = false,
    width = "120px",
    height = "120px",
    variant,
    titleScore,
    onReScan,
}: ChartScoreType & Pick<TextProps, "variant">) {
    const { t } = useTranslation();

    const color = useMemo(() => colorTotalScore(point), [point]);

    return (
        <div
            className="ChartScore__chart position-a"
            style={{
                width: width,
                height: height,
            }}
        >
            <div className={`ChartScore__wrap-border ${point > 0 && "hidden"}`}></div>
            {showBackgroundScore ? (
                <div
                    className="ChartScore__chart-number ChartScore__chart-background"
                    style={{
                        backgroundColor: color,
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
                    className="ChartScore__chart-number flex flex-col gap-2"
                    // style={{ color: color }}
                >
                    {titleScore && (
                        <Text as="span" alignment="center" variant="bodySm" color="subdued">
                            {titleScore}
                        </Text>
                    )}
                    <Text alignment="center" variant={variant} as="p">
                        {point}
                    </Text>
                </div>
            )}
            <Circle percent={point} strokeWidth={7} trailWidth={3} strokeLinecap="round" strokeColor={color} />
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
export default ChartScore;
