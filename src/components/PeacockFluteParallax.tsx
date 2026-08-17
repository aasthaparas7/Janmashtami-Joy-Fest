import { useEffect, useRef, useState } from "react";
import flute from "@/assets/krishna-flute.png";
import feather from "@/assets/peacock-feather.png";

/**
 * Peacock & flute parallax band — layered decorative artwork that drifts
 * at different speeds as the section scrolls through the viewport.
 * Fully decorative; disabled for users who prefer reduced motion.
 */
export function PeacockFluteParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    setMotion(true);

    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = window.innerHeight + rect.height;
      const progress = (window.innerHeight - rect.top) / total;
      setP(Math.min(1, Math.max(0, progress)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const shift = (depth: number) => (motion ? (p - 0.5) * depth : 0);

  return (
    <section
      ref={ref}
      aria-label="Krishna's flute and peacock feathers"
      className="gradient-royal relative isolate overflow-hidden py-20 sm:py-28"
    >
      <div aria-hidden className="mandala-bg absolute inset-0 opacity-40" />

      {/* far layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ transform: `translate3d(0, ${shift(-70)}px, 0)` }}
      >
        <div className="absolute top-6 left-1/2 size-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_45%,transparent),transparent_70%)] blur-2xl" />
      </div>

      {/* feathers */}
      <img
        src={feather}
        alt=""
        aria-hidden
        loading="lazy"
        width={512}
        height={1024}
        className="pointer-events-none absolute -top-6 -left-10 w-28 rotate-[18deg] opacity-70 sm:w-40"
        style={{ transform: `translate3d(0, ${shift(120)}px, 0) rotate(18deg)` }}
      />
      <img
        src={feather}
        alt=""
        aria-hidden
        loading="lazy"
        width={512}
        height={1024}
        className="pointer-events-none absolute -right-12 -bottom-10 w-32 -rotate-[24deg] opacity-60 sm:w-48"
        style={{ transform: `translate3d(0, ${shift(-140)}px, 0) rotate(-24deg)` }}
      />

      {/* flute */}
      <img
        src={flute}
        alt=""
        aria-hidden
        loading="lazy"
        width={1536}
        height={512}
        className="pointer-events-none absolute inset-x-0 top-1/2 mx-auto w-[130%] max-w-none -translate-y-1/2 rotate-[-8deg] opacity-90 sm:w-[90%]"
        style={{ transform: `translate3d(0, calc(-50% + ${shift(60)}px), 0) rotate(-8deg)` }}
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <div className="rounded-[2rem] bg-primary/75 px-5 py-8 ring-1 ring-gold/40 backdrop-blur-sm sm:px-10">
          <p className="text-[11px] font-semibold tracking-[0.35em] text-gold uppercase">
            The call of the flute
          </p>
          <h2 className="mt-4 text-3xl leading-tight text-cream sm:text-5xl">
            Wherever the flute is heard,
            <span className="text-gold-shimmer block">hearts begin to dance</span>
          </h2>
          <div className="ornate-rule mx-auto mt-6 w-48" />
          <p className="mt-6 text-sm text-cream sm:text-base">
            Peacock feathers, butter pots and Vrindavan melodies — a full day of Krishna
            consciousness for every family.
          </p>
        </div>
      </div>
    </section>
  );
}
