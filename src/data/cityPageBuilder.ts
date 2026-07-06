import type { CityServicePageData } from './cityPageTypes';
import type { CityRegistryEntry } from './cityRegistry';

type ServiceKind = 'local-seo' | 'web-design';

function blogFor(city: CityRegistryEntry, kind: ServiceKind) {
  if (kind === 'web-design') {
    return {
      blogSlug: city.webDesignBlogSlug ?? city.blogSlug ?? 'choose-web-design-agency-orange-county',
      blogTitle: city.webDesignBlogTitle ?? city.blogTitle ?? 'How to Choose a Web Design Agency in Orange County',
    };
  }
  return {
    blogSlug: city.blogSlug ?? 'local-seo-orange-county-small-business',
    blogTitle: city.blogTitle ?? 'Why Local SEO Matters for Orange County Small Businesses',
  };
}

export function buildLocalSeoPage(city: CityRegistryEntry): CityServicePageData {
  const blog = blogFor(city, 'local-seo');
  return {
    slug: city.slug,
    name: city.name,
    shortName: city.shortName,
    badge: city.badge,
    title: `Local SEO Services in ${city.name}, CA | OCWebPros`,
    description: `Local SEO services for ${city.name} businesses. Google Business Profile optimization, city landing pages, citations, and Google Maps rankings. Lake Forest-based agency serving ${city.name} and Orange County.`,
    heroSubtitle: `Get found by ${city.name} customers on Google Search, Google Maps, and AI-powered local results.`,
    intro: [
      `${city.name} businesses need more than a generic Orange County SEO strategy. Local customers search with city-specific intent — and Google rewards businesses with dedicated ${city.name} landing pages, active Google Business Profiles, and consistent review signals.`,
      `OCWebPros is based in Lake Forest and serves ${city.name} with the same city-page structure, GBP optimization, and citation management we use for our own local rankings.`,
    ],
    marketInsight: city.marketAngle,
    neighborhoods: city.neighborhoods,
    businessTypes: city.businessTypes,
    challenges: city.challenges,
    services: [
      {
        title: `Google Business Profile for ${city.name}`,
        description: `Setup, categories, weekly posts, photos, and review monitoring optimized for ${city.name} search patterns and neighborhoods.`,
      },
      {
        title: `${city.name} Service Landing Pages`,
        description: `Dedicated pages targeting "local SEO ${city.name}" and service-specific queries — the commercial URLs Google ranks for hire-intent searches.`,
      },
      {
        title: 'Citation & NAP Management',
        description: `Consistent business listings across Yelp, Bing, Apple Maps, and ${city.name}-area directories.`,
      },
      {
        title: 'Review Velocity Strategy',
        description: `Ethical systems to earn authentic ${city.name} customer reviews and respond within 24 hours.`,
      },
      {
        title: 'Hyper-Local Content',
        description: `Blog posts, FAQs, and neighborhood content referencing ${city.name} landmarks that reinforce your service pages.`,
      },
      {
        title: 'Monthly Ranking Reports',
        description: `Track ${city.name} keyword positions, Maps visibility, calls, and form submissions with clear next steps.`,
      },
    ],
    whyUs: [
      `Based in Lake Forest — serving ${city.name} with same-day response and local market knowledge`,
      'We build dedicated city pages for our own site and yours — not blog-only shortcuts',
      'Transparent monthly plans from $500/mo with direct access to your SEO team',
      'Full-service: local SEO, web design, hosting, and support under one roof',
    ],
    blogSlug: blog.blogSlug,
    blogTitle: blog.blogTitle,
    faqs: [
      {
        question: `How much does local SEO cost for a ${city.name} business?`,
        answer: `OCWebPros local SEO plans start at $500/month for Google Business Profile management, citation monitoring, and technical upkeep. Growth plans at $1,250/month add ${city.name}-specific content, competitor analysis, and on-page optimization.`,
      },
      {
        question: `How long does it take to rank for local searches in ${city.name}?`,
        answer: `Most ${city.name} businesses see measurable Maps movement within 60–90 days with consistent GBP activity, dedicated city pages, and review generation. Competitive categories may take 3–6 months for dominant organic positions.`,
      },
      {
        question: `Do you need a ${city.name} office to rank locally?`,
        answer: `No. Service-area businesses can rank in ${city.name} with a properly configured Google Business Profile, city-specific landing pages, consistent citations, and genuine customer reviews — all structured within Google's guidelines.`,
      },
      {
        question: `Why do I need a dedicated ${city.name} page instead of just a blog post?`,
        answer: `"Local SEO ${city.name}" is a commercial search — the searcher wants to hire a provider. Google ranks dedicated service landing pages for these terms, not informational blog posts under /blog/.`,
      },
      {
        question: `Do you also serve businesses near ${city.neighborhoods[0]}?`,
        answer: `Yes. We serve the full ${city.name} area including ${city.neighborhoods.slice(0, 3).join(', ')}, and surrounding Orange County communities from our Lake Forest office.`,
      },
    ],
  };
}

