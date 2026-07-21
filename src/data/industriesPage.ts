export type IndustryGuide = {
  slug: string;
  label: string;
};

export type IndustrySector = {
  id: string;
  title: string;
  summary: string;
  detail: string;
  highlights: string[];
  guides: IndustryGuide[];
  webDesignPath?: string;
  localSeoPath?: string;
  pricingAnchor?: string;
  /** Dedicated industry hub page when shipped */
  hubPath?: string;
};

export type IndustryResource = {
  slug: string;
  title: string;
  category: string;
  sector: string;
};

export const industrySectors: IndustrySector[] = [
  {
    id: 'contractors',
    title: 'Contractors & Trades',
    summary: 'HVAC, electricians, plumbers, concrete, landscaping, and home services across Orange County.',
    detail: 'Trade businesses win on speed and trust. We build service-area pages, before/after galleries, financing CTAs, and quote forms that work on mobile — where most emergency searches happen.',
    highlights: [
      'Service + city landing pages for every area you cover',
      'Click-to-call and short quote forms above the fold',
      'Review widgets, licenses, and trust badges placed to convert',
    ],
    guides: [
      { slug: '2026-05-14-contractor-seo-orange-county-guide', label: 'Contractor SEO guide' },
    ],
    webDesignPath: '/services/web-design/',
    localSeoPath: '/services/local-seo/',
    pricingAnchor: '#web-design',
    hubPath: '/industries/contractors/',
  },
  {
    id: 'professional',
    title: 'Professional Services',
    summary: 'Attorneys, CPAs, consultants, financial advisors, and B2B firms that need credibility at first glance.',
    detail: 'Professional services sites must communicate expertise without clutter. We focus on clear positioning, intake-friendly layouts, and local visibility for high-intent searches in cities like Irvine and Mission Viejo.',
    highlights: [
      'Practice-area or service-line page structure',
      'Attorney/team bios with schema-friendly markup',
      'Lead forms tuned for consultations, not generic contact spam',
    ],
    guides: [
      { slug: '2026-05-14-legal-seo-orange-county-guide', label: 'Legal SEO guide' },
      { slug: '2026-05-15-mission-viejo-professional-services-seo', label: 'Professional services SEO' },
    ],
    webDesignPath: '/services/web-design/',
    localSeoPath: '/services/local-seo/',
    pricingAnchor: '#local-seo',
    hubPath: '/industries/legal/',
  },
  {
    id: 'restaurants',
    title: 'Restaurants & Food',
    summary: 'Restaurants, cafés, catering, and food brands that need menus, hours, and orders handled cleanly on mobile.',
    detail: 'Hungry customers decide in seconds. We organize menus, locations, hours, and ordering links so Google — and your guests — get accurate info fast. Local SEO keeps you visible for "near me" searches.',
    highlights: [
      'Mobile-first menus and location blocks',
      'Google Business Profile alignment with on-site NAP',
      'Event, catering, and seasonal promo sections',
    ],
    guides: [
      { slug: 'restaurant-website-design-orange-county', label: 'Restaurant web design guide' },
      { slug: '2026-05-14-santa-ana-restaurant-seo-case-study', label: 'Restaurant SEO case study' },
      { slug: '2026-07-02-case-study-orange-county-restaurant-ai-overviews-optimization', label: 'AI Overviews restaurant case study' },
    ],
    webDesignPath: '/services/web-design/',
    localSeoPath: '/services/local-seo/',
    pricingAnchor: '#web-design',
    hubPath: '/industries/restaurants/',
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Wellness',
    summary: 'Medical practices, dental offices, med spas, and wellness clinics with compliance-aware messaging.',
    detail: 'Healthcare sites need clarity, accessibility, and trust. We build patient-friendly layouts, treatment pages, and local SEO foundations that respect HIPAA-conscious workflows — without sacrificing conversion.',
    highlights: [
      'Treatment and provider pages with clear patient pathways',
      'Accessibility and performance built in from day one',
      'Local SEO for "near me" provider searches',
    ],
    guides: [
      { slug: '2026-05-14-orange-county-dental-seo-guide', label: 'Dental SEO guide' },
      { slug: '2026-05-15-orange-county-healthcare-seo-hipaa', label: 'Healthcare SEO & HIPAA' },
      { slug: '2026-05-14-huntington-beach-medical-spa-seo-guide', label: 'Med spa SEO guide' },
    ],
    webDesignPath: '/services/web-design/',
    localSeoPath: '/services/local-seo/',
    pricingAnchor: '#local-seo',
    hubPath: '/industries/dental/',
  },
  {
    id: 'home-property',
    title: 'Home & Property',
    summary: 'Remodeling, cleaning, property management, and real estate professionals serving OC homeowners.',
    detail: 'Property-related businesses rely on proof. Project galleries, service-area maps, and neighborhood-targeted pages help you show up — and stand out — in competitive coastal and inland markets.',
    highlights: [
      'Before/after and portfolio sections that load fast',
      'Neighborhood and city pages for hyper-local relevance',
      'Quote and estimate flows with minimal friction',
    ],
    guides: [
      { slug: '2026-05-15-newport-beach-luxury-real-estate-seo', label: 'Luxury real estate SEO' },
      { slug: '2026-05-14-contractor-seo-orange-county-guide', label: 'Home services SEO guide' },
    ],
    webDesignPath: '/services/web-design/',
    localSeoPath: '/local-seo/newport-beach/',
    pricingAnchor: '#web-design',
  },
  {
    id: 'retail-ecommerce',
    title: 'Retail, E‑commerce & Local Services',
    summary: 'Shops, boutiques, appointment-based services, and online stores serving Orange County customers.',
    detail: 'Whether you need foot traffic or online sales, we connect product highlights, booking flows, and local SEO so customers find you on Maps and convert on-site.',
    highlights: [
      'Product and collection pages with clean merchandising',
      'Appointment and booking integration hooks',
      'Local + organic visibility for hybrid retail models',
    ],
    guides: [
      { slug: 'ecommerce-website-design-orange-county-2026-trends', label: 'E‑commerce web design trends' },
      { slug: '2026-05-16-orange-county-ecommerce-seo-mastery', label: 'E‑commerce SEO guide' },
      { slug: '2026-05-14-costa-mesa-ecommerce-seo-case-study', label: 'E‑commerce case study' },
    ],
    webDesignPath: '/services/web-design/',
    localSeoPath: '/services/local-seo/',
    pricingAnchor: '#web-design',
  },
  {
    id: 'tourism-hospitality',
    title: 'Tourism & Hospitality',
    summary: 'Hotels, venues, tour operators, and experience brands across Anaheim, Laguna Beach, and coastal OC.',
    detail: 'Tourism businesses compete on discovery and immediacy. We build seasonal landing pages, event-ready layouts, and local SEO that captures visitors searching before they arrive.',
    highlights: [
      'Seasonal and event landing pages',
      'Strong visual storytelling without killing page speed',
      'Maps, hours, and booking paths optimized for mobile',
    ],
    guides: [
      { slug: '2026-05-15-anaheim-tourism-convention-seo', label: 'Anaheim tourism SEO' },
      { slug: '2026-05-15-laguna-beach-tourism-seo', label: 'Laguna Beach tourism SEO' },
      { slug: '2026-05-15-huntington-beach-surf-tourism-seo', label: 'Huntington Beach tourism SEO' },
    ],
    webDesignPath: '/services/web-design/',
    localSeoPath: '/local-seo/anaheim/',
    pricingAnchor: '#local-seo',
  },
  {
    id: 'nonprofits',
    title: 'Education & Non‑profits',
    summary: 'Schools, community organizations, government-adjacent groups, and mission-driven OC institutions.',
    detail: 'Non-profits need clarity and accessibility. We structure programs, events, and donation pathways so supporters understand your mission — and search engines understand your organization.',
    highlights: [
      'Accessible navigation and readable content hierarchy',
      'Programs, events, and donation page templates',
      'Local visibility for community-driven searches',
    ],
    guides: [
      { slug: '2026-05-15-santa-ana-government-nonprofit-seo', label: 'Government & non‑profit SEO' },
    ],
    webDesignPath: '/services/web-design/',
    localSeoPath: '/local-seo/santa-ana/',
    pricingAnchor: '#web-design',
  },
];

