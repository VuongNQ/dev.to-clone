import Button from "@/component/UI/GlobalStyle/button/button";
import classNames from "classnames/bind";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "../podcasts.module.scss";
import { ListPodcastsFour, ListPodcastsOne, ListPodcastsThree, ListPodcastsTwo } from "../type/podcasts";
import { Link } from "react-router-dom";
import { EAppRouter } from "@/types/app";

const cx = classNames.bind(styles);

function ListPodcasts() {
  return (
    <>
      <Row className={cx("heading-title-podcasts")} lg={12}>
        <Col className={cx("podcasts")}>
          <h1>Podcasts</h1>
        </Col>
        <Col style={{ display: "flex", justifyContent: "end" }} >
          <Button variant="primary">Suggest a Podcasts</Button>
        </Col>
      </Row>
      <Row className={cx('heading-episodes')} lg={12} >
        <Col>
          <h2>Latest episodes</h2>
        </Col>
      </Row>
      <Row xl={5} lg={4} md={3} sm={2} xs={1}>
        {
          ListPodcastsOne.map((item, index) => {
            return (
              <div key={index}>
                <Col>
                  <div className={cx('podcasts-date')}>
                    <img src={item.image} />
                    <div className={cx('title')}>
                      <h3>{item.title}</h3>
                      <span>{item.titleDate}</span>
                    </div>
                  </div>
                </Col>
              </div>

            )
          })
        }
      </Row>
      <h1 style={{ fontWeight: "700" }}>Featured shows</h1>
      <Row lg={3} md={2} xs={1}>
        {
          ListPodcastsTwo.map((item, index) => {
            return (
              <>
                <Col >
                  <div key={index} className={cx('podcasts-Two')}>
                    <img src={item.image} alt="" />
                    <h3>{item.footer}</h3>
                  </div>
                </Col>
              </>
            )
          })
        }
      </Row>
      <h2 style={{ fontWeight: "700" }}>Browse</h2>
      <Row lg={4} md={3} sm={2} xs={1} className={cx('podcasts-Browse')}>
        {
          ListPodcastsThree.map((item, index) => {
            return (
              <Col key={index}>
                <div className={cx('podcasts-introduce')}>
                  <img src={item.image} />
                  <span>{item.title}</span>
                </div>
              </Col>
            )
          })
        }
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
                  <li  key={index} >
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
    </>
  );
}

export default ListPodcasts;