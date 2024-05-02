import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import classNames from "classnames/bind";
import styles from '../../styles/help.module.scss';
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import { ListHelp } from "./type/help";
import { EAppRouter } from "@/types/app";
import { ListPodcastsFour } from "../podcatsts/type/podcasts";

const cx = classNames.bind(styles);

function Help() {
  return (
    <div style={{ backgroundColor: "#fff" }}>
    <Container style={{ marginTop: "4rem" }}>
      <Row>
        <Col className={cx('header-help')}>
          <h1>DEV Help</h1>
          <p>The latest help documentation, tips and tricks from the DEV Community</p>
        </Col>
      </Row>
      <Row xl={3} lg={2} md={2} sm={12} xs={12}>
        {ListHelp.map((item, index) => {
          return (
            <Link key={index} to={item.to}>
              <Col className={cx('content-help')}>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
              </Col>
            </Link>
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
    </div>
  );
}

export default Help;