/**
 * Build scripts/web-design-video-manifest.json from the local-seo city manifest
 * (reuses landmarks / geo queries; rewrites titles + web-design scripts).
 *
 * Usage: node scripts/generate-web-design-video-manifest.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const seoPath = join(__dirname, 'video-manifest.json');
const outPath = join(__dirname, 'web-design-video-manifest.json');

if (!existsSync(seoPath)) {
  throw new Error('Missing scripts/video-manifest.json — run generate:city-manifest first');
}

const seo = JSON.parse(readFileSync(seoPath, 'utf8'));
const existing = existsSync(outPath) ? JSON.parse(readFileSync(outPath, 'utf8')) : [];

function buildEntry(src) {
  const prior = existing.find((e) => e.citySlug === src.citySlug);
  if (prior) {
    // Keep prior hand-tuned scripts/landmarks; refresh title/slug/id if needed
    return {
      ...prior,
      id: `web-design-${src.citySlug}`,
      title: prior.title || `Web Design in ${src.cityName}, CA | OCWebPros`,
      slug: `web-design/${src.citySlug}`,
    };
  }

  const landmarks = src.landmarks?.length ? src.landmarks : [`${src.cityName} California`];
  const landmarkLine = landmarks.slice(0, 2).join(' and ');

  return {
    id: `web-design-${src.citySlug}`,
    citySlug: src.citySlug,
    cityName: src.cityName,
    title: `Web Design in ${src.cityName}, CA | OCWebPros`,
    slug: `web-design/${src.citySlug}`,
    landmarks,
    allowedPlaces: src.allowedPlaces || landmarks.map((l) => l.toLowerCase()),
    pexelsQuery: src.pexelsQuery || `${src.cityName} California`,
    pexelsQueries: src.pexelsQueries || [
      `${landmarks[0]} California`,
      `${src.cityName} downtown California`,
      `Orange County ${src.cityName}`,
    ],
    requireCityMatch: Boolean(src.requireCityMatch),
    clipCount: src.clipCount || 3,
    script: `Web design in ${src.cityName}, California. Around ${landmarkLine}, local businesses need a fast, mobile-first website that converts visitors into customers - not a bloated template. OC Web Pros builds custom ${src.cityName} websites with city and service pages, local schema, and Core Web Vitals performance. Based in Lake Forest and focused on Orange County. Request a free ${src.cityName} web design consult with OC Web Pros.`,
    voiceId: src.voiceId || '21m00Tcm4TlvDq8ikWAM',
  };
}

const merged = seo.map(buildEntry);
writeFileSync(outPath, JSON.stringify(merged, null, 2) + '\n', 'utf8');
console.log(`Wrote ${merged.length} web-design video entries → ${outPath}`);
console.log(merged.map((m) => m.citySlug).join(', '));
