import React from 'react';
import styles from './Label.module.scss';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
    children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({
    required = false,
    children,
    className = '',
    ...props
}) => {
    const labelClasses = [styles.label, className].filter(Boolean).join(' ');

    return (
        <label className={labelClasses} {...props}>
            {children}
            {required && <span className={styles.label__required}>*</span>}
        </label>
    );
};