import classNames from "classnames/bind";
import styles from '../sidebar.module.scss';
import { Link } from "react-router-dom";
import { ListBar, ListOther } from "../handleType/handleType";

const cx = classNames.bind(styles);

function SidebarOtherBar() {
  return (
    <>
      <aside className={cx('aside')} >
        {
          ListBar.map((item, index) => {
            return (
              <Link key={index} className={cx('sidebar-icon')} to={item.to}>
                <p>
                  {item.iconCom}
                </p>
                <p>
                  {item.title}
                </p>
              </Link>
            )
          })
        }
      </aside >
      <aside className={cx('aside')} >
        <strong>Other</strong>
        {
          ListOther.map((item, index) => {
            return (
              <Link to={item.to} key={index} className={cx('sidebar-icon')} >
                <p>
                  {item.IconOther}
                </p>
                <p>
                  {item.title}
                </p>
              </Link>
            )
          })
        }
      </aside>
    </>
  );
}

export default SidebarOtherBar;