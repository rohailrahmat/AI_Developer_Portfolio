import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy information for rohailrahmat.dev",
};

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "640px" }}>
        <h1
          style={{
            fontFamily: "var(--font-ibm-plex-mono)",
            fontSize: "1.75rem",
            color: "var(--text)",
            marginBottom: "2rem",
          }}
        >
          Privacy
        </h1>

        <div
          className="font-sans flex flex-col gap-6"
          style={{ color: "var(--muted)", lineHeight: "1.7" }}
        >
          <section aria-labelledby="analytics-heading">
            <h2
              id="analytics-heading"
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.9375rem",
                color: "var(--text)",
                marginBottom: "0.5rem",
              }}
            >
              Analytics
            </h2>
            <p>
              This site uses Vercel Analytics to count page views. No personal
              data is collected. No tracking cookies are set. No data is shared
              with third-party advertisers.
            </p>
          </section>

          <section aria-labelledby="contact-heading">
            <h2
              id="contact-heading"
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.9375rem",
                color: "var(--text)",
                marginBottom: "0.5rem",
              }}
            >
              Contact form
            </h2>
            <p>
              When you submit the contact form, your name, email address, and
              message are sent to Rohail Rahmat via Resend. This information is
              used only to respond to your inquiry and is not shared with anyone
              else.
            </p>
          </section>

          <section aria-labelledby="chat-heading">
            <h2
              id="chat-heading"
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.9375rem",
                color: "var(--text)",
                marginBottom: "0.5rem",
              }}
            >
              AI assistant
            </h2>
            <p>
              Messages sent to the AI assistant are processed by the Gemini API
              (Google). No personally identifiable information is stored in logs.
              Chat history exists only in your browser session.
            </p>
          </section>

          <section aria-labelledby="contact-info-heading">
            <h2
              id="contact-info-heading"
              style={{
                fontFamily: "var(--font-ibm-plex-mono)",
                fontSize: "0.9375rem",
                color: "var(--text)",
                marginBottom: "0.5rem",
              }}
            >
              Questions
            </h2>
            <p>
              Contact Rohail at{" "}
              <a href="mailto:rohailrahmat7525@gmail.com" style={{ color: "var(--accent)" }}>
                rohailrahmat7525@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
