import classNames from "classnames/bind";
import styles from './home.module.scss';
import { Link } from "react-router-dom";
import routes from "@/constants/routes";
import ImageContentHome from "@/assets/image/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_ko14fygno7jgvo7gz8k9.gif";
import { List } from "./homets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from '@tippyjs/react/headless';
import { EIcons, Icons1, Icons2 } from "@/component/component-children/icons/icons";
const cx = classNames.bind(styles);


function Home() {
  const ListNew = List.flatMap((item) => (item.type.map((i)=>{
    const iconComponent = (() => {
      switch (i.iconEnum) {
        case EIcons.Icons1 :
          return <Icons1 />;
        default:
          return <Icons2 />;
      }
     })()
     return {...i, iconComponent}
  })));
  return (
    <div className={cx("wrapper")}>
      <div className={cx('header-content')}>
        <button className={cx('button-content')}>Relavant</button>
        <Link to={routes.latest}>
          <button className={cx('button-content')}>Latest</button>
        </Link>
        <button className={cx('button-content')}>Top</button>
      </div>
      <img className={cx('image-top')} src={ImageContentHome} alt="image header" />
      {
        ListNew.map((item, index) => {
          return (
            <div key={index} className={cx('header-title')}>
              <div className={cx('ImgAndTitle')}>
                <a href="">
                  <img className={cx('image')} src={item.hinhanh} alt="" />
                  <div className={cx('img-children')}>
                    <img src={item.hinhanh1} alt="" />
                  </div>
                </a>
                <div className={cx('title-separateName')}>
                  <Tippy
                    interactive
                    placement="bottom-start"
                    render={attr => (
                      <div className={cx('wrapper-Tippy')} tabIndex={index} {...attr}  >
                        <div className={cx('inner-Tippy')}>
                          <div className={cx('header-Tippy')}>
                            <img className={cx('image-Tippy')} src={item.hinhanh} alt="" />
                            <span>{item.name}</span>
                          </div>
                          <button className={cx('button-Tippy')} >{item.button}</button>
                          <div className={cx('color-base')}>{item.always}</div>
                          <ul>
                            <li>
                              <div className={cx('key')}>{item.work}</div>
                              <div className={cx('value')}>{item.dev}</div>

                            </li>
                            <li>
                              <div className={cx('key')}>{item.location}</div>
                              <div className={cx('value')}>{item.viTri}</div>

                            </li>
                            <li>

                              <div className={cx('key')}>{item.education}</div>
                              <div className={cx('value')}>{item.school}</div>
                            </li>
                            <li>
                              <div className={cx('key')}>{item.joined}</div>
                              <div className={cx('value')}>{item.days}</div>

                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  >

                    <button>{item.name}</button>
                  </Tippy>
                  <span>for</span>
                  <a className={cx('title-inside')} href="">{item.nameMedium}</a>
                  <a className={cx("title-time")} href="">
                    <time dateTime="2024-03-08T06:06:56Z" title="Friday, March 8, 2024 at 1:06:56 PM" >{item.since}</time>
                  </a>
                </div>
              </div>
              <div className={cx('content')}>
                <a href="" className={cx('title')}>{item.title}</a>
                <div className={cx('tag')}>
                  <button>{item.tags}</button>
                  <button>{item.tags1}</button>
                  <button>{item.tags2}</button>
                  <button>{item.tags3}</button>
                </div>
                <div className={cx('title-footer')}>
                  <a href="">
                    <button className={cx('title-left-footer')} >
                      <div className={cx('title-icon-footer')}>
                        {item.iconComponent}
                        <span>{}</span>

                        <FontAwesomeIcon icon={item.iconHeart} />
                        <FontAwesomeIcon icon={item.iconHeart} />
                        <FontAwesomeIcon icon={item.iconHeart} />
                        <FontAwesomeIcon icon={item.iconHeart} />
                        <span>21 reactions</span>
                      </div>
                      <div className={cx('title-icon-footer-comment')}>
                        <FontAwesomeIcon icon={item.iconHeart} />
                        <span>10 comments</span>
                      </div>
                    </button>
                  </a>
                  <a href="">
                    <button>
                      <div className={cx('title-icon-footer')}>
                        <FontAwesomeIcon icon={item.iconHeart} />
                      </div>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default Home;