"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Bot, Sparkles, X } from "lucide-react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkBreaks from "remark-breaks";
import { digitalTwin, profile } from "@/lib/content";

type Message = { role: "user" | "assistant"; content: string };

const markdownComponents: Components = {
  p: ({ children }) => <p className="[&:not(:last-child)]:mb-2">{children}</p>,
  ul: ({ children }) => <ul className="my-1.5 list-disc space-y-1 pl-4">{children}</ul>,
  ol: ({ children }) => <ol className="my-1.5 list-decimal space-y-1 pl-4">{children}</ol>,
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 hover:text-amber"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="rounded bg-black/20 px-1 py-0.5 font-mono text-[0.85em]">
      {children}
    </code>
  ),
};

const GREETING: Message = { role: "assistant", content: digitalTwin.greeting };

const SUGGESTIONS = digitalTwin.suggestions;

export function DigitalTwin() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, busy]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;

    setError(null);
    const history = [...messages, { role: "user" as const, content: trimmed }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_CHAT_API_URL ?? "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // strip the static greeting (always the first message) before sending to the model
        body: JSON.stringify({ messages: history.slice(1) }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Something went wrong.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: acc };
          return next;
        });
      }

      if (!acc.trim()) {
        throw new Error("No response received. Please try again.");
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong.";
      setError(msg);
      // drop the empty assistant placeholder
      setMessages((prev) => {
        const next = [...prev];
        if (next[next.length - 1]?.content === "") next.pop();
        return next;
      });
    } finally {
      setBusy(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  const showSuggestions = messages.length === 1 && !busy;

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Digital Twin chat" : "Chat with Alex's Digital Twin"}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="group fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2.5 rounded-full bg-amber px-4 py-3.5 text-sm font-semibold text-[#1a1205] shadow-[0_10px_40px_rgba(245,177,61,0.35)] transition hover:bg-amber-bright sm:bottom-6 sm:right-6"
      >
        <span className="relative flex h-5 w-5 items-center justify-center">
          {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
        </span>
        <span className="hidden sm:inline">
          {open ? "Close" : "Ask my Digital Twin"}
        </span>
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-3 left-3 z-[60] flex max-h-[72vh] flex-col overflow-hidden rounded-2xl border border-border-strong bg-bg-2/95 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:left-auto sm:right-6 sm:bottom-28 sm:w-[28rem]"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-amber/[0.08] to-transparent px-4 py-3.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-amber/15 text-amber ring-1 ring-amber/30">
                <Bot className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-semibold text-fg">
                  {profile.firstName}&apos;s Digital Twin
                  <span className="rounded-full bg-amber/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-amber">
                    AI
                  </span>
                </p>
                <p className="truncate text-xs text-fg-faint">
                  Trained on Alex&apos;s career &amp; experience
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid h-8 w-8 place-items-center rounded-md text-fg-faint transition hover:bg-surface hover:text-fg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "whitespace-pre-wrap rounded-br-sm bg-amber text-[#1a1205]"
                        : "rounded-bl-sm border border-border bg-surface text-fg"
                    }`}
                  >
                    {m.content ? (
                      m.role === "assistant" ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkBreaks]}
                          components={markdownComponents}
                        >
                          {m.content}
                        </ReactMarkdown>
                      ) : (
                        m.content
                      )
                    ) : (
                      <TypingDots />
                    )}
                  </div>
                </div>
              ))}

              {showSuggestions ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-fg-muted transition hover:border-amber/40 hover:text-amber-bright"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : null}

              {error ? (
                <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                  {error}
                </p>
              ) : null}
            </div>

            {/* composer */}
            <div className="border-t border-border bg-bg-2/80 px-3 py-3">
              <div className="flex items-end gap-2 rounded-xl border border-border bg-surface px-3 py-2 focus-within:border-amber/50">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask about Alex's career…"
                  className="max-h-28 flex-1 resize-none bg-transparent py-1 text-sm text-fg placeholder:text-fg-faint focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => send(input)}
                  disabled={busy || !input.trim()}
                  aria-label="Send message"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-amber text-[#1a1205] transition enabled:hover:bg-amber-bright disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-fg-faint">
                AI responses may be imperfect. Verify anything important.
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-fg-faint"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </span>
  );
}
