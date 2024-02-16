import { Button, Icon, Text } from "@shopify/polaris";
import { CircleAlertMajor, CircleCancelMajor, CircleTickMajor, RiskMajor } from "@shopify/polaris-icons";
import { memo, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import Parse from "html-react-parser";
import { EStatusDataLogAuditScanSEO, ItemDataLogAudits } from "@swift/types/boostSEO";

const DataLogAuditScanSEO = memo(function _({ listData, status, titleNoData }: IPropsDataLogAuditScanSEO) {
    const { t } = useTranslation();

    const [isShowMore, setIsShowMore] = useState<boolean>(false);

    useEffect(() => {
        setIsShowMore(false);
    }, [listData]);

    const displayIcon = (score: number | null) => {
        if (typeof score !== "number") return <Icon source={CircleAlertMajor} />;

        if (score >= 1) {
            return <Icon source={CircleTickMajor} color="success" />;
        }
        if (score > 0 && score < 1) {
            return <Icon source={RiskMajor} color="warning" />;
        }

        return <Icon source={CircleCancelMajor} color="critical" />;
    };

    const eleNoData = useMemo(
        () => (
            <div className="DataLogAuditScanSEO__no-data justify-center flex text-center items-center">
                <Text as="p" variant="bodyMd" color="subdued">
                    {titleNoData}
                </Text>
            </div>
        ),
        [titleNoData]
    );

    const displayListItem = useMemo(() => {
        return listData.length
            ? listData.map((item, index) =>
                  index > 5 && !isShowMore ? (
                      ""
                  ) : (
                      <div className="flex gap-3 py-1" key={index}>
                          <div className="DataLogAuditScanSEO__icon">{displayIcon(item.score)}</div>
                          <div className="DataLogAuditScanSEO__content">
                              <p className="DataLogAuditScanSEO__title">{item.title}</p>
                              {/* <a>{t('smartSEO.common.copy_right')}</a> */}
                              <p className="DataLogAuditScanSEO__des">{Parse(item.description)}</p>
                          </div>
                          {status !== "success" && item.onFix ? (
                              <div className="DataLogAuditScanSEO__btn">
                                  <Button
                                      plain
                                      onClick={() => {
                                          item.onFix && item.onFix();
                                          window.scroll({
                                              top: 0,
                                              left: 0,
                                              behavior: "smooth",
                                          });
                                      }}
                                      size="slim"
                                  >
                                      {t("boostSEO.common.btn_fix")}
                                  </Button>
                              </div>
                          ) : (
                              ""
                          )}
                      </div>
                  )
              )
            : eleNoData;
    }, [listData, isShowMore, t]);

    const displayShowMore = useMemo(() => {
        return listData.length > 6 ? (
            <div className="DataLogAuditScanSEO__show-more">
                <Button
                    plain
                    onClick={() => {
                        setIsShowMore(!isShowMore);
                    }}
                >
                    {!isShowMore ? t("common.txt_show_more") : t("common.txt_show_less")}
                </Button>
            </div>
        ) : (
            ""
        );
    }, [listData, isShowMore, t]);

    return (
        <div className="DataLogAuditScanSEO__list h-100 w-100">
            <>
                {displayListItem}

                {displayShowMore}
            </>
        </div>
    );
});

interface IPropsDataLogAuditScanSEO {
    status: EStatusDataLogAuditScanSEO;
    listData: ItemDataLogAudits[];
    titleNoData?: string;
}
export default DataLogAuditScanSEO;
