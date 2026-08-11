# SUZAKU Studio Demo

A cinematic Astro rebuild of the [SUZAKU Games](https://www.suzakugamestudio.com/) presence — cyberpunk neon, East Asian ghost-story atmosphere, and Steam-sourced title dossiers.

## Client review lock (3-day hosting)

Review mode is **ON** by default (`REVIEW_LOCK_ENABLED` in `src/data/review.ts`).

**Default password:** `CPHK-Suzaku`  
Share it with your client privately (not on the page).

Change password:

```bash
node scripts/hash-password.mjs "your-new-password"
```

Paste the printed hash into `REVIEW_PASS_HASH`, rebuild, redeploy.

### What this does
- Password gate before the demo unlocks
- Right-click / drag / common view-source & DevTools shortcuts blocked
- Confidential watermark overlay
- `noindex` robots + security headers
- Production build without sourcemaps

### Important (honesty)
Anything visible in a browser can eventually be copied by a determined person (screenshots, network panel, etc.). Client-side locks **raise the bar** for casual vibe-coding clones; they are not DRM.

For stronger protection during the 3-day review, also enable **host-level** access control:
- Cloudflare Access (recommended, free tier)
- Netlify / Vercel deployment protection / password
- Temporary private URL, then take the site down after day 3

Set `REVIEW_LOCK_ENABLED` to `false` when the public launch version goes live.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

## Note

Unofficial demo / redesign exercise. Game art, trailers, and branding belong to SUZAKU Games / respective publishers.
