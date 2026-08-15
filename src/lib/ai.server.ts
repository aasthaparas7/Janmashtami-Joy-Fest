import { EVENT } from "@/lib/event";

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";

export type ChatJson = {
  choices?: {
    message?: { content?: string; images?: { image_url?: { url?: string } }[] };
  }[];
};

export async function chat(body: Record<string, unknown>) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return { error: "AI is not configured right now." as const, json: null };

  const res = await fetch(GATEWAY, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (res.status === 429)
    return { error: "Too many requests right now — please try again in a moment.", json: null };
  if (res.status === 402)
    return { error: `AI credits are exhausted. Please call ${EVENT.phone}.`, json: null };
  if (!res.ok) return { error: "Sorry, that did not work. Please try again.", json: null };

  return { error: null, json: (await res.json()) as ChatJson };
}
