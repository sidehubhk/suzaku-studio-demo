import { useEffect, useRef, useState } from "react";

type Voice = {
  stop: () => void;
};

/** Procedural cyberpunk/horror ambience — mid-range so laptop speakers can hear it. */
export default function AmbientAudio() {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const voicesRef = useRef<Voice[]>([]);
  const masterRef = useRef<GainNode | null>(null);

  const stopAll = () => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (master && ctx) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    }
    const voices = [...voicesRef.current];
    voicesRef.current = [];
    setTimeout(() => {
      voices.forEach((v) => {
        try {
          v.stop();
        } catch {
          /* already stopped */
        }
      });
    }, 550);
    setOn(false);
  };

  useEffect(() => {
    return () => {
      voicesRef.current.forEach((v) => {
        try {
          v.stop();
        } catch {
          /* noop */
        }
      });
      void ctxRef.current?.close();
    };
  }, []);

  const toggle = async () => {
    if (on) {
      stopAll();
      return;
    }

    const ctx = ctxRef.current?.state === "closed" || !ctxRef.current
      ? new AudioContext()
      : ctxRef.current;
    ctxRef.current = ctx;
    if (ctx.state === "suspended") await ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0.0001;
    master.connect(ctx.destination);
    masterRef.current = master;
    // Audible on laptop speakers without blasting
    master.gain.exponentialRampToValueAtTime(0.22, ctx.currentTime + 0.8);

    const voices: Voice[] = [];

    const addTone = (
      freq: number,
      type: OscillatorType,
      level: number,
      detune = 0,
    ) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      osc.type = type;
      osc.frequency.value = freq;
      osc.detune.value = detune;
      filter.type = "lowpass";
      filter.frequency.value = 1800;
      filter.Q.value = 0.7;
      gain.gain.value = level;
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(master);
      osc.start();
      voices.push({
        stop: () => {
          try {
            osc.stop();
          } catch {
            /* noop */
          }
        },
      });

      // Slow pulse so it feels alive
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.08 + Math.random() * 0.06;
      lfoGain.gain.value = level * 0.35;
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      lfo.start();
      voices.push({
        stop: () => {
          try {
            lfo.stop();
          } catch {
            /* noop */
          }
        },
      });
    };

    // Mid drones (laptop speakers struggle below ~150Hz)
    addTone(110, "sine", 0.18);
    addTone(165, "triangle", 0.12, 6);
    addTone(220, "sine", 0.1, -4);
    addTone(330, "triangle", 0.06, 3);
    addTone(440, "sine", 0.035, -8);

    // Soft noise bed (fog / static)
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 600;
    noiseFilter.Q.value = 0.6;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.045;
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);
    noise.start();
    voices.push({
      stop: () => {
        try {
          noise.stop();
        } catch {
          /* noop */
        }
      },
    });

    voicesRef.current = voices;
    setOn(true);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed right-4 bottom-4 z-50 border border-neon/40 bg-void/80 px-3 py-2 font-display text-[10px] tracking-[0.22em] uppercase text-neon backdrop-blur transition hover:bg-neon/10 md:right-6 md:bottom-6"
      aria-pressed={on}
      title={on ? "Mute ambience" : "Play ambience"}
    >
      {on ? "Sound On" : "Sound Off"}
    </button>
  );
}
