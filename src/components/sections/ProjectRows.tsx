import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/projects";

/**
 * The project list from the reference's "The work, in context": each project
 * as a wide draggable gallery, with its name on the left and the summary,
 * stack and case-study link on the right. Shared by the homepage and /work.
 */
export function ProjectRows({ projects, className }: { projects: Project[]; className?: string }) {
  return (
    <div className={cn("mx-auto flex max-w-[1440px] flex-col gap-10 lg:gap-16", className)}>
      {projects.map((p) => (
        <article key={p.slug} className="flex flex-col gap-5 lg:gap-6">
          <Reveal>
            <WorkGallery project={p} />
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex flex-col gap-8 px-6 lg:flex-row lg:gap-10 lg:px-32">
              <div className="flex flex-col gap-2 lg:w-[355px] lg:shrink-0">
                <h3 className="text-[23px] leading-[1.18] tracking-[-0.025em] lg:text-[28px]">
                  {p.name}
                </h3>
                <p className="text-[15px] font-medium leading-[1.4] tracking-[-0.01em]">
                  {p.kind}
                </p>
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-[18px]">
                <p className="text-[17px] leading-[1.5] text-ink-70 text-pretty">{p.summary}</p>
                <p className="text-[13px] leading-[1.45] text-muted">
                  {p.service} — {p.stack.flatMap((g) => g.items).slice(0, 4).join(", ")}
                </p>
                <Link
                  href={`/work/${p.slug}`}
                  className="group inline-flex w-fit items-center gap-1 pt-3.5 pb-2 text-[16px] text-ink underline-offset-4 decoration-line-strong hover:underline"
                >
                  View case study<span className="sr-only">: {p.name}</span>
                  <span
                    aria-hidden
                    className="transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </Link>
              </div>
            </div>
          </Reveal>
        </article>
      ))}
    </div>
  );
}
