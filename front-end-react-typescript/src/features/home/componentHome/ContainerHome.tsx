import classNames from "classnames/bind";
import styles from '@/styles/home.module.scss';
import React from "react";

const cx = classNames.bind(styles);

interface NewChildren {
  children : React.ReactNode
}

function ContainerHome({children} : NewChildren) {
  return (
    <div className={cx("wrapper")}>
      {children}
    </div>
  );
}

export default ContainerHome;