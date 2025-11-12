import React from 'react';
import styles from './WizardStepIndicator.module.scss';

export interface WizardStepIndicatorProps {
    currentStep: number;
    totalSteps: number;
    stepLabels: string[];
}

export const WizardStepIndicator: React.FC<WizardStepIndicatorProps> = ({
    currentStep,
    totalSteps,
    stepLabels,
}) => {
    return (
        <div className={styles['wizard-step-indicator']}>
            {Array.from({ length: totalSteps }, (_, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;

                return (
                    <div
                        key={stepNumber}
                        className={`${styles['wizard-step-indicator__step']} ${isActive ? styles['wizard-step-indicator__step--active'] : ''
                            } ${isCompleted ? styles['wizard-step-indicator__step--completed'] : ''}`}
                    >
                        <div className={styles['wizard-step-indicator__circle']}>
                            {isCompleted ? '✓' : stepNumber}
                        </div>
                        <span className={styles['wizard-step-indicator__label']}>
                            {stepLabels[index]}
                        </span>
                        {stepNumber < totalSteps && (
                            <div className={styles['wizard-step-indicator__line']} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};