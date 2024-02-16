import {
  LegacyCard,
  SkeletonBodyText,
  SkeletonDisplayText,
} from "@shopify/polaris";
import "../BoxPreviewPlanPricing/styles.scss";
function SkeletonBoxLoading() {
  return (
    <div className="w-100">
      <LegacyCard>
        <div
          className="BoxPreviewPlanPricing__header p-5"
          style={{
            backgroundColor: `#F8F9FA`,
          }}
        >
          <div className="mb-2">
            <SkeletonDisplayText size="small" />
          </div>
          <SkeletonBodyText lines={2} />
        </div>

        <div className="BoxPreviewPlanPricing__body flex flex-col p-5">
          {/* box pricing */}
          <div className="pb-3">
            <SkeletonDisplayText size="medium" />
          </div>
          {/* end box pricing */}

          {/* box des pricing  */}
          <div className="BoxPreviewPlanPricing__wrapper-review">
            <div className="pb-2">
              <SkeletonDisplayText size="small" />
            </div>
            <div className="BoxPreviewPlanPricing__list-review">
              <SkeletonBodyText lines={10} />
            </div>
          </div>
          {/* end des box pricing */}
        </div>

        <div className="p-3 flex flex-col gap-3 p-5">
          <div
            style={{
              lineHeight: "22px",
            }}
          >
            <SkeletonBodyText lines={1} />
          </div>
        </div>
      </LegacyCard>
    </div>
  );
}

export default SkeletonBoxLoading;
