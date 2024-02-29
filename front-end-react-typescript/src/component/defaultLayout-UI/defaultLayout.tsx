import { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from './defaultLayout.module.scss';
import Header from "./header/header";
import { SiderBarType } from "./sidebar/sidebar";   
import { Icons1, Icons2, Icons3, Icons4, Icons5, Icons6, Icons7, Icons8, Icons9} from "../component-children/icons/icons";

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

const DefaulLayout = ({ children }: DefaulLayoutChildren) => {
    return (
        <div className={cx('container')}>
            <Header />
            <div className={cx(`container mt-5 d-flex   pt-5`)}>
                <SiderBarType names={SiderBarName} icons={IconsTypeChildren} />
                <div className={cx('content')}>{children}</div>
                <div>
                    <h1>siderbar Right</h1>
                </div>
            </div>
        </div>
    )
}

export default DefaulLayout;