/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Dark theme tokens
        "dark-bg": "#14110d",
        "dark-panel": "#1c1812",
        "dark-text": "#ebe4d4",
        "dark-muted": "#a0957f",
        "dark-accent": "#f2a93b",
        "dark-rule": "#2f2920",
        // Light theme tokens
        "light-bg": "#f5f0e6",
        "light-panel": "#ebe4d4",
        "light-text": "#241e14",
        "light-muted": "#6b6252",
        "light-accent": "#9a5a00",
        "light-rule": "#d6ccb8",
      },
      fontFamily: {
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-ibm-plex-sans)", "ui-sans-serif", "system-ui"],
      },
      fontSize: {
        display: ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h1: ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        h2: ["1.5rem", { lineHeight: "1.2" }],
        h3: ["1.125rem", { lineHeight: "1.3" }],
        body: ["1.0625rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        label: ["0.8125rem", { lineHeight: "1" }],
      },
      maxWidth: {
        prose: "72ch",
        site: "1200px",
      },
      spacing: {
        section: "6rem",
      },
    },
  },
  plugins: [],
};
