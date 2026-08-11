# SUZAKU Studio Demo

A cinematic Astro rebuild of the [SUZAKU Games](https://www.suzakugamestudio.com/) presence — cyberpunk neon, East Asian ghost-story atmosphere, and Steam-sourced title dossiers.

## Stack

- **Astro** — static pages + islands
- **React** + **Framer Motion** — parallax, boot gate, scroll reveals
- **hls.js** — official Steam trailer playback
- **Lenis** — smooth scrolling
- **Tailwind CSS v4** — phoenix crimson / void / electric cyan theme

## Features

- Boot “Enter the Fog” gate, custom cursor, procedural ambience toggle
- Featured **SURANGAMA** spotlight with live Steam trailer
- Filterable catalog + per-game dossiers (`/games/[slug]`)
- Steam screenshots marquee + lightbox
- Review scores, prices, platforms, features pulled from Steam store data

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

## Refresh Steam data

```bash
# save API dumps as steam-sense.json etc., then:
node scripts/build-games.mjs
```

## Note

Unofficial demo / redesign exercise. Game art, trailers, and branding belong to SUZAKU Games / respective publishers.
