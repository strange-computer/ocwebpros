import type { APIRoute } from 'astro';

interface BlogFrontmatter {
  title?: string;
  description?: string;
  pubDate?: string;
  author?: string;
  category?: string;
  draft?: boolean;
}

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = (site?.toString() || 'https://ocwebpros.com').replace(/\/$/, '');

  const allPosts = import.meta.glob('./blog/*.md', { eager: true }) as Record<
    string,
    { frontmatter: BlogFrontmatter }
  >;

  const items = Object.entries(allPosts)
    .map(([path, post]) => ({
      slug: path.replace('./blog/', '').replace('.md', ''),
      fm: post.frontmatter ?? {},
    }))
    .filter(({ slug, fm }) => slug !== 'README' && fm.draft !== true && fm.title && fm.pubDate)
    .sort((a, b) => new Date(b.fm.pubDate!).getTime() - new Date(a.fm.pubDate!).getTime())
    .slice(0, 50);

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>OCWebPros Blog</title>
    <link>${siteUrl}/blog/</link>
    <description>Web design, local SEO, and digital marketing insights for Orange County businesses from OCWebPros in Lake Forest, CA.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${items
  .map(
    ({ slug, fm }) => `    <item>
      <title>${escapeXml(fm.title!)}</title>
      <link>${siteUrl}/blog/${slug}/</link>
      <guid isPermaLink="true">${siteUrl}/blog/${slug}/</guid>
      <pubDate>${new Date(fm.pubDate!).toUTCString()}</pubDate>${
        fm.description ? `\n      <description>${escapeXml(fm.description)}</description>` : ''
      }${fm.category ? `\n      <category>${escapeXml(fm.category)}</category>` : ''}
    </item>`
  )
  .join('\n')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
