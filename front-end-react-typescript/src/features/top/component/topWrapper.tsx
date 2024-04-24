import classNames from "classnames/bind";
import styles from "@/styles/top.module.scss";
import { Link } from "react-router-dom";
import Button from "@/component/UI/GlobalStyle/button/button";
import { EAppRouter } from "@/types/app";
import { Person2 } from "../type/top";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import top from "@/assets/image/hình ảnh bên Top.jpg";
const cx = classNames.bind(styles);

interface Father {
  children?: React.ReactNode
}
function TopWrapper({ children }: Father) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header-full')}>
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
        <div className={cx('header-content-top')}>
          <Link to={EAppRouter.top}>
            <Button headerButton="Week">Week</Button>
          </Link>
          <Link to={EAppRouter.top}>
            <Button headerButton="Month">Month</Button>
          </Link>
          <Link to={EAppRouter.top}>
            <Button headerButton="Year">Year</Button>
          </Link>
          <Link to={EAppRouter.top}>
            <Button headerButton="Infinity">Infinity</Button>
          </Link>
        </div>
      </div>
      <div className={cx('header-body')}>
        {
          Person2.map((item, index) => {
            return (
              <div key={index} className={cx("header-title")}>
                <div className={cx('inner')} >
                  <div className={cx('header-icon')}>
                    <p>👋 The second DEV Challenge is live</p>
                    <button>
                      <FontAwesomeIcon icon={item.icons} />
                    </button>
                  </div>
                  <div className={cx('img-title-footer')}>
                    <img className={cx('image-top')} src={top} alt="image header" />
                    <div className={cx('footer')}>
                      <h1>{item.titleFooter}</h1>
                      <p>{item.introduceFooter}
                        <a href="" style={{ color: "#000", fontWeight: "600", }}> {item.introduceFooter1}</a>
                        {item.introduceFooterLink}
                      </p>
                      <p>
                        <a href="" style={{ color: "#000", fontWeight: "600" }} >{item.introduceFooterPrice}</a>
                      </p>
                      <Button variant='primary' >{item.buttonFooter}</Button>
                    </div>
                  </div>
                </div>
              </div>
            )

          })
        }
      </div>
      {children}
    </div>
  );
}

export default TopWrapper;