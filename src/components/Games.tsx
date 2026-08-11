import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { games } from "../data/games";

const filters = ["All", "Available", "Upcoming"] as const;

export default function Games() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const list = useMemo(() => {
    if (filter === "Available") return games.filter((g) => !g.comingSoon);
    if (filter === "Upcoming") return games.filter((g) => g.comingSoon);
    return games;
  }, [filter]);

  return (
    <section id="games" className="relative border-t border-neon/10 bg-void py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#e23a2b12,transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 font-display text-xs tracking-[0.4em] uppercase text-neon">
              Catalog // Steam-verified
            </p>
            <h2 className="font-display text-4xl tracking-[0.12em] uppercase text-bone md:text-6xl">
              Haunt the Night
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`border px-4 py-2 font-display text-[10px] tracking-[0.22em] uppercase transition ${
                  filter === f
                    ? "border-neon bg-neon/15 text-neon"
                    : "border-white/15 text-mute hover:border-white/30 hover:text-bone"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.ul layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((game) => (
              <motion.li
                layout
                key={game.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                <a href={`/games/${game.id}`} className="group block outline-none" data-cursor="hot">
                  <div
                    className="relative aspect-[2/3] overflow-hidden border border-white/10 bg-panel transition duration-500 group-hover:border-[color:var(--accent)]"
                    style={{ ["--accent" as string]: game.accent }}
                  >
                    <img
                      src={game.cover}
                      alt={`${game.shortTitle} cover`}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-90" />
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                      <span
                        className="border px-2 py-1 font-display text-[9px] tracking-[0.18em] uppercase backdrop-blur"
                        style={{ borderColor: `${game.accent}88`, color: game.accent }}
                      >
                        {game.status}
                      </span>
                      {game.reviewPct != null && (
                        <span className="border border-white/20 bg-void/70 px-2 py-1 font-display text-[9px] tracking-[0.12em] text-bone backdrop-blur">
                          {game.reviewPct}% · {game.reviewLabel}
                        </span>
                      )}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h3 className="font-display text-xl tracking-[0.06em] text-bone">
                        {game.shortTitle}
                      </h3>
                      <p className="mt-1 font-serif text-sm text-mute">{game.subtitle}</p>
                      <p className="mt-3 font-display text-[10px] tracking-[0.2em] uppercase text-neon opacity-0 transition group-hover:opacity-100">
                        Open dossier →
                      </p>
                    </div>
                  </div>
                </a>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  );
}
