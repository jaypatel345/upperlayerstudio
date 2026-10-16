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
      // CSS pixels: wider than the 720p cut's own width is where 1080p shows.
      return mediaUrl(!slow && video.clientWidth > 1280 ? src : srcSmall);
    };

    // Fetch when the clip is about a quarter-screen away; drop it again once
    // it is more than half a screen away, so off-screen clips stop downloading.
    const near = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.getAttribute("src")) return;
          video.src = pick();
          video.preload = "auto";
          sync();
        }
      },
      { rootMargin: "25% 0px" },
    );

    const far = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || !video.getAttribute("src")) return;
        video.pause();
        video.removeAttribute("src");
        video.preload = "none";
        video.load();
      },
      { rootMargin: "60% 0px" },
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.35 },
    );

    // Hold any fetching until the page has finished loading: a clip near the
    // fold would otherwise start a multi-MB download that competes with the
    // hero photo for bandwidth on a phone and pushes back LCP.
    const arm = () => {
      near.observe(video);
      far.observe(video);
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });

    // A play() attempted in a background tab is dropped, so retry on return.
    document.addEventListener("visibilitychange", sync);
    observer.observe(video);
    return () => {
      window.removeEventListener("load", arm);
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
