import { motion } from "framer-motion";
import { getGame } from "../data/games";
import TrailerPlayer from "./TrailerPlayer";

export default function FeaturedGame() {
  const game = getGame("surangama");
  if (!game) return null;

  return (
    <section id="featured" className="relative overflow-hidden border-t border-phoenix/25 bg-ink">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(90deg, #030306 10%, transparent 55%), url(${game.screenshots[0]?.full || game.header})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-void/40" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-2 md:items-center md:gap-14 md:px-8 md:py-28">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-xs tracking-[0.4em] uppercase text-ember"
          >
            Next Transmission // {game.releaseDate}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-3 font-display text-5xl tracking-[0.12em] text-bone md:text-7xl"
          >
            {game.shortTitle}
          </motion.h2>
          <p className="mt-4 font-serif text-xl text-mute">{game.subtitle}</p>
          <p className="mt-5 max-w-xl font-serif leading-relaxed text-bone/85">{game.blurb}</p>

          <ul className="mt-8 space-y-2">
            {game.features.slice(0, 4).map((f) => (
              <li key={f} className="flex gap-3 font-serif text-sm text-mute">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`/games/${game.id}`}
              className="border border-ember bg-ember/90 px-6 py-3 font-display text-xs tracking-[0.28em] uppercase text-void transition hover:bg-ember"
            >
              Explore Title
            </a>
            <a
              href={game.href}
              target="_blank"
              rel="noreferrer"
              className="border border-neon/50 px-6 py-3 font-display text-xs tracking-[0.28em] uppercase text-neon transition hover:bg-neon/10"
            >
              Wishlist on Steam
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <TrailerPlayer
            src={game.trailer.hls}
            poster={game.trailer.thumbnail}
            title={game.trailer.name}
            accent={game.accent}
          />
          <p className="mt-3 font-display text-[10px] tracking-[0.25em] uppercase text-mute">
            Official Steam trailer · Kickstarter Launch
          </p>
        </motion.div>
      </div>
    </section>
  );
}
