import { IndexTable, Tooltip } from "@shopify/polaris";
import { IndexTableHeading } from "@shopify/polaris/build/ts/src/components/IndexTable";
import { NonEmptyArray } from "@shopify/polaris/build/ts/src/types";
import TableGeneral from "@swift/components/UIs/TableBase/TableGeneral";
import { INNIT_PAGINATION } from "@swift/constants/general";
import { queryKeys } from "@swift/queryKeys";
import { useOptimizeThemeService } from "@swift/services/optimizeThemeApi";
import { IFilterHistoryOptimize } from "@swift/types/optimizeTheme";
import { formatDateNameMonthDY } from "@swift/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { OptimizeThemeContext } from "../../contexts/OptimizeThemeContext";
import DetailFilesOptimized from "../DetailFilesOptimized";
import "./styles.scss";

function TableActionOptimize() {
  const { t } = useTranslation();

  const { getHistoryOptimize } = useOptimizeThemeService();

  const { dataOptimize, isAcceptUseOptimizeTheme } =
    useContext(OptimizeThemeContext);

  const [filterHistoryOptimize] = useState<IFilterHistoryOptimize>({
    keyword: "",
  });

  const [numberPage, setNumberPage] = useState(1);

  const { data: dataOptimizeHistory, isFetching: isLoadingOptimizeHistory } =
    useQuery({
      enabled: dataOptimize && !dataOptimize.isLoading,
      ...queryKeys.optimizeTheme.getHistoryOptimize({
        filters: filterHistoryOptimize,
        params: { page: numberPage },
      }),
      queryFn: async () => {
        const { data, status } = await getHistoryOptimize({
          filters: filterHistoryOptimize,
          params: { page: numberPage },
        });

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
    { title: t("optimize_theme.table.header.0") },
    { title: t("optimize_theme.table.header.1") },
    { title: t("optimize_theme.table.header.2") },
    { title: t("optimize_theme.table.header.3") },
  ] as NonEmptyArray<IndexTableHeading>;

  const rowMarkup = useMemo(() => {
    if (!dataOptimizeHistory || !dataOptimizeHistory.data.length) return <></>;

    return dataOptimizeHistory.data.map(
      (
        { files_optimized, id, optimized_at, publish_at, theme_id, theme_name },
        index
      ) => (
        <IndexTable.Row id={`${id}`} key={id} position={index}>
          <IndexTable.Cell>
            <Tooltip content={theme_name}>
              <p className="TableActionOptimize__name-theme cursor-pointer">
                {theme_name}
              </p>
            </Tooltip>
          </IndexTable.Cell>
          <IndexTable.Cell>
            {formatDateNameMonthDY(optimized_at)}
          </IndexTable.Cell>
          <IndexTable.Cell>
            {publish_at ? formatDateNameMonthDY(publish_at) : "-"}
          </IndexTable.Cell>
          <IndexTable.Cell>
            <DetailFilesOptimized
              themeId={theme_id}
              title={t("optimize_theme.table.title_total_row", {
                number: files_optimized,
              })}
            />
          </IndexTable.Cell>
        </IndexTable.Row>
      )
    );
  }, [dataOptimizeHistory]);

  if (!isAcceptUseOptimizeTheme) return <></>;
  
  return (
    <TableGeneral
      title={t("optimize_theme.table.title")}
      headings={headings}
      pagination={dataOptimizeHistory || INNIT_PAGINATION}
      isLoading={isLoadingOptimizeHistory}
      rowMarkup={rowMarkup}
      onChangePageNext={() => {
        onChangePage("next");
      }}
      onChangePagePrev={() => {
        onChangePage("prev");
      }}
    />
  );
}

export default TableActionOptimize;
