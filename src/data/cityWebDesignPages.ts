import { cityRegistry } from './cityRegistry';
import { buildWebDesignPage } from './cityPageBuilder';
import type { CityServicePageData } from './cityPageTypes';

const handCraftedWebDesignPages: CityServicePageData[] = [
  {
    slug: 'lake-forest',
    name: 'Lake Forest',
    shortName: 'Lake Forest',
    badge: 'Our Home Base',
    title: 'Web Design in Lake Forest, CA | OCWebPros',
    description:
      'Custom web design for Lake Forest businesses. Mobile-first, SEO-ready websites built by a Lake Forest-based agency. Service pages, local schema, and fast Core Web Vitals.',
    heroSubtitle:
      'Custom websites for Lake Forest businesses — designed, built, and supported by a team right here in your city.',
    intro: [
      'OCWebPros is headquartered in Lake Forest. We build websites for local businesses who want a partner they can meet in person — not a ticket queue or an overseas freelancer.',
      'Every Lake Forest site we build includes mobile-first design, city/service page structure, local schema markup, and the technical foundation local SEO requires from day one.',
    ],
    marketInsight:
      'Lake Forest businesses compete for customers across Foothill Ranch, Portola Hills, and the broader South OC corridor. A template site won\'t cut it — you need a fast, credible website with clear service pages that convert local search traffic.',
    neighborhoods: ['Foothill Ranch', 'The Orchard & El Toro Road', 'Portola Hills', 'Serrano Park area', 'Rockfield Boulevard', 'Baker Ranch border'],
    businessTypes: ['Contractors & home services', 'Medical & dental', 'Restaurants & retail', 'Professional services', 'Fitness & wellness', 'Real estate'],
    challenges: [
      'Outdated websites that fail on mobile and hurt Google rankings',
      'No dedicated service or location pages for Lake Forest searches',
      'Slow load times driving away local customers',
      'DIY builders that look generic and don\'t convert',
    ],
    services: [
      { title: 'Custom Lake Forest Web Design', description: 'Purpose-built sites — no bloated templates. Designed for your brand, audience, and conversion goals.' },
      { title: 'City & Service Page Structure', description: 'Dedicated "Web Design Lake Forest" and service-specific pages that rank for local hire-intent searches.' },
      { title: 'Mobile-First & Core Web Vitals', description: 'Fast-loading pages optimized for the 70%+ of local traffic that comes from smartphones.' },
      { title: 'Local SEO Foundation', description: 'Schema markup, meta optimization, internal linking, and sitemap structure built in at launch.' },
      { title: 'Managed Hosting & SSL', description: 'Secure hosting with CDN, auto-renewing SSL, uptime monitoring, and deploy rollback.' },
      { title: 'Ongoing Support Plans', description: 'Content updates, security patches, and performance monitoring from the team that built your site.' },
    ],
    whyUs: [
      'Based in Lake Forest — walk in for a meeting, no video-call-only agencies',
      'We build city pages for our own site and yours — we practice what we sell',
      'Direct access to designers and developers, not account managers',
      'Transparent pricing with clear scope',
    ],
    blogSlug: 'choose-web-design-agency-orange-county',
    blogTitle: 'How to Choose a Web Design Agency in Orange County',
    faqs: [
      { question: 'How much does web design cost in Lake Forest?', answer: 'Custom Lake Forest websites typically range from $3,000–$8,000+ depending on pages, features, and integrations. We provide clear quotes after a free consultation — no surprise invoices.' },
      { question: 'How long does a Lake Forest website take to build?', answer: 'Most business sites launch in 4–8 weeks from kickoff. Timeline depends on content readiness, page count, and revision rounds.' },
      { question: 'Do you include SEO in Lake Forest web design?', answer: 'Yes. Every site includes on-page SEO foundations: optimized titles, meta descriptions, schema markup, mobile performance, and city/service page structure.' },
      { question: 'Can you redesign my existing Lake Forest business website?', answer: 'Absolutely. We handle full redesigns with SEO-preserving redirects, content migration, and performance improvements.' },
      { question: 'Do you offer website maintenance after launch?', answer: 'Yes. Support plans start at $50/month for security updates and monitoring, with content edit plans from $125/month.' },
    ],
  },
  {
    slug: 'irvine',
    name: 'Irvine',
    shortName: 'Irvine',
    badge: 'Tech & Startup Hub',
    title: 'Web Design in Irvine, CA | OCWebPros',
    description:
      'Custom web design for Irvine businesses. Premium, mobile-first websites that compete with national brands. Based in Lake Forest, 15 minutes from Irvine Spectrum and beyond.',
    heroSubtitle:
      'Premium custom websites for Irvine businesses — built to compete in one of Orange County\'s most demanding markets.',
    intro: [
      'Irvine businesses face premium customer expectations. Whether you\'re at the Irvine Spectrum, near UCI, or in Woodbridge, your website needs to look polished, load instantly, and convert research-heavy visitors into leads.',
      'OCWebPros builds custom Irvine websites from our Lake Forest office — 15 minutes away. No templates, no overseas handoffs, just strategic design with local SEO built in.',
    ],
    marketInsight:
      'Irvine consumers compare options carefully before contacting a business. Your site must establish credibility fast — professional design, clear service pages, social proof, and mobile performance are table stakes.',
    neighborhoods: ['Irvine Spectrum', 'Woodbridge & Northwood', 'University Park & UCI', 'John Wayne Airport corridor', 'Turtle Rock', 'Portola Springs'],
    businessTypes: ['B2B tech & SaaS', 'Medical & dental practices', 'Law & financial services', 'Professional consulting', 'Retail & e-commerce', 'Real estate'],
    challenges: [
      'Competing with national brands that have large marketing budgets',
      'High design expectations from educated, affluent Irvine consumers',
      'Websites that rank nationally but fail for Irvine-specific searches',
      'Template sites that look identical to competitors',
    ],
    services: [
      { title: 'Premium Irvine Web Design', description: 'Custom sites that match Irvine\'s professional standards — clean UI, strong typography, and conversion-focused layouts.' },
      { title: 'Irvine Service & Location Pages', description: 'Dedicated pages for "web design Irvine" and service-specific local queries.' },
      { title: 'E-commerce & Lead Generation', description: 'Shopping flows, booking systems, and contact forms tuned for Irvine buyer behavior.' },
      { title: 'SEO-Ready Architecture', description: 'Schema, internal linking, fast Core Web Vitals, and city-specific content structure from launch.' },
      { title: 'Brand-Consistent Design Systems', description: 'Cohesive visual identity across every page — critical when Irvine customers compare multiple providers.' },
      { title: 'Post-Launch Support', description: 'Managed hosting, security updates, and content changes from the team that built your site.' },
    ],
    whyUs: [
      '15 minutes from Irvine Spectrum — local meetings, fast turnaround',
      'Experience with Irvine\'s competitive professional services market',
      'Custom code, not WordPress templates bloated with plugins',
      'Pair web design with local SEO for full Irvine visibility',
    ],
    blogSlug: 'ecommerce-website-design-orange-county-2026-trends',
    blogTitle: 'E-commerce Website Design Orange County: 2026 Trends',
    faqs: [
      { question: 'How much does web design cost for an Irvine business?', answer: 'Irvine business websites typically range from $4,000–$12,000+ depending on complexity. Professional services and e-commerce sites are on the higher end. We quote after understanding your specific goals.' },
      { question: 'Can you build websites for Irvine Spectrum area businesses?', answer: 'Yes. We serve businesses throughout Irvine including the Spectrum, Jamboree corridor, UCI area, and all major business districts.' },
      { question: 'Do Irvine websites need to be different from other OC cities?', answer: 'Irvine audiences expect higher design quality and more detailed service information. Your site should reflect Irvine\'s professional, research-oriented buyer behavior.' },
      { question: 'Do you handle Irvine website SEO after launch?', answer: 'Yes. We offer local SEO plans from $500/month that include Google Business Profile management, content, and ongoing optimization.' },
      { question: 'How do I get started with an Irvine web design project?', answer: 'Request a free consultation. We\'ll review your current site, discuss goals, and provide a clear scope and timeline.' },
    ],
  },
  {
    slug: 'mission-viejo',
    name: 'Mission Viejo',
    shortName: 'Mission Viejo',
    badge: 'Family-Focused Community',
    title: 'Web Design in Mission Viejo, CA | OCWebPros',
    description:
      'Custom web design for Mission Viejo businesses. Trust-building, family-friendly websites with local SEO built in. Lake Forest-based agency serving South OC.',
    heroSubtitle:
      'Websites that build trust with Mission Viejo families and professionals — custom design from a South OC neighbor.',
    intro: [
      'Mission Viejo is Orange County\'s largest master-planned community. Families and professionals here choose businesses they trust — and your website is often the first impression.',
      'OCWebPros builds Mission Viejo websites that emphasize credibility, ease of use, and community relevance. Every site includes local SEO foundations and city-specific page structure.',
    ],
    marketInsight:
      'Mission Viejo customers value warmth and reliability over flashy design. Clear service descriptions, easy navigation, testimonials, and mobile-friendly booking or contact flows win conversions.',
    neighborhoods: ['Lake Mission Viejo area', 'The Shops at Mission Viejo', 'Aegean Hills', 'Pacific Hills', 'Marguerite Parkway corridor', 'Saddleback Valley'],
    businessTypes: ['Lawyers & accountants', 'Dental & medical', 'Home remodeling', 'Family restaurants', 'Real estate agents', 'Childcare & fitness'],
    challenges: [
      'Websites that don\'t reflect the community\'s family-oriented values',
      'Poor mobile experience losing customers searching on the go',
      'No city-specific pages for Mission Viejo local searches',
      'Outdated designs that undermine professional credibility',
    ],
    services: [
      { title: 'Mission Viejo Custom Web Design', description: 'Trust-focused designs for professional services and family businesses in the master-planned community.' },
      { title: 'Service & Location Pages', description: 'Dedicated "web design Mission Viejo" pages and service-specific landing pages for local search.' },
      { title: 'Mobile-First UX', description: 'Responsive layouts optimized for parents and professionals browsing on phones between activities.' },
      { title: 'Testimonial & Social Proof Sections', description: 'Review displays, case studies, and trust badges that resonate with Mission Viejo\'s community culture.' },
      { title: 'Local SEO Integration', description: 'Schema markup, GBP-aligned service pages, and internal linking for South OC visibility.' },
      { title: 'Hosting & Maintenance', description: 'Managed hosting with ongoing support from our Lake Forest team.' },
    ],
    whyUs: [
      'South OC neighbor — we understand Mission Viejo\'s community culture',
      'Strong experience with professional services websites',
      'City-specific pages paired with conversion-focused design',
      'One team for design, SEO, hosting, and support',
    ],
    blogSlug: '2026-05-15-mission-viejo-professional-services-seo',
    blogTitle: 'Mission Viejo Professional Services SEO Guide',
    faqs: [
      { question: 'How much does a Mission Viejo business website cost?', answer: 'Most Mission Viejo business sites range from $3,500–$9,000 depending on pages and features. Professional service sites with booking and detailed service pages are typically $5,000–$8,000.' },
      { question: 'Can you design websites for Mission Viejo professional services?', answer: 'Yes. Lawyers, dentists, accountants, and consultants are a core focus. We build credibility-first designs with clear service breakdowns and contact paths.' },
      { question: 'Will my Mission Viejo website rank on Google?', answer: 'Every site includes SEO foundations. For ongoing rankings, pair your launch with our local SEO plans starting at $500/month.' },
      { question: 'How long does a Mission Viejo website project take?', answer: 'Typically 4–8 weeks. Professional service sites with multiple service pages may take 6–10 weeks.' },
      { question: 'Do you serve businesses near Lake Mission Viejo?', answer: 'Yes. We serve all of Mission Viejo and surrounding South OC communities from our Lake Forest office.' },
    ],
  },
  {
    slug: 'rancho-santa-margarita',
    name: 'Rancho Santa Margarita',
    shortName: 'RSM',
    badge: 'Growing South OC City',
    title: 'Web Design in Rancho Santa Margarita, CA | OCWebPros',
    description:
      'Custom web design for Rancho Santa Margarita (RSM) businesses. Personalized, mobile-first websites with local SEO built in. Lake Forest-based South OC web design agency.',
    heroSubtitle:
      'Personalized websites for RSM businesses — built by your Lake Forest neighbors, not a distant agency.',
    intro: [
      'Rancho Santa Margarita businesses thrive on personal relationships and community trust. Your website should feel local, load fast, and make it easy for RSM customers to call or book.',
      'OCWebPros is minutes from RSM in Lake Forest. We build custom websites with city-specific pages, local schema, and the mobile performance RSM customers expect.',
    ],
    marketInsight:
      'RSM is a tight-knit market where word-of-mouth and local reputation matter. A professional website reinforces that trust and captures customers searching "web designer near me" in the Trabuco Canyon and Central Park areas.',
    neighborhoods: ['Central Park & Mercado del Lago', 'Plano Trabuco Road', 'Santa Margarita Parkway', 'Trabuco Highlands', 'Robinson Ranch', 'Crown Valley area'],
    businessTypes: ['Contractors & home improvement', 'Dental & medical', 'Boutique retail', 'Fitness & wellness', 'Restaurants', 'Personal services'],
    challenges: [
      'Generic websites that don\'t feel local or personal',
      'No dedicated RSM landing pages for local search',
      'Competing with agencies in larger neighboring cities',
      'Slow, outdated sites that lose mobile visitors',
    ],
    services: [
      { title: 'RSM Custom Web Design', description: 'Personalized sites that reflect RSM\'s community-first business culture — not cookie-cutter templates.' },
      { title: 'Rancho Santa Margarita Landing Pages', description: 'City-specific pages targeting "web design Rancho Santa Margarita" and local service queries.' },
      { title: 'Mobile-Optimized Design', description: 'Fast, thumb-friendly layouts for customers searching from Central Park, Trabuco Canyon, and beyond.' },
      { title: 'Local SEO Built In', description: 'Schema, meta tags, service page structure, and internal linking from day one.' },
      { title: 'Contact & Booking Flows', description: 'Clear CTAs, click-to-call, and form flows that convert RSM\'s relationship-driven customers.' },
      { title: 'Managed Hosting & Support', description: 'Secure hosting and ongoing maintenance from a team 10 minutes away in Lake Forest.' },
    ],
    whyUs: [
      'Lake Forest neighbor — RSM is a short drive for in-person meetings',
      'First-mover advantage: few agencies have dedicated RSM web design pages',
      'We understand RSM\'s community-driven buying behavior',
      'Full-service: design, SEO, hosting, and support under one roof',
    ],
    blogSlug: '2026-07-06-rancho-santa-margarita-local-seo-guide',
    blogTitle: 'Rancho Santa Margarita Local SEO Guide',
    faqs: [
      { question: 'How much does web design cost in Rancho Santa Margarita?', answer: 'RSM business websites typically range from $3,000–$7,500. We provide detailed quotes after a free consultation based on your page count and feature needs.' },
      { question: 'Why do RSM businesses need a custom website?', answer: 'RSM customers value personal connection. A custom site with local references, fast performance, and clear service pages builds trust better than a generic template.' },
      { question: 'Can you help my RSM business rank on Google?', answer: 'Yes. Every website includes SEO foundations, and we offer dedicated local SEO plans from $500/month with GBP management and city-specific content.' },
      { question: 'How quickly can you build an RSM website?', answer: 'Most projects launch in 4–6 weeks. Smaller service business sites can be faster; multi-service sites with custom features take 6–8 weeks.' },
      { question: 'Do you serve Trabuco Canyon and Dove Canyon?', answer: 'Yes. We serve the full Rancho Santa Margarita area and surrounding South OC communities.' },
    ],
  },
];

const generatedWebDesignPages = cityRegistry
  .filter((city) => !city.handCrafted)
  .map(buildWebDesignPage);

export const cityWebDesignPages: CityServicePageData[] = [
  ...handCraftedWebDesignPages,
  ...generatedWebDesignPages,
];
