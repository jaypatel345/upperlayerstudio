"use client";

import { useEffect, useRef } from "react";
import { getImageProps } from "next/image";
import { cn } from "@/lib/cn";

/**
 * A showcase clip rather than a player: muted, looping, no controls, and it
 * only plays while it is on screen. Nothing loads until the clip is about to
 * scroll into view, and it pauses again once it leaves, so it never costs
 * bandwidth or battery off screen. Given `srcSmall` (a 720p cut), it picks
 * whichever file matches how many real pixels the frame covers, so Retina
 * laptops get the sharp 1080p cut and phones get the light one.
 */
export function AutoplayVideo({
  src,
  srcSmall,
  poster,
  label,
  className,
}: {
  src: string;
  srcSmall?: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    let inView = false;
    const sync = () => {
      if (inView && !document.hidden) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    // Start buffering about a screen early, so the clip is ready to play
    // the moment it arrives instead of stalling on a blank poster.
    const warm = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // 720p is 1280px wide; past that, the 1080p cut is visibly sharper.
        const pixels = video.clientWidth * (window.devicePixelRatio || 1);
        video.src = srcSmall && pixels <= 1280 ? srcSmall : src;
        video.preload = "auto";
        warm.disconnect();
      },
      { rootMargin: "100% 0px" },
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.35 },
    );

    // Hold the warm-up until the page has finished loading: a clip near the
    // fold would otherwise start a multi-MB download that competes with the
    // hero photo for bandwidth on a phone and pushes back LCP.
    const arm = () => warm.observe(video);
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });

    // A play() attempted in a background tab is dropped, so retry on return.
    document.addEventListener("visibilitychange", sync);
    observer.observe(video);
    return () => {
      window.removeEventListener("load", arm);
      warm.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [src, srcSmall]);

  // The poster loads with the page, so send it through the image optimiser:
  // a 1200px WebP/AVIF instead of the ~100 KB 1920px JPEG it was cut from.
  const posterSrc = getImageProps({ src: poster, alt: "", width: 600, height: 338, quality: 75 }).props.src;

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
    />
  );
}
