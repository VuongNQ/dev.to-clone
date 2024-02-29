import classNames from "classnames/bind";
import styles from './sidebar.module.scss';
import LoginAndAccount from "../header/loginAccount/loginAccout";
import { SbarType } from "./sidebarType";
const cx = classNames.bind(styles);

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
         </div>
      </>
   )
}