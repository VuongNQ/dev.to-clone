/* Packages */
import { Button, ButtonProps, OptionList, Popover, Scrollable } from "@shopify/polaris";
import { useState } from "react";
import "./styles.scss";
import { useTranslation } from "react-i18next";
interface InputSelectType {
    titleOption?: string;
    options: {
        label: string;
        value: string;
    }[];
    selected: string[];
    disabled?: boolean;
    setSelected: (value: string[]) => void;
}

const InputSelect = ({
    options = [],
    selected = [],
    setSelected,
    disabled = false,
    titleOption = "",
    size = "medium",
    icon,
    plain,
    monochrome,
    removeUnderline,
}: InputSelectType & ButtonProps) => {
    const { t } = useTranslation();

    const [popoverActive, setPopoverActive] = useState(false);

    const handleSelect = (value: string[]) => {
        togglePopoverActive();
        setSelected && setSelected(value);
    };

    const togglePopoverActive = () => setPopoverActive((popoverActive) => !popoverActive);

    const findSelectedOption = options.length ? options.find((o) => o.value === selected[0]) : { label: "", value: "" };

    return (
        <div className="InputSelect__popover">
            <Popover
                fullWidth
                active={popoverActive}
                activator={
                    <div className={`InputSelect__btn ${plain ? "no-border" : ""}`}>
                        <Button
                            plain={plain}
                            monochrome={monochrome}
                            icon={icon}
                            size={size}
                            disabled={disabled}
                            removeUnderline={removeUnderline}
                            onClick={togglePopoverActive}
                            disclosure={popoverActive ? "up" : "down"}
                            id="InputSelect-switcher-button"
                        >
                            {t(findSelectedOption?.label || "")}
                        </Button>
                    </div>
                }
                autofocusTarget="first-node"
                onClose={togglePopoverActive}
            >
                <Popover.Pane fixed>
                    <div
                        style={{
                            alignItems: "stretch",
                            borderTop: "1px solid #DFE3E8",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "stretch",
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            maxHeight: "200px",
                            overflow: "hidden",
                        }}
                    >
                        <Scrollable
                            shadow
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                padding: "var(--p-space-2) 0",
                                borderBottomLeftRadius: "var(--p-border-radius-2)",
                                borderBottomRightRadius: "var(--p-border-radius-2)",
                            }}
                        >
                            <OptionList
                                title={t(titleOption)}
                                onChange={handleSelect}
                                options={options.map((item) => {
                                    return {
                                        ...item,
                                        label: t(item.label),
                                    };
                                })}
                                selected={selected}
                            />
                        </Scrollable>

                        {/* <Scrollable
              shadow
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                padding: "var(--p-space-2) 0",
                borderBottomLeftRadius: "var(--p-border-radius-2)",
                borderBottomRightRadius: "var(--p-border-radius-2)",
              }}
            >
              <Listbox enableKeyboardControl onSelect={handleSelect}>
                {options
                  ? options.map((o) => (
                      <Listbox.Option
                        key={o.value}
                        value={o.value as string}
                        selected={o.value === selected}
                      >
                        <Listbox.TextOption selected={o.value === selected}>
                          <Stack spacing="tight" alignment="center">
                            <p>{t(o.label)}</p>
                          </Stack>
                        </Listbox.TextOption>
                      </Listbox.Option>
                    ))
                  : ""}
              </Listbox>
            </Scrollable> */}
                    </div>
                </Popover.Pane>
            </Popover>
        </div>
    );
};

export default InputSelect;
