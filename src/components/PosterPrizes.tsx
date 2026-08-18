import { useState } from "react";
import { Award, BellRing, Download, FileImage, Gift, Ticket, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { SectionTitle } from "@/components/Decor";
import { EVENT } from "@/lib/event";

const POSTER_LANGUAGES = {
  en: {
    id: "en",
    label: "English",
    pages: [
      {
        src: "/poster/Poster_1.jpg",
        alt: "Sri Krishna Janmashtami 2026 event poster with schedule and venue",
      },
      {
        src: "/poster/Poster_2.jpg",
        alt: "Janmashtami 2026 competitions poster with categories and prizes",
      },
    ],
    downloadText: "Download full poster (PDF)",
    generatingText: "Generating PDF...",
  },
  hi: {
    id: "hi",
    label: "हिन्दी",
    pages: [
      { src: "/poster/Poster_1_hindi.png", alt: "श्री कृष्ण जन्माष्टमी २०२६ कार्यक्रम पोस्टर" },
      { src: "/poster/Poster_2_hindi.png", alt: "जन्माष्टमी २०२६ प्रतियोगिताएं" },
    ],
    downloadText: "पूरा पोस्टर डाउनलोड करें (PDF)",
    generatingText: "PDF बना रहा है...",
  },
  kn: {
    id: "kn",
    label: "ಕನ್ನಡ",
    pages: [
      { src: "/poster/Poster_1_kanada.png", alt: "ಶ್ರೀ ಕೃಷ್ಣ ಜನ್ಮಾಷ್ಟಮಿ 2026 ಕಾರ್ಯಕ್ರಮ ಪೋಸ್ಟರ್" },
      { src: "/poster/Poster_2_kanada.png", alt: "ಜನ್ಮಾಷ್ಟಮಿ 2026 ಸ್ಪರ್ಧೆಗಳು" },
    ],
    downloadText: "ಪೂರ್ಣ ಪೋಸ್ಟರ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ (PDF)",
    generatingText: "PDF ರಚಿಸಲಾಗುತ್ತಿದೆ...",
  },
} as const;

type Language = keyof typeof POSTER_LANGUAGES;

/** Downloadable flyer / poster with preview of both pages. */
export function PosterDownload() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lang, setLang] = useState<Language>("en");

  const currentLang = POSTER_LANGUAGES[lang];

  const generateAndDownloadPDF = async () => {
    try {
      setIsGenerating(true);
      toast.info(currentLang.generatingText);

      const { jsPDF } = await import("jspdf");

      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });
      };

      const getBase64Image = (img: HTMLImageElement): string => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
        }
        return canvas.toDataURL("image/jpeg", 0.95);
      };

      const img1 = await loadImage(currentLang.pages[0]!.src);
      const pdf = new jsPDF({
        orientation: img1.width > img1.height ? "landscape" : "portrait",
        unit: "px",
        format: [img1.width, img1.height],
      });
      pdf.addImage(getBase64Image(img1), "JPEG", 0, 0, img1.width, img1.height);

      for (let i = 1; i < currentLang.pages.length; i++) {
        const src = currentLang.pages[i]!.src;
        const img = await loadImage(src);
        pdf.addPage([img.width, img.height], img.width > img.height ? "landscape" : "portrait");
        pdf.addImage(getBase64Image(img), "JPEG", 0, 0, img.width, img.height);
      }

      pdf.save(`Sri-Krishna-Janmashtami-2026-Poster-${lang}.pdf`);
      toast.success("PDF downloaded successfully!");
    } catch (err) {
      console.error("PDF Generation error:", err);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="poster" className="bg-background py-16">
      <div className="mx-auto max-w-5xl px-4">
        <SectionTitle
          eyebrow="Share the invitation"
          title="Download Event Poster"
          subtitle="Save the official flyer and share it on WhatsApp with family and friends."
        />

        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {(Object.keys(POSTER_LANGUAGES) as Language[]).map((l) => (
            <Button
              key={l}
              onClick={() => setLang(l)}
              variant={lang === l ? "gold" : "outlineGold"}
              className="min-w-28 text-base"
            >
              {POSTER_LANGUAGES[l].label}
            </Button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {currentLang.pages.map((p, i) => (
            <figure
              key={p.src}
              className="lift-card gold-frame overflow-hidden rounded-3xl bg-card p-3 h-full"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="group relative cursor-zoom-in overflow-hidden rounded-2xl h-full">
                    <img
                      src={p.src}
                      alt={p.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    {/* Gradient overlay for text contrast */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-b-2xl" />

                    <div className="absolute inset-x-0 bottom-6 flex justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <Button
                        asChild
                        variant="gold"
                        size="sm"
                        className="shadow-[0_4px_24px_rgba(0,0,0,0.5)] ring-2 ring-gold/40 hover:ring-gold"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a href={p.src} download={`janmashtami-2026-poster-${i + 1}.png`}>
                          <FileImage /> Save image
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
                        src={p.src}
                        alt={p.alt}
                        className="max-h-[90vh] w-auto rounded-lg object-contain pointer-events-auto"
                      />
                    </TransformComponent>
                  </TransformWrapper>
                </DialogContent>
              </Dialog>
            </figure>
          ))}
        </div>
        <div className="mt-7 text-center">
          <Button onClick={generateAndDownloadPDF} disabled={isGenerating} variant="gold" size="xl">
            {isGenerating ? <Loader2 className="animate-spin" /> : <Download />}
            {isGenerating ? currentLang.generatingText : currentLang.downloadText}
          </Button>
        </div>
      </div>
    </section>
  );
}

const PRIZE_ROWS = [
  {
    key: "Balgopal",
    age: "Up to 5 Years",
    detail: "Cash prizes, trophies & exciting gifts for winners in each competition",
  },
  {
    key: "Nandgopal",
    age: "6 – 11 Years",
    detail: "Cash prizes, trophies & exciting gifts for winners in each competition",
  },
  {
    key: "Nandkishore",
    age: "12 Years & Above",
    detail: "Cash prizes, trophies & exciting gifts for winners in each competition",
  },
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
            <Award className="text-leaf" /> Every participant receives a Certificate of
            Participation.
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
    toast.success("Opening WhatsApp", {
      description: "Send the message to confirm your reminders.",
    });
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
            You will be added to the festival broadcast list. Helpline: {EVENT.phone} ·{" "}
            {EVENT.phoneAlt}
          </p>
        </form>
      </div>
    </section>
  );
}
