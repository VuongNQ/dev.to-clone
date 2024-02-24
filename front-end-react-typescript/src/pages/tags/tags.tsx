import classNames from "classnames/bind";
import styles from './tags.module.scss';

const cx = classNames.bind(styles);

function Tags() {
    return (  
        <div className={cx('tags-Wrapper')}>
            <h1>Xin chào tags</h1>
        </div>
     );
}

export default Tags;