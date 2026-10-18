"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
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
  const [isReady, setIsReady] = useState(false);
  const [phonePosterLoaded, setPhonePosterLoaded] = useState(false);

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

    const markReady = () => {
      clearFallback();
      setIsReady(true);
    };

    const onCanPlay = () => {
      markReady();
      sync();
    };

    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("playing", markReady);
    video.addEventListener("error", () => {
      setIsReady(false);
      fallbackToLocal();
    });

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
        setIsReady(false);
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
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("playing", markReady);
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
      <div
        className={cn(
          "relative isolate overflow-hidden",
          className,
        )}
        style={style}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={posterSrc}
          alt={label}
          loading="lazy"
          onLoad={() => setPhonePosterLoaded(true)}
          className={cn(
            "pointer-events-none block h-full w-full select-none transition-opacity duration-500",
            fit === "contain" ? "object-contain" : "object-cover",
            phonePosterLoaded ? "opacity-100" : "opacity-0",
          )}
          style={style?.objectPosition ? { objectPosition: style.objectPosition } : undefined}
        />
        {!phonePosterLoaded && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <div className="relative flex items-center gap-2.5 rounded-full border border-white/80 bg-white/65 px-3.5 py-1.5 shadow-[0_8px_30px_rgba(15,23,42,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] backdrop-blur-xl">
              <div className="flex items-center gap-1">
                <span className="h-2 w-0.5 animate-[equalize_1.2s_ease-in-out_infinite] rounded-full bg-sky-600/80 [animation-delay:0ms]" />
                <span className="h-3.5 w-0.5 animate-[equalize_1.2s_ease-in-out_infinite] rounded-full bg-sky-600/90 [animation-delay:200ms]" />
                <span className="h-2.5 w-0.5 animate-[equalize_1.2s_ease-in-out_infinite] rounded-full bg-sky-600/80 [animation-delay:400ms]" />
              </div>
              <span className="text-[11px] font-medium tracking-tight text-ink/75 select-none">
                Loading preview
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        className,
      )}
      style={style}
    >
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
          "pointer-events-none block h-full w-full select-none",
          fit === "contain" ? "object-contain" : "object-cover",
        )}
        style={style?.objectPosition ? { objectPosition: style.objectPosition } : undefined}
      >
        {/* The clips have no sound; the track says so for anyone relying on captions */}
        <track kind="captions" src="/captions/no-audio.vtt" srcLang="en" label="English" />
      </video>

      {/* Floating Loading Preview Pill Only — No square background, no frosted box, no border */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-500 ease-out",
          isReady ? "opacity-0" : "opacity-100",
        )}
        aria-hidden="true"
      >
        <div className="relative flex items-center gap-2.5 rounded-full border border-white/80 bg-white/65 px-3.5 py-1.5 shadow-[0_8px_30px_rgba(15,23,42,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] backdrop-blur-xl">
          <div className="flex items-center gap-1">
            <span className="h-2 w-0.5 animate-[equalize_1.2s_ease-in-out_infinite] rounded-full bg-sky-600/80 [animation-delay:0ms]" />
            <span className="h-3.5 w-0.5 animate-[equalize_1.2s_ease-in-out_infinite] rounded-full bg-sky-600/90 [animation-delay:200ms]" />
            <span className="h-2.5 w-0.5 animate-[equalize_1.2s_ease-in-out_infinite] rounded-full bg-sky-600/80 [animation-delay:400ms]" />
          </div>
          <span className="text-[11px] font-medium tracking-tight text-ink/75 select-none">
            Loading preview
          </span>
        </div>
      </div>
    </div>
  );
}
