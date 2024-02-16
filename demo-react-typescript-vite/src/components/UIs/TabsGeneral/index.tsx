import { Text } from "@shopify/polaris";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";
import { useNavigateBlocker } from "@swift/hooks/useNavigateBlocker";
import { memo, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ModalConfirmChangeTabs from "../ModalBase/ModalConfirmChangeTabs";
import "./style.scss";

const TabsGeneralMemo = ({
  menu,
  isNotChangeTabs = false,
  urlRedirect, // name tabs will add after urlRedirect
  onResetForm,
  paramsQuery,
}: IPropsTabsGeneral) => {
  const { onRedirectApp } = useFuncRedirect();

  const handleReturnIndexTabs = useCallback((nameTabs: string): number => {
    const tabIndex = menu.findIndex((item) => {
      return item.tabs === nameTabs;
    });

    return tabIndex === -1 ? 0 : tabIndex;
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();

  const [tabsSelected, setTabsSelected] = useState(
    searchParams.has(paramsQuery)
      ? handleReturnIndexTabs(searchParams.get(paramsQuery) || "")
      : 0
  );

  const [tabsSelectedTempt, setTabsSelectedTempt] = useState(0);

  const { isBlocking, initBlockRefresh, confirmNavigate, cancelNavigate } =
    useNavigateBlocker(isNotChangeTabs);

  useEffect(() => {
    if (isNotChangeTabs) return initBlockRefresh();
  }, [isNotChangeTabs]);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => {
      const nameTabs = menu[selectedTabIndex].tabs;
      searchParams.set(paramsQuery, nameTabs);
      setSearchParams(searchParams);

      if (isNotChangeTabs) {
        setTabsSelectedTempt(selectedTabIndex);
        return;
      }

      // setTabsSelected(selectedTabIndex);
      // onAcceptChangeTabs && onAcceptChangeTabs(menu[selectedTabIndex].tabs);
      onRedirectApp(`${urlRedirect}${nameTabs}`);
      // navigate(`${urlRedirect}${nameTabs}`)
    },
    [isNotChangeTabs]
  );

  useEffect(() => {
    // if (!isUseSearchParams) return;
    if (searchParams.has(paramsQuery)) {
      const nameTabs = searchParams.get(paramsQuery) || "";
      const indexTabs = handleReturnIndexTabs(nameTabs);
      setTabsSelected(indexTabs);
    } else {
      setTabsSelected(0);
    }
  }, [searchParams]);

  return (
    <div className="TabsGeneral">
      <div className="TabsGeneral__wp flex">
        <div className="TabsGeneral__menu">
          {menu.map((item, index) => (
            <button
              key={item.id}
              onClick={() => {
                handleTabChange(index);
              }}
              className={`TabsGeneral__btn ${
                index === tabsSelected && "active"
              } `}
            >
              <Text as="span" variant="bodyMd">
                {item.content}
              </Text>
            </button>
          ))}
        </div>
        <div className="TabsGeneral__body">{menu[tabsSelected].component}</div>
      </div>

      {/* modal confirm */}
      <ModalConfirmChangeTabs
        isOpen={isBlocking}
        onClose={cancelNavigate}
        onPrimaryAction={() => {
          onResetForm && onResetForm();
          confirmNavigate();
          setTabsSelected(tabsSelectedTempt);
        }}
      />
    </div>
  );
};

const TabsGeneral = memo(TabsGeneralMemo);
interface IPropsTabsGeneral {
  menu: IItemTabsMenu[];
  // isUseSearchParams?: boolean;
  isNotChangeTabs?: boolean;
  onAcceptChangeTabs?: (tabs: string) => void;
  onResetForm?: () => void;
  urlRedirect: string;
  paramsQuery: string;
}

interface IItemTabsMenu {
  id: string;
  content: string;
  tabs: string;
  component: JSX.Element;
}

export default TabsGeneral;
