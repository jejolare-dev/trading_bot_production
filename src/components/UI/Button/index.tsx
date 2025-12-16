import React from 'react';
import { classes } from '@/utils';
import styles from './styles.module.scss';
import { ButtonTypes } from './types';

// Universal button component
const Button = ({
    children,
    className,
    disabled,
    onClick,
    variant = 'primary',
    width,
}: ButtonTypes) => {
    return (
        <button
            style={{ width: width || '170px' }}
            onClick={onClick || undefined}
            className={classes(
                styles.button,
                className,
                disabled && styles.disabled,
                styles[variant],
            )}
        >
            {children}
        </button>
    );
};

export default Button;
