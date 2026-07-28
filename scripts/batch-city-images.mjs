/**
 * Batch unique Unsplash + Pexels stills for each city in video-manifest.json
 *
 * Usage:
 *   node scripts/batch-city-images.mjs
 *   node scripts/batch-city-images.mjs --only huntington-beach,irvine
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getRoot, loadEnv } from './lib/env.mjs';
import { collectCityImages, writeCityImagesTs } from './lib/city-images.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = getRoot();

function parseArgs(argv) {
  const out = { only: null, missingOnly: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--only') out.only = argv[++i];
    else if (argv[i] === '--missing-only') out.missingOnly = true;
  }
  return out;
}

function loadExistingCityImages() {
  const path = join(root, 'src', 'data', 'cityImages.ts');
  if (!existsSync(path)) return {};
  try {
    // Lightweight parse of prior batch JSON sidecar if present
    const sidecar = join(root, 'tmp', 'city-image-batch-results.json');
    if (existsSync(sidecar)) {
      const json = JSON.parse(readFileSync(sidecar, 'utf8'));
      return json.byCity || {};
    }
  } catch {
    /* ignore */
  }
  return {};
}

const cli = parseArgs(process.argv.slice(2));
loadEnv();

let manifest = JSON.parse(readFileSync(join(__dirname, 'video-manifest.json'), 'utf8'));
if (cli.only) {
  const wanted = new Set(cli.only.split(',').map((s) => s.trim()).filter(Boolean));
  manifest = manifest.filter(
    (item) => wanted.has(item.citySlug) || wanted.has(item.id) || wanted.has(item.id.replace(/^local-seo-/, '')),
  );
}

if (cli.missingOnly) {
  const existing = loadExistingCityImages();
  const imgRoot = join(root, 'public', 'images', 'cities');
  manifest = manifest.filter((item) => {
    if (existing[item.citySlug]?.length) return false;
    const dir = join(imgRoot, item.citySlug);
    return !existsSync(dir);
  });
}

async function main() {
  console.log(`\n🖼️  City image batch: ${manifest.length} cities (Unsplash + Pexels)\n`);
  const byCity = loadExistingCityImages();
  const errors = [];

  for (const [index, item] of manifest.entries()) {
    console.log(`[${index + 1}/${manifest.length}] ${item.citySlug}`);
    try {
      const outDir = join(root, 'public', 'images', 'cities', item.citySlug);
      mkdirSync(outDir, { recursive: true });
      const images = await collectCityImages(item, { needed: 4, outDir });
      byCity[item.citySlug] = images;
    } catch (error) {
      console.error(`  ❌ ${error.message}`);
      errors.push({ city: item.citySlug, error: error.message });
    }
  }

  const outPath = writeCityImagesTs(byCity);
  writeFileSync(
    join(root, 'tmp', 'city-image-batch-results.json'),
    JSON.stringify({ byCity, errors, at: new Date().toISOString() }, null, 2),
    'utf8',
  );

  console.log(`\n📝 Wrote ${outPath}`);
  console.log(`Done. ${Object.keys(byCity).length}/${manifest.length} cities with images.\n`);
  if (errors.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error('\n❌ Image batch failed:', error.message);
  process.exit(1);
});
