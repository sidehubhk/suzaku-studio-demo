import { motion } from "framer-motion";
import { games } from "../data/games";

export default function Timeline() {
  const chron = ["sense", "midnight", "pan-pan", "surangama"]
    .map((id) => games.find((g) => g.id === id))
    .filter(Boolean) as typeof games;

  return (
    <section className="relative border-t border-white/10 bg-ink py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="mb-3 font-display text-xs tracking-[0.4em] uppercase text-neon">
          Continuity // Timeline
        </p>
        <h2 className="mb-12 font-display text-3xl tracking-[0.1em] uppercase text-bone md:text-5xl">
          From Sense to Diyu
        </h2>

        <ol className="relative grid gap-8 md:grid-cols-4">
          <div className="pointer-events-none absolute top-5 right-8 left-8 hidden h-px bg-gradient-to-r from-phoenix via-neon/40 to-ember md:block" />
          {chron.map((g, i) => (
            <motion.li
              key={g.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className="relative"
            >
              <span
                className="mb-4 flex h-3 w-3 rounded-full ring-4 ring-void"
                style={{ background: g.accent, boxShadow: `0 0 16px ${g.accent}` }}
              />
              <p className="font-display text-[10px] tracking-[0.28em] uppercase text-mute">
                {g.releaseDate}
              </p>
              <a
                href={`/games/${g.id}`}
                className="mt-2 block font-display text-lg tracking-[0.06em] text-bone transition hover:text-neon"
                data-cursor="hot"
              >
                {g.shortTitle}
              </a>
              <p className="mt-2 font-serif text-sm text-mute">{g.subtitle}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
