"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";

const navLinks = [
  { href: "/#about", label: "about()" },
  { href: "/#work", label: "work()" },
  { href: "/#process", label: "process()" },
  { href: "/contact", label: "contact()" },
];

export function Nav() {
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 border-b"
      style={{ borderColor: "var(--rule)", background: "var(--bg)" }}
    >
      <nav
        className="container flex items-center justify-between"
        style={{ paddingBlock: "1rem" }}
        aria-label="Main navigation"
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="font-mono text-label font-medium tracking-tight"
          style={{ color: "var(--text)" }}
          aria-label="Rohail Rahmat — home"
        >
          rohail()
        </Link>

        {/* Desktop links */}
        <ul
          className="hidden md:flex items-center gap-6 list-none"
          role="list"
        >
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="label transition-colors duration-150"
                style={{
                  color:
                    pathname === href ? "var(--accent)" : "var(--muted)",
                }}
                aria-current={pathname === href ? "page" : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: theme toggle + mobile menu button */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="label p-2 rounded transition-colors"
            style={{ color: "var(--muted)", minHeight: "44px", minWidth: "44px" }}
          >
            {theme === "dark" ? "☀" : "◑"}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden label p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            style={{ color: "var(--muted)", minHeight: "44px", minWidth: "44px" }}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t"
          style={{ borderColor: "var(--rule)", background: "var(--bg)" }}
        >
          <ul className="container py-4 flex flex-col gap-4 list-none" role="list">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="label block py-1"
                  style={{ color: "var(--text)" }}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
