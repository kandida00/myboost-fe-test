import React from 'react';
import { Label } from '../../atoms/Label/Label';
import { Input } from '../../atoms/Input/Input';
import { Textarea } from '../../atoms/Textarea/Textarea';
import { Select, SelectOption } from '../../atoms/Select/Select';
import styles from './FormField.module.scss';

type FormFieldType = 'input' | 'textarea' | 'select';

export interface FormFieldProps {
    id: string;
    label: string;
    type?: FormFieldType;
    required?: boolean;
    error?: string;
    fullWidth?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    options?: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    inputType?: string;
    rows?: number;
}

export const FormField: React.FC<FormFieldProps> = ({
    id,
    label,
    type = 'input',
    required = false,
    error,
    fullWidth = true,
    value,
    onChange,
    options = [],
    placeholder,
    disabled = false,
    inputType = 'text',
    rows = 4,
}) => {
    const hasError = Boolean(error);

    const renderInput = () => {
        switch (type) {
            case 'textarea':
                return (
                    <Textarea
                        id={id}
                        value={value}
                        onChange={onChange}
                        hasError={hasError}
                        fullWidth={fullWidth}
                        placeholder={placeholder}
                        disabled={disabled}
                        rows={rows}
                    />
                );
            case 'select':
                return (
                    <Select
                        id={id}
                        value={value}
                        onChange={onChange}
                        options={options}
                        hasError={hasError}
                        fullWidth={fullWidth}
                        placeholder={placeholder}
                        disabled={disabled}
                    />
                );
            default:
                return (
                    <Input
                        id={id}
                        type={inputType}
                        value={value}
                        onChange={onChange}
                        hasError={hasError}
                        fullWidth={fullWidth}
                        placeholder={placeholder}
                        disabled={disabled}
                    />
                );
        }
    };

    return (
        <div className={styles['form-field']}>
            <Label htmlFor={id} required={required}>
                {label}
            </Label>
            {renderInput()}
            {error && <span className={styles['form-field__error']}>{error}</span>}
        </div>
    );
};