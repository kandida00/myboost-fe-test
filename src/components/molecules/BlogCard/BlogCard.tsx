import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { formatDate } from '@/utils/dateHelpers';
import styles from './BlogCard.module.scss';

export interface BlogCardProps {
    post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    return (
        <Link href={`/blog/${post.id}`} className={styles['blog-card']}>
            <div className={styles['blog-card__header']}>
                <h3 className={styles['blog-card__title']}>{post.title}</h3>
                <span className={styles['blog-card__category']}>{post.category}</span>
            </div>
            <div className={styles['blog-card__meta']}>
                <div>By <span className={styles['blog-card__author']}>{post.author}</span></div>
                <span className={styles['blog-card__date']}>{formatDate(post.createdAt)}</span>
            </div>
            <p className={styles['blog-card__summary']}>{post.summary}</p>
        </Link>
    );
};