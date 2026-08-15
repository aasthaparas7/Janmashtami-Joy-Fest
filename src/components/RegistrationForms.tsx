import React, { useMemo, useState } from "react";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Loader2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { CATEGORIES } from "@/lib/event";
import { FULL_EVENT, downloadIcs, googleCalendarUrl } from "@/lib/calendar";

/** Indian mobile: 10 digits starting 6-9, optional +91/0 prefix, spaces or dashes allowed. */
const PHONE_RE = /^(?:\+?91[\s-]?|0)?[6-9]\d{9}$/;
const normalisePhone = (v: string) => v.replace(/[\s()-]/g, "");

const phone = z
  .string()
  .trim()
  .refine((v) => PHONE_RE.test(normalisePhone(v)), "Enter a valid 10-digit Indian mobile number");

const optionalPhone = z
  .string()
  .trim()
  .refine(
    (v) => v === "" || PHONE_RE.test(normalisePhone(v)),
    "Enter a valid 10-digit Indian mobile number",
  )
  .default("");

/** Age windows per competition category. */
const CATEGORY_AGES: Record<string, { min: number; max: number; label: string }> = {
  Balgopal: { min: 2, max: 5, label: "up to 5 years" },
  Nandgopal: { min: 6, max: 11, label: "6 – 11 years" },
  Nandkishore: { min: 12, max: 25, label: "12 years and above" },
};

const kidsSchema = z
  .object({
    parent_name: z.string().trim().min(2, "Enter parent/guardian name").max(100),
    mobile: phone,
    email: z.string().trim().email("Enter a valid email").max(255),
    child_name: z.string().trim().min(2, "Enter the child's name").max(100),
    child_age: z.coerce
      .number({ invalid_type_error: "Enter the child's age in years" })
      .int("Age must be a whole number")
      .min(2, "Age must be at least 2 years")
      .max(25, "Age must be 25 years or less"),
    category: z.enum(["Balgopal", "Nandgopal", "Nandkishore"], {
      errorMap: () => ({ message: "Select a category" }),
    }),
    competitions: z.array(z.string()).min(1, "Select at least one competition"),
    school_name: z.string().trim().max(150).default(""),
    city: z.string().trim().max(100).default(""),
    participants: z.coerce.number().int().min(1, "Enter number of participants").max(50),
    emergency_contact: optionalPhone,
  })
  .superRefine((v, ctx) => {
    const range = CATEGORY_AGES[v.category];
    if (range && (v.child_age < range.min || v.child_age > range.max)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["child_age"],
        message: `${v.category} is for children ${range.label}`,
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["category"],
        message: `Age ${v.child_age} does not match ${v.category} (${range.label})`,
      });
    }
    if (v.emergency_contact && normalisePhone(v.emergency_contact) === normalisePhone(v.mobile)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["emergency_contact"],
        message: "Use a different number from the primary mobile",
      });
    }
  });

const danceSchema = z.object({
  team_name: z.string().trim().min(2, "Enter team name").max(100),
  leader_name: z.string().trim().min(2, "Enter team leader name").max(100),
  mobile: phone,
  email: z.string().trim().email("Enter a valid email").max(255),
  participants: z.coerce.number().int().min(2, "At least 2 participants").max(60),
  age_group: z.string().trim().min(1, "Enter age group").max(50),
  dance_style: z.string().trim().min(2, "Enter dance style").max(80),
  song_name: z.string().trim().min(2, "Enter song/music name").max(150),
  performance_description: z.string().trim().max(600).default(""),
  team_members: z.string().trim().max(1000).default(""),
  organisation: z.string().trim().max(150).default(""),
  city: z.string().trim().max(100).default(""),
});

