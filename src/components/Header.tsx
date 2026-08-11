import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(3,3,6,0)", "rgba(3,3,6,0.88)"]);
  const border = useTransform(
    scrollY,
    [0, 120],
    ["rgba(61,224,255,0)", "rgba(61,224,255,0.18)"],
  );

  return (
    <motion.header
      style={{ backgroundColor: bg, borderBottomColor: border }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <a href="/" className="group flex items-center gap-3" aria-label="SUZAKU Games home">
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-sm border border-neon/30 bg-ink">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#e23a2b66,transparent_60%)]" />
            <svg viewBox="0 0 24 24" className="relative h-5 w-5 text-phoenix" aria-hidden>
              <path
                fill="currentColor"
                d="M12 2c3.2 4 7.2 5.6 8.8 11.2-3.2-1.6-5.6-.8-8.8 3.2-3.2-4-5.6-4.8-8.8-3.2C4.8 7.6 8.8 6 12 2z"
              />
            </svg>
          </span>
          <span className="font-display text-lg font-semibold tracking-[0.28em] text-bone transition group-hover:text-neon md:text-xl">
            SUZAKU
          </span>
        </a>

        <nav className="hidden items-center gap-8 font-display text-sm tracking-[0.2em] uppercase text-mute md:flex">
          <a href="/#featured" className="transition hover:text-neon">
            Featured
          </a>
          <a href="/#games" className="transition hover:text-neon">
            Games
          </a>
          <a href="/#studio" className="transition hover:text-neon">
            Studio
          </a>
          <a href="/#signal" className="transition hover:text-neon">
            Signal
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://x.com/SUZAKU_Games"
            target="_blank"
            rel="noreferrer"
            className="hidden font-display text-xs tracking-[0.18em] uppercase text-mute transition hover:text-bone sm:inline"
          >
            X / Twitter
          </a>
          <a
            href="/#games"
            className="border border-phoenix/60 bg-phoenix/15 px-3 py-2 font-display text-xs tracking-[0.22em] uppercase text-bone transition hover:border-phoenix hover:bg-phoenix/30"
          >
            Escape
          </a>
        </div>
      </div>
    </motion.header>
  );
}
