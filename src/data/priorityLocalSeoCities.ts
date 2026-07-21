import type { CityServicePageData } from './cityPageTypes';

/** Shared commercial proof used on every city SEO / web-design page. */
export const cityProofStrip = [
  { label: 'Local SEO from', value: '$500/mo' },
  { label: 'Based in', value: 'Lake Forest, CA' },
  { label: 'Response', value: 'Same-day' },
  { label: 'Contracts', value: 'None required' },
] as const;

function baseFaqs(city: string, neighborhoodHint: string): CityServicePageData['faqs'] {
  return [
    {
      question: `How much does SEO cost for a ${city} business?`,
      answer: `OCWebPros local SEO plans start at $500/month for Google Business Profile management, citation monitoring, and technical upkeep. Growth plans at $1,250/month add ${city}-specific content, competitor analysis, and on-page optimization.`,
    },
    {
      question: `How long does it take to rank for SEO in ${city}?`,
      answer: `Most ${city} businesses see measurable Maps movement within 60–90 days with consistent GBP activity, a dedicated city page, and review generation. Competitive categories can take 3–6 months for dominant organic positions.`,
    },
    {
      question: `Do you need a ${city} office to rank locally?`,
      answer: `No. Service-area businesses can rank in ${city} with a properly configured Google Business Profile, city-specific landing pages, consistent citations, and genuine customer reviews — structured within Google's guidelines.`,
    },
    {
      question: `Why hire OCWebPros instead of a national SEO agency for ${city}?`,
      answer: `We're based in Lake Forest — minutes from ${city} markets. You get same-day response, local market knowledge, and city pages built the way we recommend to clients. Plans are transparent from $500/mo with no long-term contracts.`,
    },
    {
      question: `Do you serve businesses near ${neighborhoodHint}?`,
      answer: `Yes. We serve the full ${city} area including ${neighborhoodHint}, and surrounding Orange County communities from our Lake Forest office.`,
    },
  ];
}

function services(city: string): CityServicePageData['services'] {
  return [
    {
      title: `Google Business Profile for ${city}`,
      description: `Categories, weekly posts, photos, Q&A, and review monitoring tuned for how ${city} customers search and compare providers.`,
    },
    {
      title: `${city} Service Landing Pages`,
      description: `Commercial pages targeting "SEO ${city}" and service-specific hire queries — the URLs Google prefers over blog posts alone.`,
    },
    {
      title: 'Citation & NAP Consistency',
      description: `Clean listings across Yelp, Bing, Apple Maps, and ${city}-area directories so Google trusts your location data.`,
    },
    {
      title: 'Review Velocity Strategy',
      description: `Ethical systems to earn authentic ${city} reviews and respond fast — a top local ranking and conversion factor.`,
    },
    {
      title: 'Hyper-Local Content',
      description: `Neighborhood and landmark content that reinforces your ${city} service pages without cannibalizing them.`,
    },
    {
      title: 'Monthly Ranking Reports',
      description: `Track ${city} keyword positions, Maps visibility, calls, and form leads with clear next steps.`,
    },
  ];
}

