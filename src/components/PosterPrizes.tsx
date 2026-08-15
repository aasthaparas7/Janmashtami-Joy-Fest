import { useState } from "react";
import { Award, BellRing, Download, FileImage, Gift, Ticket } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/Decor";
import { EVENT } from "@/lib/event";

const POSTER_PDF = "/janmashtami-2026-poster.pdf";
const POSTER_PAGES = [
  { src: "/poster/Poster_1.png", alt: "Sri Krishna Janmashtami 2026 event poster with schedule and venue" },
  { src: "/poster/Poster_2.png", alt: "Janmashtami 2026 competitions poster with categories and prizes" },
];

/** Downloadable flyer / poster with preview of both pages. */
export function PosterDownload() {
  return (
    <section id="poster" className="bg-background py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionTitle
          eyebrow="Share the invitation"
          title="Download Event Poster"
          subtitle="Save the official flyer and share it on WhatsApp with family and friends."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {POSTER_PAGES.map((p, i) => (
            <figure key={p.src} className="lift-card gold-frame overflow-hidden rounded-3xl bg-card p-3">
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="w-full rounded-2xl object-contain"
              />
              <figcaption className="mt-3 flex items-center justify-between gap-2 px-1">
                <span className="text-xs tracking-widest text-muted-foreground uppercase">
                  Page {i + 1}
                </span>
                <Button asChild variant="outlineGold" size="sm">
                  <a href={p.src} download={`janmashtami-2026-poster-${i + 1}.png`}>
                    <FileImage /> Save image
                  </a>
                </Button>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-7 text-center">
          <Button asChild variant="gold" size="xl">
            <a href={POSTER_PDF} download="Sri-Krishna-Janmashtami-2026-Poster.pdf">
              <Download /> Download full poster (PDF)
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

const PRIZE_ROWS = [
  { key: "Balgopal", age: "Up to 5 Years", detail: "Cash prizes, trophies & exciting gifts for winners in each competition" },
  { key: "Nandgopal", age: "6 – 11 Years", detail: "Cash prizes, trophies & exciting gifts for winners in each competition" },
  { key: "Nandkishore", age: "12 Years & Above", detail: "Cash prizes, trophies & exciting gifts for winners in each competition" },
];

const DANCE_PRIZES = [
  { place: "1st Prize", value: "₹8,000 + Trophy" },
  { place: "2nd Prize", value: "₹5,000 + Trophy" },
  { place: "3rd Prize", value: "₹2,000 + Trophy" },
];

/** Prize pool + free entry badges from the flyer. */
export function PrizesAndBadges() {
  return (
    <section id="prizes" className="gradient-royal py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionTitle
          light
          eyebrow="Prize Distribution · 7:30 PM"
          title="Prizes & Badges"
          subtitle={EVENT.cashPrizes + " · trophies, exciting prizes and certificates for all"}
        />

        <div className="gold-frame rounded-3xl bg-card p-6 sm:p-8">
          <div className="grid gap-3 sm:grid-cols-3">
            {EVENT.freeBadges.map((b) => (
              <div
                key={b}
                className="gold-frame flex items-center justify-center gap-2 rounded-2xl bg-secondary/40 p-4 text-center"
              >
                <Ticket className="text-leaf" />
                <span className="font-serif-deco text-lg text-primary">{b}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {PRIZE_ROWS.map((r) => (
              <article key={r.key} className="lift-card gold-frame rounded-2xl bg-muted p-5">
                <div className="gradient-gold inline-flex rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-primary uppercase">
                  {r.key}
                </div>
                <p className="font-serif-deco mt-2 text-lg text-primary">{r.age}</p>
                <p className="mt-1 text-sm text-muted-foreground">{r.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-7 rounded-2xl bg-secondary/30 p-5">
            <p className="flex items-center gap-2 font-display text-xl text-primary">
              <Gift className="text-saffron" /> Group Dance Contest
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-3">
              {DANCE_PRIZES.map((p) => (
                <li key={p.place} className="rounded-xl bg-card p-3 text-center">
                  <p className="font-serif-deco text-primary">{p.place}</p>
                  <p className="text-sm font-semibold text-saffron">{p.value}</p>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
            <Award className="text-leaf" /> Every participant receives a Certificate of Participation.
          </p>
        </div>
      </div>
    </section>
  );
}

/** WhatsApp reminder sign-up — opens a prefilled message to the helpline. */
export function WhatsAppReminder() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      toast.error("Please enter your name");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      toast.error("Enter a valid 10 digit mobile number");
      return;
    }
    const text = encodeURIComponent(
      `Hare Krishna! Please add me for Sri Krishna Janmashtami 2026 WhatsApp reminders.\nName: ${name.trim()}\nMobile: ${phone.trim()}\nEvent: 5th September 2026, SLS International Gurukul, Horamavu.`,
    );
    window.open(`https://wa.me/${EVENT.phoneIntl}?text=${text}`, "_blank", "noopener");
    toast.success("Opening WhatsApp", { description: "Send the message to confirm your reminders." });
  };

  return (
    <section id="whatsapp-reminder" className="bg-background py-16">
      <div className="mx-auto max-w-2xl px-4">
        <SectionTitle
          eyebrow="Never miss an update"
          title="WhatsApp Reminder Sign-up"
          subtitle="Get schedule, registration and Palaki Utsava reminders straight on WhatsApp."
        />
        <form onSubmit={submit} className="gold-frame rounded-3xl bg-card p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              aria-label="Your name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="min-h-11"
            />
            <Input
              aria-label="WhatsApp number"
              placeholder="10 digit WhatsApp number"
              inputMode="numeric"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              className="min-h-11"
            />
          </div>
          <Button type="submit" variant="gold" size="xl" className="mt-4 w-full">
            <BellRing /> Sign up for WhatsApp reminders
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            You will be added to the festival broadcast list. Helpline: {EVENT.phone} · {EVENT.phoneAlt}
          </p>
        </form>
      </div>
    </section>
  );
}
