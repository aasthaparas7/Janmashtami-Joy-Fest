import { Link } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/Countdown";
import { FloatingFeather, Petals } from "@/components/Decor";
import { EVENT } from "@/lib/event";
import krishnaImage from "@/assets/Hero_Image_Lord_Krishna_and_Radha_Ji.jpg";

function Chip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="glass-chip inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-left text-[13px] leading-snug text-foreground/85">
      <span className="text-saffron">{icon}</span>
      {children}
    </span>
  );
}

export function Hero() {
  return (
    <section id="home" className="gradient-dawn relative overflow-hidden pt-24 pb-16 sm:pt-28">
      <div aria-hidden className="mandala-bg absolute inset-0 opacity-60" />
      <Petals />
      <FloatingFeather className="top-24 -left-8 w-24 rotate-12 sm:w-32" />
      <FloatingFeather className="top-1/2 -right-6 hidden w-28 -rotate-12 lg:block" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--gold)_45%,transparent),transparent_70%)]"
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-12 px-4 text-center">
        {/* Text lockup */}
        <div className="animate-rise z-10 mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold tracking-[0.35em] text-saffron uppercase">
            {EVENT.organiser}
          </p>
          <div className="ornate-rule mx-auto mt-4 w-44" />
          <h1 className="font-display mt-5 text-6xl leading-[1.05] text-primary sm:text-7xl lg:text-[5.5rem] drop-shadow-md">
            Sri Krishna
            <span className="text-gold-shimmer mt-2 block">Janmashtami</span>
            <span className="font-serif-deco text-peacock mt-3 block text-2xl tracking-[0.45em] sm:text-3xl">
              2026
            </span>
          </h1>
          <p className="font-serif-deco mt-4 text-lg text-saffron sm:text-xl leading-relaxed">
            Celebrate the Divine Birth of Lord Krishna
            <span className="block mt-1 text-base sm:text-lg text-primary/90 font-medium">
              @ {EVENT.venueName}
            </span>
          </p>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            A joyful day of devotion, culture, competitions, dance, music, food, games and family
            celebrations.
          </p>
        </div>

        {/* Deity medallion */}
        <div className="animate-rise relative z-10 w-full max-w-md">
          <div
            aria-hidden
            className="animate-halo absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklab,var(--gold)_60%,transparent),transparent_65%)] blur-2xl"
          />
          <div
            aria-hidden
            className="animate-slow-spin absolute -inset-4 -z-10 rounded-full border border-dashed border-gold/40"
          />
          <div className="arch-frame overflow-hidden bg-card p-2 shadow-gold">
            <img
              src={krishnaImage}
              alt="Sri Sri Radha Krishna deities adorned with flower garlands"
              width={1024}
              height={1280}
              className="h-auto w-full rounded-[999px_999px_1.4rem_1.4rem] object-cover [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] -webkit-[mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]"
            />
          </div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-2.5 text-center font-serif-deco text-sm font-bold tracking-wide text-white shadow-[0_8px_30px_rgb(245,158,11/0.5)] border border-white/20">
            🪈 Vrindavan comes to Bengaluru 🦚
          </div>
        </div>

        {/* Details & Action */}
        <div className="animate-rise z-10 mx-auto w-full max-w-2xl mt-4">
          <div className="flex flex-wrap justify-center gap-2">
            <Chip icon={<CalendarDays className="size-4" />}>{EVENT.dateLabel}</Chip>
            <Chip icon={<Clock className="size-4" />}>{EVENT.timeLabel}</Chip>
          </div>

          <a 
            href="#venue"
            className="group mt-6 block mx-auto max-w-md rounded-2xl border border-gold/30 bg-card/40 p-4 backdrop-blur-sm shadow-soft transition-all hover:scale-[1.02] hover:bg-card/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <div className="flex items-center justify-center gap-4 text-left">
              <div className="flex shrink-0 items-center justify-center rounded-full bg-saffron/15 p-3 text-saffron transition-colors group-hover:bg-saffron/25">
                <MapPin className="size-6 transition-transform group-hover:scale-110" />
              </div>
              <div>
                <p className="font-serif-deco text-lg font-bold text-primary transition-colors group-hover:text-gold-deep">{EVENT.venueName}</p>
                <p className="text-sm text-muted-foreground leading-snug mt-0.5">{EVENT.venueAddress}</p>
              </div>
            </div>
          </a>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {EVENT.freeBadges.map((b) => (
              <span
                key={b}
                className="rounded-full border border-gold/60 bg-gold/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-primary uppercase"
              >
                {b}
              </span>
            ))}
            <span className="rounded-full border border-saffron/60 bg-saffron/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-saffron uppercase">
              {EVENT.cashPrizes}
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="gold" size="xl" className="hover-scale">
              <Link to="/register">Register for Competitions</Link>
            </Button>
            <Button asChild variant="outlineGold" size="xl">
              <a href="#schedule">View Event Schedule</a>
            </Button>
          </div>

          <div className="mt-12 flex flex-col items-center">
            <p className="mb-3 text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
              Celebration begins in
            </p>
            <Countdown />
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-14 max-w-2xl px-4 text-center">
        <div className="ornate-rule mx-auto w-56" />
        <p className="mt-4 text-xs text-muted-foreground">Founder Acharya: {EVENT.founder}</p>
      </div>
    </section>
  );
}
