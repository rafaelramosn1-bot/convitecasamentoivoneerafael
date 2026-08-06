import { useEffect, useState } from "react";

const TARGET = new Date("2026-09-26T16:00:00-03:00").getTime();

function diff() {
  const ms = Math.max(0, TARGET - Date.now());
  return {
    dias: Math.floor(ms / 86400000),
    horas: Math.floor((ms / 3600000) % 24),
    min: Math.floor((ms / 60000) % 60),
    seg: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown() {
  const [time, setTime] = useState(() => diff());

  useEffect(() => {
    const id = setInterval(() => setTime(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const items: Array<[string, number]> = [
    ["Dias", time.dias],
    ["Horas", time.horas],
    ["Min", time.min],
    ["Seg", time.seg],
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {items.map(([label, value]) => (
        <div
          key={label}
          className="rounded-2xl border border-border/70 bg-card px-1 py-4 text-center shadow-soft"
        >
          <div className="font-serif text-3xl leading-none font-semibold text-royal tabular-nums sm:text-4xl">
            {String(value).padStart(2, "0")}
          </div>
          <div className="mt-2 text-[0.6rem] tracking-[0.22em] text-muted-foreground uppercase">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
