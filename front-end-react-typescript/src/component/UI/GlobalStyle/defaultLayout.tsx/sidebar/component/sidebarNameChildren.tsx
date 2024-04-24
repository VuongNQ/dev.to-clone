import LoginAndAccount from "../../loginAccount/loginAccout";
import classNames from "classnames/bind";
import styles from '../sidebar.module.scss';
import { SideBarName } from "../type/sidebarType";
const cx = classNames.bind(styles);

function SideBarNameChildren() {
  return (
      <div className={cx('inner')}>
        {
          SideBarName.map((item, index) => {
            return (
              <div key={index} >
                <h2>{item.name}</h2>
                <p>{item.title}</p>
              </div>
            )
          })
        }
        <LoginAndAccount />
    </div>
  );
}

export default SideBarNameChildren;