import { useState, useCallback } from 'react';

export interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => boolean;
}

export interface FieldValidation {
    [key: string]: ValidationRule;
}

export interface FormErrors {
    [key: string]: string;
}

export interface UseFormReturn<T> {
    values: T;
    errors: FormErrors;
    handleChange: (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleBlur: (field: keyof T) => () => void;
    validateField: (field: keyof T) => boolean;
    validateForm: () => boolean;
    resetForm: () => void;
    setFieldValue: (field: keyof T, value: string) => void;
    setValues: (values: T) => void;
}

export function useForm<T extends Record<string, string>>(
    initialValues: T,
    validationRules: FieldValidation
): UseFormReturn<T> {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validateField = useCallback(
        (field: keyof T): boolean => {
            const value = values[field];
            const rules = validationRules[field as string];

            if (!rules) return true;

            // Required validation
            if (rules.required && (!value || value.trim() === '')) {
                setErrors((prev) => ({
                    ...prev,
                    [field]: 'This field is required',
                }));
                return false;
            }

            // Min length validation
            if (rules.minLength && value.length < rules.minLength) {
                setErrors((prev) => ({
                    ...prev,
                    [field]: `Minimum length is ${rules.minLength} characters`,
                }));
                return false;
            }

            // Max length validation
            if (rules.maxLength && value.length > rules.maxLength) {
                setErrors((prev) => ({
                    ...prev,
                    [field]: `Maximum length is ${rules.maxLength} characters`,
                }));
                return false;
            }

            // Pattern validation
            if (rules.pattern && !rules.pattern.test(value)) {
                setErrors((prev) => ({
                    ...prev,
                    [field]: 'Invalid format',
                }));
                return false;
            }

            // Custom validation
            if (rules.custom && !rules.custom(value)) {
                setErrors((prev) => ({
                    ...prev,
                    [field]: 'Invalid value',
                }));
                return false;
            }

            // Clear error if validation passes
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field as string];
                return newErrors;
            });

            return true;
        },
        [values, validationRules]
    );

    const validateForm = useCallback((): boolean => {
        const fields = Object.keys(validationRules) as (keyof T)[];
        const validationResults = fields.map((field) => validateField(field));
        return validationResults.every((result) => result === true);
    }, [validationRules, validateField]);

    const handleChange = useCallback(
        (field: keyof T) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
                const newValue = e.target.value;
                setValues((prev) => ({
                    ...prev,
                    [field]: newValue,
                }));

                // Validate if field has been touched
                if (touched[field as string]) {
                    setTimeout(() => validateField(field), 0);
                }
            },
        [touched, validateField]
    );

    const handleBlur = useCallback(
        (field: keyof T) => () => {
            setTouched((prev) => ({
                ...prev,
                [field]: true,
            }));
            validateField(field);
        },
        [validateField]
    );

    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    }, [initialValues]);

    const setFieldValue = useCallback((field: keyof T, value: string) => {
        setValues((prev) => ({
            ...prev,
            [field]: value,
        }));
    }, []);

    return {
        values,
        errors,
        handleChange,
        handleBlur,
        validateField,
        validateForm,
        resetForm,
        setFieldValue,
        setValues,
    };
}