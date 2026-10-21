"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";

type TurnstileOptions = {
  sitekey: string;
  theme: "dark";
  callback: (token: string) => void;
  "error-callback": () => void;
  "expired-callback": () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileOptions) => string;
      remove: (widgetId: string) => void;
    };
  }
}

const PROJECT_TYPES = [
  "AI chatbot",
  "AI integration",
  "Workflow automation",
  "AI tool / micro SaaS",
  "Website or web app",
  "Custom AI assistant (RAG)",
  "Other",
];

const BUDGETS = [
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $3,000",
  "$3,000 – $10,000",
  "Not sure yet",
  "Prefer not to say",
];

const UPWORK_URL = "https://www.upwork.com/freelancers/~0144050cbd94f3a7c6";

const UpworkIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-3.799 0-5.836 2.502-6.425 4.547-1.422-2.155-2.222-4.757-2.383-7.565H5.823v7.798c0 2.12-1.725 3.844-3.846 3.844H0v3.91h1.977c3.277 0 5.944-2.667 5.944-5.944V8.455c.29 2.518 1.173 5.093 2.723 7.378l-2.02 9.539h4.053l1.458-6.879c1.28.847 2.825 1.344 4.426 1.344 3.796 0 6.878-3.082 6.878-6.878s-3.082-6.879-6.878-6.879z" />
  </svg>
);

