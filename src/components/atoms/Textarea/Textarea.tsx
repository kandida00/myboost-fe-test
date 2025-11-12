import React from 'react';
import styles from './Textarea.module.scss';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    hasError?: boolean;
    fullWidth?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
    hasError = false,
    fullWidth = false,
    className = '',
    ...props
}) => {
    const textareaClasses = [
        styles.textarea,
        hasError ? styles['textarea--error'] : '',
        fullWidth ? styles['textarea--full-width'] : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return <textarea className={textareaClasses} {...props} />;
};