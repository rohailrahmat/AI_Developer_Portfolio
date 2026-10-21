import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      role="contentinfo"
      className="border-t"
      style={{ borderColor: "var(--rule)" }}
    >
      <div
        className="container flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        style={{ paddingBlock: "2rem" }}
      >
        <p className="label" style={{ color: "var(--muted)" }}>
          © {year} Rohail Rahmat. Built end to end.
        </p>
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-6 list-none" role="list">
            <li>
              <Link href="/privacy" className="label" style={{ color: "var(--muted)" }}>
                privacy()
              </Link>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/rohail-rahmat"
                target="_blank"
                rel="noopener noreferrer"
                className="label"
                style={{ color: "var(--muted)" }}
              >
                linkedin()
              </a>
            </li>
            <li>
              <a
                href="mailto:rohailrahmat7525@gmail.com"
                className="label"
                style={{ color: "var(--muted)" }}
              >
                email()
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
