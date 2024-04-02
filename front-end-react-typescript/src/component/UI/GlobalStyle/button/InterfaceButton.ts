import { ReactNode } from 'react'

export interface ButtonChildren {
    variant?: 'primary' | 'secondary' | "Follow";
    outline?: 'outline';
    pink?: string;
    OceanBlue?: string;
    yellow?: string;
    green? : string;
    headerButton?: "Relevant" | "Latest" | "Top";
    fontWeight?: "fontWeight"
    title?: string;
    to?: string;
    onClick? : () => void;
    children : ReactNode;
}