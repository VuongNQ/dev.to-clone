import classNames from "classnames/bind";
import { ReactNode } from "react";
import { IconsOther1, IconsOther2, IconsOther3 } from "../icons/icons";
import styles from './defaultLayout.module.scss';
import Header from "./header/header";
import { SiderBarType } from "./sidebar/sidebar";
import SidebarRight from "./sidebar/sidebarRight";

const cx = classNames.bind(styles);

interface DefaulLayoutChildren {
    children?: ReactNode;
}

const IconsTypeOther = [
    {
        id: 0,
        icon: <IconsOther1 width="2.4rem" height="2.4rem" />,
        title: "Code of Conduct",
    },
    {
        id: 1,
        icon: <IconsOther2 width="2.4rem" height="2.4rem" />,
        title: "Privacy Policy",
    },
    {
        id: 2,
        icon: <IconsOther3 width="2.4rem" height="2.4rem" />,
        title: "Term of use",
    },
]

const IconsTags = [
    {
        id: 0,
        tag: "#",
        title: "webdev"
    },
    {
        id: 1,
        tag: "#",
        title: "javascript"
    },
    {
        id: 2,
        tag: "#",
        title: "beginners"
    },
    {
        id: 3,
        tag: "#",
        title: "programming"
    },
    {
        id: 4,
        tag: "#",
        title: "tutorial"
    },
    {
        id: 5,
        tag: "#",
        title: "react"
    },
    {
        id: 6,
        tag: "#",
        title: "python"
    },
    {
        id: 7,
        tag: "#",
        title: "productivity"
    },
    {
        id: 8,
        tag: "#",
        title: "devops"
    },
    {
        id: 9,
        tag: "#",
        title: "discuss"
    },
    {
        id: 10,
        tag: "#",
        title: "aws"
    },
    {
        id: 11,
        tag: "#",
        title: "ai"
    },
    {
        id: 12,
        tag: "#",
        title: "opensource"
    },
    {
        id: 13,
        tag: "#",
        title: "career"
    },
    {
        id: 14,
        tag: "#",
        title: "node"
    },
    {
        id: 15,
        tag: "#",
        title: "css"
    },
    {
        id: 16,
        tag: "#",
        title: "typescript"
    },
    {
        id: 17,
        tag: "#",
        title: "news"
    },
    {
        id: 18,
        tag: "#",
        title: "learning"
    },
    {
        id: 19,
        tag: "#",
        title: "testing"
    },
    {
        id: 20,
        tag: "#",
        title: "cloud"
    },
    {
        id: 21,
        tag: "#",
        title: "api"
    },
    {
        id: 22,
        tag: "#",
        title: "html"
    },
    {
        id: 23,
        tag: "#",
        title: "development"
    },
    {
        id: 24,
        tag: "#",
        title: "java"
    },
    {
        id: 25,
        tag: "#",
        title: "security"
    },
    {
        id: 26,
        tag: "#",
        title: "php"
    },
    {
        id: 27,
        tag: "#",
        title: "database"
    },
    {
        id: 28,
        tag: "#",
        title: "android"
    },
    {
        id: 29,
        tag: "#",
        title: "dotnet"
    },
]


const DefaulLayout = ({ children }: DefaulLayoutChildren) => {
    return (
        <div className={cx('container')}>
            <Header />
            <div className={cx(`container mt-5 d-flex pt-5`)}>
                <SiderBarType
                    other={IconsTypeOther}
                    tag={IconsTags}
                />
                <div className={cx('content')}>{children}</div>
                <div>
                    <SidebarRight/>
                </div>
            </div>
        </div>
    )
}

export default DefaulLayout;