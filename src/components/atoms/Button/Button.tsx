import React from 'react';
import styles from './Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    children,
    className = '',
    ...props
}) => {
    const buttonClasses = [
        styles.button,
        styles[`button--${variant}`],
        styles[`button--${size}`],
        fullWidth ? styles['button--full-width'] : '',
        disabled ? styles['button--disabled'] : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button className={buttonClasses} disabled={disabled} {...props}>
            {children}
        </button>
    );
};