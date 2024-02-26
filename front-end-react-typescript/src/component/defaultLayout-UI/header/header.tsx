import classNames from "classnames/bind";
import styles from './header.module.scss';
import image from "@/assets/resized_logo_UQww2soKuUsjaOGNB38o.png";
import LoginAndAccount from "./loginAccount/loginAccout";

const cx = classNames.bind(styles);

const Header = ()  => {
    return (
        <header className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("header-search")}>
                    <img
                        className={cx("header-img")}
                        src={image}
                        alt="Logo"
                    />
                    <div className={cx("search")}>
                        <input
                            type="text"
                            aria-label="Search term"
                            placeholder="Search..."
                            className={cx("search-input")}
                        />
                    </div>
                </div>
                {/* <Link to='/boon'>
                    <Button variant={'primary'} >aaa</Button>
                </Link> */}
                <LoginAndAccount />
            </div>
        </header>
    )
}

export default Header;