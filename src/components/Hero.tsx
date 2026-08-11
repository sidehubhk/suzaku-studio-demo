import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.15]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 md:items-center md:pb-24 md:pt-20"
    >
      <motion.div style={{ y, scale, opacity }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,#e23a2b33,transparent_45%),radial-gradient(ellipse_at_80%_30%,#3de0ff22,transparent_40%),linear-gradient(180deg,#05060c_0%,#0a0b12_45%,#030306_100%)]" />
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(120deg, transparent 40%, rgba(226,58,43,0.08) 50%, transparent 60%), linear-gradient(rgba(61,224,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(61,224,255,0.05) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 64px 64px, 64px 64px",
          }}
        />
        <CitySkyline />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-void via-void/70 to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-5 font-display text-xs tracking-[0.45em] uppercase text-neon md:text-sm"
        >
          Cyberpunk &amp; Horror Indie Studio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2 }}
          className="font-display text-[clamp(3.4rem,14vw,9.5rem)] leading-[0.88] font-bold tracking-[0.08em] text-bone"
        >
          <span className="block text-phoenix/90">SUZAKU</span>
          <span className="glitch relative mt-2 inline-block" data-text="ESCAPISM.">
            ESCAPISM.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.45 }}
          className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-mute md:text-xl"
        >
          Founded on the principle of pure escapism and entertainment — where neon futures and
          ancestral ghosts share the same haunted frequency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#games"
            className="group relative overflow-hidden border border-phoenix bg-phoenix px-7 py-3.5 font-display text-sm tracking-[0.28em] uppercase text-void transition hover:bg-ember"
          >
            <span className="relative z-10">Escape</span>
            <span className="absolute inset-0 translate-x-[-110%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition duration-700 group-hover:translate-x-[110%]" />
          </a>
          <a
            href="#studio"
            className="border border-neon/40 px-7 py-3.5 font-display text-sm tracking-[0.28em] uppercase text-neon transition hover:border-neon hover:bg-neon/10"
          >
            Enter the Fog
          </a>
        </motion.div>
      </div>

      <style>{`
        .glitch {
          text-shadow: 0.04em 0 #3de0ff, -0.03em 0 #e23a2b;
        }
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          opacity: 0.75;
          pointer-events: none;
        }
        .glitch::before {
          color: #3de0ff;
          transform: translate(2px, -1px);
          clip-path: inset(0 0 55% 0);
          animation: glitch-a 3.6s infinite linear alternate-reverse;
        }
        .glitch::after {
          color: #e23a2b;
          transform: translate(-2px, 1px);
          clip-path: inset(45% 0 0 0);
          animation: glitch-b 2.8s infinite linear alternate-reverse;
        }
        @keyframes glitch-a {
          0%, 90%, 100% { transform: translate(0); }
          92% { transform: translate(3px, -1px); }
          94% { transform: translate(-2px, 1px); }
          96% { transform: translate(1px, 0); }
        }
        @keyframes glitch-b {
          0%, 88%, 100% { transform: translate(0); }
          91% { transform: translate(-3px, 1px); }
          95% { transform: translate(2px, -1px); }
        }
      `}</style>
    </section>
  );
}

function CitySkyline() {
  return (
    <svg
      className="absolute inset-x-0 bottom-0 h-[42%] w-full text-ink opacity-90"
      viewBox="0 0 1440 420"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="skylineGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3de0ff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#e23a2b" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <g fill="currentColor">
        <path d="M0 420V260h40v-80h30v80h50V180h20v-40h35v40h25v80h60V140h45v40h20V90h55v70h30v120h70V200h40v-60h50v60h35v160H0z" />
        <path d="M720 420V210h35v-90h40v40h25V80h50v80h30v50h55V160h45v60h40v-30h60v70h35v110H720z" opacity="0.85" />
        <path d="M1100 420V240h40v-70h55v40h30V150h60v90h45V200h70v70h40v80h-340z" opacity="0.95" />
      </g>
      <g stroke="url(#skylineGlow)" strokeWidth="1.5" fill="none" opacity="0.7">
        <path d="M80 180v40M210 90v50M760 80v40M1180 150v40" />
      </g>
      <g fill="#e23a2b" opacity="0.8">
        <rect x="225" y="110" width="4" height="8" />
        <rect x="790" y="95" width="4" height="8" />
        <rect x="1210" y="165" width="4" height="8" />
      </g>
      <g fill="#3de0ff" opacity="0.7">
        <rect x="160" y="200" width="3" height="6" />
        <rect x="860" y="175" width="3" height="6" />
        <rect x="1280" y="220" width="3" height="6" />
      </g>
    </svg>
  );
}
