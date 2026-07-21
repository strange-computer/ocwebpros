export interface CityFaq {
  question: string;
  answer: string;
}

export interface CityServicePageData {
  slug: string;
  name: string;
  shortName: string;
  badge: string;
  title: string;
  description: string;
  heroSubtitle: string;
  intro: string[];
  marketInsight: string;
  neighborhoods: string[];
  businessTypes: string[];
  challenges: string[];
  services: { title: string; description: string }[];
  whyUs: string[];
  /** Neighborhood-named deliverables — how we work in this city (no fake case studies) */
  localProof?: string[];
  blogSlug?: string;
  blogTitle?: string;
  faqs: CityFaq[];
}
