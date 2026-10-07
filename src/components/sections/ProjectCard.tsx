import Link from "next/link";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import type { Project } from "@/lib/projects";

/**
 * One project row, shared by the homepage and /work so the two never drift.
 * The art is a link as well as the text, since the picture is what people
 * actually click.
 */
export function ProjectCard({ project, delay = 0.06 }: { project: Project; delay?: number }) {
  const href = `/work/${project.slug}`;

  return (
    <Reveal delay={delay}>
      <article className="grid items-center gap-8 rounded-[var(--radius-lg)] border border-line bg-tint p-5 sm:p-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12 lg:p-7">
        <Link href={href} aria-label={`${project.name} case study`} className="block">
          <ProjectShowcase project={project} className="aspect-[16/11]" />
        </Link>

        <div className="lg:px-4">
          <span className="text-[13px] font-medium text-faint">
            {project.kind} · {project.service}
          </span>
          <h3 className="mt-3 text-[28px] leading-[1.1] sm:text-[36px]">{project.name}</h3>
          <p className="mt-4 max-w-[48ch] text-[16px] leading-[1.65] text-ink-70 text-pretty">
            {project.summary}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack
              .flatMap((g) => g.items)
              .slice(0, 6)
              .map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-line bg-white px-3 py-1.5 text-[13px] text-muted"
                >
                  {t}
                </li>
              ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ArrowLink href={href} direction="right">
              View case study<span className="sr-only">: {project.name}</span>
            </ArrowLink>
            {project.live ? (
              <ArrowLink href={project.live}>
                Open the live product<span className="sr-only">: {project.name}</span>
              </ArrowLink>
            ) : (
              project.repo && (
                <ArrowLink href={project.repo}>
                  View the source<span className="sr-only">: {project.name}</span>
                </ArrowLink>
              )
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
