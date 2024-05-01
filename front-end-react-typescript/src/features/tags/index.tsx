import classNames from "classnames/bind";
import styles from '@/styles/tags.module.scss';
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "@/component/UI/GlobalStyle/button/button";
import { ListTags } from "./type/tags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { EAppRouter } from "@/types/app";
import { ListPodcastsFour } from "../podcatsts/type/podcasts";

const cx = classNames.bind(styles);

function Tags() {
    return (
        <Container style={{ marginTop: "5rem" }}>
            <Row xl={10} lg={5} md={10} xs={12} className={cx('Tag-Filter')}>
                <Col className={cx("Tag-left")}>
                    <h1>Tags</h1>
                </Col>
                <Col className={cx('Tag-right')}>
                    <Button tagButton="tagButton">Following tags</Button>
                    <Button tagButton="tagButton">Hidden tags </Button>
                    <div className={cx('Search-Result')}>
                        <input type="text" className={cx('search')} placeholder="Search for tag" />
                        {/* Search icon */}
                        <button>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </Col>
            </Row>
            <Row xl={4} lg={3} md={2} xs={1} className={cx('listTags')} >
                {ListTags.map((item, index) => {
                    return (
                        <Col key={index}>
                            <div className={cx("inner-Tag")}>
                                <div className={cx("ful-Tag")}>
                                    <div className={cx("tag-view")}>
                                        <h4>
                                            <a href="">{item.tag}</a>
                                        </h4>
                                        <span>{item.number} posts</span>
                                    </div>
                                    <div className={cx('tag-title')}>
                                        <p>{item.content}</p>
                                    </div>
                                </div>
                                <div className={cx('tag-button')}>
                                    <Button followTag="followtag" >{item.follow}</Button>
                                    <Button hideTag="hideTag" >{item.hide}</Button>
                                </div>
                            </div>
                        </Col>
                    )
                })}
            </Row>
            <Row style={{ width: "100%" }} >
                <Col className={cx("podcasts-footer")}>
                    <Link to={EAppRouter.root}>
                        <a href="">DEV Community</a>-- A constructive and inclusive social network for software developers. With you every step of your journey.
                    </Link>
                    <ul className={cx('footer')}>
                        {
                            ListPodcastsFour.map((item, index) => {
                                return (
                                    <li key={index} >
                                        <a href="">
                                            {item.title}
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className={cx(('footer-close'))}>
                        <span>
                            Built on <a href="">Forem -- </a> the <a href="">open source </a>
                            software that powers <a href="">DEV</a> and other inclusive
                            communities.
                        </span>
                        <p>
                            Made with love and <a href=""> Ruby on Rails. </a>
                            DEV Community © 2016 - 2024.
                        </p>
                    </div>
                </Col>
            </Row >
        </Container>
    );
}

export default Tags;