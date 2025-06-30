import { notFound, Metadata } from 'next/navigation';
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

// ✅ Dynamic SEO metadata function
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const res = await fetch(`http://localhost:5001/api/article/${slug}`, {
    cache: 'no-store',
  });
  const article = await res.json();

  if (!article?.title) {
    return {
      title: "Article Not Found - TrendWise",
    };
  }

  return {
    title: `${article.title} - TrendWise`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://trendwise.vercel.app/article/${article.slug}`,
      images: [article.coverImage],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetail article={article} />;
} 