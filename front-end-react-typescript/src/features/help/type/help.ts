import { EAppRouter } from "@/types/app"
export enum ETolinkHelp {
  toGetting = EAppRouter.getting,
}

export interface Help {  
  id: number
  iconHelp : string
  title: string
  content: string
}

export const ListHelp = [
  {
      id: 0,
  },
]