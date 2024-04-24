import { EIcons, IconComment, IconFuture } from "@/component/UI/GlobalStyle/icons/icons";
import { List } from "../type/top";

export const ListNew = List.flatMap((item) => (item.type.map((i) => {
  const iconComponent = (() => {
    switch (i.iconEnum) {
      case EIcons.IconComment:
        return <IconComment />;
      default:
        return <IconFuture />;
    }
  })();
  return { ...i, iconComponent }
})));
