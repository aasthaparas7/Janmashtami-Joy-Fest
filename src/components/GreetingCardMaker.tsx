import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Download, Loader2, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/Decor";
import { generateGreetingCard } from "@/lib/ai.functions";
import { EVENT } from "@/lib/event";

const TONES = [
  { key: "devotional", label: "Devotional" },
  { key: "joyful", label: "Joyful" },
  { key: "poetic", label: "Poetic" },
  { key: "family", label: "Family" },
] as const;

export function GreetingCardMaker() {
  const run = useServerFn(generateGreetingCard);
  const [name, setName] = useState("");
  const [recipient, setRecipient] = useState("");
  const [tone, setTone] = useState<(typeof TONES)[number]["key"]>("devotional");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (loading || !name.trim()) return;
    setLoading(true);
    setError("");
    setMessage("");
    setImage("");
    try {
      const res = await run({
        data: { name: name.trim(), recipient: recipient.trim() || undefined, tone },
      });
      if (res.error) setError(res.error);
      setMessage(res.message);
      setImage(res.image);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const shareText = message
    ? `${message}\n\nJoin us for Sri Krishna Janmashtami 2026 — ${EVENT.dateLabel}, ${EVENT.venueName}.`
    : "";

  return (
    <section id="greeting" className="relative bg-background py-16">
      <div aria-hidden className="mandala-bg absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-3xl px-4">
        <SectionTitle
          eyebrow="AI Greeting Studio"
          title="Make a Janmashtami Greeting Card"
          subtitle="Create a personalised devotional greeting and share it on WhatsApp in one tap."
        />

        <div className="gold-frame rounded-3xl bg-card p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-foreground/80">Your name</span>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
                placeholder="e.g. Rekha"
                className="h-12"
              />
            </label>
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-foreground/80">To (optional)</span>
              <Input
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                maxLength={40}
                placeholder="e.g. family & friends"
                className="h-12"
              />
            </label>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {TONES.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTone(t.key)}
                aria-pressed={tone === t.key}
                className={`min-h-10 rounded-full border px-4 text-xs font-medium transition-colors ${
                  tone === t.key
                    ? "border-gold bg-saffron text-primary-foreground"
                    : "border-gold/40 text-foreground/80 hover:bg-secondary/40"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <Button
            variant="gold"
            size="xl"
            className="mt-4 w-full"
            disabled={loading || !name.trim()}
            onClick={() => void submit()}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" aria-hidden /> Creating your card…
              </>
            ) : (
              <>
                <Sparkles aria-hidden /> Create my greeting
              </>
            )}
          </Button>

          {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}

          {message ? (
            <div className="mt-5 overflow-hidden rounded-2xl ring-1 ring-gold/40">
              {image ? (
                <img
                  src={image}
                  alt="AI generated Krishna Janmashtami greeting artwork"
                  className="w-full"
                  loading="lazy"
                />
              ) : null}
              <div className="bg-secondary/40 p-4">
                <p className="font-serif-deco text-base whitespace-pre-line text-foreground">
                  {message}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {EVENT.dateLabel} · {EVENT.venueName}
                </p>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  <Button asChild variant="gold">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle aria-hidden /> Share
                    </a>
                  </Button>
                  <Button
                    variant="outlineGold"
                    onClick={() => void navigator.clipboard.writeText(shareText)}
                  >
                    Copy text
                  </Button>
                  {image ? (
                    <Button asChild variant="outlineGold">
                      <a href={image} download="janmashtami-greeting.png">
                        <Download aria-hidden /> Save image
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
