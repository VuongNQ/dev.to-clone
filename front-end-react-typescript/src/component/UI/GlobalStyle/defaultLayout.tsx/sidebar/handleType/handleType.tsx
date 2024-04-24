import { IconsTypeChildren, IconsTypeOther } from "../type/sidebarType";
import { EIcons, Icons1, Icons2, Icons3, Icons4, Icons5, Icons6, Icons7, Icons8, Icons9, IconsOther1, IconsOther2, IconsOther3 } from "../../../icons/icons";

export const ListBar = IconsTypeChildren.map((item) => {
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

export const ListOther = IconsTypeOther.map((item) => {
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