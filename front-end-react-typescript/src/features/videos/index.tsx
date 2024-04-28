import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import classNames from "classnames/bind";
import styles from "@/styles/videos.module.scss";
import Container from "react-bootstrap/esm/Container";
import { ListVideo } from "./type/video";
import { EAppRouter } from "@/types/app";
import { Link } from "react-router-dom";
import { ListPodcastsFour } from "../podcatsts/type/podcasts";

const cx = classNames.bind(styles);
function Videos() {
  return (
    <>
      <Container>
        <h1 style={{ marginTop: "2rem" ,fontWeight: "700" }}>Featured shows</h1>
        <Row xl={3} lg={3} md={2} xs={1}>
          {
            ListVideo.map((item, index) => {
              return (
                <>
                  <Col className={cx('Video')} >
                    <iframe src={item.video} title={item.titleVideo} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    <div key={index} className={cx('Video-Full')}>
                      <h3>{item.title}</h3>
                      <span>{item.tags}</span>
                    </div>
                  </Col>
                </>
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
      </Container>
    </>
  );
}

export default Videos;