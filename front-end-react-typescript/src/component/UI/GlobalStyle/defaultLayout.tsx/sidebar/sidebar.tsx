import classNames from "classnames/bind";
import styles from './sidebar.module.scss';
import LoginAndAccount from "../loginAccount/loginAccout";
import { SbarType } from "./sidebarType";
import {
   IconFacebook, IconGithub
   , IconInsTagram,
   IconMastodon, IconTwitch,
   IconTwitter
} from "@/component/UI/GlobalStyle/icons/icons";
import Button from "@/component/UI/GlobalStyle/button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import Tippy from '@tippyjs/react/headless';

const cx = classNames.bind(styles);

const NewDallad = [
   {
      id: 0,
      icon: <IconFacebook width="2.4rem" height="2.4rem" />,
      title: "What's a billboard?"
   },
   {
      id: 1,
      icon: <IconGithub width="2.4rem" height="2.4rem" />,
      title: "Manage preferences"
   },
   {
      id: 2,
      icon: <IconInsTagram width="2.4rem" height="2.4rem" />,
      title: "Report billbloard"
   }

]

export const SiderBarType = (props: SbarType) => {
   return (
      <>
         <div className={cx('wrapper')}>
            <div className={cx('inner')}>
               <h2>{props.names.name}</h2>
               <p>{props.names.title}</p>
               <LoginAndAccount />
            </div>
            <aside className={cx('aside')} >
               {
                  props.icons.map((item, index) => {
                     return (
                        <div className={cx('sidebar-icon')} key={index}>
                           <p>
                              {item.icon}
                           </p>
                           <p>
                              {item.title}
                           </p>
                        </div>
                     )
                  })
               }
            </aside>
            <aside className={cx('aside')} >
               <strong>Other</strong>
               {
                  props.other.map((item, index) => {
                     return (
                        <div className={cx('sidebar-icon')} key={index}>
                           <p>
                              {item.icon}
                           </p>
                           <p>
                              {item.title}
                           </p>
                        </div>
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
                  props.tag.map((item, index) => {
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
         </div>
      </>
   )
}