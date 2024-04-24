import classNames from "classnames/bind";
import styles from '../sidebar.module.scss';
import { IconTwitter, IconFacebook, IconGithub, IconInsTagram, IconTwitch, IconMastodon } from "../../../icons/icons";

const cx = classNames.bind(styles);
function SidebarButtonIcon() {
  return (
    <div className={cx('button-icon')} >
      <button>
        <IconTwitter />
      </button>
      <button>
        <IconFacebook />
      </button>
      <button>
        <IconGithub />
      </button>
      <button>
        <IconInsTagram />
      </button>
      <button>
        <IconTwitch />
      </button>
      <button>
        <IconMastodon />
      </button>
    </div>
  );
}

export default SidebarButtonIcon;