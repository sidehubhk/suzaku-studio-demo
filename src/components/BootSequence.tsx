import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function BootSequence() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem("suzaku-boot");
    if (seen) {
      setShow(false);
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const enter = () => {
    sessionStorage.setItem("suzaku-boot", "1");
    document.body.style.overflow = "";
    window.__suzakuLenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9 } }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#e23a2b33,transparent_55%),radial-gradient(circle_at_70%_70%,#3de0ff22,transparent_45%)]" />
          <div className="absolute inset-0 grain opacity-40" />
          <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display text-xs tracking-[0.5em] uppercase text-neon"
            >
              SUZAKU STUDIO
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-5 font-display text-4xl tracking-[0.18em] text-bone md:text-5xl"
            >
              ENTER THE FOG
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-4 font-serif text-mute"
            >
              Cyberpunk nightmares. Ancestral ghosts. Pure escapism.
            </motion.p>
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 }}
              onClick={enter}
              className="mt-10 border border-phoenix bg-phoenix/90 px-10 py-3.5 font-display text-sm tracking-[0.32em] uppercase text-void transition hover:bg-ember"
            >
              Begin
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