export function ContactForm() {
  const id = useId();
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
    website: "", // honeypot
    turnstileToken: turnstileSiteKey ? "" : "dev-token",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (
      !turnstileLoaded ||
      !turnstileSiteKey ||
      !turnstileContainer.current ||
      !window.turnstile ||
      turnstileWidgetId.current
    ) {
      return;
    }

    const widgetId = window.turnstile.render(turnstileContainer.current, {
      sitekey: turnstileSiteKey,
      theme: "dark",
      callback: (token) => {
        setForm((current) => ({ ...current, turnstileToken: token }));
        setErrors((current) => ({ ...current, turnstile: "" }));
      },
      "error-callback": () => {
        setForm((current) => ({ ...current, turnstileToken: "" }));
        setErrors((current) => ({
          ...current,
          turnstile: "Security verification failed. Please try again.",
        }));
      },
      "expired-callback": () => {
        setForm((current) => ({ ...current, turnstileToken: "" }));
      },
    });
    turnstileWidgetId.current = widgetId;

    return () => {
      window.turnstile?.remove(widgetId);
      turnstileWidgetId.current = null;
    };
  }, [turnstileLoaded, turnstileSiteKey]);

  function update(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.projectType) e.projectType = "Please select a project type.";
    if (form.message.trim().length < 20)
      e.message = "Please write at least 20 characters.";
    if (turnstileSiteKey && !form.turnstileToken)
      e.turnstile = "Please complete the security check.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    background: "#0b0b10",
    color: "#f8fafc",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    borderRadius: "0.6rem",
    fontFamily: "var(--font-ibm-plex-sans)",
    fontSize: "0.95rem",
    outline: "none",
    minHeight: "44px",
    transition: "border-color 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-ibm-plex-sans)",
    fontSize: "0.85rem",
    fontWeight: 500,
    color: "#cbd5e1",
    marginBottom: "0.5rem",
  };

  if (status === "success") {
    return (
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
          padding: "3rem 1rem",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(34, 197, 94, 0.12)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            color: "#4ade80",
          }}
        >
          ✓
        </div>
        <h1
          style={{
            fontFamily: "var(--font-ibm-plex-sans)",
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#f8fafc",
          }}
        >
          Message sent!
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.65, maxWidth: "38ch" }}>
          Thanks for reaching out, {form.name.split(" ")[0]}. I&apos;ll get back to you within one business day.
        </p>
        <Link href="/" className="btn-ghost" style={{ marginTop: "0.5rem" }}>
          ← Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: "50%",
            position: "relative",
            overflow: "hidden",
            border: "1.5px solid #8b5cf6",
            boxShadow: "0 0 16px rgba(139, 92, 246, 0.35)",
            flexShrink: 0,
          }}
        >
          <Image
            src="/rohail.png"
            alt="Rohail Rahmat"
            fill
            sizes="46px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div>
          <h1
            style={{
              fontFamily: "var(--font-ibm-plex-sans)",
              fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
              fontWeight: 300,
              color: "#f8fafc",
              margin: 0,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            Get in touch
          </h1>
          <p style={{ color: "#a78bfa", fontSize: "0.82rem", margin: 0, fontWeight: 500 }}>
            Rohail Rahmat · Direct Inbox &amp; Upwork
          </p>
        </div>
      </div>
      <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.65, maxWidth: "48ch", marginBottom: "1.75rem" }}>
        Tell me what you&apos;re trying to build. I&apos;ll get back to you within 24 hours.
      </p>

      {/* Direct Contact Links */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.25rem",
          marginBottom: "2rem",
          paddingBottom: "1.75rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
          alignItems: "center",
        }}
      >
        <a
          href="mailto:rohailrahmat7525@gmail.com"
          style={{ color: "#a78bfa", fontSize: "0.9rem", textDecoration: "none", fontWeight: 500 }}
        >
          rohailrahmat7525@gmail.com
        </a>
        <a
          href={UPWORK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="upwork-link"
          style={{ fontSize: "0.9rem", textDecoration: "none", gap: "0.4rem" }}
        >
          <UpworkIcon size={16} />
          Hire via Upwork ↗
        </a>
        <a
          href="https://www.linkedin.com/in/rohail-rahmat"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#94a3b8", fontSize: "0.9rem", textDecoration: "none" }}
        >
          LinkedIn ↗
        </a>
        <a
          href="https://github.com/rohailrahmat"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#94a3b8", fontSize: "0.9rem", textDecoration: "none" }}
        >
          GitHub ↗
        </a>
      </div>

      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Name */}
        <div>
          <label htmlFor={`${id}-name`} style={labelStyle}>
            Your Name *
          </label>
          <input
            id={`${id}-name`}
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            style={{
              ...inputStyle,
              borderColor: errors.name ? "#ef4444" : "rgba(255, 255, 255, 0.12)",
            }}
            placeholder="Jane Doe"
          />
          {errors.name && (
            <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.35rem" }}>{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor={`${id}-email`} style={labelStyle}>
            Your Email *
          </label>
          <input
            id={`${id}-email`}
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            style={{
              ...inputStyle,
              borderColor: errors.email ? "#ef4444" : "rgba(255, 255, 255, 0.12)",
            }}
            placeholder="jane@example.com"
          />
          {errors.email && (
            <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.35rem" }}>{errors.email}</p>
          )}
        </div>

        {/* Project Type */}
        <div>
          <label htmlFor={`${id}-type`} style={labelStyle}>
            Project Type *
          </label>
          <select
            id={`${id}-type`}
            value={form.projectType}
            onChange={(e) => update("projectType", e.target.value)}
            style={{
              ...inputStyle,
              borderColor: errors.projectType ? "#ef4444" : "rgba(255, 255, 255, 0.12)",
            }}
          >
            <option value="" disabled>
              Select what you need…
            </option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t} style={{ background: "#111118", color: "#fff" }}>
                {t}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.35rem" }}>
              {errors.projectType}
            </p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label htmlFor={`${id}-budget`} style={labelStyle}>
            Estimated Budget (Optional)
          </label>
          <select
            id={`${id}-budget`}
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
            style={inputStyle}
          >
            <option value="">Select budget range…</option>
            {BUDGETS.map((b) => (
              <option key={b} value={b} style={{ background: "#111118", color: "#fff" }}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor={`${id}-msg`} style={labelStyle}>
            Tell me about your project * (at least 20 characters)
          </label>
          <textarea
            id={`${id}-msg`}
            rows={5}
            required
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            style={{
              ...inputStyle,
              resize: "vertical",
              minHeight: "120px",
              borderColor: errors.message ? "#ef4444" : "rgba(255, 255, 255, 0.12)",
            }}
            placeholder="Describe what you want to build, the key features, timeline, or links to references…"
          />
          {errors.message && (
            <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.35rem" }}>
              {errors.message}
            </p>
          )}
        </div>

        {/* Honeypot field for bots */}
        <div style={{ display: "none" }} aria-hidden="true">
          <label htmlFor={`${id}-web`}>Website</label>
          <input
            id={`${id}-web`}
            type="text"
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {turnstileSiteKey && (
          <>
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
              strategy="afterInteractive"
              onReady={() => setTurnstileLoaded(true)}
            />
            <div>
              <div ref={turnstileContainer} />
              {errors.turnstile && (
                <p
                  role="alert"
                  style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.35rem" }}
                >
                  {errors.turnstile}
                </p>
              )}
            </div>
          </>
        )}

        {errorMsg && (
          <p
            role="alert"
            style={{
              color: "#ef4444",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.25)",
              borderRadius: "0.5rem",
              padding: "0.75rem 1rem",
              fontSize: "0.9rem",
            }}
          >
            {errorMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-grad"
          style={{
            alignSelf: "flex-start",
            padding: "0.8rem 2.2rem",
            fontSize: "1rem",
            cursor: status === "loading" ? "not-allowed" : "pointer",
            opacity: status === "loading" ? 0.7 : 1,
          }}
        >
          {status === "loading" ? "Sending…" : "Send message →"}
        </button>
      </form>
    </div>
  );
}
