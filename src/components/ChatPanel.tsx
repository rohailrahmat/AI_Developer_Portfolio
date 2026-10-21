"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const STARTERS = [
  "What services do you offer?",
  "Tell me about Rahnuma GB.",
  "What is your development process?",
  "How do I hire you?",
];

export function ChatPanel() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamTextRef = useRef("");

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Error ${res.status}`);
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      streamTextRef.current = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        streamTextRef.current += chunk;
        const captured = streamTextRef.current;
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: captured };
          return copy;
        });
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setOpen(true)}
        aria-label="Open Rohail's AI assistant"
        className="no-print"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        style={{
          position: "fixed",
          bottom: "1.75rem",
          right: "1.75rem",
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          gap: "0.55rem",
          padding: "0.7rem 1.3rem",
          background: "#0d0d12",
          border: "1.5px solid transparent",
          backgroundClip: "padding-box",
          borderRadius: "9999px",
          color: "#fff",
          fontSize: "0.88rem",
          fontWeight: 500,
          cursor: "pointer",
          boxShadow: "0 8px 32px rgba(139, 92, 246, 0.35)",
          fontFamily: "var(--font-ibm-plex-sans)",
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: "50%",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            flexShrink: 0,
          }}
        >
          <Image
            src="/rohail.png"
            alt="Rohail"
            fill
            sizes="22px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e", display: "inline-block", flexShrink: 0 }} />
        Ask Rohail&apos;s AI
        <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14" style={{ opacity: 0.7 }}>
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
        </svg>
        {/* Gradient border */}
        <span style={{
          position: "absolute",
          inset: "-1.5px",
          borderRadius: "9999px",
          background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
          zIndex: -1,
        }} />
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 40,
                background: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(4px)",
              }}
              aria-hidden="true"
            />

            {/* Chat panel */}
            <motion.div
              key="panel"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              role="dialog"
              aria-modal="true"
              aria-label="Rohail's AI assistant"
              style={{
                position: "fixed",
                right: 0,
                top: 0,
                bottom: 0,
                zIndex: 50,
                display: "flex",
                flexDirection: "column",
                width: "min(440px, 100vw)",
                background: "#0a0a10",
                borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "-20px 0 60px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: "1.25rem 1.5rem",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(255, 255, 255, 0.02)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    position: "relative",
                    overflow: "hidden",
                    border: "1.5px solid #8b5cf6",
                    boxShadow: "0 0 12px rgba(139, 92, 246, 0.4)",
                    flexShrink: 0,
                  }}>
                    <Image
                      src="/rohail.png"
                      alt="Rohail Rahmat"
                      fill
                      sizes="38px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <p style={{
                      fontFamily: "var(--font-ibm-plex-sans)",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      color: "#f8fafc",
                    }}>
                      Rohail&apos;s AI Assistant
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.15rem" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                      <p style={{ fontSize: "0.75rem", color: "#64748b" }}>
                        Powered by Gemini · Knows Rohail&apos;s work
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close assistant"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "0.5rem",
                    color: "#94a3b8",
                    cursor: "pointer",
                    minHeight: 36,
                    minWidth: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Messages area */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {/* Welcome message */}
                {messages.length === 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div
                      style={{
                        background: "rgba(139, 92, 246, 0.08)",
                        border: "1px solid rgba(139, 92, 246, 0.2)",
                        borderRadius: "0.85rem",
                        padding: "1rem 1.15rem",
                      }}
                    >
                      <p style={{ fontSize: "0.88rem", color: "#cbd5e1", lineHeight: 1.65 }}>
                        👋 Hi! I&apos;m Rohail&apos;s AI assistant. Ask me anything about his work, projects, services, or how to hire him.
                      </p>
                    </div>

                    <p style={{ fontSize: "0.78rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
                      Suggested questions
                    </p>
                    {STARTERS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        style={{
                          textAlign: "left",
                          padding: "0.75rem 1rem",
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          borderRadius: "0.75rem",
                          color: "#cbd5e1",
                          fontSize: "0.88rem",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          minHeight: 44,
                          lineHeight: 1.5,
                          fontFamily: "var(--font-ibm-plex-sans)",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* Message bubbles */}
                {messages.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "87%",
                        padding: "0.75rem 1rem",
                        borderRadius: m.role === "user" ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 1rem 0.25rem",
                        background:
                          m.role === "user"
                            ? "linear-gradient(135deg, #8b5cf6, #6366f1)"
                            : "rgba(255, 255, 255, 0.05)",
                        border: m.role === "user"
                          ? "none"
                          : "1px solid rgba(255, 255, 255, 0.08)",
                        color: m.role === "user" ? "#fff" : "#f1f5f9",
                        fontSize: "0.9rem",
                        lineHeight: "1.65",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {m.content || (loading && i === messages.length - 1 ? (
                        <span style={{ display: "flex", gap: "3px", alignItems: "center", padding: "2px 0" }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#94a3b8", display: "inline-block", animation: "pulse 1.4s ease-in-out infinite" }} />
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#94a3b8", display: "inline-block", animation: "pulse 1.4s ease-in-out 0.2s infinite" }} />
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#94a3b8", display: "inline-block", animation: "pulse 1.4s ease-in-out 0.4s infinite" }} />
                        </span>
                      ) : "")}
                    </div>
                  </div>
                ))}

                {error && (
                  <p
                    role="alert"
                    style={{
                      color: "#f87171",
                      fontSize: "0.82rem",
                      textAlign: "center",
                      padding: "0.5rem 0.75rem",
                      background: "rgba(248, 113, 113, 0.08)",
                      borderRadius: "0.5rem",
                      border: "1px solid rgba(248, 113, 113, 0.2)",
                    }}
                  >
                    {error}
                  </p>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                style={{
                  padding: "1rem 1.25rem",
                  borderTop: "1px solid rgba(255, 255, 255, 0.07)",
                  display: "flex",
                  gap: "0.75rem",
                  background: "rgba(255, 255, 255, 0.01)",
                }}
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my work, services, projects…"
                  maxLength={500}
                  aria-label="Message input"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: "0.7rem 1rem",
                    background: "#0f0f18",
                    color: "#f8fafc",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "0.75rem",
                    fontSize: "0.9rem",
                    outline: "none",
                    minHeight: 44,
                    fontFamily: "var(--font-ibm-plex-sans)",
                    transition: "border-color 0.2s ease",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.6)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)")}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
                    border: "none",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                    minHeight: 44,
                    minWidth: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: loading || !input.trim() ? 0.5 : 1,
                    transition: "opacity 0.2s ease",
                    padding: "0 0.85rem",
                    fontSize: "1rem",
                  }}
                >
                  {loading ? (
                    <span style={{ fontSize: "1.2rem" }}>…</span>
                  ) : (
                    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  )}
                </button>
              </form>

              {/* Footer disclaimer */}
              <p style={{
                textAlign: "center",
                fontSize: "0.7rem",
                color: "#475569",
                padding: "0.5rem 1rem 0.85rem",
                fontFamily: "var(--font-ibm-plex-sans)",
              }}>
                AI answers from Rohail&apos;s knowledge base · Not a live person
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}
