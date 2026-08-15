import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { chat } from "@/lib/ai.server";
import { festivalFacts } from "@/lib/festival-context";

/* ---------------------------------- Ideas --------------------------------- */

export const generateFestivalIdeas = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        kind: z.enum(["dance", "costume", "decoration"]),
        category: z.string().trim().min(1).max(60),
        notes: z.string().trim().max(300).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const label =
      data.kind === "dance"
        ? "group dance / performance concepts"
        : data.kind === "costume"
          ? "Krishna-themed costume and make-up ideas"
          : "stage and home decoration ideas";

    const { error, json } = await chat({
      model: "google/gemini-3.6-flash",
      messages: [
        {
          role: "system",
          content: [
            "You are a creative director for a family Krishna Janmashtami festival in Bengaluru.",
            "Give practical, affordable, culturally respectful ideas that Indian families can arrange locally.",
            "Reply in markdown: exactly 3 numbered ideas. Each idea has a bold title, one line of concept,",
            "a 'Needs:' line with 3-4 simple props, and a 'Song/Tip:' line. Keep the whole reply under 200 words.",
            "",
            festivalFacts(),
          ].join("\n"),
        },
        {
          role: "user",
          content: `Suggest ${label} for the "${data.category}" participants.${
            data.notes ? ` Extra context: ${data.notes}` : ""
          }`,
        },
      ],
    });

    if (error) return { text: "", error };
    const text = json?.choices?.[0]?.message?.content?.trim() ?? "";
    return { text, error: text ? null : "No ideas came back. Please try again." };
  });

/* -------------------------------- Greeting -------------------------------- */

export const generateGreetingCard = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        name: z.string().trim().min(1).max(40),
        recipient: z.string().trim().max(40).optional(),
        tone: z.enum(["devotional", "joyful", "poetic", "family"]),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const to = data.recipient?.trim();

    const textRes = await chat({
      model: "google/gemini-3.6-flash",
      messages: [
        {
          role: "system",
          content:
            "You write short Krishna Janmashtami greetings for WhatsApp. Reply with ONLY the greeting: " +
            "2 to 3 short lines, warm and respectful, at most 45 words, with 1-2 tasteful emojis and ending with 'Hare Krishna'.",
        },
        {
          role: "user",
          content: `Tone: ${data.tone}. From: ${data.name}.${to ? ` For: ${to}.` : ""} Mention Sri Krishna Janmashtami 2026 blessings.`,
        },
      ],
    });
    if (textRes.error) return { message: "", image: "", error: textRes.error };
    const message = textRes.json?.choices?.[0]?.message?.content?.trim() ?? "";

    const imgRes = await chat({
      model: "google/gemini-3.1-flash-image",
      modalities: ["image", "text"],
      messages: [
        {
          role: "user",
          content:
            "A premium devotional Krishna Janmashtami greeting card illustration: baby Krishna with a flute and peacock feather, " +
            "marigold garlands, diyas, gold filigree border, deep royal blue and saffron palette, traditional Indian art style, " +
            "festive and joyful, no text or lettering anywhere in the image.",
        },
      ],
    });

    const image = imgRes.json?.choices?.[0]?.message?.images?.[0]?.image_url?.url ?? "";
    return { message, image, error: message ? null : "Please try again." };
  });

/* ------------------------------ Admin insights ----------------------------- */

export const generateAdminInsights = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        stats: z.string().trim().min(1).max(4000),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    const { error, json } = await chat({
      model: "google/gemini-3.6-flash",
      messages: [
        {
          role: "system",
          content: [
            "You advise the organising team of Sri Krishna Janmashtami 2026 (ISKCON HBR Layout, Bengaluru).",
            "You receive anonymised registration counts only. Reply in markdown with three short sections:",
            "**What the numbers say** (3 bullets), **Gaps & risks** (2 bullets), **Do this week** (3 concrete actions).",
            "Be specific about competitions, age categories and volunteer/logistics needs. Under 220 words.",
            "",
            festivalFacts(),
          ].join("\n"),
        },
        { role: "user", content: data.stats },
      ],
    });

    if (error) return { text: "", error };
    const text = json?.choices?.[0]?.message?.content?.trim() ?? "";
    return { text, error: text ? null : "No insights came back. Please try again." };
  });
