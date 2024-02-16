import InputSelect from "@swift/components/UIs/InputSelect";
import parse from "html-react-parser";
import { useCallback, useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LIST_ICONS_LOADING, SIZE_ICON } from "../../constants";
import { CustomLoadingContext } from "../../context/ContextCustomLoading";
import { StyleCustomizeLoadingActiveContext } from "../../context/StyleCustomActiveContext";
import InputColor from "../InputColor";
import "./styles.scss";
import { Text } from "@shopify/polaris";

function TemplateSettingIcon() {
    const { t } = useTranslation();

    const { dispatch } = useContext(CustomLoadingContext);

    const { styleCustomizeLoadingActive } = useContext(
        StyleCustomizeLoadingActiveContext
    );

    const [sliderIcons, setSliderIcons] = useState({
        page: 0,
        limit: 6,
        start: 0,
        end: 6,
    });

    const handleReturnCurrentIcon = useMemo(() => {
        return (
            LIST_ICONS_LOADING.find(
                (icon) =>
                    styleCustomizeLoadingActive &&
                    styleCustomizeLoadingActive.formLoadingIcon.icon ===
                        icon.key
            ) || null
        );
    }, [styleCustomizeLoadingActive]);

    /**handle change slider icons */
    const onchangeSliderIcons = useCallback((value: number) => {
        const start = value * sliderIcons.limit;
        const end = value * sliderIcons.limit + sliderIcons.limit;
        setSliderIcons({
            ...sliderIcons,
            page: value,
            start: start,
            end: end,
        });
    }, []);

    /**change form Loading Icon */
    const handleChangeFormLoadingIcon = (key: string, value: string) => {
        const payload = {
            ...styleCustomizeLoadingActive,
            formLoadingIcon: {
                ...styleCustomizeLoadingActive.formLoadingIcon,
                [key]: value,
            },
        };

        dispatch({
            type: "update_style_setting",
            payload: { type: "template", templateActive: payload },
        });
    };

    /**handle change icon */
    const handleChangeIcon = (icon: string) => {
        if (
            styleCustomizeLoadingActive &&
            icon !== styleCustomizeLoadingActive.formLoadingIcon.icon
        ) {
            handleChangeFormLoadingIcon("icon", icon);
        }
    };

    return (
        <div className="TemplateSettingIcon flex flex-col gap-3 pt-3">
            <div className="TemplateSettingIcon__box-icon">
                <p className="mb-1">
                    {t(
                        "CustomizeLoading_page.template_customizeLoading.tabs_icon.features.0.lable"
                    )}
                </p>
                <ul className="TemplateSettingIcon__list flex">
                    {LIST_ICONS_LOADING.slice(
                        sliderIcons.start,
                        sliderIcons.end
                    ).map((item) => (
                        <li
                            onClick={() => {
                                handleChangeIcon(item.key);
                            }}
                            key={item.key}
                            className={`TemplateSettingIcon__icon flex justify-center items-center ${
                                item.key === handleReturnCurrentIcon?.key
                                    ? "active"
                                    : ""
                            }`}
                            style={{
                                display:
                                    item.key === "dog-spinner" ||
                                    item.key === "cat-spinner"
                                        ? "inline-block"
                                        : "flex",
                            }}
                        >
                            <div className="TemplateSettingIcon__icon-loading">
                                {item.key === "dog-spinner" ||
                                item.key === "cat-spinner" ? (
                                    <img src={item.code} />
                                ) : (
                                    parse(item.code)
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="TemplateSettingIcon__slider-docs">
                    <a
                        onClick={() => {
                            onchangeSliderIcons(0);
                        }}
                        className={
                            sliderIcons.page === 0
                                ? "TemplateSettingIcon__slider-doc active"
                                : "TemplateSettingIcon__slider-doc"
                        }
                    ></a>
                    <a
                        onClick={() => {
                            onchangeSliderIcons(1);
                        }}
                        className={
                            sliderIcons.page === 1
                                ? "TemplateSettingIcon__slider-doc active"
                                : "TemplateSettingIcon__slider-doc"
                        }
                    ></a>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <Text as="span" variant="bodyMd">
                    {t("CustomizeLoading_page.common.color.lable")}
                </Text>
                <InputColor
                    color={
                        styleCustomizeLoadingActive.formLoadingIcon.background
                    }
                    setColor={(value: string) => {
                        handleChangeFormLoadingIcon("background", value);
                    }}
                />
            </div>

            <div className="flex flex-col gap-1">
                <Text as="span" variant="bodyMd">
                    {t("CustomizeLoading_page.common.size.lable")}
                </Text>
                <InputSelect
                    options={SIZE_ICON}
                    selected={[
                        styleCustomizeLoadingActive.formLoadingIcon.size,
                    ]}
                    setSelected={(value) => {
                        handleChangeFormLoadingIcon("size", value[0]);
                    }}
                />
            </div>
        </div>
    );
}

export default TemplateSettingIcon;
