import { motion } from "framer-motion";
import { useActiveSection } from "../hooks/useActiveSection";

const SECTIONS = [
  { id: "top", label: "01" },
  { id: "featured", label: "02" },
  { id: "games", label: "03" },
  { id: "studio", label: "04" },
  { id: "contact", label: "05" },
] as const;

const SECTION_IDS = SECTIONS.map((s) => s.id);

export default function SectionRail() {
  const [active, setActive] = useActiveSection(SECTION_IDS, "top");

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
            href={`/#${s.id}`}
            onClick={() => setActive(s.id)}
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
