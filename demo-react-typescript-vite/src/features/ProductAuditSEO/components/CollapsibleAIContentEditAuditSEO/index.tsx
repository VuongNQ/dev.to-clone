import { Collapsible, Icon } from "@shopify/polaris";

import { useCallback, useState } from "react";

import { ChevronUpMinor, ChevronDownMinor } from "@shopify/polaris-icons";

import "./styles.scss";

export default function CollapsibleAIContentEditAuditSEO({
  title,
  bodyContent,
}: IPropsCollapsibleAIContentEditAuditSEO) {

  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <div className="CollapsibleAIContentEditAuditSEO p-2">
      <div
        className="flex gap-1 items-center justify-between cursor-pointer"
        onClick={handleToggle}
      >
        <div className="CollapsibleAIContentEditAuditSEO__title flex-1">{title}</div>
        {open ? (
          <Icon source={ChevronUpMinor} color="success" />
        ) : (
          <Icon source={ChevronDownMinor} color="success" />
        )}
      </div>
      <Collapsible
        open={open}
        id="CollapsibleAIContentEditAuditSEO"
        transition={{
          duration: "500ms",
          timingFunction: "ease-in-out",
        }}
        expandOnPrint
      >
       <div className="CollapsibleAIContentEditAuditSEO__review mt-3">{bodyContent}</div>
      </Collapsible>
    </div>
  );
}

interface IPropsCollapsibleAIContentEditAuditSEO {
  title: string | JSX.Element;
  bodyContent: string | JSX.Element | JSX.Element[];
}
