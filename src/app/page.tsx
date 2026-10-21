import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { ChatPanel } from "@/components/ChatPanel";
import { SiteNav } from "@/components/SiteNav";
import { InteractiveBackground } from "@/components/InteractiveBackground";

const GITHUB_URL = "https://github.com/rohailrahmat";
const UPWORK_URL = "https://www.upwork.com/freelancers/~0144050cbd94f3a7c6";

export const metadata: Metadata = {
  title: "Rohail Rahmat — AI Engineer",
  description:
    "Rohail Rahmat builds AI chatbots, RAG assistants, workflow automations, and micro SaaS tools for startups and small businesses.",
};

/* ─── Data ──────────────────────────────────────────────────────────── */

const projects = [
  {
    slug: "proposalcraft-ai",
    tag: "AI Tool & Micro SaaS",
    icon: "✦",
    title: "ProposalCraft AI",
    desc: "AI Upwork proposal generator engineered to craft tailored, persuasive bids in ~10 seconds using high-converting proposal patterns.",
    url: "https://proposal-craft-ai-8tkw.vercel.app/",
    image: "/project-proposalcraft.png",
    stack: ["Next.js", "OpenAI API", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "rahnuma-gb",
    tag: "RAG Travel Guide",
    icon: "◈",
    title: "Rahnuma GB",
    desc: "AI-powered regional trip planner and knowledge assistant for Gilgit-Baltistan with custom itineraries, local data, and live recommendations.",
    url: "https://rahnuma-gb.vercel.app/",
    image: "/project-rahnuma.png",
    stack: ["Next.js", "Gemini API", "Vector Search", "RAG"],
  },
  {
    slug: "assignmentforge",
    tag: "Document Automation",
    icon: "⬡",
    title: "AssignmentForge",
    desc: "Document engineering pipeline converting raw text, outlines, and assignment prompts into perfectly structured, submission-ready Word documents.",
    url: "https://assignment-forge-gamma.vercel.app/",
    image: "/project-assignmentforge.png",
    stack: ["FastAPI", "Python", "Docx Engine", "Next.js"],
  },
  {
    slug: "verdant",
    tag: "Compliance CRM + AI",
    icon: "◎",
    title: "Verdant Compliance CRM",
    desc: "Cannabis compliance CRM platform featuring automated AI SOP generation, regulatory audit checklists, and operational workflows.",
    url: "https://crm-compliance.vercel.app/",
    image: "/project-verdant.png",
    stack: ["React", "Node.js", "LLM Pipelines", "FastAPI"],
  },
];

const services = [
  {
    name: "AI Chatbot Development",
    desc: "Custom conversational chatbots that qualify leads, handle support, and interact naturally — built with OpenAI, Claude, and Gemini.",
  },
  {
    name: "AI Integration",
    desc: "Integrate intelligent LLM capabilities into existing web apps and backends via modern APIs, without rebuilding from scratch.",
  },
  {
    name: "Workflow Automation",
    desc: "Automate repetitive business workflows using n8n and Python scripts so your team can focus on high-leverage work.",
  },
  {
    name: "AI Tools & Micro SaaS",
    desc: "Focused, single-purpose software tools that solve high-friction pain points — designed, shipped, and validated rapidly.",
  },
  {
    name: "Custom AI Assistants (RAG)",
    desc: "Retrieval-augmented chatbots that ground responses in your proprietary knowledge base, PDFs, and structured records.",
  },
  {
    name: "Full-Stack Web Applications",
    desc: "High-performance, production-ready interfaces and backends built with Next.js, React, Node.js, and FastAPI.",
  },
];

const timeline = [
  { period: "Jun 2026 – present", role: "Independent AI Engineer", org: "Freelance" },
  { period: "Dec 2025 – May 2026", role: "AI Engineer", org: "Marketix International" },
  { period: "Jan – Jul 2025", role: "Front-End Developer", org: "AIDCO (Pvt) Ltd" },
];

const education = [
  { name: "BS Software Engineering", org: "Karakoram International University · 2023–2027" },
  { name: "Diploma in Data Science & AI", org: "GBIT × NUST · 2024" },
  { name: "Google AI Essentials", org: "Google Professional Certificate" },
  { name: "Meta Front-End Developer", org: "Meta Professional Certificate" },
];

const techStack = [
  "Python", "FastAPI", "Flask", "Node.js", "Next.js", "React",
  "OpenAI API", "Gemini API", "Claude API", "RAG Systems", "n8n",
  "Tailwind CSS", "Git", "Vercel",
];

/* ─── Inline SVG Icons ──────────────────────────────────────────────── */
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const UpworkIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-3.799 0-5.836 2.502-6.425 4.547-1.422-2.155-2.222-4.757-2.383-7.565H5.823v7.798c0 2.12-1.725 3.844-3.846 3.844H0v3.91h1.977c3.277 0 5.944-2.667 5.944-5.944V8.455c.29 2.518 1.173 5.093 2.723 7.378l-2.02 9.539h4.053l1.458-6.879c1.28.847 2.825 1.344 4.426 1.344 3.796 0 6.878-3.082 6.878-6.878s-3.082-6.879-6.878-6.879z" />
  </svg>
);

