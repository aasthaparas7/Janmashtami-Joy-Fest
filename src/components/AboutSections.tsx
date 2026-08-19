import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { HeartHandshake, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { SectionTitle } from "@/components/Decor";
import { EVENT, LAST_YEAR_HIGHLIGHTS, LAST_YEAR_STATS, WHY_WE_DO_THIS } from "@/lib/event";

import gallery1 from "@/assets/gallery-1.png";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.png";
import gallery4 from "@/assets/gallery-4.png";
import gallery5 from "@/assets/gallery-5.png";

const PHOTOS = [
  { src: gallery1, alt: "Joyful Janmashtami celebration moments" },
  { src: gallery2, alt: "Devotees participating in the festival" },
  { src: gallery3, alt: "Beautifully decorated temple spaces" },
  { src: gallery4, alt: "Children dressed as Krishna and Radha" },
  { src: gallery5, alt: "Cultural performances and celebrations" },
];

function CountingNumber({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const numStr = value.replace(/[^0-9]/g, "");
  const suffix = value.replace(/[0-9,]/g, "");
  const target = parseInt(numStr, 10);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || isNaN(target)) {
      setCount(0);
      return;
    }

    const duration = 2000;
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCount(Math.floor(easeProgress * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, target]);

  if (isNaN(target)) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

/** Landing engagement band: last year's celebration in photos and numbers. */
export function LastYearHighlights() {
  return (
    <section id="last-year" className="relative bg-background py-14">
      <div aria-hidden className="mandala-bg absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-6xl px-4">
        <SectionTitle
          eyebrow="Last year's celebration"
          title="Glimpses of Joy"
          subtitle="Thousands of devotees, hundreds of little Krishnas and one unforgettable day of kirtan."
        />

        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {LAST_YEAR_STATS.map((s) => (
            <div key={s.label} className="gold-frame rounded-2xl bg-card p-4 text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl text-primary sm:text-4xl">
                <CountingNumber value={s.value} />
              </dd>
              <p className="mt-1 text-[11px] tracking-widest text-muted-foreground uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </dl>

        <div className="mt-6 grid gap-3 grid-cols-2 sm:grid-cols-6">
          {PHOTOS.map((p, idx) => (
            <Dialog key={p.src}>
              <DialogTrigger asChild>
                <figure
                  className={`gold-frame group cursor-zoom-in relative overflow-hidden rounded-2xl bg-card ${
                    idx < 2 ? "col-span-2 sm:col-span-3" : "col-span-2 sm:col-span-2 md:col-span-2"
                  }`}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-44 w-full object-cover sm:h-52 transition-transform duration-500 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {p.alt}
                  </figcaption>
                </figure>
              </DialogTrigger>
              <DialogContent className="max-w-5xl border-0 bg-transparent p-0 shadow-none outline-none [&>button]:rounded-full [&>button]:bg-black/50 [&>button]:text-white [&>button]:hover:bg-black/70">
                <TransformWrapper
                  centerOnInit={true}
                  minScale={0.5}
                  maxScale={4}
                  wheel={{ step: 0.1 }}
                >
                  <TransformComponent wrapperClass="!flex !h-[90vh] !w-full !items-center !justify-center cursor-grab active:cursor-grabbing">
                    <img
                      src={p.src}
                      alt={p.alt}
                      className="pointer-events-auto max-h-[90vh] w-auto rounded-lg object-contain"
                    />
                  </TransformComponent>
                </TransformWrapper>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <ul className="mt-6 grid gap-2 sm:grid-cols-3">
          {LAST_YEAR_HIGHLIGHTS.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 rounded-2xl bg-secondary/25 p-3 text-sm text-muted-foreground"
            >
              <Sparkles className="mt-0.5 size-4 shrink-0 text-saffron" aria-hidden />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 text-center">
          <Button asChild variant="gold" size="xl">
            <Link to="/register">Be part of 2026 — Register now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Who we are and why we host this festival. */
export function WhoWeAre() {
  return (
    <section id="about" className="gradient-royal py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionTitle
          light
          eyebrow="Who we are"
          title="ISKCON"
          subtitle="A community of families serving Sri Krishna in Horamavu and around."
        />

        <div className="gold-frame rounded-3xl bg-card p-6 sm:p-8">
          <p className="flex items-start gap-3 text-muted-foreground">
            <Users className="mt-1 shrink-0 text-saffron" aria-hidden />
            <span>
              We are a devotee community under the International Society for Krishna Consciousness,
              founded by {EVENT.founder}. Through weekly bhajans, Bhagavad Gita classes, youth and
              children's programs and festival celebrations, we bring the culture of Vrindavan to
              families in Bengaluru.
            </span>
          </p>

          <h3 className="font-serif-deco mt-8 text-xl text-primary">Why we host this festival</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {WHY_WE_DO_THIS.map((w) => (
              <li key={w.title} className="rounded-2xl bg-secondary/25 p-4">
                <p className="flex items-center gap-2 font-semibold text-primary">
                  <HeartHandshake className="size-4 text-leaf" aria-hidden /> {w.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
