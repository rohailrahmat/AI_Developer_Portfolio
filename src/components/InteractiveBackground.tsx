"use client";

import { useEffect, useRef } from "react";

export function InteractiveBackground() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updatePosition = () => {
      if (spotlightRef.current) {
        // Smooth interpolation
        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;

        spotlightRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {/* Dynamic Cursor Spotlight */}
      <div
        ref={spotlightRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 700,
          height: 700,
          marginLeft: -350,
          marginTop: -350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(59, 130, 246, 0.04) 35%, transparent 70%)",
          filter: "blur(40px)",
          willChange: "transform",
        }}
      />

      {/* Floating Ambient Aurora Blob 1 - Violet */}
      <div
        className="aurora-blob aurora-blob-1"
        style={{
          position: "absolute",
          top: "5%",
          left: "15%",
          width: "45vw",
          height: "45vw",
          maxWidth: "600px",
          maxHeight: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Floating Ambient Aurora Blob 2 - Cyan/Blue */}
      <div
        className="aurora-blob aurora-blob-2"
        style={{
          position: "absolute",
          top: "40%",
          right: "10%",
          width: "40vw",
          height: "40vw",
          maxWidth: "550px",
          maxHeight: "550px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Floating Ambient Aurora Blob 3 - Emerald/Teal accent */}
      <div
        className="aurora-blob aurora-blob-3"
        style={{
          position: "absolute",
          bottom: "10%",
          left: "25%",
          width: "35vw",
          height: "35vw",
          maxWidth: "500px",
          maxHeight: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16, 185, 129, 0.07) 0%, rgba(6, 182, 212, 0.03) 50%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* Subtle sweeping light beam */}
      <div className="grid-beam" />
    </div>
  );
}
