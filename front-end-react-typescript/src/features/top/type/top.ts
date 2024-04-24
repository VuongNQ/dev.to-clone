import IconReaction1 from "@/assets/image/hinh anh icon reaction 1.svg";
import IconReaction2 from '@/assets/image/hinh anh icon reaction 2.svg';
import IconReaction3 from '@/assets/image/hinh anh icon reaction 3.svg';
import IconReaction4 from '@/assets/image/hinh anh icon reaction 4.svg';
import IconReaction5 from '@/assets/image/hinh anh icon reaction 5.svg';
import top13 from '@/assets/image/latest13.avif';
import top1 from "@/assets/image/top1.avif";
import top10 from '@/assets/image/top10.avif';
import top11 from '@/assets/image/top11.avif';
import top12 from '@/assets/image/top12.avif';
import top2 from "@/assets/image/top2.avif";
import top3 from '@/assets/image/top3.webp';
import top4 from '@/assets/image/top4.avif';
import top5 from '@/assets/image/top5.avif';
import top6 from '@/assets/image/top6.avif';
import top7 from '@/assets/image/top7.avif';
import top8 from '@/assets/image/top8.avif';
import top9 from '@/assets/image/top9.avif';
import imageCommunity from '@/assets/image/wixrm7ejmrua4su7agha.jpg';
import { EIcons } from "@/component/UI/GlobalStyle/icons/icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { fa1, fa6, faAdd, faEllipsisH, faHeart } from "@fortawesome/free-solid-svg-icons";

interface PersonContent {
  id: number
  name: string
  nameMedium: string
  title: string
  since: string
  tagThan: string
  iconEnum: EIcons,
  iconEnum1: EIcons,
  tags?: string
  tags1?: string,
  tags2?: string
  tags3?: string
  button: string
  always: string
  work: string
  dev: string
  location: string
  education: string
  viTri: string
  school: string
  joined: string
  days: string
  hinhanh: string
  hinhanh1: string
  icon: IconProp
  iconsComments: IconProp
  iconsLogin: IconProp
  iconHeart: IconProp
  iconReactionOne?: string
  iconReactionTwo?: string
  iconReactionThree?: string
  iconReactionFour?: string
  iconReactionFive?: string
  Array?: PersonCommunity[]
}

