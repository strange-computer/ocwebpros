/**
 * Build / merge scripts/video-manifest.json for every city in cityRegistry.
 * Usage: node scripts/generate-city-media-manifest.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function parseRegistry() {
  const text = readFileSync(join(root, 'src', 'data', 'cityRegistry.ts'), 'utf8');
  const cities = [];
  const blocks = text.split(/\{\s*\n\s*slug:/).slice(1);
  for (const block of blocks) {
    const slug = block.match(/^\s*'([^']+)'/)?.[1];
    const name = block.match(/name:\s*'([^']+)'/)?.[1];
    if (!slug || !name) continue;
    const neighborhoods = [...block.matchAll(/'([^']+)'/g)]
      .map((m) => m[1])
      .filter((s) => s !== slug && s !== name && !s.includes('2026') && s.length > 3);
    // neighborhoods array is cleaner via dedicated match
    const hoodBlock = block.match(/neighborhoods:\s*\[([\s\S]*?)\]/);
    const landmarks = hoodBlock
      ? [...hoodBlock[1].matchAll(/'([^']+)'/g)].map((m) => m[1]).slice(0, 3)
      : [`${name} downtown`, `${name} California`];
    cities.push({ slug, name, landmarks });
  }
  return cities;
}

function buildEntry(city, existing) {
  const prior = existing.find((e) => e.citySlug === city.slug);
  if (prior) return prior;

  const landmarks = city.landmarks.length ? city.landmarks : [`${city.name} California`];
  const landmarkLine = landmarks.slice(0, 2).join(' and ');
  return {
    id: `local-seo-${city.slug}`,
    citySlug: city.slug,
    cityName: city.name,
    title: `Local SEO in ${city.name}, CA | OCWebPros`,
    slug: `local-seo/${city.slug}`,
    landmarks,
    allowedPlaces: landmarks.map((l) => l.toLowerCase()),
    pexelsQuery: `${city.name} California`,
    pexelsQueries: [
      `${landmarks[0]} California`,
      `${city.name} downtown California`,
      `Orange County ${city.name}`,
    ],
    requireCityMatch: false,
    clipCount: 3,
    script: `Local SEO in ${city.name}, California. Around ${landmarkLine}, local businesses win when Google Maps and their website tell the same story. OC Web Pros builds dedicated ${city.name} city pages, Google Business Profiles, citations, and review systems that get the phone ringing. Based in Lake Forest and focused on Orange County. Request a free ${city.name} SEO audit with OC Web Pros.`,
    voiceId: '21m00Tcm4TlvDq8ikWAM',
  };
}

const existingPath = join(__dirname, 'video-manifest.json');
const existing = JSON.parse(readFileSync(existingPath, 'utf8'));
const cities = parseRegistry();
const merged = cities.map((city) => buildEntry(city, existing));

writeFileSync(existingPath, JSON.stringify(merged, null, 2) + '\n', 'utf8');
console.log(`Wrote ${merged.length} city media entries → ${existingPath}`);
console.log(merged.map((m) => m.citySlug).join(', '));
