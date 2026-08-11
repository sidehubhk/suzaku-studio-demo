import fs from "fs";

function load(file, id) {
  let t = fs.readFileSync(file, "utf8");
  if (t.charCodeAt(0) === 0xfeff) t = t.slice(1);
  return JSON.parse(t)[id].data;
}

const meta = {
  sense: {
    accent: "#3de0ff",
    tagline: "Neo-Hong Kong folklore meets neon dread",
    setting: "Neo Hong Kong, 2083",
    protagonist: "Mei-Lin Mak",
    reviewLabel: "Very Positive",
    reviewPct: 83,
    reviewCount: 484,
    priceUsd: "$19.99",
    features: [
      "2.5D survival horror inspired by Clock Tower & Fatal Frame",
      "Cantonese folklore under cyberpunk neon",
      "14 lost souls + hidden ghost photos",
      "Atmosphere-first dread — no cheap jump-scare spam",
      "Explore Chong Sing Apartments & family curse mystery",
    ],
    tags: ["Cyberpunk", "Horror", "Folklore", "2.5D", "Exploration"],
  },
  midnight: {
    accent: "#e23a2b",
    tagline: "Classic tank-control terror in Ikebukuro",
    setting: "Ikebukuro Walking Park, Japan",
    protagonist: "Uesugi Kaho",
    reviewLabel: "Mixed",
    reviewPct: 67,
    reviewCount: 31,
    priceUsd: "$11.99",
    features: [
      "Full 3D survival horror with tank controls & fixed cameras",
      "Investigate the Midnight Door urban legend",
      "Inventory management, hiding, relentless Onryo pursuit",
      "First entry in the SENSE/s anthology side-stories",
      "Japanese folklore atmosphere",
    ],
    tags: ["Survival Horror", "Fixed Camera", "Japanese Folklore", "Anthology"],
  },
  "pan-pan": {
    accent: "#ff6b3d",
    tagline: "Graveyard shift in a haunted Sham Shui Po mall",
    setting: "Sham Shui Po shopping arcade, Hong Kong",
    protagonist: "Li Li Tse",
    reviewLabel: "Positive",
    reviewPct: 87,
    reviewCount: 33,
    priceUsd: "$3.99",
    features: [
      "Short-form 3rd-person survival horror",
      "Evade a vengeful Yuan Gui during Ghost Festival",
      "Cantonese true crime + folklore + cyberpunk DNA",
      "Puzzle solving & Taoist resource defense",
      "From the makers of Sense",
    ],
    tags: ["Short Horror", "Hong Kong", "Mascot Horror", "Stealth"],
  },
  surangama: {
    accent: "#c9a227",
    tagline: "Survival horror × character action in neon Diyu",
    setting: "Diyu — Chinese-Buddhist Hell / Kowloon-inspired",
    protagonist: "Tse Li Li",
    reviewLabel: "Coming Soon",
    reviewPct: null,
    reviewCount: null,
    priceUsd: "Wishlist",
    features: [
      "Neon-soaked Diyu inspired by Kowloon Walled City",
      "Skill-based combat (Ninja Gaiden / Onimusha DNA)",
      "Survival resource tension + boss battles",
      "Spirit Mirror puzzles & psychological narrative",
      "Combat Test Demo available on Steam",
    ],
    tags: ["Action Horror", "Diyu", "Combat", "Coming 2028"],
  },
};

const files = [
  {
    slug: "sense",
    id: "1120560",
    file: "steam-sense.json",
    steam: "https://store.steampowered.com/app/1120560/Sense___A_Cyberpunk_Ghost_Story/",
  },
  {
    slug: "midnight",
    id: "1664430",
    file: "steam-midnight.json",
    steam: "https://store.steampowered.com/app/1664430/SENSEs_Midnight/",
  },
  {
    slug: "pan-pan",
    id: "3109270",
    file: "steam-panpan.json",
    steam: "https://store.steampowered.com/app/3109270/Good_Night_Pan_Pan/",
  },
  {
    slug: "surangama",
    id: "3714430",
    file: "steam-surangama.json",
    steam: "https://store.steampowered.com/app/3714430/SURANGAMA/",
  },
];

const shortTitle = {
  sense: "Sense",
  midnight: "SENSE/s: Midnight",
  "pan-pan": "Good Night Pan Pan",
  surangama: "SURANGAMA",
};

const out = files.map(({ slug, id, file, steam }) => {
  const d = load(file, id);
  const m = meta[slug];
  const clean = (s = "") =>
    s
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/&#39;/g, "'");

  return {
    id: slug,
    steamAppId: Number(id),
    title: clean(d.name),
    shortTitle: shortTitle[slug],
    subtitle: m.tagline,
    status: d.release_date.coming_soon ? "Coming Soon" : "Available Now",
    releaseDate: d.release_date.date,
    comingSoon: Boolean(d.release_date.coming_soon),
    blurb: clean(d.short_description),
    cover: `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${id}/library_600x900.jpg`,
    header: d.header_image,
    href: steam,
    accent: m.accent,
    setting: m.setting,
    protagonist: m.protagonist,
    genres: (d.genres || []).map((g) => g.description),
    tags: m.tags,
    features: m.features,
    developers: d.developers || [],
    publishers: d.publishers || [],
    platforms: d.platforms,
    price: d.price_overview?.final_formatted || m.priceUsd,
    priceUsd: m.priceUsd,
    reviewLabel: m.reviewLabel,
    reviewPct: m.reviewPct,
    reviewCount: m.reviewCount,
    achievements: d.achievements?.total ?? null,
    trailer: {
      name: d.movies?.[0]?.name || "Trailer",
      hls: d.movies?.[0]?.hls_h264 || null,
      thumbnail: d.movies?.[0]?.thumbnail || d.header_image,
    },
    screenshots: (d.screenshots || []).slice(0, 8).map((s) => ({
      thumb: s.path_thumbnail,
      full: s.path_full,
    })),
  };
});

fs.writeFileSync("src/data/games.json", JSON.stringify(out, null, 2));
console.log("wrote", out.length, "games to src/data/games.json");
