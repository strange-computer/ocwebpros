import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const imagesDir = join(root, 'public', 'images', 'unsplash');

function loadAccessKey() {
  const fromEnv = process.env.UNSPLASH_ACCESS_KEY?.trim();
  if (fromEnv) return fromEnv;

  const envFile = readFileSync(join(root, '.env'), 'utf8');
  const match = envFile.match(/^UNSPLASH_ACCESS_KEY=(.+)$/m);
  if (!match) throw new Error('UNSPLASH_ACCESS_KEY not found in .env');
  return match[1].trim();
}

const images = [
  {
    id: 'industries-local-business',
    query: 'local small business storefront',
    orientation: 'landscape',
    filename: 'industries-local-business.jpg',
  },
  {
    id: 'support-development',
    query: 'web developer coding laptop',
    orientation: 'landscape',
    filename: 'support-development.jpg',
  },
  {
    id: 'support-team',
    query: 'business team collaboration office',
    orientation: 'landscape',
    filename: 'support-team.jpg',
  },
  {
    id: 'hosting-infrastructure',
    query: 'server room data center lights',
    orientation: 'landscape',
    filename: 'hosting-infrastructure.jpg',
  },
  {
    id: 'hosting-security',
    query: 'cybersecurity digital lock network',
    orientation: 'landscape',
    filename: 'hosting-security.jpg',
  },
  {
    id: 'services-web-design',
    query: 'web designer workspace laptop screen',
    orientation: 'landscape',
    filename: 'services-web-design.jpg',
  },
  {
    id: 'services-local-seo',
    query: 'google maps local business search',
    orientation: 'landscape',
    filename: 'services-local-seo.jpg',
  },
  {
    id: 'services-seo-strategy',
    query: 'marketing analytics dashboard laptop data',
    orientation: 'landscape',
    filename: 'services-seo-strategy.jpg',
  },
  {
    id: 'blog-anaheim-web-design',
    query: 'Anaheim California downtown',
    orientation: 'landscape',
    filename: 'blog-anaheim-web-design.jpg',
  },
  {
    id: 'blog-huntington-beach',
    query: 'Huntington Beach pier California sunset',
    orientation: 'landscape',
    filename: 'blog-huntington-beach.jpg',
  },
  {
    id: 'blog-little-saigon',
    query: 'Vietnamese restaurant pho food',
    orientation: 'landscape',
    filename: 'blog-little-saigon.jpg',
  },
  {
    id: 'blog-santa-ana',
    query: 'mexican restaurant tacos authentic',
    orientation: 'landscape',
    filename: 'blog-santa-ana.jpg',
  },
  {
    id: 'blog-brea',
    query: 'shopping mall retail storefront modern',
    orientation: 'landscape',
    filename: 'blog-brea.jpg',
  },
  {
    id: 'blog-yorba-linda',
    query: 'luxury suburban home california landscaping',
    orientation: 'landscape',
    filename: 'blog-yorba-linda.jpg',
  },
  {
    id: 'blog-fountain-valley',
    query: 'modern dental office clinic',
    orientation: 'landscape',
    filename: 'blog-fountain-valley.jpg',
  },
  {
    id: 'blog-north-oc',
    query: 'orange county california suburb aerial',
    orientation: 'landscape',
    filename: 'blog-north-oc.jpg',
  },
];

async function searchPhoto(accessKey, query, orientation) {
  const params = new URLSearchParams({
    query,
    orientation,
    per_page: '1',
    content_filter: 'high',
  });

  const response = await fetch(`https://api.unsplash.com/search/photos?${params}`, {
    headers: { Authorization: `Client-ID ${accessKey}` },
  });

  if (!response.ok) {
    throw new Error(`Unsplash search failed (${response.status}): ${await response.text()}`);
  }

  const data = await response.json();
  const photo = data.results?.[0];
  if (!photo) throw new Error(`No Unsplash results for query: ${query}`);
  return photo;
}

async function trackDownload(accessKey, photo) {
  await fetch(`${photo.links.download_location}?force=true`, {
    headers: { Authorization: `Client-ID ${accessKey}` },
  });
}

async function downloadImage(url, destination) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed (${response.status}) for ${url}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(destination, buffer);
}

async function main() {
  const accessKey = loadAccessKey();
  mkdirSync(imagesDir, { recursive: true });

  for (const image of images) {
    const destinationPath = join(imagesDir, image.filename);
    if (existsSync(destinationPath)) {
      console.log(`Skipping (exists): ${image.filename}`);
      continue;
    }
    console.log(`Fetching: ${image.id} (${image.query})`);
    const photo = await searchPhoto(accessKey, image.query, image.orientation);
    await trackDownload(accessKey, photo);

    const destination = join(imagesDir, image.filename);
    await downloadImage(`${photo.urls.raw}&w=1600&h=1000&fit=crop&q=80&auto=format`, destination);

    console.log(`Saved: ${destination} (${photo.user.name})`);
  }

  console.log('Done.');
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
