"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Scroll depth for the hero photo, after BrightStudios: as the hero scrolls
 * away the photo drifts down and slowly zooms, so it moves slower than the
 * page. Like theirs it tracks the scroll directly (no spring), at about 60% of
 * their travel (theirs: 18% / 1.12) for a calmer feel.
 */
export function HeroParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // 0 with the hero's top at the viewport top, 1 once it has scrolled fully past
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "11%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.025, 1.08]);

  return (
    <div ref={ref} className="absolute inset-0">
      {/* Starts 10% above the box, so the photo sits higher and its lower part shows */}
      <motion.div
        className="absolute inset-x-0 -top-[10%] bottom-0 will-change-transform"
        style={reduce ? { scale: 1.025 } : { y, scale }}
      >
        {children}
      </motion.div>
    </div>
  );
}
