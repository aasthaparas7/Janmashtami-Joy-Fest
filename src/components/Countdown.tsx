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
          className="gold-frame lift-card relative overflow-hidden rounded-2xl bg-card/90 px-1 py-3 text-center backdrop-blur-sm sm:px-3 sm:py-4"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
          />
          <div className="font-display text-2xl text-primary tabular-nums sm:text-4xl">
            {t ? String(value).padStart(2, "0") : "--"}
          </div>
          <div className="mt-1 text-[10px] tracking-widest text-muted-foreground uppercase sm:text-xs">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

