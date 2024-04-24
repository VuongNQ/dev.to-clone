import classNames from "classnames/bind";
import styles from '../sidebar.module.scss';

const cx = classNames.bind(styles);

function SidebarFooter() {
  return (
    <div className={cx('footer-sidebar')} >
      <p >
        <a href="" className={cx('footer-DEV')}>DEV Community </a>
        A constructive and inclusive social network
        for software developers. With you every step of
        your journey
      </p>
      <p className={cx('mt-4')}>
        Built on <a href="">Forem </a>
        -- the <a href="">open source </a>
        software that powers <a href="">DEV </a>
        and other inclusive communities
      </p>
      <p className={cx('mt-4')}>
        Made with love and <a href="">Ruby on Rails. </a>
        DEV Community  © 2016 - 2024.
      </p>
    </div>
  );
}

export default SidebarFooter;