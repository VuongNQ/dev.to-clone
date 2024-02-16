import { CircleCancelMinor, CircleInformationMajor, CircleTickMajor } from "@shopify/polaris-icons";

type Color =
    | "base"
    | "subdued"
    | "critical"
    | "interactive"
    | "warning"
    | "highlight"
    | "success"
    | "primary"
    | "magic";
export const handleReturnStatusFCP = (ms: number): Color => {
    if (ms < 1830) return "success";
    if (ms < 3020) return "warning";

    return "critical";
};
export const handleReturnStatusLCP = (ms: number): Color => {
    if (ms < 2530) return "success";
    if (ms < 4020) return "warning";

    return "critical";
};
export const handleReturnStatusCLS = (value: number): Color => {
    if (value < 0.11) return "success";
    if (value < 0.26) return "warning";

    return "critical";
};
export const handleReturnIconStatus = (value: Color) => {
    if (value === "success") return CircleTickMajor;
    if (value === "warning") return CircleInformationMajor;
    if (value === "critical") return CircleCancelMinor;

    return CircleCancelMinor;
};


