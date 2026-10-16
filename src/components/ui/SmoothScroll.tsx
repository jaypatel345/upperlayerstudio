"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";

type SmoothScrollContextType = {
  scrollTo: (target: number | string | HTMLElement, options?: { offset?: number }) => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  scrollTo: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

/**
 * High-performance, physics-based inertia smooth scrolling engine
 * Replicates the exact exponential damping and micro-motion feel of bybrightstudios.com
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const scrollToRef = useRef<(target: number | string | HTMLElement, options?: { offset?: number }) => void>(() => {});

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const docEl = document.documentElement;

    let animFrameId = 0;
    let targetY = window.scrollY;
    let currentY = targetY;
    let lastReportedY = targetY;
    let lastTimestamp = 0;
    let savedScrollBehavior = "";
    let savedPriority = "";

    const reset = () => {
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        if (savedScrollBehavior) {
          docEl.style.setProperty("scroll-behavior", savedScrollBehavior, savedPriority);
        } else {
          docEl.style.removeProperty("scroll-behavior");
        }
      }
      animFrameId = 0;
      currentY = targetY = lastReportedY = window.scrollY;
    };

    const getMaxScroll = () =>
      Math.max(0, (document.scrollingElement || docEl).scrollHeight - window.innerHeight);

    // Frame-rate independent exponential damping tick
    const tick = (now: number) => {
      // Respect accessibility, tab visibility, or external scroll divergence
      if (
        reducedMotionQuery.matches ||
        !finePointerQuery.matches ||
        document.hidden ||
        Math.abs(window.scrollY - lastReportedY) > 2
      ) {
        reset();
        return;
      }

      targetY = Math.max(0, Math.min(targetY, getMaxScroll()));
      const dt = Math.min(48, Math.max(1, now - lastTimestamp));
      lastTimestamp = now;

      // Exponential damping with tau = 85ms (exact formula from bybrightstudios.com)
      currentY += (targetY - currentY) * (1 - Math.exp(-dt / 85));

      const isDone = Math.abs(targetY - currentY) < 0.5;
      if (isDone) {
        currentY = targetY;
      }

      window.scrollTo({
        left: window.scrollX,
        top: currentY,
        behavior: "instant" as ScrollBehavior,
      });
      lastReportedY = window.scrollY;

      if (isDone) {
        reset();
      } else {
        animFrameId = requestAnimationFrame(tick);
      }
    };

    const startAnimation = () => {
      if (!animFrameId) {
        savedScrollBehavior = docEl.style.getPropertyValue("scroll-behavior");
        savedPriority = docEl.style.getPropertyPriority("scroll-behavior");
        docEl.style.setProperty("scroll-behavior", "auto", "important");
        lastTimestamp = performance.now();
        animFrameId = requestAnimationFrame(tick);
      }
    };

    const onWheel = (e: WheelEvent) => {
      // Don't interfere if modifier keys pressed or reduced motion
      if (
        e.defaultPrevented ||
        !e.cancelable ||
        reducedMotionQuery.matches ||
        !finePointerQuery.matches ||
        document.hidden ||
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        e.shiftKey ||
        Math.abs(e.deltaX) >= Math.abs(e.deltaY) ||
        !e.deltaY
      ) {
        reset();
        return;
      }

      // Check composed path to allow nested scroll containers (dialogs, dropdowns, code blocks, etc.)
      const path = e.composedPath ? e.composedPath() : [];
      for (const el of path) {
        if (!(el instanceof HTMLElement) || el === docEl || el === document.body) continue;
        if (
          el.isContentEditable ||
          el.matches(
            "input,textarea,select,video,audio,iframe,nav,[role='dialog'],[role='menu'],[role='listbox'],[contenteditable='true'],[data-native-scroll]"
          )
        ) {
          reset();
          return;
        }
        if (
          el.scrollHeight > el.clientHeight + 1 &&
          /^(auto|scroll|overlay)$/.test(window.getComputedStyle(el).overflowY)
        ) {
          reset();
          return;
        }
      }

      if (
        [docEl, document.body].some(
          (el) => el && /^(hidden|clip)$/.test(window.getComputedStyle(el).overflowY)
        )
      ) {
        reset();
        return;
      }

      // Normalize delta mode
      const factor = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      const delta = e.deltaY * factor;

      if (!animFrameId) {
        currentY = targetY = lastReportedY = window.scrollY;
      }

      // Immediate reversal handling: eliminate rubber-band lag when switching scroll direction
      if ((targetY - currentY) * delta < 0) {
        targetY = currentY;
      }

      const nextTarget = Math.max(0, Math.min(targetY + delta, getMaxScroll()));
      if (Math.abs(nextTarget - currentY) < 0.5) {
        reset();
        return;
      }

      e.preventDefault();
      targetY = nextTarget;
      startAnimation();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ", "Tab", "Escape"].includes(
          e.key
        )
      ) {
        reset();
      }
    };

    const programmaticScrollTo = (
      target: number | string | HTMLElement,
      options?: { offset?: number }
    ) => {
      let destination = 0;
      const offset = options?.offset ?? 60; // default 60px navbar offset

      if (typeof target === "number") {
        destination = target;
      } else if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) {
          destination = el.getBoundingClientRect().top + window.scrollY - offset;
        } else {
          return;
        }
      } else if (target instanceof HTMLElement) {
        destination = target.getBoundingClientRect().top + window.scrollY - offset;
      }

      targetY = Math.max(0, Math.min(destination, getMaxScroll()));
      currentY = lastReportedY = window.scrollY;
      startAnimation();
    };

    scrollToRef.current = programmaticScrollTo;

    // Intercept in-page anchor links for silky smooth glide
    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href*="#"]');
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Check if it's an on-page hash link (e.g. "#services" or "/#services" on home page)
      const isHashOnly = href.startsWith("#");
      const isSamePathHash =
        href.includes("#") &&
        (href.startsWith(window.location.pathname + "#") ||
          (window.location.pathname === "/" && href.startsWith("/#")));

      if (isHashOnly || isSamePathHash) {
        const hash = href.substring(href.indexOf("#"));
        if (hash === "#" || hash === "#main") return;
        const targetEl = document.querySelector(hash);
        if (targetEl) {
          e.preventDefault();
          programmaticScrollTo(hash);
          window.history.pushState(null, "", hash);
        }
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", reset, { passive: true });
    window.addEventListener("touchstart", reset, { passive: true });
    window.addEventListener("resize", reset, { passive: true });
    window.addEventListener("hashchange", reset);
    window.addEventListener("popstate", reset);
    document.addEventListener("visibilitychange", reset);
    document.addEventListener("click", onAnchorClick);
    reducedMotionQuery.addEventListener("change", reset);
    finePointerQuery.addEventListener("change", reset);

    return () => {
      reset();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", reset);
      window.removeEventListener("touchstart", reset);
      window.removeEventListener("resize", reset);
      window.removeEventListener("hashchange", reset);
      window.removeEventListener("popstate", reset);
      document.removeEventListener("visibilitychange", reset);
      document.removeEventListener("click", onAnchorClick);
      reducedMotionQuery.removeEventListener("change", reset);
      finePointerQuery.removeEventListener("change", reset);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider
      value={{
        scrollTo: (target, options) => scrollToRef.current(target, options),
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}