interface ListPersonContent {
  type: PersonContent[]
  dataBuy: string
}
const Person1: PersonContent[] = [
  {

    id: 0,
    tagThan: "#",
    name: "Shefali",
    nameMedium: "",
    since: "Apr 6",
    title: "21 HTML Tips You Must Know About",
    tags: "webdev",
    tags1: "beginners",
    tags2: "html",
    tags3: "programming",
    button: "Follow",
    always: "",
    work: "",
    dev: "",
    location: "",
    viTri: "",
    education: "",
    school: "",
    joined: "",
    days: "",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    hinhanh: top1,
    hinhanh1: top1,
    icon: fa6,
    iconsComments: fa1,
    iconsLogin: faAdd,
    iconHeart: faHeart,
    iconReactionOne: IconReaction1,
    iconReactionTwo: IconReaction2,
    iconReactionThree: IconReaction3,
    iconReactionFour: IconReaction4,
    iconReactionFive: IconReaction5,
  },
  {
    id: 1,
    name: "Sh Raj",
    tagThan: "#",
    nameMedium: "Wasp",
    since: "Apr 2",
    title: "What Junio Devs Get Wrong",
    tags: "discuss",
    tags1: "career",
    tags2: "beginners",
    tags3: "learning",
    button: "Follow",
    always: "",
    work: "",
    dev: "",
    location: "",
    viTri: "",
    education: "",
    school: "",
    joined: "",
    days: "",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    hinhanh: top2,
    hinhanh1: top13,
    icon: fa6,
    iconsComments: fa1,
    iconsLogin: faAdd,
    iconHeart: faHeart,
    iconReactionOne: IconReaction1,
    iconReactionTwo: IconReaction2,
    iconReactionThree: IconReaction3,
    iconReactionFour: IconReaction4,
    iconReactionFive: IconReaction5,
  },
  {
    id: 2,
    tagThan: "#",
    name: "Nevo David",
    nameMedium: "Gitroom",
    since: "Apr 4",
    title: "I sold my startup because of bugs: I wish I had this serverless repository! ",
    tags: "webdev",
    tags1: "javascript",
    tags2: "programming",
    tags3: "opensource",
    button: "Follow",
    always: "Learn how to grow your GitHub repository",
    work: "OSS Chief @ Gitroom",
    dev: "",
    location: "",
    viTri: "",
    education: "",
    school: "",
    joined: "JOINED",
    days: "February 23, 2022",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    hinhanh: top3,
    hinhanh1: top3,
    icon: fa6,
    iconsComments: fa1,
    iconsLogin: faAdd,
    iconHeart: faHeart,
    iconReactionOne: IconReaction1,
    iconReactionTwo: IconReaction2,
    iconReactionThree: IconReaction3,
    iconReactionFour: IconReaction4,
    iconReactionFive: IconReaction5
  },
  {
    id: 3,
    name: "Mauro Accorinti",
    nameMedium: "",
    tagThan: "#",
    since: "Apr 2",
    title: "How to get somebody fired using Git",
    tags: "git",
    tags1: "coding",
    tags2: "github",
    tags3: "learning",
    button: "Follow",
    always: "I run the most entertaining frontend developer newsletter on the web! Sign up here → https://bit.ly/exceptionalfrontend",
    work: "WORK",
    dev: "Front-end Developer",
    location: "LOCATION",
    viTri: "Chandigarh",
    education: "",
    school: "",
    joined: "JOINED",
    days: "May 9, 2021",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    hinhanh: top4,
    hinhanh1: top4,
    icon: fa6,
    iconsComments: fa1,
    iconsLogin: faAdd,
    iconHeart: faHeart,
    iconReactionOne: IconReaction1,
    iconReactionTwo: IconReaction2,
    iconReactionThree: IconReaction3,
    iconReactionFour: IconReaction4,
    iconReactionFive: IconReaction5
  },
  {
    id: 4,
    name: "aymane aallaoui",
    tagThan: "#",
    nameMedium: "",
    since: "Apr 5",
    title: "Mastering JWT Security",
    tags: "webdev",
    tags1: "javascript",
    tags2: "beginners",
    tags3: "security",
    button: "Follow",
    always: "i'm 21y old student that loves to code",
    work: "",
    dev: "",
    location: "",
    viTri: "",
    education: "",
    school: "",
    joined: "JOINED",
    days: "December 18, 2022",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    hinhanh: top5,
    hinhanh1: top5,
    icon: fa6,
    iconsComments: fa1,
    iconsLogin: faAdd,
    iconHeart: faHeart,
    iconReactionOne: IconReaction1,
    iconReactionThree: IconReaction3,
    iconReactionFour: IconReaction4,
  },
  {
    id: 5,
    name: "Alex (The Engineering Bolt)",
    tagThan: "#",
    nameMedium: "⚡",
    since: "Apr 1",
    title: "🚀 Roadmap: From Junior Software Engineer to CTO in 1 Year",
    tags: "webdev",
    tags1: "beginners",
    tags2: "programming",
    tags3: "career",
    button: "Follow",
    always: "Technical Entrepreneur writing about high-performing teams, building healthy engineering culture, and scaling teams. @Meta / ex-HSBC || CareerHub - https://discord.gg/AjVbnWKYbJ",
    work: "WORK",
    dev: "Technology Entrepreneur",
    location: "London, UK",
    viTri: "",
    education: "",
    school: "",
    joined: "JOINED",
    days: "April 4, 2021",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    hinhanh: top6,
    hinhanh1: top6,
    icon: fa6,
    iconsComments: fa1,
    iconsLogin: faAdd,
    iconHeart: faHeart,
    iconReactionThree: IconReaction3,
    iconReactionFour: IconReaction4,
    iconReactionFive: IconReaction5
  },
  {
    id: 6,
    name: "Will T.",
    tagThan: "#",
    nameMedium: "",
    since: "Apr 7",
    title: "⚛️ Organizing Code in a React Component",
    tags: "webdev",
    tags1: "react",
    tags2: "typescript",
    tags3: "javascript",
    button: "Follow",
    always: "I'm a Frontend enthusiast who is specialized in ⚛️. I love sharing my knowledge and experience within my area of expertise.",
    work: "WORK",
    dev: "Frontend Developer",
    location: "LOCATION",
    viTri: "🇻🇳 Vietnam",
    education: "EDUCATION",
    school: "Hanoi University of Science and Technology",
    joined: "JOINED",
    days: "October 26, 2018",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    hinhanh: top7,
    hinhanh1: top7,
    icon: fa6,
    iconsComments: fa1,
    iconsLogin: faAdd,
    iconHeart: faHeart,
    iconReactionFour: IconReaction4,
  },
  {
    id: 7,
    tagThan: "#",
    name: "Madhu Saini",
    nameMedium: "",
    since: "Apr 5",
    title: "All MongoDB commands you need to know",
    tags: "mongodb",
    tags1: "webdev",
    tags2: "backend",
    tags3: "database",
    button: "Follow",
    always: "Open-Source Enthusiast | MERN Stack | Content Creator Create content on - JavaScript - Open Source - Web Dev - Public Speaking Always interested for collaboration, engagement:)",
    work: "WORK",
    dev: "Software Developer at @Mapsted",
    location: "LOCATION",
    viTri: "Gujarat, India",
    education: "EDUCATION",
    school: "Gujarat Technological University",
    joined: "JOINED",
    days: "July 24, 2021",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    hinhanh: top8,
    hinhanh1: top8,
    icon: fa6,
    iconsComments: fa1,
    iconsLogin: faAdd,
    iconHeart: faHeart,
    iconReactionOne: IconReaction1,
    iconReactionTwo: IconReaction2,
    iconReactionThree: IconReaction3,
    iconReactionFour: IconReaction4,
    iconReactionFive: IconReaction5,
  },
  {
    id: 8,
    tagThan: "#",
    name: "Borneel B. Phukan",
    nameMedium: "",
    since: "Apr 1",
    title: "9 React Hooks that you should be aware of as a Frontend Developer",
    tags: "react",
    tags1: "typescript",
    tags2: "webdev",
    tags3: "programming",
    button: "Follow",
    always: "A Fullstack Software Developer focused on developing customer-oriented applications, designing impactful APIs, clean UI/UX, and delivering successful projects to drive business growth and revenues.",
    work: "",
    dev: "",
    location: "LOCATION",
    viTri: "Chemnitz, Germany",
    education: "",
    school: "",
    joined: "JOINED",
    days: "February 15, 2023",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    hinhanh: top9,
    hinhanh1: top9,
    icon: fa6,
    iconsComments: fa1,
    iconsLogin: faAdd,
    iconHeart: faHeart,
    iconReactionTwo: IconReaction2,
  },
]
export const List: Array<ListPersonContent> = [
  {
    type: Person1,
    dataBuy: "20",
  }

]

