/**
 * Fetch city-verified stills from Unsplash + Pexels Photos.
 * Reuses the same geo scoring rules as the video pipeline.
 */
import {
  createWriteStream,
  mkdirSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { getRoot, loadEnv, requireEnv } from './env.mjs';
import {
  cityDisplayName,
  scoreVideoForCity,
} from './pexels-city-filter.mjs';

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[_+/|]+/g, ' ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildPhotoHaystack(parts) {
  return normalize(parts.filter(Boolean).join(' '));
}

async function downloadFile(url, destination) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed (${response.status}): ${url}`);
  await pipeline(response.body, createWriteStream(destination));
}

async function searchUnsplash(query, accessKey, page = 1) {
  const params = new URLSearchParams({
    query,
    page: String(page),
    per_page: '20',
    orientation: 'landscape',
    content_filter: 'high',
  });
  const response = await fetch(`https://api.unsplash.com/search/photos?${params}`, {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
      'Accept-Version': 'v1',
    },
  });
  if (response.status === 403 || response.status === 429) {
    console.log('  ⚠ Unsplash rate-limited — continuing with Pexels only for this query');
    return [];
  }
  if (!response.ok) {
    throw new Error(`Unsplash error (${response.status}): ${await response.text()}`);
  }
  const data = await response.json();
  return data.results || [];
}

async function searchPexelsPhotos(query, apiKey, page = 1) {
  const params = new URLSearchParams({
    query,
    page: String(page),
    per_page: '20',
    orientation: 'landscape',
  });
  const response = await fetch(`https://api.pexels.com/v1/search?${params}`, {
    headers: { Authorization: apiKey },
  });
  if (!response.ok) {
    throw new Error(`Pexels photos error (${response.status}): ${await response.text()}`);
  }
  const data = await response.json();
  return data.photos || [];
}

function scoreUnsplashPhoto(manifest, photo) {
  const locationBits = [
    photo.location?.name,
    photo.location?.city,
    photo.location?.country,
    photo.location?.position ? `${photo.location.position.latitude},${photo.location.position.longitude}` : '',
  ];
  const tags = (photo.tags || []).map((t) => t.title || t).filter(Boolean);
  const haystack = buildPhotoHaystack([
    photo.description,
    photo.alt_description,
    photo.slug,
    ...locationBits,
    ...tags,
    photo.user?.name,
    photo.urls?.regular,
  ]);
  const scored = scoreVideoForCity(manifest, haystack);
  return { ...scored, haystack, source: 'unsplash', photo };
}

function scorePexelsPhoto(manifest, photo) {
  const haystack = buildPhotoHaystack([
    photo.alt,
    photo.url,
    photo.photographer,
    photo.avg_color,
  ]);
  const scored = scoreVideoForCity(manifest, haystack);
  return { ...scored, haystack, source: 'pexels', photo };
}

function seoAlt(manifest, index, hint = '') {
  const city = cityDisplayName(manifest);
  const landmark = (manifest.landmarks || [])[index % Math.max((manifest.landmarks || []).length, 1)] || city;
  // Keep alts commercial/local — do not append unrelated stock captions
  const cityNorm = normalize(city);
  const hintNorm = normalize(hint);
  const hintHelps =
    hintNorm &&
    (hintNorm.includes(cityNorm) ||
      (manifest.landmarks || []).some((lm) => hintNorm.includes(normalize(lm))));
  const base = `Local SEO in ${city}, CA near ${landmark} | OCWebPros`;
  if (hintHelps) return `${base}. ${hint}`.slice(0, 125);
  return base.slice(0, 125);
}

function seoTitle(manifest, index) {
  const city = cityDisplayName(manifest);
  return `${city} local SEO visual ${index + 1} | OCWebPros`;
}

function seoFilename(manifest, index, ext = 'jpg') {
  return `local-seo-${manifest.citySlug}-${String(index + 1).padStart(2, '0')}.${ext}`;
}

/**
 * Select + download city images. Returns metadata records for cityImages.ts
 */
