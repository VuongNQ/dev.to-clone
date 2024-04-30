import classNames from "classnames/bind";
import styles from '@/styles/tags.module.scss';
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "@/component/UI/GlobalStyle/button/button";
import { ListTags } from "./type/tags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
            <Row xl={4} lg={2} md={1} xs={1} className={cx('listTags')} >
                {ListTags.map((item, index) => {
                    return (
                        <Col className={cx("container-Tag")} key={index}>
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
                                <div className={cx('button')}>
                                    <Button variant="primary" >{item.follow}</Button>
                                    <Button headerButton="Relevant">{item.hide}</Button>
                                </div>
                            </div>
                        </Col>

                    )
                })}
            </Row>
        </Container>
    );
}

export default Tags;