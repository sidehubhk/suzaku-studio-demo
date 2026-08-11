import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { STUDIO_LOGO } from "../data/brand";

const NAV = [
  { href: "/#featured", id: "featured", label: "Featured" },
  { href: "/#games", id: "games", label: "Games" },
  { href: "/#studio", id: "studio", label: "Studio" },
  { href: "/#signal", id: "signal", label: "Signal" },
];

export default function Header() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(3,3,6,0)", "rgba(3,3,6,0.92)"]);
  const border = useTransform(
    scrollY,
    [0, 120],
    ["rgba(61,224,255,0)", "rgba(61,224,255,0.22)"],
  );
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit?.target?.id) setActive(hit.target.id);
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0.15, 0.4] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <motion.header
      style={{ backgroundColor: bg, borderBottomColor: border }}
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <a href="/" className="group flex items-center" aria-label="SUZAKU Studio home" data-cursor="hot">
          <img
            src={STUDIO_LOGO}
            alt="SUZAKU Games"
            className="h-8 w-auto max-w-[150px] object-contain drop-shadow-[0_0_18px_rgba(226,58,43,0.25)] transition duration-300 group-hover:drop-shadow-[0_0_22px_rgba(61,224,255,0.35)] md:h-10 md:max-w-[190px]"
          />
        </a>

        <nav className="hidden items-center gap-8 font-display text-sm tracking-[0.2em] uppercase md:flex">
          {NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                data-cursor="hot"
                className={`relative transition ${
                  isActive ? "text-neon" : "text-mute hover:text-bone"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 h-px w-full bg-neon shadow-[0_0_8px_#3de0ff]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://x.com/SUZAKU_Games"
            target="_blank"
            rel="noreferrer"
            className="hidden font-display text-xs tracking-[0.18em] uppercase text-mute transition hover:text-bone sm:inline"
            data-cursor="hot"
          >
            X / Twitter
          </a>
          <a
            href="/#games"
            data-cursor="hot"
            className="border border-phoenix/60 bg-phoenix/15 px-3 py-2 font-display text-xs tracking-[0.22em] uppercase text-bone transition hover:border-phoenix hover:bg-phoenix/30"
          >
            Escape
          </a>
        </div>
      </div>
    </motion.header>
  );
}
