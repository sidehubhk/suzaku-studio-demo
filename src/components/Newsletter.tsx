import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  return (
    <section id="signal" className="relative border-t border-neon/15 bg-panel py-24 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#3de0ff18,transparent_35%),radial-gradient(circle_at_10%_80%,#e23a2b14,transparent_40%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 md:items-center md:px-8">
        <div>
          <p className="mb-3 font-display text-xs tracking-[0.4em] uppercase text-neon">
            Signal // 03
          </p>
          <h2 className="font-display text-4xl tracking-[0.1em] uppercase text-bone md:text-5xl">
            Get Updates
          </h2>
          <p className="mt-4 max-w-md font-serif text-lg leading-relaxed text-mute">
            Sign up for news on upcoming titles — hauntings, neon, and everything in between.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://www.patreon.com/suzaku_games"
              target="_blank"
              rel="noreferrer"
              className="border border-phoenix/50 px-5 py-2.5 font-display text-xs tracking-[0.22em] uppercase text-phoenix transition hover:bg-phoenix/15"
            >
              Patreon
            </a>
            <a
              href="https://x.com/SUZAKU_Games"
              target="_blank"
              rel="noreferrer"
              className="border border-neon/40 px-5 py-2.5 font-display text-xs tracking-[0.22em] uppercase text-neon transition hover:bg-neon/10"
            >
              Follow on X
            </a>
          </div>
        </div>

        <div className="border border-white/10 bg-void/60 p-6 md:p-8">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onSubmit={onSubmit}
                className="space-y-4"
              >
                <label className="block">
                  <span className="mb-2 block font-display text-[10px] tracking-[0.28em] uppercase text-mute">
                    Email Address
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full border border-white/15 bg-ink px-4 py-3 font-body text-bone outline-none transition placeholder:text-mute/50 focus:border-neon/60"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full border border-phoenix bg-phoenix/90 py-3.5 font-display text-sm tracking-[0.28em] uppercase text-void transition hover:bg-ember"
                >
                  Sign Up
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[160px] flex-col items-start justify-center"
              >
                <p className="font-display text-xs tracking-[0.35em] uppercase text-neon">
                  Transmission received
                </p>
                <p className="mt-3 font-serif text-2xl text-bone">Thank you.</p>
                <p className="mt-2 font-serif text-mute">
                  We’ll ping you when the next ghost story surfaces.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
