import React from 'react';
import { Header } from '@/components/organisms/Header/Header';
import { BlogList } from '@/components/organisms/BlogList/BlogList';
import { useBlogContext } from '@/context/BlogContext';
import styles from '@/components/pages/HomePage/HomePage.module.scss';

export default function HomePage() {
  const { posts, isLoading } = useBlogContext();

  if (isLoading) {
    return (
      <div className={styles['home-page']}>
        <Header />
        <main className={styles['home-page__main']}>
          <div className={styles['home-page__loading']}>Loading...</div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles['home-page']}>
      <Header />
      <main className={styles['home-page__main']}>
        <BlogList posts={posts} />
      </main>
    </div>
  );
}
