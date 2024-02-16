import { Badge, Text } from "@shopify/polaris";
import { useTranslation } from "react-i18next";
import { memo, useMemo } from "react";
import { IAssessmentStatus } from "@swift/types/boostSEO";
import { ASSESSMENT_STATUS } from "@swift/constants/constantsSeoBasic";
import "./styles.scss";

const BadgeStatusAuditProduct = ({
  status,
  title,
  isBackground,
}: {
  status: IAssessmentStatus;
  title?: string;
  isBackground?: boolean;
}) => {
  const { t } = useTranslation();

  const displayBadgeStatus = useMemo(() => {
    const eleTitle =
      title && title.length ? (
        <Text as="h4" variant="headingSm">
          {title}
        </Text>
      ) : (
        ""
      );

    const statusClass =
      status === IAssessmentStatus.well_optimized
        ? "success"
        : status === IAssessmentStatus.unknown
        ? "warning"
        : status === IAssessmentStatus.poorly_optimized
        ? "critical"
        : undefined;

    if (isBackground) {
      return (
        <div
          className={`BadgeStatusAuditProduct BadgeStatusAuditProduct--${statusClass || 'subdued'} flex items-center px-4 py-2 gap-2`}
        >
          {eleTitle}
          <Badge progress="complete" status={statusClass}>
            {t(ASSESSMENT_STATUS[status])}
          </Badge>
        </div>
      );
    } else {
      return (
        <div className="BadgeStatusAuditProduct flex items-center gap-2">
          {eleTitle}
          <Badge progress="complete" status={statusClass}>
            {t(ASSESSMENT_STATUS[status])}
          </Badge>
        </div>
      );
    }
  }, [t,status, title, isBackground]);

  return displayBadgeStatus;
};

export default memo(BadgeStatusAuditProduct);
