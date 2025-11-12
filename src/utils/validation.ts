import { BlogFormData } from '@/types';

export interface ValidationErrors {
    [key: string]: string | undefined;
    title?: string;
    author?: string;
    summary?: string;
    category?: string;
    content?: string;
}

export const validateBlogFormData = (data: Partial<BlogFormData>, step: number): ValidationErrors => {
    const errors: ValidationErrors = {};

    switch (step) {
        case 1:
            if (!data.title || data.title.trim() === '') {
                errors.title = 'Blog title is required';
            } else if (data.title.trim().length < 3) {
                errors.title = 'Title must be at least 3 characters';
            } else if (data.title.trim().length > 100) {
                errors.title = 'Title must be less than 100 characters';
            }

            if (!data.author || data.author.trim() === '') {
                errors.author = 'Author name is required';
            } else if (data.author.trim().length < 2) {
                errors.author = 'Author name must be at least 2 characters';
            } else if (data.author.trim().length > 50) {
                errors.author = 'Author name must be less than 50 characters';
            }
            break;

        case 2:
            if (!data.summary || data.summary.trim() === '') {
                errors.summary = 'Blog summary is required';
            } else if (data.summary.trim().length < 10) {
                errors.summary = 'Summary must be at least 10 characters';
            } else if (data.summary.trim().length > 500) {
                errors.summary = 'Summary must be less than 500 characters';
            }

            if (!data.category) {
                errors.category = 'Please select a category';
            }
            break;

        case 3:
            if (!data.content || data.content.trim() === '') {
                errors.content = 'Blog content is required';
            } else if (data.content.trim().length < 50) {
                errors.content = 'Content must be at least 50 characters';
            } else if (data.content.trim().length > 10000) {
                errors.content = 'Content must be less than 10000 characters';
            }
            break;

        default:
            break;
    }

    return errors;
};

export const isStepValid = (data: Partial<BlogFormData>, step: number): boolean => {
    const errors = validateBlogFormData(data, step);
    return Object.keys(errors).length === 0;
};

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};