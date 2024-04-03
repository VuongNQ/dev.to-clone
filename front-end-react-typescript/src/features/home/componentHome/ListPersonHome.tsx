import { Person2 } from "./homets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from '@/styles/home.module.scss';

const cx = classNames.bind(styles);
function ListPersonContent() {
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
    </>
   );
}

export default ListPersonContent;