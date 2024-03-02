import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import styles from "./sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


const cx = classNames.bind(styles);

type TippyString = {
    hideOnClick?: boolean | "toggle"
    trigger: string | "click"
    children?: React.ReactNode
    name?: "-1" | number
    attrs?: any
    tippy: {
        icon: React.ReactNode
        title: string
    }[],
}

export const SidebarTippy = ({ attrs, children, name, hideOnClick, tippy, trigger }: TippyString) => {
    const [trend, setTrend] = useState([]);
    
    const handleTippy = () => {
     if(trigger === "click") {
        setTrend([])
     }
     
        return (
            <div className={cx('siderbarTippy')} tabIndex={name} {...attrs}>
                <div className={cx('icon-title')}>
                    {tippy.map((item, index) => {
                        return (
                            <div className={cx('wrapperTippy')} key={index}>
                                <p>{item.icon}</p>
                                <p>{item.title}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <>
            <Tippy
            interactive={true}
                hideOnClick={hideOnClick}
                render={handleTippy}
            >
                <button  >
                    <FontAwesomeIcon icon={faEllipsisH} />
                </button>
            </Tippy>
                {children}
        </>
    )
}