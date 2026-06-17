import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');
const pagesDir = path.join(root, 'src/pages');
const publicDir = path.join(root, 'public');

function walk(dir, exts = null) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p, exts));
    else if (!exts || exts.some((x) => e.name.endsWith(x))) out.push(p);
  }
  return out;
}

function fileToRoute(file) {
  let rel = path.relative(pagesDir, file).replace(/\\/g, '/');
  if (rel.endsWith('.astro')) rel = rel.slice(0, -6);
  else if (rel.endsWith('.md')) rel = rel.slice(0, -3);
  else if (rel.endsWith('.ts')) return null;
  if (rel === 'index') return '/';
  if (rel.endsWith('/index')) rel = rel.slice(0, -6);
  return '/' + rel;
}

const pageFiles = walk(pagesDir, ['.astro', '.md']);
const routes = new Set();
const routeAnchors = new Map();

for (const f of pageFiles) {
  const route = fileToRoute(f);
  if (!route) continue;
  routes.add(route);
  const content = fs.readFileSync(f, 'utf8');
  const ids = new Set();
  for (const m of content.matchAll(/\bid=["']([^"']+)["']/g)) ids.add(m[1]);
  routeAnchors.set(route, ids);
}

const publicFiles = new Set(
  walk(publicDir).map((f) => '/' + path.relative(publicDir, f).replace(/\\/g, '/'))
);

const srcFiles = walk(path.join(root, 'src'), ['.astro', '.md', '.ts', '.js']);
const linkRe = /(?:href=["'](\/[^"'#?]+(?:#[^"'?]+)?)["']|\]\((\/[^)]+)\))/g;

const broken = [];
const seen = new Set();

for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = linkRe.exec(content)) !== null) {
    const href = m[1] || m[2];
    if (!href || href.startsWith('//')) continue;
    const key = `${href} @ ${file}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const [pathPart, hash] = href.split('#');
    const normalized =
      pathPart.endsWith('/') && pathPart.length > 1 ? pathPart.slice(0, -1) : pathPart;

    let ok = false;
    let reason = '';

    if (normalized === '/' || routes.has(normalized)) {
      ok = true;
      if (hash) {
        const anchors = routeAnchors.get(normalized) || new Set();
        if (!anchors.has(hash)) {
          ok = false;
          reason = `missing anchor #${hash} on ${normalized}`;
        }
      }
    } else if ([...publicFiles].some((p) => p === normalized || p.startsWith(normalized + '/'))) {
      ok = true;
    } else if (/\.(css|js|png|jpg|jpeg|gif|webp|svg|ico|woff2?|pdf|mp4)$/i.test(normalized)) {
      ok =
        publicFiles.has(normalized) ||
        fs.existsSync(path.join(root, 'src', normalized.replace(/^\//, '')));
      if (!ok) reason = 'missing static asset';
    } else {
      reason = 'no matching page route';
    }

    if (!ok) {
      const line = content.slice(0, m.index).split('\n').length;
      broken.push({
        href,
        file: path.relative(root, file),
        line,
        reason: reason || 'unknown',
      });
    }
  }
}

console.log(`Routes: ${routes.size}`);
console.log(`Broken internal links: ${broken.length}\n`);
for (const b of broken.sort((a, c) => a.href.localeCompare(c.href))) {
  console.log(`${b.href}`);
  console.log(`  ${b.file}:${b.line} (${b.reason})`);
}

// Check image references
const imageRe = /(?:src=["'](\/images\/[^"']+)["']|image:\s*["'](\/images\/[^"']+)["'])/g;
const imageRefs = new Map();
for (const file of srcFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = imageRe.exec(content)) !== null) {
    const img = m[1] || m[2];
    if (!imageRefs.has(img)) imageRefs.set(img, []);
    imageRefs.get(img).push(path.relative(root, file));
  }
}
const missingImages = [...imageRefs.keys()].filter((i) => !publicFiles.has(i)).sort();
console.log(`\nMissing image assets: ${missingImages.length}`);
for (const img of missingImages) {
  console.log(`${img}`);
  console.log(`  used in: ${imageRefs.get(img).slice(0, 2).join(', ')}${imageRefs.get(img).length > 2 ? ' ...' : ''}`);
}
