import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      document.documentElement.classList.add("cursor-active");
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(Boolean(t?.closest("a, button, [data-cursor='hot'], input, label")));
    };
    const leave = () => {
      setVisible(false);
      document.documentElement.classList.remove("cursor-active");
    };
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.documentElement.classList.remove("has-custom-cursor");
      document.documentElement.classList.remove("cursor-active");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        left: sx,
        top: sy,
        opacity: visible ? 1 : 0,
      }}
    >
      {/* Outer ring */}
      <div
        className={`absolute rounded-full border-2 transition-[width,height,border-color,background-color,box-shadow] duration-200 ${
          hover
            ? "h-11 w-11 border-neon bg-neon/15 shadow-[0_0_18px_rgba(61,224,255,0.55)]"
            : "h-7 w-7 border-phoenix/90 bg-transparent shadow-[0_0_12px_rgba(226,58,43,0.45)]"
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
      />
      {/* Core dot */}
      <div
        className={`absolute rounded-full transition-[width,height,background-color] duration-150 ${
          hover ? "h-1.5 w-1.5 bg-neon" : "h-2 w-2 bg-bone"
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </motion.div>
  );
}
