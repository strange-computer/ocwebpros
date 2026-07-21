import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'src');
const EXTS = new Set(['.astro', '.ts', '.js', '.md', '.mjs']);
const ASSET_RE = /\.(xml|css|js|mjs|json|png|jpe?g|gif|svg|ico|webp|avif|mp4|webm|pdf|txt|woff2?|map)(\?.*)?$/i;

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (EXTS.has(path.extname(ent.name))) out.push(p);
  }
  return out;
}

function addSlashToPath(pathname) {
  if (!pathname || pathname === '/') return pathname;
  if (ASSET_RE.test(pathname)) return pathname;
  const last = pathname.split('/').pop() || '';
  if (last.includes('.') && !last.startsWith('.')) return pathname;
  if (pathname.endsWith('/')) return pathname;
  return `${pathname}/`;
}

function fixInternalUrl(url) {
  const abs = url.match(/^(https?:\/\/(?:www\.)?ocwebpros\.com)(\/[^\\"'\s]*)?$/i);
  if (abs) {
    const origin = abs[1].replace(/\/$/, '');
    let rest = abs[2] || '/';
    const hashIdx = rest.indexOf('#');
    const queryIdx = rest.indexOf('?');
    let pathPart = rest;
    let suffix = '';
    if (hashIdx >= 0) {
      suffix = rest.slice(hashIdx);
      pathPart = rest.slice(0, hashIdx);
    } else if (queryIdx >= 0) {
      suffix = rest.slice(queryIdx);
      pathPart = rest.slice(0, queryIdx);
    }
    pathPart = addSlashToPath(pathPart || '/');
    return origin + pathPart + suffix;
  }

  if (!url.startsWith('/') || url.startsWith('//')) return url;

  const hashIdx = url.indexOf('#');
  const queryIdx = url.indexOf('?');
  let cut = -1;
  if (hashIdx >= 0 && queryIdx >= 0) cut = Math.min(hashIdx, queryIdx);
  else if (hashIdx >= 0) cut = hashIdx;
  else if (queryIdx >= 0) cut = queryIdx;

  const pathPart = addSlashToPath(cut >= 0 ? url.slice(0, cut) : url);
  const suffix = cut >= 0 ? url.slice(cut) : '';
  return pathPart + suffix;
}

function processContent(content) {
  let changed = false;
  let next = content;

  next = next.replace(/(\bhref\s*=\s*)(["'])([^"']+)\2/g, (m, pre, q, url) => {
    if (/^(mailto:|tel:|https?:\/\/(?!(?:www\.)?ocwebpros\.com)|#|data:)/i.test(url)) return m;
    const fixed = fixInternalUrl(url);
    if (fixed !== url) {
      changed = true;
      return `${pre}${q}${fixed}${q}`;
    }
    return m;
  });

  // Template literals: href={`/blog/${slug}`} → href={`/blog/${slug}/`}
  next = next.replace(/(\bhref=\{`)(\/[^`]*)(`\})/g, (m, pre, body, post) => {
    const probe = body.replace(/\$\{[^}]+\}/g, 'x');
    if (ASSET_RE.test(probe)) return m;
    if (body.endsWith('/')) return m;
    if (/\$\{[^}]+\}$/.test(body)) {
      changed = true;
      return `${pre}${body}/${post}`;
    }
    const fixed = fixInternalUrl(body);
    if (fixed !== body) {
      changed = true;
      return `${pre}${fixed}${post}`;
    }
    return m;
  });

  // Other template path builders: `/local-seo/${city.slug}` → with slash
  next = next.replace(/(["'`])(\/(?:local-seo|web-design|blog|services)\/\$\{[^}]+\))\1/g, (m, q, body) => {
    if (body.endsWith('/')) return m;
    changed = true;
    return `${q}${body}/${q}`;
  });

  // Paths built as `/${cfg.path}/${other.slug}`
  next = next.replace(/(href=\{`)(\/\$\{[^}]+\}(?:\/\$\{[^}]+\})*)(`\})/g, (m, pre, body, post) => {
    if (body.endsWith('/')) return m;
    changed = true;
    return `${pre}${body}/${post}`;
  });

  // Markdown links
  next = next.replace(/\]\((\/[^)\s]+|https?:\/\/(?:www\.)?ocwebpros\.com\/[^)\s]*)\)/gi, (m, url) => {
    const fixed = fixInternalUrl(url);
    if (fixed !== url) {
      changed = true;
      return `](${fixed})`;
    }
    return m;
  });

  // Data object link: '/path'
  next = next.replace(/(\blink\s*:\s*)(["'])(\/[^"']+)\2/g, (m, pre, q, url) => {
    const fixed = fixInternalUrl(url);
    if (fixed !== url) {
      changed = true;
      return `${pre}${q}${fixed}${q}`;
    }
    return m;
  });

  // Path fields used for hrefs
  next = next.replace(/(\b(?:localSeoPath|webDesignPath)\s*:\s*)(`[^`]+`|["'][^"']+["'])/g, (m, pre, lit) => {
    const q = lit[0];
    if (q === '`') {
      const body = lit.slice(1, -1);
      if (body.endsWith('/')) return m;
      if (/\$\{[^}]+\}$/.test(body)) {
        changed = true;
        return `${pre}\`${body}/\``;
      }
      const fixed = fixInternalUrl(body);
      if (fixed !== body) {
        changed = true;
        return `${pre}\`${fixed}\``;
      }
      return m;
    }
    const url = lit.slice(1, -1);
    const fixed = fixInternalUrl(url);
    if (fixed !== url) {
      changed = true;
      return `${pre}${q}${fixed}${q}`;
    }
    return m;
  });

  return { next, changed };
}

const files = walk(ROOT);
let updated = 0;
const report = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const { next, changed } = processContent(content);
  if (changed) {
    fs.writeFileSync(file, next);
    updated += 1;
    report.push(path.relative(process.cwd(), file));
  }
}

console.log(`Updated ${updated} files`);
for (const f of report) console.log(` - ${f}`);
