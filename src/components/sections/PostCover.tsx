import { Screenshot } from "@/components/ui/DeviceFrames";
import { SkyPlate } from "@/components/ui/SkyPlate";
import { projectBySlug, type Project, type Shot } from "@/lib/projects";
import { cn } from "@/lib/cn";
import type { Post } from "@/lib/insights";

/** Finds the cover shot in its case study, so alt text and size live in one place. */
export function resolveCover(post: Post): { project: Project; shot: Shot } | undefined {
  const project = projectBySlug(post.cover.project);
  if (!project) return undefined;
  const shot = [project.cover.desktop, ...project.screens.flatMap((g) => g.shots)].find(
    (s) => s.src === post.cover.src,
  );
  return shot && { project, shot };
}

/**
 * An article's cover: a real screenshot from the case study it draws on, on
 * that project's sky plate, so it matches the project's own gallery slides.
 */
export function PostCover({
  post,
  sizes,
  priority,
  className,
  shotClassName = "w-[80%]",
}: {
  post: Post;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Width of the screenshot within the plate; wide plates need it narrower */
  shotClassName?: string;
}) {
  const cover = resolveCover(post);

  return (
    <SkyPlate
      variant={cover?.project.art}
      className={cn("flex items-center justify-center", className)}
    >
      {cover && (
        <div className={shotClassName}>
          <Screenshot shot={cover.shot} sizes={sizes} priority={priority} />
        </div>
      )}
    </SkyPlate>
  );
}
