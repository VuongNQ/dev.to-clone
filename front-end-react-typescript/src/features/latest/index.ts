import IconReaction1 from "@/assets/image/hinh anh icon reaction 1.svg";
import IconReaction2 from '@/assets/image/hinh anh icon reaction 2.svg';
import IconReaction3 from '@/assets/image/hinh anh icon reaction 3.svg';
import IconReaction4 from '@/assets/image/hinh anh icon reaction 4.svg';
import IconReaction5 from '@/assets/image/hinh anh icon reaction 5.svg';
import ImageTitle3 from "@/assets/image/https___dev-to-uploads.s3.amazonaws.com_uploads_organization_profile_image_1_d908a186-5651-4a5a-9f76-15200bc6801f.avif";
import ImageTitle from "@/assets/image/https___dev-to-uploads.s3.amazonaws.com_uploads_organization_profile_image_7841_eb7a94b7-7bd9-4097-b7e9-132785adc6db.avif";
import ImageTitle2 from "@/assets/image/https___dev-to-uploads.s3.amazonaws.com_uploads_user_profile_image_557265_7f799348-dde4-462a-adae-3d2d9ab35b9a.avif";
import ImageTitle1 from "@/assets/image/https___dev-to-uploads.s3.amazonaws.com_uploads_user_profile_image_950976_69363f37-b7c5-4f1e-a2fe-29b4e4e33e92.avif";
import ImageTitle4 from "@/assets/image/image4.avif";
import ImageTitle5 from "@/assets/image/image5.avif";
import ImageTitle8 from '@/assets/image/image6.avif';
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
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    tagThan: "#",
    name: "Anmol Baranwal",
    nameMedium: "Taipy",
    since: "Mar 14",
    title: "All the tools I need to build a perfect AI app.",
    tags: "ai",
    tags1: "programing",
    tags2: "opensource",
    tags3: "python",
    button: "Follow",
    always: "Always look forward something new to learn.",
    work: "WORK",
    dev: "Fullstack web developer",
    location: "LOCATION",
    viTri: "Guadalajara, Jalisco, México",
    education: "EDUCATION",
    school: "Universidad de Guadalajara, ITESM life.",
    joined: "JOINED",
    days: "January 11, 2021",
    hinhanh: ImageTitle,
    hinhanh1: ImageTitle1,
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
    name: "Fernando Gonzalez Tostado",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    tagThan: "#",
    nameMedium: "",
    since: "Mar 18",
    title: "AI Automated Engineers - Are We Dommed",
    tags: "discuss",
    tags1: "ai",
    tags2: "career",
    tags3: "softwaredevelopment",
    button: "Follow",
    always: "Always look forward something new to learn.",
    work: "WORK",
    dev: "Fullstack web developer",
    location: "LOCATION",
    viTri: "Guadalajara, Jalisco, México",
    education: "EDUCATION",
    school: "Universidad de Guadalajara, ITESM life.",
    joined: "JOINED",
    days: "January 11, 2021",
    hinhanh: ImageTitle2,
    hinhanh1: "",
    icon: fa6,
    iconsComments: fa1,
    iconsLogin: faAdd,
    iconHeart: faHeart,
    iconReactionTwo: IconReaction2,
    iconReactionThree: IconReaction3,
    iconReactionFive: IconReaction5,
  },
  {
    id: 2,
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    tagThan: "#",
    name: "dev.to staff",
    nameMedium: "The DEV Team",
    since: "Mar 18",
    title: "What's Got You Exceited This Week",
    tags: "discuss",
    tags1: "",
    tags2: "",
    tags3: "",
    button: "",
    always: "The hardwoking team behind dev.to",
    work: "",
    dev: "",
    location: "",
    viTri: "",
    education: "",
    school: "",
    joined: "JOINED",
    days: "February 9, 2016",
    hinhanh: ImageTitle3,
    hinhanh1: "",
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
    name: "Suraj Vishwakarma",
    nameMedium: "",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    tagThan: "#",
    since: "Mar 18",
    title: "Debugging Techniques Every Developer Should Know",
    tags: "beginners",
    tags1: "programing",
    tags2: "productivity",
    tags3: "webdev",
    button: "Follow",
    always: "Learning and helping other people to understand technology👨‍💻",
    work: "WORK",
    dev: "Technical Author @freeCodeCamp",
    location: "LOCATION",
    viTri: "Thane, India",
    education: "EDUCATION",
    school: "Mumbai University",
    joined: "JOINED",
    days: "June 27, 2020",
    hinhanh: ImageTitle4,
    hinhanh1: "",
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
    name: "Cherlock Code 🔎",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    tagThan: "#",
    nameMedium: "",
    since: "Mar 14",
    title: "🙋 How to Show Up Daily as a Newbie Dev",
    tags: "beginners",
    tags1: "codenewbie",
    tags2: "motivation",
    tags3: "learning",
    button: "Follow",
    always: "An ever-growing dev 👩‍💻 | Passionate about coding & self-improvement | I share tips for powering up your programming productivity 🚀 | Let’s grow together 🌱",
    work: "WORK",
    dev: "Software Engineer",
    location: "LOCATION",
    viTri: "LonDon, UK",
    education: "",
    school: "",
    joined: "JOINED",
    days: "February 15, 2023",
    hinhanh: ImageTitle5,
    hinhanh1: "",
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
    name: "Shubham Tiwari",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    tagThan: "#",
    nameMedium: "",
    since: "Mar 18",
    title: "TypeScript | Beginner",
    tags: "javascript",
    tags1: "typescript",
    tags2: "webdev",
    tags3: "beginners",
    button: "Follow",
    always: "Front-end web developer",
    work: "WORK",
    dev: "Jr.Frond-ent Engineer at FULL Creative",
    location: "LOCATION",
    viTri: "India",
    education: "EDUCATION",
    school: "Quantum University",
    joined: "JOINED",
    days: "July 19, ",
    hinhanh: ImageTitle8,
    hinhanh1: "",
    icon: fa6,
    iconsComments: fa1,
    iconsLogin: faAdd,
    iconHeart: faHeart,
    iconReactionOne: IconReaction1,
    iconReactionFour: IconReaction4,
    iconReactionFive: IconReaction5
  },
  {
    id: 6,
    name: "dev.to staff🔎",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    tagThan: "#",
    nameMedium: "The DEV Team",
    since: "Mar 14",
    title: "Caption This!",
    tags: "",
    tags1: "",
    tags2: "watercolor",
    tags3: "discuss",
    button: "Follow",
    always: "An ever-growing dev 👩‍💻 | Passionate about coding & self-improvement | I share tips for powering up your programming productivity 🚀 | Let’s grow together 🌱",
    work: "WORK",
    dev: "Software Engineer",
    location: "LOCATION",
    viTri: "LonDon, UK",
    education: "",
    school: "",
    joined: "JOINED",
    days: "February 15, 2023",
    hinhanh: ImageTitle3,
    hinhanh1: "",
    icon: fa6,
    iconsComments: fa1,
    iconsLogin: faAdd,
    iconHeart: faHeart,
    iconReactionFour: IconReaction4,
  },
  {
    id: 7,
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    tagThan: "#",
    name: "dev.to staff",
    nameMedium: "The DEV Team",
    since: "Mar 30",
    title: "🙋 How Do You Learn New Things When You're So Busy",
    tags: "beginners",
    tags1: "codenewbie",
    tags2: "motivation",
    tags3: "learning",
    button: "Follow",
    always: "An ever-growing dev 👩‍💻 | Passionate about coding & self-improvement | I share tips for powering up your programming productivity 🚀 | Let’s grow together 🌱",
    work: "WORK",
    dev: "Software Engineer",
    location: "LOCATION",
    viTri: "LonDon, UK",
    education: "",
    school: "",
    joined: "JOINED",
    days: "February 15, 2023",
    hinhanh: ImageTitle3,
    hinhanh1: "",
    icon: fa6,
    iconsComments: fa1,
    iconsLogin: faAdd,
    iconHeart: faHeart,
    iconReactionFour: IconReaction4,
  },
  {
    id: 8,
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    tagThan: "#",
    name: "Rachel Fazio",
    nameMedium: "The DEV Team",
    since: "Mar 29",
    title: "Helping You Build The Off Team sister Origin Black footerStudents",
    tags: "beginners",
    tags1: "codenewbie",
    tags2: "motivation",
    tags3: "ai",
    button: "Follow",
    always: "An ever-growing dev 👩‍💻 | Passionate about coding & self-improvement | I share tips for powering up your programming productivity 🚀 | Let’s grow together 🌱",
    work: "WORK",
    dev: "Software Engineer",
    location: "LOCATION",
    viTri: "LonDon, UK",
    education: "",
    school: "",
    joined: "JOINED",
    days: "February 15, 2023",
    hinhanh: ImageTitle3,
    hinhanh1: "",
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
}

