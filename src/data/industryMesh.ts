/** Cities included in dental + contractor City×Industry mesh pages. */
export const MESH_CITY_SLUGS = [
  'irvine',
  'fullerton',
  'anaheim',
  'huntington-beach',
  'lake-forest',
  'newport-beach',
  'costa-mesa',
  'santa-ana',
] as const;

export type MeshCitySlug = (typeof MESH_CITY_SLUGS)[number];

export const MESH_INDUSTRIES = ['dental', 'contractors'] as const;
export type MeshIndustrySlug = (typeof MESH_INDUSTRIES)[number];

export const MESH_CITY_NAMES: Record<MeshCitySlug, string> = {
  irvine: 'Irvine',
  fullerton: 'Fullerton',
  anaheim: 'Anaheim',
  'huntington-beach': 'Huntington Beach',
  'lake-forest': 'Lake Forest',
  'newport-beach': 'Newport Beach',
  'costa-mesa': 'Costa Mesa',
  'santa-ana': 'Santa Ana',
};

export function isMeshCity(slug: string): slug is MeshCitySlug {
  return (MESH_CITY_SLUGS as readonly string[]).includes(slug);
}

export function industryPathwayLinks(citySlug: string): { href: string; label: string }[] {
  const links: { href: string; label: string }[] = [
    { href: '/industries/contractors/', label: 'Contractor SEO hub' },
    { href: '/industries/dental/', label: 'Dental SEO hub' },
  ];
  if (isMeshCity(citySlug)) {
    const name = MESH_CITY_NAMES[citySlug];
    links.unshift(
      { href: `/industries/contractors/${citySlug}/`, label: `Contractor SEO in ${name}` },
      { href: `/industries/dental/${citySlug}/`, label: `Dental SEO in ${name}` }
    );
  }
  links.push(
    { href: '/industries/restaurants/', label: 'Restaurant SEO hub' },
    { href: '/industries/legal/', label: 'Legal SEO hub' }
  );
  return links;
}
