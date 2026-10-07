import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ProjectRows } from "@/components/sections/ProjectRows";
import { projectBySlug } from "@/lib/projects";

/**
 * The homepage shows one project per service rather than all of them: Newsbit
 * first as the strongest live product, then the rest in services-ladder order.
 * Everything else lives on /work.
 */
const featured = ["newsbit", "ai-lead-agent", "frontdeskai", "aslioffer"]
  .map(projectBySlug)
  .filter((p) => p !== undefined);

/** Homepage "Selected work", laid out like the reference's "The work, in context". */
export function HomeWork() {
  return (
    <section id="work" className="relative overflow-x-clip bg-surface text-ink">
      <div className="px-6 pt-16 pb-8 text-center sm:pt-[88px] sm:pb-10 lg:px-32">
        <Reveal>
          <Eyebrow>Selected work</Eyebrow>
          <h2 className="mt-3 text-[32px] leading-[1.1] sm:text-[48px]">
            Products I&apos;ve built and shipped
          </h2>
        </Reveal>
      </div>

      <ProjectRows projects={featured} />

      <Reveal className="flex justify-center px-6 pt-10 pb-16 sm:pb-[88px] lg:pt-16">
        <ArrowLink href="/work" direction="right" className="text-[16px]">
          See all work
        </ArrowLink>
      </Reveal>
    </section>
  );
}
