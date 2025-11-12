import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <Link href="/" className={styles.header__logo}>
                    <h1 className={styles.header__title}>Blog Platform</h1>
                </Link>
                <nav className={styles.header__nav}>
                    <Link href="/" className={styles.header__link}>
                        Home
                    </Link>
                    <Link href="/wizard/new" className={styles.header__link}>
                        Create Post
                    </Link>
                </nav>
            </div>
        </header>
    );
};