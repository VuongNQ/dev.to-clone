


export type SbarType = {

   icons: {
      id?: number
      icon: React.ReactNode
      title?: string
   }[],
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

export interface Giaodien {
   name: string,
   title: string
}

export const SideBarName : Giaodien[] = [
  {
     name: "DEV Community is a community of 1,286,889 amazing developers",
     title: "We're a place where coders share, stay up-to-date and grow their careers."
  }
]
