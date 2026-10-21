import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PrintButton } from "@/components/PrintButton";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Rohail Rahmat, an AI engineer focused on AI products, RAG systems, and full-stack development.",
  openGraph: {
    title: "Resume — Rohail Rahmat",
    description: "Experience, projects, education, and technical skills.",
    url: "/resume",
  },
};

const experience = [
  {
    period: "Jun 2026 – Present",
    role: "Independent AI Engineer",
    organization: "Freelance",
    summary:
      "Design and build AI assistants, RAG applications, workflow automations, and full-stack products for startups and small businesses.",
  },
  {
    period: "Dec 2025 – May 2026",
    role: "AI Engineer",
    organization: "Marketix International",
    summary: "Contributed to AI engineering projects as part of the Marketix International team.",
  },
  {
    period: "Jan – Jul 2025",
    role: "Front-End Developer",
    organization: "AIDCO (Pvt) Ltd",
    summary: "Contributed to front-end development projects at AIDCO (Pvt) Ltd.",
  },
];

const projects = [
  {
    slug: "proposalcraft-ai",
    name: "ProposalCraft AI",
    description:
      "An AI proposal-writing tool that creates tailored Upwork bids from a job description and a freelancer's skills.",
  },
  {
    slug: "rahnuma-gb",
    name: "Rahnuma GB",
    description:
      "A grounded travel assistant and itinerary planner for Gilgit-Baltistan, powered by regional knowledge and RAG.",
  },
  {
    slug: "assignmentforge",
    name: "AssignmentForge",
    description:
      "A document-generation workflow that turns assignment content into formatted, downloadable Word files.",
  },
  {
    slug: "verdant",
    name: "Verdant Compliance CRM",
    description:
      "A lightweight CRM and compliance document platform with AI-assisted SOP generation.",
  },
];

const skills = [
  "Python",
  "FastAPI",
  "Flask",
  "Node.js",
  "Next.js",
  "React",
  "OpenAI API",
  "Gemini API",
  "Claude API",
  "RAG systems",
  "n8n",
  "Tailwind CSS",
  "Git",
  "Vercel",
];

const education = [
  {
    program: "BS Software Engineering",
    institution: "Karakoram International University",
    period: "2023–2027",
  },
  {
    program: "Diploma in Data Science & AI",
    institution: "GBIT × NUST",
    period: "2024",
  },
  {
    program: "Google AI Essentials",
    institution: "Google Professional Certificate",
  },
  {
    program: "Meta Front-End Developer",
    institution: "Meta Professional Certificate",
  },
];

export default function ResumePage() {
  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div id="main-content" tabIndex={-1}>
        <SiteNav />
        <main className="resume-page">
          <article className="card resume-sheet" id="resume">
            <div className="resume-toolbar no-print">
              <Link href="/" className="btn-ghost">
                ← Back to portfolio
              </Link>
              <PrintButton />
            </div>

            <header className="resume-header">
              <div>
                <p className="resume-eyebrow">AI ENGINEER · SOFTWARE ENGINEER</p>
                <h1>Rohail Rahmat</h1>
                <p className="resume-location">
                  Gilgit-Baltistan, Pakistan · Available for remote work
                </p>
                <div className="resume-contact">
                  <a href="mailto:rohailrahmat7525@gmail.com">
                    rohailrahmat7525@gmail.com
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rohail-rahmat"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/rohailrahmat"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
              <p className="resume-summary">
                AI engineer building practical chatbots, RAG assistants, workflow
                automations, and full-stack products. I work end to end—from
                backend architecture and AI integration to polished interfaces
                and deployment—with a focus on useful, maintainable software.
              </p>
            </header>

            <section className="resume-section" aria-labelledby="experience-heading">
              <h2 id="experience-heading">Experience</h2>
              <div className="resume-entry-list">
                {experience.map((item) => (
                  <article
                    className="resume-entry"
                    key={`${item.role}-${item.organization}`}
                  >
                    <div className="resume-entry-heading">
                      <div>
                        <h3>{item.role}</h3>
                        <p>{item.organization}</p>
                      </div>
                      <time>{item.period}</time>
                    </div>
                    <p className="resume-entry-summary">{item.summary}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="resume-section" aria-labelledby="projects-heading">
              <h2 id="projects-heading">Selected projects</h2>
              <div className="resume-project-grid">
                {projects.map((project) => (
                  <article className="resume-project" key={project.slug}>
                    <h3>
                      <Link href={`/work/${project.slug}`}>{project.name}</Link>
                    </h3>
                    <p>{project.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="resume-section" aria-labelledby="skills-heading">
              <h2 id="skills-heading">Technical skills</h2>
              <ul className="resume-skill-list" aria-label="Technical skills">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>

            <section className="resume-section" aria-labelledby="education-heading">
              <h2 id="education-heading">Education & certifications</h2>
              <div className="resume-entry-list">
                {education.map((item) => (
                  <article
                    className="resume-entry resume-education"
                    key={`${item.program}-${item.institution}`}
                  >
                    <div className="resume-entry-heading">
                      <div>
                        <h3>{item.program}</h3>
                        <p>{item.institution}</p>
                      </div>
                      {item.period && <time>{item.period}</time>}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}