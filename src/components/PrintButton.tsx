"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="btn-ghost no-print"
      id="print-resume"
    >
      Print / Save as PDF
    </button>
  );
}
