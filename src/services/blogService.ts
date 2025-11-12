import { BlogPost, BlogFormData } from '@/types';

const STORAGE_KEY = 'blog_posts';

export const blogService = {
    getAllPosts: (): BlogPost[] => {
        if (typeof window === 'undefined') {
            return [];
        }

        try {
            const posts = localStorage.getItem(STORAGE_KEY);
            return posts ? JSON.parse(posts) : [];
        } catch (error) {
            console.error('Error reading blog posts:', error);
            return [];
        }
    },

    getPostById: (id: string): BlogPost | null => {
        const posts = blogService.getAllPosts();
        return posts.find((post) => post.id === id) || null;
    },

    createPost: (formData: BlogFormData): BlogPost => {
        const newPost: BlogPost = {
            id: generateId(),
            ...formData,
            createdAt: new Date().toISOString(),
        };

        const posts = blogService.getAllPosts();
        const updatedPosts = [...posts, newPost];

        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
        }

        return newPost;
    },

    updatePost: (id: string, formData: BlogFormData): BlogPost | null => {
        const posts = blogService.getAllPosts();
        const index = posts.findIndex((post) => post.id === id);

        if (index === -1) {
            return null;
        }

        const updatedPost: BlogPost = {
            ...posts[index],
            ...formData,
        };

        posts[index] = updatedPost;

        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
        }

        return updatedPost;
    },

    deletePost: (id: string): boolean => {
        const posts = blogService.getAllPosts();
        const filteredPosts = posts.filter((post) => post.id !== id);

        if (posts.length === filteredPosts.length) {
            return false; // Post not found
        }

        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPosts));
        }

        return true;
    },

    clearAllPosts: (): void => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(STORAGE_KEY);
        }
    },
};

function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}