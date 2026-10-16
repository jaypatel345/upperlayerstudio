"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** distance travelled on entry, in px — 12px matches Bright Studios micro-motion */
  y?: number;
};

let sharedObserver: IntersectionObserver | null = null;
const observerCallbacks = new Map<Element, () => void>();

function getSharedObserver() {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cb = observerCallbacks.get(entry.target);
            if (cb) {
              cb();
              observerCallbacks.delete(entry.target);
              sharedObserver?.unobserve(entry.target);
            }
          }
        }
      },
      // Triggers slightly before element enters view for smooth, anticipatory flow
      { rootMargin: "0px 0px -24px 0px", threshold: 0.04 },
    );
  }
  return sharedObserver;
}

/**
 * Scroll-in reveal matching Bright Studios:
 * Fast, delicate 0.48s entrance with [0.22, 1, 0.36, 1] quintic ease-out
 * and subtle 12px translation to prevent disruptive layout jumping.
 */
export function Reveal({ children, className, delay = 0, y = 12 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const observer = getSharedObserver();
    if (!observer) {
      const frame = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(frame);
    }

    observerCallbacks.set(el, () => setRevealed(true));
    observer.observe(el);

    return () => {
      observerCallbacks.delete(el);
      observer.unobserve(el);
    };
  }, [reduce]);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "none" : `translate3d(0, ${y}px, 0)`,
        transition:
          "opacity 0.48s cubic-bezier(0.22, 1, 0.36, 1), transform 0.48s cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: delay ? `${delay}s` : undefined,
        willChange: revealed ? undefined : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
