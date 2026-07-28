/**
 * One-time (or re-auth) YouTube OAuth login.
 * Opens a browser, you approve access, refresh token is saved locally.
 *
 * Usage: node scripts/youtube-auth.mjs
 */
import { authorizeInteractive } from './lib/youtube.mjs';
import { getYoutube } from './lib/youtube.mjs';

async function main() {
  const auth = await authorizeInteractive();
  const youtube = getYoutube(auth);
  const channels = await youtube.channels.list({
    part: ['snippet'],
    mine: true,
  });

  const channel = channels.data.items?.[0];
  if (!channel) {
    console.log('\nLogged in, but no YouTube channel found on this Google account.');
    console.log('Create a channel at https://www.youtube.com/create_channel then re-run upload.');
    return;
  }

  console.log('\n✅ Connected to YouTube');
  console.log(`   channel: ${channel.snippet?.title}`);
  console.log(`   id:      ${channel.id}`);
  console.log('\nNext: npm run youtube:upload -- public/videos/pages/local-seo-test.mp4\n');
}

main().catch((error) => {
  console.error('\n❌ YouTube auth failed:', error.message);
  process.exit(1);
});
