import { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from './defaultLayout.module.scss';
import Header from "./header/header";
import { SiderBarType } from "./sidebar/sidebar";
import { Icons1, Icons2, Icons3, Icons4, Icons5, Icons6, Icons7, Icons8, Icons9, IconsOther1, IconsOther2, IconsOther3 } from "../component-children/icons/icons";

const cx = classNames.bind(styles);

interface DefaulLayoutChildren {
    children?: ReactNode;
}

const SiderBarName = {
    name: "DEV Community is a community of 1,286,889 amazing developers",
    title: "We're a place where coders share, stay up-to-date and grow their careers."
}

const IconsTypeChildren = [
    {
        id: 0,
        icon: <Icons1 width="2.4rem" height="2.4rem" />,
        title: "Home",
    },
    {
        id: 1,
        icon: <Icons2 width="2.4rem" height="2.4rem" />,
        title: "Podcasts",
    },
    {
        id: 2,
        icon: <Icons3 width="2.4rem" height="2.4rem" />,
        title: "Videos",
    },
    {
        id: 3,
        icon: <Icons4 width="2.4rem" height="2.4rem" />,
        title: "Tags",
    },
    {
        id: 4,
        icon: <Icons5 width="2.4rem" height="2.4rem" />,
        title: "DEV Help",
    },
    {
        id: 5,
        icon: <Icons6 width="2.4rem" height="2.4rem" />,
        title: "Forem Shop",
    },
    {
        id: 6,
        icon: <Icons7 width="2.4rem" height="2.4rem" />,
        title: "Advertise on DEV",
    },
    {
        id: 7,
        icon: <Icons8 width="2.4rem" height="2.4rem" />,
        title: "DEV Showcase",
    },
    {
        id: 8,
        icon: <Icons9 width="2.4rem" height="2.4rem" />,
        title: "Contact",
    },
]

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
                    names={SiderBarName}
                    icons={IconsTypeChildren}
                    other={IconsTypeOther}
                    tag={IconsTags}
                />
                <div className={cx('content')}>{children}</div>
                <div>
                    <h1>siderbar Right</h1>
                </div>
            </div>
        </div>
    )
}

export default DefaulLayout;