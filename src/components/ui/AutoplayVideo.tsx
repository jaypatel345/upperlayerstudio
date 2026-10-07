"use client";

import { useEffect, useRef } from "react";
import { getImageProps } from "next/image";
import { cn } from "@/lib/cn";

/**
 * A showcase clip rather than a player: muted, looping, no controls, and it
 * only plays while it is on screen.
 *
 * Downloads are kept to the clip in front of the visitor. A clip only starts
 * fetching when it is about to scroll in, and if it is scrolled well away it
 * drops its source, which cancels the download. A page with several clips
 * (the homepage has five) used to buffer them all at once, and the one being
 * watched stalled for bandwidth.
 *
 * Given `srcSmall` (a 720p cut), it uses that unless the frame is wider than
 * the 720p cut itself or the visitor has asked to save data. The 1080p cut is
 * twice the size, and these clips are screen recordings shown at well under
 * full screen, so 720p is what most visitors see.
 *
 * `posterWidth` is the CSS width the frame is usually shown at; the poster is
 * served at twice that for high-density screens.
 */
export function AutoplayVideo({
  src,
  srcSmall,
  poster,
  label,
  posterWidth = 375,
  className,
}: {
  src: string;
  srcSmall?: string;
  poster: string;
  label: string;
  posterWidth?: number;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
      if (!srcSmall) return src;
      const conn = (navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }).connection;
      const slow = conn?.saveData || /(^|-)(2g|3g)$/.test(conn?.effectiveType ?? "");
      // CSS pixels: wider than the 720p cut's own width is where 1080p shows.
      return !slow && video.clientWidth > 1280 ? src : srcSmall;
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
  }, [src, srcSmall]);

  // The poster loads with the page, so send it through the image optimiser:
  // a WebP/AVIF sized to the frame instead of the ~100 KB 1920px JPEG it was cut from.
  const posterSrc = getImageProps({
    src: poster,
    alt: "",
    width: posterWidth,
    height: Math.round((posterWidth * 9) / 16),
    quality: 75,
  }).props.src;

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
      className={cn("pointer-events-none block w-full select-none object-cover", className)}
    >
      {/* The clips have no sound; the track says so for anyone relying on captions */}
      <track kind="captions" src="/captions/no-audio.vtt" srcLang="en" label="English" />
    </video>
  );
}
