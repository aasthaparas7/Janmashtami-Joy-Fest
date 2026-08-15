import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle, Phone, Instagram, UserPlus } from "lucide-react";
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
];

const LotusLogo = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gold">
    <path d="M12 22C12 22 17 18 17 14C17 10 12 4 12 4C12 4 7 10 7 14C7 18 12 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
    <path d="M7 14C4.5 14 2 12 2 10C2 8 5.5 6.5 8 7C8 7 9 9.5 7 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
    <path d="M17 14C19.5 14 22 12 22 10C22 8 18.5 6.5 16 7C16 7 15 9.5 17 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.2"/>
  </svg>
);

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
    <header className="absolute inset-x-0 top-0 z-50 border-b border-gold/10 bg-transparent py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-3">
          <LotusLogo />
          <div className="flex flex-col">
            <span className="font-serif-deco text-xl font-medium leading-none text-gold">ISKCON</span>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-foreground uppercase mt-1">HBR Layout</span>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-foreground uppercase">Bengaluru</span>
          </div>
        </Link>
        
        {/* Center: Nav */}
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-[13px] font-medium tracking-wide text-foreground/80 transition-colors hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {n.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Button asChild variant="gold" size="sm" className="hidden lg:flex items-center gap-2 rounded-full px-6 py-5 font-serif-deco text-base shadow-md lift-card">
            <Link to="/register">
              <UserPlus className="size-4" />
              Register Now
            </Link>
          </Button>
          <MobileMenu />
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
          <SheetTitle className="font-serif-deco text-xl text-primary">Janmashtami 2026</SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="px-4 pb-6 mt-6">
          <ul className="grid gap-2">
            {NAV.map((n) => (
              <li key={n.label}>
                <SheetClose asChild>
                  <a
                    href={n.href}
                    className="flex min-h-12 items-center rounded-xl px-4 text-base font-medium text-foreground/85 transition-colors hover:bg-gold/10 hover:text-gold"
                  >
                    {n.label}
                  </a>
                </SheetClose>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <SheetClose asChild>
              <Button asChild variant="gold" size="xl" className="rounded-full">
                <Link to="/register">
                  <UserPlus className="mr-2 size-5" />
                  Register Now
                </Link>
              </Button>
            </SheetClose>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function FloatingSocials() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 p-2 pr-0 hidden sm:flex">
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="grid size-12 place-items-center rounded-l-xl bg-[#25D366] text-white shadow-gold transition-transform hover:-translate-x-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <MessageCircle className="size-5" aria-hidden />
      </a>
      <a
        href={`tel:+${EVENT.phoneIntl}`}
        aria-label="Phone"
        className="grid size-12 place-items-center rounded-l-xl bg-gold text-white shadow-gold transition-transform hover:-translate-x-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <Phone className="size-5" aria-hidden />
      </a>
      <a
        href="#"
        aria-label="Instagram"
        className="grid size-12 place-items-center rounded-l-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-gold transition-transform hover:-translate-x-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        <Instagram className="size-5" aria-hidden />
      </a>
    </div>
  );
}

export function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/40 bg-background/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md sm:hidden">
      <div className="flex gap-2">
        <Button asChild variant="gold" className="h-12 flex-1 rounded-full">
          <Link to="/register">Register Now</Link>
        </Button>
        <Button asChild variant="outlineGold" size="icon" className="h-12 w-12 rounded-full">
          <a href={WHATSAPP_LINK} aria-label="WhatsApp">
            <MessageCircle aria-hidden />
          </a>
        </Button>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-foreground border-t border-gold/30 pt-16 pb-28 text-cream sm:pb-16 mt-24">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3">
        <div>
          <h3 className="font-serif-deco text-2xl text-gold">ISKCON Bengaluru</h3>
          <p className="mt-2 text-cream/85">Sri Krishna Janmashtami 2026</p>
          <p className="mt-4 text-sm text-cream/75">{EVENT.dateLabel}</p>
          <p className="text-sm text-cream/75">
            {EVENT.venueName}, {EVENT.venueAddress}
          </p>
          <p className="mt-4 text-sm text-cream/75 flex items-center gap-2"><Phone size={14}/> {EVENT.phone}</p>
        </div>
        <div>
          <h4 className="font-serif-deco text-xl text-gold">Quick Links</h4>
          <nav aria-label="Footer">
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {NAV.map((n) => (
                <li key={n.label}>
                  <a
                    href={n.href}
                    className="inline-flex items-center text-cream/75 transition-colors hover:text-gold focus-visible:outline-none"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div>
          <h4 className="font-serif-deco text-xl text-gold">Founder Acharya</h4>
          <p className="mt-4 text-sm text-cream/75 leading-relaxed">{EVENT.founder}</p>
          <Button asChild variant="gold" className="mt-6 rounded-full px-8">
            <Link to="/register">Register Now</Link>
          </Button>
        </div>
      </div>
      <div className="mt-16 text-center">
        <div className="mx-auto w-24 h-px bg-gold/30 mb-6"></div>
        <p className="text-xs tracking-widest text-cream/50 uppercase">
          © 2026 ISKCON Bengaluru · Hare Krishna
        </p>
      </div>
    </footer>
  );
}
