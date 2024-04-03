import { EIcons, IconComment, IconFuture } from "@/component/UI/GlobalStyle/icons/icons";
import { List } from "./homets";
import Tippy from '@tippyjs/react/headless';
import classNames from "classnames/bind";
import styles from '@/styles/home.module.scss';

import Button from "@/component/UI/GlobalStyle/button/button";


const cx = classNames.bind(styles);
const ListHome = () => {
  const ListNew = List.flatMap((item) => (item.type.map((i) => {
    const iconComponent = (() => {
      switch (i.iconEnum) {
        case EIcons.IconComment:
          return <IconComment />;
        default:
          return <IconFuture />;
      }
    })();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return { ...i, iconComponent }
  })));
  return (
    <div>
    {
      ListNew.map((item, index) => {
        return (
          <div key={index} className={cx('header-title')}>
            <div className={cx("inner")}>
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
                  <Button pink="pink">{item.tagThan}
                    <span>{item.tags}</span>
                  </Button>
                  <Button OceanBlue="OceanBlue" >
                    {item.tagThan}
                    <span>{item.tags1}</span>
                  </Button>
                  <Button yellow="yellow">
                    {item.tagThan}
                    <span> {item.tags2}</span>
                  </Button>
                  <Button green="green" >
                    {item.tagThan}
                    <span>{item.tags3}</span>
                  </Button>
                </div>
                <div className={cx('title-footer')}>
                  <a href="" className={cx('title-link-One')} >
                    <button className={cx('title-left-footer')} >
                      <div className={cx('title-icon-footer')}>
                        <span className={cx('IconFull')}>
                          <span>
                            <img src={item.iconReactionOne} alt="" />
                          </span>
                          <span>
                            <img src={item.iconReactionTwo} alt="" />
                          </span>
                          <span>
                            <img src={item.iconReactionThree} alt="" />
                          </span>
                          <span>
                            <img src={item.iconReactionFour} alt="" />
                          </span>
                          <span>
                            <img src={item.iconReactionFive} alt="" />
                          </span>
                        </span>
                        <span className={cx('title-reactions')} >21 reactions</span>
                      </div>
                    </button>
                  </a>
                  <a href="" className={cx('title-link-Two')} >
                    <button>
                      <div className={cx('title-icon-footer-comment')}>
                        <span className={cx('icon-reaction-comment')}>
                          {item.iconComponent}
                        </span>
                        <span>5 comments</span>
                      </div>
                    </button>
                  </a>
                  <a href="" className={cx('title-link-Three')}>
                    <div className={cx('title-icon-footer')}>
                      <span>1 min read</span>
                      <span className={cx('icon-future')}>
                        <IconFuture />
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )
      })
    }
    </div>
  )
}
export default ListHome;