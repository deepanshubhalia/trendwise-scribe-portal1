import { Article } from '@/types/article';

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  const res = await fetch(`${apiUrl}/api/article`, {
    cache: 'no-store',
  });
  const articles: Article[] = await res.json();

  const baseUrl = "https://trendwise.vercel.app";

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${articles
      .map((article) => {
        return `
          <url>
            <loc>${baseUrl}/article/${article.slug}</loc>
            <lastmod>${new Date(article.createdAt).toISOString()}</lastmod>
          </url>
        `;
      })
      .join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
} 