import { SiderBarType } from '@/component/UI/GlobalStyle/defaultLayout.tsx/sidebar';
import styles from '@/styles/home.module.scss';
import classNames from "classnames/bind";
import React from "react";
import SidebarRight from '@/component/UI/GlobalStyle/defaultLayout.tsx/sidebar/component/sidebarRight';
const cx = classNames.bind(styles);
interface NewChildren {
  children: React.ReactNode
}

function ContainerHome({ children }: NewChildren) {
  return (
    <div className={cx('container mt-5 d-flex pt-5')}>
      <SiderBarType />
      <div className={cx("wrapper")}>
        {children}
      </div>
      <SidebarRight />
    </div>
  );
}

export default ContainerHome;