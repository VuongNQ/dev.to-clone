import { ReactNode } from "react";
import classNames from "classnames/bind";
import styles from './defaultLayout.module.scss';
import Header from "./header/header";
import Sidebar from "./sidebar/sidebar";

const cx = classNames.bind(styles);

interface DefaulLayoutChildren {
    children?: ReactNode;
}

const DefaulLayout = ({ children }: DefaulLayoutChildren) => {
    return (
        <div className={cx('wrapper')}>
            <Header/>
            <div className={cx('container')}>
                <div className={cx('inner')}>
                    <Sidebar/>
                <div className={cx('content')}>{children}</div>
               <div>
                <h1>siderbar Right</h1>
               </div>
                </div>
            </div>
        </div>
    )
}

export default DefaulLayout;