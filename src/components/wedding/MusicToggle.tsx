import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";

type Ambient = {
  ctx: AudioContext;
  gain: GainNode;
  stop: () => void;
};

const CHORD = [261.63, 329.63, 392.0, 493.88, 587.33];

function createAmbient(): Ambient {
  const Ctor: typeof AudioContext =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctor();
  const gain = ctx.createGain();
  gain.gain.value = 0;
  gain.connect(ctx.destination);

  const oscillators = CHORD.map((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = i % 2 === 0 ? "sine" : "triangle";
    osc.frequency.value = freq;

    const voice = ctx.createGain();
    voice.gain.value = 0.06 / (i + 1);

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05 + i * 0.017;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.045 / (i + 1);
    lfo.connect(lfoGain).connect(voice.gain);

    osc.connect(voice).connect(gain);
    osc.start();
    lfo.start();
    return [osc, lfo] as const;
  });

  return {
    ctx,
    gain,
    stop: () => {
      oscillators.flat().forEach((o) => o.stop());
      void ctx.close();
    },
  };
}

export function MusicToggle() {
  const ambient = useRef<Ambient | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => () => ambient.current?.stop(), []);

  const toggle = async () => {
    if (playing) {
      const a = ambient.current;
      if (a) {
        a.gain.gain.linearRampToValueAtTime(0, a.ctx.currentTime + 0.6);
        setTimeout(() => a.ctx.suspend(), 700);
      }
      setPlaying(false);
      return;
    }
    if (!ambient.current) ambient.current = createAmbient();
    const a = ambient.current;
    await a.ctx.resume();
    a.gain.gain.cancelScheduledValues(a.ctx.currentTime);
    a.gain.gain.linearRampToValueAtTime(0.5, a.ctx.currentTime + 1.5);
    setPlaying(true);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pausar música ambiente" : "Tocar música ambiente"}
      className="fixed right-4 bottom-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-border/60 bg-card/90 text-primary shadow-glow backdrop-blur transition-transform hover:scale-105 active:scale-95"
    >
      {playing ? <Pause className="h-5 w-5" /> : <Music className="h-5 w-5" />}
    </button>
  );
}
