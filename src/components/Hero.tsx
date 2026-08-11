import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import MagneticButton from "./MagneticButton";
import { STUDIO_LOGO } from "../data/brand";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.05]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const fogX = useTransform(mx, [-0.5, 0.5], ["-4%", "4%"]);
  const fogY = useTransform(my, [-0.5, 0.5], ["-3%", "3%"]);
  const spotX = useTransform(mx, (v) => `${(v + 0.5) * 100}%`);
  const spotY = useTransform(my, (v) => `${(v + 0.5) * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${spotX} ${spotY}, rgba(61,224,255,0.12), transparent 55%)`;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-20 pt-28 md:items-center md:pb-28 md:pt-24"
    >
      <motion.div style={{ y, scale, opacity }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_8%,#e23a2b40,transparent_42%),radial-gradient(ellipse_at_82%_28%,#3de0ff28,transparent_38%),linear-gradient(180deg,#05060c_0%,#0a0b12_48%,#030306_100%)]" />
        <motion.div className="absolute inset-0 mix-blend-screen" style={{ backgroundImage: spotlight }} />
        <motion.div
          style={{ x: fogX, y: fogY }}
          className="absolute inset-[-10%] opacity-60"
          aria-hidden
        >
          <div className="absolute top-[12%] left-[8%] h-64 w-64 rounded-full bg-phoenix/20 blur-[90px]" />
          <div className="absolute top-[30%] right-[12%] h-72 w-72 rounded-full bg-neon/15 blur-[100px]" />
        </motion.div>
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(120deg, transparent 42%, rgba(226,58,43,0.07) 50%, transparent 58%), linear-gradient(rgba(61,224,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(61,224,255,0.045) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 56px 56px, 56px 56px",
          }}
        />
        <FloatingOrbs />
        <CitySkyline />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-void via-void/75 to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mb-7 flex items-center gap-4"
        >
          <img
            src={STUDIO_LOGO}
            alt=""
            className="h-10 w-auto max-w-[180px] object-contain md:h-12 md:max-w-[220px]"
            aria-hidden
          />
          <span className="hidden h-8 w-px bg-white/15 sm:block" />
          <p className="font-display text-xs tracking-[0.4em] uppercase text-neon md:text-sm">
            Cyberpunk &amp; Horror Indie Studio
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18 }}
          className="font-display text-[clamp(3.4rem,14vw,9.5rem)] leading-[0.86] font-bold tracking-[0.08em] text-bone"
        >
          <span className="block text-phoenix drop-shadow-[0_0_40px_rgba(226,58,43,0.35)]">
            SUZAKU
          </span>
          <span className="glitch relative mt-2 inline-block" data-text="ESCAPISM.">
            ESCAPISM.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.42 }}
          className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-mute md:text-xl"
        >
          Pure escapism engineered for dread — neon megacities, ancestral ghosts, and stories that
          refuse to let you leave.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href="/#games"
            className="group relative overflow-hidden border border-phoenix bg-phoenix px-7 py-3.5 font-display text-sm tracking-[0.28em] uppercase text-void"
          >
            <span className="relative z-10">Escape</span>
            <span className="absolute inset-0 translate-x-[-110%] bg-gradient-to-r from-transparent via-white/35 to-transparent transition duration-700 group-hover:translate-x-[110%]" />
          </MagneticButton>
          <MagneticButton
            href="/#featured"
            className="border border-neon/45 bg-neon/5 px-7 py-3.5 font-display text-sm tracking-[0.28em] uppercase text-neon backdrop-blur-sm transition hover:bg-neon/15"
          >
            Watch SURANGAMA
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-display text-[9px] tracking-[0.35em] uppercase text-mute">Scroll</span>
        <span className="scroll-pulse h-8 w-px bg-gradient-to-b from-neon to-transparent" />
      </motion.div>

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
        .scroll-pulse {
          animation: scroll-pulse 1.8s ease-in-out infinite;
        }
        @keyframes scroll-pulse {
          0%, 100% { opacity: 0.25; transform: scaleY(0.6); }
          50% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}

function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="orb absolute rounded-full"
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 29) % 70}%`,
            width: `${2 + (i % 4)}px`,
            height: `${2 + (i % 4)}px`,
            background: i % 3 === 0 ? "#e23a2b" : "#3de0ff",
            opacity: 0.35,
            animationDelay: `${i * 0.35}s`,
            animationDuration: `${6 + (i % 5)}s`,
          }}
        />
      ))}
      <style>{`
        .orb {
          animation: orb-drift linear infinite;
          filter: blur(0.4px);
        }
        @keyframes orb-drift {
          0% { transform: translateY(0) translateX(0); opacity: 0.15; }
          50% { opacity: 0.55; }
          100% { transform: translateY(-48px) translateX(12px); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}

function CitySkyline() {
  return (
    <svg
      className="absolute inset-x-0 bottom-0 h-[44%] w-full text-ink opacity-95"
      viewBox="0 0 1440 420"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="skylineGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3de0ff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#e23a2b" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <g fill="currentColor">
        <path d="M0 420V260h40v-80h30v80h50V180h20v-40h35v40h25v80h60V140h45v40h20V90h55v70h30v120h70V200h40v-60h50v60h35v160H0z" />
        <path d="M720 420V210h35v-90h40v40h25V80h50v80h30v50h55V160h45v60h40v-30h60v70h35v110H720z" opacity="0.85" />
        <path d="M1100 420V240h40v-70h55v40h30V150h60v90h45V200h70v70h40v80h-340z" opacity="0.95" />
      </g>
      <g stroke="url(#skylineGlow)" strokeWidth="1.5" fill="none" opacity="0.75">
        <path d="M80 180v40M210 90v50M760 80v40M1180 150v40" />
      </g>
      <g fill="#e23a2b" opacity="0.85">
        <rect x="225" y="110" width="4" height="8" />
        <rect x="790" y="95" width="4" height="8" />
        <rect x="1210" y="165" width="4" height="8" />
      </g>
      <g fill="#3de0ff" opacity="0.75">
        <rect x="160" y="200" width="3" height="6" />
        <rect x="860" y="175" width="3" height="6" />
        <rect x="1280" y="220" width="3" height="6" />
      </g>
    </svg>
  );
}
