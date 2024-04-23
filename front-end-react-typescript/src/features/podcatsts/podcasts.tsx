import Header from "@/component/UI/GlobalStyle/defaultLayout.tsx/header/header";
import styles from "./postcasts.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

function Podcasts() {
  return (
    <div className={cx('wrapper')}>
      <h1>Alo alo</h1>
      <Header />
    </div>
  );
}

export default Podcasts;