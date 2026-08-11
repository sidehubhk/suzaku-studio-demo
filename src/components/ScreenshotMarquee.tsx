import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { games } from "../data/games";

const shots = games.flatMap((g) =>
  g.screenshots.slice(0, 3).map((s, i) => ({
    ...s,
    key: `${g.id}-${i}`,
    title: g.shortTitle,
    accent: g.accent,
  })),
);

export default function ScreenshotMarquee() {
  const [active, setActive] = useState<(typeof shots)[number] | null>(null);
  const loop = [...shots, ...shots];

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-panel py-16 md:py-20">
      <div className="mb-8 px-5 md:px-8">
        <p className="font-display text-xs tracking-[0.4em] uppercase text-neon">Visuals // Steam captures</p>
        <h2 className="mt-2 font-display text-3xl tracking-[0.1em] uppercase text-bone md:text-4xl">
          Inside the Fog
        </h2>
      </div>

      <div className="relative">
        <div className="marquee-track flex w-max gap-4 px-4">
          {loop.map((shot, idx) => (
            <button
              key={`${shot.key}-${idx}`}
              type="button"
              data-cursor="hot"
              onClick={() => setActive(shot)}
              className="relative h-44 w-72 shrink-0 overflow-hidden border border-white/10 md:h-56 md:w-[26rem]"
            >
              <img
                src={shot.thumb}
                alt={`${shot.title} screenshot`}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
              <span className="absolute bottom-2 left-2 font-display text-[10px] tracking-[0.2em] uppercase text-bone drop-shadow">
                {shot.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-void/90 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.img
              src={active.full}
              alt={active.title}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="max-h-[85vh] max-w-6xl border border-white/20 object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .marquee-track {
          animation: marquee 55s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
