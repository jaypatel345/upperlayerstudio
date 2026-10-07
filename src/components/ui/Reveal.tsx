"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** distance travelled on entry, in px */
  y?: number;
};

/** Scroll-in reveal used by every section so motion stays consistent. */
export function Reveal({ children, className, delay = 0, y = 18 }: Props) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <m.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
