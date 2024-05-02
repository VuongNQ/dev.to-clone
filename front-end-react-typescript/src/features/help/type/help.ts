import { EAppRouter} from "@/types/app";
export enum ETolinkHelp {
  toGetting = EAppRouter.getting,
  toWriting = EAppRouter.writing,
  toCustomizing = EAppRouter.customizing,
  toReacting = EAppRouter.reacting,
  toBadges = EAppRouter.badges,
  toAdvertising = EAppRouter.advertising,
  toSpamAndAbuse = EAppRouter.spamAndAbuse,
  toBugs = EAppRouter.bugs,
  toFunStuff = EAppRouter.funStuff,
  toCommunity = EAppRouter.community,
  toOrganizations = EAppRouter.organizations,
}

export interface Help {
  id: number
  to: ETolinkHelp
  title: string
  content: string
}

export const ListHelp : Help[] = [
  {
    id: 0,
    to: ETolinkHelp.toGetting,
    title: "Getting Started with DEV",
    content: "Everything you need to know about getting started on DEV and joining the DEV Community"
  },
  {
    id: 1,
    to: ETolinkHelp.toWriting,
    title: "Writing, Editing and Scheduling",
    content: "All the information you need on writing, editing and scheduling posts on DEV",
  },
  {
    id: 2,
    to: ETolinkHelp.toCustomizing,
    title: "Customizing",
    content: "Tailor your reading experience on DEV to suit your preferences."
  },
  {
    id: 3,
    to: ETolinkHelp.toReacting,
    title: "Reacting, Commenting and Engaging",
    content: "Connect with the community, and boost engagement"
  },
  {
    id: 4,
    to: ETolinkHelp.toBadges,
    title: "Badges and Recognition",
    content: "Earn badges to adorn your profile and celebrate your contributions to the DEV Community!"
  },
  {
    id: 5,
    to: ETolinkHelp.toAdvertising,
    title: "Advertising and Sponsorships",
    content: "Support DEV and explore our advertising options"
  },
  {
    id: 6,
    to: ETolinkHelp.toSpamAndAbuse,
    title: "Spam and Abuse",
    content: "Use various channels available to provide feedback and report issues to us."
  },
  {
    id: 7,
    to: ETolinkHelp.toBugs,
    title: "Bugs , Vulnerabilities and feature Request",
    content: "Help us improve DEV for everyone"
  },
  {
    id: 8,
    to: ETolinkHelp.toFunStuff,
    title: "Fun Stuff",
    content: "Explore for extra enjoyment!"
  },
  {
    id: 0,
    to: ETolinkHelp.toCommunity,
    title: "Community Resources",
    content: "Community-Crafted Gems, Pro Tips, How-Tops, and Clever Hacks"
  },
  {
    id: 9,
    to: ETolinkHelp.toOrganizations,
    title: "Organizations",
    content: "Everything around Organizations on DEV"
  },
]