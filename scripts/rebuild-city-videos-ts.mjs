import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const regText = readFileSync(join(root, 'src/data/cityRegistry.ts'), 'utf8');
const slugs = [...regText.matchAll(/slug: '([^']+)'/g)].map((m) => m[1]);
const nameBy = Object.fromEntries(
  [...regText.matchAll(/slug: '([^']+)',[\s\S]*?name: '([^']+)'/g)].map((m) => [m[1], m[2]]),
);

const yt = {
  'lake-forest': 'RoRJ1qVDjIA',
  irvine: 'KJZd3hleF5M',
  'mission-viejo': 'RXnXsSlhy0w',
  'newport-beach': 'OHda87PJiR8',
  'huntington-beach': '2X8HRarFpIs',
};

const prev = readFileSync(join(root, 'src/data/cityVideos.ts'), 'utf8');
const blockRe = /['"]?([a-z0-9-]+)['"]?:\s*\{([\s\S]*?)\n  \},?/g;
let m;
while ((m = blockRe.exec(prev))) {
  const slug = m[1];
  const id = m[2].match(/youtubeId:\s*'([^']+)'/)?.[1];
  if (id) yt[slug] = id;
}

const lines = [
  '/** Auto-generated — local SEO city page videos */',
  'export interface CityVideoMeta {',
  '  youtubeId?: string;',
  '  title: string;',
  '  url?: string;',
  '  localSrc?: string;',
  '}',
  '',
  'export const cityLocalSeoVideos: Record<string, CityVideoMeta> = {',
];

for (const slug of [...slugs].sort()) {
  const file = `local-seo-${slug}.mp4`;
  if (!existsSync(join(root, 'public/videos/pages', file))) continue;
  const title = `Local SEO in ${nameBy[slug] || slug}, CA | OCWebPros`;
  lines.push(`  '${slug}': {`);
  if (yt[slug]) {
    lines.push(`    youtubeId: '${yt[slug]}',`);
    lines.push(`    title: ${JSON.stringify(title)},`);
    lines.push(`    url: 'https://www.youtube.com/watch?v=${yt[slug]}',`);
  } else {
    lines.push(`    title: ${JSON.stringify(title)},`);
  }
  lines.push(`    localSrc: '/videos/pages/${file}',`);
  lines.push('  },');
}

lines.push('};');
lines.push('');
writeFileSync(join(root, 'src/data/cityVideos.ts'), lines.join('\n'), 'utf8');

const keys = [...readFileSync(join(root, 'src/data/cityVideos.ts'), 'utf8').matchAll(/'([a-z0-9-]+)':/g)].map(
  (x) => x[1],
);
console.log('wrote', keys.length, 'cities');
console.log(keys.join(','));
console.log(
  'mp4 count',
  readdirSync(join(root, 'public/videos/pages')).filter((f) => f.startsWith('local-seo-') && f.endsWith('.mp4'))
    .length,
);
