import { useEffect } from "react";
import { REVIEW_LOCK_ENABLED, REVIEW_WATERMARK } from "../data/review";

/** Soft deterrents only — nothing in a browser is truly copy-proof. */
export default function ReviewShield() {
  useEffect(() => {
    if (!REVIEW_LOCK_ENABLED) return;

    document.documentElement.classList.add("review-shield");

    const blockContext = (e: Event) => e.preventDefault();
    const blockDrag = (e: Event) => e.preventDefault();

    const blockKeys = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const ctrl = e.ctrlKey || e.metaKey;
      if (key === "f12") {
        e.preventDefault();
        return;
      }
      if (ctrl && e.shiftKey && (key === "i" || key === "j" || key === "c")) {
        e.preventDefault();
        return;
      }
      if (ctrl && (key === "u" || key === "s" || key === "p")) {
        e.preventDefault();
      }
    };

    // Discourage casual scraping via console
    const warn = () => {
      console.clear();
      console.log(
        "%cRESTRICTED REVIEW BUILD",
        "color:#e23a2b;font-size:18px;font-weight:bold;",
      );
      console.log(
        "%cUnauthorized copying, redistribution, or recreation of this work is prohibited.",
        "color:#9a9488;font-size:12px;",
      );
    };
    warn();
    const consoleTimer = window.setInterval(warn, 8000);

    document.addEventListener("contextmenu", blockContext);
    document.addEventListener("dragstart", blockDrag);
    document.addEventListener("keydown", blockKeys);

    return () => {
      document.documentElement.classList.remove("review-shield");
      document.removeEventListener("contextmenu", blockContext);
      document.removeEventListener("dragstart", blockDrag);
      document.removeEventListener("keydown", blockKeys);
      window.clearInterval(consoleTimer);
    };
  }, []);

  if (!REVIEW_LOCK_ENABLED) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55] overflow-hidden select-none"
    >
      <div className="review-watermark absolute inset-[-20%] rotate-[-18deg] opacity-[0.045]">
        {Array.from({ length: 24 }).map((_, i) => (
          <p
            key={i}
            className="whitespace-nowrap font-display text-2xl tracking-[0.35em] text-bone md:text-3xl"
          >
            {REVIEW_WATERMARK} · {REVIEW_WATERMARK}
          </p>
        ))}
      </div>
    </div>
  );
}
