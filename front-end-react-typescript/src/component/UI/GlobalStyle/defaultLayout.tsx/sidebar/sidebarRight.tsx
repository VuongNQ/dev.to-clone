/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from "classnames/bind";
import styles from "./sidebar.module.scss";
import { NumberTwo } from "./Right";
import { ESidebarRight } from "./Right";
const cx = classNames.bind(styles);
function SidebarRight() {
  const List = NumberTwo.flatMap((item) => (item.type.map((_i) => {
    return { ..._i }
  })));
  return (
    <>
      {List.map((item, index) => {
        return (
          <div key={index} className={cx('wrapper')}>
            <div className={cx('inner-right')}>
              <div className={cx('header-right')}>
                <a className={cx('name')} href="">{item.name}</a>
                <p className={cx('title')}>{item.title}</p>
                <a className={cx('nameless')} href="">
                  <p>{item.nameless}</p>
                  <div>0 comment</div>
                </a>
                <br />
                <a className={cx('nameless')} href="">
                  <p> {item.nameless1}</p>
                </a>
                <button className={cx('buttonNew')}>{item.buttonNew}</button>
                <br />
                <a className={cx('nameless')} href="">
                  <p>{item.nameless2}</p>
                </a>
                <button className={cx('buttonNew')}>{item.buttonNew}</button>
                <br />
              </div>
            </div>
            <div className={cx('header-right-content')}>
              <h4>{ESidebarRight.name}</h4>
              <button>{ESidebarRight.title}</button>
              <button>{ESidebarRight.title1}</button>
              <button>{ESidebarRight.title2}</button>
              <button>{ESidebarRight.title3}</button>
              <button>{ESidebarRight.title4}</button>
              <button>{ESidebarRight.title5}</button>
              <button>{ESidebarRight.title6}</button>
              <button>{ESidebarRight.title7}</button>
              <button>{ESidebarRight.title8}</button>
              <button>{ESidebarRight.title9}</button>
              <button>{ESidebarRight.title10}</button>
              <button>{ESidebarRight.title11}</button>
              <button>{ESidebarRight.title12}</button>
              <button>{ESidebarRight.title13}</button>
              <button>{ESidebarRight.title14}</button>
              <button>{ESidebarRight.title15}</button>
              <button>{ESidebarRight.title16}</button>
              <button>{ESidebarRight.title17}</button>
              <button>{ESidebarRight.title18}</button>
              <br />
            </div>
            <div className={cx('header-right-bottom')}>
              <h4>{ESidebarRight.name1}</h4>
              <button>{ESidebarRight.title19}</button>
              <button>{ESidebarRight.title20}</button>
              <button>{ESidebarRight.title21}</button>
              <button>{ESidebarRight.title22}</button>
              <button>{ESidebarRight.title23}</button>
              <button>{ESidebarRight.title24}</button>
              <button>{ESidebarRight.title25}</button>
              <button>{ESidebarRight.title26}</button>
              <button>{ESidebarRight.title27}</button>
              <button>{ESidebarRight.title28}</button>
              <button>{ESidebarRight.title29}</button>
              <button>{ESidebarRight.title30}</button>
              <button>{ESidebarRight.title31}</button>
              <button>{ESidebarRight.title32}</button>
              <button>{ESidebarRight.title33}</button>
              <button>{ESidebarRight.title34}</button>
              <button>{ESidebarRight.title35}</button>
              <button>{ESidebarRight.title36}</button>
              <button>{ESidebarRight.title37}</button>
              <br />
            </div>
          </div>
        )
      })}
    </>
  )

}

export default SidebarRight;