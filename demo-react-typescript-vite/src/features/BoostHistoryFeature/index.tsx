import { Badge, IndexTable } from "@shopify/polaris";
import { IndexTableHeading } from "@shopify/polaris/build/ts/src/components/IndexTable";
import { NonEmptyArray } from "@shopify/polaris/build/ts/src/types";
import TableGeneral from "@swift/components/UIs/TableBase/TableGeneral";
import { INNIT_PAGINATION } from "@swift/constants/general";
import { queryKeys } from "@swift/queryKeys";
import { useBoostHistoryService } from "@swift/services/boostHistoryApi";
import { ActionBoost, StatusActionBoost } from "@swift/types/boostHistory";
import { formatMDYAMPMAtString } from "@swift/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ACTION_BOOST, STATUS_ACTION_BOOST } from "./constants";
import "./styles.scss";

export default function BoostHistoryFeature() {
  const { t } = useTranslation();

  const { getSpeedHistory } = useBoostHistoryService();

  const [numberPage, setNumberPage] = useState(1);

  const { data: dataBoostHistory, isFetching: isLoadingGetBoostHistory } =
    useQuery({
      ...queryKeys.boostHistoryQueryKey.getSpeedHistory(numberPage),
      refetchOnWindowFocus: false,
      queryFn: async () => {
        const { data, status } = await getSpeedHistory({ page: numberPage });
        if (status) {
          return data;
        }
        return INNIT_PAGINATION;
      },
    });

  const onChangePage = useCallback(
    async (status: "prev" | "next") => {
      let newPage = numberPage;
      if (status === "next") {
        newPage = newPage + 1;
      } else {
        newPage = newPage - 1;
      }
      setNumberPage(newPage);
    },
    [numberPage]
  );

  const headings = [
    { title: t("boost_history.table_headings.0") },
    { title: t("boost_history.table_headings.1") },
    { title: t("boost_history.table_headings.2") },
  ] as NonEmptyArray<IndexTableHeading>;

  const rowMarkup = useMemo(() => {
    if (!dataBoostHistory || !dataBoostHistory.data.length) return <></>;

    return dataBoostHistory.data.map(
      ({ id, status, type, updated_at }, index) => (
        <IndexTable.Row id={`${id}`} key={id} position={index}>
          <IndexTable.Cell>{formatMDYAMPMAtString(updated_at)}</IndexTable.Cell>
          <IndexTable.Cell>
            {type === ActionBoost.auto
              ? t(ACTION_BOOST.auto)
              : t(ACTION_BOOST.manual)}
          </IndexTable.Cell>
          <IndexTable.Cell>
            {status === StatusActionBoost.success ? (
              <Badge status="success">{t(STATUS_ACTION_BOOST.success)}</Badge>
            ) : (
              <Badge status="critical">{t(STATUS_ACTION_BOOST.fail)}</Badge>
            )}
          </IndexTable.Cell>
        </IndexTable.Row>
      )
    );
  }, [t, dataBoostHistory]);

  return (
    <div className="BoostHistory p-5">
      <TableGeneral
        headings={headings}
        numberRowSkeleton={10}
        pagination={dataBoostHistory || INNIT_PAGINATION}
        isLoading={isLoadingGetBoostHistory}
        rowMarkup={rowMarkup}
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