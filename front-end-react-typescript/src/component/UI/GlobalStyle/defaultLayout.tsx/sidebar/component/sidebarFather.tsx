import classNames from "classnames/bind";
import styles from '../sidebar.module.scss';
import React from "react";

const cx = classNames.bind(styles);

interface Father {
  children?: React.ReactNode
}

function SidebarFather({children} : Father) {
  return ( 
    <div className={cx('wrapper')}>
       {children}
    </div>
   );
}

export default SidebarFather;