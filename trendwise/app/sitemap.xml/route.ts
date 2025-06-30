export async function GET() {
  const res = await fetch("http://localhost:5001/api/article", {
    cache: 'no-store',
  });
  const articles = await res.json();

  const baseUrl = "https://trendwise.vercel.app";

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${articles
      .map((article: any) => {
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