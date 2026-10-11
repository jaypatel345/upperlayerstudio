"use client";

import { useEffect } from "react";

/**
 * Loads Google Analytics on first user interaction (scroll, click, touch, mousemove)
 * or after an idle timeout. Prevents third-party tracking scripts from blocking
 * the main thread during initial page load, driving TBT down to 0ms.
 */
export function Analytics() {
  useEffect(() => {
    let loaded = false;

    const loadGtag = () => {
      if (loaded) return;
      loaded = true;

      window.removeEventListener("scroll", loadGtag);
      window.removeEventListener("mousemove", loadGtag);
      window.removeEventListener("touchstart", loadGtag);
      window.removeEventListener("keydown", loadGtag);

      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-X3049BT33Q";
      script.async = true;
      document.head.appendChild(script);
    };

    window.addEventListener("scroll", loadGtag, { once: true, passive: true });
    window.addEventListener("mousemove", loadGtag, { once: true, passive: true });
    window.addEventListener("touchstart", loadGtag, { once: true, passive: true });
    window.addEventListener("keydown", loadGtag, { once: true, passive: true });

    const timer = setTimeout(loadGtag, 3500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", loadGtag);
      window.removeEventListener("mousemove", loadGtag);
      window.removeEventListener("touchstart", loadGtag);
      window.removeEventListener("keydown", loadGtag);
    };
  }, []);

  return null;
}