export async function collectCityImages(manifest, {
  needed = 4,
  outDir,
} = {}) {
  loadEnv();
  const unsplashKey = requireEnv('UNSPLASH_ACCESS_KEY');
  const pexelsKey = requireEnv('PEXELS_API_KEY');
  const city = cityDisplayName(manifest);

  const queries = [
    manifest.pexelsQuery,
    ...(manifest.pexelsQueries || []),
    `${city} California`,
    ...((manifest.landmarks || []).slice(0, 2).map((lm) => `${lm} ${city}`)),
    `${city} downtown California`,
  ].filter(Boolean);
  const uniqueQueries = [...new Set(queries.map((q) => q.trim()))];

  const unsplashById = new Map();
  const pexelsById = new Map();

  for (const query of uniqueQueries) {
    const [u1, p1] = await Promise.all([
      searchUnsplash(query, unsplashKey, 1),
      searchPexelsPhotos(query, pexelsKey, 1),
    ]);
    for (const photo of u1) unsplashById.set(photo.id, photo);
    for (const photo of p1) pexelsById.set(photo.id, photo);
  }

  const scored = [
    ...[...unsplashById.values()].map((photo) => scoreUnsplashPhoto(manifest, photo)),
    ...[...pexelsById.values()].map((photo) => scorePexelsPhoto(manifest, photo)),
  ];

  const cityTier = scored.filter((s) => s.ok && s.tier === 'city').sort((a, b) => b.score - a.score);
  const neutrals = scored.filter((s) => s.ok && s.tier === 'neutral').sort((a, b) => b.score - a.score);
  const rejected = scored.filter((s) => s.tier === 'reject');

  console.log(
    `  Images: ${scored.length} candidates → ${cityTier.length} city-matched, ${neutrals.length} neutral, ${rejected.length} rejected`,
  );

  const picked = [];
  for (const item of cityTier) {
    if (picked.length >= needed) break;
    picked.push(item);
  }
  if (picked.length < needed) {
    if (cityTier.length === 0) {
      console.log(`  ⚠ No city-tagged stills for ${city} — using geo-clean neutrals`);
    }
    for (const item of neutrals) {
      if (picked.length >= needed) break;
      // Prefer alternating sources when possible
      picked.push(item);
    }
  }

  if (!picked.length) {
    throw new Error(`No usable stills for ${city}`);
  }

  mkdirSync(outDir, { recursive: true });
  const records = [];

  for (let i = 0; i < picked.length; i++) {
    const item = picked[i];
    const filename = seoFilename(manifest, i, 'jpg');
    const dest = join(outDir, filename);
    const role = i === 0 ? 'spotlight' : 'gallery';

    if (item.source === 'unsplash') {
      const photo = item.photo;
      // Unsplash guideline: trigger download endpoint
      if (photo.links?.download_location) {
        await fetch(`${photo.links.download_location}?force=true`, {
          headers: { Authorization: `Client-ID ${unsplashKey}` },
        });
      }
      const downloadUrl = `${photo.urls.raw}&w=1600&h=1000&fit=crop&q=80&auto=format&fm=jpg`;
      await downloadFile(downloadUrl, dest);
      records.push({
        role,
        src: `/images/cities/${manifest.citySlug}/${filename}`,
        alt: seoAlt(manifest, i, photo.alt_description || photo.description || ''),
        title: seoTitle(manifest, i),
        width: 1600,
        height: 1000,
        source: 'unsplash',
        photographer: photo.user?.name || 'Unsplash photographer',
        photographerUrl: photo.user?.links?.html
          ? `${photo.user.links.html}?utm_source=ocwebpros&utm_medium=referral`
          : 'https://unsplash.com/?utm_source=ocwebpros&utm_medium=referral',
        sourceUrl: photo.links?.html
          ? `${photo.links.html}?utm_source=ocwebpros&utm_medium=referral`
          : 'https://unsplash.com/?utm_source=ocwebpros&utm_medium=referral',
        tier: item.tier,
        score: item.score,
      });
      console.log(`    ✓ unsplash ${photo.id} [${item.tier}] → ${filename}`);
    } else {
      const photo = item.photo;
      const downloadUrl = photo.src?.large2x || photo.src?.large || photo.src?.original;
      if (!downloadUrl) throw new Error(`No Pexels src for photo ${photo.id}`);
      await downloadFile(downloadUrl, dest);
      records.push({
        role,
        src: `/images/cities/${manifest.citySlug}/${filename}`,
        alt: seoAlt(manifest, i, photo.alt || ''),
        title: seoTitle(manifest, i),
        width: photo.width || 1600,
        height: photo.height || 1000,
        source: 'pexels',
        photographer: photo.photographer || 'Pexels photographer',
        photographerUrl: photo.photographer_url || 'https://www.pexels.com',
        sourceUrl: photo.url || 'https://www.pexels.com',
        tier: item.tier,
        score: item.score,
      });
      console.log(`    ✓ pexels ${photo.id} [${item.tier}] → ${filename}`);
    }
  }

  return records;
}

