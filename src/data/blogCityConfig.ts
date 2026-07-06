import { cityRegistry } from './cityRegistry';

export interface CityBlogConfig {
  name: string;
  localSeoPath: string;
  webDesignPath: string;
}

export const blogCityConfig: Record<string, CityBlogConfig> = Object.fromEntries(
  cityRegistry.map((city) => [
    city.slug,
    {
      name: city.name,
      localSeoPath: `/local-seo/${city.slug}`,
      webDesignPath: `/web-design/${city.slug}`,
    },
  ])
);
