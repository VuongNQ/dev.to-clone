import classNames from 'classnames/bind';
import styles from '@/styles/header.module.scss';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/esm/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import myImage from '@/assets/image/resized_logo_UQww2soKuUsjaOGNB38o.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoginAndAccount from '../../loginAccount/loginAccout';

const cx = classNames.bind(styles);

function HeaderNavbar() {
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

export default HeaderNavbar;