/* ─── Shared Section Header ─────────────────────────────────────────── */
function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "2.25rem",
        paddingBottom: "1.25rem",
        borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-ibm-plex-sans)",
          fontWeight: 500,
          fontSize: "1.1rem",
          color: "#ffffff",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </span>
      <span
        style={{
          color: "#64748b",
          fontSize: "0.82rem",
          borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
          paddingLeft: "1rem",
          textTransform: "lowercase",
          letterSpacing: "0.03em",
        }}
      >
        {subtitle}
      </span>
    </div>
  );
}

/* ─── Shared Card Wrapper ───────────────────────────────────────────── */
function SCard({
  id,
  children,
  style = {},
}: {
  id?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      style={{ padding: "1.5rem 1.5rem 0" }}
    >
      <div
        className="card"
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "clamp(1.75rem, 4vw, 3rem)",
          ...style,
        }}
      >
        {children}
      </div>
    </section>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <JsonLd />
      <div className="grid-bg" aria-hidden="true" />
      <InteractiveBackground />

      <div id="main-content" tabIndex={-1}>
        {/* Floating pill navigation */}
        <SiteNav />

        {/* ════════ HERO ════════ */}
        <section aria-label="Introduction" style={{ padding: "1.25rem 1.5rem 0" }}>
          <div
            className="card"
            style={{
              maxWidth: "1300px",
              margin: "0 auto",
              position: "relative",
              minHeight: "500px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Background image & gradient overlay */}
            <Image
              src="/hero-bg.jpg"
              alt=""
              aria-hidden="true"
              fill
              priority
              style={{ objectFit: "cover", opacity: 0.38 }}
            />
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(7, 7, 9, 0.96) 28%, rgba(7, 7, 9, 0.72) 65%, rgba(7, 7, 9, 0.88) 100%)",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 2,
                padding: "clamp(2.5rem, 5vw, 4.5rem)",
                display: "flex",
                flexDirection: "column",
                gap: "2.5rem",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "3.5rem",
                  alignItems: "center",
                }}
              >
                <div>
                  <h1
                    style={{
                      fontFamily: "var(--font-ibm-plex-sans)",
                      fontWeight: 350,
                      fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
                      lineHeight: 1.1,
                      color: "#ffffff",
                      letterSpacing: "-0.03em",
                      marginBottom: "1.25rem",
                    }}
                  >
                    Building AI Tools That Solve Real Problems
                  </h1>

                  {/* Profile & Availability badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.55rem",
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        padding: "0.3rem 0.75rem 0.3rem 0.35rem",
                        borderRadius: "9999px",
                      }}
                    >
                      <div
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          overflow: "hidden",
                          position: "relative",
                          border: "1.5px solid #8b5cf6",
                          flexShrink: 0,
                        }}
                      >
                        <Image
                          src="/rohail.png"
                          alt="Rohail Rahmat"
                          fill
                          sizes="26px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <span style={{ color: "#f1f5f9", fontSize: "0.82rem", fontWeight: 500 }}>
                        Rohail Rahmat
                      </span>
                    </div>

                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        background: "rgba(34, 197, 94, 0.08)",
                        border: "1px solid rgba(34, 197, 94, 0.2)",
                        padding: "0.35rem 0.85rem",
                        borderRadius: "9999px",
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "#22c55e",
                          display: "inline-block",
                          boxShadow: "0 0 10px #22c55e",
                        }}
                      />
                      <span style={{ color: "#86efac", fontSize: "0.82rem", fontWeight: 450 }}>
                        Available for projects · Gilgit-Baltistan &amp; Remote Worldwide
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.75rem",
                    maxWidth: "460px",
                  }}
                >
                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "1.02rem",
                      lineHeight: 1.7,
                      fontWeight: 400,
                    }}
                  >
                    I blend AI engineering, backend architecture, and sharp product
                    thinking to craft production-grade tools that drive tangible
                    results for startups and ambitious founders.
                  </p>

                  <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", alignItems: "center" }}>
                    <Link href="/contact" className="btn-grad" id="cta-contact">
                      Get in touch
                    </Link>
                    <a
                      href={UPWORK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost upwork-link"
                      id="cta-upwork"
                      style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                    >
                      <UpworkIcon />
                      Hire on Upwork ↗
                    </a>
                    <a href="#work" className="btn-ghost" id="cta-work">
                      View my work →
                    </a>
                  </div>
                </div>
              </div>

              {/* Watermark text */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: "-0.75rem",
                  left: "2rem",
                  right: "2rem",
                  fontFamily: "var(--font-ibm-plex-sans)",
                  fontWeight: 800,
                  fontSize: "clamp(4.5rem, 13vw, 11rem)",
                  lineHeight: 1,
                  color: "rgba(255, 255, 255, 0.025)",
                  letterSpacing: "-0.04em",
                  userSelect: "none",
                  pointerEvents: "none",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                ROHAIL
              </div>
            </div>
          </div>
        </section>

        {/* ════════ PORTFOLIO ════════ */}
        <SCard id="work">
          <SectionHeader title="Portfolio" subtitle="featured work" />

          {/* Section Heading & Quick Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "2rem",
              flexWrap: "wrap",
              marginBottom: "2.5rem",
            }}
          >
            <div style={{ maxWidth: "680px" }}>
              <p
                id="work-heading"
                style={{
                  fontFamily: "var(--font-ibm-plex-sans)",
                  fontWeight: 300,
                  fontSize: "clamp(1.85rem, 3.4vw, 2.5rem)",
                  lineHeight: 1.2,
                  color: "#ffffff",
                  letterSpacing: "-0.025em",
                  marginBottom: "0.85rem",
                }}
              >
                AI systems engineered for real business impact.
              </p>
              <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.65 }}>
                Production-ready AI chatbots, RAG pipelines, and automated SaaS products delivered
                for clients across the US, Saudi Arabia, and Canada.
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", alignItems: "center" }}>
              <a
                href={UPWORK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-grad"
                id="cta-upwork-portfolio"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              >
                <UpworkIcon />
                Hire on Upwork ↗
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                id="cta-github"
              >
                <GitHubIcon />
                Explore Projects
              </a>
              <Link href="/contact" className="btn-ghost">
                Start a project →
              </Link>
            </div>
          </div>

          {/* Skills Pills & Stats Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.5rem",
              padding: "1.25rem 1.5rem",
              background: "#0c0c12",
              border: "1px solid rgba(255, 255, 255, 0.07)",
              borderRadius: "0.85rem",
              marginBottom: "2rem",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, marginRight: "0.25rem" }}>
                Focus:
              </span>
              {[
                { icon: "◈", label: "AI Chatbots" },
                { icon: "⬡", label: "RAG Systems" },
                { icon: "⟳", label: "Workflow Automation" },
                { icon: "✦", label: "Micro SaaS" },
              ].map(({ icon, label }) => (
                <span key={label} className="pill" style={{ padding: "0.25rem 0.65rem", fontSize: "0.78rem" }}>
                  <span style={{ color: "#a78bfa" }}>{icon}</span>
                  {label}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
              {[
                { value: "4", label: "Live projects" },
                { value: "3", label: "Client countries" },
                { value: "100%", label: "Custom code" },
              ].map(({ value, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                  <span style={{ fontFamily: "var(--font-ibm-plex-mono)", fontWeight: 600, fontSize: "1.1rem", color: "#ffffff" }}>
                    {value}
                  </span>
                  <span style={{ color: "#64748b", fontSize: "0.75rem" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2x2 Balanced Responsive Project Grid */}
          <div className="portfolio-grid">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="project-card"
                id={`project-${p.slug}`}
              >
                <div
                  className="project-card-media"
                  style={{ aspectRatio: "16/9", position: "relative" }}
                >
                  <Image
                    src={p.image}
                    alt={`${p.title} preview screenshot`}
                    fill
                    sizes="(max-width: 900px) 100vw, 620px"
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "0.85rem",
                      right: "0.85rem",
                      zIndex: 2,
                    }}
                  >
                    <span className="project-live-badge">
                      <span className="project-live-dot" />
                      Live
                    </span>
                  </div>
                </div>

                <div className="project-card-body" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.5rem",
                      marginBottom: "0.6rem",
                    }}
                  >
                    <span className="project-card-tag" style={{ margin: 0 }}>
                      <span style={{ color: "#a78bfa" }}>{p.icon}</span>
                      {p.tag}
                    </span>
                    <span
                      style={{
                        color: "#a78bfa",
                        fontSize: "0.82rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        fontWeight: 500,
                      }}
                    >
                        Read case study →
                    </span>
                  </div>

                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "1.15rem",
                      color: "#f8fafc",
                      marginBottom: "0.45rem",
                    }}
                  >
                    {p.title}
                  </p>

                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.88rem",
                      lineHeight: 1.55,
                      marginBottom: "1.25rem",
                      flex: 1,
                    }}
                  >
                    {p.desc}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.45rem",
                      paddingTop: "0.85rem",
                      borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "0.72rem",
                          fontFamily: "var(--font-ibm-plex-mono)",
                          color: "#cbd5e1",
                          background: "rgba(255, 255, 255, 0.03)",
                          padding: "0.2rem 0.55rem",
                          borderRadius: "0.35rem",
                          border: "1px solid rgba(255, 255, 255, 0.06)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* GitHub Repositories Link Bar */}
          <div
            style={{
              marginTop: "2.5rem",
              padding: "1.5rem 1.75rem",
              background: "#0c0c12",
              borderRadius: "0.85rem",
              border: "1px solid rgba(255, 255, 255, 0.07)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.25rem",
            }}
          >
            <div>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "#f8fafc",
                  marginBottom: "0.25rem",
                }}
              >
                Looking for architecture details or more repositories?
              </p>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem" }}>
                Check out active repositories, experiments, and code samples on GitHub.
              </p>
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
            >
              <GitHubIcon />
              github.com/rohailrahmat ↗
            </a>
          </div>
        </SCard>

        {/* ════════ SERVICES ════════ */}
        <SCard id="services">
          <SectionHeader title="Services" subtitle="what I build" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "4rem",
              alignItems: "start",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <p
                id="services-heading"
                style={{
                  fontFamily: "var(--font-ibm-plex-sans)",
                  fontWeight: 300,
                  fontSize: "clamp(1.75rem, 3.2vw, 2.4rem)",
                  lineHeight: 1.2,
                  color: "#ffffff",
                  letterSpacing: "-0.025em",
                }}
              >
                AI engineering from concept to production.
              </p>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "0.98rem",
                  lineHeight: 1.7,
                  maxWidth: "40ch",
                }}
              >
                I operate end to end — data extraction, LLM orchestration, API
                connectors, intuitive user interfaces, and cloud hosting. One dedicated
                engineer who oversees the complete architecture.
              </p>
              <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
                <a href="#work" className="btn-grad">
                  View portfolio
                </a>
                <Link href="/contact" className="btn-ghost">
                  Book a consultation →
                </Link>
              </div>
            </div>

            <div>
              {services.map((s, i) => (
                <div
                  key={s.name}
                  className="service-row"
                  style={i === 0 ? { borderTop: "1px solid rgba(255, 255, 255, 0.08)" } : {}}
                >
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "1.02rem",
                      color: "#f1f5f9",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {s.name}
                  </p>
                  <p style={{ color: "#94a3b8", fontSize: "0.88rem", lineHeight: 1.6 }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SCard>

        {/* ════════ ABOUT ════════ */}
        <SCard id="about">
          <SectionHeader title="About" subtitle="who I am" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "4rem",
              alignItems: "start",
            }}
          >
            {/* Left: Biography & Experience Timeline */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <p
                id="about-heading"
                style={{
                  fontFamily: "var(--font-ibm-plex-sans)",
                  fontWeight: 300,
                  fontSize: "clamp(1.5rem, 2.7vw, 2.1rem)",
                  lineHeight: 1.25,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                }}
              >
                I&apos;m Rohail. I build AI tools that solve one specific business problem well.
              </p>

              <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.75 }}>
                Based in Gilgit-Baltistan, Pakistan, I work remotely with founders and
                technical teams in North America, Saudi Arabia, and Europe. My academic
                foundation is in Software Engineering at Karakoram International
                University, supplemented by an intensive Data Science &amp; AI diploma
                from GBIT × NUST.
              </p>

              <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.75 }}>
                High-impact AI isn&apos;t about chasing hype — it&apos;s about scoping
                real friction, crafting dependable pipelines, and measuring clear outcomes.
                I ensure that every system I deliver is verifiable, maintainable, and
                immediately useful.
              </p>

              {/* Experience Timeline */}
              <div
                style={{
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  paddingTop: "1.75rem",
                  marginTop: "0.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    fontWeight: 600,
                  }}
                >
                  Experience Timeline
                </p>
                {timeline.map(({ period, role, org }) => (
                  <div
                    key={role}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: "0.95rem", color: "#f1f5f9", fontWeight: 500 }}>
                        {role}
                      </p>
                      <p style={{ fontSize: "0.82rem", color: "#64748b" }}>{org}</p>
                    </div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#94a3b8",
                        flexShrink: 0,
                        fontFamily: "var(--font-ibm-plex-mono)",
                      }}
                    >
                      {period}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Portrait, Education, Tech Stack */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {/* Photo */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  position: "relative",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  boxShadow: "0 18px 40px rgba(0, 0, 0, 0.45)",
                }}
              >
                <Image
                  src="/rohail.png"
                  alt="Rohail Rahmat — AI Engineer"
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  style={{ objectFit: "cover", objectPosition: "center 20%" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "1.25rem 1.25rem 1rem",
                    background: "linear-gradient(to top, rgba(7, 7, 9, 0.88) 0%, rgba(7, 7, 9, 0.4) 60%, transparent 100%)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <div>
                    <p style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.95rem" }}>
                      Rohail Rahmat
                    </p>
                    <p style={{ color: "#94a3b8", fontSize: "0.78rem" }}>
                      AI Systems &amp; Full-Stack Engineer
                    </p>
                  </div>
                  <span
                    style={{
                      background: "rgba(139, 92, 246, 0.2)",
                      border: "1px solid rgba(139, 92, 246, 0.4)",
                      color: "#c4b5fd",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "9999px",
                      fontSize: "0.72rem",
                      fontWeight: 500,
                    }}
                  >
                    Verified Profile
                  </span>
                </div>
              </div>

              {/* Education & Certifications */}
              <div
                style={{
                  background: "#0c0c12",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "0.85rem",
                  padding: "1.5rem",
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "1rem",
                    fontWeight: 600,
                  }}
                >
                  Education &amp; Credentials
                </p>
                {education.map(({ name, org }, i) => (
                  <div
                    key={name}
                    style={{
                      borderTop: i > 0 ? "1px solid rgba(255, 255, 255, 0.05)" : "none",
                      paddingTop: i > 0 ? "0.85rem" : 0,
                      marginTop: i > 0 ? "0.85rem" : 0,
                    }}
                  >
                    <p style={{ fontSize: "0.88rem", color: "#f1f5f9", fontWeight: 500 }}>
                      {name}
                    </p>
                    <p style={{ fontSize: "0.78rem", color: "#64748b" }}>{org}</p>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem" }}>
                {techStack.map((s) => (
                  <span key={s} className="pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SCard>

        {/* ════════ CONTACT / FOOTER ════════ */}
        <section style={{ padding: "1.5rem 1.5rem 2rem" }}>
          <div
            className="card"
            style={{
              maxWidth: "1300px",
              margin: "0 auto",
              padding: "clamp(3rem, 6vw, 5.5rem) 2rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.75rem",
            }}
          >
            <p
              style={{
                fontSize: "0.82rem",
                color: "#64748b",
                display: "flex",
                alignItems: "center",
                gap: "0.85rem",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 36,
                  height: 1,
                  background: "rgba(255, 255, 255, 0.15)",
                }}
              />
              Reach out anytime
              <span
                style={{
                  display: "inline-block",
                  width: 36,
                  height: 1,
                  background: "rgba(255, 255, 255, 0.15)",
                }}
              />
            </p>

            <h2
              style={{
                fontFamily: "var(--font-ibm-plex-sans)",
                fontWeight: 300,
                fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
                lineHeight: 1.1,
                color: "#ffffff",
                letterSpacing: "-0.035em",
              }}
            >
              Let&apos;s Build Something Real
            </h2>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "1.02rem",
                maxWidth: "48ch",
                lineHeight: 1.7,
              }}
            >
              Have a product concept, an automation bottleneck, or an AI feature you
              want to ship quickly? Send me a message and I&apos;ll reply within 24 hours.
            </p>

            <Link
              href="/contact"
              className="btn-grad"
              style={{ marginTop: "0.5rem", padding: "0.8rem 2rem", fontSize: "1rem" }}
              id="footer-contact"
            >
              Contact me
            </Link>

            {/* Socials & Direct Contact */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.75rem",
                marginTop: "1rem",
              }}
            >
              <a
                href="https://github.com/rohailrahmat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="social-link"
              >
                <GitHubIcon />
              </a>
              <span
                style={{
                  width: 1,
                  height: 18,
                  background: "rgba(255, 255, 255, 0.12)",
                  display: "inline-block",
                }}
              />
              <a
                href="https://www.linkedin.com/in/rohail-rahmat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="social-link"
              >
                <LinkedInIcon />
              </a>
              <span
                style={{
                  width: 1,
                  height: 18,
                  background: "rgba(255, 255, 255, 0.12)",
                  display: "inline-block",
                }}
              />
              <a
                href={UPWORK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Upwork profile"
                className="social-link upwork-link"
              >
                <UpworkIcon size={20} />
              </a>
              <span
                style={{
                  width: 1,
                  height: 18,
                  background: "rgba(255, 255, 255, 0.12)",
                  display: "inline-block",
                }}
              />
              <a
                href="mailto:rohailrahmat7525@gmail.com"
                aria-label="Send email"
                className="social-link"
              >
                <EmailIcon />
              </a>
            </div>

            <a
              href="mailto:rohailrahmat7525@gmail.com"
              style={{
                fontSize: "0.9rem",
                color: "#a78bfa",
                textDecoration: "none",
                fontWeight: 450,
                letterSpacing: "0.01em",
              }}
            >
              rohailrahmat7525@gmail.com
            </a>

            <p
              style={{
                marginTop: "3rem",
                fontSize: "0.75rem",
                color: "#475569",
                fontFamily: "var(--font-ibm-plex-mono)",
                letterSpacing: "0.04em",
              }}
            >
              © {new Date().getFullYear()} ROHAIL RAHMAT · CRAFTED WITH PRECISION
            </p>
          </div>
        </section>
      </div>

      <ChatPanel />
    </>
  );
}
