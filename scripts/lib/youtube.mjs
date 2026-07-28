import { createServer } from 'node:http';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, isAbsolute } from 'node:path';
import { google } from 'googleapis';
import open from 'open';
import { getRoot, loadEnv, requireEnv } from './env.mjs';

const SCOPES = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube.readonly',
];

export function getTokenPath() {
  return join(getRoot(), 'secrets', 'youtube-token.json');
}

export function loadClientCredentials() {
  loadEnv();
  const relative = process.env.YOUTUBE_CLIENT_SECRET_PATH || 'secrets/youtube-client-secret.json';
  const secretPath = isAbsolute(relative) ? relative : join(getRoot(), relative);

  if (existsSync(secretPath)) {
    const raw = JSON.parse(readFileSync(secretPath, 'utf8'));
    const installed = raw.installed || raw.web;
    if (!installed?.client_id || !installed?.client_secret) {
      throw new Error(`Invalid YouTube client secret file: ${secretPath}`);
    }
    return installed;
  }

  return {
    client_id: requireEnv('YOUTUBE_CLIENT_ID'),
    client_secret: requireEnv('YOUTUBE_CLIENT_SECRET'),
    redirect_uris: ['http://localhost'],
  };
}

export function createOAuthClient(redirectUri) {
  const creds = loadClientCredentials();
  return new google.auth.OAuth2(creds.client_id, creds.client_secret, redirectUri);
}

function saveTokens(tokens) {
  const tokenPath = getTokenPath();
  mkdirSync(dirname(tokenPath), { recursive: true });
  writeFileSync(tokenPath, JSON.stringify(tokens, null, 2), 'utf8');
  return tokenPath;
}

/**
 * Interactive one-time browser login. Saves refresh token to secrets/youtube-token.json.
 */
export async function authorizeInteractive() {
  const port = 53682;
  const redirectUri = `http://127.0.0.1:${port}/oauth2callback`;
  const oauth2Client = createOAuthClient(redirectUri);

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: SCOPES,
  });

  const code = await new Promise((resolve, reject) => {
    const server = createServer(async (req, res) => {
      try {
        const url = new URL(req.url, `http://127.0.0.1:${port}`);
        if (url.pathname !== '/oauth2callback') {
          res.writeHead(404);
          res.end('Not found');
          return;
        }
        const error = url.searchParams.get('error');
        if (error) {
          res.writeHead(400, { 'Content-Type': 'text/html' });
          res.end(`<h1>Auth failed</h1><p>${error}</p>`);
          reject(new Error(`OAuth error: ${error}`));
          server.close();
          return;
        }
        const authCode = url.searchParams.get('code');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>YouTube connected</h1><p>You can close this tab and return to Cursor.</p>');
        server.close();
        resolve(authCode);
      } catch (err) {
        reject(err);
        server.close();
      }
    });

    server.listen(port, '127.0.0.1', async () => {
      console.log('\nOpening Google login in your browser...');
      console.log('If it does not open, visit this URL:\n');
      console.log(authUrl);
      console.log('');
      try {
        await open(authUrl);
      } catch {
        // User can paste URL manually
      }
    });

    server.on('error', reject);
  });

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  const tokenPath = saveTokens(tokens);
  console.log(`Saved YouTube tokens → ${tokenPath}`);
  return oauth2Client;
}

/**
 * Load saved tokens or run interactive login if missing.
 */
export async function getAuthorizedClient({ forceLogin = false } = {}) {
  const tokenPath = getTokenPath();
  // Use same redirect as login for consistency (not needed after tokens exist)
  const oauth2Client = createOAuthClient('http://127.0.0.1:53682/oauth2callback');

  if (!forceLogin && existsSync(tokenPath)) {
    const tokens = JSON.parse(readFileSync(tokenPath, 'utf8'));
    oauth2Client.setCredentials(tokens);
    oauth2Client.on('tokens', (fresh) => {
      const merged = { ...tokens, ...fresh };
      saveTokens(merged);
    });
    return oauth2Client;
  }

  return authorizeInteractive();
}

export function getYoutube(auth) {
  return google.youtube({ version: 'v3', auth });
}
