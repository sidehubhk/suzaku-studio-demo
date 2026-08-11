import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="studio"
      ref={ref}
      className="relative overflow-hidden border-t border-phoenix/20 bg-void py-28 md:py-36"
    >
      <motion.p
        style={{ x }}
        aria-hidden
        className="pointer-events-none absolute top-10 left-0 whitespace-nowrap font-display text-[clamp(4rem,18vw,14rem)] font-bold tracking-[0.2em] text-phoenix/[0.07]"
      >
        VERMILION BIRD // PHOENIX PROTOCOL
      </motion.p>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-12 md:gap-8 md:px-8">
        <div className="md:col-span-5">
          <p className="mb-3 font-display text-xs tracking-[0.4em] uppercase text-phoenix">
            Studio // 02
          </p>
          <h2 className="font-display text-4xl tracking-[0.1em] uppercase text-bone md:text-5xl">
            Pure Escapism
          </h2>
        </div>

        <div className="space-y-6 md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="font-serif text-xl leading-relaxed text-bone/90 md:text-2xl"
          >
            SUZAKU builds worlds where Cantonese and Japanese ghost stories bleed into neon
            megacities — horror that creeps, rather than shouts.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-lg leading-relaxed text-mute"
          >
            Named for the vermilion bird of the south, the studio treats every title as a ritual of
            atmosphere: 2.5D dread, folklore fidelity, and science-fiction pulse — engineered for
            players who want to disappear for a while.
          </motion.p>

          <dl className="mt-10 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
            {[
              { label: "Founded", value: "2017" },
              { label: "Signal", value: "Horror / Cyberpunk" },
              { label: "North Star", value: "Escapism" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="font-display text-[10px] tracking-[0.3em] uppercase text-neon">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-display text-lg tracking-[0.08em] text-bone">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
