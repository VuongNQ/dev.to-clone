/*
import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import styles from "./sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

type TippyString = {
    hideOnClick?: boolean | "toggle"
    children?: React.ReactNode
    name?: "-1" | number
    attrs?: any
    tippy: {
        icon: React.ReactNode
        title: string
    }[],
}

export const SidebarTippy = ({ attrs, children, name, tippy }: TippyString) => {
    const handleTippy = (attrs) => {
        return (
            <div className={cx('siderbarTippy')} tabIndex={name} {...attrs}>
                {tippy.map((item, index) => {
                    return (
                        <div className={cx('wrapperTippy')} key={index}>
                            <p className={cx('sidebarTippy-icon')}>{item.icon}</p>
                            <p className={cx('sidebarTippy-title')}>{item.title}</p>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <>
            {children}
            <Tippy
                delay={[250, 800]}
                placement="bottom-end"
                render={handleTippy}
            >
                <button>
                    <FontAwesomeIcon icon={faEllipsisH} />
                </button>
            </Tippy >
        </>
    )
}
*/