import { useEffect, useState } from "react";
import { EVENT } from "@/lib/event";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

export function Countdown() {
  const target = new Date(EVENT.targetDate).getTime();
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: Array<[string, number]> = [
    ["Days", t?.days ?? 0],
    ["Hours", t?.hours ?? 0],
    ["Minutes", t?.minutes ?? 0],
    ["Seconds", t?.seconds ?? 0],
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {units.map(([label, value]) => (
        <div
          key={label}
          className="border border-gold/40 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.1)] lift-card relative overflow-hidden rounded-2xl px-1 py-3 text-center sm:px-3 sm:py-4"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-50"
          />
          <div className="font-display text-2xl text-primary tabular-nums sm:text-4xl drop-shadow-md">
            {t ? String(value).padStart(2, "0") : "--"}
          </div>
          <div className="mt-1 text-[10px] tracking-widest text-primary/70 uppercase sm:text-xs font-semibold">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

