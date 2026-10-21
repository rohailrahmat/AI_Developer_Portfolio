"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const GITHUB_URL = "https://github.com/rohailrahmat";
const UPWORK_URL = "https://www.upwork.com/freelancers/~0144050cbd94f3a7c6";

const UpworkIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-3.799 0-5.836 2.502-6.425 4.547-1.422-2.155-2.222-4.757-2.383-7.565H5.823v7.798c0 2.12-1.725 3.844-3.846 3.844H0v3.91h1.977c3.277 0 5.944-2.667 5.944-5.944V8.455c.29 2.518 1.173 5.093 2.723 7.378l-2.02 9.539h4.053l1.458-6.879c1.28.847 2.825 1.344 4.426 1.344 3.796 0 6.878-3.082 6.878-6.878s-3.082-6.879-6.878-6.879z" />
  </svg>
);

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/#work", label: "Work" },
    { href: "/#about", label: "About" },
    { href: "/#services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="site-header-wrapper">
      <nav aria-label="Main navigation" className="site-nav-pill">
        {/* Brand */}
        <Link
          href="/"
          className="nav-brand"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem" }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
              border: "1.5px solid #8b5cf6",
              boxShadow: "0 0 8px rgba(139, 92, 246, 0.4)",
              flexShrink: 0,
            }}
          >
            <Image
              src="/rohail.png"
              alt="Rohail Rahmat"
              fill
              sizes="24px"
              style={{ objectFit: "cover" }}
            />
          </div>
          ROHAIL
        </Link>

        {/* Desktop Links */}
        <ul className="nav-desktop-list" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href} className="nav-item">
              <a href={href} className="nav-link-item">
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right CTA */}
        <div className="nav-actions">
          {/* Upwork icon link */}
          <a
            href={UPWORK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Upwork profile"
            className="nav-link-item upwork-link"
            style={{ display: "flex", alignItems: "center", padding: "0.2rem" }}
          >
            <UpworkIcon size={18} />
          </a>

          {/* GitHub icon link */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="nav-link-item"
            style={{ display: "flex", alignItems: "center", padding: "0.2rem" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          <a href="/resume" className="btn-grad nav-resume-btn">
            Resume
          </a>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="nav-mobile-dropdown">
          <ul className="nav-mobile-list" role="list">
            {[
              ...navLinks,
              { href: UPWORK_URL, label: "Upwork ↗" },
              { href: GITHUB_URL, label: "GitHub ↗" },
              { href: "/resume", label: "Resume" },
            ].map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="nav-mobile-link"
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
