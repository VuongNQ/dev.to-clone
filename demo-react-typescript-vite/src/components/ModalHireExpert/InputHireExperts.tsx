import { Button, Text, TextField } from "@shopify/polaris";
import iconDown from "@swift/assets/svg/oneExpert/icon-down.svg";
import iconUp from "@swift/assets/svg/oneExpert/icon-up.svg";
import { EFormHireExperts } from "@swift/types/modalHireExperts";
import { useField } from "formik";
import { useTranslation } from "react-i18next";
import "./InputHireExperts.scss";

function InputHireExperts({
    label,
    fieldName,
    isDisabledActionMinus,
    isDisabledActionPlus,
    messageError,
}: IPropsInputHireExperts) {
    const { t } = useTranslation();

    const [field, meta, helpers] = useField<string>(fieldName);

    /* handle Plus Or Minus Ticket */
    const onPlusOrMinus = (type: string, value: string) => {
        let newValue = Number(value);

        if (isNaN(newValue)) {
            newValue = 1;
            helpers.setValue(`${newValue}`);
            return;
        }

        if (type === "plus") {
            newValue = newValue + 1;
        } else {
            newValue = newValue - 1;
        }
        helpers.setValue(`${newValue}`);
    };

    return (
        <div className=" flex flex-col gap-1">
            <Text as="span" variant="bodyMd">
                {label}
            </Text>
            <div className="position-r">
                <TextField
                    label=""
                    type="text"
                    maxLength={3}
                    value={field.value}
                    onChange={(value) => {
                        helpers.setValue(value);
                    }}
                    autoComplete="off"
                    error={messageError || messageError?.length ? messageError : meta.error ? t(meta.error) : ""}
                />
                <div className="InputHireExperts__plus-minus flex flex-col justify-center">
                    <Button
                        onClick={() => {
                            onPlusOrMinus("plus", field.value);
                        }}
                        disabled={isDisabledActionPlus}
                        icon={<img src={iconUp} />}
                    ></Button>
                    <Button
                        onClick={() => {
                            onPlusOrMinus("minus", field.value);
                        }}
                        disabled={isDisabledActionMinus}
                        icon={<img src={iconDown} />}
                    ></Button>
                </div>
            </div>
        </div>
    );
}

interface IPropsInputHireExperts {
    label: string | JSX.Element;
    fieldName: EFormHireExperts;
    isDisabledActionPlus?: boolean;
    isDisabledActionMinus?: boolean;
    messageError?: string;
}

export default InputHireExperts;
