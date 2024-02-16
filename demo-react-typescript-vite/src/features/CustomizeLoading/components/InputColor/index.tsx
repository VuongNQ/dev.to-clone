/* Packages */
import {
    Popover,
    ColorPicker,
    hsbToHex,
    rgbToHsb,
    TextField,
    RGBColor,
} from '@shopify/polaris';
import { hexToRgb } from '@swift/utils/colorsFunc';
import { useState, useCallback, useEffect, KeyboardEvent } from 'react';

import './styles.scss';

interface IPropsInputColor {
    color: string;
    disabled?: boolean;
    setColor: (item:string)=>void;
}

function InputColor({
    color = '#365698',
    setColor,
    disabled = false,
}: IPropsInputColor) {
    const [popoverColorActive, setPopoverColorActive] = useState(false);

    const [colorPick, setColorPick] = useState(rgbToHsb(hexToRgb(color) as RGBColor));
    const [textColor, setTextColor] = useState(color);

    useEffect(() => {
        if (color !== hsbToHex(colorPick)) {
            setColorPick(rgbToHsb(hexToRgb(color) as RGBColor));
        }

        if (textColor !== color) {
            setTextColor(color);
        }
    }, [color]);

    const togglePopoverColorActive = useCallback(() => {
        setPopoverColorActive((popoverActive) => !popoverActive);
    }, []);

    const closePopoverColorActive = () => {
        setTextColor(color);
        setPopoverColorActive(false);
    };

    /** change color text */
    const handleSubmitChangeColorText = (e:KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            const isColor = handleValidateColor(textColor);
            if (isColor) {
                setColorPick(rgbToHsb(hexToRgb(textColor) as RGBColor));
                setColor(textColor.toLocaleUpperCase());
            } else {
                setTextColor('#AAAAAA');
                setColorPick(rgbToHsb(hexToRgb('#AAAAAA') as RGBColor));
                setColor('#AAAAAA');
            }
        }
    };

    const handleValidateColor = useCallback((value:string) => {
        const pattern = /^#([0-9a-f]{3}){1,2}$/i;

        if (pattern.test(value)) {
            return true;
        }

        return false;
    }, []);

    return (
        <Popover
            active={popoverColorActive}
            activator={
                <button
                    style={{
                        width: '114px',
                    }}
                    disabled={disabled}
                    className="InputColor__color-btn"
                    onClick={togglePopoverColorActive}
                >
                    <span className="InputColor__color-lable">{textColor}</span>
                    <div
                        className="InputColor__color-box"
                        style={{
                            backgroundColor: hsbToHex(colorPick),
                        }}
                    ></div>
                </button>
            }
            autofocusTarget="first-node"
            onClose={closePopoverColorActive}
        >
            <div
                className="InputColor__box"
                onKeyDown={handleSubmitChangeColorText}
            >
                <ColorPicker
                    onChange={(value) => {
                        setColorPick(value);
                        setTextColor(hsbToHex(value).toLocaleUpperCase());
                        setColor(hsbToHex(value).toLocaleUpperCase());
                    }}
                    color={colorPick}
                    // allowAlpha
                />
                <TextField
                    placeholder="None"
                    label=''
                    maxLength={9}
                    value={textColor}
                    onChange={(value) => {
                        setTextColor(value.toLocaleUpperCase());
                    }}
                    autoComplete="off"
                />
            </div>
        </Popover>
    );
}

export default InputColor;
