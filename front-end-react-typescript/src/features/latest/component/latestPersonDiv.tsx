import { Person2 } from "../type/latest";
import classNames from "classnames/bind";
import styles from "@/styles/latest.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListTheDiv } from "../type/latest";
import Button from "@/component/UI/GlobalStyle/button/button";
const cx = classNames.bind(styles);
function LatestPersonDiv() {
  return ( 
    <>
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
                {
                  ListTheDiv.map((i, index) => {
                    return (
                      <div key={index} className={cx('avatar')}>
                        <div className={cx('inner-avatar')} >
                          <img className={cx('imgAvatar')} src={i.image} alt="" />
                          <div className={cx("title-span")}>
                            <p className={cx('title-father')} >{i.title}</p>
                            <p className={cx('title-children')} >{i.titleSpan}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
                <a href="">
                  <Button variant="primary">Explore The Top 7 Posts of the Week</Button>
                </a>
              </div>
            </div>
          </div>
        )
      })
    }
    </>
   );
}

export default LatestPersonDiv;