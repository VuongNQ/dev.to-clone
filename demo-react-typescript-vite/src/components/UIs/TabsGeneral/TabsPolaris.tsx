import { Divider, TabProps, Tabs } from "@shopify/polaris";
import { useNavigateBlocker } from "@swift/hooks/useNavigateBlocker";
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ModalConfirmChangeTabs from "../ModalBase/ModalConfirmChangeTabs";
import useFuncRedirect from "@swift/hooks/useFuncRedirect";

const TabsPolarisMemo = forwardRef<
    IRefTabsPolaris,
    IPropsTabsPolaris
>(function _(
	{
		listTabs,
		urlRedirect,
		isNotChangeTabs = false,
		onResetForm,
		paramsQuery,
		isUseSearchParams
	}: IPropsTabsPolaris,
    ref
) {
	const { onRedirectApp } = useFuncRedirect();

	const handleReturnIndexTabs = (nameTabs: string): number => {
		const tabIndex = listTabs.findIndex((item) => {
			return item.tabs === nameTabs;
		});

		return tabIndex === -1 ? 0 : tabIndex;
	};

	const [searchParams, setSearchParams] = useSearchParams();

	const [tabsSelected, setTabsSelected] = useState(
		searchParams.has(paramsQuery)
			? handleReturnIndexTabs(searchParams.get(paramsQuery) || "")
			: 0
	);

	const [tabsSelectedTempt, setTabsSelectedTempt] = useState(0);

	const { isBlocking, initBlockRefresh, confirmNavigate, cancelNavigate } =
		useNavigateBlocker(isNotChangeTabs || false);

	useEffect(() => {
		if (isNotChangeTabs) return initBlockRefresh();
	}, [initBlockRefresh, isNotChangeTabs]);

	const handleTabChange = useCallback(
		(selectedTabIndex: number) => {
			if(!isUseSearchParams){
                console.log('selectedTabIndex',selectedTabIndex)
				setTabsSelected(selectedTabIndex);
				return
			}

			const nameTabs = listTabs[selectedTabIndex].tabs;
			searchParams.set(paramsQuery, nameTabs);
			setSearchParams(searchParams);

			if (isNotChangeTabs) {
				setTabsSelectedTempt(selectedTabIndex);
				return;
			}

			// setTabsSelected(selectedTabIndex);
			onRedirectApp(`${urlRedirect}${nameTabs}`);
		},
		[isNotChangeTabs, isUseSearchParams, listTabs, onRedirectApp, paramsQuery, searchParams, setSearchParams, urlRedirect]
	);

	useImperativeHandle(
		ref,
		() => ({
			onResetTabs() {
				handleTabChange(0);
			},
		}),
		[handleTabChange]
	);
	

	useEffect(() => {
		if (!isUseSearchParams) return;

		if (searchParams.has(paramsQuery)) {
			const nameTabs = searchParams.get(paramsQuery) || "";
			const indexTabs = handleReturnIndexTabs(nameTabs);
			setTabsSelected(indexTabs);
		} else {
			setTabsSelected(0);
		}
	}, [isUseSearchParams, paramsQuery, searchParams]);

	return (
		<div className="TabsPolaris">
			<Tabs tabs={listTabs} selected={tabsSelected} onSelect={handleTabChange}></Tabs>
			<Divider></Divider>
			{listTabs[tabsSelected].component}
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
});

const TabsPolaris = memo(TabsPolarisMemo);

export default TabsPolaris;

interface IPropsTabsPolaris {
	listTabs: {
		component: JSX.Element;
		tabs: string;
	}[] &
		TabProps[];
	justifyCenter?: boolean;
	isUseSearchParams?: boolean;
	isNotChangeTabs?: boolean;
	onResetForm?: () => void;
	urlRedirect: string;
	paramsQuery: string;
}


export interface IRefTabsPolaris {
	onResetTabs: () => void;
  }