import React from 'react';
import { useRouter } from 'next/router';
import { Header } from '@/components/organisms/Header/Header';
import { Button } from '@/components/atoms/Button/Button';
import { useBlogContext } from '@/context/BlogContext';
import { formatDate } from '@/utils/dateHelpers';
import styles from '@/components/pages/BlogDetailPage/BlogDetailPage.module.scss';

export default function BlogDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    const { getPostById } = useBlogContext();

    const post = id && typeof id === 'string' ? getPostById(id) : null;

    const handleBackToHome = () => {
        router.push('/');
    };

    if (!post) {
        return (
            <div className={styles['blog-detail-page']}>
                <Header />
                <main className={styles['blog-detail-page__main']}>
                    <div className={styles['blog-detail-page__not-found']}>
                        <h1 className={styles['blog-detail-page__not-found-title']}>
                            Blog Post Not Found
                        </h1>
                        <p className={styles['blog-detail-page__not-found-description']}>
                            The blog post you're looking for doesn't exist or has been removed.
                        </p>
                        <Button onClick={handleBackToHome} variant="primary">
                            Back to Home
                        </Button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className={styles['blog-detail-page']}>
            <Header />
            <main className={styles['blog-detail-page__main']}>
                <article className={styles['blog-detail-page__article']}>
                    <div className={styles['blog-detail-page__header']}>
                        <h1 className={styles['blog-detail-page__title']}>{post.title}</h1>
                        <div className={styles['blog-detail-page__meta']}>
                            <span className={styles['blog-detail-page__author']}>
                                By {post.author}
                            </span>
                            <span className={styles['blog-detail-page__separator']}>•</span>
                            <span className={styles['blog-detail-page__date']}>
                                {formatDate(post.createdAt)}
                            </span>
                            <span className={styles['blog-detail-page__separator']}>•</span>
                            <span className={styles['blog-detail-page__category']}>
                                {post.category}
                            </span>
                        </div>
                    </div>
                    <div className={styles['blog-detail-page__summary']}>
                        <h2 className={styles['blog-detail-page__summary-title']}>Summary</h2>
                        <p className={styles['blog-detail-page__summary-text']}>{post.summary}</p>
                    </div>
                    <div className={styles['blog-detail-page__content']}>
                        <p className={styles['blog-detail-page__content-text']}>{post.content}</p>
                    </div>
                    <div className={styles['blog-detail-page__actions']}>
                        <Button onClick={handleBackToHome} variant="outline">
                            Back to Home
                        </Button>
                    </div>
                </article>
            </main>
        </div>
    );
}