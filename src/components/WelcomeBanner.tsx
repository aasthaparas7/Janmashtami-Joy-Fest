import { useState, useEffect } from "react";
import bannerImage from "@/assets/banner.jpeg";
import { EVENT } from "@/lib/event";
import { getTimeDiff } from "@/lib/utils";

function GlassCountdown() {
  const target = new Date(EVENT.targetDate).getTime();
  const [t, setT] = useState(() => getTimeDiff(target));

  useEffect(() => {
    const id = setInterval(() => setT(getTimeDiff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    {
      label: "DAYS",
      value: t.days,
      glow: "from-orange-500 to-amber-500",
      border: "border-orange-400/60",
    },
    {
      label: "HOURS",
      value: t.hours,
      glow: "from-teal-600 to-cyan-600",
      border: "border-teal-400/60",
      bg: "bg-teal-950/40",
    },
    {
      label: "MINUTES",
      value: t.minutes,
      glow: "from-cyan-400 to-blue-500",
      border: "border-cyan-400/60",
    },
    {
      label: "SECONDS",
      value: t.seconds,
      glow: "from-orange-400 to-rose-500",
      border: "border-orange-400/60",
    },
  ];

  return (
    <div className="mt-6 flex flex-col items-center gap-4">
      <div className="relative p-1 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        <div className="flex gap-2 sm:gap-4 p-3 sm:p-5">
          {units.map(({ label, value, glow, border, bg }) => (
            <div key={label} className="relative group">
              <div
                className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${glow} opacity-60 blur-md animate-pulse`}
              ></div>
              <div
                className={`relative flex flex-col items-center justify-center w-16 h-20 sm:w-20 sm:h-28 ${bg || "bg-white/10"} backdrop-blur-md border ${border} rounded-2xl shadow-inner`}
              >
                <span className="text-2xl sm:text-4xl font-black text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] tabular-nums tracking-tighter">
                  {String(value).padStart(2, "0")}
                </span>
                <span className="mt-1 sm:mt-2 text-[8px] sm:text-[10px] font-bold tracking-widest text-white uppercase">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs sm:text-sm font-medium tracking-[0.2em] text-white/90 uppercase drop-shadow-md">
        Until the Grand Celebration
      </p>
    </div>
  );
}

export function WelcomeBanner() {
  const [show, setShow] = useState(true);
  const [isExploding, setIsExploding] = useState(false);
  const [isPressing, setIsPressing] = useState(false);

  useEffect(() => {
    if (isPressing || isExploding) return;

    // Start disappearing after 3 seconds if not pressing
    const timer1 = setTimeout(() => {
      setIsExploding(true);
    }, 3000);

    return () => clearTimeout(timer1);
  }, [isPressing, isExploding]);

  useEffect(() => {
    if (!isExploding) return;

    // Completely remove from DOM after animation completes
    const timer2 = setTimeout(() => {
      setShow(false);
    }, 1000);

    return () => clearTimeout(timer2);
  }, [isExploding]);

  if (!show) return null;

  return (
    <div
      onMouseDown={() => setIsPressing(true)}
      onMouseUp={() => setIsPressing(false)}
      onMouseLeave={() => setIsPressing(false)}
      onTouchStart={() => setIsPressing(true)}
      onTouchEnd={() => setIsPressing(false)}
      onTouchCancel={() => setIsPressing(false)}
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-colors duration-1000 select-none ${
        isExploding ? "bg-black/0 pointer-events-none" : "bg-black/80 backdrop-blur-sm"
      }`}
    >
      <div
        className={`relative transition-all duration-1000 flex flex-col items-center ${
          isExploding ? "scale-110 opacity-0 blur-md" : "scale-100 opacity-100 blur-0"
        }`}
      >
        <img
          src={bannerImage}
          alt="Welcome Banner"
          className="max-h-[55vh] max-w-[90vw] object-contain rounded-2xl shadow-[0_0_50px_rgba(255,215,0,0.3)] ring-1 ring-gold/50"
        />

        <GlassCountdown />

        {/* Particles */}
        {isExploding && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 60 }).map((_, i) => {
              const angle = Math.random() * 360;
              const velocity = 50 + Math.random() * 400; // random distance
              const tx = Math.cos((angle * Math.PI) / 180) * velocity;
              const ty = Math.sin((angle * Math.PI) / 180) * velocity;
              const colors = ["bg-gold", "bg-saffron", "bg-leaf", "bg-[#d6249f]", "bg-primary"];
              const color = colors[Math.floor(Math.random() * colors.length)];
              const size = 4 + Math.random() * 8;

              return (
                <div
                  key={i}
                  className={`absolute left-1/2 top-1/2 rounded-full ${color}`}
                  style={
                    {
                      width: `${size}px`,
                      height: `${size}px`,
                      animation: `particle-explode 1s ease-out forwards`,
                      "--tx": `${tx}px`,
                      "--ty": `${ty}px`,
                    } as React.CSSProperties
                  }
                />
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes particle-explode {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
