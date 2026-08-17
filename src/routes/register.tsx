import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionTitle } from "@/components/Decor";
import { FloatingWhatsApp, SiteFooter, SiteHeader, SkipLink } from "@/components/SiteChrome";
import { GeneralInstructions } from "@/components/InfoSections";
import { IdeaStudio } from "@/components/IdeaStudio";
import { GreetingCardMaker } from "@/components/GreetingCardMaker";
import { REGISTRATION_FORMS } from "@/lib/event";

const searchSchema = z.object({ tab: z.enum(["kids", "dance"]).optional() });

function FormEmbed({ form }: { form: { short: string; embed: string; title: string } }) {
  return (
    <div className="gold-frame overflow-hidden rounded-3xl bg-card p-3 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">{form.title}</p>
        <Button asChild variant="outlineGold" size="sm">
          <a href={form.short} target="_blank" rel="noreferrer">
            Open form <ExternalLink />
          </a>
        </Button>
      </div>
      <iframe
        src={form.embed}
        title={form.title}
        className="h-[1200px] w-full rounded-2xl border-0 bg-white"
        loading="lazy"
      >
        Loading…
      </iframe>
    </div>
  );
}

export const Route = createFileRoute("/register")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Register | Sri Krishna Janmashtami 2026 Bengaluru" },
      {
        name: "description",
        content:
          "Register for kids competitions and the group dance contest at Sri Krishna Janmashtami 2026, ISKCON, Horamavu Bengaluru. Deadline 2nd September 2026.",
      },
      { property: "og:title", content: "Register | Sri Krishna Janmashtami 2026 Bengaluru" },
      {
        property: "og:description",
        content:
          "Kids competitions and Krishna themed group dance contest registration for Janmashtami 2026 in Bengaluru.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/register" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/register" }],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { tab } = Route.useSearch();
  return (
    <div className="min-h-dvh bg-background">
      <SkipLink />
      <SiteHeader />
      <main id="main-content" className="gradient-dawn px-4 pt-28 pb-24">
        <div className="mx-auto max-w-3xl">
          <SectionTitle
            eyebrow="Sri Krishna Janmashtami 2026"
            title="Event Registration"
            subtitle="Choose a registration type below. Registration deadline: 2nd September 2026."
          />
          <Tabs defaultValue={tab === "dance" ? "dance" : "kids"}>
            <TabsList className="mb-6 grid h-auto w-full grid-cols-2">
              <TabsTrigger value="kids" className="min-h-11">
                Kids Competitions
              </TabsTrigger>
              <TabsTrigger value="dance" className="min-h-11">
                Group Dance
              </TabsTrigger>
            </TabsList>
            <TabsContent value="kids">
              <FormEmbed form={REGISTRATION_FORMS.kids} />
            </TabsContent>
            <TabsContent value="dance">
              <FormEmbed form={REGISTRATION_FORMS.dance} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <GeneralInstructions />
      <IdeaStudio />
      <GreetingCardMaker />
      <FloatingWhatsApp />
      <SiteFooter />
    </div>
  );
}
