import top from '@/assets/image/hình ảnh bên Top.jpg';
import topTwo from '@/assets/image/image top two.avif';
import topThree from '@/assets/image/toptwp.avif';
import Button from "@/component/UI/GlobalStyle/button/button";
import { EIcons, IconComment, IconFuture } from "@/component/UI/GlobalStyle/icons/icons";
import styles from '@/styles/top.module.scss';
import { EAppRouter } from "@/types/app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from '@tippyjs/react/headless';
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { List, Person2 } from "./top";

const cx = classNames.bind(styles);


function Top() {
  const ListNew = List.flatMap((item) => (item.type.map((i) => {
    const iconComponent = (() => {
      switch (i.iconEnum) {
        case EIcons.IconComment:
          return <IconComment />;
        default:
          return <IconFuture />;
      }
    })();
    return { ...i, iconComponent }
  })));

  return (
    <div className={cx("wrapper")}>
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
      <div className={cx('img-top')}>
        <img src={topTwo} style={{ width: "100%", borderRadius: "6px" }} alt="hinh anh top two" />
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
                                <img className={cx('image-Tippy')} src={item.hinhanh1} alt="" />
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
                            <span className={cx('title-reactions')}>21 reactions</span>
                          </div>
                        </button>
                      </a>
                      <a href="" className={cx('title-link-Two')} >
                        <button>
                          <div className={cx('title-icon-footer-comment')}>
                            <span className={cx('icon-reaction-comment')}>
                              {item.iconComponent}
                            </span>
                            <span>Add comment</span>
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
      {
        Person2.map((item, index) => {
          return (
            <div className={cx('header-title')} key={index}>
              <div className={cx('inner')} >
                <div className={cx('header-icon')}>
                  <p>{item.name}</p>
                  <button>
                    <FontAwesomeIcon icon={item.icons} />
                  </button>
                </div>
                <div className={cx('content-community')}>
                  <img src={item.image} alt="" />
                  <h3>{item.content}</h3>
                  <p>{item.contentchidlrenOne}</p>
                  <p>{item.contentchildrenTwo}</p>
                  <a className={cx('tag-link')} href="">{item.tags}</a>
                  <p>{item.iconsTitle}</p>
                </div>
              </div>
            </div>
          )
        })
      }
      {
        Person2.map((item, index) => {
          return (
            <div className={cx('header-title')} key={index}>
              <div className={cx('inner')} >
                <div className={cx('header-icon')}>
                  <p>{item.name}</p>
                  <button>
                    <FontAwesomeIcon icon={item.icons} />
                  </button>
                </div>
                <div className={cx('content-community')}>
                  <p className={cx('content-highlights')}>{item.name2}</p>
                  <p className={cx('content-link')} >Check out the <a className={cx("link")} href="">{item.week2}</a> for inspiration and discover leading voices in the community! </p>
                  <p>{item.introduce2}</p>
                      <img className={cx('imgAvatar')} src={topThree} alt="" />
                  <a href="">
                    <Button variant="primary">Earn Your Very Own Writing Streak Badge!</Button>
                  </a>
                </div>
              </div>
            </div>
          )
        })
      }
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
  );
}

export default Top;