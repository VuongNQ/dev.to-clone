import imagecontent from "@/assets/image/https___dev-to-uploads.s3.amazonaws.com_uploads_organization_profile_image_1_d908a186-5651-4a5a-9f76-15200bc6801f.avif";
import Button from "@/component/UI/GlobalStyle/button/button";
import DefaulLayout from "@/component/UI/GlobalStyle/defaultLayout.tsx/defaultLayout";
import GlobalStyles from "@/component/UI/GlobalStyle/GlobalStyles";
import { IconApple, IconEmail, IconForum, IconGithub, IconTwitter } from "@/component/UI/GlobalStyle/icons/icons";
import styles from '@/styles/admin.module.scss';
import stylesE from '@/styles/enter.module.scss';
import { EAppRouter } from "@/types/app";
import classNames from "classnames/bind";
import {
  MDBCard,
  MDBCardBody,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from 'mdb-react-ui-kit';
import { Link, Outlet, useLocation } from "react-router-dom";


const cx = classNames.bind(styles);
const cxe = classNames.bind(stylesE);
const Middleware = () => {
  const location = useLocation();
  if (location.pathname.includes(EAppRouter.admin)) {
    console.log("admin >>> check token login");
    return (
      <MDBContainer fluid>
        <MDBRow className={cx("d-flex justify-content-center align-items-center")}>
          <MDBCol col='12'>
            <MDBCard className={cx('bg-white my-5 mx-auto')} style={{ borderRadius: '1rem', maxWidth: '500px', border: "none", }}>
              <MDBCardBody className={cx(" w-100 d-flex flex-column hover-overlay")}>
                <div className={cx('header-title')}>
                  <img src={imagecontent} style={{ width: "min-content", height: "48px", borderRadius: '0.6rem' }} alt="" />
                  <h1>Join the DEV Community</h1>
                  <p>DEV Community is a community of 1,383,073 amazing developers</p>
                </div>
                {/* <button style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }} className={cx(" hover-overlay shadow-1-strong rounded square bg-transparent rounded  square border border-dark bg-transparent mb-5 d-flex w-100  p-3 radius-default items-center  registration_button-container  ")} data-mdb-ripple-init> */}
                <button type="submit" className={cx('rely')} >
                  <IconApple />
                  <span className={cx('w-100 flex fw-medium fs-s justify-center items-center self-center ')}>Continue with Apple</span>
                </button>
                <button type="submit" className={cx("rely")}>
                  <IconForum />
                  <span className={cx('w-100 flex fw-medium fs-s justify-center items-center self-center ')}>Continue with google</span>
                </button>
                <button type="submit" className={cx("rely")}>
                  <IconGithub />
                  <span className={cx('w-100 flex fw-medium fs-s justify-center items-center self-center ')}>Continue with Github</span>
                </button>
                <button type="submit" className={cx("rely")}>
                  <IconTwitter />
                  <span className={cx('w-100 flex fw-medium fs-s justify-center items-center self-center ')}>Continue with Twitter</span>
                </button>
                <hr />
                <p className={cx("text-white-50 mb-3")}>Please enter your login and password!</p>
                {/* form login */}
                <form action="">
                  <label htmlFor="">
                    Name
                  </label>
                  <MDBInput className={cx('input')} id='formControlLg' type='name' size="lg" />
                  <label htmlFor="email">
                    Email
                  </label>
                  <MDBInput className={cx('input')} id='formControlLg' type='email' size="lg" />
                  <label htmlFor="">
                    Password
                  </label>
                  <MDBInput className={cx('input')} id='formControlLg' type='password' size="lg" />
                  <div className={cx('checkbox-forgot')}>
                    <MDBCheckbox name='flexCheck' id='flexCheckDefault' className={cx("mb-4")} label='Remember password' />
                    <a href="">Forgot password</a>
                  </div>
                  <Button Follow="follow">Login</Button>
                </form>
                <div className={cx('footer-login')}>
                  <p className={cx('foot-title')}>
                    By signing in, you are agreeing to our <a href="">privacy policy, term of use</a> and <a href="">code of contact</a>
                  </p>
                </div>
                <hr className={cx("my-4")} />
                <div className={cx('footer-login')}>
                  <p className={cx('foot-title')}>
                    New to DEV Community?<a href="">Create</a> and <a href="">code of contact</a>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }
  if (location.pathname.includes(EAppRouter.enter)) {
    console.log("enter >> vào login ")
    return (
      <MDBContainer fluid>
        <MDBRow className={cxe("d-flex justify-content-center align-items-center")}>
          <MDBCol col='12'>
            <MDBCard className={cxe('bg-white my-5 mx-auto')} style={{ borderRadius: '1rem', maxWidth: '500px', border: "none", }}>
              <MDBCardBody className={cxe(" w-100 d-flex flex-column hover-overlay")}>
                <div className={cxe('header-title')}>
                  <img src={imagecontent} style={{ width: "min-content", height: "48px", borderRadius: '0.6rem' }} alt="" />
                  <h1>Join the DEV Community</h1>
                  <p>DEV Community is a community of 1,383,073 amazing developers</p>
                </div>
                {/* <button style={{ backgroundColor: 'rgba(251, 251, 251, 0.2)' }} className={cxe(" hover-overlay shadow-1-strong rounded square bg-transparent rounded  square border border-dark bg-transparent mb-5 d-flex w-100  p-3 radius-default items-center  registration_button-container  ")} data-mdb-ripple-init> */}
                <button type="submit" className={cxe('rely')} >
                  <IconApple />
                  <span className={cxe('w-100 flex fw-medium fs-s justify-center items-center self-center ')}>Continue with Apple</span>
                </button>
                <button type="submit" className={cxe("rely")}>
                  <IconForum />
                  <span className={cxe('w-100 flex fw-medium fs-s justify-center items-center self-center ')}>Continue with google</span>
                </button>
                <button type="submit" className={cxe("rely")}>
                  <IconGithub />
                  <span className={cxe('w-100 flex fw-medium fs-s justify-center items-center self-center ')}>Continue with Github</span>
                </button>
                <button type="submit" className={cxe("rely")}>
                  <IconTwitter />
                  <span className={cxe('w-100 flex fw-medium fs-s justify-center items-center self-center ')}>Continue with Twitter</span>
                </button>
                <form action="">

                  <button type="submit" className={cxe("rely")}>
                    <IconEmail />
                    <span className={cxe('w-100 flex fw-medium fs-s justify-center items-center self-center ')}>Continue with Email</span>
                  </button>
                </form>
                <hr />
                <p className={cxe("text-white-50 mb-3")}>Please enter your login and password!</p>
                <div className={cxe('footer-login')}>
                  <p className={cxe('foot-title')}>
                    By signing in, you are agreeing to our <a href="">privacy policy, term of use</a> and <a href="">code of contact</a>
                  </p>
                </div>
                <hr className={cxe("my-4")} />
                <div className={cxe('footer-login')}>
                  <p className={cxe('foot-title')}>
                    Already have an account?
                    <Link to={EAppRouter.admin} >Log in</Link>
                  </p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }

  return (
    <GlobalStyles>
      <DefaulLayout>
        <Outlet />
      </DefaulLayout>
    </GlobalStyles>
  );
};

export default Middleware;
