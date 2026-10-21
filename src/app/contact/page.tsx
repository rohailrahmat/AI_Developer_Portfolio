import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Contact — Rohail Rahmat",
  description:
    "Get in touch with Rohail Rahmat. Tell me about your project and I will get back to you within one business day.",
  openGraph: {
    title: "Contact — Rohail Rahmat",
    description: "Tell me about your project.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div id="main-content" tabIndex={-1}>
        <SiteNav />
        <main style={{ padding: "1.5rem 1.5rem 3rem" }}>
          <div
            className="card"
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              padding: "clamp(2rem, 5vw, 3.5rem)",
            }}
          >
            <ContactForm />
          </div>
        </main>
      </div>
    </>
  );
}
