"use client";

import { LazyMotion } from "motion/react";

// The animation engine (whileInView, exit, height: auto…) arrives as its own
// chunk after first paint instead of riding in every page's bundle. Until it
// lands, `m` elements render their initial state, which is what they show
// before animating anyway.
const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

/** `strict` makes a stray full-size `motion.*` component throw, so the trim can't quietly regress. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
