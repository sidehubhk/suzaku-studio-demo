import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "top", label: "01" },
  { id: "featured", label: "02" },
  { id: "games", label: "03" },
  { id: "studio", label: "04" },
  { id: "contact", label: "05" },
];

export default function SectionRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const nodes = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean,
    ) as HTMLElement[];
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section progress"
      className="pointer-events-none fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:pointer-events-auto lg:flex xl:right-6"
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`/#${s.id === "top" ? "top" : s.id}`}
            className="group flex items-center justify-end gap-2"
            data-cursor="hot"
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={`font-display text-[9px] tracking-[0.2em] uppercase transition ${
                isActive ? "text-neon opacity-100" : "text-mute opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.label}
            </span>
            <motion.span
              layout
              className={`block h-1.5 w-1.5 rounded-full transition ${
                isActive ? "bg-neon shadow-[0_0_12px_#3de0ff]" : "bg-white/30 group-hover:bg-bone"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
