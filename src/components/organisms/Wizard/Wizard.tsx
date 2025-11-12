import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useWizardContext } from '@/context/WizardContext';
import { useBlogContext } from '@/context/BlogContext';
import { WizardStepIndicator } from '../../molecules/WizardStepIndicator/WizardStepIndicator';
import { FormField } from '../../molecules/FormField/FormField';
import { Button } from '../../atoms/Button/Button';
import { SelectOption } from '../../atoms/Select/Select';
import { validateBlogFormData } from '@/utils/validation';
import styles from './Wizard.module.scss';

const categoryOptions: SelectOption[] = [
    { value: 'Tech', label: 'Tech' },
    { value: 'Lifestyle', label: 'Lifestyle' },
    { value: 'Business', label: 'Business' },
];

const stepLabels = ['Metadata', 'Summary', 'Content', 'Review'];

export const Wizard: React.FC = () => {
    const router = useRouter();
    const { currentStep, formData, updateFormData, nextStep, prevStep, resetWizard, totalSteps } = useWizardContext();
    const { addPost } = useBlogContext();
    const [errors, setErrors] = useState<Record<string, string | undefined>>({});

    const handleFieldChange = (field: keyof typeof formData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        updateFormData({ [field]: e.target.value });
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleNext = () => {
        const validationErrors = validateBlogFormData(formData, currentStep);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        nextStep();
    };

    const handleBack = () => {
        setErrors({});
        prevStep();
    };

    const handleSubmit = () => {
        try {
            const newPost = addPost(formData);
            resetWizard();
            router.push(`/blog/${newPost.id}`);
        } catch (error) {
            console.error('Error creating post:', error);
            setErrors({ submit: 'Failed to create post. Please try again.' });
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className={styles.wizard__step}>
                        <h2 className={styles.wizard__step_title}>Blog Metadata</h2>
                        <p className={styles.wizard__step_description}>
                            Enter the basic information about your blog post.
                        </p>
                        <FormField
                            id="title"
                            label="Blog Title"
                            type="input"
                            required
                            value={formData.title}
                            onChange={handleFieldChange('title')}
                            error={errors.title}
                            placeholder="Enter your blog title"
                        />
                        <FormField
                            id="author"
                            label="Author Name"
                            type="input"
                            required
                            value={formData.author}
                            onChange={handleFieldChange('author')}
                            error={errors.author}
                            placeholder="Enter author name"
                        />
                    </div>
                );

            case 2:
                return (
                    <div className={styles.wizard__step}>
                        <h2 className={styles.wizard__step_title}>Blog Summary & Category</h2>
                        <p className={styles.wizard__step_description}>
                            Provide a brief summary and select a category for your blog post.
                        </p>
                        <FormField
                            id="summary"
                            label="Blog Summary"
                            type="textarea"
                            required
                            value={formData.summary}
                            onChange={handleFieldChange('summary')}
                            error={errors.summary}
                            placeholder="Write a brief summary of your blog post"
                            rows={4}
                        />
                        <FormField
                            id="category"
                            label="Blog Category"
                            type="select"
                            required
                            value={formData.category}
                            onChange={handleFieldChange('category')}
                            options={categoryOptions}
                            error={errors.category}
                            placeholder="Select a category"
                        />
                    </div>
                );

            case 3:
                return (
                    <div className={styles.wizard__step}>
                        <h2 className={styles.wizard__step_title}>Blog Content</h2>
                        <p className={styles.wizard__step_description}>
                            Write the main content of your blog post.
                        </p>
                        <FormField
                            id="content"
                            label="Blog Content"
                            type="textarea"
                            required
                            value={formData.content}
                            onChange={handleFieldChange('content')}
                            error={errors.content}
                            placeholder="Write your blog content here..."
                            rows={12}
                        />
                    </div>
                );

            case 4:
                return (
                    <div className={styles.wizard__step}>
                        <h2 className={styles.wizard__step_title}>Review & Submit</h2>
                        <p className={styles.wizard__step_description}>
                            Review your blog post before submitting.
                        </p>
                        <div className={styles.wizard__review}>
                            <div className={styles.wizard__review_section}>
                                <h3 className={styles.wizard__review_label}>Title</h3>
                                <p className={styles.wizard__review_value}>{formData.title}</p>
                            </div>
                            <div className={styles.wizard__review_section}>
                                <h3 className={styles.wizard__review_label}>Author</h3>
                                <p className={styles.wizard__review_value}>{formData.author}</p>
                            </div>
                            <div className={styles.wizard__review_section}>
                                <h3 className={styles.wizard__review_label}>Category</h3>
                                <p className={styles.wizard__review_value}>{formData.category}</p>
                            </div>
                            <div className={styles.wizard__review_section}>
                                <h3 className={styles.wizard__review_label}>Summary</h3>
                                <p className={styles.wizard__review_value}>{formData.summary}</p>
                            </div>
                            <div className={styles.wizard__review_section}>
                                <h3 className={styles.wizard__review_label}>Content</h3>
                                <p className={styles.wizard__review_value}>{formData.content}</p>
                            </div>
                        </div>
                        {errors.submit && (
                            <div className={styles.wizard__error}>{errors.submit}</div>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className={styles.wizard}>
            <WizardStepIndicator
                currentStep={currentStep}
                totalSteps={totalSteps}
                stepLabels={stepLabels}
            />
            <div className={styles.wizard__content}>{renderStep()}</div>
            <div className={styles.wizard__actions}>
                {currentStep > 1 && (
                    <Button onClick={handleBack} variant="secondary">
                        Back
                    </Button>
                )}
                <div className={styles.wizard__actions_right}>
                    {currentStep < totalSteps ? (
                        <Button onClick={handleNext} variant="primary">
                            Next
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit} variant="primary">
                            Submit
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};