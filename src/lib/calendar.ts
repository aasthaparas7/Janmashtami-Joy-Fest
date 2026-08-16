import { EVENT } from "@/lib/event";

export const EVENT_START = "2026-09-05T10:00:00+05:30";
export const EVENT_END = "2026-09-05T21:00:00+05:30";

const LOCATION = `${EVENT.venueName}, ${EVENT.venueAddress}`;
const DETAILS =
  "Sri Krishna Janmashtami 2026 organised by ISKCON Bengaluru. Kids competitions, group dance contest, cultural program, games, flea market, prasadam and grand kirtan.";

/** 20260905T043000Z style stamp used by ICS and Google Calendar. */
export function toStamp(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

export type CalendarEntry = {
  title: string;
  start: string;
  end: string;
  description?: string;
};

export const FULL_EVENT: CalendarEntry = {
  title: `${EVENT.title} ${EVENT.year} · ${EVENT.organiser}`,
  start: EVENT_START,
  end: EVENT_END,
  description: DETAILS,
};

export function googleCalendarUrl(entry: CalendarEntry): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: entry.title,
    dates: `${toStamp(entry.start)}/${toStamp(entry.end)}`,
    details: entry.description ?? DETAILS,
    location: LOCATION,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function outlookCalendarUrl(entry: CalendarEntry): string {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: entry.title,
    startdt: new Date(entry.start).toISOString(),
    enddt: new Date(entry.end).toISOString(),
    body: entry.description ?? DETAILS,
    location: LOCATION,
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

function escapeIcs(value: string): string {
  return value.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
}

export function buildIcs(entries: CalendarEntry[]): string {
  const stampNow = toStamp(new Date().toISOString());
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ISKCON//Janmashtami 2026//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];
  entries.forEach((entry, i) => {
    lines.push(
      "BEGIN:VEVENT",
      `UID:janmashtami-2026-${i}-${toStamp(entry.start)}@iskconhbrlayout`,
      `DTSTAMP:${stampNow}`,
      `DTSTART:${toStamp(entry.start)}`,
      `DTEND:${toStamp(entry.end)}`,
      `SUMMARY:${escapeIcs(entry.title)}`,
      `DESCRIPTION:${escapeIcs(entry.description ?? DETAILS)}`,
      `LOCATION:${escapeIcs(LOCATION)}`,
      "BEGIN:VALARM",
      "TRIGGER:-P1D",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeIcs(entry.title)} is tomorrow`,
      "END:VALARM",
      "BEGIN:VALARM",
      "TRIGGER:-PT2H",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeIcs(entry.title)} starts in 2 hours`,
      "END:VALARM",
      "END:VEVENT",
    );
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function downloadIcs(entries: CalendarEntry[], fileName = "janmashtami-2026.ics"): void {
  const blob = new Blob([buildIcs(entries)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Timed programs of the day, usable as individual calendar entries. */
export const PROGRAM_ENTRIES: CalendarEntry[] = [
  {
    title: "Darshan Start · Janmashtami 2026",
    start: "2026-09-05T10:00:00+05:30",
    end: "2026-09-05T10:30:00+05:30",
    description: "Free darshan of the Lord. Free entry and free prasad through the day.",
  },
  {
    title: "Kids Competitions · Janmashtami 2026",
    start: "2026-09-05T10:00:00+05:30",
    end: "2026-09-05T14:00:00+05:30",
    description: "Balgopal, Nandgopal and Nandkishore category competitions.",
  },
  {
    title: "Cultural Program · Janmashtami 2026",
    start: "2026-09-05T16:30:00+05:30",
    end: "2026-09-05T17:00:00+05:30",
    description: "Devotional and cultural performances.",
  },
  {
    title: "Group Dance Contest · Janmashtami 2026",
    start: "2026-09-05T17:00:00+05:30",
    end: "2026-09-05T19:00:00+05:30",
    description: "Krishna themed team performances.",
  },
  {
    title: "Prize Distribution · Janmashtami 2026",
    start: "2026-09-05T19:30:00+05:30",
    end: "2026-09-05T20:00:00+05:30",
    description: "Winners felicitated on stage.",
  },
  {
    title: "Palaki Utsava · Janmashtami 2026",
    start: "2026-09-05T20:00:00+05:30",
    end: "2026-09-05T20:30:00+05:30",
    description: "Divine procession of the Lord.",
  },
  {
    title: "Bhajan Clubbing · Janmashtami 2026",
    start: "2026-09-05T20:30:00+05:30",
    end: "2026-09-05T21:00:00+05:30",
    description: "Grand kirtan celebration.",
  },
];
