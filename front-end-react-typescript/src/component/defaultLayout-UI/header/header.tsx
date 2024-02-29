import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import myImage from '@/assets/image/resized_logo_UQww2soKuUsjaOGNB38o.png';
import classNames from 'classnames/bind';
import styles from './header.module.scss';
import LoginAndAccount from './loginAccount/loginAccout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faYenSign } from '@fortawesome/free-solid-svg-icons'

const cx = classNames.bind(styles);

function Header() {
  return (
    <div className={cx('topbar')}>
      <div className={cx('container')}>
        {['md',].map((expand) => (
          <Navbar key={expand} expand={expand} className="">
            <Container fluid>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Brand>
                <img className={cx('header-img')} src={myImage} alt="logo" />
              </Navbar.Brand>
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Offcanvas
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  {/* Form Header */}
                  <div className={cx('header-search')}>
                    <input type="text" className={cx('search-input')} />
                    <button className={cx('button-search')}>
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                  </div>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
              <LoginAndAccount />
            </Container>
          </Navbar>
        ))}
      </div>
    </div>
  );
}

export default Header;