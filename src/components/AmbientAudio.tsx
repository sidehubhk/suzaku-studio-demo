import { useEffect, useRef, useState } from "react";

/** Procedural low ambient drone — no external audio assets. */
export default function AmbientAudio() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([]);

  useEffect(() => {
    return () => {
      nodesRef.current.forEach(({ osc }) => {
        try {
          osc.stop();
        } catch {
          /* already stopped */
        }
      });
      ctxRef.current?.close();
    };
  }, []);

  const toggle = async () => {
    if (on) {
      nodesRef.current.forEach(({ osc, gain }) => {
        gain.gain.exponentialRampToValueAtTime(0.0001, ctxRef.current!.currentTime + 0.4);
        setTimeout(() => {
          try {
            osc.stop();
          } catch {
            /* noop */
          }
        }, 450);
      });
      nodesRef.current = [];
      setOn(false);
      return;
    }

    const ctx = new AudioContext();
    ctxRef.current = ctx;
    const master = ctx.createGain();
    master.gain.value = 0.035;
    master.connect(ctx.destination);

    const freqs = [55, 82.5, 110];
    nodesRef.current = freqs.map((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i === 0 ? "sine" : "triangle";
      osc.frequency.value = f;
      gain.gain.value = 0.0001;
      osc.connect(gain);
      gain.connect(master);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.4 / freqs.length, ctx.currentTime + 1.2);
      return { osc, gain };
    });
    setOn(true);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed right-4 bottom-4 z-50 border border-neon/40 bg-void/80 px-3 py-2 font-display text-[10px] tracking-[0.22em] uppercase text-neon backdrop-blur transition hover:bg-neon/10 md:right-6 md:bottom-6"
      aria-pressed={on}
    >
      {on ? "Ambience On" : "Ambience Off"}
    </button>
  );
}
