import { Icon, Text } from "@shopify/polaris";
import { CancelMinor } from "@shopify/polaris-icons";
import { PlanType } from "@swift/types/planPricing";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import iconChecked from "../../assets/icon-checked.svg";
import { IDataDescription } from "../../type";
import "./styles.scss";

const RowTablePricing = ({
  listDescription,
  listPlan,
}: IPropsRowTablePricing) => {
  const { t } = useTranslation();

  const eleListRow = useMemo(() => {
    return listDescription.map((itemDes) => (
      <tr key={itemDes.title} className="RowTablePricing__row-btn">
        <td width="280px">
          <Text as="span" variant="bodyMd">
            {t(itemDes.title)}
          </Text>
        </td>
        {listPlan.map((itemPlan) => {
          const desPlan = itemDes[itemPlan];
          return (
            <td key={itemPlan} 
            width={`${(946 * 0.7) / listPlan.length}px`}
            >
              {typeof desPlan === "boolean" ? (
                !desPlan ? (
                  <Icon source={CancelMinor} color="critical" />
                ) : (
                  <img src={iconChecked} alt="" />
                )
              ) : desPlan.length > 2 ? (
                t(desPlan)
              ) : (
                <span className="RowTablePricing__icon-empty flex items-center justify-center">
                  {t(desPlan)}
                </span>
              )}
            </td>
          );
        })}
      </tr>
    ));
  }, [listDescription, listPlan, t]);

  return (
    <table>
      <tbody>{eleListRow}</tbody>
    </table>
  );
};

interface IPropsRowTablePricing {
  listDescription: IDataDescription[];
  listPlan: PlanType[];
}

export default RowTablePricing;