export function writeCityImagesTs(byCity) {
  const root = getRoot();
  const outPath = join(root, 'src', 'data', 'cityImages.ts');
  const lines = [
    '/** Auto-generated by scripts/batch-city-images.mjs */',
    'export interface CityImageMeta {',
    '  role: \"spotlight\" | \"gallery\";',
    '  src: string;',
    '  alt: string;',
    '  title: string;',
    '  width: number;',
    '  height: number;',
    '  source: \"unsplash\" | \"pexels\";',
    '  photographer: string;',
    '  photographerUrl: string;',
    '  sourceUrl: string;',
    '}',
    '',
    'export interface CityImageSet {',
    '  spotlight?: CityImageMeta;',
    '  gallery: CityImageMeta[];',
    '}',
    '',
    'export const cityLocalSeoImages: Record<string, CityImageSet> = {',
  ];

  for (const [slug, images] of Object.entries(byCity)) {
    const spotlight = images.find((img) => img.role === 'spotlight') || images[0];
    const gallery = images.filter((img) => img !== spotlight);
    lines.push(`  '${slug}': {`);
    if (spotlight) {
      lines.push('    spotlight: {');
      lines.push(`      role: 'spotlight',`);
      lines.push(`      src: ${JSON.stringify(spotlight.src)},`);
      lines.push(`      alt: ${JSON.stringify(spotlight.alt)},`);
      lines.push(`      title: ${JSON.stringify(spotlight.title)},`);
      lines.push(`      width: ${spotlight.width},`);
      lines.push(`      height: ${spotlight.height},`);
      lines.push(`      source: '${spotlight.source}',`);
      lines.push(`      photographer: ${JSON.stringify(spotlight.photographer)},`);
      lines.push(`      photographerUrl: ${JSON.stringify(spotlight.photographerUrl)},`);
      lines.push(`      sourceUrl: ${JSON.stringify(spotlight.sourceUrl)},`);
      lines.push('    },');
    }
    lines.push('    gallery: [');
    for (const img of gallery) {
      lines.push('      {');
      lines.push(`        role: 'gallery',`);
      lines.push(`        src: ${JSON.stringify(img.src)},`);
      lines.push(`        alt: ${JSON.stringify(img.alt)},`);
      lines.push(`        title: ${JSON.stringify(img.title)},`);
      lines.push(`        width: ${img.width},`);
      lines.push(`        height: ${img.height},`);
      lines.push(`        source: '${img.source}',`);
      lines.push(`        photographer: ${JSON.stringify(img.photographer)},`);
      lines.push(`        photographerUrl: ${JSON.stringify(img.photographerUrl)},`);
      lines.push(`        sourceUrl: ${JSON.stringify(img.sourceUrl)},`);
      lines.push('      },');
    }
    lines.push('    ],');
    lines.push('  },');
  }

  lines.push('};');
  lines.push('');
  writeFileSync(outPath, lines.join('\n'), 'utf8');
  return outPath;
}
