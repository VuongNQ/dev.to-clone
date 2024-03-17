import classNames from "classnames/bind";
import styles from './home.module.scss';
import { Link } from "react-router-dom";
import routes from "@/config/routes";
import ImageContentHome from "@/assets/image/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_ko14fygno7jgvo7gz8k9.gif";
import { List } from "./homets";
import { IconHeart } from "@/component/component-children/icons/icons";
const cx = classNames.bind(styles);



function Home() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx('header-content')}>
                <button className={cx('button-content')}>Relavant</button>
                <Link to={routes.latest}>
                    <button className={cx('button-content')}>Latest</button>
                </Link>
                <button className={cx('button-content')}>Top</button>
            </div>
            <img className={cx('image-top')} src={ImageContentHome} alt="image header" />
            {
                List.map(item => {
                    return (
                        <>{
                            item.type.Person.map((item, index) => {
                                return (
                                    <div key={index} className={cx('img-title')}>
                                        <a href="">
                                            <img src={item.hinhanh} alt="" />
                                            <div className={cx('img-children')}>
                                                <img src={item.hinhanh1} alt="" />
                                            </div>
                                        </a>
                                        <div className={cx('title-separateName')}>
                                            <button>{item.name}</button>
                                            <p>for</p>
                                            <a href="">{item.nameMedium}</a>
                                            <a href="">
                                                <time dateTime="2024-03-08T06:06:56Z" title="Friday, March 8, 2024 at 1:06:56 PM" >{item.since}</time>
                                            </a>
                                        </div>
                                        <div className={cx('content')}>
                                            <h1>{item.title}</h1>
                                            <div className={cx('tag')}>
                                                  <p>{item.tags}</p>
                                                  <p>{item.tags1}</p>
                                                  <p>{item.tags2}</p>
                                                  <p>{item.tags3}</p>
                                            </div>
                                            <a href="">
                                                {item.sss}
                                            </a>
                                        </div>

                                    </div>
                                )
                            })
                        }</>
                    )
                })
            }
        </div>
    );
}

export default Home;