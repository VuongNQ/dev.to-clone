import { Button, OptionList, Popover } from "@shopify/polaris";
import { memo, useCallback, useMemo, useState } from "react";

const DropFilterMemo: React.FC<propsDropList> = ({
	value,
	setValue,
	list = [],
	classAdds = "",
	disable = false,
	onChangeFilter,
}: propsDropList) => {
	const [popoverActive, setPopoverActive] = useState(false);

	const togglePopoverActive = useCallback(
		() => setPopoverActive((popoverActive) => !popoverActive),
		[]
	);

	const onSelected = (newSelect: string[]) => {
		setValue(newSelect);
		// emit to parent
		onChangeFilter && onChangeFilter(newSelect[0]);
		togglePopoverActive();
	};

	const labelButton = useMemo(
		() => list.find((item) => item.value === value[0])?.label || "",
		[value, list]
	);

	const activator = (
		<div className="flex items-stretch flex-col	">
			<Button onClick={togglePopoverActive} disclosure disabled={disable}>
				{labelButton}
			</Button>
		</div>
	);

	return (
		<span className={classAdds}>
			<Popover
				active={popoverActive}
				activator={activator}
				onClose={togglePopoverActive}
			>
				<OptionList
					onChange={onSelected}
					options={list}
					allowMultiple={false}
					selected={value}
				/>
			</Popover>
		</span>
	);
};
const DropFilter = memo(DropFilterMemo);

interface propsDropList {
	value: string[];
	setValue: (value: string[]) => void;
	list: Array<FilterList>;
	classAdds?: string;
	disable?: boolean;
	onChangeFilter?: (newSelect: string) => void;
}

export interface FilterList {
	value: string;
	label: string;
}

export default DropFilter;
