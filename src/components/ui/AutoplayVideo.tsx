"use client";

import { useEffect, useRef, useSyncExternalStore, type CSSProperties } from "react";
import { getImageProps } from "next/image";
import { cn } from "@/lib/cn";
import { mediaLoader, mediaUrl } from "@/lib/media";

function subscribePhone(callback: () => void) {
  const mql = window.matchMedia("(max-width: 768px)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getPhoneSnapshot() {
  return window.matchMedia("(max-width: 768px)").matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * A showcase clip rather than a player: muted, looping, no controls, and it
 * only plays while it is on screen.
 *
 * On mobile/phone viewports (<= 768px), videos are skipped entirely in favor
 * of pre-sized plain images, saving multi-megabyte transfers on cellular data
 * and dramatically speeding up mobile LCP and rendering performance.
 *
 * Downloads on larger viewports are kept to the clip in front of the visitor.
 * A clip only starts fetching when it is about to scroll in, and drops source
 * once scrolled away.
 */
export function AutoplayVideo({
  src,
  srcSmall,
  poster,
  label,
  posterWidth = 375,
  fit = "cover",
  className,
  style,
}: {
  src: string;
  srcSmall?: string;
  poster: string;
  label: string;
  posterWidth?: number;
  /** "contain" shows the whole clip when its ratio differs from the frame's */
  fit?: "cover" | "contain";
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const isPhone = useSyncExternalStore(subscribePhone, getPhoneSnapshot, getServerSnapshot);

  useEffect(() => {
    if (isPhone) return;
    const video = ref.current;
    if (!video) return;

    let inView = false;
    const sync = () => {
      if (inView && !document.hidden && video.getAttribute("src")) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const pick = () => {
      if (!srcSmall) return mediaUrl(src);
      const conn = (navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }).connection;
      const slow = conn?.saveData || /(^|-)(2g|3g)$/.test(conn?.effectiveType ?? "");
      if (slow) return mediaUrl(srcSmall);

      // On standard displays (laptops, tablets, desktop viewports <= 1536px),
      // the container frame is at most 740px wide. Serving the 720p cut (srcSmall)
      // starts up to 3x faster, saves memory, and delivers >1.5x retina clarity.
      // 1080p (src) is reserved for extra-wide displays (> 1536px).
      const isUltraWide = typeof window !== "undefined" && window.innerWidth > 1536;
      return mediaUrl(isUltraWide ? src : srcSmall);
    };

    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;

    const clearFallback = () => {
      if (fallbackTimer) {
        clearTimeout(fallbackTimer);
        fallbackTimer = undefined;
      }
    };

    const fallbackToLocal = () => {
      clearFallback();
      const current = video.getAttribute("src") ?? "";
      if (current.startsWith("http")) {
        const local = srcSmall ? srcSmall : src;
        if (current !== local) {
          video.src = local;
          video.load();
          sync();
        }
      }
    };

    const onCanPlay = () => {
      clearFallback();
      sync();
    };

    video.addEventListener("loadeddata", clearFallback);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("playing", clearFallback);
    video.addEventListener("error", fallbackToLocal);

    // Pre-buffer when clip is ~1 screen away so it is already ready to play
    // when scrolled into view.
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.getAttribute("src")) return;
          const chosen = pick();
          video.src = chosen;
          video.preload = "auto";
          sync();

          if (chosen.startsWith("http")) {
            clearFallback();
            fallbackTimer = setTimeout(() => {
              if (video.readyState < 2) {
                fallbackToLocal();
              }
            }, 2500);
          }
        }
      },
      { rootMargin: "120% 0px" },
    );

    // Drop source only when scrolled far away (2.5 screens) so reading adjacent text
    // does not discard buffered video chunks.
    const far = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || !video.getAttribute("src")) return;
        clearFallback();
        video.pause();
        video.removeAttribute("src");
        video.preload = "none";
        video.load();
      },
      { rootMargin: "250% 0px" },
    );

    // Play as soon as the edge of the clip enters the viewport (5% visible)
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );

    // Arm observers right away on mount to avoid waiting on external images/scripts
    const arm = () => {
      near.observe(video);
      far.observe(video);
    };
    const raf = requestAnimationFrame(arm);

    // A play() attempted in a background tab is dropped, so retry on return.
    document.addEventListener("visibilitychange", sync);
    observer.observe(video);
    return () => {
      cancelAnimationFrame(raf);
      clearFallback();
      video.removeEventListener("loadeddata", clearFallback);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("playing", clearFallback);
      video.removeEventListener("error", fallbackToLocal);
      near.disconnect();
      far.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [src, srcSmall, isPhone]);

  // The poster loads with the page, so it comes pre-sized: a WebP near the
  // frame's width instead of the ~100 KB 1920px JPEG it was cut from.
  const posterSrc = getImageProps({
    loader: mediaLoader,
    src: poster,
    alt: "",
    width: posterWidth,
    height: Math.round((posterWidth * 9) / 16),
    quality: 75,
  }).props.src;

  if (isPhone) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={posterSrc}
        alt={label}
        loading="lazy"
        className={cn(
          "pointer-events-none block w-full select-none",
          fit === "contain" ? "object-contain" : "object-cover",
          className,
        )}
        style={style}
      />
    );
  }

  return (
    <video
      ref={ref}
      poster={posterSrc}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload nofullscreen noremoteplayback"
      aria-label={label}
      onContextMenu={(e) => e.preventDefault()}
      className={cn(
        "pointer-events-none block w-full select-none",
        fit === "contain" ? "object-contain" : "object-cover",
        className,
      )}
      style={style}
    >
      {/* The clips have no sound; the track says so for anyone relying on captions */}
      <track kind="captions" src="/captions/no-audio.vtt" srcLang="en" label="English" />
    </video>
  );
}
