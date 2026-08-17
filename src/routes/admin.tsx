import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Download, LogOut, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminInsights } from "@/components/AdminInsights";
import { SponsorsAdmin } from "@/components/SponsorsAdmin";
import { WHATSAPP_LINK } from "@/lib/event";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Dashboard | Janmashtami 2026 Registrations" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Internal registrations dashboard for ISKCON." },
      { property: "og:title", content: "Admin Dashboard | Janmashtami 2026" },
      { property: "og:description", content: "Internal registrations dashboard." },
    ],
  }),
  component: AdminPage,
});

type Kid = {
  id: string;
  registration_id: string | null;
  parent_name: string;
  mobile: string;
  email: string;
  child_name: string;
  child_age: number;
  category: string;
  competitions: string[];
  school_name: string | null;
  city: string | null;
  participants: number;
  emergency_contact: string | null;
  status: string;
  created_at: string;
};

type Team = {
  id: string;
  registration_id: string | null;
  team_name: string;
  leader_name: string;
  mobile: string;
  email: string;
  participants: number;
  age_group: string | null;
  dance_style: string | null;
  song_name: string | null;
  organisation: string | null;
  city: string | null;
  status: string;
  created_at: string;
};

function toCsv(rows: Record<string, unknown>[], filename: string) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]!);
  const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function Login({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    onDone();
  };

  const signUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin + "/admin" },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created. Ask an existing admin to grant you access.");
  };

  return (
    <div className="gradient-dawn grid min-h-screen place-items-center px-4">
      <form onSubmit={signIn} className="gold-frame w-full max-w-sm rounded-3xl bg-card p-8">
        <h1 className="text-center text-2xl text-primary">Admin Login</h1>
        <p className="mt-1 text-center text-xs text-muted-foreground">
          Janmashtami 2026 registrations
        </p>
        <div className="mt-6 grid gap-3">
          <div className="grid gap-1.5">
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          </div>
          <div className="grid gap-1.5">
            <Label>Password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              minLength={6}
            />
          </div>
          <Button type="submit" variant="gold" size="xl" disabled={loading}>
            Sign in
          </Button>
          <Button type="button" variant="outlineGold" onClick={signUp} disabled={loading}>
            Create admin account
          </Button>
        </div>
      </form>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="gold-frame rounded-2xl bg-card p-4 text-center">
      <p className="font-display text-3xl text-primary">{value}</p>
      <p className="mt-1 text-xs tracking-wider text-muted-foreground uppercase">{label}</p>
    </div>
  );
}

