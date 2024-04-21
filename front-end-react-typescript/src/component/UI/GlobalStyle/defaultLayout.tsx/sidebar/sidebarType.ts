import { EAppRouter } from "@/types/app"
import { EIcons } from "../../icons/icons"

export enum ETolink {
   toHome = EAppRouter.root,
   toPodcast = EAppRouter.podcasts,
   toAdvertise = EAppRouter.advertise,
   toHelp = EAppRouter.help,
   toVideos = EAppRouter.videos,
   toContact = EAppRouter.contact,
   toTags = EAppRouter.tags,
   toDevshowcase = EAppRouter.devshowcase
}
export interface SbarType {
   id: number
   icon: EIcons
   title?: string
   to: ETolink
   other: {
      id?: number
      icon: React.ReactNode
      title?: string
   }[]
   tag: {
      id?: number
      tag?: string
      title?: string
   }[]
}
export const IconsTypeChildren: SbarType[] = [
   {
      id: 0,
      icon: EIcons.IconApple,
      title: "Home",
      to: ETolink.toHome,
      other: [],
      tag: []
   },
   {
      id: 1,
      icon: EIcons.Icons2,
      title: "Podscasts",
      to: ETolink.toPodcast,
      other: [],
      tag: []
   },
   {
      id: 2,
      icon: EIcons.Icons3,
      title: "Vidseos",
      to: ETolink.toVideos,
      other: [],
      tag: []
   },
   {
      id: 3,
      icon: EIcons.Icons4,
      title: "Tags",
      other: [],
      to: ETolink.toTags,
      tag: []
   },
   {
      id: 4,
      icon: EIcons.Icons5,
      title: "DEVs Help",
      other: [],
      to: ETolink.toHelp,
      tag: []
   },
   {
      id: 5,
      icon: EIcons.Icons6,
      title: "Forsem Shop",
      other: [],
      to: ETolink.toHome,
      tag: []
   },
   {
      id: 6,
      icon: EIcons.Icons7,
      title: "Advsertise on DEV",
      other: [],
      to: ETolink.toAdvertise,
      tag: []
   },
   {
      id: 7,
      icon: EIcons.Icons8,
      title: "DEVs Showcase",
      other: [],
      to: ETolink.toDevshowcase,
      tag: []
   },
   {
      id: 8,
      icon: EIcons.Icons9,
      title: "Constact",
      other: [],
      to: ETolink.toContact,
      tag: []
   },
]


export interface Giaodien {
   name: string,
   title: string
}

export const SideBarName: Giaodien[] = [
   {
      name: "DEV Community is a community of 1,286,889 amazing developers",
      title: "We're a place where coders share, stay up-to-date and grow their careers."
   }
]
