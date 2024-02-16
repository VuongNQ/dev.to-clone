import { TextField } from "@shopify/polaris";
import { removeDuplicateSpaces } from "@swift/utils/funcString";
import { memo, useCallback, useEffect, useState } from "react";
import "./styles.scss";

const InputSearch = memo(function InputSearchMemo({
  eventTextChange,
  StringPlaceholder,
  initValue,
  disabled = false,
//   setValue,
}: IInputSearch) {
  const [isFirstMount, setIsFirstMount] = useState(true);

  const [value,setValue]  = useState(initValue)

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [setValue]
  );

  useEffect(() => {
    if (isFirstMount) {
      setIsFirstMount(false);
      return;
    }

    const delay = 500; // Debounce delay in milliseconds
    const timer = setTimeout(() => {
      const newString = removeDuplicateSpaces(value);
      // Perform the search logic here
      eventTextChange(newString);
    }, delay);

    return () => {
      clearTimeout(timer); // Clear the timer when the component is unmounted or searchTerm changes
    };
  }, [value]);

  return (
    <div className="InputSearch">
      <TextField
        label=""
        value={value}
        onChange={handleChange}
        autoComplete="off"
        placeholder={StringPlaceholder}
        disabled={disabled}
      />
    </div>
  );
});
interface IInputSearch {
	initValue: string;
//   setValue: (value: string) => void;
  StringPlaceholder?: string;
  eventTextChange: (value: string) => void;
  disabled?: boolean;
}

export default InputSearch;
