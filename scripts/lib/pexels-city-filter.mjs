/**
 * Score / filter Pexels videos so B-roll matches the target city
 * (and rejects clips whose metadata names a different city).
 */

/** Known place names we treat as competing geo labels in OC + nearby. */
export const KNOWN_PLACE_PHRASES = [
  'huntington beach',
  'newport beach',
  'costa mesa',
  'mission viejo',
  'lake forest',
  'rancho santa margarita',
  'rancho palos verdes',
  'palos verdes',
  'soledad canyon',
  'cleveland national forest',
  'santa clarita',
  'san juan capistrano',
  'san clemente',
  'laguna niguel',
  'laguna hills',
  'laguna beach',
  'dana point',
  'aliso viejo',
  'yorba linda',
  'fountain valley',
  'garden grove',
  'santa ana',
  'buena park',
  'seal beach',
  'long beach',
  'los angeles',
  'hollywood',
  'hollywood hills',
  'hollywood sign',
  'beverly hills',
  'sacramento',
  'san jose',
  'oakland',
  'fresno',
  'lake arrowhead',
  'big bear',
  'big bear lake',
  'san gabriel',
  'angeles national forest',
  'palm springs',
  'joshua tree',
  'catalina',
  'catalina island',
  'riverside',
  'san bernardino',
  'ontario california',
  'temecula',
  'oceanside',
  'carlsbad',
  'encinitas',
  'del mar',
  'la jolla',
  'pacific beach',
  'mission beach',
  'coronado',
  'hollywood',
  'hollywood hills',
  'hollywood sign',
  'beverly hills',
  'santa barbara',
  'ventura',
  'oxnard',
  'thousand oaks',
  'calabasas',
  'malibu beach',
  'manhattan beach pier',
  'santa monica pier',
  'venice',
  'pasadena',
  'burbank',
  'glendale',
  'downtown la',
  'san diego',
  'san francisco',
  'las vegas',
  'miami',
  'new york',
  'chicago',
  'seattle',
  'portland',
  'phoenix',
  'santa monica',
  'manhattan beach',
  'redondo beach',
  'malibu',
  'balboa island',
  'balboa peninsula',
  'south coast plaza',
  'disneyland',
  'anaheim',
  'fullerton',
  'irvine',
  'tustin',
  'orange county',
  'brea',
  'placentia',
  'cypress',
  'westminster',
  'stanton',
  'la habra',
];

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[_+/|]+/g, ' ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugifyPhrase(phrase) {
  return normalize(phrase).replace(/\s+/g, '-');
}