type Errors = Record<string, string>;

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  const id = React.useId();

  const control = React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement<Record<string, unknown>>, {
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? `${id}-err` : undefined,
      })
    : children;

  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id} className="text-sm text-primary">
        {label}
      </Label>
      {control}
      {error ? (
        <p id={`${id}-err`} className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Redesigned wizard shell: ornate header, numbered step rail and progress. */
function WizardShell({
  title,
  subtitle,
  steps,
  current,
  children,
}: {
  title: string;
  subtitle: string;
  steps: string[];
  current: number;
  children: React.ReactNode;
}) {
  return (
    <section className="gold-frame relative overflow-hidden rounded-[2rem] bg-card">
      <div aria-hidden className="gradient-gold h-1.5 w-full" />
      <header className="relative px-5 pt-6 text-center sm:px-8">
        <div aria-hidden className="mandala-bg absolute inset-0 opacity-40" />
        <p className="relative text-[11px] font-semibold tracking-[0.3em] text-saffron uppercase">
          {subtitle}
        </p>
        <h2 className="relative mt-2 font-serif-deco text-2xl text-primary">{title}</h2>
        <div className="ornate-rule mx-auto mt-4 w-40" />
      </header>
      <div className="grid gap-5 p-5 sm:p-8">
        <Stepper steps={steps} current={current} />
        {children}
      </div>
    </section>
  );
}

function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div>
      <ol className="flex items-start justify-between gap-1" aria-label="Registration progress">
        {steps.map((s, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li
              key={s}
              className="relative flex flex-1 flex-col items-center text-center"
              aria-current={active ? "step" : undefined}
            >
              {i > 0 ? (
                <span
                  aria-hidden
                  className={`absolute top-4 right-1/2 left-[-50%] h-0.5 ${
                    done || active ? "bg-gold" : "bg-border"
                  }`}
                />
              ) : null}
              <span
                aria-hidden
                className={`relative z-10 grid size-8 place-items-center rounded-full border text-xs font-bold transition-colors ${
                  done
                    ? "gradient-gold border-gold text-primary"
                    : active
                      ? "border-gold bg-secondary/50 text-primary shadow-gold"
                      : "border-border bg-muted text-muted-foreground"
                }`}
              >
                {done ? <Check className="size-4" /> : i + 1}
              </span>
              <span
                className={`mt-2 text-[10px] leading-tight sm:text-xs ${
                  active ? "font-semibold text-primary" : "text-muted-foreground"
                }`}
              >
                {s}
              </span>
              <span className="sr-only">
                {done ? "completed" : active ? "current step" : "upcoming step"}
              </span>
            </li>
          );
        })}
      </ol>
      <Progress
        value={((current + 1) / steps.length) * 100}
        className="mt-4 h-2"
        aria-label={`Step ${current + 1} of ${steps.length}`}
      />
      <p aria-live="polite" className="sr-only">
        Step {current + 1} of {steps.length}: {steps[current]}
      </p>
    </div>
  );
}

