import { useEffect, useState } from "react";
import {
  Copy,
  Download,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Share2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/Decor";
import {
  EVENT,
  FAQS,
  INSTRUCTIONS,
  MAPS_DIRECTIONS,
  MAPS_EMBED,
  MAPS_QUERY,
  WHATSAPP_LINK,
} from "@/lib/event";

import galleryDance from "@/assets/gallery-dance.jpg";
import galleryDiyas from "@/assets/gallery-diyas.jpg";
import galleryFamily from "@/assets/gallery-family.jpg";
import krishnaImage from "@/assets/Hero_Image_Lord_Krishna_and_Radha_Ji.jpg";

const SHARE_TEXT =
  "Sri Krishna Janmashtami 2026 · ISKCON Bengaluru · 5th September 2026 at SLS International Gurukul, Horamavu.";

function useShareUrl() {
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(window.location.origin), []);
  return url;
}

export function WhatsAppSection() {
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=440x440&data=${encodeURIComponent(WHATSAPP_LINK)}`;
  const copyLink = async () => {
    await navigator.clipboard.writeText(WHATSAPP_LINK);
    toast.success("WhatsApp invite link copied!");
  };
  return (
    <section id="whatsapp" className="bg-background py-14">
      <div className="mx-auto max-w-3xl px-4">
        <div className="gold-frame rounded-3xl bg-secondary/30 p-6 text-center sm:p-8">
          <p className="font-serif-deco text-xs tracking-[0.3em] text-saffron uppercase">
            Stay updated
          </p>
          <h2 className="mt-2 text-2xl text-primary sm:text-3xl">Join WhatsApp Group</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Scan the QR code with your phone camera to join the group for schedules, competition
            updates and announcements.
          </p>
          <div className="mt-6 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:text-left">
            <div className="relative">
              <img
                src={qr}
                alt="QR code to join the Janmashtami WhatsApp group"
                width={220}
                height={220}
                loading="lazy"
                className="gold-frame size-[220px] rounded-2xl bg-card p-3"
              />
              <span className="absolute -top-2 -right-2 rounded-full bg-saffron px-3 py-1 text-xs font-semibold text-primary-foreground shadow-lg">
                Scan me
              </span>
            </div>
            <div className="w-full max-w-xs text-center sm:text-left">
              <p className="text-sm text-muted-foreground">Or message us directly</p>
              <p className="font-display text-2xl text-primary">{EVENT.phone}</p>
              <div className="mt-4 grid gap-2">
                <Button asChild variant="whatsapp" size="xl">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                    <MessageCircle /> Join WhatsApp Group
                  </a>
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outlineGold" onClick={copyLink}>
                    <Copy /> Copy Link
                  </Button>
                  <Button asChild variant="outlineGold">
                    <a href={qr} target="_blank" rel="noreferrer" download>
                      <Download /> Save QR
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GeneralInstructions() {
  return (
    <section id="instructions" className="bg-background py-14">
      <div className="mx-auto max-w-4xl px-4">
        <SectionTitle eyebrow="Please read" title="General Instructions" />
        <ul className="gold-frame grid gap-3 rounded-3xl bg-card p-6 sm:grid-cols-2">
          {INSTRUCTIONS.map((i) => (
            <li key={i} className="flex gap-3 text-sm text-muted-foreground">
              <span className="mt-1 size-2 shrink-0 rounded-full bg-saffron" />
              <span>{i}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FunActivities() {
  const items = [
    { icon: "🎮", label: "Games" },
    { icon: "💃", label: "Dance" },
    { icon: "🍴", label: "Food Court" },
    { icon: "🛍️", label: "Flea Market" },
    { icon: "👨‍👩‍👧", label: "Family Activities" },
    { icon: "🎨", label: "Kids Activities" },
  ];
  return (
    <section id="fun" className="bg-background py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionTitle
          eyebrow="All day long"
          title="Fun for the Whole Family"
          subtitle="Come with your family and enjoy a full day of celebration, devotion, entertainment and togetherness."
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((i) => (
            <div
              key={i.label}
              className="lift-card gold-frame rounded-2xl bg-secondary/25 p-6 text-center"
            >
              <div className="text-4xl">{i.icon}</div>
              <p className="font-serif-deco mt-2 text-lg text-primary">{i.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const GALLERY = [
  {
    src: galleryDance,
    alt: "Children performing a cultural dance at a Janmashtami celebration",
    caption: "Cultural performances on the main stage",
  },
  {
    src: galleryDiyas,
    alt: "Temple decorated with diyas, garlands and peacock feathers",
    caption: "Lamps, garlands and peacock feathers",
  },
  {
    src: galleryFamily,
    alt: "Families enjoying festival stalls and celebrations",
    caption: "Families celebrating together",
  },
  {
    src: krishnaImage,
    alt: "Sri Sri Radha Krishna deities adorned with flower garlands",
    caption: "Sri Sri Radha Krishna deities",
  },
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const active = open === null ? null : GALLERY[open];

  return (
    <section id="gallery" className="bg-background pb-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          eyebrow="Glimpses"
          title="Experience the Celebration"
          subtitle="Tap any photo to view it full screen."
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {GALLERY.map((img, idx) => (
            <figure
              key={img.alt}
              className={`gold-frame group relative cursor-pointer overflow-hidden rounded-2xl bg-card ${idx === 0 ? "col-span-2 md:col-span-2 md:row-span-2" : ""}`}
              onClick={() => setOpen(idx)}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                width={1024}
                height={768}
                className="h-full max-h-[26rem] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-left text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {img.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-3xl border-0 bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{active?.caption ?? "Gallery photo"}</DialogTitle>
          {active && (
            <figure className="gold-frame overflow-hidden rounded-3xl bg-card">
              <img src={active.src} alt={active.alt} className="max-h-[70vh] w-full object-cover" />
              <figcaption className="p-4 text-center text-sm text-muted-foreground">
                {active.caption}
              </figcaption>
            </figure>
          )}
          <div className="mt-3 flex justify-center gap-2">
            <Button
              variant="outlineGold"
              onClick={() =>
                setOpen((i) => (i === null ? i : (i + GALLERY.length - 1) % GALLERY.length))
              }
            >
              Previous
            </Button>
            <Button variant="gold" onClick={() => setOpen(null)}>
              <X /> Close
            </Button>
            <Button
              variant="outlineGold"
              onClick={() => setOpen((i) => (i === null ? i : (i + 1) % GALLERY.length))}
            >
              Next
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

const TRAVEL_MODES = [
  { key: "driving", label: "Drive" },
  { key: "transit", label: "Transit" },
  { key: "walking", label: "Walk" },
  { key: "two-wheeler", label: "Bike" },
] as const;

const ROUTE_TIPS = [
  {
    icon: "🚗",
    title: "By car / cab",
    text: "Set the destination to SLS International Gurukul, K Channasandra, Horamavu. Approx. 20 minutes from Hennur Cross and 25 minutes from Banaswadi.",
  },
  {
    icon: "🚌",
    title: "By bus",
    text: "BMTC buses towards Horamavu / Kalkere stop at K Channasandra. The venue is a short walk from the main road junction.",
  },
  {
    icon: "🚇",
    title: "By metro + auto",
    text: "Nearest metro is Baiyappanahalli (Purple Line); take an auto or cab from there towards Horamavu, roughly 30 minutes.",
  },
];

export function Venue() {
  const [mode, setMode] = useState<(typeof TRAVEL_MODES)[number]["key"]>("driving");
  const directions = `${MAPS_DIRECTIONS}&travelmode=${mode}`;
  const fullAddress = `${EVENT.venueName}, ${EVENT.venueAddress}`;

  const share = async () => {
    const text = `${fullAddress} — ${directions}`;
    if (navigator.share) {
      await navigator.share({ title: "Event Venue", text }).catch(() => undefined);
      return;
    }
    await navigator.clipboard.writeText(text);
    toast.success("Location copied to clipboard");
  };

  const copyAddress = async () => {
    await navigator.clipboard.writeText(fullAddress);
    toast.success("Address copied");
  };

  return (
    <section id="venue" className="bg-background py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionTitle
          eyebrow="Reach us"
          title="Event Venue"
          subtitle="Explore the interactive map and get one-tap directions from wherever you are."
        />
        <div className="gold-frame overflow-hidden rounded-3xl bg-card">
          <div className="relative">
            <iframe
              title="Interactive map showing SLS International Gurukul, Horamavu, Bengaluru"
              src={MAPS_EMBED}
              className="h-72 w-full border-0 sm:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`}
              target="_blank"
              rel="noreferrer"
              className="absolute top-3 right-3 rounded-full bg-card/90 px-4 py-2 text-xs font-semibold text-primary shadow-lg backdrop-blur"
            >
              Open in Google Maps
            </a>
          </div>
          <div className="p-6 text-center">
            <h3 className="font-serif-deco text-xl text-primary uppercase">{EVENT.venueName}</h3>
            <p className="mt-1 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPin className="text-saffron" /> {EVENT.venueAddress}
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {TRAVEL_MODES.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setMode(m.key)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                    mode === m.key
                      ? "border-transparent bg-saffron text-primary-foreground"
                      : "border-border text-muted-foreground hover:text-primary"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Button asChild variant="gold" size="xl">
                <a href={directions} target="_blank" rel="noreferrer">
                  <Navigation /> Get Directions
                </a>
              </Button>
              <Button variant="outlineGold" size="xl" onClick={share}>
                <Share2 /> Share Location
              </Button>
              <Button variant="outlineGold" size="xl" onClick={copyAddress}>
                <Copy /> Copy Address
              </Button>
            </div>

            <div className="mt-6 grid gap-3 text-left sm:grid-cols-3">
              {ROUTE_TIPS.map((r) => (
                <div key={r.title} className="rounded-2xl bg-secondary/30 p-4 ring-1 ring-gold/25">
                  <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <span aria-hidden>{r.icon}</span> {r.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{r.text}</p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Free parking is available near the venue — call {EVENT.phone} if you need help
              reaching us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="gradient-royal py-16">
      <div className="mx-auto max-w-3xl px-4">
        <SectionTitle light eyebrow="We are here to help" title="Have Questions? Contact Us" />
        <div className="gold-frame rounded-3xl bg-card p-6 text-center sm:p-8">
          <p className="font-display text-3xl text-primary">
            {EVENT.phone} · {EVENT.phoneAlt}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">General &amp; business enquiries</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Button asChild variant="whatsapp" size="xl">
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                <MessageCircle /> WhatsApp
              </a>
            </Button>
            <Button asChild variant="royal" size="xl">
              <a href={`tel:+${EVENT.phoneIntl}`}>
                <Phone /> Call
              </a>
            </Button>
            <Button asChild variant="outlineGold" size="xl">
              <a href={`mailto:${EVENT.email}`}>
                <Mail /> Email
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faqs" className="bg-background py-16">
      <div className="mx-auto max-w-3xl px-4">
        <SectionTitle eyebrow="Good to know" title="Frequently Asked Questions" />
        <Accordion type="single" collapsible className="gold-frame rounded-3xl bg-card px-5">
          {FAQS.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-primary">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function SocialShare() {
  const url = useShareUrl();
  const copy = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Link copied!");
  };
  return (
    <section id="share" className="bg-background pb-20">
      <div className="mx-auto max-w-3xl px-4">
        <SectionTitle eyebrow="Spread the joy" title="Follow & Share the Celebration" />
        <div className="gold-frame rounded-3xl bg-secondary/25 p-6 text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              className="bg-gradient-to-tr from-[#fd5949] to-[#d6249f] hover:opacity-90 text-white font-semibold transition-all hover:-translate-y-0.5 shadow-sm border-0"
            >
              <a href="https://instagram.com/iskconbangalore" target="_blank" rel="noreferrer">
                <Instagram className="size-4 mr-2" /> Instagram
              </a>
            </Button>
            <Button
              asChild
              className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white font-semibold transition-all hover:-translate-y-0.5 shadow-sm border-0"
            >
              <a href="https://facebook.com/iskconbangalore" target="_blank" rel="noreferrer">
                <Facebook className="size-4 mr-2" /> Facebook
              </a>
            </Button>
            <Button
              asChild
              className="bg-[#25D366] hover:bg-[#25D366]/90 text-white font-semibold transition-all hover:-translate-y-0.5 shadow-sm border-0"
            >
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${url}`)}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="size-4 mr-2" /> WhatsApp
              </a>
            </Button>
            <Button
              variant="gold"
              onClick={copy}
              className="font-semibold transition-all hover:-translate-y-0.5 shadow-sm"
            >
              <Copy className="size-4 mr-2" /> Copy Link
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
