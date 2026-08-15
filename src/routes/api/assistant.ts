import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { assistantSystemPrompt } from "@/lib/festival-context";

const schema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(800),
      }),
    )
    .min(1)
    .max(24),
});

export const Route = createFileRoute("/api/assistant")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = schema.safeParse(await request.json());
        if (!parsed.success) return new Response("Invalid request", { status: 400 });

        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return new Response("AI is not configured", { status: 500 });

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3.6-flash",
            stream: true,
            messages: [
              { role: "system", content: assistantSystemPrompt() },
              ...parsed.data.messages,
            ],
          }),
        });

        if (res.status === 429)
          return new Response("Many devotees are asking right now — please try again shortly.", {
            status: 429,
          });
        if (res.status === 402)
          return new Response("AI credits are exhausted. Please contact the organisers.", {
            status: 402,
          });
        if (!res.ok || !res.body) return new Response("AI request failed", { status: 502 });

        return new Response(res.body, {
          headers: {
            "content-type": "text/event-stream; charset=utf-8",
            "cache-control": "no-store",
            connection: "keep-alive",
          },
        });
      },
    },
  },
});
