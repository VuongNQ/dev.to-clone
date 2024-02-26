import { ReactNode } from 'react'

export interface ButtonChildren {
    variant?: 'primary' | 'secondary';
    outline?: 'outline';
    to?: string;
    onClick? : () => void;
    children : ReactNode;
}