import { useEffect, useMemo, useState } from "react";
import feather from "@/assets/peacock-feather.png";

export function Petals({ count = 14 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 97) % 100,
        delay: (i * 1.7) % 12,
        duration: 14 + ((i * 3) % 10),
        size: 8 + ((i * 5) % 10),
        hue: i % 3,
      })),
    [count],
  );
  if (!mounted) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="animate-petal absolute top-0 rounded-full"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.7,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            background:
              p.hue === 0
                ? "var(--saffron)"
                : p.hue === 1
                  ? "var(--gold)"
                  : "color-mix(in oklab, var(--peacock) 70%, white)",
            opacity: 0.6,
            borderRadius: "60% 40% 55% 45%",
          }}
        />
      ))}
    </div>
  );
}

export function FloatingFeather({ className = "" }: { className?: string }) {
  return (
    <img
      src={feather}
      alt=""
      aria-hidden
      loading="lazy"
      width={512}
      height={1024}
      className={`animate-float-feather pointer-events-none absolute select-none opacity-70 ${className}`}
    />
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      {eyebrow ? (
        <p
          className={`text-xs font-semibold tracking-[0.3em] uppercase ${light ? "text-gold" : "text-saffron"}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-3 text-3xl leading-tight sm:text-4xl ${light ? "text-cream" : "text-primary"}`}
      >
        {title}
      </h2>
      <div className="ornate-rule mx-auto mt-5 w-48" />
      {subtitle ? (
        <p className={`mt-4 text-base ${light ? "text-cream/80" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
