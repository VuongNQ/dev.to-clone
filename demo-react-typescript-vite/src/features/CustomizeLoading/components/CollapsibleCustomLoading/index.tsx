import { Collapsible, Divider, Icon } from "@shopify/polaris";

import { PropsWithChildren, useCallback, useState } from "react";

import { ChevronUpMinor, ChevronDownMinor } from "@shopify/polaris-icons";

import "./styles.scss";

export default function CollapsibleCustomLoading({
  title,
  children,
}: PropsWithChildren<IPropsCollapsibleCustomLoading>) {
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <div className="CollapsibleCustomLoading ">
      <div
        className="flex gap-1 items-center justify-between cursor-pointer p-3"
        onClick={handleToggle}
      >
        <div className="CollapsibleCustomLoading__title flex-1">{title}</div>
        {open ? (
          <Icon source={ChevronUpMinor} color="base" />
        ) : (
          <Icon source={ChevronDownMinor} color="base" />
        )}
      </div>
      <Collapsible
        open={open}
        id="CollapsibleCustomLoading"
        transition={{
          duration: "500ms",
          timingFunction: "ease-in-out",
        }}
        expandOnPrint
      >
        <div className="CollapsibleCustomLoading__review pb-3">{children}</div>
      </Collapsible>
      <Divider></Divider>
    </div>
  );
}

interface IPropsCollapsibleCustomLoading {
  title: string | JSX.Element;
//   bodyContent: string | JSX.Element | JSX.Element[];
}
