import Header from "@/component/UI/GlobalStyle/defaultLayout.tsx/header";
import styles from "@/styles/podcasts.module.scss";
import classNames from "classnames/bind";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "@/component/UI/GlobalStyle/button/button";
const cx = classNames.bind(styles)



function Podcasts() {
  return (
    <>
      <Header />
      <Container>
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
        <Row lg={5} md={3} xs={1}>
          <Col>
            <div className={cx('podcasts-date')}>
              <img />
              <h3>Make a Project, Get a Job w/ Puru</h3>
              <span>HTML All The Things Podcast, Apr 11
              </span>
            </div>
          </Col>
          <Col>
            <div className={cx('podcasts-date')}>
              <img />
              <h3>Glauber Costa from Turso</h3>
              <span>Scaling DevTools, Apr 11</span>
            </div>
          </Col>
          <Col>
            <div className={cx('podcasts-date')}>
              <img />
              <h3>Ep. 46: Matt Genovese, CEO and Founder of Planorama</h3>
              <span>The Frontier Podcasts, Apr 11</span>
            </div>
          </Col>
          <Col>
            <div className={cx('podcasts-date')}>
              <img />
              <h3>Rust in the Cosmos: Decoding Communication Part I (Ep. 254)</h3>
              <span>Data Scien at Home , Apr 11</span>
            </div>
          </Col>
          <Col>
            <div className={cx('podcasts-date')}>
              <img />
              <h3>Authlete and Making OAuth Accessible with Justin Richer</h3>
              <span>Software Engineering Daily, Apr 11</span>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Podcasts;