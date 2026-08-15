import { useEffect, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SPONSOR_TIERS } from "@/lib/event";

export type SponsorRow = {
  id: string;
  name: string;
  tier: string;
  detail: string | null;
  logo_url: string | null;
  website_url: string | null;
  sort_order: number;
  published: boolean;
};

const TIERS = SPONSOR_TIERS.map((t) => t.tier);

const EMPTY = {
  name: "",
  tier: TIERS[0] ?? "Gold Sponsor",
  detail: "",
  logo_url: "",
  website_url: "",
  sort_order: 0,
  published: true,
};

export function SponsorsAdmin() {
  const [rows, setRows] = useState<SponsorRow[]>([]);
  const [draft, setDraft] = useState({ ...EMPTY });
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from("sponsors")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error) {
      toast.error("Could not load sponsors");
      return;
    }
    setRows((data as SponsorRow[]) ?? []);
  };

  useEffect(() => {
    void load();
  }, []);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim()) return;
    setBusy(true);
    const { error } = await supabase.from("sponsors").insert({
      name: draft.name.trim().slice(0, 120),
      tier: draft.tier,
      detail: draft.detail.trim().slice(0, 200) || null,
      logo_url: draft.logo_url.trim() || null,
      website_url: draft.website_url.trim() || null,
      sort_order: Number(draft.sort_order) || 0,
      published: draft.published,
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Sponsor added");
    setDraft({ ...EMPTY });
    void load();
  };

  const patch = (id: string, values: Partial<SponsorRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...values } : r)));
  };

  const save = async (row: SponsorRow) => {
    const { error } = await supabase
      .from("sponsors")
      .update({
        name: row.name,
        tier: row.tier,
        detail: row.detail,
        logo_url: row.logo_url,
        website_url: row.website_url,
        sort_order: row.sort_order,
        published: row.published,
      })
      .eq("id", row.id);
    if (error) {
      toast.error("Could not save");
      return;
    }
    toast.success("Saved");
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("sponsors").delete().eq("id", id);
    if (error) {
      toast.error("Could not delete");
      return;
    }
    toast.success("Sponsor removed");
    void load();
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={add} className="gold-frame rounded-2xl bg-card p-5">
        <h2 className="font-serif-deco text-lg text-primary">Add a sponsor / partner</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label>Name</Label>
            <Input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-1.5">
            <Label>Tier</Label>
            <Select value={draft.tier} onValueChange={(v) => setDraft({ ...draft, tier: v })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIERS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
                <SelectItem value="Event Partner">Event Partner</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label>Short detail (optional)</Label>
            <Input
              value={draft.detail}
              onChange={(e) => setDraft({ ...draft, detail: e.target.value })}
            />
          </div>
          <div className="grid gap-1.5">
            <Label>Logo image URL (optional)</Label>
            <Input
              value={draft.logo_url}
              onChange={(e) => setDraft({ ...draft, logo_url: e.target.value })}
              placeholder="https://…"
            />
          </div>
          <div className="grid gap-1.5">
            <Label>Website URL (optional)</Label>
            <Input
              value={draft.website_url}
              onChange={(e) => setDraft({ ...draft, website_url: e.target.value })}
              placeholder="https://…"
            />
          </div>
          <div className="grid gap-1.5">
            <Label>Display order</Label>
            <Input
              type="number"
              value={draft.sort_order}
              onChange={(e) => setDraft({ ...draft, sort_order: Number(e.target.value) })}
            />
          </div>
        </div>
        <Button type="submit" variant="gold" className="mt-4 h-11" disabled={busy}>
          <Plus /> Add sponsor
        </Button>
      </form>

      <div className="gold-frame overflow-x-auto rounded-2xl bg-card">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-muted text-left">
            <tr>
              {["Name", "Tier", "Detail", "Logo URL", "Website", "Order", "Live", ""].map((h) => (
                <th key={h} className="p-3 font-semibold text-primary">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border align-top">
                <td className="p-2">
                  <Input value={r.name} onChange={(e) => patch(r.id, { name: e.target.value })} />
                </td>
                <td className="p-2">
                  <Select value={r.tier} onValueChange={(v) => patch(r.id, { tier: v })}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {TIERS.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                      <SelectItem value="Event Partner">Event Partner</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="p-2">
                  <Input
                    value={r.detail ?? ""}
                    onChange={(e) => patch(r.id, { detail: e.target.value })}
                  />
                </td>
                <td className="p-2">
                  <Input
                    value={r.logo_url ?? ""}
                    onChange={(e) => patch(r.id, { logo_url: e.target.value })}
                  />
                </td>
                <td className="p-2">
                  <Input
                    value={r.website_url ?? ""}
                    onChange={(e) => patch(r.id, { website_url: e.target.value })}
                  />
                </td>
                <td className="p-2">
                  <Input
                    type="number"
                    className="w-20"
                    value={r.sort_order}
                    onChange={(e) => patch(r.id, { sort_order: Number(e.target.value) })}
                  />
                </td>
                <td className="p-2">
                  <input
                    type="checkbox"
                    className="size-5 accent-[var(--color-saffron)]"
                    aria-label={`Publish ${r.name}`}
                    checked={r.published}
                    onChange={(e) => patch(r.id, { published: e.target.checked })}
                  />
                </td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <Button
                      variant="gold"
                      size="icon"
                      aria-label={`Save ${r.name}`}
                      onClick={() => void save(r)}
                    >
                      <Save />
                    </Button>
                    <Button
                      variant="outlineGold"
                      size="icon"
                      aria-label={`Delete ${r.name}`}
                      onClick={() => void remove(r.id)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length ? (
          <p className="p-6 text-center text-sm text-muted-foreground">
            No sponsors yet. Add your first sponsor above — it appears on the homepage instantly.
          </p>
        ) : null}
      </div>
    </div>
  );
}