function AdminPage() {
  const [session, setSession] = useState<boolean | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [kids, setKids] = useState<Kid[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [comp, setComp] = useState("all");

  const load = async () => {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      setSession(false);
      return;
    }
    setSession(true);
    const { data: roleRows } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id);
    const admin = Boolean(roleRows?.some((r) => r.role === "admin"));
    setIsAdmin(admin);
    if (!admin) return;
    const [k, t] = await Promise.all([
      supabase.from("kids_registrations").select("*").order("created_at", { ascending: false }),
      supabase.from("dance_registrations").select("*").order("created_at", { ascending: false }),
    ]);
    setKids((k.data as Kid[]) ?? []);
    setTeams((t.data as Team[]) ?? []);
  };

  useEffect(() => {
    void load();
  }, []);

  const allComps = useMemo(
    () => Array.from(new Set(kids.flatMap((k) => k.competitions ?? []))),
    [kids],
  );

  const filteredKids = useMemo(
    () =>
      kids.filter((k) => {
        const hay =
          `${k.registration_id} ${k.child_name} ${k.parent_name} ${k.mobile} ${k.email} ${k.school_name ?? ""}`.toLowerCase();
        return (
          hay.includes(q.toLowerCase()) &&
          (cat === "all" || k.category === cat) &&
          (comp === "all" || (k.competitions ?? []).includes(comp))
        );
      }),
    [kids, q, cat, comp],
  );

  const filteredTeams = useMemo(
    () =>
      teams.filter((t) =>
        `${t.registration_id} ${t.team_name} ${t.leader_name} ${t.mobile} ${t.email}`
          .toLowerCase()
          .includes(q.toLowerCase()),
      ),
    [teams, q],
  );

  const setStatus = async (
    table: "kids_registrations" | "dance_registrations",
    id: string,
    status: string,
  ) => {
    const { error } = await supabase.from(table).update({ status }).eq("id", id);
    if (error) {
      toast.error("Could not update status");
      return;
    }
    toast.success(`Marked ${status}`);
    void load();
  };

  if (session === null) return <div className="grid min-h-screen place-items-center">Loading…</div>;
  if (!session) return <Login onDone={() => void load()} />;
  if (isAdmin === false)
    return (
      <div className="grid min-h-screen place-items-center px-4 text-center">
        <div>
          <h1 className="text-2xl text-primary">Access pending</h1>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Your account is signed in but does not have admin access yet. Ask the event coordinator
            to grant the admin role to your account.
          </p>
          <Button
            variant="outlineGold"
            className="mt-5"
            onClick={async () => {
              await supabase.auth.signOut();
              setSession(false);
            }}
          >
            <LogOut /> Sign out
          </Button>
        </div>
      </div>
    );

  const totalParticipants =
    kids.reduce((s, k) => s + (k.participants || 1), 0) +
    teams.reduce((s, t) => s + (t.participants || 0), 0);

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <h1 className="truncate text-2xl text-primary">Registrations Dashboard</h1>
            <p className="text-xs text-muted-foreground">Sri Krishna Janmashtami 2026</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button
              variant="outlineGold"
              size="icon"
              onClick={() => void load()}
              aria-label="Refresh"
            >
              <RefreshCw />
            </Button>
            <Button
              variant="outlineGold"
              size="icon"
              aria-label="Sign out"
              onClick={async () => {
                await supabase.auth.signOut();
                setSession(false);
              }}
            >
              <LogOut />
            </Button>
          </div>
        </header>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <Stat label="Total Registrations" value={kids.length + teams.length} />
          <Stat label="Balgopal" value={kids.filter((k) => k.category === "Balgopal").length} />
          <Stat label="Nandgopal" value={kids.filter((k) => k.category === "Nandgopal").length} />
          <Stat
            label="Nandkishore"
            value={kids.filter((k) => k.category === "Nandkishore").length}
          />
          <Stat label="Group Dance Teams" value={teams.length} />
          <Stat label="Total Participants" value={totalParticipants} />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
          <Input
            placeholder="Search name, mobile, email, registration ID…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              <SelectItem value="Balgopal">Balgopal</SelectItem>
              <SelectItem value="Nandgopal">Nandgopal</SelectItem>
              <SelectItem value="Nandkishore">Nandkishore</SelectItem>
            </SelectContent>
          </Select>
          <Select value={comp} onValueChange={setComp}>
            <SelectTrigger className="w-full sm:w-56">
              <SelectValue placeholder="Competition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All competitions</SelectItem>
              {allComps.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <AdminInsights kids={kids} teams={teams} />

        <Tabs defaultValue="kids" className="mt-6">
          <TabsList>
            <TabsTrigger value="kids">Kids ({filteredKids.length})</TabsTrigger>
            <TabsTrigger value="teams">Group Dance ({filteredTeams.length})</TabsTrigger>
            <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
          </TabsList>

          <TabsContent value="sponsors">
            <SponsorsAdmin />
          </TabsContent>

          <TabsContent value="kids">
            <div className="mb-3 flex justify-end">
              <Button variant="gold" onClick={() => toCsv(filteredKids, "kids-registrations.csv")}>
                <Download /> Export CSV
              </Button>
            </div>
            <div className="gold-frame overflow-x-auto rounded-2xl bg-card">
              <table className="w-full min-w-[900px] text-sm">
                <thead className="bg-muted text-left">
                  <tr>
                    {[
                      "Reg ID",
                      "Child",
                      "Age",
                      "Category",
                      "Competitions",
                      "Parent",
                      "Contact",
                      "Status",
                      "",
                    ].map((h) => (
                      <th key={h} className="p-3 font-semibold text-primary">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredKids.map((k) => (
                    <tr key={k.id} className="border-t border-border">
                      <td className="p-3 font-medium">{k.registration_id}</td>
                      <td className="p-3">{k.child_name}</td>
                      <td className="p-3">{k.child_age}</td>
                      <td className="p-3">{k.category}</td>
                      <td className="p-3 text-xs text-muted-foreground">
                        {(k.competitions ?? []).join(", ")}
                      </td>
                      <td className="p-3">{k.parent_name}</td>
                      <td className="p-3 text-xs">
                        <a
                          className="text-leaf"
                          href={`https://wa.me/91${k.mobile.replace(/\D/g, "").slice(-10)}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {k.mobile}
                        </a>
                        <br />
                        {k.email}
                      </td>
                      <td className="p-3 capitalize">{k.status}</td>
                      <td className="p-3">
                        <Select
                          value={k.status}
                          onValueChange={(v) => void setStatus("kids_registrations", k.id, v)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="attended">Attended</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!filteredKids.length ? (
                <p className="p-6 text-center text-sm text-muted-foreground">
                  No registrations yet.
                </p>
              ) : null}
            </div>
          </TabsContent>

          <TabsContent value="teams">
            <div className="mb-3 flex justify-end gap-2">
              <Button asChild variant="whatsapp">
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </Button>
              <Button variant="gold" onClick={() => toCsv(filteredTeams, "dance-teams.csv")}>
                <Download /> Export CSV
              </Button>
            </div>
            <div className="gold-frame overflow-x-auto rounded-2xl bg-card">
              <table className="w-full min-w-[900px] text-sm">
                <thead className="bg-muted text-left">
                  <tr>
                    {[
                      "Reg ID",
                      "Team",
                      "Leader",
                      "Members",
                      "Style",
                      "Song",
                      "Contact",
                      "Status",
                    ].map((h) => (
                      <th key={h} className="p-3 font-semibold text-primary">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredTeams.map((t) => (
                    <tr key={t.id} className="border-t border-border">
                      <td className="p-3 font-medium">{t.registration_id}</td>
                      <td className="p-3">{t.team_name}</td>
                      <td className="p-3">{t.leader_name}</td>
                      <td className="p-3">{t.participants}</td>
                      <td className="p-3">{t.dance_style}</td>
                      <td className="p-3">{t.song_name}</td>
                      <td className="p-3 text-xs">
                        {t.mobile}
                        <br />
                        {t.email}
                      </td>
                      <td className="p-3">
                        <Select
                          value={t.status}
                          onValueChange={(v) => void setStatus("dance_registrations", t.id, v)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="attended">Attended</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!filteredTeams.length ? (
                <p className="p-6 text-center text-sm text-muted-foreground">No teams yet.</p>
              ) : null}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
