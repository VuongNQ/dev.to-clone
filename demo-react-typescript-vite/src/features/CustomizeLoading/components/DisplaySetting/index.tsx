import { useContext, useEffect, useRef, useState } from "react";
/**component */
import InputSelect from "@swift/components/UIs/InputSelect";
import { useTranslation } from "react-i18next";
import { CustomizeLoadingSetting } from "../../type";
import { CustomLoadingContext } from "../../context/ContextCustomLoading";

const listWhenToShow = [
    {
        label: "CustomizeLoading_page.display_customizeLoading.features.0.list_field.0",
        value: "first",
    },
    {
        label: "CustomizeLoading_page.display_customizeLoading.features.0.list_field.1",
        value: "everytime",
    },
];

function DisplaySetting() {
    const { t } = useTranslation();

    const { state, dispatch } = useContext(CustomLoadingContext);

    const refError = useRef<HTMLDivElement>(null);

    const refPageToShow = useRef<HTMLDivElement>(null);

    const [error, setError] = useState({
        isError: false,
        message: "",
    });

    useEffect(() => {
        if (state.settings.page_show_type === "specific") {
            handleChange("page_show_type", "every");
        }
    }, [state.settings]);

    /**handle update state setting redux  */
    const handleChange = (key: string, value: string) => {
        let payload = {
            ...state.settings,
            [key]: value,
        };

        if (key === "page_show_type" && payload.page_show_type === "specific") {
            payload = handleSetDefaultPageSpecific(payload);
        } else {
            if (error.isError) {
                const newError = {
                    isError: false,
                    message: "",
                };
                setError(newError);
            }
        }

        if (key === "page_show_specific") {
            handleValidatePageSpecific(payload);
        }
        dispatch({
            type: "update_style_setting",
            payload: { type: "setting", settings: payload },
        });

        if (key === "page_show_type" && payload.page_show_type === "specific") {
            refPageToShow.current &&
                refPageToShow.current.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                });
        }
    };

    // set default page_show_specific when chosse page_show_type
    const handleSetDefaultPageSpecific = (data: CustomizeLoadingSetting) => {
        let newData = data;

        newData = {
            ...newData,
            page_show_specific: [],
        };

        return newData;
    };

    /**handle validate page specific  */
    const handleValidatePageSpecific = (data: CustomizeLoadingSetting) => {
        let newError = {
            isError: false,
            message: "",
        };

        const listPageSpecific = data.page_show_specific ? [...data.page_show_specific] : [];
        if (listPageSpecific.length <= 0) {
            newError = {
                isError: true,
                message: "Please select page to save",
            };
            refError.current &&
                refError.current.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                });
        }

        if (newError.isError !== error.isError) {
            setError(newError);
        }
    };

    return (
        <div className="px-3" ref={refError}>
            <div className="flex flex-col gap-1">
                <p>{t("CustomizeLoading_page.display_customizeLoading.features.0.lable")}</p>
                <InputSelect
                    options={listWhenToShow}
                    selected={[state.settings.display_show]}
                    setSelected={(value) => {
                        handleChange("display_show", value[0]);
                    }}
                />
            </div>
        </div>
    );
}

export default DisplaySetting;
