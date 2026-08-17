import { useCallback, useEffect, useState } from "react";
import { Bell, BellOff, CalendarPlus, Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  EVENT_START,
  FULL_EVENT,
  PROGRAM_ENTRIES,
  downloadIcs,
  googleCalendarUrl,
} from "@/lib/calendar";

const STORAGE_KEY = "kj2026-reminders";
const MAX_TIMEOUT = 2_147_000_000;

const MILESTONES = [
  {
    ms: 30 * 86400000,
    label: "30 days to go",
    body: "One month until Sri Krishna Janmashtami 2026!",
  },
  {
    ms: 7 * 86400000,
    label: "1 week to go",
    body: "Janmashtami 2026 is one week away. Register before 2nd September.",
  },
  {
    ms: 86400000,
    label: "Tomorrow",
    body: "Janmashtami 2026 is tomorrow at SLS International Gurukul, Horamavu.",
  },
  {
    ms: 2 * 3600000,
    label: "2 hours to go",
    body: "The celebration begins in 2 hours. Reach the venue 30 minutes early.",
  },
  { ms: 0, label: "Happening now", body: "Hare Krishna! Sri Krishna Janmashtami 2026 has begun." },
];

/** Compact calendar + reminder strip (no countdown — the hero owns that). */
export function CalendarActions() {
  const startAt = new Date(EVENT_START).getTime();
  const [remindersOn, setRemindersOn] = useState(false);

  useEffect(() => {
    setRemindersOn(localStorage.getItem(STORAGE_KEY) === "on");
  }, []);

  useEffect(() => {
    if (!remindersOn || typeof Notification === "undefined") return;
    const timers = MILESTONES.map((m) => {
      const delay = startAt - m.ms - Date.now();
      if (delay <= 0 || delay > MAX_TIMEOUT) return null;
      return window.setTimeout(() => {
        if (Notification.permission === "granted") {
          new Notification(`Janmashtami 2026 · ${m.label}`, { body: m.body });
        }
        toast(`Janmashtami 2026 · ${m.label}`, { description: m.body });
      }, delay);
    });
    return () => timers.forEach((id) => id !== null && window.clearTimeout(id));
  }, [remindersOn, startAt]);

  const toggleReminders = useCallback(async () => {
    if (remindersOn) {
      localStorage.removeItem(STORAGE_KEY);
      setRemindersOn(false);
      toast("Reminders turned off");
      return;
    }
    if (typeof Notification === "undefined") {
      toast.error("This browser does not support notifications", {
        description:
          "Add the event to your calendar instead — it includes 1 day and 2 hour alerts.",
      });
      return;
    }
    const permission =
      Notification.permission === "granted" ? "granted" : await Notification.requestPermission();
    if (permission !== "granted") {
      toast.error("Notifications blocked", {
        description: "Allow notifications in your browser, or add the event to your calendar.",
      });
      return;
    }
    localStorage.setItem(STORAGE_KEY, "on");
    setRemindersOn(true);
    toast.success("Reminders enabled", {
      description: "You will be alerted 30 days, 1 week, 1 day and 2 hours before the event.",
    });
  }, [remindersOn]);

  return (
    <div className="gold-frame mt-8 rounded-3xl bg-card/95 p-5">
      <p className="text-center text-sm text-muted-foreground">
        Save the date — calendar entries include alerts 1 day and 2 hours before.
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Button asChild variant="gold" size="xl">
          <a href={googleCalendarUrl(FULL_EVENT)} target="_blank" rel="noopener noreferrer">
            <CalendarPlus /> Google Calendar
          </a>
        </Button>
        <Button
          variant="outlineGold"
          size="xl"
          className="bg-card"
          onClick={() => {
            downloadIcs([FULL_EVENT, ...PROGRAM_ENTRIES]);
            toast.success("Calendar file downloaded", {
              description: "Open it to add the full day schedule with reminders.",
            });
          }}
        >
          <Download /> Apple / Outlook
        </Button>
        <Button
          variant={remindersOn ? "royal" : "outlineGold"}
          size="xl"
          className={remindersOn ? "" : "bg-card"}
          onClick={toggleReminders}
        >
          {remindersOn ? <BellOff /> : <Bell />}
          {remindersOn ? "Reminders on" : "Remind me"}
        </Button>
      </div>
    </div>
  );
}
