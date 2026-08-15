import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Lightbulb, Loader2, Shirt, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/Decor";
import { Markdown } from "@/components/Markdown";
import { generateFestivalIdeas } from "@/lib/ai.functions";
import { CATEGORIES } from "@/lib/event";

const KINDS = [
  { key: "dance", label: "Dance concept", icon: Sparkles },
  { key: "costume", label: "Costume & look", icon: Shirt },
  { key: "decoration", label: "Decoration", icon: Wand2 },
] as const;

const GROUPS = [...CATEGORIES.map((c) => `${c.key} (${c.age})`), "Group Dance team"];

export function IdeaStudio() {
  const run = useServerFn(generateFestivalIdeas);
  const [kind, setKind] = useState<(typeof KINDS)[number]["key"]>("dance");
  const [category, setCategory] = useState(GROUPS[0] ?? "Kids");
  const [notes, setNotes] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (loading) return;
    setLoading(true);
    setError("");
    setText("");
    try {
      const res = await run({ data: { kind, category, notes: notes.trim() || undefined } });
      if (res.error) setError(res.error);
      setText(res.text);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="idea-studio" className="relative bg-secondary/20 py-16">
      <div aria-hidden className="mandala-bg absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-3xl px-4">
        <SectionTitle
          eyebrow="AI Creative Studio"
          title="Dance, Costume & Decoration Ideas"
          subtitle="Tell us the age group and get instant Krishna-themed ideas with a simple props list."
        />

        <div className="gold-frame rounded-3xl bg-card p-5">
          <div className="grid gap-2 sm:grid-cols-3">
            {KINDS.map((k) => (
              <button
                key={k.key}
                type="button"
                onClick={() => setKind(k.key)}
                aria-pressed={kind === k.key}
                className={`flex min-h-12 items-center justify-center gap-2 rounded-2xl border px-3 text-sm font-medium transition-colors ${
                  kind === k.key
                    ? "border-gold bg-saffron text-primary-foreground"
                    : "border-gold/40 text-foreground/80 hover:bg-secondary/40"
                }`}
              >
                <k.icon className="size-4" aria-hidden /> {k.label}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3">
            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-foreground/80">Age group / team</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-12 rounded-xl border border-gold/40 bg-background px-3 text-sm"
              >
                {GROUPS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-foreground/80">Anything special? (optional)</span>
              <Input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={300}
                placeholder="e.g. 8 children, 3 minutes, low budget"
                className="h-12"
              />
            </label>

            <Button variant="gold" size="xl" onClick={() => void submit()} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden /> Creating ideas…
                </>
              ) : (
                <>
                  <Lightbulb aria-hidden /> Get 3 ideas
                </>
              )}
            </Button>
          </div>

          {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
          {text ? (
            <div className="mt-5 rounded-2xl bg-secondary/40 p-4 text-sm ring-1 ring-gold/30">
              <Markdown text={text} />
              <Button
                variant="outlineGold"
                className="mt-4 w-full"
                onClick={() => void navigator.clipboard.writeText(text)}
              >
                Copy ideas
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
