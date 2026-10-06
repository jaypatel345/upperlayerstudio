"use client";

import { useEffect, useRef } from "react";
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

    // A play() attempted in a background tab is dropped, so retry on return.
    document.addEventListener("visibilitychange", sync);
    warm.observe(video);
    observer.observe(video);
    return () => {
      warm.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [src, srcSmall]);

  return (
    <video
      ref={ref}
      poster={poster}
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
