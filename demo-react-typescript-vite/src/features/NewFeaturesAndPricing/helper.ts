import { ITemTabs } from "./type";

export const handleReturnIndexTabs = (
  listTabs: ITemTabs[],
  nameTabs: string
): number => {
  const tabIndex = listTabs.findIndex((item) => {
    return item.tabs === nameTabs;
  });

  return tabIndex === -1 ? 0 : tabIndex;
};
