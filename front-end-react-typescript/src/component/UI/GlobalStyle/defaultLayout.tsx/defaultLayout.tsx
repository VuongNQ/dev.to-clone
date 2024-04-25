import classNames from "classnames/bind";
import styles from '@/styles/defaultLayout.module.scss';
import Header from "./header";

const cx = classNames.bind(styles);

export interface DefaulLayoutChildren {
    children: React.ReactNode;
}

const DefaulLayout = ({ children }: DefaulLayoutChildren) => {
    return (
        <div className={cx('container')}>
            <Header />
            {/* <div className={cx(`container mt-5 d-flex pt-5`)}> */}
                {/* <SiderBarType /> */}
                <div className={cx('content')}>{children}</div>
                {/* <div><SidebarRight/></div>  */}
            {/* </div> */}
        </div>
    )
}

export default DefaulLayout;