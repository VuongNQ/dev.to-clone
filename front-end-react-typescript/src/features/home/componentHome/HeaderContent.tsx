import Button from "@/component/UI/GlobalStyle/button/button";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from '@/styles/home.module.scss';
import { EAppRouter } from "@/types/app";

import ImageContentHome from "@/assets/image/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_ko14fygno7jgvo7gz8k9.gif";
const cx = classNames.bind(styles);
function HeaderContent() {
  return (
    <>
      <div className={cx('header-content')}>
        <Link to={EAppRouter.root}>
        <Button fontWeight="fontWeight" headerButton="Relevant">Relevant</Button>
        </Link>
        <Link to={EAppRouter.latest}>
          <Button headerButton="Latest">Latest</Button>
        </Link>
        <Link to={EAppRouter.top}>
        <Button headerButton="Top">Top</Button>
        </Link>
      </div>
      <img className={cx('image-top')} src={ImageContentHome} alt="image header" />
    </>
  );
}

export default HeaderContent;