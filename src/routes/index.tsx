import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";

import { LastYearHighlights, WhoWeAre } from "@/components/AboutSections";
import { Competitions, GroupDance, Highlights, Schedule } from "@/components/EventSections";
import {
  Contact,
  Faq,
  Gallery,
  SocialShare,
  Venue,
  WhatsAppSection,
} from "@/components/InfoSections";
import { ChiefGuest, Sponsors } from "@/components/PartnersSections";
import { PosterDownload, PrizesAndBadges, WhatsAppReminder } from "@/components/PosterPrizes";
import { FestivalAssistant } from "@/components/FestivalAssistant";
import { PeacockFluteParallax } from "@/components/PeacockFluteParallax";
import {
  FloatingSocials,
  SiteFooter,
  SiteHeader,
  SkipLink,
  StickyCta,
} from "@/components/SiteChrome";
import { FAQS } from "@/lib/event";

const TITLE = "Sri Krishna Janmashtami 2026 | ISKCON Bengaluru";
const DESCRIPTION =
  "Celebrate Sri Krishna Janmashtami 2026 at SLS International Gurukul, Horamavu, Bengaluru on 5th September. Enjoy kids competitions, group dance, cultural program, games, food and family celebrations.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "Sri Krishna Janmashtami Bengaluru, Janmashtami 2026 Bangalore, ISKCON Janmashtami Bangalore, Krishna Janmashtami Horamavu, Janmashtami competitions Bangalore, kids Janmashtami competitions Bangalore, Krishna group dance competition Bangalore, ISKCON Janmashtami",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Event",
          name: "Sri Krishna Janmashtami 2026",
          startDate: "2026-09-05T10:00+05:30",
          endDate: "2026-09-05T21:00+05:30",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          description: DESCRIPTION,
          organizer: { "@type": "Organization", name: "ISKCON Bengaluru" },
          location: {
            "@type": "Place",
            name: "SLS International Gurukul",
            address: {
              "@type": "PostalAddress",
              streetAddress: "K Channasandra, Horamavu",
              addressLocality: "Bengaluru",
              addressRegion: "Karnataka",
              addressCountry: "IN",
            },
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-dvh bg-background">
      <SkipLink />
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <LastYearHighlights />
        <Highlights />
        <PeacockFluteParallax />
        <Schedule />
        <Competitions />
        <GroupDance />

        <PosterDownload />
        <WhatsAppReminder />
        <WhoWeAre />
        <ChiefGuest />
        <Sponsors />
        <Gallery />
        <Venue />
        <Contact />
        <Faq />
        <FestivalAssistant />
        <WhatsAppSection />
        <SocialShare />
      </main>
      <FloatingSocials />
      <StickyCta />
      <SiteFooter />
    </div>
  );
}
