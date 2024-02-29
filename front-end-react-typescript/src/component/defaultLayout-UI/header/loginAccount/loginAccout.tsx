import classNames from "classnames/bind";
import styles from './loginAccount.module.scss';
const cx = classNames.bind(styles);

function LoginAndAccount() {
    return (
        <div className={cx("login-Account")}>
            <button className={cx("left")}>Log in</button>
            <button className={cx("right")}>Create account</button>
        </div>
    );
}

export default LoginAndAccount;