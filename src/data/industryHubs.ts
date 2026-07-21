import { meshLinksForIndustry } from './industryCityPages';
import { MESH_CITY_NAMES, MESH_CITY_SLUGS } from './industryMesh';

export type IndustryHub = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  badge: string;
  heroSubtitle: string;
  intro: string[];
  challenges: { title: string; body: string }[];
  deliverables: { title: string; body: string }[];
  process?: { title: string; body: string }[];
  cityLinks: { href: string; label: string }[];
  meshLinks?: { href: string; label: string }[];
  guides: { slug: string; label: string }[];
  faqs: { question: string; answer: string }[];
};

const meshCitySeoLinks = MESH_CITY_SLUGS.map((slug) => ({
  href: `/local-seo/${slug}/`,
  label: `SEO ${MESH_CITY_NAMES[slug]}`,
}));

export const industryHubs: IndustryHub[] = [
  {
    slug: 'contractors',
    title: 'Web Design & Local SEO for Contractors',
    metaTitle: 'Contractor SEO & Web Design Orange County | OCWebPros',
    description:
      'Web design and local SEO for OC contractors — HVAC, electricians, plumbers, landscapers. Service-area pages, GBP, click-to-call. Free audit. Lake Forest-based.',
    badge: 'Trades & Home Services',
    heroSubtitle:
      'Emergency searches happen on phones. We build contractor sites and Maps presence that turn "near me" into booked jobs.',
    intro: [
      'Orange County contractors win when Google Maps and mobile quote forms work under pressure. Homeowners searching for HVAC, plumbing, electrical, concrete, or landscaping compare three providers in under a minute — the one with clear service areas, reviews, and a tap-to-call button usually gets the job.',
      'OCWebPros builds contractor websites and local SEO systems from Lake Forest: city × service landing pages, Google Business Profile optimization, citation cleanup, and review velocity — the same mesh national franchise sites use, sized for independent trades.',
      'Start with the industry hub, then use City×Industry pages for the markets that drive your jobs — Irvine, Fullerton, Anaheim, and more.',
    ],
    challenges: [
      {
        title: 'Franchise sites crowd the Map Pack',
        body: 'National brands outspend local shops on ads and reviews. Dedicated city and service pages plus consistent GBP activity are how independents stay visible.',
      },
      {
        title: 'One homepage for every city you serve',
        body: 'Listing "all of Orange County" without city pages dilutes relevance. Searchers in Irvine and Fullerton expect pages that name their city.',
      },
      {
        title: 'Slow mobile quote paths',
        body: 'If the form takes four fields and a CAPTCHA on a cracked screen at 9pm, they call the next listing. Above-the-fold click-to-call and short forms convert emergency intent.',
      },
    ],
    deliverables: [
      {
        title: 'Service × city landing pages',
        body: 'Pages for the trades and cities you actually cover — structured for hire intent, not blog fluff.',
      },
      {
        title: 'Google Business Profile for trades',
        body: 'Categories, services, photos, posts, and Q&A tuned for how OC homeowners search contractors.',
      },
      {
        title: 'Review & license trust stack',
        body: 'Ethical review systems plus license, insurance, and before/after placement that reduce call hesitation.',
      },
      {
        title: 'Mobile-first contractor web design',
        body: 'Fast sites with galleries, financing CTAs, and quote forms that work on the go.',
      },
      {
        title: 'Monthly ranking & lead reports',
        body: 'Track city keyword positions, Maps visibility, calls, and form leads with clear next steps.',
      },
    ],
    process: [
      { title: 'Audit', body: 'GBP health, citation gaps, competitor Map Pack, and which cities drive jobs.' },
      { title: 'Build', body: 'City and trade pages, on-page fixes, click-to-call paths, schema.' },
      { title: 'Grow', body: 'Weekly posts, review velocity, citations, and content that reinforces hire pages.' },
      { title: 'Report', body: 'Rankings, calls, and a prioritized plan every month.' },
    ],
    cityLinks: [
      ...meshCitySeoLinks,
      { href: '/web-design/irvine/', label: 'Web Design Irvine' },
      { href: '/service-areas/', label: 'All service areas' },
    ],
    meshLinks: meshLinksForIndustry('contractors'),
    guides: [
      { slug: '2026-05-14-contractor-seo-orange-county-guide', label: 'Contractor SEO guide' },
    ],
    faqs: [
      {
        question: 'How much does local SEO cost for an Orange County contractor?',
        answer:
          'OCWebPros local SEO plans start at $500/month for GBP management and citation monitoring. Growth plans at $1,250/month add city and service pages, competitor tracking, and ongoing content.',
      },
      {
        question: 'Do contractors need a page for every city?',
        answer:
          'Not overnight — start with the cities that drive the most jobs, then expand. Thin duplicate pages hurt more than they help. We prioritize real coverage and unique local proof.',
      },
      {
        question: 'What is a City×Industry page?',
        answer:
          'Pages like /industries/contractors/irvine/ target hire searches for contractors in a specific city. They sit between this hub and your general city SEO page so niche queries have a commercial home.',
      },
      {
        question: 'Can you redesign our contractor website and handle SEO?',
        answer:
          'Yes. Web design and local SEO run under one roof so service pages, schema, and GBP stay aligned after launch.',
      },
      {
        question: 'How fast can a contractor move in the Map Pack?',
        answer:
          'With an optimized GBP, steady reviews, and city pages, many trades see movement in 60–90 days. Competitive coastal and Irvine categories can take longer.',
      },
    ],
  },
  {
    slug: 'dental',
    title: 'Dental SEO & Website Design in Orange County',
    metaTitle: 'Dental SEO & Web Design Orange County | OCWebPros',
    description:
      'Dental SEO and websites for Orange County practices — treatment pages, provider bios, GBP, patient reviews. HIPAA-conscious. Free audit. Lake Forest-based.',
    badge: 'Dental Practices',
    heroSubtitle:
      'Patients shortlist dentists online before they call. We build the pages and Maps presence that win the appointment.',
    intro: [
      'Orange County dental practices compete on trust as much as clinical skill. New patients compare websites, Google reviews, and treatment pages — then book the office that feels clear, modern, and nearby.',
      'OCWebPros helps OC dentists with local SEO and patient-friendly web design: Google Business Profile optimization, city and treatment landing pages, review systems, and site structure that respects HIPAA-conscious workflows without sounding like a template mill.',
      'Use City×Industry pages for high-intent markets — Dental SEO in Irvine, Newport Beach, Fullerton, and more — then link them from treatment pages and GBP.',
    ],
    challenges: [
      {
        title: 'DSOs and multi-location brands dominate Maps',
        body: 'Independent practices need sharper city signals, stronger review velocity, and treatment pages that answer real patient questions.',
      },
      {
        title: 'Generic healthcare templates',
        body: 'Stock-photo sites with buried phone numbers lose to practices that show providers, insurance clarity, and mobile booking paths.',
      },
      {
        title: 'Treatment pages that never rank',
        body: 'Implants, Invisalign, and emergency dental searches need dedicated pages with local proof — not a single services dump.',
      },
    ],
    deliverables: [
      {
        title: 'Treatment & provider pages',
        body: 'Clear patient pathways for high-intent services with schema-friendly provider bios.',
      },
      {
        title: 'Dental Google Business Profile',
        body: 'Categories, photos, posts, and Q&A that match how OC patients search for dentists near them.',
      },
      {
        title: 'Review velocity for practices',
        body: 'Ethical systems to earn authentic patient reviews and respond quickly — a top Maps ranking factor.',
      },
      {
        title: 'Accessible, fast dental websites',
        body: 'Mobile-first design with appointment CTAs, insurance info, and Core Web Vitals that support SEO.',
      },
      {
        title: 'City×Industry landing pages',
        body: 'Dedicated dental SEO pages for priority OC cities so hire queries are not stuck on blogs.',
      },
    ],
    process: [
      { title: 'Audit', body: 'GBP, citations, treatment page gaps, and competitor review depth.' },
      { title: 'Build', body: 'City and treatment pages, provider bios, booking paths, schema.' },
      { title: 'Grow', body: 'Reviews, posts, and content that reinforce commercial pages.' },
      { title: 'Report', body: 'Maps visibility, keyword movement, and appointment-path metrics.' },
    ],
    cityLinks: [
      ...meshCitySeoLinks,
      { href: '/web-design/irvine/', label: 'Web Design Irvine' },
      { href: '/service-areas/', label: 'All service areas' },
    ],
    meshLinks: meshLinksForIndustry('dental'),
    guides: [
      { slug: '2026-05-14-orange-county-dental-seo-guide', label: 'Dental SEO guide' },
      { slug: '2026-05-15-orange-county-healthcare-seo-hipaa', label: 'Healthcare SEO & HIPAA' },
    ],
    faqs: [
      {
        question: 'Is dental SEO different from general local SEO?',
        answer:
          'The fundamentals are the same — GBP, citations, reviews, city relevance — but dental wins on treatment pages, provider trust, and compliance-aware messaging. We build for patient intent, not keyword stuffing.',
      },
      {
        question: 'How long until a dental practice sees Maps improvement?',
        answer:
          'Practices with an optimized profile, steady reviews, and a dedicated local page often see movement in 60–90 days. Competitive coastal and Irvine markets can take longer.',
      },
      {
        question: 'Do you work with multi-location dental groups?',
        answer:
          'Yes. We plan location pages and GBP hygiene so each office stays associated with the right city without cannibalizing sister locations.',
      },
      {
        question: 'What does Dental SEO in Irvine mean on your site?',
        answer:
          'It is a City×Industry commercial page for dental hire intent in Irvine — separate from the general Irvine local SEO page and from blog guides.',
      },
      {
        question: 'Can you redesign our dental website?',
        answer:
          'Yes. Patient-friendly layouts, appointment CTAs, and local SEO foundations ship together so the site supports rankings and conversions.',
      },
    ],
  },
  {
    slug: 'restaurants',
    title: 'Restaurant SEO & Website Design in Orange County',
    metaTitle: 'Restaurant SEO & Web Design Orange County | OCWebPros',
    description:
      'Restaurant SEO and websites for Orange County — menus, hours, GBP, Maps, and mobile ordering paths. Free audit. Lake Forest-based.',
    badge: 'Restaurants & Food',
    heroSubtitle:
      'Hungry customers decide in seconds. We make menus, hours, and Maps presence impossible to miss.',
    intro: [
      'Orange County restaurants win when Google shows accurate hours, strong photos, and a site that loads on mobile before the next listing gets the tap.',
      'OCWebPros builds restaurant websites and local SEO from Lake Forest: Google Business Profile alignment, menu and location structure, review velocity, and city pages for the neighborhoods you actually serve.',
    ],
    challenges: [
      {
        title: 'Inaccurate hours and menus kill conversions',
        body: 'Searchers bounce when GBP and the website disagree. Alignment is a ranking and revenue issue.',
      },
      {
        title: 'Tourism vs. local regulars',
        body: 'Coastal and Plaza restaurants need visitor queries and neighborhood "near me" demand covered without mixing the message.',
      },
      {
        title: 'Review velocity gaps',
        body: 'Competitors with steady 5-star flow dominate Map Packs even when food quality is similar.',
      },
    ],
    deliverables: [
      {
        title: 'Mobile-first menus and locations',
        body: 'Clear menus, hours, and location blocks that match GBP and convert on phones.',
      },
      {
        title: 'Restaurant Google Business Profile',
        body: 'Categories, photos, posts, and Q&A tuned for dining search behavior.',
      },
      {
        title: 'Local SEO for dining corridors',
        body: 'City and neighborhood signals for Plaza, Pier, Little Saigon, and downtown districts.',
      },
      {
        title: 'Event and catering pathways',
        body: 'Optional sections for catering, private dining, and seasonal promos that still support SEO.',
      },
    ],
    process: [
      { title: 'Audit', body: 'GBP accuracy, menu UX, citation NAP, and competitor Map Pack.' },
      { title: 'Build', body: 'Site structure, schema, photo strategy, and local pages.' },
      { title: 'Grow', body: 'Posts, reviews, and seasonal content without cannibalizing the hire pages.' },
      { title: 'Report', body: 'Maps visibility, calls, directions, and site engagement.' },
    ],
    cityLinks: [
      { href: '/local-seo/huntington-beach/', label: 'SEO Huntington Beach' },
      { href: '/local-seo/newport-beach/', label: 'SEO Newport Beach' },
      { href: '/local-seo/santa-ana/', label: 'SEO Santa Ana' },
      { href: '/local-seo/costa-mesa/', label: 'SEO Costa Mesa' },
      { href: '/local-seo/garden-grove/', label: 'SEO Garden Grove' },
      { href: '/local-seo/orange/', label: 'SEO Orange' },
      { href: '/service-areas/', label: 'All service areas' },
    ],
    guides: [
      { slug: 'restaurant-website-design-orange-county', label: 'Restaurant web design guide' },
      { slug: '2026-05-14-santa-ana-restaurant-seo-case-study', label: 'Restaurant SEO case study' },
      { slug: '2026-07-02-case-study-orange-county-restaurant-ai-overviews-optimization', label: 'AI Overviews restaurant case study' },
    ],
    faqs: [
      {
        question: 'How much does restaurant SEO cost in Orange County?',
        answer:
          'Local SEO plans start at $500/month. Restaurants that need menu redesigns or multi-location sites often pair SEO with a web design project — we quote after a free audit.',
      },
      {
        question: 'Do you optimize Google Business Profile for restaurants?',
        answer:
          'Yes. Categories, attributes, photos, posts, and review response are core deliverables — GBP is often the primary homepage for diners.',
      },
      {
        question: 'Can you help with online ordering links?',
        answer:
          'We structure the site and GBP so ordering links are clear and consistent. We do not replace your POS vendor — we make the path to order obvious.',
      },
    ],
  },
  {
    slug: 'legal',
    title: 'Legal SEO & Website Design in Orange County',
    metaTitle: 'Legal SEO & Web Design Orange County | OCWebPros',
    description:
      'Legal SEO and websites for Orange County law firms — practice-area pages, attorney bios, GBP, trust signals. Free audit. Lake Forest-based.',
    badge: 'Law Firms',
    heroSubtitle:
      'Prospective clients research before they call. We build the practice pages and Maps presence that earn the consultation.',
    intro: [
      'Orange County law firms compete on credibility: clear practice-area pages, attorney bios, reviews, and a site that feels established on mobile.',
      'OCWebPros builds legal websites and local SEO from Lake Forest — intake-friendly layouts, city and practice landing pages, and Google Business Profile systems that support hire-intent searches without keyword stuffing.',
    ],
    challenges: [
      {
        title: 'Practice-area cannibalization',
        body: 'One vague services page cannot rank for PI, family, estate, and business law at once. Structure matters.',
      },
      {
        title: 'Trust before the consult',
        body: 'Affluent OC clients judge design, bios, and reviews before dialing. Weak presentation loses high-value matters.',
      },
      {
        title: 'National directories crowd SERPs',
        body: 'Local firms need sharper city and practice signals to compete with aggregators and large firms.',
      },
    ],
    deliverables: [
      {
        title: 'Practice-area page architecture',
        body: 'Clear pages for the matters you actually take — structured for hire intent and internal linking.',
      },
      {
        title: 'Attorney bios with schema-friendly markup',
        body: 'Credibility-focused bios that support E-E-A-T without fluff.',
      },
      {
        title: 'Legal Google Business Profile',
        body: 'Categories, posts, and review systems tuned for professional-services searches.',
      },
      {
        title: 'Consultation-ready web design',
        body: 'Intake forms, click-to-call, and mobile layouts that reduce friction for high-intent visitors.',
      },
    ],
    process: [
      { title: 'Audit', body: 'Practice-page gaps, GBP, citations, and competitor SERP features.' },
      { title: 'Build', body: 'Site IA, bios, schema, and city/practice landing pages.' },
      { title: 'Grow', body: 'Content, reviews, and citations that reinforce commercial pages.' },
      { title: 'Report', body: 'Rankings, form leads, and calls with next-step priorities.' },
    ],
    cityLinks: [
      { href: '/local-seo/irvine/', label: 'SEO Irvine' },
      { href: '/local-seo/newport-beach/', label: 'SEO Newport Beach' },
      { href: '/local-seo/santa-ana/', label: 'SEO Santa Ana' },
      { href: '/local-seo/laguna-hills/', label: 'SEO Laguna Hills' },
      { href: '/local-seo/mission-viejo/', label: 'SEO Mission Viejo' },
      { href: '/local-seo/anaheim/', label: 'SEO Anaheim' },
      { href: '/service-areas/', label: 'All service areas' },
    ],
    guides: [
      { slug: '2026-05-14-legal-seo-orange-county-guide', label: 'Legal SEO guide' },
      { slug: '2026-05-15-mission-viejo-professional-services-seo', label: 'Professional services SEO' },
    ],
    faqs: [
      {
        question: 'How much does legal SEO cost in Orange County?',
        answer:
          'Plans start at $500/month for GBP and citation foundations. Competitive practice areas in Irvine and Newport Beach often need growth-tier content and practice pages at $1,250/month.',
      },
      {
        question: 'Do you write attorney bios and practice pages?',
        answer:
          'Yes. We draft structure and copy with your attorneys for accuracy — you approve before publish.',
      },
      {
        question: 'Can you redesign an outdated law firm website?',
        answer:
          'Yes. Credibility-focused design and local SEO foundations ship together so the new site supports rankings and consultations.',
      },
    ],
  },
];

export const industryHubBySlug = Object.fromEntries(
  industryHubs.map((hub) => [hub.slug, hub])
) as Record<string, IndustryHub>;
