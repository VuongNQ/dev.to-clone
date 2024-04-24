import classNames from "classnames/bind";
import styles from '../sidebar.module.scss';
import { IconsTags } from "../type/sidebarType";

const cx = classNames.bind(styles);

function SidebarIconTags() {
  return ( 
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
   );
}

export default SidebarIconTags;