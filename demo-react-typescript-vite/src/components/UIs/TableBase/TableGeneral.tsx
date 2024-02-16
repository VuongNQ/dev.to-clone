import { Divider, IndexTable, Pagination, Text } from "@shopify/polaris";
import { IndexTableHeading } from "@shopify/polaris/build/ts/src/components/IndexTable";
import { NonEmptyArray } from "@shopify/polaris/build/ts/src/types";
import noDataTable from "@swift/assets/svg/general/no-file.svg";
import { IDataPagination } from "@swift/types/general";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import SkeletonTable from "../SkeletonTable";
import "./TableGeneral.scss";

interface ITableGeneral {
  title?: string;
  pagination: IDataPagination<unknown>;
  headings: NonEmptyArray<IndexTableHeading>;
  rowMarkup: JSX.Element[] | "" | JSX.Element;
  onChangePagePrev: () => void;
  onChangePageNext: () => void;
  isLoading?: boolean;
  emptyStateMarkup?: JSX.Element;
  numberRowSkeleton?: number;
  isSkeletonColImage?: boolean;
  titleRight?: string | JSX.Element;
  eleFilter?: JSX.Element;
}

const TableGeneralMemo = ({
  pagination,
  headings,
  rowMarkup,
  onChangePagePrev,
  onChangePageNext,
  isLoading,
  emptyStateMarkup,
  title,
  numberRowSkeleton = 5,
  isSkeletonColImage = false,
  titleRight,
  eleFilter,
}: ITableGeneral) => {
  const { t } = useTranslation();

  const resourceName = {
    singular: "customer",
    plural: "customers",
  };

  const emptyState = useMemo(
    () => (
      <div className="TableGeneral__no-data flex flex-col justify-center items-center gap-3">
        <img src={noDataTable} alt="" />
        <Text as="span" variant="bodyMd" color="subdued">
          {t("boost_history.text_no_data")}
        </Text>
      </div>
    ),
    [t]
  );

  return (
    <div className="TableGeneral sw__wp-box">
      {title || titleRight ? (
        <div className="TableGeneral__title flex justify-between items-center p-5">
          {title && (
            <Text as="span" variant="headingMd">
              {title}
            </Text>
          )}
          {titleRight && titleRight}
        </div>
      ) : (
        <></>
      )}

      {eleFilter && <div className="TableGeneral__filter p-3">{eleFilter}</div>}
      <IndexTable
        resourceName={resourceName}
        itemCount={isLoading ? 1 : pagination.total}
        headings={headings}
        selectable={false}
        emptyState={emptyStateMarkup ? emptyStateMarkup : emptyState}
      >
        {isLoading ? (
          <SkeletonTable
            numberRow={numberRowSkeleton}
            numberCol={headings.length}
            isUseImage={isSkeletonColImage}
          />
        ) : (
          rowMarkup
        )}
      </IndexTable>
      {pagination.total > 0 && (
        <>
          <Divider></Divider>
          <div className="TableGeneral__pagination flex justify-center p-5">
            <Pagination
              label={t("common.txt_page_table", {
                current_page: pagination.current_page,
                last_page: pagination.last_page,
              })}
              hasPrevious={pagination?.current_page > 1 && !isLoading}
              onPrevious={() => {
                onChangePagePrev && onChangePagePrev();
              }}
              hasNext={pagination.next_page_url ? !isLoading : false}
              onNext={() => {
                onChangePageNext && onChangePageNext();
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
const TableGeneral = memo(TableGeneralMemo);

export default TableGeneral;
