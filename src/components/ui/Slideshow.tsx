"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

export type Slide = { key: string; node: React.ReactNode };

/**
 * A manual, endlessly looping slideshow, copied from the reference's project
 * and Lab galleries: one slide at a time, dragged or swiped to browse, arrow
 * keys when focused, with a "Drag to move" pill offered to a resting mouse.
 *
 * `bleed` lets the neighbouring slides run off into the page margins (the
 * project galleries); `contained` clips them to a rounded frame (the Lab).
 *
 * The loop is three copies of the slides with the middle copy live; after a
 * move lands in an outer copy, the track jumps back to the matching slide in
 * the middle without animating, so it never runs out in either direction.
 */
export function Slideshow({
  slides,
  label,
  variant = "bleed",
  slideClassName,
  className,
}: {
  slides: Slide[];
  /** What the slides show, for the region's accessible name */
  label: string;
  variant?: "bleed" | "contained";
  /** Sizing for each slide, e.g. its aspect ratio and background */
  slideClassName?: string;
  className?: string;
}) {
  const n = slides.length;
  const reduce = useReducedMotion();

  const [index, setIndex] = useState(n);
  const [animate, setAnimate] = useState(true);
  const [dx, setDx] = useState(0);
  const drag = useRef<{ x: number; y: number; id: number; locked?: "x" | "y" } | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [hint, setHint] = useState(false);
  const hintTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const wrap = useCallback((i: number) => (((i % n) + n) % n) + n, [n]);

  // With reduced motion there is no slide and no transitionend, so land
  // straight in the middle copy.
  const go = useCallback(
    (step: number) => {
      setAnimate(true);
      setIndex((i) => (reduce ? wrap(i + step) : i + step));
    },
    [reduce, wrap],
  );

  // Snap back into the middle copy once a move has finished.
  const settle = () => {
    if (index >= n && index < 2 * n) return;
    setAnimate(false);
    setIndex(wrap(index));
  };

  // Re-enable the transition on the frame after a silent jump.
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  // The "Drag" pill follows the mouse over the slide. It is moved through
  // the DOM directly, so tracking the pointer never re-renders the gallery.
  const placeHint = (e: React.PointerEvent) => {
    const area = areaRef.current;
    const pill = hintRef.current;
    if (!area || !pill) return;
    const r = area.getBoundingClientRect();
    pill.style.transform = `translate3d(${e.clientX - r.left}px, ${e.clientY - r.top}px, 0)`;
  };

  // Wait a moment before offering the hint, so it only appears for someone
  // who has stopped on the slide rather than every pass of the mouse.
  const onPointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    placeHint(e);
    clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => setHint(true), 2500);
  };

  const onPointerLeave = () => {
    clearTimeout(hintTimer.current);
    setHint(false);
  };

  useEffect(() => () => clearTimeout(hintTimer.current), []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") placeHint(e);
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const mx = e.clientX - d.x;
    const my = e.clientY - d.y;
    if (!d.locked) {
      if (Math.abs(mx) < 6 && Math.abs(my) < 6) return;
      // A mostly vertical swipe is the page scrolling, not the gallery.
      d.locked = Math.abs(mx) > Math.abs(my) ? "x" : "y";
      if (d.locked === "x") {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        setAnimate(false);
      }
    }
    if (d.locked === "x") setDx(mx);
  };

  const onPointerEnd = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (d.locked !== "x") return;
    const width = trackRef.current?.offsetWidth ?? 1;
    const moved = dx / width;
    // A short flick is enough to move one slide; a long drag can move several.
    const step = Math.abs(moved) < 0.12 ? 0 : -Math.sign(moved) * Math.max(1, Math.round(Math.abs(moved)));
    setDx(0);
    go(step);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  const copies = [0, 1, 2].flatMap((copy) => slides.map((s, i) => ({ ...s, copy, i })));

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${label}. Use Left and Right Arrow keys to browse.`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cn(
        "outline-none focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-sky-deep",
        className,
      )}
    >
      <div
        ref={areaRef}
        className={cn(
          "group/drag relative cursor-grab touch-pan-y select-none active:cursor-grabbing",
          variant === "contained" && "overflow-hidden rounded-[var(--radius-card)]",
        )}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
      >
        <div
          ref={trackRef}
          onTransitionEnd={(e) => e.target === e.currentTarget && settle()}
          className={cn(
            "flex gap-[var(--gap)]",
            variant === "bleed" ? "[--gap:12px] lg:[--gap:24px]" : "[--gap:0px]",
          )}
          style={{
            transform: `translate3d(calc(${-index * 100}% - ${index} * var(--gap) + ${dx}px), 0, 0)`,
            transition:
              animate && !reduce && dx === 0
                ? "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)"
                : "none",
          }}
        >
          {copies.map((s) => {
            const live = s.copy === 1;
            return (
              <div
                key={`${s.copy}-${s.key}`}
                aria-hidden={!live || undefined}
                inert={!live || undefined}
                aria-roledescription={live ? "slide" : undefined}
                aria-label={live ? `${s.i + 1} of ${n}` : undefined}
                className={cn("relative w-full shrink-0 overflow-hidden", slideClassName)}
              >
                {s.node}
              </div>
            );
          })}
        </div>

        <div
          ref={hintRef}
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 z-10 hidden pointer-fine:block"
        >
          <div
            className={cn(
              // Sits just below-right of the pointer so the cursor stays visible
              "translate-x-4 translate-y-5 origin-top-left transition-[opacity,scale] duration-200 ease-[var(--ease-out-soft)]",
              hint ? "opacity-100 scale-100" : "opacity-0 scale-50",
              "group-active/drag:scale-90",
            )}
          >
            <span className="block whitespace-nowrap rounded-full bg-ink/85 px-3.5 py-2 text-[13px] font-medium text-white shadow-[var(--shadow-float)] backdrop-blur-md">
              Drag to move
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
