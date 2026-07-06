import { cityRegistry } from './cityRegistry';
import { buildLocalSeoPage } from './cityPageBuilder';
import type { CityServicePageData } from './cityPageTypes';

export type CityLocalSeoPage = CityServicePageData;

const handCraftedLocalSeoPages: CityServicePageData[] = [
  {
    slug: 'lake-forest',
    name: 'Lake Forest',
    shortName: 'Lake Forest',
    badge: 'Our Home Base',
    title: 'Local SEO Services in Lake Forest, CA | OCWebPros',
    description:
      'Local SEO services in Lake Forest, CA. OCWebPros is based here — Google Business Profile optimization, citations, city pages, and Google Maps rankings for Lake Forest businesses.',
    heroSubtitle:
      'Rank when Lake Forest customers search for your services. Your local SEO partner is right here in town.',
    intro: [
      'Lake Forest is our home — OCWebPros is based right here in South Orange County. We know the local business community from Foothill Ranch to The Orchard, and we understand how Lake Forest customers search for services online.',
      'Lake Forest businesses deserve a local SEO partner who shows up in person, knows the market, and builds the city-specific pages and Google Business Profile presence that generic agencies skip.',
    ],
    marketInsight:
      'Lake Forest searchers value local connection and fast response. They search "near me" from neighborhoods like Foothill Ranch, Portola Hills, and along El Toro Road — and they choose businesses with strong Maps presence, real reviews, and websites that load fast on mobile.',
    neighborhoods: [
      'Foothill Ranch & Towne Centre',
      'The Orchard & El Toro Road corridor',
      'Portola Hills & Baker Ranch border',
      'Lake Forest Sports Park area',
      'Rockfield Boulevard & I-5 corridor',
      'Serrano Park & Aliso Viejo border',
    ],
    businessTypes: [
      'Home services & contractors',
      'Medical & dental practices',
      'Restaurants & local retail',
      'Professional services & consultants',
      'Auto, fitness & personal services',
      'Real estate & property management',
    ],
    challenges: [
      'Competing with agencies in Irvine and Mission Viejo who also target Lake Forest',
      'Many local businesses rely on referrals and neglect Google Business Profile',
      'Smaller city means each Maps ranking position drives significant revenue',
      'Generic Orange County pages fail to signal genuine Lake Forest service',
    ],
    services: [
      {
        title: 'Google Business Profile for Lake Forest',
        description:
          'GBP setup, categories, weekly posts, photos, and review monitoring — optimized for Lake Forest search patterns and neighborhoods.',
      },
      {
        title: 'Lake Forest Landing Pages',
        description:
          'Dedicated pages targeting "local SEO Lake Forest" and service-specific queries that blogs and generic OC pages cannot rank for.',
      },
      {
        title: 'Citation & Directory Management',
        description:
          'Consistent NAP across Yelp, Bing, Apple Maps, and Lake Forest-area directories so Google trusts your location data.',
      },
      {
        title: 'Review Generation',
        description:
          'Ethical systems to earn authentic Lake Forest customer reviews — the strongest local ranking signal in 2026.',
      },
      {
        title: 'Local Content Strategy',
        description:
          'Blog posts, FAQs, and neighborhood content referencing local landmarks that reinforce your Lake Forest service pages.',
      },
      {
        title: 'Monthly Performance Reports',
        description:
          'Track Lake Forest keyword rankings, Maps visibility, calls, and form submissions with clear monthly recommendations.',
      },
    ],
    whyUs: [
      'We\'re based in Lake Forest — same-day meetings, no overseas handoffs',
      'Deep knowledge of Foothill Ranch, El Toro Road, and South OC search trends',
      'We practice what we preach: dedicated city pages, not blog-only SEO',
      'Plans from $500/mo with direct access to your SEO team',
    ],
    blogSlug: 'local-seo-orange-county-small-business',
    blogTitle: 'Why Local SEO Matters for Orange County Small Businesses',
    faqs: [
      {
        question: 'How much does local SEO cost in Lake Forest?',
        answer:
          'OCWebPros local SEO plans start at $500/month for Google Business Profile management, citation monitoring, and technical upkeep. Most Lake Forest small businesses see strong ROI at this tier within 60–90 days.',
      },
      {
        question: 'Why choose a Lake Forest-based SEO agency?',
        answer:
          'A local agency understands Lake Forest neighborhoods, competition, and customer behavior. You get same-time-zone support, in-person strategy sessions, and an agency with genuine skin in the local market.',
      },
      {
        question: 'How long to rank for "local SEO Lake Forest"?',
        answer:
          'Lake Forest is less competitive than Irvine, so most businesses see Maps movement within 30–60 days and organic improvement within 90 days when city pages, GBP, and reviews are executed consistently.',
      },
      {
        question: 'Do you only serve Lake Forest?',
        answer:
          'We\'re based in Lake Forest and serve all of Orange County, with dedicated pages for Irvine, Mission Viejo, Rancho Santa Margarita, and every South OC city.',
      },
      {
        question: 'What\'s included in a free Lake Forest SEO audit?',
        answer:
          'We review your Google Business Profile, current rankings for Lake Forest keywords, citation accuracy, website on-page SEO, and competitor positioning — then deliver a prioritized fix list.',
      },
    ],
  },
  {
    slug: 'irvine',
    name: 'Irvine',
    shortName: 'Irvine',
    badge: 'Tech & Startup Hub',
    title: 'Local SEO Services in Irvine, CA | OCWebPros',
    description:
      'Local SEO services for Irvine businesses. Google Business Profile optimization, citation management, city-specific content, and rankings on Google Maps. Based in Lake Forest, serving all of Irvine.',
    heroSubtitle:
      'Rank when Irvine customers search for your services — on Google Search, Google Maps, and AI-powered local results.',
    intro: [
      'Irvine is one of the most competitive local search markets in Orange County. With tech companies, medical practices, professional services, and retail at the Irvine Spectrum, standing out requires more than a generic OC-wide SEO strategy.',
      'OCWebPros is based in nearby Lake Forest and helps Irvine businesses build the on-page foundation, Google Business Profile presence, and local content signals that commercial searches demand.',
    ],
    marketInsight:
      'Irvine searchers are educated, research-heavy, and comparison-oriented. They search specific neighborhoods — Woodbridge, Northwood, University Park, Spectrum — and expect polished websites, strong reviews, and clear service pages before they call.',
    neighborhoods: [
      'Irvine Spectrum & Irvine Center Drive',
      'Woodbridge & Northwood',
      'University Park & UCI area',
      'John Wayne Airport / MacArthur corridor',
      'Turtle Rock & Shady Canyon',
      'Portola Springs & East Irvine',
    ],
    businessTypes: [
      'B2B tech & SaaS companies',
      'Medical & dental practices',
      'Law firms & financial advisors',
      'Home services & contractors',
      'Restaurants & retail at the Spectrum',
      'Real estate & property management',
    ],
    challenges: [
      'High competition from national brands and VC-backed startups',
      'Neighborhood-level search intent across distinct Irvine communities',
      'Premium expectations for website quality and review depth',
      'Map pack dominated by well-established multi-location competitors',
    ],
    services: [
      {
        title: 'Google Business Profile for Irvine',
        description:
          'Category optimization, weekly posts, photo uploads, Q&A management, and spam fighting — tuned for Irvine neighborhoods and service areas.',
      },
      {
        title: 'Irvine City & Service Pages',
        description:
          'Dedicated landing pages targeting "local SEO Irvine," "web design Irvine," and neighborhood-specific queries that blogs alone cannot cover.',
      },
      {
        title: 'Citation & NAP Consistency',
        description:
          'Accurate listings across Yelp, Bing, Apple Maps, and Irvine-area directories so Google trusts your business location data.',
      },
      {
        title: 'Review Velocity Strategy',
        description:
          'Systems to earn authentic Irvine customer reviews and respond quickly — a top local ranking factor in 2026.',
      },
      {
        title: 'Local Content & Internal Linking',
        description:
          'Hyper-local blog content, FAQ sections, and schema markup that connect your Irvine service pages to the rest of your site.',
      },
      {
        title: 'Monthly Ranking Reports',
        description:
          'Track Irvine keyword positions, Maps visibility, calls, and form submissions with clear next-step recommendations.',
      },
    ],
    whyUs: [
      '15 minutes from Irvine — same-day meetings, no overseas handoffs',
      'Deep familiarity with Irvine Spectrum, Woodbridge, and airport-corridor markets',
      'We build the city service pages we recommend to clients — not blog-only shortcuts',
      'Transparent monthly plans starting at $500/mo with no long-term contracts',
    ],
    blogSlug: '2026-05-14-irvine-google-business-profile-optimization-guide',
    blogTitle: 'Irvine Google Business Profile Optimization Guide',
    faqs: [
      {
        question: 'How much does local SEO cost for an Irvine business?',
        answer:
          'OCWebPros local SEO plans start at $500/month for ongoing Google Business Profile management, citation upkeep, and technical monitoring. Growth plans at $1,250/month add city-specific content, competitor analysis, and on-page optimization — ideal for competitive Irvine markets like professional services and medical.',
      },
      {
        question: 'How long does it take to rank for "local SEO Irvine" or similar terms?',
        answer:
          'Most Irvine businesses see measurable Maps and organic movement within 60–90 days, but highly competitive categories can take 4–6 months. Irvine is one of OC\'s toughest markets — dedicated city service pages, consistent GBP activity, and reviews accelerate results significantly.',
      },
      {
        question: 'Do you need a physical office in Irvine to rank locally?',
        answer:
          'No. Service-area businesses can rank in Irvine with a properly configured Google Business Profile, city-specific landing pages, consistent citations, and genuine Irvine client reviews. We help you structure this correctly without violating Google guidelines.',
      },
      {
        question: 'What makes Irvine local SEO different from other Orange County cities?',
        answer:
          'Irvine has higher competition, more affluent and research-oriented searchers, and strong neighborhood-level intent. Optimization must account for areas like the Spectrum, Woodbridge, and UCI — not just the city name alone.',
      },
      {
        question: 'Do you serve businesses near the Irvine Spectrum and John Wayne Airport?',
        answer:
          'Yes. We work with Irvine businesses throughout the city including the Spectrum, Irvine Center Drive, Jamboree corridor, and airport-area offices. Our Lake Forest office is a short drive from all major Irvine business districts.',
      },
    ],
  },
  {
    slug: 'mission-viejo',
    name: 'Mission Viejo',
    shortName: 'Mission Viejo',
    badge: 'Family-Focused Community',
    title: 'Local SEO Services in Mission Viejo, CA | OCWebPros',
    description:
      'Local SEO services for Mission Viejo businesses. Google Business Profile optimization, professional services SEO, citation building, and local rankings. Lake Forest-based agency serving South OC.',
    heroSubtitle:
      'Get found by Mission Viejo families and professionals searching for trusted local service providers.',
    intro: [
      'Mission Viejo is Orange County\'s largest master-planned community — and one of the strongest markets for professional services, healthcare, home services, and family-oriented businesses. Local search here rewards trust, community connection, and consistent visibility.',
      'OCWebPros helps Mission Viejo businesses rank on Google Maps and organic search with dedicated city pages, GBP optimization, and the review and citation signals that South OC customers expect.',
    ],
    marketInsight:
      'Mission Viejo residents value reliability and local reputation. Searches often include landmarks like The Shops at Mission Viejo, Lake Mission Viejo, and neighborhood names in the Saddleback Valley. Businesses that speak the community\'s language outperform generic Orange County pages.',
    neighborhoods: [
      'Lake Mission Viejo & waterfront area',
      'The Shops at Mission Viejo corridor',
      'Aegean Hills & Cordillera',
      'Pacific Hills & Casta del Sol',
      'Mission Viejo North & Olympiad area',
      'Saddleback Valley & Marguerite Parkway',
    ],
    businessTypes: [
      'Lawyers, accountants & financial advisors',
      'Dental, medical & wellness practices',
      'Home remodeling & contractors',
      'Family restaurants & local retail',
      'Real estate agents & property managers',
      'Fitness, childcare & family services',
    ],
    challenges: [
      'High concentration of established professional service competitors',
      'Community trust signals weigh heavily on family-oriented purchase decisions',
      'Many businesses rely on referrals and neglect dedicated local landing pages',
      'Competing with practices that have years of review history',
    ],
    services: [
      {
        title: 'Google Business Profile for Mission Viejo',
        description:
          'Complete GBP setup and ongoing optimization — categories, services, photos, posts, and review monitoring for Mission Viejo search visibility.',
      },
      {
        title: 'Mission Viejo Service Area Pages',
        description:
          'Commercial landing pages for "local SEO Mission Viejo" and service-specific queries that convert searchers ready to hire.',
      },
      {
        title: 'Professional Services SEO',
        description:
          'Specialized optimization for lawyers, doctors, dentists, and advisors competing in Mission Viejo\'s affluent professional market.',
      },
      {
        title: 'Citation Building & Cleanup',
        description:
          'Consistent NAP across directories, chambers, and South OC listings so Google validates your Mission Viejo presence.',
      },
      {
        title: 'Review Generation Systems',
        description:
          'Ethical workflows to collect detailed Mission Viejo client reviews — quality and recency matter more than volume alone.',
      },
      {
        title: 'Local Content Strategy',
        description:
          'Blog posts, FAQs, and neighborhood-focused content that reinforce your Mission Viejo service pages and build topical authority.',
      },
    ],
    whyUs: [
      'Neighbors in Lake Forest — we know South OC and Mission Viejo buyer expectations',
      'Experience with professional services in master-planned communities',
      'City-specific pages paired with ongoing GBP and content work',
      'Direct access to your SEO team — no ticket queues or offshore account managers',
    ],
    blogSlug: '2026-05-15-mission-viejo-professional-services-seo',
    blogTitle: 'Mission Viejo Professional Services SEO Guide',
    faqs: [
      {
        question: 'How much does local SEO cost for a Mission Viejo business?',
        answer:
          'Plans start at $500/month for GBP management, citation monitoring, and technical SEO upkeep. Mission Viejo professional service firms typically benefit from the $1,250/month Growth Engine plan, which includes local content, competitor gap analysis, and on-page optimization.',
      },
      {
        question: 'Can you help Mission Viejo professional services rank on Google Maps?',
        answer:
          'Yes. Professional services are one of our core focuses in Mission Viejo. We optimize your Google Business Profile, build city-specific landing pages, manage citations, and implement review strategies tailored to high-trust service categories.',
      },
      {
        question: 'How is Mission Viejo local SEO different from Irvine?',
        answer:
          'Mission Viejo is more family- and community-oriented with strong professional services concentration. Irvine is more corporate and tech-heavy. Content, reviews, and GBP messaging should reflect Mission Viejo\'s master-planned community culture — not a copy-paste from other cities.',
      },
      {
        question: 'Do you work with businesses near Lake Mission Viejo and The Shops?',
        answer:
          'Absolutely. We serve businesses throughout Mission Viejo including the lake area, Marguerite Parkway corridor, and all major neighborhoods in the Saddleback Valley.',
      },
      {
        question: 'How soon will I see results in Mission Viejo?',
        answer:
          'Most clients see improved Maps impressions and call volume within the first 60–90 days. Mission Viejo is competitive but less saturated than Irvine — dedicated city pages and consistent GBP activity typically produce faster wins for well-positioned local businesses.',
      },
    ],
  },
  {
    slug: 'rancho-santa-margarita',
    name: 'Rancho Santa Margarita',
    shortName: 'RSM',
    badge: 'Growing South OC City',
    title: 'Local SEO Services in Rancho Santa Margarita, CA | OCWebPros',
    description:
      'Local SEO services for Rancho Santa Margarita (RSM) businesses. Google Business Profile optimization, local citations, city landing pages, and Google Maps rankings. Lake Forest-based South OC agency.',
    heroSubtitle:
      'Dominate local search in Rancho Santa Margarita — where community loyalty and personalized service win customers.',
    intro: [
      'Rancho Santa Margarita is one of South Orange County\'s tightest-knit business communities. RSM customers prefer local providers they can trust — and they find them on Google Maps, local search, and AI-powered recommendations.',
      'OCWebPros is right next door in Lake Forest. We help RSM businesses build the dedicated city pages, Google Business Profile presence, and local authority signals that generic Orange County SEO cannot deliver.',
    ],
    marketInsight:
      'RSM is smaller than Irvine or Mission Viejo, which means less competition but also fewer shortcuts — businesses that invest in city-specific pages and active GBP management can capture market share quickly. Landmarks like Central Park, Plano Trabuco Road, and the Mercado del Lago area anchor local search intent.',
    neighborhoods: [
      'Central Park & Mercado del Lago',
      'Plano Trabuco Road corridor',
      'Santa Margarita Parkway area',
      'Trabuco Highlands & Dove Canyon border',
      'Robinson Ranch & Dove Canyon',
      'Crown Valley & Antonio Parkway',
    ],
    businessTypes: [
      'Contractors & home improvement',
      'Dental & family medical practices',
      'Boutique retail & local services',
      'Fitness studios & wellness providers',
      'Restaurants & neighborhood eateries',
      'Auto, pet care & personal services',
    ],
    challenges: [
      'Many RSM businesses lack any dedicated local SEO landing page',
      'Smaller market means every Maps position has high revenue impact',
      'Competing with providers in Mission Viejo and Lake Forest who target RSM',
      'Under-investment in reviews and Google Business Profile activity',
    ],
    services: [
      {
        title: 'Google Business Profile for RSM',
        description:
          'Full GBP optimization with weekly posts, photos, service listings, and review monitoring — built for Rancho Santa Margarita search patterns.',
      },
      {
        title: 'Rancho Santa Margarita Landing Pages',
        description:
          'Dedicated "local SEO Rancho Santa Margarita" pages that give Google a clear commercial target — something no blog post alone provides.',
      },
      {
        title: 'South OC Citation Network',
        description:
          'NAP consistency across Yelp, Bing, Apple Maps, and community directories that reinforce your RSM service area.',
      },
      {
        title: 'Review & Reputation Building',
        description:
          'Practical systems to earn authentic RSM customer reviews and respond within 24 hours to build trust signals.',
      },
      {
        title: 'Hyper-Local Content',
        description:
          'Neighborhood-aware blog posts and FAQ content referencing Central Park, Trabuco Canyon, and RSM community landmarks.',
      },
      {
        title: 'Competitor & Ranking Tracking',
        description:
          'Monthly reports on your RSM keyword positions, Maps visibility, and how you compare to Mission Viejo and Lake Forest competitors.',
      },
    ],
    whyUs: [
      'Lake Forest neighbor — RSM is minutes away for in-person strategy sessions',
      'We understand RSM\'s community-first buying behavior vs. larger OC cities',
      'First-mover advantage: few agencies have dedicated RSM local SEO pages',
      'Affordable entry at $500/mo with scalable growth plans as your visibility improves',
    ],
    blogSlug: '2026-07-06-rancho-santa-margarita-local-seo-guide',
    blogTitle: 'Rancho Santa Margarita Local SEO Guide',
    faqs: [
      {
        question: 'How much does local SEO cost for a Rancho Santa Margarita business?',
        answer:
          'OCWebPros local SEO starts at $500/month. For most RSM small businesses, the Foundation plan covers GBP management, citation upkeep, and technical monitoring. Businesses targeting multiple South OC cities can scale to the $1,250/month Growth Engine plan.',
      },
      {
        question: 'Is Rancho Santa Margarita local SEO less competitive than Irvine?',
        answer:
          'Yes. RSM has fewer businesses competing for the same keywords, which means dedicated city pages and consistent GBP work can produce results faster. However, you still need proper on-page structure, reviews, and citations — the fundamentals don\'t change.',
      },
      {
        question: 'Do you serve businesses in Trabuco Canyon and Dove Canyon near RSM?',
        answer:
          'Yes. We serve the full Rancho Santa Margarita area including Trabuco Canyon, Dove Canyon, Robinson Ranch, and surrounding South OC communities from our Lake Forest office.',
      },
      {
        question: 'Why do I need a dedicated RSM page if I already have a blog?',
        answer:
          'Blogs target informational searches. "Local SEO Rancho Santa Margarita" is a commercial query — searchers want to hire a provider. Google ranks dedicated service landing pages for these terms, not blog posts buried under /blog/.',
      },
      {
        question: 'How quickly can an RSM business rank on Google Maps?',
        answer:
          'RSM businesses with optimized GBP profiles, 10+ quality reviews, and a dedicated city page often see Maps improvement within 30–60 days. Full organic ranking for competitive terms typically takes 3–4 months of consistent effort.',
      },
    ],
  },
];

const generatedLocalSeoPages = cityRegistry
  .filter((city) => !city.handCrafted)
  .map(buildLocalSeoPage);

export const cityLocalSeoPages: CityServicePageData[] = [
  ...handCraftedLocalSeoPages,
  ...generatedLocalSeoPages,
];
