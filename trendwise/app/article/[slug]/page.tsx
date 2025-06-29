import { notFound } from 'next/navigation';
import { Article } from '@/types/article';
import ArticleDetail from '@/app/components/ArticleDetail';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

async function getArticle(slug: string): Promise<Article | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  const res = await fetch(`${apiUrl}/api/article/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetail article={article} />;
} 