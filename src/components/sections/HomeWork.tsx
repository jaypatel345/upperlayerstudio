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
const featured = ["ai-lead-agent", "frontdeskai", "newsbit", "aslioffer"]
  .map(projectBySlug)
  .filter((p) => p !== undefined);

/** Homepage "Selected work", laid out like the reference's "The work, in context". */
export function HomeWork() {
  return (
    <section id="work" className="relative overflow-x-clip bg-surface text-ink">
      {/* Left continuous glass sheet (BrightStudios style) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-4 sm:w-8 md:w-12 lg:w-24 xl:w-[calc(max(96px,(100vw-1340px)/2))]"
        style={{
          background:
            "linear-gradient(112deg, rgba(255,255,255,0.30) 0%, rgba(248,252,254,0.07) 35%, rgba(235,246,251,0.05) 68%, rgba(255,255,255,0.25) 100%)",
          backdropFilter: "blur(8px) saturate(1.18)",
          WebkitBackdropFilter: "blur(8px) saturate(1.18)",
          boxShadow:
            "inset 1px 0 0 rgba(255,255,255,0.92), inset -1px 0 0 rgba(255,255,255,0.76), inset 5px 0 12px -8px rgba(12,49,65,0.35), inset -5px 0 12px -8px rgba(12,49,65,0.28), 0 0 16px rgba(20,44,56,0.035)",
        }}
      />

      {/* Right continuous glass sheet (BrightStudios style) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-4 sm:w-8 md:w-12 lg:w-24 xl:w-[calc(max(96px,(100vw-1340px)/2))]"
        style={{
          background:
            "linear-gradient(112deg, rgba(255,255,255,0.30) 0%, rgba(248,252,254,0.07) 35%, rgba(235,246,251,0.05) 68%, rgba(255,255,255,0.25) 100%)",
          backdropFilter: "blur(8px) saturate(1.18)",
          WebkitBackdropFilter: "blur(8px) saturate(1.18)",
          boxShadow:
            "inset 1px 0 0 rgba(255,255,255,0.92), inset -1px 0 0 rgba(255,255,255,0.76), inset 5px 0 12px -8px rgba(12,49,65,0.35), inset -5px 0 12px -8px rgba(12,49,65,0.28), 0 0 16px rgba(20,44,56,0.035)",
        }}
      />

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
