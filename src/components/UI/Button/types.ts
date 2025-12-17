import React from 'react';

export interface ButtonTypes {
    children: React.ReactNode;
    variant?: 'primary' | 'success';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    className?: string;
    width?: string;
}
