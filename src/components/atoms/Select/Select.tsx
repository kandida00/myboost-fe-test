import React from 'react';
import styles from './Select.module.scss';

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: SelectOption[];
    hasError?: boolean;
    fullWidth?: boolean;
    placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
    options,
    hasError = false,
    fullWidth = false,
    placeholder = 'Select an option',
    className = '',
    ...props
}) => {
    const selectClasses = [
        styles.select,
        hasError ? styles['select--error'] : '',
        fullWidth ? styles['select--full-width'] : '',
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <select className={selectClasses} {...props}>
            {placeholder && (
                <option value="" disabled>
                    {placeholder}
                </option>
            )}
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};