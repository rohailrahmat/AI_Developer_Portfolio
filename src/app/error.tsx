"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="section">
      <div className="container">
        <p
          className="label mb-4"
          style={{ color: "var(--accent)", fontFamily: "var(--font-ibm-plex-mono)" }}
        >
          500
        </p>
        <h1
          style={{
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            color: "var(--text)",
            marginBottom: "0.75rem",
          }}
        >
          Something went wrong
        </h1>
        <p className="font-sans mb-8" style={{ color: "var(--muted)", maxWidth: "44ch" }}>
          An unexpected error occurred. You can try again or go back to the home page.
        </p>
        <div className="flex flex-wrap gap-3">
          <button onClick={reset} className="btn btn-primary">
            Try again
          </button>
          <Link href="/" className="btn btn-ghost">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
