import { SkyPlate } from "@/components/ui/SkyPlate";
import { Screenshot, PhoneFrame } from "@/components/ui/DeviceFrames";
import { AutoplayVideo } from "@/components/ui/AutoplayVideo";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/projects";

/**
 * The hero art for a project: its desktop and mobile cover shots floating on
 * a sky plate, so the captures get room to breathe instead of being stretched
 * edge to edge. Pass `showMobile={false}` for the desktop shot alone, and
 * `playVideo` to show the walkthrough clip in place of the desktop shot.
 */
export function ProjectShowcase({
  project,
  className,
  priority,
  showMobile = true,
  playVideo = false,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
  showMobile?: boolean;
  playVideo?: boolean;
}) {
  const { desktop, mobile } = project.cover;
  const { video } = project;

  return (
    <SkyPlate
      variant={project.art}
      className={cn("rounded-[var(--radius-card)]", className)}
    >
      <div className="flex h-full items-center justify-center px-6 pt-8 pb-12 sm:px-10 sm:pt-12 sm:pb-16">
        <div className={cn("relative w-full max-w-[600px]", playVideo && video.src && "select-none")}>
          {playVideo && video.src ? (
            <AutoplayVideo
              src={video.src}
              srcSmall={video.srcSmall}
              poster={video.poster}
              label={`${project.name} walkthrough video`}
              className="aspect-video rounded-[12px] shadow-[var(--shadow-float)]"
            />
          ) : (
            <Screenshot
              shot={desktop}
              priority={priority}
              sizes="(min-width: 1024px) 600px, 80vw"
            />
          )}
          {showMobile && mobile && (
          <PhoneFrame
            shot={mobile}
            priority={priority}
            sizes="(min-width: 1024px) 210px, 30vw"
            className="absolute -bottom-8 -right-3 w-[30%] min-w-[96px] max-w-[210px] sm:-right-8"
          />
          )}
        </div>
      </div>
    </SkyPlate>
  );
}
