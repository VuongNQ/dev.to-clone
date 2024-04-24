import classNames from "classnames/bind";
import styles from '../sidebar.module.scss';
import Tippy from "@tippyjs/react/headless";
import { NewDallad } from "../type/sidebarType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../button/button";

const cx = classNames.bind(styles);

function SidebarCommunity() {
  return (
    <div className={cx("sidebar-community")}>
      <div className={cx('sidebar-header-community')}>
        <p>DEV Community</p>
        <Tippy
          interactive
          placement="bottom-end"
          trigger="click"
          render={attrs => (
            <div className={cx('siderbarTippy')} tabIndex={-1} {...attrs} >
              {NewDallad.map((item, index) => {
                return (
                  <div className={cx('wrapperTippy')} key={index}>
                    <p className={cx('sidebarTippy-icon')}>{item.icon}</p>
                    <p className={cx('sidebarTippy-title')}>{item.title}</p>
                  </div>
                )
              })}
            </div>
          )}
        >
          <button>
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>
        </Tippy>
      </div>
      <h2>Easiest way to help the DEV community feel more like a community?</h2>
      <p>
        Delve into our badge page and start building your collection of badges that celebrate your contributions to the community. Ready to showcase your skills?
      </p>
      <Button variant="primary">Need we say more</Button>
    </div>
  );
}

export default SidebarCommunity;