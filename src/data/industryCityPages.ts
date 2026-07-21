import { cityRegistryBySlug } from './cityRegistry';
import { cityProofStrip } from './priorityLocalSeoCities';
import {
  MESH_CITY_NAMES,
  MESH_CITY_SLUGS,
  MESH_INDUSTRIES,
  type MeshCitySlug,
  type MeshIndustrySlug,
} from './industryMesh';

export type IndustryCityPage = {
  industry: MeshIndustrySlug;
  citySlug: MeshCitySlug;
  cityName: string;
  metaTitle: string;
  description: string;
  badge: string;
  h1: string;
  heroSubtitle: string;
  intro: string[];
  neighborhoods: string[];
  deliverables: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

const industryCopy: Record<
  MeshIndustrySlug,
  {
    niche: string;
    badge: string;
    hireLabel: string;
    angle: (city: string) => string;
    deliverables: (city: string) => { title: string; body: string }[];
  }
> = {
  dental: {
    niche: 'Dental',
    badge: 'Dental Practices',
    hireLabel: 'Dental SEO',
    angle: (city) =>
      `${city} patients shortlist dentists by reviews, treatment pages, and Google Maps — not by who has the prettiest postcard.`,
    deliverables: (city) => [
      {
        title: `${city} treatment & provider pages`,
        body: `High-intent pages for implants, Invisalign, emergency dental, and providers that name ${city} neighborhoods patients recognize.`,
      },
      {
        title: 'Dental Google Business Profile',
        body: `Categories, photos, posts, and Q&A tuned for how ${city} patients search for dentists near them.`,
      },
      {
        title: 'Review velocity for practices',
        body: `Ethical systems to earn authentic ${city} patient reviews — a top Maps ranking and conversion factor.`,
      },
      {
        title: 'Patient-ready web design',
        body: 'Mobile appointment CTAs, insurance clarity, and Core Web Vitals that support SEO without template bloat.',
      },
    ],
  },
  contractors: {
    niche: 'Contractor',
    badge: 'Trades & Home Services',
    hireLabel: 'Contractor SEO',
    angle: (city) =>
      `${city} homeowners searching HVAC, plumbing, electrical, or remodeling compare three providers in under a minute — Maps and mobile quote paths decide the winner.`,
    deliverables: (city) => [
      {
        title: `${city} service × city pages`,
        body: `Commercial landing pages for the trades you cover in ${city} — hire intent, not blog fluff.`,
      },
      {
        title: 'GBP for trades',
        body: `Categories, services, photos, and posts that match how ${city} homeowners search contractors.`,
      },
      {
        title: 'Review & license trust stack',
        body: 'Ethical review systems plus license and before/after placement that reduce call hesitation.',
      },
      {
        title: 'Mobile-first contractor sites',
        body: 'Click-to-call, short quote forms, and galleries that convert emergency and project intent.',
      },
    ],
  },
};

const cityOverrides: Partial<
  Record<MeshCitySlug, Partial<Record<MeshIndustrySlug, { introExtra?: string; neighborhoodHint?: string }>>>
> = {
  irvine: {
    dental: {
      introExtra:
        'Spectrum, Woodbridge, and University Park patients expect polished provider pages — DSOs already crowd the Map Pack.',
      neighborhoodHint: 'Woodbridge, Spectrum, and University Park',
    },
    contractors: {
      introExtra: 'Irvine HOAs and planned communities mean contractors win with clear service areas and review depth.',
      neighborhoodHint: 'Woodbridge, Northwood, and the Spectrum area',
    },
  },
  fullerton: {
    dental: {
      introExtra: 'Downtown and Cal State corridors create student and family patient mixes that need distinct messaging.',
      neighborhoodHint: 'downtown Fullerton, SOCO, and the Cal State area',
    },
    contractors: {
      introExtra: 'Harbor Blvd and Commonwealth corridor trades compete with Brea and Anaheim providers for the same jobs.',
      neighborhoodHint: 'Harbor Blvd, SOCO, and Commonwealth',
    },
  },
  anaheim: {
    dental: {
      introExtra: 'Resort visitors rarely book dentistry — Anaheim Hills and residential corridors drive the real patient demand.',
      neighborhoodHint: 'Anaheim Hills, Platinum Triangle, and downtown Anaheim',
    },
    contractors: {
      introExtra: 'Tourism noise on Katella does not help home-service rankings — resident Maps signals do.',
      neighborhoodHint: 'Anaheim Hills, Ball Road, and the Resort-adjacent residential corridors',
    },
  },
  'huntington-beach': {
    dental: {
      introExtra: 'Coastal aesthetics practices compete hard — GBP photography and review velocity are table stakes.',
      neighborhoodHint: 'the Pier, Harbour, and Mesa Verde',
    },
    contractors: {
      introExtra: 'Beach and Harbour homeowners research thoroughly; thin city pages lose to HB-named competitors.',
      neighborhoodHint: 'Pier, Harbour, and Beach Blvd corridors',
    },
  },
  'lake-forest': {
    dental: {
      introExtra: 'We are based here — Lake Forest and Foothill Ranch practices get same-day, hyper-local support.',
      neighborhoodHint: 'Foothill Ranch, Portola Hills, and El Toro Road',
    },
    contractors: {
      introExtra: 'South OC trades serving Lake Forest benefit from a partner that already knows the Towne Centre and Orchard corridors.',
      neighborhoodHint: 'Foothill Ranch, The Orchard, and Portola Hills',
    },
  },
  'newport-beach': {
    dental: {
      introExtra: 'Fashion Island and CdM patients judge the website before they call — presentation is a ranking and conversion factor.',
      neighborhoodHint: 'Fashion Island, Corona del Mar, and Newport Coast',
    },
    contractors: {
      introExtra: 'Luxury coastal jobs demand premium digital presence; national brands already compete in this Map Pack.',
      neighborhoodHint: 'Fashion Island, CdM, and Mariners Mile',
    },
  },
  'costa-mesa': {
    dental: {
      introExtra: 'South Coast Metro density means every dental category fights for Maps and organic attention.',
      neighborhoodHint: 'South Coast Plaza, Mesa Verde, and 17th Street',
    },
    contractors: {
      introExtra: 'Retail and residential mix around The Camp and Harbor Blvd needs clear Costa Mesa city association.',
      neighborhoodHint: 'Harbor Blvd, Westside, and South Coast Metro',
    },
  },
  'santa-ana': {
    dental: {
      introExtra: 'OC’s largest city means bilingual search intent and intense competition across downtown and neighborhood corridors.',
      neighborhoodHint: 'downtown Santa Ana, Bristol Street, and Civic Center',
    },
    contractors: {
      introExtra: 'Dense competition and multilingual queries reward dedicated Santa Ana pages over generic OC sites.',
      neighborhoodHint: 'Artists Village, Bristol Street, and First Street corridors',
    },
  },
};

function buildPage(industry: MeshIndustrySlug, citySlug: MeshCitySlug): IndustryCityPage {
  const cityName = MESH_CITY_NAMES[citySlug];
  const copy = industryCopy[industry];
  const registry = cityRegistryBySlug[citySlug];
  const override = cityOverrides[citySlug]?.[industry];
  const neighborhoodHint =
    override?.neighborhoodHint ||
    (registry?.neighborhoods?.slice(0, 3).join(', ') ?? `key ${cityName} neighborhoods`);

  const intro = [
    `If you searched for ${copy.hireLabel.toLowerCase()} in ${cityName} or ${industry === 'dental' ? 'dentist SEO' : 'contractor SEO'} ${cityName}, this is the commercial page to hire from.`,
    copy.angle(cityName),
    override?.introExtra ??
      `OCWebPros builds ${copy.niche.toLowerCase()} local SEO and websites from Lake Forest — city pages, GBP, and review systems sized for ${cityName} competition.`,
  ];

  return {
    industry,
    citySlug,
    cityName,
    metaTitle: `${copy.hireLabel} in ${cityName}, CA | OCWebPros`,
    description: `${copy.hireLabel} in ${cityName}. ${copy.angle(cityName)} Free audit. Lake Forest-based OCWebPros.`,
    badge: copy.badge,
    h1: `${copy.hireLabel} in ${cityName}`,
    heroSubtitle: `Dedicated ${copy.niche.toLowerCase()} SEO for ${cityName} — Maps, city pages, and conversion-ready websites.`,
    intro,
    neighborhoods: registry?.neighborhoods?.length
      ? registry.neighborhoods
      : [`${cityName} and surrounding Orange County`],
    deliverables: copy.deliverables(cityName),
    faqs: [
      {
        question: `How much does ${copy.hireLabel.toLowerCase()} cost in ${cityName}?`,
        answer: `OCWebPros local SEO plans start at $500/month. Growth plans at $1,250/month add ${cityName}-specific pages, competitor tracking, and ongoing content for ${copy.niche.toLowerCase()} businesses.`,
      },
      {
        question: `Why a ${cityName}-specific ${copy.niche.toLowerCase()} page instead of a county-wide site?`,
        answer: `Hire-intent searchers in ${cityName} expect local proof. Dedicated pages for ${neighborhoodHint} outperform generic Orange County landing pages for Maps and organic.`,
      },
      {
        question: `Do you also redesign ${copy.niche.toLowerCase()} websites in ${cityName}?`,
        answer: `Yes. Web design and local SEO run together so GBP, service pages, and the site stay aligned after launch.`,
      },
      {
        question: `How is this different from your ${cityName} local SEO page?`,
        answer: `The ${cityName} local SEO page covers general hire intent. This page targets ${copy.niche.toLowerCase()}-specific searches and links to the industry hub and city SEO page for full coverage.`,
      },
    ],
  };
}

export const industryCityPages: IndustryCityPage[] = MESH_INDUSTRIES.flatMap((industry) =>
  MESH_CITY_SLUGS.map((citySlug) => buildPage(industry, citySlug))
);

export function getIndustryCityPage(
  industry: string,
  citySlug: string
): IndustryCityPage | undefined {
  return industryCityPages.find((p) => p.industry === industry && p.citySlug === citySlug);
}

export { cityProofStrip };

export function meshLinksForIndustry(industry: MeshIndustrySlug): { href: string; label: string }[] {
  return MESH_CITY_SLUGS.map((slug) => ({
    href: `/industries/${industry}/${slug}/`,
    label: `${industryCopy[industry].hireLabel} ${MESH_CITY_NAMES[slug]}`,
  }));
}
