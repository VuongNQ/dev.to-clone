import classNames from "classnames/bind";
import styles from './about.module.scss';

const cx = classNames.bind(styles);

function About() {
    return (  
        <div className={cx('about-Wrapper')}>
            <h1>Xin chào About</h1>
        </div>
     );
}

export default About;