import { memo } from "react";
import "./styles.scss";

const SkeletonBasic = memo(function _({
    width = "100%",
    height = "20px",
    shape = "square",
}: SkeletonBasicType) {
    return (
        <div
            style={{
                width: width,
                height: height,
                borderRadius: shape === "square" ? "4px" : "50%",
                overflow: "hidden",
            }}
        >
            <div className="skeleton"></div>
        </div>
    );
});

interface SkeletonBasicType {
    width?: string;
    height?: string;
    shape?: "square" | "circle";
}

export default SkeletonBasic;
