import { ReactNode } from 'react'

export interface ButtonChildren {
    variant?: 'primary' | 'secondary' ;
    outline?: 'outline';
    tagButton?: string;
    pink?: string;
    Follow?: string
    followTag?: string
    hideTag?: string
    OceanBlue?: string;
    yellow?: string;
    green? : string;
    headerButton?: "Relevant" | "Latest" | "Top" | "Week" | "Month" |  "Month" | "Year" | "Year" | "Infinity";
    fontWeight?: "fontWeight";
    title?: string;
    to?: string;
    onClick? : () => void;
    children : ReactNode;
}