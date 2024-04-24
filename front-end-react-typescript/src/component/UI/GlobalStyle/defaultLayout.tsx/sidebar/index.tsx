import SidebarButtonIcon from "./component/sidebarButtonIcon";
import SidebarIconTags from "./component/sidebarIcontags";
import SideBarNameChildren from "./component/sidebarNameChildren";
import SidebarOtherBar from "./component/sidebarOtherBar";
import SidebarCommunity from "./component/sidebarCommunity";
import SidebarFooter from "./component/sidebarFooter";
import SidebarFather from "./component/sidebarFather";

export const SiderBarType = () => {
   return (
      <>
         <SidebarFather>
            <SideBarNameChildren />
            <SidebarOtherBar />
            <SidebarButtonIcon />
            <SidebarIconTags />
            <SidebarCommunity />
            <SidebarFooter />
         </SidebarFather>
      </>
   )
}