import { Collapsible, Icon } from "@shopify/polaris";
import { ChevronDownMinor, ChevronUpMinor } from "@shopify/polaris-icons";
import { PropsWithChildren, useState } from "react";
import "./styles.scss"

const CollapsibleTable = ({
  button,
  children,
  defaultValue = true,
  onActionOpen,
}: PropsWithChildren<IPropsCollapse>) => {
  const [open, setOpen] = useState(defaultValue);

  const handleToggle = () => {
    const toggleOpen = !open;
    setOpen(toggleOpen);
    if (toggleOpen === true) {
      onActionOpen && onActionOpen();
    }
  };

  return (
    <div className="CollapsibleTable w-100">
      <div
        className="TCollapsibleTable__btn flex gap-2 px-5 py-3 cursor-pointer"
        onClick={handleToggle}
      >
        <Icon source={open ? ChevronDownMinor : ChevronUpMinor} color="base" />
        {button}
      </div>

      <Collapsible
        open={open}
        id="basic-collapsible"
        transition={{
          duration: "500ms",
          timingFunction: "ease-in-out",
        }}
        expandOnPrint
      >
        {children}
      </Collapsible>
    </div>
  );
};

interface IPropsCollapse {
  button: JSX.Element | string;
  defaultValue?: boolean;
  onActionOpen?: () => void;
}

export default CollapsibleTable;
