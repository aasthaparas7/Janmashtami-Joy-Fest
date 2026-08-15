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

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        {/* Deity medallion — leads on mobile */}
        <div className="animate-rise relative order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-md">
          <div
            aria-hidden
            className="animate-halo absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_40%,color-mix(in_oklab,var(--gold)_60%,transparent),transparent_65%)] blur-2xl"
          />
          <div
            aria-hidden
            className="animate-slow-spin absolute -inset-4 -z-10 rounded-full border border-dashed border-gold/40"
          />
          <div className="arch-frame overflow-hidden bg-card p-2">
            <img
              src={krishnaImage}
              alt="Sri Sri Radha Krishna deities adorned with flower garlands"
              width={1024}
              height={1280}
              className="h-auto w-full rounded-[999px_999px_1.4rem_1.4rem] object-cover [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] -webkit-[mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]"
            />
          </div>
          <div className="glass-chip absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full px-5 py-2 text-center text-xs font-semibold whitespace-nowrap text-primary">
            🪈 Vrindavan comes to Bengaluru 🦚
          </div>
        </div>

        {/* Invitation lockup */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <div className="animate-rise mx-auto max-w-xl">
            <p className="text-[11px] font-semibold tracking-[0.35em] text-saffron uppercase">
              {EVENT.organiser}
            </p>
            <div className="ornate-rule mx-auto mt-4 w-44 lg:mx-0" />
            <h1 className="mt-5 text-4xl leading-[1.05] text-primary sm:text-6xl">
              Sri Krishna
              <span className="text-gold-shimmer mt-1 block">Janmashtami</span>
              <span className="mt-2 block font-serif-deco text-lg tracking-[0.45em] text-peacock sm:text-xl">
                2026
              </span>
            </h1>
            <p className="font-serif-deco mt-4 text-lg text-saffron sm:text-xl">
              Celebrate the Divine Birth of Lord Krishna
            </p>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground lg:mx-0">
              A joyful day of devotion, culture, competitions, dance, music, food, games and family
              celebrations.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              <Chip icon={<CalendarDays className="size-4" />}>{EVENT.dateLabel}</Chip>
              <Chip icon={<Clock className="size-4" />}>{EVENT.timeLabel}</Chip>
              <Chip icon={<MapPin className="size-4" />}>
                {EVENT.venueName}, {EVENT.venueAddress}
              </Chip>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
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

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild variant="gold" size="xl" className="hover-scale">
                <Link to="/register">Register for Competitions</Link>
              </Button>
              <Button asChild variant="outlineGold" size="xl">
                <a href="#schedule">View Event Schedule</a>
              </Button>
            </div>

            <div className="mt-10">
              <p className="mb-3 text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
                Celebration begins in
              </p>
              <Countdown />
            </div>
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