export function cityDisplayName(manifest) {
  if (manifest.cityName) return manifest.cityName;
  if (!manifest.citySlug) return '';
  return manifest.citySlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

const GENERIC_TOKENS = new Set([
  'beach', 'street', 'avenue', 'boulevard', 'parkway', 'district', 'downtown',
  'park', 'lake', 'harbor', 'harbour', 'pier', 'ocean', 'coast', 'city',
  'california', 'county', 'mission', 'plaza', 'camp', 'main', 'great',
  'sports', 'center', 'centre', 'road', 'view', 'aerial', 'drone',
]);

function buildPositiveTerms(manifest) {
  const city = cityDisplayName(manifest);
  const terms = new Set();
  if (city) {
    terms.add(normalize(city));
    terms.add(slugifyPhrase(city));
    for (const token of normalize(city).split(' ')) {
      if (token.length >= 5 && !GENERIC_TOKENS.has(token)) terms.add(token);
    }
  }
  for (const landmark of manifest.landmarks || []) {
    const n = normalize(landmark);
    if (n.length >= 4) terms.add(n);
    for (const token of n.split(' ')) {
      if (token.length >= 5 && !GENERIC_TOKENS.has(token)) terms.add(token);
    }
  }
  return [...terms];
}

function allowedPlaceSet(manifest) {
  const allowed = new Set();
  const city = normalize(cityDisplayName(manifest));
  if (city) allowed.add(city);
  for (const landmark of manifest.landmarks || []) {
    const n = normalize(landmark);
    if (n) allowed.add(n);
  }
  for (const extra of manifest.allowedPlaces || []) {
    const n = normalize(extra);
    if (n) allowed.add(n);
  }
  // Soft regional OK
  allowed.add('orange county');
  allowed.add('southern california');
  allowed.add('california');
  return allowed;
}

function isAllowedPlace(place, allowed) {
  if (allowed.has(place)) return true;
  for (const a of allowed) {
    if (a.includes(place) || place.includes(a)) return true;
  }
  return false;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function haystackMentions(haystack, phrase) {
  const n = normalize(phrase);
  if (!n) return false;
  const slug = slugifyPhrase(phrase);
  // Word-boundary style so "brea" does not match "breathtaking"
  const word = new RegExp(`(?:^|[^a-z0-9])${escapeRegex(n)}(?:[^a-z0-9]|$)`);
  if (word.test(haystack)) return true;
  if (!slug || slug === n.replace(/\s+/g, '-')) {
    const slugWord = new RegExp(`(?:^|[^a-z0-9])${escapeRegex(slug)}(?:[^a-z0-9]|$)`);
    return slugWord.test(haystack);
  }
  const slugWord = new RegExp(`(?:^|[^a-z0-9])${escapeRegex(slug)}(?:[^a-z0-9]|$)`);
  return slugWord.test(haystack);
}

/**
 * Fetch human-readable title/description from the Pexels video page.
 * API often returns empty tags and numeric-only URLs.
 */
export async function fetchPexelsVideoDetails(videoId) {
  const url = `https://www.pexels.com/video/${videoId}/`;
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'OCWebProsVideoPipeline/1.0',
        Accept: 'text/html',
      },
    });
    if (!response.ok) return { title: '', description: '', pageUrl: url };
    const html = await response.text();
    const title =
      html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
      html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] ||
      '';
    const description =
      html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
      html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] ||
      '';
    return {
      title: title.replace(/\s+/g, ' ').trim(),
      description: description.replace(/\s+/g, ' ').trim(),
      pageUrl: url,
    };
  } catch {
    return { title: '', description: '', pageUrl: url };
  }
}

export function buildVideoHaystack(video, details = {}) {
  const parts = [
    video.url,
    ...(video.tags || []),
    video.user?.name,
    details.title,
    details.description,
    details.pageUrl,
  ];
  return normalize(parts.filter(Boolean).join(' '));
}

/**
 * @returns {{ ok: boolean, score: number, reason: string, tier: 'city'|'neutral'|'reject' }}
 */
export function scoreVideoForCity(manifest, haystack) {
  const city = normalize(cityDisplayName(manifest));
  const positives = buildPositiveTerms(manifest);
  const allowed = allowedPlaceSet(manifest);

  const hardWrong = KNOWN_PLACE_PHRASES.filter(
    (place) => !isAllowedPlace(place, allowed) && haystackMentions(haystack, place),
  );
  if (hardWrong.length) {
    return {
      ok: false,
      score: -100,
      tier: 'reject',
      reason: `mentions other place(s): ${hardWrong.slice(0, 3).join(', ')}`,
    };
  }

  let score = 0;
  const hits = [];
  for (const term of positives) {
    if (haystackMentions(haystack, term)) {
      score += term === city ? 20 : 8;
      hits.push(term);
    }
  }

  if (city && haystackMentions(haystack, city)) {
    return {
      ok: true,
      score: score + 5,
      tier: 'city',
      reason: `city/landmark match: ${[...new Set(hits)].slice(0, 4).join(', ') || city}`,
    };
  }

  // Landmark-only strong match (e.g. "south coast plaza" for Costa Mesa)
  const landmarkHit = (manifest.landmarks || []).some((lm) => haystackMentions(haystack, lm));
  if (landmarkHit) {
    return {
      ok: true,
      score: score + 10,
      tier: 'city',
      reason: `landmark match (${hits.slice(0, 3).join(', ') || 'landmark'})`,
    };
  }

  // Neutral: no competing city named — usable as filler only if we lack city hits
  return {
    ok: true,
    score: 1,
    tier: 'neutral',
    reason: 'no city label (generic filler)',
  };
}

/**
 * Search + detail-check Pexels videos for a city manifest.
 * Prefers city/landmark-verified clips; fills with neutrals only if needed;
 * never returns clips that name a competing city.
 */
