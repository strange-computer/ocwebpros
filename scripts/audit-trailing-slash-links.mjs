import fs from 'node:fs';
import path from 'node:path';

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (/\.(astro|ts|md|js)$/.test(ent.name)) out.push(p);
  }
  return out;
}

const ASSET = /\.(xml|css|js|mjs|json|png|jpe?g|gif|svg|ico|webp|avif|mp4|webm|pdf|txt|woff2?|map)$/i;
const hits = [];

for (const file of walk('src')) {
  const text = fs.readFileSync(file, 'utf8');
  const re = /href=\{?["'`](\/[^"'`#?]*)["'`]\}?/g;
  let m;
  while ((m = re.exec(text))) {
    const u = m[1];
    if (u === '/' || u.endsWith('/') || ASSET.test(u) || u.includes('${')) continue;
    hits.push(`${path.relative('.', file)} => ${u}`);
  }
}

console.log(hits.length ? hits.join('\n') : 'No remaining static href paths missing trailing slash');