export const industryResources: IndustryResource[] = [
  { slug: '2026-05-14-orange-county-dental-seo-guide', title: 'Orange County Dental SEO Guide', category: 'Industry SEO', sector: 'Healthcare' },
  { slug: '2026-05-14-legal-seo-orange-county-guide', title: 'Legal SEO Orange County', category: 'Industry SEO', sector: 'Professional Services' },
  { slug: '2026-05-14-contractor-seo-orange-county-guide', title: 'Contractor SEO Orange County', category: 'Industry SEO', sector: 'Contractors' },
  { slug: 'restaurant-website-design-orange-county', title: 'Restaurant Website Design OC', category: 'Restaurant Websites', sector: 'Restaurants' },
  { slug: '2026-05-15-orange-county-healthcare-seo-hipaa', title: 'Healthcare SEO & HIPAA', category: 'Industry SEO', sector: 'Healthcare' },
  { slug: '2026-05-15-newport-beach-luxury-real-estate-seo', title: 'Newport Beach Luxury Real Estate SEO', category: 'Industry SEO', sector: 'Real Estate' },
  { slug: '2026-05-16-orange-county-ecommerce-seo-mastery', title: 'Orange County E‑commerce SEO', category: 'E-commerce SEO', sector: 'Retail' },
  { slug: '2026-05-14-huntington-beach-medical-spa-seo-guide', title: 'Huntington Beach Med Spa SEO', category: 'Industry SEO', sector: 'Healthcare' },
  { slug: '2026-05-14-santa-ana-restaurant-seo-case-study', title: 'Santa Ana Restaurant SEO Case Study', category: 'Case Studies', sector: 'Restaurants' },
  { slug: '2026-05-14-costa-mesa-ecommerce-seo-case-study', title: 'Costa Mesa E‑commerce Case Study', category: 'Case Studies', sector: 'Retail' },
  { slug: '2026-05-14-newport-beach-local-seo-case-study', title: 'Newport Beach Local SEO Case Study', category: 'Case Studies', sector: 'Multi-industry' },
  { slug: '2026-05-18-orange-county-web-traffic-case-study', title: '347% Traffic Increase Case Study', category: 'Case Studies', sector: 'Multi-industry' },
  { slug: '2026-06-29-review-velocity-beats-volume-local-seo', title: 'Why Review Velocity Beats Volume', category: 'Local SEO', sector: 'All industries' },
  { slug: '2026-06-11-hyper-local-content-wins-2026', title: 'Hyper-Local Content That Wins in 2026', category: 'Local SEO', sector: 'All industries' },
  { slug: '2026-03-19-ai-overviews-web-design-seo-outline', title: 'Google AI Overviews & Web Design', category: 'Web Design', sector: 'All industries' },
  { slug: '2026-03-26-visual-seo-geotagged-photos-local-search', title: 'Visual SEO: Geotagged Photos Guide', category: 'Local SEO', sector: 'All industries' },
];
