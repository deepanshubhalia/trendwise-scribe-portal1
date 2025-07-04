"use client";

import Link from "next/link";
import { Badge } from "@/app/components/ui/badge";
import Image from "next/image";

interface ArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
  };
}

const ArticleCard = ({
  id,
  title,
  excerpt,
  coverImage,
  category,
  readTime,
  publishedAt,
  author,
}: ArticleCardProps) => {
  // Fallbacks for missing author or avatar
  const safeAuthor = author || { name: 'Unknown', avatar: '/default-avatar.svg' };
  const avatarSrc = safeAuthor.avatar || '/default-avatar.svg';
  const authorName = safeAuthor.name || 'Unknown';
  return (
    <Link href={`/article/${id}`} className="block group">
      <article className="article-card">
        <div className="aspect-video overflow-hidden">
          <Image
            src={coverImage || '/default-cover.jpg'}
            alt={title}
            width={800}
            height={450}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {readTime} 2 {publishedAt}
            </span>
          </div>
          
          <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
            {excerpt}
          </p>
          
          <div className="flex items-center gap-3">
            <img
              src={avatarSrc}
              alt={authorName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium">{authorName}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard; 