import type { APIRoute } from 'astro';
import { cityLocalSeoPages } from '../data/cityLocalSeoPages';
import { cityWebDesignPages } from '../data/cityWebDesignPages';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = (site?.toString() || 'https://ocwebpros.com').replace(/\/$/, '');

  const citySeoPages = cityLocalSeoPages.map((city) => ({
    url: `local-seo/${city.slug}`,
    priority: '0.9',
    changefreq: 'weekly',
  }));

  const cityWebPages = cityWebDesignPages.map((city) => ({
    url: `web-design/${city.slug}`,
    priority: '0.9',
    changefreq: 'weekly',
  }));

  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'weekly' },
    { url: 'about', priority: '0.8', changefreq: 'monthly' },
    { url: 'services', priority: '0.9', changefreq: 'weekly' },
    { url: 'services/web-design', priority: '0.9', changefreq: 'weekly' },
    { url: 'services/local-seo', priority: '0.9', changefreq: 'weekly' },
    { url: 'services/seo-strategy', priority: '0.9', changefreq: 'weekly' },
    { url: 'services/ai-consulting', priority: '0.9', changefreq: 'weekly' },
    { url: 'service-areas', priority: '0.8', changefreq: 'monthly' },
    { url: 'pricing', priority: '0.9', changefreq: 'weekly' },
    { url: 'portfolio', priority: '0.8', changefreq: 'weekly' },
    { url: 'industries', priority: '0.8', changefreq: 'monthly' },
    { url: 'hosting', priority: '0.7', changefreq: 'monthly' },
    { url: 'support', priority: '0.7', changefreq: 'monthly' },
    { url: 'website-maintenance-orange-county', priority: '0.8', changefreq: 'monthly' },
    { url: 'contact', priority: '0.9', changefreq: 'monthly' },
    { url: 'blog', priority: '0.8', changefreq: 'weekly' },
    { url: 'newsletter', priority: '0.7', changefreq: 'monthly' },
    ...citySeoPages,
    ...cityWebPages,
  ];

  const allPosts = await import.meta.glob('./blog/*.md', { eager: true }) as Record<string, { frontmatter: { draft?: boolean; pubDate?: string } }>;
  const blogPages = Object.entries(allPosts)
    .filter(([path, post]) => {
      const slug = path.replace('./blog/', '').replace('.md', '');
      if (slug === 'README') return false;
      if (post.frontmatter?.draft === true) return false;
      return true;
    })
    .map(([path, post]) => {
      const slug = path.replace('./blog/', '').replace('.md', '');
      const lastmod = post.frontmatter?.pubDate
        ? new Date(post.frontmatter.pubDate).toISOString()
        : new Date().toISOString();
      return { url: `blog/${slug}`, priority: '0.7', changefreq: 'monthly', lastmod };
    })
    .sort((a, b) => b.lastmod.localeCompare(a.lastmod));

  const pages = [...staticPages, ...blogPages];
  const buildTime = new Date().toISOString();

  const sitemapLoc = (path: string) => (path ? `${siteUrl}/${path}/` : `${siteUrl}/`);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${sitemapLoc(page.url)}</loc>
    <lastmod>${('lastmod' in page ? page.lastmod : buildTime)}</lastmod>
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