async function fetchPexelsWithRetry(url, apiKey, { retries = 5 } = {}) {
  let lastError = null;
  for (let attempt = 0; attempt < retries; attempt++) {
    const response = await fetch(url, { headers: { Authorization: apiKey } });
    if (response.status === 429) {
      const waitMs = Math.min(120_000, 8_000 * 2 ** attempt);
      console.log(`  ⏳ Pexels throttle — waiting ${Math.round(waitMs / 1000)}s (attempt ${attempt + 1}/${retries})`);
      await new Promise((r) => setTimeout(r, waitMs));
      lastError = new Error(`Pexels error (429): throttle`);
      continue;
    }
    if (!response.ok) {
      throw new Error(`Pexels error (${response.status}): ${await response.text()}`);
    }
    return response.json();
  }
  throw lastError || new Error('Pexels throttle retries exhausted');
}

export async function selectCityVerifiedPexelsVideos(manifest, apiKey, {
  needed = 3,
  perPage = 12,
  maxPages = 1,
  detailConcurrency = 3,
} = {}) {
  const queries = [
    manifest.pexelsQuery,
    ...(manifest.pexelsQueries || []).slice(0, 2),
    `${cityDisplayName(manifest)} California`,
  ].filter(Boolean);

  const uniqueQueries = [...new Set(queries.map((q) => q.trim()).filter(Boolean))];
  const byId = new Map();

  for (const query of uniqueQueries) {
    for (let page = 1; page <= maxPages; page++) {
      const params = new URLSearchParams({
        query,
        per_page: String(perPage),
        page: String(page),
        orientation: 'landscape',
        size: 'medium',
      });
      const data = await fetchPexelsWithRetry(
        `https://api.pexels.com/videos/search?${params}`,
        apiKey,
      );
      for (const video of data.videos || []) {
        if (!byId.has(video.id)) byId.set(video.id, video);
      }
      if (!data.next_page) break;
      await new Promise((r) => setTimeout(r, 1200));
    }
    await new Promise((r) => setTimeout(r, 800));
  }

  const candidates = [...byId.values()];
  if (!candidates.length) {
    throw new Error(`No Pexels videos found for queries: ${uniqueQueries.join(' | ')}`);
  }

  // Fetch page details in small batches
  const enriched = [];
  for (let i = 0; i < candidates.length; i += detailConcurrency) {
    const chunk = candidates.slice(i, i + detailConcurrency);
    const detailsList = await Promise.all(chunk.map((v) => fetchPexelsVideoDetails(v.id)));
    chunk.forEach((video, idx) => {
      const details = detailsList[idx];
      const haystack = buildVideoHaystack(video, details);
      const scored = scoreVideoForCity(manifest, haystack);
      enriched.push({ video, details, haystack, ...scored });
    });
  }

  const cityTier = enriched.filter((e) => e.ok && e.tier === 'city').sort((a, b) => b.score - a.score);
  const neutrals = enriched.filter((e) => e.ok && e.tier === 'neutral').sort((a, b) => b.score - a.score);
  const rejected = enriched.filter((e) => e.tier === 'reject');

  console.log(
    `  Pexels filter: ${candidates.length} candidates → ${cityTier.length} city-matched, ${neutrals.length} neutral, ${rejected.length} rejected`,
  );
  for (const e of rejected.slice(0, 5)) {
    console.log(`    ✗ #${e.video.id}: ${e.reason} | "${(e.details.title || '').slice(0, 60)}"`);
  }

  const picked = [];
  for (const e of cityTier) {
    if (picked.length >= needed) break;
    picked.push(e);
  }

  // Fill remaining slots with neutrals (no competing city in metadata).
  // If Pexels has zero city-tagged clips, neutrals are the safest fallback.
  if (picked.length < needed) {
    if (cityTier.length === 0) {
      console.log(
        `  ⚠ No Pexels clips explicitly named ${cityDisplayName(manifest)} — using geo-clean neutrals only`,
      );
    }
    for (const e of neutrals) {
      if (picked.length >= needed) break;
      picked.push(e);
    }
  }

  if (!picked.length) {
    throw new Error(
      `No usable Pexels clips for ${cityDisplayName(manifest)} after rejecting wrong-city footage.`,
    );
  }

  if (picked.length < needed) {
    console.log(
      `  ⚠ Only ${picked.length}/${needed} clips passed city checks — continuing with what we have`,
    );
  }

  for (const e of picked) {
    console.log(
      `    ✓ #${e.video.id} [${e.tier} +${e.score}] ${e.reason} | "${(e.details.title || e.video.url).slice(0, 70)}"`,
    );
  }

  return picked.map((e) => e.video);
}
