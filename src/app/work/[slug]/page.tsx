import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { Footer } from "@/components/Footer";
import { SiteNav } from "@/components/SiteNav";

const workDirectory = path.join(process.cwd(), "content", "work");
const slugPattern = /^[a-z0-9-]+$/;

const projectFrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(slugPattern),
  date: z.string(),
  tagline: z.string(),
  stack: z.array(z.string()),
  liveUrl: z.string().url(),
});

type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

async function getProject(slug: string) {
  if (!slugPattern.test(slug)) return null;

  let source: string;
  try {
    source = await readFile(path.join(workDirectory, `${slug}.mdx`), "utf8");
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return null;
    }
    throw error;
  }

  const parsed = matter(source);
  const project = projectFrontmatterSchema.parse(parsed.data);
  if (project.slug !== slug) {
    throw new Error(`Project slug mismatch in ${slug}.mdx`);
  }

  return { project, body: parsed.content };
}

export async function generateStaticParams() {
  const files = await readdir(workDirectory);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({ slug: file.slice(0, -4) }))
    .filter(({ slug }) => slugPattern.test(slug));
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getProject(slug);

  if (!result) {
    return { title: "Project not found" };
  }

  const { project } = result;
  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — Rohail Rahmat`,
      description: project.tagline,
      url: `/work/${project.slug}`,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const result = await getProject(slug);
  if (!result) notFound();

  const { project, body } = result;
  const { content } = await compileMDX<ProjectFrontmatter>({ source: body });

  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <div id="main-content" tabIndex={-1}>
        <SiteNav />
        <main className="case-study-page">
          <article className="card case-study">
            <Link href="/#work" className="case-study-back">
              ← Back to selected work
            </Link>

            <header className="case-study-header">
              <p className="resume-eyebrow">{project.date} · CASE STUDY</p>
              <h1>{project.title}</h1>
              <p className="case-study-tagline">{project.tagline}</p>
              <ul className="resume-skill-list" aria-label="Technology stack">
                {project.stack.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              <a
                className="btn-grad case-study-live-link"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit live project ↗
              </a>
            </header>

            <div className="case-study-content">{content}</div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}