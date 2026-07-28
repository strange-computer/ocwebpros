/**
 * Upload a local video to YouTube (uses saved OAuth token).
 *
 * Usage:
 *   node scripts/youtube-upload.mjs [path] [--title "..."] [--privacy unlisted|private|public]
 *
 * Defaults to the smoke-test render.
 */
import { createReadStream, existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import { getRoot, loadEnv } from './lib/env.mjs';
import { getAuthorizedClient, getYoutube } from './lib/youtube.mjs';

function parseArgs(argv) {
  const args = {
    file: 'public/videos/pages/local-seo-test.mp4',
    title: 'Local SEO in Orange County | OCWebPros (pipeline test)',
    description:
      'Test upload from the OCWebPros video pipeline.\n\nLocal SEO, Google Maps, and Orange County hire-intent search.',
    privacy: 'unlisted',
    tags: ['local seo', 'orange county', 'ocwebpros', 'google maps'],
  };

  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--title') args.title = argv[++i];
    else if (a === '--description') args.description = argv[++i];
    else if (a === '--privacy') args.privacy = argv[++i];
    else if (a === '--force-login') args.forceLogin = true;
    else if (a.startsWith('-')) throw new Error(`Unknown flag: ${a}`);
    else positional.push(a);
  }
  if (positional[0]) args.file = positional[0];
  return args;
}

async function main() {
  loadEnv();
  const args = parseArgs(process.argv.slice(2));
  const filePath = args.file.startsWith('public') || args.file.startsWith('tmp')
    ? join(getRoot(), args.file)
    : args.file;

  if (!existsSync(filePath)) {
    throw new Error(`Video not found: ${filePath}`);
  }

  console.log(`\nUploading: ${filePath}`);
  console.log(`Title:     ${args.title}`);
  console.log(`Privacy:   ${args.privacy}`);

  const auth = await getAuthorizedClient({ forceLogin: Boolean(args.forceLogin) });
  const youtube = getYoutube(auth);

  const response = await youtube.videos.insert({
    part: ['snippet', 'status'],
    requestBody: {
      snippet: {
        title: args.title.slice(0, 100),
        description: args.description,
        tags: args.tags,
        categoryId: '27', // Education
      },
      status: {
        privacyStatus: args.privacy,
        selfDeclaredMadeForKids: false,
      },
    },
    media: {
      body: createReadStream(filePath),
    },
  });

  const id = response.data.id;
  const url = `https://www.youtube.com/watch?v=${id}`;
  console.log('\n✅ Uploaded');
  console.log(`   video id: ${id}`);
  console.log(`   url:      ${url}`);

  const recordDir = join(getRoot(), 'tmp', 'youtube-uploads');
  mkdirSync(recordDir, { recursive: true });
  const recordPath = join(recordDir, `${basename(filePath, '.mp4')}.json`);
  writeFileSync(
    recordPath,
    JSON.stringify(
      {
        id,
        url,
        title: args.title,
        privacy: args.privacy,
        file: filePath,
        uploadedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
    'utf8',
  );
  console.log(`   saved:    ${recordPath}\n`);
}

main().catch((error) => {
  console.error('\n❌ Upload failed:', error.message);
  if (/invalid_grant|No refresh|invalid_client|access_denied/i.test(error.message)) {
    console.error('Tip: run npm run youtube:auth again to reconnect.\n');
  }
  process.exit(1);
});
