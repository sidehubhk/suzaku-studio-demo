import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="pointer-events-none fixed top-0 right-0 left-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-phoenix via-ember to-neon"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
