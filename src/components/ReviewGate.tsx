import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  REVIEW_LOCK_ENABLED,
  REVIEW_PASS_HASH,
  REVIEW_SESSION_KEY,
  REVIEW_WATERMARK,
} from "../data/review";
import { STUDIO_LOGO } from "../data/brand";

async function sha256Hex(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function ReviewGate() {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(!REVIEW_LOCK_ENABLED);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!REVIEW_LOCK_ENABLED) {
      setUnlocked(true);
      setReady(true);
      return;
    }
    const ok = sessionStorage.getItem(REVIEW_SESSION_KEY) === REVIEW_PASS_HASH;
    setUnlocked(ok);
    setReady(true);
    if (!ok) {
      document.documentElement.classList.add("review-locked");
      document.body.style.overflow = "hidden";
    }
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    document.documentElement.classList.remove("review-locked");
    document.body.style.overflow = "";
  }, [unlocked]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setBusy(true);
    setError("");
    try {
      const hash = await sha256Hex(password.trim());
      if (hash !== REVIEW_PASS_HASH) {
        setError("Access denied.");
        setBusy(false);
        return;
      }
      sessionStorage.setItem(REVIEW_SESSION_KEY, hash);
      setUnlocked(true);
    } catch {
      setError("Unable to verify.");
    } finally {
      setBusy(false);
    }
  };

  if (!ready || !REVIEW_LOCK_ENABLED) return null;

  return (
    <AnimatePresence>
      {!unlocked && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-void px-5"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#e23a2b22,transparent_50%)]" />
          <div className="absolute inset-0 grain opacity-50" />
          <form
            onSubmit={onSubmit}
            className="relative z-10 w-full max-w-md border border-white/10 bg-ink/90 p-8 backdrop-blur-md"
          >
            <img
              src={STUDIO_LOGO}
              alt="SUZAKU"
              className="mx-auto mb-6 h-10 w-auto object-contain opacity-90"
            />
            <p className="text-center font-display text-[10px] tracking-[0.35em] uppercase text-neon">
              Private review access
            </p>
            <h1 className="mt-3 text-center font-display text-2xl tracking-[0.12em] text-bone">
              AUTHORIZED ONLY
            </h1>
            <p className="mt-3 text-center font-serif text-sm text-mute">
              This build is confidential. Enter the review password to continue.
            </p>
            <label className="mt-8 block">
              <span className="mb-2 block font-display text-[10px] tracking-[0.25em] uppercase text-mute">
                Password
              </span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-white/15 bg-void px-4 py-3 font-body text-bone outline-none focus:border-neon/50"
                required
              />
            </label>
            {error && (
              <p className="mt-3 font-display text-xs tracking-[0.15em] uppercase text-phoenix">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={busy}
              className="mt-6 w-full border border-phoenix bg-phoenix py-3.5 font-display text-sm tracking-[0.28em] uppercase text-void transition hover:bg-ember disabled:opacity-60"
            >
              {busy ? "Verifying…" : "Enter Review"}
            </button>
            <p className="mt-5 text-center font-display text-[9px] tracking-[0.2em] uppercase text-mute/80">
              {REVIEW_WATERMARK}
            </p>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
