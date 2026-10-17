"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Scroll depth for the hero photo, after BrightStudios: as the hero scrolls
 * away the photo drifts down and slowly zooms, so it moves slower than the
 * page.
 * Uses a passive requestAnimationFrame listener to keep the main thread
 * completely free during initial page load and eliminate TBT.
 */
export function HeroParallax({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          const height = container.offsetHeight || window.innerHeight;
          // Progress: 0 at top, 1 once the hero has scrolled out of view
          const progress = Math.min(Math.max(-rect.top / height, 0), 1);
          const y = progress * 11;
          const scale = 1.025 + progress * (1.08 - 1.025);
          inner.style.transform = `translate3d(0, ${y}%, 0) scale(${scale})`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduce]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* Flush with top so the sky sits cleanly behind the headline and subtitle */}
      <div
        ref={innerRef}
        className="absolute inset-0 will-change-transform"
        style={{
          transform: reduce ? "scale(1.025)" : "translate3d(0, 0%, 0) scale(1.025)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
