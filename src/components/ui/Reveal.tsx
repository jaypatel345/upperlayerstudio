"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** distance travelled on entry, in px */
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
      { rootMargin: "-80px" },
    );
  }
  return sharedObserver;
}

/** Scroll-in reveal used by every section so motion stays consistent without Framer Motion overhead. */
export function Reveal({ children, className, delay = 0, y = 18 }: Props) {
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
        transform: revealed ? "none" : `translateY(${y}px)`,
        transition: "opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1), transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: delay ? `${delay}s` : undefined,
        willChange: revealed ? undefined : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
