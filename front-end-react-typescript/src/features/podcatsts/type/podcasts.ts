import image1 from "@/assets/image/podcasts1.avif";
import image2 from "@/assets/image/podcasts2.avif";
import image3 from "@/assets/image/podcasts3.avif";
import image4 from "@/assets/image/podcasts4.avif";
import image5 from "@/assets/image/podcasts5.avif";
import imageBrowse1 from "@/assets/image/podcastsBrowse1.avif";
import imageBrowse10 from "@/assets/image/podcastsBrowse10.avif";
import imageBrowse11 from "@/assets/image/podcastsBrowse11.avif";
import imageBrowse12 from "@/assets/image/podcastsBrowse12.avif";
import imageBrowse2 from "@/assets/image/podcastsBrowse2.avif";
import imageBrowse3 from "@/assets/image/podcastsBrowse3.avif";
import imageBrowse4 from "@/assets/image/podcastsBrowse4.avif";
import imageBrowse5 from "@/assets/image/podcastsBrowse5.avif";
import imageBrowse6 from "@/assets/image/podcastsBrowse6.avif";
import imageBrowse7 from "@/assets/image/podcastsBrowse7.avif";
import imageBrowse8 from "@/assets/image/podcastsBrowse8.avif";
import imageBrowse9 from "@/assets/image/podcastsBrowse9.avif";
import imageTwo1 from "@/assets/image/podcastsTwo1.avif";
import imageTwo2 from "@/assets/image/podcastsTwo2.avif";
import imageTwo3 from "@/assets/image/podcastsTwo3.avif";

export interface Podcasts {
  id: number
  title: string
  titleDate: string
  image: string
}


export const ListPodcastsOne: Podcasts[] = [
  {
    id: 0,
    title: "Make a Project, Get a Job w/ Puru",
    titleDate: "HTML All The Things Podcast, Apr 11",
    image: image1,
  },
  {
    id: 1,
    title: "Glauber Costa from Turso",
    titleDate: "Scaling DevTools, Apr 11",
    image: image2,
  },
  {
    id: 2,
    title: "Ep. 46: Matt Genovese, CEO and Founder of Planorama",
    titleDate: "The Frontier Podcasts, Apr 11",
    image: image3,
  },
  {
    id: 3,
    title: "Rust in the Cosmos: Decoding Communication Part I (Ep. 254)",
    titleDate: "Data Scien at Home , Apr 11",
    image: image4,
  },
  {
    id: 4,
    title: "Authlete and Making OAuth Accessible with Justin Richer",
    titleDate: "Software Engineering Daily, Apr 11",
    image: image5,
  }
]
// Của Podcasts Two
export interface PodcastsTwo {
  id: number
  footer: string
  image: string
}

export const ListPodcastsTwo: PodcastsTwo[] = [
  {
    id: 0,
    image: imageTwo1,
    footer: "CodeNewbie"
  },
  {
    id: 1,
    image: imageTwo2,
    footer: "DevDiscuss"
  },
  {
    id: 2,
    image: imageTwo3,
    footer: "DevNews"
  }
]

export interface PodcastsThree {
  id: number
  image: string
  title: string
}

export const ListPodcastsThree: PodcastsThree[] = [
  {
    id: 0,
    image: image1,
    title: "A Cup of Code Podcasts",
  },
  {
    id: 1,
    image: image2,
    title: "A DataFramed Podcasts",
  },
  {
    id: 2,
    image: image3,
    title: "Adventured in Angular",
  },
  {
    id: 4,
    image: image4,
    title: "Adventured in DevOps",
  },
  {
    id: 5,
    image: image5,
    title: "Adventures in Machine Learning ",
  },
  {
    id: 6,
    image: imageTwo1,
    title: "Adventures in .NET",
  },
  {
    id: 7,
    image: imageTwo2,
    title: "Agile in Action with Bill Raymood",
  },
  {
    id: 8,
    image: imageTwo3,
    title: "AjTiTi [PL]",
  },
  {
    id: 9,
    image: imageBrowse1,
    title: "Aweary",
  },
  {
    id: 10,
    image: imageBrowse4,
    title: "All the Code",
  },
  {
    id: 11,
    image: image4,
    title: "Base.cs Podcasts",
  },
  {
    id: 11,
    image: imageBrowse1,
    title: "Angular Experience",
  },
  {
    id: 12,
    image: imageBrowse2,
    title: "Casual Coders Podcast",
  },
  {
    id: 13,
    image: imageBrowse3,
    title: "Caveat",
  },
  {
    id: 14,
    image: imageBrowse4,
    title: "Chile Mole y Teach",
  },
  {
    id: 15,
    image: imageBrowse5,
    title: "Byte-sized",
  },
  {
    id: 16,
    image: imageBrowse6,
    title: "Career Chats",
  },
  {
    id: 17,
    image: imageBrowse7,
    title: "Code Craters MX",
  },
  {
    id: 18,
    image: imageBrowse7,
    title: "Angular Experience",
  },
  {
    id: 19,
    image: imageBrowse8,
    title: "Angular Experience",
  },
  {
    id: 20,
    image: imageBrowse9,
    title: "Angular Experience",
  },
  {
    id: 21,
    image: imageBrowse10,
    title: "Angular Experience",
  },
  {
    id: 22,
    image: imageBrowse11,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },
  {
    id: 23,
    image: imageBrowse12,
    title: "Angular Experience",
  },

]

export interface PodcastsFour {
  id: number
  title: string
}

export const ListPodcastsFour: PodcastsFour[] = [
  {
    id: 0,
    title: "Home"
  },
  {
    id: 1,
    title: "Podcasts"
  },
  {
    id: 2,
    title: "Videos"
  },
  {
    id: 3,
    title: "Tags"
  },
  {
    id: 4,
    title: "DEV Helps"
  },
  {
    id: 5,
    title: "Forem Shop"
  },
  {
    id: 6,
    title: "Advertise on DEV"
  },
  {
    id: 7,
    title: "DEV Showcase"
  },
  {
    id: 8,
    title: "About"
  },
  {
    id: 9,
    title: "DEV Guides"
  },
  {
    id: 10,
    title: "Software Comparisons Code of Conduct"
  },
  {
    id: 11,
    title: "Privacy Policy"
  },
  {
    id: 12,
    title: "Terms of use"
  },
]



