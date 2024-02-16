import { IndexTable, Text } from "@shopify/polaris";
import { IndexTableHeading } from "@shopify/polaris/build/ts/src/components/IndexTable";
import { NonEmptyArray } from "@shopify/polaris/build/ts/src/types";
import TableGeneral from "@swift/components/UIs/TableBase/TableGeneral";
import { INNIT_PAGINATION } from "@swift/constants/general";
import { queryKeys } from "@swift/queryKeys";
import { useSmartBoosterService } from "@swift/services/smartBoosterApi";
import { IDataPagination } from "@swift/types/general";
import { IResponseOverViewReport } from "@swift/types/smartBooster";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import useFuncSmartBooster from "../../hooks/useFuncSmartBooster";

const LIMIT_RECORD = 10;

const TITLE_HEADING_TABLE = {
  unifiedPagePathScreen: "smart_booster_page.table_over_view.heading.0",
  screenPageViews: "smart_booster_page.table_over_view.heading.1",
  totalUsers: "smart_booster_page.table_over_view.heading.2",
  screenPageViewsPerUser: "smart_booster_page.table_over_view.heading.3",
  eventCount: "smart_booster_page.table_over_view.heading.4",
  conversions: "smart_booster_page.table_over_view.heading.5",
};

export default function TableOverViewReportGA() {
  const { t } = useTranslation();

  const { getOverViewReport } = useSmartBoosterService();

  const {  isAcceptUserFeature} = useFuncSmartBooster();

  const headingTable = useMemo(
    () => [
      {
        id: "unifiedPagePathScreen",
        title: t(TITLE_HEADING_TABLE["unifiedPagePathScreen"]),
      },
      {
        id: "screenPageViews",
        title: t(TITLE_HEADING_TABLE["screenPageViews"]),
      },
      {
        id: "totalUsers",
        title: t(TITLE_HEADING_TABLE["totalUsers"]),
      },
      {
        id: "screenPageViewsPerUser",
        title: t(TITLE_HEADING_TABLE["screenPageViewsPerUser"]),
      },
      {
        id: "eventCount",
        title: t(TITLE_HEADING_TABLE["eventCount"]),
      },
      {
        id: "conversions",
        title: t(TITLE_HEADING_TABLE["conversions"]),
      },
    ],
    [t]
  );

  const [recordsTotal, setRecordsTotal] = useState<number[]>([]);

  const [numberPage, setNumberPage] = useState(1);

  const { data: pagination, isFetching: isLoadingChangePage } = useQuery({
    ...queryKeys.smartBoosterQueryKey.getOverViewReport(numberPage),
    enabled:isAcceptUserFeature,
    queryFn: async () => {
      const offset = (numberPage - 1) * LIMIT_RECORD;

      const { data, status } = await getOverViewReport(offset);
      if (status) {
        const newData = handleSetRowTable(data, numberPage);
        handleSetTotalRecord(data);
        return newData;
      }
      return INNIT_PAGINATION;
    },
  });

  const handleSetRowTable = useCallback(
    (
      data: IResponseOverViewReport,
      page: number
    ): IDataPagination<IDataOverViewReportGA[]> => {
      if (data.rows && data.rows.length) {
        const totalPage = data.rowCount
          ? Math.ceil(data.rowCount / LIMIT_RECORD)
          : 1;

        const newData = data.rows.map((item) => {
          return {
            pagePath: item.dimensionValues[0].value,
            screenPageViews: roundToTwo(Number(item.metricValues[0].value)),
            totalUsers: roundToTwo(Number(item.metricValues[1].value)),
            screenPageViewsPerUser: roundToTwo(
              Number(item.metricValues[2].value)
            ),
            eventCount: roundToTwo(Number(item.metricValues[3].value)),
            conversions: roundToTwo(Number(item.metricValues[4].value)),
          };
        });

        return {
          current_page: page,
          last_page: totalPage,
          next_page_url: page < totalPage ? "pag-1" : null,
          total: data.rowCount ? data.rowCount : 0,
          data: newData,
        };
      }
      return INNIT_PAGINATION;
    },
    []
  );

  const handleSetTotalRecord = useCallback((data: IResponseOverViewReport) => {
    if (data.totals && data.totals.length >= 1 && data.totals[0].metricValues) {
      const newData = data.totals[0].metricValues.map((item) =>
        roundToTwo(Number(item.value))
      );

      setRecordsTotal(newData);
    }
  }, []);

  const roundToTwo = useCallback((num: number) => {
    return +(Math.round(Number(num + "e+2")) + "e-2");
  }, []);

  const onChangePage = useCallback(
    (status: "prev" | "next") => {
      let page = numberPage;
      if (status === "next") {
        page = page + 1;
      } else {
        page = page - 1;
      }
      setNumberPage(page);
    },
    [numberPage]
  );

  const rowRecordTotal = useMemo(
    () =>
      headingTable.length ? (
        <IndexTable.Row
          id={`rowRecordTotal`}
          key={`rowRecordTotal`}
          position={0}
        >
          <IndexTable.Cell></IndexTable.Cell>
          {recordsTotal.map((item, index) => (
            <IndexTable.Cell key={`rowRecordTotal-${index}`}>
              <p className="TableOverViewReportGA__total-record">
                {item} <br />
                {headingTable[index + 1].id === "screenPageViewsPerUser" ? (
                  <span>{t("smart_booster_page.table_over_view.txt_avg")}</span>
                ) : headingTable[index + 1].id === "conversions" ? (
                  ""
                ) : (
                  <span>
                    {t("smart_booster_page.table_over_view.txt_total")}
                  </span>
                )}
              </p>
            </IndexTable.Cell>
          ))}
        </IndexTable.Row>
      ) : (
        <></>
      ),
    [t, recordsTotal, headingTable]
  );

  const rowRecords = useMemo(() => {
    if (!pagination || !pagination.data.length) return <></>;

    const listRows = pagination.data.map(
      (
        {
          conversions,
          eventCount,
          pagePath,
          screenPageViews,
          screenPageViewsPerUser,
          totalUsers,
        },
        index
      ) => (
        <IndexTable.Row
          id={`${pagePath}${index}`}
          key={`${pagePath}${index}`}
          position={index + 1}
        >
          <IndexTable.Cell>
            <p className="TableOverViewReportGA__pagePath">{pagePath}</p>
          </IndexTable.Cell>
          <IndexTable.Cell>{screenPageViews}</IndexTable.Cell>
          <IndexTable.Cell>{totalUsers}</IndexTable.Cell>
          <IndexTable.Cell>{screenPageViewsPerUser}</IndexTable.Cell>
          <IndexTable.Cell>{eventCount}</IndexTable.Cell>
          <IndexTable.Cell>{conversions}</IndexTable.Cell>
        </IndexTable.Row>
      )
    );
    return (
      <>
        {rowRecordTotal}
        {listRows}
      </>
    );
  }, [pagination, rowRecordTotal]);

  return (
    <div className="TableOverViewReportGA">
      <TableGeneral
        title={t("smart_booster_page.table_over_view.title")}
        titleRight={
          <Text as="span" variant="bodyMd" color="subdued">
            {t("smart_booster_page.txt_last_time", {
              day: 30,
            })}
          </Text>
        }
        headings={headingTable as NonEmptyArray<IndexTableHeading>}
        pagination={pagination || INNIT_PAGINATION}
        isLoading={isLoadingChangePage}
        rowMarkup={rowRecords}
        onChangePageNext={() => {
          onChangePage("next");
        }}
        onChangePagePrev={() => {
          onChangePage("prev");
        }}
      />
    </div>
  );
}

interface IDataOverViewReportGA {
  pagePath: string;
  screenPageViews: number;
  totalUsers: number;
  screenPageViewsPerUser: number;
  eventCount: number;
  conversions: number;
}
