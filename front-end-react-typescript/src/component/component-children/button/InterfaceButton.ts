import { ReactNode } from 'react'

export interface ButtonChildren {
    variant?: 'primary' | 'secondary' | "Follow";
    outline?: 'outline';
    
    to?: string;
    onClick? : () => void;
    children : ReactNode;
}