import { AutoplayVideo } from "@/components/ui/AutoplayVideo";
import { mediaLoader } from "@/lib/media";
import type { Project } from "@/lib/projects";

/**
 * Walkthrough clip. Plays muted and looping with no controls once it scrolls
 * into view, so it reads as a showcase rather than a player. With no `src` it
 * becomes an honest "coming soon" poster rather than a broken player.
 */
export function ProjectVideo({ video, name }: { video: Project["video"]; name: string }) {
  if (!video.src) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-lg)] border border-line bg-dark">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mediaLoader({ src: video.poster, width: 1280 })}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center text-[15px] font-medium text-white">
          {name} walkthrough coming soon
        </div>
      </div>
    );
  }

  // A light frame that clips the clip, so no dark fringe shows at the corners.
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-line bg-white shadow-[var(--shadow-card)]">
      <AutoplayVideo
        src={video.src}
        srcSmall={video.srcSmall}
        poster={video.poster}
        label={`${name} walkthrough video`}
        posterWidth={600}
        className="aspect-video"
      />
    </div>
  );
}
