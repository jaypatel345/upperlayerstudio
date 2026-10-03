import type { Project } from "@/lib/projects";

/**
 * Walkthrough player. Plain <video> with a poster and nothing preloaded, so
 * the clip costs no bandwidth until someone presses play. With no `src` it
 * becomes an honest "coming soon" poster rather than a broken player.
 */
export function ProjectVideo({ video, name }: { video: Project["video"]; name: string }) {
  if (!video.src) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] border border-line bg-dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={video.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center text-[15px] font-medium text-white">
          {name} walkthrough coming soon
        </div>
      </div>
    );
  }

  return (
    <video
      controls
      playsInline
      preload="none"
      poster={video.poster}
      aria-label={`${name} walkthrough video`}
      className="aspect-[16/10] w-full rounded-[var(--radius-lg)] border border-line bg-dark object-cover shadow-[var(--shadow-card)]"
    >
      <source src={video.src} type="video/mp4" />
    </video>
  );
}