export interface PersonCommunity {
  id: number
  name: string
  name1: string
  icons: IconProp
  image: string
  content: string
  contentchidlrenOne: string
  contentchildrenTwo: string
  tags: string
  iconsTitle: string
  name2: string
  week2: string
  introduce2: string
  titleFooter: string
  introduceFooter: string
  introduceFooter1: string
  introduceFooterLink: string
  introduceFooterPrice: string
  buttonFooter: string
}

export const Person2: PersonCommunity[] = [
  {
    id: 0,
    name: "DEV Community",
    name1: "👋 The second DEV Challengen is live",
    icons: faEllipsisH,
    image: imageCommunity,
    content: "Need to stay up-to-date with the most relevant trends in software, such as generative AI, cloud computing, and all things frontend?",
    contentchidlrenOne: "Look no further.",
    contentchildrenTwo: "You can do so much more once you create your account. Follow the devs and topics you care about, and keep up-to-date.",
    tags: "Start now",
    iconsTitle: "Happy coding ❤️",
    name2: "Highlights of Week",
    week2: "Week's Top 7 Hights",
    introduce2: "This week's featured authors: ",
    titleFooter: "The Cloudflare AI Challenge is live !",
    introduceFooter: "We are so exceited to be partnering with Cloudflare for the",
    introduceFooter1: "second DEV Challenge.",
    introduceFooterLink: "It's easy to participate and everyone is welcome to join in.",
    introduceFooterPrice: "Did we mention $3,000 in prizes?",
    buttonFooter: "Learn more",
  },
]

export interface TheDiv {
  id: number
  image: string
  title: string
  titleSpan: string
}

export const ListTheDiv: TheDiv[] = [
  {
    id: 0,
    image:top10,
    title: "Piotr Kulpinski",
    titleSpan: "/piotrkulpinski"
  },
  {
    id: 1,
    image:top11,
    title: "Karsten Biederman",
    titleSpan: "",
  },
  {
    id: 2,
    image:top12,
    title: "Will T.",
    titleSpan: "",
  },
  {
    id: 3,
    image:top13,
    title: "Juraj Malenica",
    titleSpan: "Passion for building innovative solution in the startup world. Building and leading engineers in an AI startup",
  },
  {
    id: 4,
    image:top12,
    title: "Hikari",
    titleSpan: "Just coding",
  },
  {
    id: 5,
    image: top11,
    title: "Fatemeh Paghar",
    titleSpan: "Programming is a major entertainment of my life. I’m really interested in learning new technology development concepts and making suggestions for improvements",
  },
  {
    id: 6,
    image: top13,
    title: "Josef Held",
    titleSpan: "",
  },
]