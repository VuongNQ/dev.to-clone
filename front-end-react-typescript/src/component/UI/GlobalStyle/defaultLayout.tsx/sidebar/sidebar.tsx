import Button from "@/component/UI/GlobalStyle/button/button";
import {
   EIcons,
   IconFacebook, IconGithub,
   IconInsTagram,
   IconMastodon, Icons1, Icons2, Icons3, Icons4, Icons5, Icons6, Icons7, Icons8, Icons9, IconsOther1, IconsOther2, IconsOther3, IconTwitch,
   IconTwitter
} from "@/component/UI/GlobalStyle/icons/icons";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from '@tippyjs/react/headless';
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import LoginAndAccount from "../loginAccount/loginAccout";
import styles from './sidebar.module.scss';
import { IconsTags, IconsTypeChildren, IconsTypeOther, NewDallad, SideBarName } from "./sidebarType";
const cx = classNames.bind(styles);


export const SiderBarType = () => {
   const ListBar = IconsTypeChildren.map((item) => {
      const iconCom = (() => {
         switch (item.icon) {
            case EIcons.Icons1:
               return <Icons1 />
            case EIcons.Icons2:
               return <Icons2 />;
            case EIcons.Icons3:
               return <Icons3 />;
            case EIcons.Icons4:
               return <Icons4 />;
            case EIcons.Icons5:
               return <Icons5 />;
            case EIcons.Icons6:
               return <Icons6 />;
            case EIcons.Icons7:
               return <Icons7 />;
            case EIcons.Icons8:
               return <Icons8 />;
            case EIcons.Icons9:
               return <Icons9 />;
            default:
               return;
         }
      })();
      return { ...item, iconCom }
   })
   const ListOther = IconsTypeOther.map((item) => {
      const IconOther = (() => {
         switch (item.icon) {
            case EIcons.IconsOther1:
               return <IconsOther1 />;
            case EIcons.IconsOther2:
               return <IconsOther2 />;
            case EIcons.IconsOther3:
               return <IconsOther3 />;
            default:
               return;
         }
      })();
      return { ...item, IconOther }
   })
   return (
      <>
         <div className={cx('wrapper')}>
            <div className={cx('inner')}>
               {
                  SideBarName.map((item, index) => {
                     return (
                        <div key={index} >
                           <h2>{item.name}</h2>
                           <p>{item.title}</p>
                        </div>
                     )
                  })
               }
               <LoginAndAccount />
            </div>
            <aside className={cx('aside')} >
               {
                  ListBar.map((item, index) => {
                     return (
                        <Link key={index} className={cx('sidebar-icon')} to={item.to}>
                           <p>
                              {item.iconCom}
                           </p>
                           <p>
                              {item.title}
                           </p>
                        </Link>
                     )
                  })
               }
            </aside >
            <aside className={cx('aside')} >
               <strong>Other</strong>
               {
                  ListOther.map((item, index) => {
                     return (
                        <Link to={item.to} key={index} className={cx('sidebar-icon')} >
                           <p>
                              {item.IconOther}
                           </p>
                           <p>
                              {item.title}
                           </p>
                        </Link>
                     )
                  })
               }
            </aside>
            <div className={cx('button-icon')} >
               <button>
                  <IconTwitter width="2.4rem" height="2.4rem" />
               </button>
               <button>
                  <IconFacebook width="2.4rem" height="2.4rem" />
               </button>
               <button>
                  <IconGithub width="2.4rem" height="2.4rem" />
               </button>
               <button>
                  <IconInsTagram width="2.4rem" height="2.4rem" />
               </button>
               <button>
                  <IconTwitch width="2.4rem" height="2.4rem" />
               </button>
               <button>
                  <IconMastodon width="2.4rem" height="2.4rem" />
               </button>
            </div>
            <aside className={cx('aside-Popular')} >
               <strong>Popular Tags</strong>
               {
                  IconsTags.map((item, index) => {
                     return (
                        <div className={cx('sidebar-icon-Popular')} key={index}>
                           <p>
                              {item.tag}
                           </p>
                           <p>
                              {item.title}
                           </p>
                        </div>
                     )
                  })
               }
            </aside>
            <div className={cx("sidebar-community")}>
               <div className={cx('sidebar-header-community')}>
                  <p>DEV Community</p>
                  <Tippy
                     interactive
                     placement="bottom-end"
                     trigger="click"
                     render={attrs => (
                        <div className={cx('siderbarTippy')} tabIndex={-1} {...attrs} >
                           {NewDallad.map((item, index) => {
                              return (
                                 <div className={cx('wrapperTippy')} key={index}>
                                    <p className={cx('sidebarTippy-icon')}>{item.icon}</p>
                                    <p className={cx('sidebarTippy-title')}>{item.title}</p>
                                 </div>
                              )
                           })}
                        </div>
                     )}
                  >
                     <button>
                        <FontAwesomeIcon icon={faEllipsisH} />
                     </button>
                  </Tippy>
               </div>
               <h2>Easiest way to help the DEV community feel more like a community?</h2>
               <p>
                  Delve into our badge page and start building your collection of badges that celebrate your contributions to the community. Ready to showcase your skills?
               </p>
               <Button variant="primary">Need we say more</Button>
            </div>
            <div className={cx('footer-sidebar')} >
               <p >
                  <a href="" className={cx('footer-DEV')}>DEV Community </a>
                  A constructive and inclusive social network
                  for software developers. With you every step of
                  your journey
               </p>
               <p className={cx('mt-4')}>
                  Built on <a href="">Forem </a>
                  -- the <a href="">open source </a>
                  software that powers <a href="">DEV </a>
                  and other inclusive communities
               </p>
               <p className={cx('mt-4')}>
                  Made with love and <a href="">Ruby on Rails. </a>
                  DEV Community  © 2016 - 2024.
               </p>
            </div>
         </div >
      </>
   )
}