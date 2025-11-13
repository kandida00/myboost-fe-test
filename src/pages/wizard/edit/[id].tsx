import React from 'react';
import { useRouter } from 'next/router';
import { Header } from '@/components/organisms/Header/Header';
import { Wizard } from '@/components/organisms/Wizard/Wizard';
import { WizardProvider } from '@/context/WizardContext';
import { useBlogContext } from '@/context/BlogContext';
import { Button } from '@/components/atoms/Button/Button';
import styles from '@/components/pages/WizardPage/WizardPage.module.scss';

export default function EditWizardPage() {
    const router = useRouter();
    const { id } = router.query;
    const { getPostById } = useBlogContext();

    const post = id && typeof id === 'string' ? getPostById(id) : null;

    const handleBackToPost = () => {
        if (id && typeof id === 'string') {
            router.push(`/blog/${id}`);
        }
    };

    if (!post) {
        return (
            <div className={styles['wizard-page']}>
                <Header />
                <main className={styles['wizard-page__main']}>
                    <div className={styles['wizard-page__container']}>
                        <h1 className={styles['wizard-page__title']}>Post Not Found</h1>
                        <p className={styles['wizard-page__description']}>
                            The blog post you're trying to edit doesn't exist or has been removed.
                        </p>
                        <Button onClick={() => router.push('/')} variant="primary">
                            Back to Home
                        </Button>
                    </div>
                </main>
            </div>
        );
    }

    const initialData = {
        title: post.title,
        author: post.author,
        summary: post.summary,
        category: post.category,
        content: post.content,
    };

    return (
        <WizardProvider initialData={initialData}>
            <div className={styles['wizard-page']}>
                <Header />
                <main className={styles['wizard-page__main']}>
                    <div className={styles['wizard-page__container']}>
                        <h1 className={styles['wizard-page__title']}>Edit Blog Post</h1>
                        <p className={styles['wizard-page__description']}>
                            Update your blog post using the form below.
                        </p>
                        <Wizard editPostId={id as string} handleBackToPost={handleBackToPost} />
                    </div>
                </main>
            </div>
        </WizardProvider>
    );
}