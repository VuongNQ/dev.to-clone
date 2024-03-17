import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { fa1, fa6, faAdd } from "@fortawesome/free-solid-svg-icons"
import Image from "@/assets/image/https___dev-to-uploads.s3.amazonaws.com_uploads_articles_ko14fygno7jgvo7gz8k9.gif"
import ImageTitle from "@/assets/image/https___dev-to-uploads.s3.amazonaws.com_uploads_organization_profile_image_7841_eb7a94b7-7bd9-4097-b7e9-132785adc6db.avif";
import ImageTitle1 from "@/assets/image/https___dev-to-uploads.s3.amazonaws.com_uploads_user_profile_image_950976_69363f37-b7c5-4f1e-a2fe-29b4e4e33e92.avif";
import { IconFacebook, IconHeart } from "@/component/component-children/icons/icons";


interface PersonContent {
    Person: {
        id: number
        name: string
        nameMedium: string
        title: string
        since: string
        tags: string
        tags1: string
        tags2: string
        tags3: string
        hinhanh: any | string
        hinhanh1: any | string
        icon: IconProp
        iconsComments: IconProp
        iconsLogin: IconProp
    }[]
    /*
*/
}

interface ListPersonContent {
    type: PersonContent
    dataBuy: string
}
const Person1: PersonContent = {
    Person: [
        {
            id: 0,
            name: "Anmol Baranwal",
            nameMedium: "Taipy",
            since: "Mar 14",
            title: "All the tools I need to build a perfect AI app.",
            tags: "#ai",
            tags1: "#programing",
            tags2: "#opensource",
            tags3: "#python",
            hinhanh: ImageTitle,
            hinhanh1: ImageTitle1,
            icon: fa6,
            iconsComments: fa1,
            iconsLogin: faAdd,
        },
    ],
}
export const List: Array<ListPersonContent> = [
    {
        type: Person1,
        dataBuy: "20",
    }
]

type PersonCommunity = {
    Person2: {
        name: string
        icon: React.ReactNode
        content: string
        contentchidlrenOne: string
        contentchildrenTwo: string
        tags: string
        iconstTitle: string
    }[]
}