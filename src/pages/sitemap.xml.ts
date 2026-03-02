import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString() || 'https://www.ocwebpros.com';
  
  // Define all your pages with their priorities and change frequencies
  const pages = [
    { url: '', priority: '1.0', changefreq: 'weekly' }, // homepage
    { url: 'about', priority: '0.8', changefreq: 'monthly' },
    { url: 'services', priority: '0.9', changefreq: 'weekly' },
    { url: 'pricing', priority: '0.9', changefreq: 'weekly' },
    { url: 'portfolio', priority: '0.8', changefreq: 'weekly' },
    { url: 'industries', priority: '0.8', changefreq: 'monthly' },
    { url: 'blog', priority: '0.8', changefreq: 'weekly' },
    { url: 'blog/how-to-improve-local-seo', priority: '0.7', changefreq: 'monthly' },
    { url: 'hosting', priority: '0.7', changefreq: 'monthly' },
    { url: 'support', priority: '0.7', changefreq: 'monthly' },
    { url: 'contact', priority: '0.9', changefreq: 'monthly' },
  ];

  const lastmod = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
