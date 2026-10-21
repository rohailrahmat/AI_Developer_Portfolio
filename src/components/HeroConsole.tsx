"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  { text: "analyse_pain_point()", comment: "" },
  { text: "break_into_steps()", comment: "" },
  { text: "build()", comment: "// OpenAI · Gemini · RAG" },
  { text: "deploy_and_hand_over()", comment: "■" },
];

// Typing speed in ms per character
const CHAR_MS = 38;
// Pause between lines
const LINE_PAUSE = 260;

export function HeroConsole() {
  const [visibleLines, setVisibleLines] = useState<
    { text: string; comment: string; done: boolean }[]
  >([]);
  const [currentChar, setCurrentChar] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [done, setDone] = useState(false);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced.current) {
      setVisibleLines(LINES.map((l) => ({ ...l, done: true })));
      setDone(true);
      return;
    }

    // Start typing
    setVisibleLines([{ text: "", comment: LINES[0].comment, done: false }]);
  }, []);

  useEffect(() => {
    if (prefersReduced.current || done) return;
    if (visibleLines.length === 0) return;

    const target = LINES[lineIndex].text;

    if (currentChar < target.length) {
      const t = setTimeout(() => {
        setVisibleLines((prev) => {
          const copy = [...prev];
          copy[lineIndex] = {
            ...copy[lineIndex],
            text: target.slice(0, currentChar + 1),
          };
          return copy;
        });
        setCurrentChar((c) => c + 1);
      }, CHAR_MS);
      return () => clearTimeout(t);
    } else {
      // Line done
      if (lineIndex < LINES.length - 1) {
        const t = setTimeout(() => {
          setVisibleLines((prev) => {
            const copy = [...prev];
            copy[lineIndex] = { ...copy[lineIndex], done: true };
            return [
              ...copy,
              { text: "", comment: LINES[lineIndex + 1].comment, done: false },
            ];
          });
          setLineIndex((i) => i + 1);
          setCurrentChar(0);
        }, LINE_PAUSE);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setDone(true);
          setVisibleLines((prev) => {
            const copy = [...prev];
            copy[lineIndex] = { ...copy[lineIndex], done: true };
            return copy;
          });
        }, 0);
        return () => clearTimeout(t);
      }
    }
  }, [currentChar, lineIndex, visibleLines, done]);

  return (
    <div className="console" role="img" aria-label="Code console showing Rohail's process: analyse, plan, build, deploy">
      {visibleLines.map((line, i) => (
        <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "baseline" }}>
          <span className="console-prompt" aria-hidden="true">
            &gt;
          </span>
          <span className="console-text">
            {line.text}
            {!line.done && <span className="console-cursor" aria-hidden="true" />}
          </span>
          {line.done && line.comment && (
            <span className="console-comment" aria-hidden="true">
              &nbsp;&nbsp;{line.comment}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
