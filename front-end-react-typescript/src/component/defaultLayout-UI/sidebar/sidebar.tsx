import classNames from "classnames/bind";
import styles from './sidebar.module.scss';
import LoginAndAccount from "../header/loginAccount/loginAccout";
import { SbarType } from "./sidebarType";
import {
   IconFacebook, IconGithub
   , IconInsTagram,
   IconMastodon, IconTwitch,
   IconTwitter
} from "@/component/component-children/icons/icons";
import Button from "@/component/component-children/button/button";
import { SidebarTippy } from "./sidebarTippy";
import Tippy from "@tippyjs/react";

const cx = classNames.bind(styles);

const NewDallad = [
   {
      id: 0,
      icon: <IconFacebook width="2.4rem" height="2.4rem" />,
      title: "What's a billboard?"
   },
   {
      id: 1,
      icon: <IconGithub width="2.4rem" height="2.4rem"/>,
      title: "Manage preferences"
   },
   {
      id: 2,
      icon: <IconInsTagram width="2.4rem" height="2.4rem"/>,
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
            <aside className={cx('aside')} >
               <strong>Popular Tags</strong>
               {
                  props.tag.map((item, index) => {
                     return (
                        <div className={cx('sidebar-icon')} key={index}>
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
                  <SidebarTippy trigger="click" tippy={NewDallad}>
                     <Tippy hideOnClick="toggle" />
                  </SidebarTippy>
               </div>
               <h2>Easiest way to help the DEV community feel more like a community?</h2>
               <p>
                  Delve into our badge page and start building your collection of badges that celebrate your contributions to the community. Ready to showcase your skills?
               </p>
               <Button variant="primary">Need we say more</Button>
            </div>
         </div>
      </>
   )
}