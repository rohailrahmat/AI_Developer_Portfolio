import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <p
          className="label mb-4"
          style={{ color: "var(--accent)", fontFamily: "var(--font-ibm-plex-mono)" }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            color: "var(--text)",
            marginBottom: "0.75rem",
          }}
        >
          Page not found
        </h1>
        <p className="font-sans mb-8" style={{ color: "var(--muted)", maxWidth: "44ch" }}>
          This page does not exist. It may have moved or never existed.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </section>
  );
}