function Review({ rows }: { rows: Array<[string, string]> }) {
  return (
    <dl className="grid gap-2 rounded-2xl border border-gold/30 bg-muted/50 p-4 text-sm">
      {rows.map(([k, v]) => (
        <div
          key={k}
          className="flex justify-between gap-4 border-b border-border/60 pb-2 last:border-0 last:pb-0"
        >
          <dt className="text-muted-foreground">{k}</dt>
          <dd className="text-right font-medium text-primary">{v || "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

function Nav({
  step,
  last,
  loading,
  onBack,
  onNext,
  submitLabel,
  variant = "gold",
}: {
  step: number;
  last: boolean;
  loading: boolean;
  onBack: () => void;
  onNext: () => void;
  submitLabel: string;
  variant?: "gold" | "royal";
}) {
  return (
    <div className="mt-2 flex gap-3">
      {step > 0 ? (
        <Button
          type="button"
          variant="outlineGold"
          size="xl"
          onClick={onBack}
          disabled={loading}
          aria-label="Go back to the previous step"
        >
          <ArrowLeft aria-hidden /> Back
        </Button>
      ) : null}
      <Button
        type="button"
        variant={variant}
        size="xl"
        className="flex-1"
        disabled={loading}
        onClick={onNext}
      >
        {loading ? <Loader2 className="animate-spin" aria-hidden /> : null}
        {last ? submitLabel : "Continue"}
        {last ? null : <ArrowRight aria-hidden />}
      </Button>
    </div>
  );
}

function Success({ id, onReset }: { id: string; onReset: () => void }) {
  return (
    <div
      className="gold-frame relative overflow-hidden rounded-[2rem] bg-card p-8 text-center"
      role="status"
      aria-live="polite"
    >
      <div aria-hidden className="mandala-bg absolute inset-0 opacity-40" />
      <div className="relative">
        <CheckCircle2 className="mx-auto size-12 text-leaf" aria-hidden />
        <h3 className="mt-4 text-2xl text-primary">Registration Successful!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Hare Krishna! Your registration has been received. Please save your registration ID and
          show it at the venue.
        </p>
        <p className="gradient-gold mx-auto mt-4 inline-block rounded-full px-6 py-2 font-display text-xl text-primary">
          {id}
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          Participation fee of ₹150 per competition is payable on the spot. Please reach the venue
          30 minutes early.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button asChild variant="gold">
            <a href={googleCalendarUrl(FULL_EVENT)} target="_blank" rel="noopener noreferrer">
              Add to Google Calendar
            </a>
          </Button>
          <Button variant="outlineGold" onClick={() => downloadIcs([FULL_EVENT])}>
            Download .ics reminder
          </Button>
        </div>
        <Button variant="ghost" className="mt-4 min-h-11" onClick={onReset}>
          Register another
        </Button>
      </div>
    </div>
  );
}


const KIDS_STEPS = ["Contact", "Child", "Competitions", "Review"];

export function KidsForm() {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [regId, setRegId] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState({
    parent_name: "",
    mobile: "",
    email: "",
    child_name: "",
    child_age: "",
    category: "",
    competitions: [] as string[],
    school_name: "",
    city: "",
    participants: "1",
    emergency_contact: "",
  });

  const set = (key: keyof typeof form, value: string | string[]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const options = useMemo(
    () => CATEGORIES.find((c) => c.key === form.category)?.competitions ?? [],
    [form.category],
  );

  const validateStep = (index: number) => {
    const fieldsByStep: string[][] = [
      ["parent_name", "mobile", "email"],
      ["child_name", "child_age", "category", "participants"],
      ["competitions", "emergency_contact", "school_name", "city"],
      [],
    ];
    const parsed = kidsSchema.safeParse(form);
    const next: Errors = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (fieldsByStep[index]?.includes(key)) next[key] = issue.message;
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (!consent) {
      setErrors({ consent: "Please accept the event rules and guidelines" });
      return;
    }
    const parsed = kidsSchema.safeParse(form);
    if (!parsed.success) {
      setErrors({ form: "Please review the earlier steps and fix the highlighted fields." });
      return;
    }
    setErrors({});
    setLoading(true);
    const { data, error } = await supabase.rpc("submit_kids_registration", {
      payload: parsed.data,
    });
    setLoading(false);
    if (error) {
      setErrors({ form: "Something went wrong. Please try again or call 9483510338." });
      return;
    }
    setRegId((data as string) ?? "KJ-2026");
  };

  const next = () => {
    if (step === KIDS_STEPS.length - 1) {
      void submit();
      return;
    }
    if (validateStep(step)) setStep((s) => s + 1);
  };

  if (regId)
    return (
      <Success
        id={regId}
        onReset={() => {
          setRegId(null);
          setStep(0);
          setConsent(false);
          setForm({
            parent_name: "",
            mobile: "",
            email: "",
            child_name: "",
            child_age: "",
            category: "",
            competitions: [],
            school_name: "",
            city: "",
            participants: "1",
            emergency_contact: "",
          });
        }}
      />
    );

  return (
    <WizardShell
      title="Kids Competition Registration"
      subtitle="Balgopal · Nandgopal · Nandkishore"
      steps={KIDS_STEPS}
      current={step}
    >


      {step === 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Parent/Guardian Name" error={errors["parent_name"]}>
            <Input
              value={form.parent_name}
              onChange={(e) => set("parent_name", e.target.value)}
              placeholder="Full name"
              maxLength={100}
            />
          </Field>
          <Field label="Mobile Number" error={errors["mobile"]}>
            <Input
              value={form.mobile}
              onChange={(e) => set("mobile", e.target.value)}
              inputMode="tel"
              placeholder="10 digit mobile"
              maxLength={15}
            />
          </Field>
          <Field label="Email" error={errors["email"]}>
            <Input
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              type="email"
              placeholder="you@email.com"
              maxLength={255}
            />
          </Field>
        </div>
      ) : null}

      {step === 1 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Child Name" error={errors["child_name"]}>
              <Input
                value={form.child_name}
                onChange={(e) => set("child_name", e.target.value)}
                placeholder="Child's full name"
                maxLength={100}
              />
            </Field>
            <Field label="Child Age" error={errors["child_age"]}>
              <Input
                value={form.child_age}
                onChange={(e) => set("child_age", e.target.value)}
                type="number"
                min={1}
                max={25}
                placeholder="Age in years"
              />
            </Field>
            <Field label="Number of participants" error={errors["participants"]}>
              <Input
                value={form.participants}
                onChange={(e) => set("participants", e.target.value)}
                type="number"
                min={1}
                max={50}
              />
            </Field>
          </div>
          <Field label="Category" error={errors["category"]}>
            <div className="grid gap-2 sm:grid-cols-3">
              {CATEGORIES.map((c) => (
                <button
                  type="button"
                  key={c.key}
                  onClick={() => {
                    set("category", c.key);
                    set("competitions", []);
                  }}
                  className={`rounded-2xl border p-3 text-left transition-colors ${
                    form.category === c.key
                      ? "border-gold bg-secondary/40"
                      : "border-border hover:bg-muted/60"
                  }`}
                >
                  <span className="block font-semibold text-primary">{c.key}</span>
                  <span className="block text-xs text-muted-foreground">{c.age}</span>
                </button>
              ))}
            </div>
          </Field>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <Field label="Select Competition (multiple allowed)" error={errors["competitions"]}>
            <div className="grid gap-2 sm:grid-cols-2">
              {options.map((o) => (
                <label
                  key={o}
                  className="flex items-start gap-2 rounded-xl border border-border p-3 text-sm"
                >
                  <Checkbox
                    checked={form.competitions.includes(o)}
                    onCheckedChange={(v) =>
                      set(
                        "competitions",
                        v
                          ? [...form.competitions, o]
                          : form.competitions.filter((item) => item !== o),
                      )
                    }
                  />
                  <span>{o}</span>
                </label>
              ))}
            </div>
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="School Name" error={errors["school_name"]}>
              <Input
                value={form.school_name}
                onChange={(e) => set("school_name", e.target.value)}
                placeholder="School / institution"
                maxLength={150}
              />
            </Field>
            <Field label="City / Area" error={errors["city"]}>
              <Input
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                placeholder="e.g. Horamavu"
                maxLength={100}
              />
            </Field>
          </div>
          <Field label="Emergency Contact (optional)" error={errors["emergency_contact"]}>
            <Input
              value={form.emergency_contact}
              onChange={(e) => set("emergency_contact", e.target.value)}
              inputMode="tel"
              placeholder="Alternate number"
              maxLength={15}
            />
          </Field>
        </>
      ) : null}

      {step === 3 ? (
        <>
          <Review
            rows={[
              ["Parent/Guardian", form.parent_name],
              ["Mobile", form.mobile],
              ["Email", form.email],
              ["Child", `${form.child_name} (${form.child_age} yrs)`],
              ["Category", form.category],
              ["Competitions", form.competitions.join(", ")],
              ["Participants", form.participants],
              ["School", form.school_name],
              ["City", form.city],
              ["Emergency contact", form.emergency_contact],
            ]}
          />
          <label className="flex items-start gap-2 text-sm text-muted-foreground">
            <Checkbox checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} />
            <span>I agree to the event rules and guidelines.</span>
          </label>
          {errors["consent"] ? (
            <p className="text-xs text-destructive">{errors["consent"]}</p>
          ) : null}
          {errors["form"] ? <p className="text-xs text-destructive">{errors["form"]}</p> : null}
        </>
      ) : null}

      <Nav
        step={step}
        last={step === KIDS_STEPS.length - 1}
        loading={loading}
        onBack={() => setStep((s) => Math.max(0, s - 1))}
        onNext={next}
        submitLabel="Submit Registration"
      />
      <p className="text-center text-xs text-muted-foreground">
        Registration fee of ₹150 per competition to be paid on the spot. Deadline: 2nd September 2026.
      </p>
    </WizardShell>

  );
}

const DANCE_STEPS = ["Team", "Leader", "Performance", "Review"];

export function DanceForm() {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [regId, setRegId] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const empty = {
    team_name: "",
    leader_name: "",
    mobile: "",
    email: "",
    participants: "4",
    age_group: "",
    dance_style: "",
    song_name: "",
    performance_description: "",
    team_members: "",
    organisation: "",
    city: "",
  };
  const [form, setForm] = useState(empty);
  const set = (key: keyof typeof empty, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validateStep = (index: number) => {
    const fieldsByStep: string[][] = [
      ["team_name", "participants", "organisation", "city"],
      ["leader_name", "mobile", "email"],
      ["age_group", "dance_style", "song_name", "performance_description", "team_members"],
      [],
    ];
    const parsed = danceSchema.safeParse(form);
    const next: Errors = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (fieldsByStep[index]?.includes(key)) next[key] = issue.message;
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async () => {
    if (!consent) {
      setErrors({ consent: "Please accept the event rules and guidelines" });
      return;
    }
    const parsed = danceSchema.safeParse(form);
    if (!parsed.success) {
      setErrors({ form: "Please review the earlier steps and fix the highlighted fields." });
      return;
    }
    setErrors({});
    setLoading(true);
    const { data, error } = await supabase.rpc("submit_dance_registration", {
      payload: parsed.data,
    });
    setLoading(false);
    if (error) {
      setErrors({ form: "Something went wrong. Please try again or call 9483510338." });
      return;
    }
    setRegId((data as string) ?? "GD-2026");
  };

  const next = () => {
    if (step === DANCE_STEPS.length - 1) {
      void submit();
      return;
    }
    if (validateStep(step)) setStep((s) => s + 1);
  };

  if (regId)
    return (
      <Success
        id={regId}
        onReset={() => {
          setRegId(null);
          setStep(0);
          setConsent(false);
          setForm(empty);
        }}
      />
    );

  return (
    <WizardShell
      title="Group Dance Contest Registration"
      subtitle="Krishna themed team performances"
      steps={DANCE_STEPS}
      current={step}
    >


      {step === 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Team Name" error={errors["team_name"]}>
            <Input
              value={form.team_name}
              onChange={(e) => set("team_name", e.target.value)}
              placeholder="Your team name"
              maxLength={100}
            />
          </Field>
          <Field label="Number of Participants" error={errors["participants"]}>
            <Input
              value={form.participants}
              onChange={(e) => set("participants", e.target.value)}
              type="number"
              min={2}
              max={60}
            />
          </Field>
          <Field label="School / Academy / Organisation" error={errors["organisation"]}>
            <Input
              value={form.organisation}
              onChange={(e) => set("organisation", e.target.value)}
              maxLength={150}
            />
          </Field>
          <Field label="City / Area" error={errors["city"]}>
            <Input
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              maxLength={100}
            />
          </Field>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Team Leader Name" error={errors["leader_name"]}>
            <Input
              value={form.leader_name}
              onChange={(e) => set("leader_name", e.target.value)}
              placeholder="Leader's full name"
              maxLength={100}
            />
          </Field>
          <Field label="Mobile Number" error={errors["mobile"]}>
            <Input
              value={form.mobile}
              onChange={(e) => set("mobile", e.target.value)}
              inputMode="tel"
              placeholder="10 digit mobile"
              maxLength={15}
            />
          </Field>
          <Field label="Email" error={errors["email"]}>
            <Input
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              type="email"
              placeholder="you@email.com"
              maxLength={255}
            />
          </Field>
        </div>
      ) : null}

      {step === 2 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Age Group" error={errors["age_group"]}>
              <Input
                value={form.age_group}
                onChange={(e) => set("age_group", e.target.value)}
                placeholder="e.g. 8 – 14 years"
                maxLength={50}
              />
            </Field>
            <Field label="Dance Style" error={errors["dance_style"]}>
              <Input
                value={form.dance_style}
                onChange={(e) => set("dance_style", e.target.value)}
                placeholder="Classical, folk, semi-classical..."
                maxLength={80}
              />
            </Field>
            <Field label="Song / Music Name" error={errors["song_name"]}>
              <Input
                value={form.song_name}
                onChange={(e) => set("song_name", e.target.value)}
                placeholder="Track name"
                maxLength={150}
              />
            </Field>
          </div>
          <Field label="Short Performance Description" error={errors["performance_description"]}>
            <Textarea
              value={form.performance_description}
              onChange={(e) => set("performance_description", e.target.value)}
              rows={3}
              maxLength={600}
              placeholder="Tell us about your Krishna themed performance"
            />
          </Field>
          <Field label="Team Members" error={errors["team_members"]}>
            <Textarea
              value={form.team_members}
              onChange={(e) => set("team_members", e.target.value)}
              rows={3}
              maxLength={1000}
              placeholder="Names of all members"
            />
          </Field>
        </>
      ) : null}

      {step === 3 ? (
        <>
          <Review
            rows={[
              ["Team", form.team_name],
              ["Leader", form.leader_name],
              ["Mobile", form.mobile],
              ["Email", form.email],
              ["Participants", form.participants],
              ["Age group", form.age_group],
              ["Style", form.dance_style],
              ["Song", form.song_name],
              ["Organisation", form.organisation],
              ["City", form.city],
            ]}
          />
          <label className="flex items-start gap-2 text-sm text-muted-foreground">
            <Checkbox checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} />
            <span>I agree to the event rules and guidelines.</span>
          </label>
          {errors["consent"] ? (
            <p className="text-xs text-destructive">{errors["consent"]}</p>
          ) : null}
          {errors["form"] ? <p className="text-xs text-destructive">{errors["form"]}</p> : null}
        </>
      ) : null}

      <Nav
        step={step}
        last={step === DANCE_STEPS.length - 1}
        loading={loading}
        onBack={() => setStep((s) => Math.max(0, s - 1))}
        onNext={next}
        submitLabel="Submit Team Registration"
        variant="royal"
      />
      <p className="text-center text-xs text-muted-foreground">
        Theme must be based on Lord Krishna. Deadline: 2nd September 2026.
      </p>
    </WizardShell>

  );
}
