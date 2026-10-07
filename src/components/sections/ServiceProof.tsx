import Link from "next/link";
import { AutoplayVideo } from "@/components/ui/AutoplayVideo";
import { projectBySlug } from "@/lib/projects";
import { cn } from "@/lib/cn";

/**
 * A service's proof: the walkthrough video of the case study that shows it
 * working, with a link through to that case study. Stands where the sky plate
 * used to, so the promise and the evidence sit side by side.
 */
export function ServiceProof({
  slug,
  tone = "light",
  posterWidth = 560,
  className,
}: {
  /** Case study slug, from the service's `proof` */
  slug: string;
  tone?: "light" | "dark";
  posterWidth?: number;
  className?: string;
}) {
  const project = projectBySlug(slug);
  if (!project?.video.src) return null;
  const href = `/work/${project.slug}`;
  const dark = tone === "dark";

  return (
    <figure className={className}>
      <Link
        href={href}
        // The caption link below is the one keyboard and screen-reader users get
        tabIndex={-1}
        aria-hidden
        className={cn(
          "block overflow-hidden rounded-[var(--radius-card)] border",
          dark ? "border-line-light bg-dark-2" : "border-line bg-tint",
        )}
      >
        <AutoplayVideo
          src={project.video.src}
          srcSmall={project.video.srcSmall}
          poster={project.video.poster}
          label={`${project.name} walkthrough`}
          posterWidth={posterWidth}
          className="aspect-video"
        />
      </Link>
      <figcaption
        className={cn(
          "mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[13px]",
          dark ? "text-white/50" : "text-muted",
        )}
      >
        <span>{project.video.note}</span>
        <Link
          href={href}
          className={cn(
            "group inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline",
            dark ? "text-white" : "text-ink",
          )}
        >
          See it working: {project.name}
          <span
            aria-hidden
            className="transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            ↗
          </span>
        </Link>
      </figcaption>
    </figure>
  );
}
