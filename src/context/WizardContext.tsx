import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BlogFormData, BlogCategory } from '@/types';

export interface WizardContextType {
    currentStep: number;
    formData: BlogFormData;
    setCurrentStep: (step: number) => void;
    updateFormData: (data: Partial<BlogFormData>) => void;
    resetWizard: () => void;
    nextStep: () => void;
    prevStep: () => void;
    totalSteps: number;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export interface WizardProviderProps {
    children: ReactNode;
}

const initialFormData: BlogFormData = {
    title: '',
    author: '',
    summary: '',
    category: '' as BlogCategory,
    content: '',
};

export const WizardProvider: React.FC<WizardProviderProps> = ({ children }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<BlogFormData>(initialFormData);

    const totalSteps = 4;

    const updateFormData = (data: Partial<BlogFormData>) => {
        setFormData((prev) => ({
            ...prev,
            ...data,
        }));
    };

    const resetWizard = () => {
        setCurrentStep(1);
        setFormData(initialFormData);
    };

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const value: WizardContextType = {
        currentStep,
        formData,
        setCurrentStep,
        updateFormData,
        resetWizard,
        nextStep,
        prevStep,
        totalSteps,
    };

    return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
};

export const useWizardContext = (): WizardContextType => {
    const context = useContext(WizardContext);
    if (!context) {
        throw new Error('useWizardContext must be used within a WizardProvider');
    }
    return context;
};