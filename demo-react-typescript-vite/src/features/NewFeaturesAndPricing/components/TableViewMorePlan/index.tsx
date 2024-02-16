import { Button, Collapsible, LegacyCard, Text } from "@shopify/polaris";
import { useTranslation } from "react-i18next";

import ToggleSwitch from "@swift/components/UIs/ToggleSwitch";
import { useDisclosure } from "@swift/hooks/useDisclosure";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import { PlanType } from "@swift/types/planPricing";
import { discountNumber } from "@swift/utils/funcNumber";
import { PropsWithChildren, memo, useCallback, useEffect, useMemo, useRef } from "react";
import { useFuncPricing } from "../../hooks/useFuncPricing";
import { IDataDescription, IDataPlanTable } from "../../type";
import RowTablePricing from "../RowTablePricing";
import "./styles.scss";
import CollapsibleTable from "../CollapsibleTable";

let timeoutTable: NodeJS.Timeout | null = null;

const TableViewMorePlan = memo(function _({
  isToggleAnnual,
  onToggleAnnual,
  dataDesTable,
  listPlanDes,
  listPlanHeader,
  planHighligh,
  children
}: PropsWithChildren<IPropsTableViewMorePlan>) {
  const { t } = useTranslation();

  const { onRedirectApp } = useFuncRedirect();

  const {
    txtUnitPriceMonth,
    txtUnitPricePlanFee,
    txtUnitPriceTicket,
  } = useFuncPricing();

  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: false,
  });

  const refTable = useRef<HTMLTableElement | null>(null);

  
  useEffect(() => {
    if (!isOpen) return;

    clearTimeout(timeoutTable as NodeJS.Timeout);
    timeoutTable = setTimeout(() => {
      if (refTable.current) {
        refTable.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      clearTimeout(timeoutTable as NodeJS.Timeout);
    }, 700);
  }, [isOpen]);

  const handleReturnUnitPrice = useCallback(
    (plan: PlanType) => {
      if (plan === PlanType.swift_experts) return txtUnitPriceTicket;

      if (isToggleAnnual) {
        if (plan === PlanType.free) return txtUnitPricePlanFee;
        return txtUnitPriceMonth;
      }

      if (plan !== PlanType.free) return txtUnitPriceMonth;

      return "";
    },
    [txtUnitPriceTicket, isToggleAnnual, txtUnitPricePlanFee, txtUnitPriceMonth]
  );

  const eleHeaderTable = useMemo(() => {
    return listPlanHeader.map((item, index) => {
      const pricing =
        item.discount && Boolean(item.discount)
          ? Math.floor(discountNumber(item.price, item.discount) / 12) 
          : item.price;

      const txtUnitPrice = handleReturnUnitPrice(item.plan);

      return (
        <th key={`---${index}`}>
          <div
            className="TableViewMorePlan__box-pricing flex flex-col gap-4 items-start"
            style={{
              width: `${666 / listPlanDes.length - 16}px`,
            }}
          >
            <Text as="h4" variant="headingSm">
              {t(item.title)}
            </Text>
            <div className="flex gap-1 items-end flex-wrap">
              <Text
                as="h3"
                variant="headingLg"
                color={item.plan === planHighligh ? "success" : undefined}
              >
                ${pricing}
              </Text>
              <Text
                as="span"
                fontWeight="regular"
                variant="bodySm"
                color="subdued"
              >
                {txtUnitPrice}
              </Text>
            </div>
            {item.buttonCharge}
          </div>
        </th>
      );
    });
  }, [listPlanHeader, handleReturnUnitPrice, listPlanDes.length, t]);

  const eleRowTable = useMemo(
    () =>
      dataDesTable.map((itemDataDesTable, index) => (
        <tr key={`###${index}`} className="TableViewMorePlan__collapsible">
          <td colSpan={listPlanDes.length + 1}>
            <CollapsibleTable
              button={
                <span className="flex-1">
                  <Text as="p" variant="headingLg">
                    {t(itemDataDesTable.title)}
                  </Text>
                </span>
              }
            >
              <RowTablePricing
                listPlan={listPlanDes}
                listDescription={itemDataDesTable.listDesTable}
              />
            </CollapsibleTable>
          </td>
        </tr>
      )),
    [dataDesTable, listPlanDes, t]
  );

  const eleBtnRedirectHome = useMemo(
    () => (
      <div className="flex justify-center">
        <Button
          plain
          onClick={() => {
            onRedirectApp("/");
          }}
        >
          {t("new_pricing_page.common.btn_back_home")}
        </Button>
      </div>
    ),
    [onRedirectApp, t]
  );

  return (
    <div className="TableViewMorePlan mt-5 flex flex-col gap-5">
      <div
        className="TableViewMorePlan__btn-view flex justify-center"
        ref={refTable}
      >
        <Button
          disclosure={isOpen ? "up" : "down"}
          onClick={() => {
            isOpen ? onClose() : onOpen();
          }}
          ariaExpanded={isOpen}
          ariaControls="CollapsibleStatus"
        >
          {isOpen
            ? t("new_pricing_page.common.btn_hide")
            : t("new_pricing_page.common.btn_view")}
        </Button>
      </div>
      <Collapsible
        open={isOpen}
        id="TableViewMorePlan__collaps-table"
        transition={{
          duration: "500ms",
          timingFunction: "ease-in-out",
        }}
        expandOnPrint
      >
        <LegacyCard>
          <div className="TableViewMorePlan__table">
            <table
              ref={refTable}
              style={{
                position: "relative",
              }}
              width="100%"
            >
              <thead>
                <tr>
                  <th>
                    <div
                      style={{
                        width: "240px",
                      }}
                    >
                      <div className="pb-4 text-left">
                        <Text as="h2" variant="heading2xl">
                          {t("new_pricing_page.table.compare_title")}
                        </Text>
                      </div>
                      <div className="flex gap-2">
                        <ToggleSwitch
                          isActive={isToggleAnnual}
                          onChangeActive={onToggleAnnual}
                        />
                        <div
                          className="cursor-pointer"
                          onClick={onToggleAnnual}
                        >
                          <Text
                            fontWeight="regular"
                            as="span"
                            variant="bodyMd"
                            color="subdued"
                          >
                            {t("new_pricing_page.table.compare_des")}
                          </Text>
                        </div>
                      </div>
                    </div>
                  </th>
                  {eleHeaderTable}
                </tr>
              </thead>
              <tbody>{eleRowTable}</tbody>
            </table>
          </div>
        </LegacyCard>
      </Collapsible>
      {!isOpen && children }
      {eleBtnRedirectHome}
    </div>
  );
});

interface IPropsTableViewMorePlan {
  isToggleAnnual: boolean;
  onToggleAnnual: () => void;
  listPlanHeader: IDataPlanTable[];
  listPlanDes: PlanType[];
  dataDesTable: IDataDesTable[];
  planHighligh?:PlanType
}

interface IDataDesTable {
  title: string;
  listDesTable: IDataDescription[];
}

export default TableViewMorePlan;
