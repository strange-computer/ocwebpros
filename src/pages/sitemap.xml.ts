import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString() || 'https://www.ocwebpros.com';
  
  // Define all your pages with their priorities and change frequencies
  const pages = [
    { url: '', priority: '1.0', changefreq: 'weekly' }, // homepage
    { url: 'about', priority: '0.8', changefreq: 'monthly' },
    { url: 'services', priority: '0.9', changefreq: 'weekly' },
    { url: 'service-areas', priority: '0.8', changefreq: 'monthly' },
    { url: 'pricing', priority: '0.9', changefreq: 'weekly' },
    { url: 'portfolio', priority: '0.8', changefreq: 'weekly' },
    { url: 'industries', priority: '0.8', changefreq: 'monthly' },
    { url: 'hosting', priority: '0.7', changefreq: 'monthly' },
    { url: 'support', priority: '0.7', changefreq: 'monthly' },
    { url: 'contact', priority: '0.9', changefreq: 'monthly' },
    // Blog index
    { url: 'blog', priority: '0.8', changefreq: 'weekly' },
    // Blog posts
    { url: 'blog/how-to-improve-local-seo', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/website-cost-orange-county', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/best-web-design-companies-orange-county', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/local-seo-orange-county-small-business', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/web-design-vs-diy-website-builders-orange-county', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/website-maintenance-orange-county', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/algorithmic-liberation-seo-big-brother-control-2026', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/google-sge-ai-search-optimization-guide-2026', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/2026-03-19-generative-engine-optimization-geo-playbook', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/2026-03-19-synthetic-authority-ai-trust', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/2026-03-19-ai-overviews-web-design-seo-outline', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/2026-03-23-ai-ready-web-design-ai-overviews', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/2026-03-23-ai-infrastructure-race-orange-county-businesses', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/ecommerce-website-design-orange-county-2026-trends', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/choose-web-design-agency-orange-county', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/restaurant-website-design-orange-county', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/2026-03-23-apple-m5-chip-4x-faster-ai-inference-web-development-2026', priority: '0.7', changefreq: 'monthly' },
    
    { url: 'blog/2026-03-26-ahrefs-seo-checklist-2026-ai-optimization', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/2026-03-26-local-seo-trends-2026-ai-first-optimization', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/2026-03-26-ai-for-seo-content-step-by-step-guide', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/2026-03-26-brand-signals-eeat-ai-content-differentiation', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/2026-03-26-ai-first-local-seo-orange-county-2026', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/2026-03-26-visual-seo-geotagged-photos-local-search', priority: '0.7', changefreq: 'monthly' },
    { url: 'blog/2026-03-26-multi-channel-visibility-2026', priority: '0.7', changefreq: 'monthly' },
  ];

  const lastmod = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${siteUrl}${page.url ? '/' + page.url : ''}</loc>
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