/** Priority cities upgraded to Irvine-class uniqueness (Days 1–30 foundation). */
export const priorityLocalSeoCities: CityServicePageData[] = [
  {
    slug: 'fullerton',
    name: 'Fullerton',
    shortName: 'Fullerton',
    badge: 'Downtown & University Hub',
    title: 'SEO Services in Fullerton, CA | Local SEO Agency | OCWebPros',
    description:
      'Looking for SEO in Fullerton? Local SEO for downtown, Cal State Fullerton, and SOCO businesses — GBP, Maps, city pages, citations. Free audit. Lake Forest-based.',
    heroSubtitle:
      'Hire SEO for Fullerton that understands downtown nightlife, CSUF student demand, and North OC Maps competition — not generic county-wide tactics.',
    intro: [
      'If you searched for SEO Fullerton or local SEO Fullerton, this is the page to hire from. Fullerton mixes a revitalized downtown entertainment corridor with Cal State Fullerton student traffic and industrial-district B2B — three search behaviors that a one-page Orange County strategy cannot cover.',
      'OCWebPros is based in Lake Forest and helps Fullerton businesses win Maps and organic with dedicated city pages, active Google Business Profiles, and review systems built for how Fullerton customers actually choose providers.',
    ],
    marketInsight:
      'Downtown diners search differently than CSUF-area services or Commonwealth corridor contractors. Rankings follow neighborhood intent — Harbor Blvd, SOCO, and campus-adjacent queries — plus strong review velocity against North OC competitors in Brea and Anaheim.',
    neighborhoods: [
      'Downtown Fullerton & Harbor Blvd',
      'Cal State Fullerton area',
      'SOCO District',
      'Fullerton Arboretum vicinity',
      'Brea Boulevard corridor',
      'Commonwealth Avenue',
    ],
    businessTypes: [
      'Downtown restaurants & nightlife',
      'Cal State student services',
      'Medical & dental practices',
      'Auto repair & services',
      'Home contractors',
      'Creative & marketing agencies',
    ],
    challenges: [
      'High competition in downtown dining and nightlife',
      'Student vs. permanent resident targeting on the same site',
      'Many downtown businesses with thin GBP optimization',
      'Content that never references SOCO or Harbor landmarks',
    ],
    services: services('Fullerton'),
    whyUs: [
      'North OC coverage from Lake Forest — same-day meetings, no overseas handoffs',
      'We separate downtown, campus, and industrial intent instead of one generic Fullerton blurb',
      'Transparent plans from $500/mo with direct access to the people doing the work',
      'We build the city service pages we recommend — not blog-only shortcuts',
    ],
    blogSlug: '2026-05-14-fullerton-local-seo-guide',
    blogTitle: 'Fullerton Local SEO Guide',
    faqs: baseFaqs('Fullerton', 'downtown Fullerton, SOCO, and the Cal State area'),
  },
  {
    slug: 'huntington-beach',
    name: 'Huntington Beach',
    shortName: 'Huntington Beach',
    badge: 'Surf City USA',
    title: 'SEO Services in Huntington Beach, CA | Local SEO Agency | OCWebPros',
    description:
      'Looking for SEO in Huntington Beach? Local SEO for Pier, Main Street, Harbour, and beach-corridor businesses — GBP, Maps, city pages. Free audit. Lake Forest-based.',
    heroSubtitle:
      'Surf City searches are seasonal, visual, and Maps-heavy. Hire local SEO built for Pier tourism and year-round resident demand.',
    intro: [
      'If you searched for SEO Huntington Beach or local SEO Huntington Beach, this is the commercial home to hire from. Surf City USA pulls tourism spikes around the Pier and Main Street while Harbour and Mesa Verde residents search like any high-intent coastal suburb — you need both visitor and local signals.',
      'OCWebPros helps Huntington Beach businesses rank with dedicated city pages, GBP tuned for beach and residential categories, and review systems that convert comparison shoppers on mobile.',
    ],
    marketInsight:
      'Summer and event weekends inflate Pier and Pacific City queries; medical spas, home services, and real estate compete year-round inland. Winning HB means naming Pier, Harbour, Seacliff, and Beach Blvd corridors — not just "Orange County coastal."',
    neighborhoods: [
      'Huntington Pier & Main Street',
      'Pacific City & 5th Street',
      'Huntington Harbour',
      'Mesa Verde & Garfield',
      'Seacliff & Sunset Beach',
      'Beach Boulevard corridor',
    ],
    businessTypes: [
      'Surf & beach retail',
      'Restaurants & beach bars',
      'Medical spas & wellness',
      'Real estate & vacation rentals',
      'Home services & contractors',
      'Fitness & outdoor lifestyle',
    ],
    challenges: [
      'Saturated beach retail, dining, and wellness categories',
      'Seasonal tourism vs. resident search patterns',
      'Medical spa and aesthetics competition',
      'Weak mobile experiences for visitors searching from the sand',
    ],
    services: services('Huntington Beach'),
    whyUs: [
      'Coastal OC coverage from Lake Forest with same-day response',
      'Campaigns that respect tourism seasonality without ignoring resident Maps demand',
      'Transparent pricing from $500/mo — no long-term contracts',
      'City pages + web design under one roof for conversion-ready sites',
    ],
    blogSlug: '2026-05-15-huntington-beach-surf-tourism-seo',
    blogTitle: 'Huntington Beach Surf & Tourism SEO',
    faqs: baseFaqs('Huntington Beach', 'the Pier, Main Street, and Huntington Harbour'),
  },
  {
    slug: 'yorba-linda',
    name: 'Yorba Linda',
    shortName: 'Yorba Linda',
    badge: 'Affluent North OC',
    title: 'SEO Services in Yorba Linda, CA | Local SEO Agency | OCWebPros',
    description:
      'Looking for SEO in Yorba Linda? Local SEO for affluent North OC homeowners and professional practices — trust signals, GBP, city pages. Free audit. Lake Forest-based.',
    heroSubtitle:
      'Yorba Linda customers research before they call. Hire SEO that looks as premium as the market you serve.',
    intro: [
      'If you searched for SEO Yorba Linda or local SEO Yorba Linda, this is the hire page. Affluent homeowners in East Lake Village, Bryant Ranch, and Town Center treat Google like a shortlist — reviews, photography, and a credible website decide who gets the appointment.',
      'OCWebPros builds Yorba Linda visibility with dedicated city pages, polished GBP profiles, and review velocity systems matched to high-consideration local searches.',
    ],
    marketInsight:
      'Search volume is lower than Irvine or Anaheim; job values are higher. Providers from Placentia, Brea, and Anaheim Hills actively poach Yorba Linda demand — claiming the city name on-page and on Maps is a competitive advantage, not a nicety.',
    neighborhoods: [
      'Yorba Linda Town Center',
      'East Lake Village',
      'Villa Park border',
      'Imperial Highway corridor',
      'Yorba Linda Boulevard',
      'Bryant Ranch area',
    ],
    businessTypes: [
      'Luxury home services & landscaping',
      'Dental & medical practices',
      'Financial & legal services',
      'Boutique retail & dining',
      'Real estate & property',
      'Fitness & family services',
    ],
    challenges: [
      'Premium expectations for every digital touchpoint',
      'High competition among professional and home services',
      'Providers serving YL without a dedicated city page',
      'Overlap with Placentia, Brea, and Anaheim Hills competitors',
    ],
    services: services('Yorba Linda'),
    whyUs: [
      'North OC specialists who treat trust signals as ranking factors',
      'City pages that name East Lake Village and Bryant Ranch — not "all of OC"',
      'Plans from $500/mo with direct access — no account-manager maze',
      'Web design + local SEO so the site matches the market',
    ],
    blogSlug: '2026-07-06-yorba-linda-local-seo-guide',
    blogTitle: 'Yorba Linda Local SEO Guide',
    faqs: baseFaqs('Yorba Linda', 'East Lake Village, Bryant Ranch, and Town Center'),
  },
  {
    slug: 'fountain-valley',
    name: 'Fountain Valley',
    shortName: 'Fountain Valley',
    badge: 'Central OC Crossroads',
    title: 'SEO Services in Fountain Valley, CA | Local SEO Agency | OCWebPros',
    description:
      'Looking for SEO in Fountain Valley? Local SEO for medical, auto, and central OC businesses fighting border-city competition. Free audit. Lake Forest-based.',
    heroSubtitle:
      'Four bigger neighbors want your customers. Hire Fountain Valley SEO that claims your city on Maps and on-site.',
    intro: [
      'If you searched for SEO Fountain Valley or local SEO Fountain Valley, hire here. Sitting between Huntington Beach, Costa Mesa, Santa Ana, and Westminster, Fountain Valley businesses lose border traffic when GBP and website copy never say the city name clearly.',
      'OCWebPros helps Fountain Valley practices and trades lock city association with dedicated pages, citation cleanup, and GBP that anchors Mile Square Park, Town Center, and the Warner/Euclid medical corridor.',
    ],
    marketInsight:
      'Medical and auto searches stay strong year-round. The risk is misattribution — Google and customers sometimes assign border addresses to HB or Santa Ana. Explicit Fountain Valley signals across GBP, site, and directories fix that.',
    neighborhoods: [
      'Fountain Valley Town Center',
      'Euclid Street corridor',
      'Warner Avenue & Magnolia',
      'Mile Square Park area',
      'Slater Avenue district',
      'Huntington Beach border',
    ],
    businessTypes: [
      'Medical & dental practices',
      'Auto dealerships & services',
      'Restaurants & retail',
      'Professional services',
      'Home contractors',
      'Tech & corporate offices',
    ],
    challenges: [
      'Competition from businesses in four adjacent cities',
      'Saturated medical and dental categories',
      'Auto dealers with national SEO but weak local pages',
      'GBP listings drifting into neighboring cities',
    ],
    services: services('Fountain Valley'),
    whyUs: [
      'Central OC coverage that treats border competition as the main problem',
      'Citation and GBP cleanup that re-anchors Fountain Valley association',
      'Transparent monthly plans from $500 with no long-term contracts',
      'Lake Forest-based team — local meetings, fast turnaround',
    ],
    blogSlug: '2026-07-06-fountain-valley-local-seo-guide',
    blogTitle: 'Fountain Valley Local SEO Guide',
    faqs: baseFaqs('Fountain Valley', 'Mile Square Park, Town Center, and Warner/Euclid'),
  },
  {
    slug: 'anaheim',
    name: 'Anaheim',
    shortName: 'Anaheim',
    badge: 'Tourism & Convention Hub',
    title: 'SEO Services in Anaheim, CA | Local SEO Agency | OCWebPros',
    description:
      'Looking for SEO in Anaheim? Local SEO for Resort, Convention Center, Anaheim Hills, and resident "near me" demand. Free audit. Lake Forest-based.',
    heroSubtitle:
      'Tourists and locals search differently. Hire Anaheim SEO that targets Resort demand and Hills residents without mixing the messages.',
    intro: [
      'If you searched for SEO Anaheim or local SEO Anaheim, this is the hire page. Disneyland Resort, the Convention Center, and Anaheim Hills create three markets: visitor intent, event spikes, and year-round resident services — national chains dominate the Resort Map Pack if you show up with a generic OC page.',
      'OCWebPros helps Anaheim businesses build city and corridor pages, GBP categories that match real service areas, and review systems that work for hospitality and local trades alike.',
    ],
    marketInsight:
      'Katella and Ball Road queries spike with conventions and peak park seasons; Anaheim Hills and Platinum Triangle search more like suburban service markets. Dual targeting beats hoping one homepage ranks for both.',
    neighborhoods: [
      'Disneyland Resort & Anaheim Resort',
      'Anaheim Convention Center',
      'Anaheim Hills',
      'Downtown Anaheim & Center Street',
      'Platinum Triangle',
      'Ball Road & Katella corridor',
    ],
    businessTypes: [
      'Hotels & hospitality',
      'Restaurants & tourism retail',
      'Convention services',
      'Entertainment & attractions',
      'Medical & dental',
      'Home services & contractors',
    ],
    challenges: [
      'Extreme hospitality and tourism competition',
      'Seasonal volume tied to conventions and park crowds',
      'Businesses optimizing for tourists only',
      'National chains crowding Resort district Maps results',
    ],
    services: services('Anaheim'),
    whyUs: [
      'We plan for Resort vs. Hills intent instead of one Anaheim keyword dump',
      'Local team in Lake Forest — available for on-site reviews when it matters',
      'Plans from $500/mo with clear deliverables and no long-term lock-in',
      'Web design + SEO so visitor-facing sites convert on mobile',
    ],
    blogSlug: '2026-05-15-anaheim-tourism-convention-seo',
    blogTitle: 'Anaheim Tourism & Convention SEO Guide',
    faqs: baseFaqs('Anaheim', 'the Resort district, Convention Center, and Anaheim Hills'),
  },
  {
    slug: 'newport-beach',
    name: 'Newport Beach',
    shortName: 'Newport Beach',
    badge: 'Luxury Coastal Market',
    title: 'SEO Services in Newport Beach, CA | Local SEO Agency | OCWebPros',
    description:
      'Looking for SEO in Newport Beach? Local SEO for Fashion Island, CdM, Newport Coast, and luxury service brands. Free audit. Lake Forest-based.',
    heroSubtitle:
      'Premium markets punish weak websites. Hire Newport Beach SEO that matches the presentation customers expect.',
    intro: [
      'If you searched for SEO Newport Beach or local SEO Newport Beach, hire from this page. Fashion Island, Corona del Mar, and Newport Coast customers shortlist providers who look established — GBP photography, review depth, and site quality are table stakes.',
      'OCWebPros helps Newport Beach firms and practices compete with regional luxury brands using dedicated city pages, reputation systems, and on-page structure built for high-consideration searches.',
    ],
    marketInsight:
      'Job values are high; patience is low for amateur digital presence. Competitors include national and regional brands. Neighborhood nuance still matters — Peninsula vs. Newport Coast vs. Mariners Mile is not the same SERP fight.',
    neighborhoods: [
      'Fashion Island & Newport Center',
      'Balboa Peninsula & Island',
      'Corona del Mar',
      'Newport Coast & Pelican Hill',
      'Mariners Mile & Harbor',
      'Lido Village',
    ],
    businessTypes: [
      'Luxury real estate & property',
      'Yacht & marine services',
      'Fine dining & hospitality',
      'Medical aesthetics & wellness',
      'Law firms & wealth management',
      'High-end retail & boutiques',
    ],
    challenges: [
      'Ultra-competitive luxury categories',
      'Extremely high website design standards',
      'National and regional brands competing locally',
      'Reputation management critical at premium price points',
    ],
    services: services('Newport Beach'),
    whyUs: [
      'Presentation-first local SEO for markets that judge the website before the call',
      'City pages that speak Fashion Island and CdM — not generic "coastal OC"',
      'Transparent pricing and direct access from our Lake Forest office',
      'Pair with custom web design when the current site undercuts the brand',
    ],
    blogSlug: '2026-05-14-newport-beach-local-seo-case-study',
    blogTitle: 'Newport Beach Local SEO Case Study',
    faqs: baseFaqs('Newport Beach', 'Fashion Island, Corona del Mar, and Newport Coast'),
  },
];
