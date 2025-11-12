export interface BlogPost {
    id: string;
    title: string;
    author: string;
    summary: string;
    category: BlogCategory;
    content: string;
    createdAt: string;
}

export type BlogCategory = 'Tech' | 'Lifestyle' | 'Business';

export interface BlogFormData {
    title: string;
    author: string;
    summary: string;
    category: BlogCategory;
    content: string;
}