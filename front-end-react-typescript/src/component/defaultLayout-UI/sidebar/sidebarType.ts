 export type SbarType = {
    names: {
       name: string,
       title: string
    },
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
      title?:string
    }[]
 }