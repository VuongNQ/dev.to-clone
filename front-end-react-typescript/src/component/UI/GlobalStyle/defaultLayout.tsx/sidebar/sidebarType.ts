import { EAppRouter } from "@/types/app"
import { EIcons } from "../../icons/icons"
import React from "react"

export enum ETolink {
   toHome = EAppRouter.root,
   toPodcast = EAppRouter.podcasts,
   toAdvertise = EAppRouter.advertise,
   toHelp = EAppRouter.help,
   toVideos = EAppRouter.videos,
   toContact = EAppRouter.contact,
   toTags = EAppRouter.tags,
   toDevshowcase = EAppRouter.devshowcase,
   toCodeOfConduct = EAppRouter.codeofconduct,
   toPrivacy = EAppRouter.privacy,
   toTerms = EAppRouter.terms,
}
export interface SbarType {
   children?: React.ReactNode
   id: number
   icon: EIcons
   title?: string
   to: ETolink
   tag?: string
}
export const IconsTypeChildren: SbarType[] = [
   {
      id: 0,
      icon: EIcons.Icons1,
      title: "Home",
      to: ETolink.toHome,
      tag: "",
   },
   {
      id: 1,
      icon: EIcons.Icons2,
      title: "Podscasts",
      to: ETolink.toPodcast,
      tag: ""
   },
   {
      id: 2,
      icon: EIcons.Icons3,
      title: "Vidseos",
      to: ETolink.toVideos,
      tag: ""
   },
   {
      id: 3,
      icon: EIcons.Icons4,
      title: "Tags",
      to: ETolink.toTags,
      tag: ""
   },
   {
      id: 4,
      icon: EIcons.Icons5,
      title: "DEVs Help",
      to: ETolink.toHelp,
      tag: ""
   },
   {
      id: 5,
      icon: EIcons.Icons6,
      title: "Forsem Shop",
      to: ETolink.toHome,
      tag: ""
   },
   {
      id: 6,
      icon: EIcons.Icons7,
      title: "Advsertise on DEV",
      to: ETolink.toAdvertise,
      tag: ""
   },
   {
      id: 7,
      icon: EIcons.Icons8,
      title: "DEVs Showcase",
      to: ETolink.toDevshowcase,
      tag: ""
   },
   {
      id: 8,
      icon: EIcons.Icons9,
      title: "Constact",
      to: ETolink.toContact,
      tag: ""
   },
]

export const IconsTypeOther: SbarType[] = [
   {
      id: 0,
      icon: EIcons.IconsOther1,
      title: "Code of Conduct",
      tag: "",
      to: ETolink.toCodeOfConduct
   },
   {
      id: 1,
      icon: EIcons.IconsOther2,
      title: "Privacy Policy",
      tag: "",
      to: ETolink.toPrivacy
   },
   {
      id: 2,
      icon: EIcons.IconsOther3,
      title: "Term of use",
      tag: "",
      to: ETolink.toTerms
   },
]

export const IconsTags: SbarType[] = [
   {
      id: 0,
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      tag: "#",
      title: "webdev"
   },
   {
      id: 1,
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      tag: "#",
      title: "javascript"
   },
   {
      id: 2,
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      tag: "#",
      title: "beginners"
   },
   {
      id: 3,
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      tag: "#",
      title: "programming"
   },
   {
      id: 4,
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      tag: "#",
      title: "tutorial"
   },
   {
      id: 5,
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      tag: "#",
      title: "react"
   },
   {
      id: 6,
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      tag: "#",
      title: "python"
   },
   {
      id: 7,
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      tag: "#",
      title: "productivity"
   },
   {
      id: 8,
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      tag: "#",
      title: "devops"
   },
   {
      id: 9,
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      tag: "#",
      title: "discuss"
   },
   {
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      id: 10,
      tag: "#",
      title: "aws"
   },
   {
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      id: 11,
      tag: "#",
      title: "ai"
   },
   {
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      id: 12,
      tag: "#",
      title: "opensource"
   },
   {
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      id: 13,
      tag: "#",
      title: "career"
   },
   {
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      id: 14,
      tag: "#",
      title: "node"
   },
   {
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      id: 15,
      tag: "#",
      title: "css"
   },
   {
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      id: 16,
      tag: "#",
      title: "typescript"
   },
   {
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      id: 17,
      tag: "#",
      title: "news"
   },
   {
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      id: 18,
      tag: "#",
      title: "learning"
   },
   {
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      id: 19,
      tag: "#",
      title: "testing"
   },
   {
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      id: 20,
      tag: "#",
      title: "cloud"
   },
   {
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      id: 21,
      tag: "#",
      title: "api"
   },
   {
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      id: 22,
      tag: "#",
      title: "html"
   },
   {
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      id: 23,
      tag: "#",
      title: "development"
   },
   {
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      id: 24,
      tag: "#",
      title: "java"
   },
   {
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      id: 25,
      tag: "#",
      title: "security"
   },
   {
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      id: 26,
      tag: "#",
      title: "php"
   },
   {
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      id: 27,
      tag: "#",
      title: "database"
   },
   {
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      id: 28,
      tag: "#",
      title: "android"
   },
   {
      icon: EIcons.Icons1,
      to: ETolink.toAdvertise,
      id: 29,
      tag: "#",
      title: "dotnet"
   },
]

export const NewDallad: SbarType[] = [
   {
      id: 0,
      icon: EIcons.IconFacebook,
      tag: "",
      to: ETolink.toContact,
      title: "What's a billboard?"
   },
   {
      id: 1,
      icon: EIcons.IconGithub,
      tag: "",
      to: ETolink.toContact,
      title: "Manage preferences"
   },
   {
      id: 2,
      icon: EIcons.IconInsTagram,
      tag: "",
      to: ETolink.toContact,
      title: "Report billbloard"
   }
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
