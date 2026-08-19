import { useEffect, useState } from "react";
import {
  Check,
  Crown,
  Handshake,
  HeartHandshake,
  Phone,
  Trophy,
  Heart,
  Download,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { SectionTitle } from "@/components/Decor";
import {
  CHIEF_GUESTS,
  EVENT,
  EVENT_PARTNERS,
  SPONSOR_BENEFITS,
  SPONSOR_LOGO_SLOTS,
  SPONSOR_TIERS,
  SPONSOR_WHATSAPP,
  SPONSOR_FORM_LINK,
  DONATION_FORM_LINK,
  WINNER_CATEGORIES,
  SEVAS,
} from "@/lib/event";

import slsLogo from "@/assets/logo-partner-sls-school.jpeg";
import tumbleGymLogo from "@/assets/logo-partner-the-tumble-gym.jpeg";
import bakkusBakeryLogo from "@/assets/logo-partner-the-bakkus-bakery.png";
import sponsorPoster from "@/assets/sponsor.jpeg";
import donationQr from "@/assets/donation-qr.jpeg";
import stallArea1 from "@/assets/area-of-stall-1.jpeg";
import stallArea2 from "@/assets/area-of-stall-2.jpeg";

const LOGOS: Record<string, string> = {
  "logo-partner-sls-school.jpeg": slsLogo,
  "logo-partner-the-tumble-gym.jpeg": tumbleGymLogo,
  "logo-partner-the-bakkus-bakery.png": bakkusBakeryLogo,
  "area-of-stall-1.jpeg": stallArea1,
  "area-of-stall-2.jpeg": stallArea2,
};

export function ChiefGuest() {
  return (
    <section id="chief-guest" className="relative bg-background py-16">
      <div aria-hidden className="mandala-bg absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-5xl px-4">
        <SectionTitle
          eyebrow="Honoured presence"
          title="Chief Guest & Guests of Honour"
          subtitle="Distinguished guests will grace the stage for the prize distribution and Palaki Utsava."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {CHIEF_GUESTS.map((g) => (
            <article
              key={g.role}
              className="lift-card gold-frame rounded-3xl bg-card p-6 text-center"
            >
              <span
                aria-hidden
                className="mx-auto grid size-16 place-items-center rounded-full bg-secondary/40 ring-1 ring-gold/40"
              >
                <Crown className="size-7 text-saffron" />
              </span>
              <p className="mt-3 text-xs font-semibold tracking-widest text-primary uppercase">
                {g.role}
              </p>
              <h3 className="font-serif-deco mt-1 text-xl text-primary">{g.name}</h3>
              {g.note ? <p className="mt-2 text-sm text-muted-foreground">{g.note}</p> : null}
              {!g.announced ? (
                <span className="mt-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold tracking-widest text-primary uppercase">
                  Stay tuned
                </span>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type LiveSponsor = {
  id: string;
  name: string;
  tier: string;
  detail: string | null;
  logo_url: string | null;
  website_url: string | null;
};

export function Sponsors() {
  const [live, setLive] = useState<LiveSponsor[]>([]);

  useEffect(() => {
    let active = true;
    void supabase
      .from("sponsors")
      .select("id,name,tier,detail,logo_url,website_url")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (active && data) setLive(data as LiveSponsor[]);
      });
    return () => {
      active = false;
    };
  }, []);

  const partners = live.filter((s) => s.tier === "Event Partner");
  const filled = [
    ...live.filter((s) => s.tier !== "Event Partner"),
    ...SPONSOR_TIERS.flatMap((t) => t.sponsors).map((s) => ({
      id: s.name,
      name: s.name,
      tier: "",
      detail: s.detail ?? null,
      logo_url: null,
      website_url: s.url ?? null,
    })),
  ];
  const slots = Math.max(0, SPONSOR_LOGO_SLOTS - filled.length);

  return (
    <section id="sponsors" className="gradient-royal py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          light
          eyebrow="Partner with us"
          title="Sponsorship Opportunities"
          subtitle="Associate your brand with a grand, joyful family celebration and reach a warm, engaged audience."
        />

        <div className="gold-frame rounded-3xl bg-card p-6">
          <h3 className="text-center text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase">
            Our Sponsors
          </h3>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {filled.map((s) => (
              <li
                key={s.id}
                className="grid min-h-24 place-items-center gap-1 rounded-2xl bg-secondary/40 p-3 text-center ring-1 ring-gold/30"
              >
                {s.logo_url ? (
                  <img
                    src={s.logo_url}
                    alt={`${s.name} logo`}
                    loading="lazy"
                    className="max-h-12 w-auto object-contain"
                  />
                ) : null}
                {s.website_url ? (
                  <a
                    href={s.website_url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-primary underline-offset-2 hover:underline"
                  >
                    {s.name}
                  </a>
                ) : (
                  <span className="font-semibold text-primary">{s.name}</span>
                )}
                {s.detail ? (
                  <span className="text-xs text-muted-foreground">{s.detail}</span>
                ) : null}
              </li>
            ))}
            {Array.from({ length: slots }, (_, i) => (
              <li
                key={`slot-${i}`}
                className="grid min-h-24 place-items-center rounded-2xl border border-dashed border-gold/50 p-3 text-center"
              >
                <span className="text-sm font-semibold text-primary/70">Your Logo Here</span>
                <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
                  Sponsor slot available
                </span>
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SPONSOR_BENEFITS.map((b) => (
            <li key={b.title} className="lift-card gold-frame rounded-3xl bg-card p-5">
              <span aria-hidden className="text-2xl">
                {b.icon}
              </span>
              <h4 className="font-serif-deco mt-2 text-lg text-primary">{b.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{b.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SPONSOR_TIERS.map((t) => (
            <article
              key={t.tier}
              className={`lift-card gold-frame relative flex h-full flex-col rounded-3xl bg-card p-6 ${
                t.featured ? "ring-2 ring-gold" : ""
              }`}
            >
              {t.featured ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-saffron px-3 py-1 text-[10px] font-bold tracking-widest text-primary-foreground uppercase">
                  Most Visible
                </span>
              ) : null}
              <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                {t.badge}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span aria-hidden className="text-3xl">
                  {t.icon}
                </span>
                <h3 className="font-serif-deco text-lg text-primary">{t.tier}</h3>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{t.amount}</p>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-foreground/85">
                {t.perks.map((p) => (
                  <li key={p} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-leaf" aria-hidden />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              {t.images && t.images.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {t.images.map((img, i) => (
                    <Dialog key={img}>
                      <DialogTrigger asChild>
                        <div className="group relative cursor-zoom-in overflow-hidden rounded-xl border border-gold/30 shadow-sm aspect-video">
                          <img
                            src={LOGOS[img]}
                            alt={`${t.tier} view ${i + 1}`}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl border-0 bg-transparent p-0 shadow-none [&>button]:text-white [&>button]:bg-black/50 [&>button]:hover:bg-black/70 [&>button]:rounded-full outline-none">
                        <TransformWrapper
                          centerOnInit={true}
                          minScale={0.5}
                          maxScale={4}
                          wheel={{ step: 0.1 }}
                        >
                          <TransformComponent wrapperClass="!w-full !h-[90vh] !flex !justify-center !items-center cursor-grab active:cursor-grabbing">
                            <img
                              src={LOGOS[img]}
                              alt={`${t.tier} view ${i + 1}`}
                              className="max-h-[90vh] w-auto rounded-lg object-contain pointer-events-auto"
                            />
                          </TransformComponent>
                        </TransformWrapper>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              )}
              <Button asChild variant="gold" className="mt-5 h-11">
                <a
                  href={t.tier === "Stall Partner" ? SPONSOR_FORM_LINK : SPONSOR_WHATSAPP}
                  target="_blank"
                  rel="noreferrer"
                >
                  Become a Sponsor
                </a>
              </Button>
            </article>
          ))}
        </div>

        <div className="gold-frame mt-8 rounded-3xl bg-card p-6">
          <h3 className="font-serif-deco flex items-center justify-center gap-2 text-center text-xl text-primary">
            <Handshake className="text-leaf" aria-hidden /> Event Partners
          </h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ...EVENT_PARTNERS,
              ...partners.map((p) => ({
                name: p.name,
                role: p.detail || "Event Partner",
                logoPath: "",
              })),
            ].map((p) => (
              <li
                key={p.name}
                className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-secondary/30 p-6 text-center ring-1 ring-gold/30"
              >
                {p.logoPath && LOGOS[p.logoPath] && (
                  <img
                    src={LOGOS[p.logoPath]}
                    alt={`${p.name} Logo`}
                    className="h-24 w-auto max-w-[200px] rounded-xl object-contain mix-blend-multiply"
                  />
                )}
                <div>
                  <p className="font-semibold text-primary mt-2">{p.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="gold-frame mt-6 rounded-3xl bg-card p-6 text-center">
          <h3 className="font-serif-deco flex items-center justify-center gap-2 text-center text-xl text-primary">
            <Heart className="text-[#d6249f]" aria-hidden /> Support the Festival
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
            Your generous donations help us organize this grand celebration. You can sponsor an
            entire Seva or choose to donate any partial amount for the particular Sevas listed
            below. Every contribution makes a difference!
          </p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px] lg:items-stretch text-left">
            <div className="order-2 lg:order-1 flex flex-col gap-6">
              <ul className="text-sm text-muted-foreground flex-1 flex flex-col justify-between rounded-2xl bg-secondary/30 p-6 ring-1 ring-gold/30 min-h-[300px]">
                {[...SEVAS]
                  .sort((a, b) => b.amount - a.amount)
                  .map((seva, idx, arr) => (
                    <li
                      key={seva.name}
                      className={`flex items-baseline ${idx === arr.length - 1 ? "pt-1" : "pb-2"}`}
                    >
                      <span>
                        {seva.name}{" "}
                        {seva.description && (
                          <span className="hidden sm:inline text-muted-foreground/80">
                            ({seva.description})
                          </span>
                        )}
                      </span>
                      <span className="flex-1 mx-3 border-b-2 border-dotted border-gold/40 relative top-[-4px] opacity-60"></span>
                      <span className="font-semibold text-primary shrink-0">
                        Rs {seva.amount.toLocaleString("en-IN")}
                      </span>
                    </li>
                  ))}
              </ul>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 rounded-2xl bg-secondary/30 p-6 ring-1 ring-gold/30">
                <div className="text-center sm:text-left flex-1">
                  <p className="font-serif-deco text-xl text-primary">Scan to Donate</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Use any UPI app to scan the QR code and make your generous contribution
                    directly.
                  </p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="group relative cursor-zoom-in rounded-xl shadow-sm ring-1 ring-gold/30 p-2 bg-white">
                      <img
                        src={donationQr}
                        alt="Donate via QR Code"
                        className="w-32 h-32 md:w-36 md:h-36 object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-md border-0 bg-transparent p-0 shadow-none [&>button]:text-white [&>button]:bg-black/50 [&>button]:hover:bg-black/70 [&>button]:rounded-full outline-none">
                    <TransformWrapper
                      centerOnInit={true}
                      minScale={0.5}
                      maxScale={4}
                      wheel={{ step: 0.1 }}
                    >
                      <TransformComponent wrapperClass="!w-full !h-[80vh] !flex !justify-center !items-center cursor-grab active:cursor-grabbing">
                        <img
                          src={donationQr}
                          alt="Donate via QR Code"
                          className="max-h-[80vh] w-auto rounded-xl object-contain pointer-events-auto bg-white p-4"
                        />
                      </TransformComponent>
                    </TransformWrapper>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex flex-col items-center justify-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="group relative cursor-zoom-in overflow-hidden rounded-xl w-full max-w-[280px] shadow-md ring-1 ring-gold/30 h-full max-h-[600px]">
                    <img
                      src={sponsorPoster}
                      alt="Sponsorship Details Poster"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    {/* Gradient overlay for text contrast */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-b-xl" />

                    <div className="absolute inset-x-0 bottom-6 flex justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <Button
                        asChild
                        variant="gold"
                        size="sm"
                        className="shadow-[0_4px_24px_rgba(0,0,0,0.5)] ring-2 ring-gold/40 hover:ring-gold"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a href={sponsorPoster} download="Sri_Krishna_Janmashtami_Sponsorship.jpeg">
                          <Download className="mr-2 h-4 w-4" /> Download Poster
                        </a>
                      </Button>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl border-0 bg-transparent p-0 shadow-none [&>button]:text-white [&>button]:bg-black/50 [&>button]:hover:bg-black/70 [&>button]:rounded-full outline-none">
                  <TransformWrapper
                    centerOnInit={true}
                    minScale={0.5}
                    maxScale={4}
                    wheel={{ step: 0.1 }}
                  >
                    <TransformComponent wrapperClass="!w-full !h-[90vh] !flex !justify-center !items-center cursor-grab active:cursor-grabbing">
                      <img
                        src={sponsorPoster}
                        alt="Sponsorship Details Poster"
                        className="max-h-[90vh] w-auto rounded-lg object-contain pointer-events-auto"
                      />
                    </TransformComponent>
                  </TransformWrapper>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Button asChild variant="gold" size="xl" className="w-full text-lg sm:w-72">
              <a href={DONATION_FORM_LINK} target="_blank" rel="noreferrer">
                Donate Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const PLACES = [
  { icon: "🥇", label: "1st Place" },
  { icon: "🥈", label: "2nd Place" },
  { icon: "🥉", label: "3rd Place" },
];

export function Winners() {
  return (
    <section id="winners" className="relative bg-background py-16">
      <div aria-hidden className="mandala-bg absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4">
        <SectionTitle
          eyebrow="Relive the celebration"
          title="Winners Spotlight"
          subtitle="Our champions and cherished memories will shine here soon after the celebration on 5th September 2026."
        />
        <p className="mx-auto mb-6 flex max-w-xl items-center justify-center gap-2 rounded-full bg-secondary/40 px-4 py-2 text-center text-sm text-primary ring-1 ring-gold/30">
          <Trophy className="size-4 text-saffron" aria-hidden /> Winners will be announced after
          Prize Distribution — stay tuned!
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WINNER_CATEGORIES.map((c) => (
            <article key={c.key} className="lift-card gold-frame rounded-3xl bg-card p-5">
              <h3 className="font-serif-deco text-lg text-primary">{c.key}</h3>
              <p className="text-xs tracking-widest text-muted-foreground uppercase">{c.age}</p>
              <ul className="mt-4 space-y-2">
                {PLACES.map((p) => (
                  <li
                    key={p.label}
                    className="flex items-center justify-between gap-2 rounded-2xl bg-secondary/30 px-3 py-2 text-sm"
                  >
                    <span className="flex items-center gap-2 font-semibold text-primary">
                      <span aria-hidden>{p.icon}</span>
                      {p.label}
                    </span>
                    <span className="text-xs text-muted-foreground">To be announced</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
