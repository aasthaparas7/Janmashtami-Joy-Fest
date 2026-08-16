import { HeartHandshake, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { SectionTitle } from "@/components/Decor";
import { EVENT, LAST_YEAR_HIGHLIGHTS, LAST_YEAR_STATS, WHY_WE_DO_THIS } from "@/lib/event";

import galleryDance from "@/assets/gallery-dance.jpg";
import galleryDiyas from "@/assets/gallery-diyas.jpg";
import galleryFamily from "@/assets/gallery-family.jpg";

const PHOTOS = [
  { src: galleryDance, alt: "Children performing on stage at last year's Janmashtami celebration" },
  { src: galleryDiyas, alt: "Lamps, garlands and peacock feather decorations from last year" },
  { src: galleryFamily, alt: "Families enjoying the festival stalls last year" },
];

/** Landing engagement band: last year's celebration in photos and numbers. */
export function LastYearHighlights() {
  return (
    <section id="last-year" className="relative bg-background py-14">
      <div aria-hidden className="mandala-bg absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-6xl px-4">
        <SectionTitle
          eyebrow="Last year's celebration"
          title="Relive the Joy of 2025"
          subtitle="Thousands of devotees, hundreds of little Krishnas and one unforgettable day of kirtan."
        />

        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {LAST_YEAR_STATS.map((s) => (
            <div key={s.label} className="gold-frame rounded-2xl bg-card p-4 text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl text-primary sm:text-4xl">{s.value}</dd>
              <p className="mt-1 text-[11px] tracking-widest text-muted-foreground uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </dl>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {PHOTOS.map((p) => (
            <figure key={p.alt} className="gold-frame overflow-hidden rounded-2xl bg-card">
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                width={1024}
                height={768}
                className="h-44 w-full object-cover sm:h-52"
              />
            </figure>
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
          title="ISKCON, Bengaluru"
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
