import { Link } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin, Feather } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Countdown } from "@/components/Countdown";
import { EVENT } from "@/lib/event";
import krishnaHero from "@/assets/krishna_hero.jpg";
import lotusFlowers from "@/assets/lotus_flowers.jpg";
import hangingBells from "@/assets/hanging_bells.jpg";

function Chip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-background/50 px-4 py-2 text-[13px] font-medium text-foreground shadow-sm">
      <span className="text-gold">{icon}</span>
      {children}
    </span>
  );
}

const PeacockFeatherIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block transform -rotate-12 translate-y-2">
    <path d="M42.2789 5.86799C37.0518 0.640944 26.5492 0.320494 15.6324 11.2372C7.30691 19.5627 0.985955 31.4284 3.01633 33.4587C5.04671 35.4891 16.9124 29.1682 25.2379 20.8427C36.1546 9.92594 35.8341 -0.576593 42.2789 5.86799Z" fill="#138942"/>
    <path d="M29.5621 17.5186C32.9052 14.1755 34.6186 9.53988 34.708 4.70773C30.6558 7.37703 27.2405 11.082 24.8149 15.5184C27.0906 15.8601 28.5372 16.6575 29.5621 17.5186Z" fill="#88D148"/>
    <circle cx="21.5" cy="24.5" r="5" transform="rotate(-45 21.5 24.5)" fill="#0B407B"/>
    <circle cx="21.5" cy="24.5" r="2.5" transform="rotate(-45 21.5 24.5)" fill="#319CD6"/>
    <path d="M4.6543 42.6377L15.9679 31.3241" stroke="#A8823A" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-background pt-32 pb-24 sm:pt-40 sm:pb-32 min-h-dvh flex flex-col items-center justify-center">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--gold)_0%,transparent_100%)] opacity-[0.03] pointer-events-none" />
      
      {/* Top Corners: Hanging Bells */}
      <img src={hangingBells} alt="" className="absolute top-0 left-0 w-32 object-contain mix-blend-multiply opacity-80 pointer-events-none" />
      <img src={hangingBells} alt="" className="absolute top-0 right-0 w-32 object-contain mix-blend-multiply opacity-80 scale-x-[-1] pointer-events-none" />

      {/* Bottom Corners: Lotus Flowers */}
      <img src={lotusFlowers} alt="" className="absolute bottom-0 left-0 w-64 object-contain mix-blend-multiply opacity-90 pointer-events-none" />
      <img src={lotusFlowers} alt="" className="absolute bottom-0 right-0 w-64 object-contain mix-blend-multiply opacity-90 scale-x-[-1] pointer-events-none" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center w-full z-10">
        
        {/* Left Side: Invitation Lockup */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <div className="animate-rise mx-auto max-w-2xl lg:mx-0">
            <p className="text-[11px] font-bold tracking-[0.25em] text-gold uppercase mb-6">
              ISKCON HBR LAYOUT BENGALURU INVITES YOU TO
            </p>
            
            <h1 className="font-serif-deco text-5xl leading-[1.1] text-foreground sm:text-7xl">
              Sri Krishna
              <br />
              <span className="text-gold inline-flex items-center gap-3">
                Janmashtami
                <PeacockFeatherIcon />
              </span>
            </h1>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4">
              <div className="h-px w-8 bg-gold" />
              <span className="font-serif-deco text-xl tracking-[0.3em] text-foreground">
                2026
              </span>
              <div className="h-px w-8 bg-gold" />
            </div>

            <p className="font-serif-deco mt-6 text-2xl text-foreground sm:text-3xl font-medium">
              Celebrate the Divine Birth of Lord Krishna
            </p>
            <p className="mt-4 max-w-xl text-lg text-foreground/75 mx-auto lg:mx-0 leading-relaxed">
              A joyful day of devotion, culture, competitions, dance, music, food, games and family celebrations.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Chip icon={<CalendarDays className="size-4" />}>Saturday, {EVENT.dateLabel}</Chip>
              <Chip icon={<Clock className="size-4" />}>{EVENT.timeLabel}</Chip>
            </div>
            
            <div className="mt-3 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Chip icon={<MapPin className="size-4" />}>
                {EVENT.venueName}, {EVENT.venueAddress}
              </Chip>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              {EVENT.freeBadges.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-green-600/20 bg-green-50 px-4 py-1.5 text-xs font-bold tracking-wider text-green-700 uppercase"
                >
                  {b}
                </span>
              ))}
              <span className="rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-bold tracking-wider text-gold uppercase shadow-sm">
                {EVENT.cashPrizes}
              </span>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button asChild variant="gold" size="xl" className="rounded-full text-base font-semibold px-8 shadow-gold hover:-translate-y-1 transition-transform">
                <Link to="/register">Register for Competitions</Link>
              </Button>
              <Button asChild variant="outlineGold" size="xl" className="rounded-full text-base font-semibold px-8 bg-white hover:-translate-y-1 transition-transform">
                <a href="#schedule">
                  <CalendarDays className="mr-2 size-5" />
                  View Event Schedule
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side: Deity Arch */}
        <div className="animate-rise relative order-1 mx-auto w-full max-w-lg lg:order-2">
          {/* Quote block */}
          <div className="hidden lg:block absolute -right-8 top-1/4 z-20 w-48 rounded-xl bg-white/90 p-4 shadow-lg backdrop-blur text-center border border-gold/20">
            <p className="font-serif-deco text-xs leading-relaxed text-foreground/80 italic">
              "Whenever there is a decline in righteousness and an increase in unrighteousness, I manifest Myself."
            </p>
            <p className="mt-2 text-[9px] font-bold text-gold uppercase tracking-wider">- Bhagavad Gita 4.7</p>
          </div>

          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-full border-8 border-white shadow-2xl">
            <img
              src={krishnaHero}
              alt="Baby Lord Krishna"
              className="h-full w-full object-cover"
            />
            {/* Arch decorative inner border */}
            <div className="absolute inset-0 rounded-t-full border-[12px] border-gold/10 pointer-events-none" />
            <div className="absolute inset-0 rounded-t-full border-[2px] border-gold/40 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator or spacing before countdown */}
      <div className="w-full h-16"></div>
    </section>
  );
}
