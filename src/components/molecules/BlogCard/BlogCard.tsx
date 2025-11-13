import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BlogPost } from '@/types';
import { formatDate } from '@/utils/dateHelpers';
import { Button } from '@/components/atoms/Button/Button';
import { useBlogContext } from '@/context/BlogContext';
import styles from './BlogCard.module.scss';
import ModalDelete from '../ModalDelete/ModalDelete';

export interface BlogCardProps {
    post: BlogPost;
    showActions?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, showActions = false }) => {
    const router = useRouter();
    const { deletePost } = useBlogContext();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/wizard/edit/${post.id}`);
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = () => {
        deletePost(post.id);
        setShowDeleteConfirm(false);
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirm(false);
    };

    return (
        <>
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
                {showActions && (
                    <div className={styles['blog-card__actions']}>
                        <Button onClick={handleEdit} variant="outline" size="small">
                            Edit
                        </Button>
                        <Button onClick={handleDeleteClick} variant="danger" size="small">
                            Delete
                        </Button>
                    </div>
                )}
            </Link>
            {showDeleteConfirm && (
                <ModalDelete onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} />
            )}
        </>
    );
};