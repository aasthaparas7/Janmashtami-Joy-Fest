import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle, Phone, Youtube, Instagram, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EVENT, WHATSAPP_LINK, SPONSOR_WHATSAPP, INSTAGRAM_LINK, YOUTUBE_LINK } from "@/lib/event";

const NAV = [
  { label: "Home", href: "/#home" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Competitions", href: "/#competitions" },
  { label: "Group Dance", href: "/#group-dance" },
  { label: "Sponsors", href: "/#sponsors" },
  { label: "About Us", href: "/#about" },
  { label: "Gallery", href: "/#last-year" },
  { label: "Venue", href: "/#venue" },
  { label: "FAQs", href: "/#faqs" },
  { label: "Contact", href: "/#contact" },
];

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
    >
      Skip to main content
    </a>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    // Initialize state
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-gold/30 bg-background/95 backdrop-blur-md shadow-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5">
        {/* Left side: Logo */}
        <div className="flex flex-1 justify-start">
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2 py-1 group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="relative w-12 h-10 sm:w-16 sm:h-12 flex-shrink-0">
              {/* Soft ethereal glow behind the logo */}
              <div className="absolute -top-1 left-1 w-14 h-14 sm:-top-1 sm:left-2 sm:w-20 sm:h-20 bg-white/60 blur-[12px] sm:blur-xl rounded-full z-[50]" />
              <img
                src="/Logo.png"
                alt="Janmashtami Logo"
                className="absolute -top-3 left-0 w-16 max-w-none sm:-top-4 sm:w-24 transition-transform duration-300 group-hover:scale-105 z-[60]"
                style={{
                  filter:
                    "drop-shadow(0 4px 6px rgba(0,0,0,0.3)) drop-shadow(0 0 12px rgba(255,255,255,0.6))",
                }}
              />
            </div>
            <span className="min-w-0 ml-2 sm:ml-6">
              <span className="block font-display text-base leading-tight text-primary sm:text-lg transition-colors group-hover:text-saffron">
                Janmashtami <br className="sm:hidden" />
                2026
              </span>
            </span>
          </Link>
        </div>

        {/* Center: Navigation */}
        <nav aria-label="Main" className="hidden shrink-0 items-center gap-5 lg:flex">
          {NAV.slice(1, 7).map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="rounded-md px-1 py-2 text-sm text-foreground/75 transition-colors hover:text-saffron focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* Right side: Actions */}
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button asChild variant="gold" size="sm" className="h-11 lg:hidden">
            <Link to="/register">Register</Link>
          </Button>
          <MobileMenu />
          <Button asChild variant="gold" className="hidden lg:inline-flex">
            <Link to="/register">Register Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outlineGold"
          size="icon"
          className="size-11 lg:hidden"
          aria-label="Open menu"
        >
          <Menu aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85vw] max-w-sm overflow-y-auto bg-background">
        <SheetHeader>
          <SheetTitle className="font-display text-xl text-primary">Janmashtami 2026</SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="px-4 pb-6">
          <ul className="grid gap-1">
            {NAV.map((n) => (
              <li key={n.label}>
                <SheetClose asChild>
                  <a
                    href={n.href}
                    className="flex min-h-12 items-center rounded-2xl px-3 text-base font-medium text-foreground/85 transition-colors hover:bg-secondary/40 hover:text-saffron"
                  >
                    {n.label}
                  </a>
                </SheetClose>
              </li>
            ))}
          </ul>
          <div className="mt-5 grid gap-2">
            <SheetClose asChild>
              <Button asChild variant="gold" size="xl">
                <Link to="/register">Register Now</Link>
              </Button>
            </SheetClose>
            <Button asChild variant="outlineGold" size="xl">
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden /> WhatsApp Us
              </a>
            </Button>
            <Button asChild variant="ghost" size="xl">
              <a href={`tel:+${EVENT.phoneIntl}`}>
                <Phone aria-hidden /> {EVENT.phone}
              </a>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function FloatingSocials() {
  return (
    <div className="fixed right-4 bottom-24 z-50 flex flex-col gap-3 sm:bottom-8">
      <a
        href={YOUTUBE_LINK}
        target="_blank"
        rel="noreferrer"
        aria-label="Visit our YouTube channel"
        className="grid size-12 place-items-center rounded-full bg-[#FF0000] text-primary-foreground shadow-gold transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none self-end"
      >
        <Youtube className="size-5" aria-hidden />
      </a>
      <a
        href={INSTAGRAM_LINK}
        target="_blank"
        rel="noreferrer"
        aria-label="Follow us on Instagram"
        className="grid size-12 place-items-center rounded-full bg-gradient-to-tr from-[#fd5949] to-[#d6249f] text-primary-foreground shadow-gold transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none self-end"
      >
        <Instagram className="size-5" aria-hidden />
      </a>
      <a
        href={SPONSOR_WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="grid size-12 place-items-center rounded-full bg-leaf text-primary-foreground shadow-gold transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none self-end"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-5"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}

export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/40 bg-background/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md sm:hidden">
      <div className="flex gap-2">
        <Button asChild variant="gold" className="h-12 flex-1">
          <Link to="/register">Register Now</Link>
        </Button>
        <Button asChild variant="outlineGold" size="icon" className="h-12 w-12">
          <a href={`tel:+${EVENT.phoneIntl}`} aria-label="Call the organisers">
            <Phone aria-hidden />
          </a>
        </Button>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="gradient-royal border-t border-gold/30 pt-12 pb-28 text-cream sm:pb-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3">
        <div>
          <h3 className="text-xl text-gold">ISKCON HBR Bengaluru</h3>
          <p className="font-serif-deco mt-1 text-cream/85">Sri Krishna Janmashtami 2026</p>
          <p className="mt-4 text-sm text-cream/75">{EVENT.dateLabel}</p>
          <p className="text-sm text-cream/75">
            {EVENT.venueName}, {EVENT.venueAddress}
          </p>
          <p className="mt-3 text-sm text-cream/75">
            Contact: {EVENT.phone} · {EVENT.phoneAlt}
          </p>
        </div>
        <div>
          <h4 className="font-serif-deco text-lg text-gold">Quick Links</h4>
          <nav aria-label="Footer">
            <ul className="mt-3 grid grid-cols-2 gap-1 text-sm">
              {NAV.map((n) => (
                <li key={n.label}>
                  <a
                    href={n.href}
                    className="inline-flex min-h-11 items-center text-cream/75 transition-colors hover:text-gold focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          <h4 className="font-serif-deco text-lg text-gold">Founder Acharya</h4>
          <p className="mt-3 text-sm text-cream/75">{EVENT.founder}</p>
          <Button asChild variant="gold" className="mt-5">
            <Link to="/register">Register Now</Link>
          </Button>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-cream/60">
        © 2026 ISKCON HBR Bengaluru · Hare Krishna
      </p>
    </footer>
  );
}
