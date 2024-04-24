import IconReaction1 from "@/assets/image/hinh anh icon reaction 1.svg";
import IconReaction2 from '@/assets/image/hinh anh icon reaction 2.svg';
import IconReaction3 from '@/assets/image/hinh anh icon reaction 3.svg';
import IconReaction4 from '@/assets/image/hinh anh icon reaction 4.svg';
import IconReaction5 from '@/assets/image/hinh anh icon reaction 5.svg';
import ImageTitle3 from "@/assets/image/https___dev-to-uploads.s3.amazonaws.com_uploads_organization_profile_image_1_d908a186-5651-4a5a-9f76-15200bc6801f.avif";
import latest1 from "@/assets/image/latest1.avif";
import latest2 from "@/assets/image/latest2.avif";
import latest3 from '@/assets/image/latest3.avif';
import latest4 from '@/assets/image/latest4.avif';
import latest41 from '@/assets/image/latest4-1.avif';
import latest5 from '@/assets/image/latest5.avif';
import latest6 from '@/assets/image/latest6.avif';
import latest7 from '@/assets/image/latest7.avif';
import latest8 from '@/assets/image/latest8.avif';
import latest9 from '@/assets/image/latest9.avif';
import latest10 from '@/assets/image/latest10.avif';
import latest11 from '@/assets/image/latest11.avif';
import latest12 from '@/assets/image/latest12.avif';
import latest13 from '@/assets/image/latest13.avif';
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
    name: "Abdelrahman hassan hamdy",
    nameMedium: "",
    since: "Apr 3",
    title: "Understanding Layers, Tiers, and N-Tier Architecture in Application Development",
    tags: "systemdesign",
    tags1: "backend",
    tags2: "webdev",
    tags3: "devops",
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
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    hinhanh: latest1,
    hinhanh1: latest1,
    icon: fa6,
    iconsComments: fa1,
    iconsLogin: faAdd,
    iconHeart: faHeart,
    iconReactionFive: IconReaction5,
  },
  {
    id: 1,
    name: "Sh Raj",
    tagThan: "#",
    nameMedium: "",
    since: "Apr 3",
    title: "I created an AI Chatbot 🚀",
    tags: "",
    tags1: "codepen",
    tags2: "career",
    tags3: "ai",
    button: "Follow",
    always: "Sh Raj",
    work: "",
    dev: "",
    location: "LOCATION",
    viTri: "🔆💖 INDIA💖🔆",
    education: "EDUCATION",
    school: "",
    joined: "JOINED",
    days: "January 9, 2022",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    hinhanh: latest2,
    hinhanh1: latest2,
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
    name: "Sh Raj",
    nameMedium: "",
    since: "Apr 3",
    title: "Generate AI Songs for Free - Gemini API ",
    tags: "discuss",
    tags1: "",
    tags2: "",
    tags3: "Javascript",
    button: "Follow",
    always: "lamSh",
    work: "",
    dev: "",
    location: "LOCATION",
    viTri: "🔆💖 INDIA💖🔆",
    education: "",
    school: "",
    joined: "JOINED",
    days: "February 9, 2022",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    hinhanh: latest2,
    hinhanh1: latest2,
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
    name: "sukhpinder Singh",
    nameMedium: "",
    tagThan: "#",
    since: "Apr 3",
    title: "Day 15 of 30-Day .NET Challenge: Lazy Initialization",
    tags: "dotnet",
    tags1: "programing",
    tags2: "csharp",
    tags3: "aspnet",
    button: "Follow",
    always: "I'm Sukhpinder Singh, a passionate self-taught .Net developer from India. Skills C# | Microsoft Certified | Medium Blogger | .Net Core | Xamarin | ASP.Net | Angular",
    work: "WORK",
    dev: "Technical Lead at SourceFuse",
    location: "LOCATION",
    viTri: "Chandigarh",
    education: "EDUCATION",
    school: "Maters Degree from BITS Pilani",
    joined: "JOINED",
    days: "May 9, 2021",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    hinhanh: latest3,
    hinhanh1: latest3,
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
    name: "Necati Özmen",
    tagThan: "#",
    nameMedium: "Refine",
    since: "Apr 3",
    title: "CSS Rounded Corners Examples",
    tags: "css",
    tags1: "webdev",
    tags2: "beginners",
    tags3: "programming",
    button: "Follow",
    always: "Software Enginner, Head of Growth @Refine",
    work: "",
    dev: "",
    location: "",
    viTri: "",
    education: "",
    school: "",
    joined: "JOINED",
    days: "July 17, 2019",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    hinhanh: latest4,
    hinhanh1: latest41,
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
    name: "Agapov Alexey",
    tagThan: "#",
    nameMedium: "",
    since: "Apr 3",
    title: "Control dependencies with structs in Swift",
    tags: "ios",
    tags1: "swift",
    tags2: "macos",
    tags3: "dependencyinjection",
    button: "Follow",
    always: "8 yrs of Swift on iOS plaftForm ",
    work: "WORK",
    dev: "Aviasales",
    location: "",
    viTri: "",
    education: "",
    school: "",
    joined: "JOINED",
    days: "June 30, 2021",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    hinhanh: latest5,
    hinhanh1: latest5,
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
    name: "Abdelrahman hassan hamdy",
    tagThan: "#",
    nameMedium: "",
    since: "Apr 3",
    title: "Understanding Layers, Tiers, and N-Tier Architecture in Application Development",
    tags: "systemdesign",
    tags1: "backend",
    tags2: "webdev",
    tags3: "devops",
    button: "Follow",
    always: "I'm Abdelrahman from Egypt, formerly a software engineer at Paymob. Open to tech discussions and collaborations. Programming is not just a career, it's my lifestyle. Let's learn and grow together.",
    work: "WORK",
    dev: "Former Software engineer at Paymob - session lead at udacity - computer science student",
    location: "",
    viTri: "",
    education: "EDUCATION",
    school: "cairo university",
    joined: "JOINED",
    days: "May 27, 2021",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    hinhanh: latest1,
    hinhanh1: latest1,
    icon: fa6,
    iconsComments: fa1,
    iconsLogin: faAdd,
    iconHeart: faHeart,
    iconReactionFour: IconReaction4,
  },
  {
    id: 7,
    tagThan: "#",
    name: "Hung Vu",
    nameMedium: "",
    since: "Apr 3",
    title: "Expand Promox storage with external enclosures in a homelab environment",
    tags: "todayilearned",
    tags1: "linux",
    tags2: "learning",
    tags3: "testing",
    button: "Follow",
    always: "I write about various topics that I'm currently learning, be it front end, back end, cloud, DevOps, etc., you name it! For any questions you may have, you can reach out to me at: hello@hungvu.tech.",
    work: "WORK",
    dev: "IT Support Engineer",
    location: "LOCATION",
    viTri: "Washington, US",
    education: "EDUCATION",
    school: "University of Washington Tacoma",
    joined: "JOINED",
    days: "February 2, 2022",
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
    hinhanh: latest6,
    hinhanh1: latest6,
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
    iconEnum: EIcons.IconComment,
    iconEnum1: EIcons.IconFuture,
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

export const ListTheDiv: TheDiv[] = [
  {
    id: 0,
    image: latest7,
    title: "Piotr Kulpinski",
    titleSpan: "/piotrkulpinski"
  },
  {
    id: 1,
    image: latest8,
    title: "Karsten Biederman",
    titleSpan: "",
  },
  {
    id: 2,
    image: latest9,
    title: "Will T.",
    titleSpan: "",
  },
  {
    id: 3,
    image: latest10,
    title: "Juraj Malenica",
    titleSpan: "Passion for building innovative solution in the startup world. Building and leading engineers in an AI startup",
  },
  {
    id: 4,
    image: latest11,
    title: "Hikari",
    titleSpan: "Just coding",
  },
  {
    id: 5,
    image: latest12,
    title: "Fatemeh Paghar",
    titleSpan: "Programming is a major entertainment of my life. I’m really interested in learning new technology development concepts and making suggestions for improvements",
  },
  {
    id: 6,
    image: latest13,
    title: "Josef Held",
    titleSpan: "",
  },
]