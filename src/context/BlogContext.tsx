import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BlogPost, BlogFormData } from '@/types';
import { blogService } from '@/services/blogService';

export interface BlogContextType {
    posts: BlogPost[];
    isLoading: boolean;
    addPost: (formData: BlogFormData) => BlogPost;
    getPostById: (id: string) => BlogPost | null;
    deletePost: (id: string) => boolean;
    refreshPosts: () => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export interface BlogProviderProps {
    children: ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPosts = () => {
            try {
                const allPosts = blogService.getAllPosts();
                setPosts(allPosts);
            } catch (error) {
                console.error('Error loading posts:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadPosts();
    }, []);

    const addPost = (formData: BlogFormData): BlogPost => {
        const newPost = blogService.createPost(formData);
        setPosts((prevPosts) => [...prevPosts, newPost]);
        return newPost;
    };

    const getPostById = (id: string): BlogPost | null => {
        return posts.find((post) => post.id === id) || null;
    };

    const deletePost = (id: string): boolean => {
        const success = blogService.deletePost(id);
        if (success) {
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        }
        return success;
    };

    const refreshPosts = () => {
        const allPosts = blogService.getAllPosts();
        setPosts(allPosts);
    };

    const value: BlogContextType = {
        posts,
        isLoading,
        addPost,
        getPostById,
        deletePost,
        refreshPosts,
    };

    return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlogContext = (): BlogContextType => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error('useBlogContext must be used within a BlogProvider');
    }
    return context;
};