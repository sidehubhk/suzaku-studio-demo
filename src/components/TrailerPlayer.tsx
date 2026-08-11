import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  src: string | null;
  poster: string;
  title: string;
  accent?: string;
  className?: string;
};

export default function TrailerPlayer({
  src,
  poster,
  title,
  accent = "#e23a2b",
  className = "",
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!open || !src || !videoRef.current) return;
    const video = videoRef.current;
    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setReady(true);
        void video.play().catch(() => undefined);
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.addEventListener("loadedmetadata", () => {
        setReady(true);
        void video.play().catch(() => undefined);
      });
    }

    return () => {
      hls?.destroy();
      setReady(false);
    };
  }, [open, src]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        data-cursor="hot"
        onClick={() => setOpen(true)}
        className={`group relative block w-full overflow-hidden border border-white/10 text-left ${className}`}
      >
        <img
          src={poster}
          alt={`${title} trailer`}
          className="aspect-video w-full object-cover transition duration-700 group-hover:scale-[1.03] group-hover:brightness-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
        <div className="absolute inset-0 grid place-items-center">
          <span
            className="grid h-16 w-16 place-items-center rounded-full border-2 bg-void/50 backdrop-blur transition group-hover:scale-110"
            style={{ borderColor: accent, boxShadow: `0 0 40px ${accent}55` }}
          >
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill={accent}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
        <p className="absolute bottom-4 left-4 font-display text-xs tracking-[0.28em] uppercase text-bone">
          Play Trailer
        </p>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-void/92 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-5xl overflow-hidden border border-white/15 bg-ink shadow-2xl"
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <p className="font-display text-xs tracking-[0.25em] uppercase text-mute">
                  {title}
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="font-display text-xs tracking-[0.2em] uppercase text-bone hover:text-neon"
                >
                  Close
                </button>
              </div>
              <div className="relative aspect-video bg-black">
                {!src ? (
                  <div className="grid h-full place-items-center font-serif text-mute">
                    Trailer unavailable
                  </div>
                ) : (
                  <>
                    {!ready && (
                      <div className="absolute inset-0 grid place-items-center font-display text-xs tracking-[0.3em] uppercase text-neon">
                        Loading trailer…
                      </div>
                    )}
                    <video
                      ref={videoRef}
                      className="h-full w-full"
                      controls
                      playsInline
                      poster={poster}
                    />
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
