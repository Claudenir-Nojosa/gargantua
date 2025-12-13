// lib/types.ts

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  category: string;
  tags: string[];
  readTime: number;
  date: string;
  author: string;
  featured: boolean;
  language: string;
  coverImage?: string;
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string;
  content: string;
  coverImage?: string;  
}
