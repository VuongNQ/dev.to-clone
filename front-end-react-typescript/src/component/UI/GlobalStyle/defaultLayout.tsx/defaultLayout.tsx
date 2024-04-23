import classNames from "classnames/bind";
import styles from './defaultLayout.module.scss';
import Header from "./header/header";
import { SiderBarType } from "./sidebar/sidebar";
import SidebarRight from "./sidebar/sidebarRight";

const cx = classNames.bind(styles);

export interface DefaulLayoutChildren {
    children: React.ReactNode;
}

const DefaulLayout = ({ children }: DefaulLayoutChildren) => {
    return (
        <div className={cx('container')}>
            <Header/>
            <div className={cx(`container mt-5 d-flex pt-5`)}>
                <SiderBarType />
                <div className={cx('content')}>{children}</div>
                <div><SidebarRight /></div>
            </div>
        </div>
    )
}

export default DefaulLayout;