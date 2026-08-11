import raw from "./games.json";

export type Game = {
  id: string;
  steamAppId: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  status: string;
  releaseDate: string;
  comingSoon: boolean;
  blurb: string;
  cover: string;
  header: string;
  href: string;
  accent: string;
  setting: string;
  protagonist: string;
  genres: string[];
  tags: string[];
  features: string[];
  developers: string[];
  publishers: string[];
  platforms: { windows: boolean; mac: boolean; linux: boolean };
  price: string;
  priceUsd: string;
  reviewLabel: string;
  reviewPct: number | null;
  reviewCount: number | null;
  achievements: number | null;
  trailer: { name: string; hls: string | null; thumbnail: string };
  screenshots: { thumb: string; full: string }[];
};

export const games = raw as Game[];

export function getGame(id: string) {
  return games.find((g) => g.id === id);
}

export const studioStats = [
  { label: "Titles", value: "4" },
  { label: "Sense Reviews", value: "83%+" },
  { label: "Founded", value: "2017" },
  { label: "Focus", value: "Escapism" },
];
