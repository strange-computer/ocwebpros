/**
 * Shared: render one manifest entry → public/videos/pages/{id}.mp4
 */
import { spawnSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  createWriteStream,
} from 'node:fs';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { getRoot, requireEnv } from './env.mjs';
import { selectCityVerifiedPexelsVideos } from './pexels-city-filter.mjs';

function run(cmd, args, label) {
  const result = spawnSync(cmd, args, { encoding: 'utf8', shell: false });
  if (result.status !== 0) {
    const err = (result.stderr || result.stdout || '').slice(-2000);
    throw new Error(`${label} failed:\n${err}`);
  }
  return result;
}

async function downloadFile(url, destination) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Download failed (${response.status}): ${url}`);
  await pipeline(response.body, createWriteStream(destination));
}

function pickMp4File(video) {
  const files = (video.video_files || [])
    .filter((f) => f.file_type === 'video/mp4' && f.link)
    .sort((a, b) => (b.width || 0) - (a.width || 0));
  const hd = files.find((f) => (f.width || 0) <= 1280 && (f.width || 0) >= 720);
  return hd || files[0];
}

function getDurationSeconds(mediaPath) {
  const result = spawnSync(
    'ffprobe',
    ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', mediaPath],
    { encoding: 'utf8' },
  );
  if (result.status !== 0) throw new Error(`ffprobe failed for ${mediaPath}: ${result.stderr}`);
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

function writeCaptions(script, durationSec, srtPath) {
  const sentences = script
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const chunkDur = durationSec / Math.max(sentences.length, 1);
  const lines = [];

  sentences.forEach((sentence, index) => {
    const start = index * chunkDur;
    const end = Math.min(durationSec, (index + 1) * chunkDur);
    lines.push(String(index + 1));
    lines.push(`${formatSrtTime(start)} --> ${formatSrtTime(end)}`);
    const words = sentence.split(/\s+/);
    const wrapped = [];
    let current = '';
    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (next.length > 42) {
        if (current) wrapped.push(current);
        current = word;
      } else current = next;
    }
    if (current) wrapped.push(current);
    lines.push(wrapped.slice(0, 2).join('\n'));
    lines.push('');
  });

  writeFileSync(srtPath, lines.join('\n'), 'utf8');
}

async function fetchPexelsClips(manifest, clipsDir, apiKey) {
  const needed = manifest.clipCount || 3;
  const selected = await selectCityVerifiedPexelsVideos(manifest, apiKey, { needed });
  const paths = [];
  for (let i = 0; i < selected.length; i++) {
    const file = pickMp4File(selected[i]);
    if (!file) throw new Error(`No MP4 on Pexels video ${selected[i].id}`);
    const dest = join(clipsDir, `clip-${i + 1}.mp4`);
    console.log(`  downloading clip ${i + 1} (pexels ${selected[i].id})`);
    await downloadFile(file.link, dest);
    paths.push(dest);
  }
  return paths;
}

async function generateVoice(manifest, voicePath, apiKey) {
  const voiceId = manifest.voiceId || '21m00Tcm4TlvDq8ikWAM';
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text: manifest.script,
        model_id: 'eleven_multilingual_v2',
        voice_settings: { stability: 0.45, similarity_boost: 0.75 },
      }),
    },
  );
  if (!response.ok) {
    throw new Error(`ElevenLabs error (${response.status}): ${await response.text()}`);
  }
  writeFileSync(voicePath, Buffer.from(await response.arrayBuffer()));
}

function assembleVideo({ clipPaths, voicePath, srtPath, outMp4, workDir, voiceDuration }) {
  const clipDur = Math.max(2.5, voiceDuration / clipPaths.length);
  const normalized = [];
  const concatListPath = join(workDir, 'concat.txt');

  clipPaths.forEach((clip, i) => {
    const out = join(workDir, `norm-${i + 1}.mp4`);
    run(
      'ffmpeg',
      [
        '-y', '-i', clip, '-t', clipDur.toFixed(2),
        '-vf', 'scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fps=30',
        '-an', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-pix_fmt', 'yuv420p', out,
      ],
      `normalize clip ${i + 1}`,
    );
    normalized.push(out);
  });

  writeFileSync(
    concatListPath,
    normalized.map((p) => `file '${p.replace(/\\/g, '/')}'`).join('\n'),
    'utf8',
  );

  const silentConcat = join(workDir, 'concat-silent.mp4');
  run(
    'ffmpeg',
    ['-y', '-f', 'concat', '-safe', '0', '-i', concatListPath, '-c', 'copy', silentConcat],
    'concat clips',
  );

  const srtEscaped = srtPath.replace(/\\/g, '/').replace(/:/g, '\\:');
  run(
    'ffmpeg',
    [
      '-y', '-i', silentConcat, '-i', voicePath,
      '-vf', `subtitles='${srtEscaped}':force_style='FontName=Arial,FontSize=22,PrimaryColour=&H00FFFFFF,OutlineColour=&H80000000,BorderStyle=3,Outline=1,Shadow=0,MarginV=40'`,
      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20',
      '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', outMp4,
    ],
    'mux VO + captions',
  );
}

/**
 * @param {object} manifest
 * @param {{ skipIfExists?: boolean }} [opts]
 */
export async function renderPageVideo(manifest, opts = {}) {
  const root = getRoot();
  const pexelsKey = requireEnv('PEXELS_API_KEY');
  const elevenKey = requireEnv('ELEVENLABS_API_KEY');

  const workDir = join(root, 'tmp', 'video-pipeline', manifest.id);
  const clipsDir = join(workDir, 'clips');
  const outDir = join(root, 'public', 'videos', 'pages');
  const outMp4 = join(outDir, `${manifest.id}.mp4`);
  const voicePath = join(workDir, 'voice.mp3');
  const srtPath = join(workDir, 'captions.srt');

  if (opts.skipIfExists && existsSync(outMp4)) {
    return { outMp4, skipped: true };
  }

  mkdirSync(clipsDir, { recursive: true });
  mkdirSync(outDir, { recursive: true });

  console.log(`  Pexels: ${manifest.pexelsQuery}`);
  const clips = await fetchPexelsClips(manifest, clipsDir, pexelsKey);
  console.log('  ElevenLabs VO…');
  await generateVoice(manifest, voicePath, elevenKey);
  const voiceDuration = getDurationSeconds(voicePath);
  writeCaptions(manifest.script, voiceDuration, srtPath);
  console.log(`  ffmpeg assemble (${voiceDuration.toFixed(1)}s)…`);
  assembleVideo({ clipPaths: clips, voicePath, srtPath, outMp4, workDir, voiceDuration });

  return { outMp4, skipped: false, duration: voiceDuration };
}
