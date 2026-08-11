import { motion } from "framer-motion";
import { studioStats, games } from "../data/games";

export default function StatsBar() {
  const sense = games.find((g) => g.id === "sense");
  const items = [
    ...studioStats.slice(0, 1),
    {
      label: "Sense Score",
      value: sense?.reviewPct != null ? `${sense.reviewPct}%` : "—",
    },
    { label: "Review Verdict", value: sense?.reviewLabel ?? "—" },
    ...studioStats.slice(2),
  ];

  return (
    <section className="border-y border-neon/15 bg-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-neon/10 md:grid-cols-4">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-ink px-5 py-8 md:px-8"
          >
            <p className="font-display text-[10px] tracking-[0.3em] uppercase text-neon">
              {item.label}
            </p>
            <p className="mt-2 font-display text-2xl tracking-[0.08em] text-bone md:text-3xl">
              {item.value}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
