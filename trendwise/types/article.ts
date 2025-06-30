export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  createdAt: string;
  content: string;
  category?: string;
  readTime?: string;
  author?: {
    name: string;
    avatar: string;
  };
} 