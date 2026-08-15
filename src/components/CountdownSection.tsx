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

const PeacockFeatherDecoration = ({ className }: { className?: string }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M42.2789 5.86799C37.0518 0.640944 26.5492 0.320494 15.6324 11.2372C7.30691 19.5627 0.985955 31.4284 3.01633 33.4587C5.04671 35.4891 16.9124 29.1682 25.2379 20.8427C36.1546 9.92594 35.8341 -0.576593 42.2789 5.86799Z" fill="#138942"/>
    <path d="M29.5621 17.5186C32.9052 14.1755 34.6186 9.53988 34.708 4.70773C30.6558 7.37703 27.2405 11.082 24.8149 15.5184C27.0906 15.8601 28.5372 16.6575 29.5621 17.5186Z" fill="#88D148"/>
    <circle cx="21.5" cy="24.5" r="5" transform="rotate(-45 21.5 24.5)" fill="#0B407B"/>
    <circle cx="21.5" cy="24.5" r="2.5" transform="rotate(-45 21.5 24.5)" fill="#319CD6"/>
    <path d="M4.6543 42.6377L15.9679 31.3241" stroke="#A8823A" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export function CountdownSection() {
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
    <section className="relative z-20 mx-auto -mt-20 max-w-5xl px-4 sm:-mt-24 pb-16">
      <div className="flex flex-col items-center justify-center">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-12 bg-gold/50" />
          <div className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <h2 className="text-xs font-bold tracking-[0.3em] text-foreground uppercase">
            Celebration begins in
          </h2>
          <div className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <div className="h-px w-12 bg-gold/50" />
        </div>

        {/* Timer Boxes with Feathers */}
        <div className="flex items-center gap-4 sm:gap-8">
          <PeacockFeatherDecoration className="hidden sm:block scale-x-[-1] opacity-90 transform -rotate-12" />
          
          <div className="flex gap-2 sm:gap-6">
            {units.map(([label, value]) => (
              <div
                key={label}
                className="bg-white border border-gold/20 shadow-lg rounded-2xl w-16 h-20 sm:w-24 sm:h-28 flex flex-col items-center justify-center"
              >
                <div className="font-serif-deco text-2xl text-foreground tabular-nums sm:text-4xl">
                  {t ? String(value).padStart(2, "0") : "--"}
                </div>
                <div className="mt-1 text-[8px] tracking-[0.2em] text-foreground/60 uppercase sm:text-[10px] font-semibold">
                  {label}
                </div>
              </div>
            ))}
          </div>

          <PeacockFeatherDecoration className="hidden sm:block opacity-90 transform rotate-12" />
        </div>
      </div>
    </section>
  );
}
