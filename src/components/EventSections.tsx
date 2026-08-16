import { Link } from "@tanstack/react-router";
import { Award, CheckCircle2, Music4, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/Decor";
import { CalendarActions } from "@/components/CalendarActions";
import { CATEGORIES, EVENT, HIGHLIGHTS, SCHEDULE } from "@/lib/event";

export function Highlights() {
  return (
    <section id="highlights" className="relative bg-background py-16">
      <div aria-hidden className="mandala-bg absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4">
        <SectionTitle
          eyebrow="What awaits you"
          title="Program Highlights"
          subtitle="A full day of devotion, culture and family joy — from the morning competitions to the closing kirtan."
        />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 [&>li:last-child:nth-child(3n+1)]:lg:col-start-2">
          {HIGHLIGHTS.map((h) => (
            <li key={h.title}>
              <article className="lift-card gold-frame group relative h-full overflow-hidden rounded-3xl bg-card p-5 pl-6">
                <span
                  aria-hidden
                  className="gradient-gold absolute inset-y-0 left-0 w-1.5"
                />
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="grid size-14 shrink-0 place-items-center rounded-2xl bg-secondary/40 text-3xl ring-1 ring-gold/40 transition-transform duration-300 group-hover:scale-110"
                  >
                    {h.icon}
                  </span>
                  <div className="min-w-0">
                    <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold tracking-widest text-primary uppercase">
                      {h.time}
                    </span>
                    <h3 className="font-serif-deco mt-2 text-lg leading-tight text-primary">
                      {h.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{h.text}</p>
                  </div>
                </div>
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
