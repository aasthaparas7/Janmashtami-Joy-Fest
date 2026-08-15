import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { BrainCircuit, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/Markdown";
import { generateAdminInsights } from "@/lib/ai.functions";

type Kid = {
  category?: string | null;
  competitions?: string[] | null;
  status?: string | null;
  created_at?: string | null;
};
type Team = {
  status?: string | null;
  participants?: number | null;
  created_at?: string | null;
};

function tally(values: (string | null | undefined)[]) {
  const map = new Map<string, number>();
  values.forEach((v) => {
    const key = (v ?? "unknown").toString();
    map.set(key, (map.get(key) ?? 0) + 1);
  });
  return [...map.entries()].map(([k, v]) => `${k}: ${v}`).join(", ") || "none";
}

/** Aggregate, non-personal counts only — no names or contact details leave the dashboard. */
export function buildStatsSummary(kids: Kid[], teams: Team[]) {
  const recent = (rows: { created_at?: string | null }[]) =>
    rows.filter((r) => {
      const t = r.created_at ? Date.parse(r.created_at) : NaN;
      return Number.isFinite(t) && Date.now() - t < 7 * 86400000;
    }).length;

  return [
    `Total kids registrations: ${kids.length} (last 7 days: ${recent(kids)}).`,
    `Kids by age category — ${tally(kids.map((k) => k.category))}.`,
    `Kids by status — ${tally(kids.map((k) => k.status))}.`,
    `Competition entries — ${tally(kids.flatMap((k) => k.competitions ?? []))}.`,
    `Group dance teams: ${teams.length} (last 7 days: ${recent(teams)}), total performers: ${teams.reduce(
      (n, t) => n + (t.participants ?? 0),
      0,
    )}.`,
    `Teams by status — ${tally(teams.map((t) => t.status))}.`,
  ].join("\n");
}

export function AdminInsights({ kids, teams }: { kids: Kid[]; teams: Team[] }) {
  const run = useServerFn(generateAdminInsights);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (loading) return;
    setLoading(true);
    setError("");
    setText("");
    try {
      const res = await run({ data: { stats: buildStatsSummary(kids, teams).slice(0, 4000) } });
      if (res.error) setError(res.error);
      setText(res.text);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gold-frame mt-4 rounded-3xl bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-lg text-primary">AI Registration Insights</h3>
          <p className="text-sm text-muted-foreground">
            Trends, gaps and suggested actions from anonymised registration counts.
          </p>
        </div>
        <Button variant="gold" onClick={() => void submit()} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" aria-hidden /> Analysing…
            </>
          ) : (
            <>
              <BrainCircuit aria-hidden /> Generate insights
            </>
          )}
        </Button>
      </div>

      {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
      {text ? (
        <div className="mt-4 rounded-2xl bg-secondary/40 p-4 text-sm ring-1 ring-gold/30">
          <Markdown text={text} />
        </div>
      ) : null}
    </div>
  );
}
