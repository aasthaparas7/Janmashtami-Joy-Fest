import { Link } from "@tanstack/react-router";
import { Award, CheckCircle2, Music4, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/Decor";
import { CalendarActions } from "@/components/CalendarActions";
import { CATEGORIES, EVENT, HIGHLIGHTS, SCHEDULE } from "@/lib/event";

export function Highlights() {
  const highlightItems = [
    {
      title: "Divine Darshan",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gold mx-auto mb-3">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"/>
          <path d="M12 6C10.9 6 10 6.9 10 8C10 9.1 10.9 10 12 10C13.1 10 14 9.1 14 8C14 6.9 13.1 6 12 6Z"/>
          <path d="M16 18V16C16 13.79 14.21 12 12 12C9.79 12 8 13.79 8 16V18"/>
        </svg>
      )
    },
    {
      title: "Exciting Competitions",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gold mx-auto mb-3">
          <path d="M8 21H16"/>
          <path d="M12 17V21"/>
          <path d="M7 4H17"/>
          <path d="M4 4H7V8C7 10.76 9.24 13 12 13C14.76 13 17 10.76 17 8V4H20"/>
          <path d="M4 4V8C4 9.66 5.34 11 7 11"/>
          <path d="M20 4V8C20 9.66 18.66 11 17 11"/>
        </svg>
      )
    },
    {
      title: "Cultural Programs",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gold mx-auto mb-3">
          <path d="M12 2L15 8H21L16.5 12.5L18 19L12 15.5L6 19L7.5 12.5L3 8H9L12 2Z"/>
        </svg>
      )
    },
    {
      title: "Music & Dance",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gold mx-auto mb-3">
          <path d="M9 18V5L21 3V16"/>
          <path d="M12 12L21 10"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
      )
    },
    {
      title: "Free Prasad",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gold mx-auto mb-3">
          <path d="M2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12H2Z"/>
          <path d="M12 2C12 2 15 5 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 5 12 2 12 2Z"/>
          <path d="M7 12L7.5 9"/>
          <path d="M17 12L16.5 9"/>
        </svg>
      )
    },
    {
      title: "Fun for Everyone",
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gold mx-auto mb-3">
          <path d="M16 21V19C16 16.79 14.21 15 12 15C9.79 15 8 16.79 8 19V21"/>
          <circle cx="12" cy="7" r="4"/>
          <path d="M22 21V19C22 17.9 21.1 17 20 17"/>
          <circle cx="20" cy="9" r="3"/>
          <path d="M2 21V19C2 17.9 2.9 17 4 17"/>
          <circle cx="4" cy="9" r="3"/>
        </svg>
      )
    }
  ];

  return (
    <section id="highlights" className="relative bg-background py-8 pb-20">
      <div className="mx-auto max-w-7xl px-4 text-center">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-10 bg-gold/50" />
          <div className="flex gap-1">
             <div className="h-1.5 w-1.5 rotate-45 bg-gold" />
             <div className="h-1.5 w-1.5 rotate-45 bg-gold" />
          </div>
          <h2 className="font-serif-deco text-3xl sm:text-4xl text-foreground font-medium">
            Event Highlights
          </h2>
          <div className="flex gap-1">
             <div className="h-1.5 w-1.5 rotate-45 bg-gold" />
             <div className="h-1.5 w-1.5 rotate-45 bg-gold" />
          </div>
          <div className="h-px w-10 bg-gold/50" />
        </div>

        {/* Grid */}
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {highlightItems.map((h) => (
            <li key={h.title}>
              <article className="h-full flex flex-col items-center justify-center rounded-2xl bg-white border border-gold/10 p-6 shadow-sm hover:shadow-md transition-shadow">
                {h.icon}
                <h3 className="text-sm font-semibold text-foreground mt-2">
                  {h.title}
                </h3>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}


export function Schedule() {
  return (
    <section id="schedule" className="gradient-royal relative overflow-hidden py-16">
      <div className="mx-auto max-w-4xl px-4">
        <SectionTitle
          light
          eyebrow="10:00 AM – 9:00 PM"
          title="Celebration Schedule"
          subtitle="Saturday, 5th September 2026 · SLS International Gurukul"
        />
        <ol className="relative ml-4 space-y-5 border-l border-gold/40 pl-6 sm:ml-0">
          {SCHEDULE.map((s) => (
            <li key={s.title} className="relative">
              <span className="gradient-gold absolute top-4 -left-[31px] size-3 rounded-full ring-4 ring-primary/40" />
              <div className="gold-frame rounded-2xl bg-card/95 p-4 sm:flex sm:items-center sm:gap-6">
                <div className="font-display text-lg whitespace-nowrap text-saffron sm:w-44">
                  {s.time}
                </div>
                <div>
                  <h3 className="font-serif-deco text-lg text-primary">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.note}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-center text-sm text-cream/85">Event concludes at 9:00 PM</p>
        <CalendarActions />
      </div>
    </section>
  );
}

export function Competitions() {
  return (
    <section id="competitions" className="bg-background py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          eyebrow="10:00 AM – 2:00 PM"
          title="Krishna Janmashtami Competitions"
          subtitle={`Registration deadline: ${EVENT.deadline} · Participation fee: ${EVENT.fee}`}
        />

        <div className="grid gap-5 md:grid-cols-3">
          {CATEGORIES.map((c) => (
            <article key={c.key} className="lift-card gold-frame rounded-3xl bg-card p-6">
              <div className="gradient-gold inline-flex rounded-full px-4 py-1 text-xs font-bold tracking-widest text-primary uppercase">
                {c.key}
              </div>
              <p className="font-serif-deco mt-3 text-xl text-primary">{c.age}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {c.competitions.map((x) => (
                  <li key={x} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-leaf" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="gold-frame mt-8 rounded-3xl bg-secondary/40 p-6 text-center">
          <p className="flex items-center justify-center gap-2 font-display text-2xl text-primary">
            <Trophy className="text-saffron" /> Cash Prizes Worth ₹25,000
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Registration fee of ₹150 for competition to be paid on the spot.
          </p>
          <Button asChild variant="gold" size="xl" className="mt-5">
            <Link to="/register">Register for Competition</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function GroupDance() {
  const prizes = [
    { icon: "🥇", place: "1st Prize", value: "₹8,000 + Trophy" },
    { icon: "🥈", place: "2nd Prize", value: "₹5,000 + Trophy" },
    { icon: "🥉", place: "3rd Prize", value: "₹2,000 + Trophy" },
  ];
  return (
    <section id="group-dance" className="gradient-royal py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionTitle
          light
          eyebrow="5:00 PM – 7:00 PM"
          title="Krishna Janmashtami Group Dance Contest"
          subtitle="Theme Based on Lord Krishna"
        />

        <div className="gold-frame rounded-3xl bg-card p-6 sm:p-8">
          <p className="text-center text-muted-foreground">
            Bring your team along and celebrate the divine spirit of Lord Krishna through music,
            dance and storytelling.
          </p>

          <div className="mt-6 grid gap-3 text-center text-sm sm:grid-cols-3">
            <div className="rounded-2xl bg-muted p-3">
              <p className="text-xs tracking-widest text-muted-foreground uppercase">Date</p>
              <p className="font-semibold text-primary">5th September 2026</p>
            </div>
            <div className="rounded-2xl bg-muted p-3">
              <p className="text-xs tracking-widest text-muted-foreground uppercase">Time</p>
              <p className="font-semibold text-primary">5:00 PM – 7:00 PM</p>
            </div>
            <div className="rounded-2xl bg-muted p-3">
              <p className="text-xs tracking-widest text-muted-foreground uppercase">Venue</p>
              <p className="font-semibold text-primary">SLS International Gurukul</p>
            </div>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {prizes.map((p) => (
              <div key={p.place} className="lift-card gold-frame rounded-2xl bg-secondary/30 p-5 text-center">
                <div className="text-3xl">{p.icon}</div>
                <p className="font-serif-deco mt-1 text-lg text-primary">{p.place}</p>
                <p className="text-sm font-semibold text-saffron">{p.value}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
            <Award className="text-leaf" /> All participants will receive Certificates of
            Participation.
          </p>
          <p className="mt-2 text-center text-sm font-medium text-primary">
            Registration Deadline: {EVENT.deadline}
          </p>

          <div className="mt-6 text-center">
            <Button asChild variant="royal" size="xl">
              <Link to="/register" search={{ tab: "dance" }}>
                <Music4 /> Register for Group Dance Contest
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
