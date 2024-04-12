import classNames from "classnames/bind";
import styles from './loginAccount.module.scss';
import { Link } from "react-router-dom";
import { EAppRouter } from "@/types/app";
const cx = classNames.bind(styles);

function LoginAndAccount() {
    return (
        <div className={cx("login-Account")}>
            <Link to={EAppRouter.admin}>
            <button className={cx("left")}>Log in</button>
            </Link>
            <Link to={EAppRouter.enter}>
            <button className={cx("right")}>Create account</button>
            </Link>
        </div>
    );
}

export default LoginAndAccount;