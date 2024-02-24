import classNames from "classnames/bind";
import styles from './home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return (  
        <div className={cx('Home-Wrapper')}>
            <h1>Xin chào Home</h1>
        </div>
     );
}

export default Home;