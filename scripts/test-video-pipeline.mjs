/**
 * End-to-end smoke test:
 * Pexels clips → ElevenLabs VO → ffmpeg assemble + captions → local MP4
 *
 * Usage: node scripts/test-video-pipeline.mjs [manifest-id]
 * Default id: local-seo-test
 */
import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  createWriteStream,
  rmSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { fileURLToPath } from 'node:url';
import { getRoot, loadEnv, requireEnv } from './lib/env.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = getRoot();
const manifestId = process.argv[2] || 'local-seo-test';

loadEnv();
const PEXELS_API_KEY = requireEnv('PEXELS_API_KEY');
const ELEVENLABS_API_KEY = requireEnv('ELEVENLABS_API_KEY');

const manifest = JSON.parse(
  readFileSync(join(__dirname, 'video-manifest.json'), 'utf8'),
).find((item) => item.id === manifestId);

if (!manifest) {
  throw new Error(`No manifest entry for id: ${manifestId}`);
}

const workDir = join(root, 'tmp', 'video-pipeline', manifest.id);
const clipsDir = join(workDir, 'clips');
const outDir = join(root, 'public', 'videos', 'pages');
const outMp4 = join(outDir, `${manifest.id}.mp4`);
const voicePath = join(workDir, 'voice.mp3');
const srtPath = join(workDir, 'captions.srt');
const concatListPath = join(workDir, 'concat.txt');

function run(cmd, args, label) {
  console.log(`→ ${label}`);
  const result = spawnSync(cmd, args, { encoding: 'utf8', shell: false });
  if (result.status !== 0) {
    const err = (result.stderr || result.stdout || '').slice(-2000);
    throw new Error(`${label} failed:\n${err}`);
  }
  return result;
}

async function downloadFile(url, destination) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed (${response.status}): ${url}`);
  }
  await pipeline(response.body, createWriteStream(destination));
}

function pickMp4File(video) {
  const files = (video.video_files || [])
    .filter((f) => f.file_type === 'video/mp4' && f.link)
    .sort((a, b) => (b.width || 0) - (a.width || 0));

  // Prefer ~1280 wide for speed/size
  const hd = files.find((f) => (f.width || 0) <= 1280 && (f.width || 0) >= 720);
  return hd || files[0];
}

async function fetchPexelsClips() {
  const params = new URLSearchParams({
    query: manifest.pexelsQuery,
    per_page: String(Math.max(manifest.clipCount, 5)),
    orientation: 'landscape',
    size: 'medium',
  });

  const response = await fetch(`https://api.pexels.com/videos/search?${params}`, {
    headers: { Authorization: PEXELS_API_KEY },
  });

  if (!response.ok) {
    throw new Error(`Pexels error (${response.status}): ${await response.text()}`);
  }

  const data = await response.json();
  const videos = data.videos || [];
  if (videos.length === 0) {
    throw new Error(`No Pexels videos for query: ${manifest.pexelsQuery}`);
  }

  const selected = videos.slice(0, manifest.clipCount);
  const paths = [];

  for (let i = 0; i < selected.length; i++) {
    const file = pickMp4File(selected[i]);
    if (!file) throw new Error(`No MP4 file on Pexels video ${selected[i].id}`);
    const dest = join(clipsDir, `clip-${i + 1}.mp4`);
    console.log(`  downloading clip ${i + 1} (pexels ${selected[i].id})`);
    await downloadFile(file.link, dest);
    paths.push(dest);
  }

  return paths;
}

