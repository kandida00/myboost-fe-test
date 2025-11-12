import React from 'react';
import { Header } from '@/components/organisms/Header/Header';
import { Wizard } from '@/components/organisms/Wizard/Wizard';
import { WizardProvider } from '@/context/WizardContext';
import styles from '@/components/pages/WizardPage/WizardPage.module.scss';

export default function WizardPage() {
    return (
        <WizardProvider>
            <div className={styles['wizard-page']}>
                <Header />
                <main className={styles['wizard-page__main']}>
                    <div className={styles['wizard-page__container']}>
                        <h1 className={styles['wizard-page__title']}>Create a New Blog Post</h1>
                        <p className={styles['wizard-page__description']}>
                            Follow the steps below to create and publish your blog post.
                        </p>
                        <Wizard />
                    </div>
                </main>
            </div>
        </WizardProvider>
    );
}