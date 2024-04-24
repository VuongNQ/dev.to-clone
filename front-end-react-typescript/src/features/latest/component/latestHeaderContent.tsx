import { Link } from "react-router-dom";
import { EAppRouter } from "@/types/app";
import Button from "@/component/UI/GlobalStyle/button/button";
import classNames from "classnames/bind";
import styles from '@/styles/latest.module.scss';
import latest from "@/assets/image/latest.avif";
import React from "react";

const cx = classNames.bind(styles);
interface Father {
  children?: React.ReactNode
}

function LatestHeaderContent({ children }: Father) {
  return (
    <div className={cx('container')}>
      <div className={cx('wrapper')}>
        <div className={cx('header-content')}>
          <Link to={EAppRouter.root}>
            <Button headerButton="Relevant">Relevant</Button>
          </Link>
          <Link to={EAppRouter.latest}>
            <Button headerButton="Latest">Latest</Button>
          </Link>
          <Link to={EAppRouter.top}>
            <Button headerButton="Top">Top</Button>
          </Link>
        </div>
        <div className={cx('post-Sign')}>
          <p className={cx('post')}>Some latest posts are only visible for members. <a className={cx('post-link')} href="">Sign in</a> to see all latest</p>
        </div>
        <img className={cx('image-top')} src={latest} alt="image header" />
        {children}
      </div>
    </div>
  );
}

export default LatestHeaderContent;