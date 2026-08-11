import { motion } from "framer-motion";
import { games } from "../data/games";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Games() {
  return (
    <section id="games" className="relative border-t border-neon/10 bg-ink py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#e23a2b14,transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 font-display text-xs tracking-[0.4em] uppercase text-neon">
              Catalog // 01
            </p>
            <h2 className="font-display text-4xl tracking-[0.12em] uppercase text-bone md:text-6xl">
              Haunt the Night
            </h2>
          </div>
          <p className="max-w-md font-serif text-base leading-relaxed text-mute md:text-lg">
            Atmospheric horror with a cyberpunk bloodstream — folklore, neon, and the slow creep of
            dread.
          </p>
        </div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {games.map((game) => (
            <motion.li key={game.id} variants={item}>
              <a
                href={game.href}
                target="_blank"
                rel="noreferrer"
                className="group block outline-none"
              >
                <div
                  className="relative aspect-[2/3] overflow-hidden border border-white/10 bg-panel transition duration-500 group-hover:border-[color:var(--accent)] group-focus-visible:border-[color:var(--accent)]"
                  style={{ ["--accent" as string]: game.accent }}
                >
                  <img
                    src={game.cover}
                    alt={`${game.title} cover art`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04] group-hover:brightness-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p
                      className="mb-1 font-display text-[10px] tracking-[0.28em] uppercase"
                      style={{ color: game.accent }}
                    >
                      {game.status}
                    </p>
                    <h3 className="font-display text-xl tracking-[0.08em] text-bone">
                      {game.title}
                    </h3>
                    <p className="mt-1 font-serif text-sm text-mute">{game.subtitle}</p>
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${game.accent}55, 0 0 40px ${game.accent}22`,
                    }}
                  />
                </div>
                <p className="mt-4 font-serif text-sm leading-relaxed text-mute transition group-hover:text-bone/90">
                  {game.blurb}
                </p>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