export function buildWebDesignPage(city: CityRegistryEntry): CityServicePageData {
  const blog = blogFor(city, 'web-design');
  return {
    slug: city.slug,
    name: city.name,
    shortName: city.shortName,
    badge: city.badge,
    title: `Web Design in ${city.name}, CA | OCWebPros`,
    description: `Custom web design for ${city.name} businesses. Mobile-first, SEO-ready websites with city landing pages and local schema. Lake Forest-based agency serving ${city.name} and Orange County.`,
    heroSubtitle: `Custom websites for ${city.name} businesses — designed to rank, convert, and reflect your local market.`,
    intro: [
      `${city.name} customers expect websites that look professional, load fast on mobile, and clearly explain what you do. A generic template won't compete — you need custom design with ${city.name}-specific service pages built in from day one.`,
      `OCWebPros builds ${city.name} websites from our Lake Forest office with mobile-first design, Core Web Vitals optimization, local schema markup, and the city page structure that local SEO demands.`,
    ],
    marketInsight: city.marketAngle,
    neighborhoods: city.neighborhoods,
    businessTypes: city.businessTypes,
    challenges: [
      ...city.challenges.slice(0, 2),
      `No dedicated ${city.name} landing pages for local search visibility`,
      'Outdated or slow websites losing mobile visitors and search rankings',
    ],
    services: [
      {
        title: `Custom ${city.name} Web Design`,
        description: `Purpose-built sites for ${city.name} businesses — no bloated templates. Designed for your brand, audience, and conversion goals.`,
      },
      {
        title: `${city.name} Service & Location Pages`,
        description: `Dedicated pages for "web design ${city.name}" and service-specific local queries.`,
      },
      {
        title: 'Mobile-First & Core Web Vitals',
        description: 'Fast-loading, responsive layouts optimized for local customers searching on smartphones.',
      },
      {
        title: 'Local SEO Foundation',
        description: `Schema markup, meta optimization, internal linking, and ${city.name} page structure built in at launch.`,
      },
      {
        title: 'Managed Hosting & SSL',
        description: 'Secure hosting with CDN, auto-renewing SSL, uptime monitoring, and deploy rollback.',
      },
      {
        title: 'Ongoing Support Plans',
        description: 'Content updates, security patches, and performance monitoring from the team that built your site.',
      },
    ],
    whyUs: [
      `Serving ${city.name} from our Lake Forest office — local meetings, fast turnaround`,
      'Custom code with city/service page structure — we practice what we recommend',
      'Direct access to designers and developers, not account managers',
      `Pair with local SEO plans for full ${city.name} visibility`,
    ],
    blogSlug: blog.blogSlug,
    blogTitle: blog.blogTitle,
    faqs: [
      {
        question: `How much does web design cost in ${city.name}?`,
        answer: `Custom ${city.name} websites typically range from $3,500–$9,000+ depending on pages, features, and integrations. We provide clear quotes after a free consultation.`,
      },
      {
        question: `How long does a ${city.name} website project take?`,
        answer: `Most ${city.name} business sites launch in 4–8 weeks from kickoff. Timeline depends on content readiness, page count, and revision rounds.`,
      },
      {
        question: `Is SEO included in ${city.name} web design?`,
        answer: `Yes. Every site includes on-page SEO foundations: optimized titles, meta descriptions, schema markup, mobile performance, and ${city.name} service page structure.`,
      },
      {
        question: `Can you redesign an existing ${city.name} business website?`,
        answer: `Absolutely. We handle full redesigns with SEO-preserving redirects, content migration, and Core Web Vitals improvements.`,
      },
      {
        question: `Do you offer ongoing support after launching a ${city.name} site?`,
        answer: `Yes. Support plans start at $50/month for security and monitoring, with content edit plans from $125/month. Local SEO plans from $500/month add ongoing ${city.name} visibility.`,
      },
    ],
  };
}
