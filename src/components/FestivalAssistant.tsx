import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { RotateCcw, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionTitle } from "@/components/Decor";
import { Markdown } from "@/components/Markdown";
import { EVENT } from "@/lib/event";

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "kj2026.assistant.v1";

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Hare Krishna! I can help with timings, competitions, registration, the venue and Janmashtami traditions. What would you like to know?",
};

const SUGGESTIONS = [
  "What time do the kids competitions start?",
  "How do I register my child?",
  "Is there parking at the venue?",
  "What is Palaki Utsava?",
];

export function FestivalAssistant() {
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Memory: restore the conversation for this browser after hydration.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Msg[];
      if (Array.isArray(saved) && saved.length) setMessages(saved.slice(-40));
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
    } catch {
      /* storage may be unavailable */
    }
  }, [messages]);

  const scroll = () =>
    requestAnimationFrame(() =>
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }),
    );

  const send = async (text: string) => {
    const question = text.trim().slice(0, 800);
    if (!question || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: question }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setStreaming("");
    scroll();

    let acc = "";
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Full history so the assistant remembers the conversation.
        body: JSON.stringify({ messages: next.filter((m) => m !== WELCOME).slice(-16) }),
      });

      if (!res.ok || !res.body) {
        const reason = await res.text();
        setMessages([
          ...next,
          { role: "assistant", content: reason || `Please call ${EVENT.phone} for help.` },
        ]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const payload = line.trim();
          if (!payload.startsWith("data:")) continue;
          const body = payload.slice(5).trim();
          if (!body || body === "[DONE]") continue;
          try {
            const chunk = JSON.parse(body) as {
              choices?: { delta?: { content?: string } }[];
            };
            const delta = chunk.choices?.[0]?.delta?.content;
            if (delta) {
              acc += delta;
              setStreaming(acc);
              scroll();
            }
          } catch {
            /* partial JSON frame */
          }
        }
      }

      setMessages([
        ...next,
        {
          role: "assistant",
          content: acc.trim() || `Please call ${EVENT.phone} and we will help.`,
        },
      ]);
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: `Sorry, something went wrong. Please call ${EVENT.phone}.` },
      ]);
    } finally {
      setStreaming("");
      setLoading(false);
      scroll();
    }
  };

  const reset = () => {
    setMessages([WELCOME]);
    setStreaming("");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return (
    <section id="assistant" className="relative bg-background py-16">
      <div aria-hidden className="mandala-bg absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-3xl px-4">
        <SectionTitle
          eyebrow="Instant help"
          title="Ask the Festival Assistant"
          subtitle="Ask about timings, competitions, registration and traditions — the assistant remembers your conversation on this device."
        />
        <div className="gold-frame rounded-3xl bg-card p-5">
          <div
            ref={listRef}
            className="max-h-80 space-y-3 overflow-y-auto pr-1"
            aria-live="polite"
            role="log"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-saffron text-primary-foreground"
                    : "bg-secondary/40 text-foreground ring-1 ring-gold/30"
                }`}
              >
                {m.role === "assistant" ? <Markdown text={m.content} /> : m.content}
              </div>
            ))}
            {streaming ? (
              <div className="max-w-[85%] rounded-2xl bg-secondary/40 px-4 py-2.5 text-sm text-foreground ring-1 ring-gold/30">
                <Markdown text={streaming} />
              </div>
            ) : null}
            {loading && !streaming ? (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="size-4 animate-pulse text-saffron" aria-hidden /> Thinking…
              </p>
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => void send(s)}
                className="min-h-9 rounded-full border border-gold/50 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-secondary/40"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              aria-label="Ask a question about the festival"
              maxLength={800}
              className="h-12"
            />
            <Button type="submit" variant="gold" size="icon" className="size-12" aria-label="Send">
              <Send />
            </Button>
            <Button
              type="button"
              variant="outlineGold"
              size="icon"
              className="size-12"
              aria-label="Clear conversation"
              onClick={reset}
            >
              <RotateCcw />
            </Button>
          </form>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Ready to take part?{" "}
            <Link to="/register" className="font-semibold text-primary underline">
              Register for competitions
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
