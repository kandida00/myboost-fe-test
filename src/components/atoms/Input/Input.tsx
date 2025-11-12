import React from 'react';
import styles from './Input.module.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
    fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
    hasError = false,
    fullWidth = false,
    className = '',
    ...props
}) => {
    const inputClasses = [
        styles.input,
        hasError ? styles['input--error'] : '',
        fullWidth ? styles['input--full-width'] : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return <input className={inputClasses} {...props} />;
};