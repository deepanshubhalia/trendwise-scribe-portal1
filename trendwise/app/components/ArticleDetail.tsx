'use client';

import { useState, useEffect, useCallback } from 'react';
import { Article } from '@/types/article';
import { Comment } from '@/types/comment';
import CommentList from './comments/CommentList';
import CommentForm from './comments/CommentForm';

interface ArticleDetailProps {
  article: Article;
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [mounted, setMounted] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`${apiUrl}/api/comment/${article.slug}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [article.slug, apiUrl]);

  useEffect(() => {
    setMounted(true);
    fetchComments();
  }, [fetchComments]);

  // Format date consistently
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <img
        src={article.coverImage}
        alt={article.title}
        className="rounded mb-6 w-full h-64 object-cover"
      />
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        Published on {formatDate(article.createdAt)}
      </p>
      
      {/* Render content safely */}
      <div className="prose max-w-none">
        {mounted ? (
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        ) : (
          <div className="space-y-4">
            {article.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
      
      <hr className="my-12" />

      <CommentList comments={comments} />

      <hr className="my-12" />
      
      <CommentForm articleSlug={article.slug} onCommentPosted={fetchComments} apiUrl={apiUrl} />
    </div>
  );
} 