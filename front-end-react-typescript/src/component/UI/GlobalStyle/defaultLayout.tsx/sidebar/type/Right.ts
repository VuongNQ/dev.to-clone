interface SideBarRight {
  id: number
  name: string
  title: string
  nameless: string
  nameless1: string
  nameless2: string
  buttonNew: string 
}

export enum ESidebarRight {
  name = "trending guides/resources",
  title = "7 Programming Languages Every Cloud Engineer Should Know in 2024!",
  title1 = "🎉 Our web framework reached 9,000 stars on GitHub! ⭐️ 9️⃣0️⃣0️⃣0️⃣ ⭐️",
  title2 = "Tools that Make Me Productive as a Software Engineer",
  title3 = "Understanding event driven architecture",
  title4 = "Announcing TechSchool: A free and open-source platform to learn programming",
  title5 = "Explain Memory Safe Programming Languages Like I'm Five Please",
  title6 = "Processing One Billion Rows in PHP!",
  title7 = "Simple Introduction To HTMX",
  title8 = "Devin! World's First AI Software Engineer",
  title9 = "Learning Rust: A clean start",
  title10 = "Exploring Supabase, the Open Source Backend for Developers",
  title11 = "⚛️ Folder Structures in React Projects",
  title12 = "Prompt Engineering Fundamentals - Generative AI For Beginners (v1)",
  title13 = "I failed the AWS Solutions Architect Associate exam, so what?!",
  title14 = "React 19 Is Here!",
  title15 = "Computer Science fundamentals are still important.",
  title16 = "Announcing AnalogJS 1.0 🚀",
  title17 = "Design Systems for 2024",
  title18 = "🔥 How to Learn RAG in 2024: Go from Beginner to Expert (Step by Step) 🚀",
  name1 = "recently queried",
  title19 = " Production Environment",
  title20 = " Haiku Checker",
  title21 = "Install Zsh Ubuntu ",
  title22 = "Install Docker on Raspberry Pi",
  title23 = "Flex Two Columns ",
  title24 = "Nginx Docker Compose ",
  title25 = "Eslint Vscode",
  title26 = "Vscode Vim ",
  title27 = "JavaScript || ",
  title28 = "gRPC vs REST",
  title29 = "JavaScript Playground ",
  title30 = " Windows 10 vs Linux",
  title31 = "CSS Logo",
  title32 = "Scrollbar CSS",
  title33 = "Software Engineer Interview",
  title34 = "SSH Permission Denied (Publickey)",
  title35 = "Free Apis",
  title36 = "JavaScript forEach",
  title37 = "Coding Notes"
}

export const Person2: SideBarRight[] = [
  {
    id: 0,
    name: "#wecoded",
    title: "we_coded is a celebration of individuals who are underrepresented and otherwise marginalized in software development on the basis of gender: including women, transgender, nonbinary, gender non-conforming, and two spirit people.",
    nameless: "As mulheres que mudaram o rumo da tecnologia",
    nameless1: "You Have The Power To Empower Others",
    nameless2: "Heurísticas de Teste: Tipos e Riscos",
     buttonNew: "New"
  }
]
export interface ListSidebarRight {
  type: SideBarRight[]
  data2: string
}
export const NumberTwo: Array<ListSidebarRight> = [
  {
    type: Person2,
    data2: "alo"
  }
]