export const Person2: PersonCommunity[] = [
  {
    id: 0,
    name: "DEV Community",
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
  },
]

export interface TheDiv {
  id: number
  image: string
  title: string
  titleSpan: string
}

export const ListTheDiv : TheDiv[] = [
  {
    id:0,
    image: ImageTitle,
    title: "Piotr Kulpinski",
    titleSpan: "/piotrkulpinski"
  }, 
  {
    id: 1,
    image: ImageTitle1,
    title: "Karsten Biederman",
    titleSpan: "",
  },
  {
    id: 2,
    image: ImageTitle2,
    title: "Will T.",
    titleSpan: "",
  },
  {
    id: 3,
    image: ImageTitle2,
    title: "Juraj Malenica",
    titleSpan: "Passion for building innovative solution in the startup world. Building and leading engineers in an AI startup",
  },
  {
    id: 4,
    image: ImageTitle2,
    title: "Hikari",
    titleSpan: "Just coding",
  },
  {
    id: 5,
    image: ImageTitle2,
    title: "Fatemeh Paghar",
    titleSpan: "Programming is a major entertainment of my life. I’m really interested in learning new technology development concepts and making suggestions for improvements",
  },
  {
    id: 6,
    image: ImageTitle2,
    title: "Josef Held",
    titleSpan: "",
  },
]