async function generateVoice() {
  const voiceId = manifest.voiceId || '21m00Tcm4TlvDq8ikWAM';
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text: manifest.script,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.45,
          similarity_boost: 0.75,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`ElevenLabs error (${response.status}): ${await response.text()}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(voicePath, buffer);
  console.log(`  saved voice (${buffer.length} bytes)`);
}

function getDurationSeconds(mediaPath) {
  const result = spawnSync(
    'ffprobe',
    [
      '-v',
      'error',
      '-show_entries',
      'format=duration',
      '-of',
      'default=noprint_wrappers=1:nokey=1',
      mediaPath,
    ],
    { encoding: 'utf8' },
  );
  if (result.status !== 0) {
    throw new Error(`ffprobe failed for ${mediaPath}: ${result.stderr}`);
  }
  return Number.parseFloat(result.stdout.trim());
}

function formatSrtTime(seconds) {
  const msTotal = Math.max(0, Math.round(seconds * 1000));
  const hours = Math.floor(msTotal / 3_600_000);
  const minutes = Math.floor((msTotal % 3_600_000) / 60_000);
  const secs = Math.floor((msTotal % 60_000) / 1000);
  const ms = msTotal % 1000;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
}

function writeCaptions(durationSec) {
  // Split script into ~short caption chunks timed across the VO
  const sentences = manifest.script
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const chunkCount = Math.max(sentences.length, 1);
  const chunkDur = durationSec / chunkCount;
  const lines = [];

  sentences.forEach((sentence, index) => {
    const start = index * chunkDur;
    const end = Math.min(durationSec, (index + 1) * chunkDur);
    lines.push(String(index + 1));
    lines.push(`${formatSrtTime(start)} --> ${formatSrtTime(end)}`);
    // Soft wrap long lines
    const words = sentence.split(/\s+/);
    const wrapped = [];
    let current = '';
    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (next.length > 42) {
        if (current) wrapped.push(current);
        current = word;
      } else {
        current = next;
      }
    }
    if (current) wrapped.push(current);
    lines.push(wrapped.slice(0, 2).join('\n'));
    lines.push('');
  });

  writeFileSync(srtPath, lines.join('\n'), 'utf8');
}

function assembleVideo(clipPaths, voiceDuration) {
  // Normalize each clip to 1280x720, then concat, then mix VO + burn captions
  const clipDur = Math.max(2.5, voiceDuration / clipPaths.length);
  const normalized = [];

  clipPaths.forEach((clip, i) => {
    const out = join(workDir, `norm-${i + 1}.mp4`);
    run(
      'ffmpeg',
      [
        '-y',
        '-i',
        clip,
        '-t',
        clipDur.toFixed(2),
        '-vf',
        'scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fps=30',
        '-an',
        '-c:v',
        'libx264',
        '-preset',
        'veryfast',
        '-crf',
        '23',
        '-pix_fmt',
        'yuv420p',
        out,
      ],
      `normalize clip ${i + 1}`,
    );
    normalized.push(out);
  });

  const listBody = normalized.map((p) => `file '${p.replace(/\\/g, '/')}'`).join('\n');
  writeFileSync(concatListPath, listBody, 'utf8');

  const silentConcat = join(workDir, 'concat-silent.mp4');
  run(
    'ffmpeg',
    [
      '-y',
      '-f',
      'concat',
      '-safe',
      '0',
      '-i',
      concatListPath,
      '-c',
      'copy',
      silentConcat,
    ],
    'concat clips',
  );

  // Escape Windows path for subtitles filter
  const srtEscaped = srtPath.replace(/\\/g, '/').replace(/:/g, '\\:');

  mkdirSync(outDir, { recursive: true });
  run(
    'ffmpeg',
    [
      '-y',
      '-i',
      silentConcat,
      '-i',
      voicePath,
      '-vf',
      `subtitles='${srtEscaped}':force_style='FontName=Arial,FontSize=22,PrimaryColour=&H00FFFFFF,OutlineColour=&H80000000,BorderStyle=3,Outline=1,Shadow=0,MarginV=40'`,
      '-c:v',
      'libx264',
      '-preset',
      'veryfast',
      '-crf',
      '20',
      '-c:a',
      'aac',
      '-b:a',
      '192k',
      '-shortest',
      '-movflags',
      '+faststart',
      outMp4,
    ],
    'mux VO + burn captions',
  );
}

async function main() {
  console.log(`\n🎬 Testing video pipeline for: ${manifest.id}`);
  console.log(`   title: ${manifest.title}`);
  console.log(`   query: ${manifest.pexelsQuery}\n`);

  mkdirSync(clipsDir, { recursive: true });
  mkdirSync(outDir, { recursive: true });

  console.log('1/4 Pexels clips');
  const clips = await fetchPexelsClips();

  console.log('2/4 ElevenLabs voice');
  await generateVoice();

  console.log('3/4 Captions');
  const voiceDuration = getDurationSeconds(voicePath);
  console.log(`  VO duration: ${voiceDuration.toFixed(2)}s`);
  writeCaptions(voiceDuration);

  console.log('4/4 ffmpeg assemble');
  assembleVideo(clips, voiceDuration);

  const sizeMb = (readFileSync(outMp4).byteLength / (1024 * 1024)).toFixed(2);
  console.log(`\n✅ Success`);
  console.log(`   output: ${outMp4}`);
  console.log(`   size:   ${sizeMb} MB`);
  console.log(`   work:   ${workDir}`);
  console.log(`\nPreview at /videos/pages/${manifest.id}.mp4 once the site is running.`);
  console.log('YouTube upload not included in this smoke test (needs one-time browser OAuth).\n');
}

main().catch((error) => {
  console.error('\n❌ Pipeline failed:', error.message);
  process.exit(1);
});
