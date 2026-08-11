export type Game = {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  blurb: string;
  cover: string;
  href: string;
  accent: string;
};

export const games: Game[] = [
  {
    id: "sense",
    title: "Sense",
    subtitle: "A Cyberpunk Ghost Story",
    status: "Available Now",
    blurb:
      "Neo-Hong Kong folklore meets neon dread. Slow-burn survival horror where ghosts are glitches in reality.",
    cover:
      "https://images.squarespace-cdn.com/content/v1/60cb8352284fe753eb45551d/1623962378926-H6FX01GK1OWGS0PP6K6U/verticalgamecover6x9_template.png",
    href: "https://store.steampowered.com/app/1120560/Sense___A_Cyberpunk_Ghost_Story/",
    accent: "#3de0ff",
  },
  {
    id: "midnight",
    title: "SENSE/s: Midnight",
    subtitle: "A ghost side-story",
    status: "Available Now",
    blurb:
      "A tighter Japanese folklore haunting — atmospheric, intimate, and sharpened for dread.",
    cover:
      "https://images.squarespace-cdn.com/content/v1/60cb8352284fe753eb45551d/198ba01a-359f-4969-88de-e222615dfaff/co40yd.jpg",
    href: "https://store.steampowered.com/app/1664430/SENSEs_Midnight/",
    accent: "#e23a2b",
  },
  {
    id: "panpan",
    title: "Good Night Pan Pan",
    subtitle: "PC / Steam",
    status: "Available Now",
    blurb:
      "A quieter nightmare from the same studio DNA — uncanny, intimate, and hard to shake.",
    cover:
      "https://images.squarespace-cdn.com/content/v1/60cb8352284fe753eb45551d/fd492b56-c74f-4f30-8928-6580fa2bcb9a/Game-Page-Box-Art_Good-Night-Pan-Pan-Inits-320x480.jpg",
    href: "https://store.steampowered.com/app/3109270/Good_Night_Pan_Pan/",
    accent: "#ff6b3d",
  },
  {
    id: "surangama",
    title: "SURANGAMA",
    subtitle: "In development",
    status: "Coming Soon",
    blurb:
      "The next chapter of pure escapism — still cloaked, still hungry for your attention.",
    cover:
      "https://images.squarespace-cdn.com/content/v1/60cb8352284fe753eb45551d/c08b89bd-821b-4801-9284-bf4a523ad7ea/coanqp.jpg",
    href: "https://store.steampowered.com/app/3714430/SURANGAMA/",
    accent: "#c9a227",
  },
];
