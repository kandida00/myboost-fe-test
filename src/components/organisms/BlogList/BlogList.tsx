import React from 'react';
import { BlogPost } from '@/types';
import { BlogCard } from '../../molecules/BlogCard/BlogCard';
import { Button } from '../../atoms/Button/Button';
import { useRouter } from 'next/router';
import styles from './BlogList.module.scss';

export interface BlogListProps {
    posts: BlogPost[];
}

export const BlogList: React.FC<BlogListProps> = ({ posts }) => {
    const router = useRouter();

    const handleCreatePost = () => {
        router.push('/wizard/new');
    };

    if (posts.length === 0) {
        return (
            <div className={styles['blog-list__empty']}>
                <h2 className={styles['blog-list__empty-title']}>No blog posts yet</h2>
                <p className={styles['blog-list__empty-description']}>
                    Start creating your first blog post to share your thoughts with the world.
                </p>
                <Button onClick={handleCreatePost} variant="primary" size="large">
                    Create Your First Post
                </Button>
            </div>
        );
    }

    return (
        <div className={styles['blog-list']}>
            <div className={styles['blog-list__header']}>
                <h2 className={styles['blog-list__title']}>All Blog Posts</h2>
                <Button onClick={handleCreatePost} variant="primary">
                    Create New Post
                </Button>
            </div>
            <div className={styles['blog-list__grid']}>
                {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};