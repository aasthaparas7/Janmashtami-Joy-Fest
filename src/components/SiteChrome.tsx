import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EVENT, WHATSAPP_LINK } from "@/lib/event";

const NAV = [
  { label: "Home", href: "/#home" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Competitions", href: "/#competitions" },
  { label: "Group Dance", href: "/#group-dance" },
  { label: "Sponsors", href: "/#sponsors" },
  { label: "About Us", href: "/#about" },
  { label: "Gallery", href: "/#gallery" },
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
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/30 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5">
        
        {/* Left side: Logo */}
        <div className="flex flex-1 justify-start">
          <Link to="/" className="flex min-w-0 items-center gap-2 py-1">
            <span aria-hidden className="text-xl">
              🦚
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-base text-primary sm:text-lg">
                Janmashtami 2026
              </span>
              <span className="block truncate text-[10px] tracking-widest text-muted-foreground uppercase">
                ISKCON
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
        <Button variant="outlineGold" size="icon" className="size-11 lg:hidden" aria-label="Open menu">
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

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-4 bottom-24 z-50 grid size-14 place-items-center rounded-full bg-leaf text-primary-foreground shadow-gold transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none sm:bottom-8"
    >
      <MessageCircle className="size-6" aria-hidden />
    </a>
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
          <h3 className="text-xl text-gold">ISKCON Bengaluru</h3>
          <p className="font-serif-deco mt-1 text-cream/85">Sri Krishna Janmashtami 2026</p>
          <p className="mt-4 text-sm text-cream/75">{EVENT.dateLabel}</p>
          <p className="text-sm text-cream/75">
            {EVENT.venueName}, {EVENT.venueAddress}
          </p>
          <p className="mt-3 text-sm text-cream/75">Contact: {EVENT.phone} · {EVENT.phoneAlt}</p>
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
        © 2026 ISKCON Bengaluru · Hare Krishna
      </p>
    </footer>
  );
}
