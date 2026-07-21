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
  cityLinks: { href: string; label: string }[];
  guides: { slug: string; label: string }[];
  faqs: { question: string; answer: string }[];
};

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
    ],
    cityLinks: [
      { href: '/local-seo/irvine/', label: 'SEO Irvine' },
      { href: '/local-seo/fullerton/', label: 'SEO Fullerton' },
      { href: '/local-seo/anaheim/', label: 'SEO Anaheim' },
      { href: '/local-seo/huntington-beach/', label: 'SEO Huntington Beach' },
      { href: '/local-seo/lake-forest/', label: 'SEO Lake Forest' },
      { href: '/local-seo/mission-viejo/', label: 'SEO Mission Viejo' },
      { href: '/web-design/irvine/', label: 'Web Design Irvine' },
      { href: '/service-areas/', label: 'All service areas' },
    ],
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
        question: 'Can you redesign our contractor website and handle SEO?',
        answer:
          'Yes. Web design and local SEO run under one roof so service pages, schema, and GBP stay aligned after launch.',
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
    ],
    cityLinks: [
      { href: '/local-seo/irvine/', label: 'SEO Irvine' },
      { href: '/local-seo/newport-beach/', label: 'SEO Newport Beach' },
      { href: '/local-seo/yorba-linda/', label: 'SEO Yorba Linda' },
      { href: '/local-seo/fountain-valley/', label: 'SEO Fountain Valley' },
      { href: '/local-seo/laguna-hills/', label: 'SEO Laguna Hills' },
      { href: '/local-seo/huntington-beach/', label: 'SEO Huntington Beach' },
      { href: '/web-design/irvine/', label: 'Web Design Irvine' },
      { href: '/service-areas/', label: 'All service areas' },
    ],
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
    ],
  },
];

export const industryHubBySlug = Object.fromEntries(
  industryHubs.map((hub) => [hub.slug, hub])
) as Record<string, IndustryHub>;
