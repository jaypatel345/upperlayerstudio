import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { projects } from "@/lib/projects";

/** Homepage teaser for /work: the same cards, with a way through to the rest. */
export function SelectedWork({
  showAll = true,
  eyebrow = "Selected work",
  title = "Products I've built and shipped",
}: {
  showAll?: boolean;
  eyebrow?: string;
  title?: string;
}) {
  return (
    <Section id="work" tone="white" pad="lg">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            body="Real products you can open, not mockups. Each one has a case study with the problem, the build and how it holds up."
          />
        </Reveal>

        <div className="mt-14 space-y-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} delay={0.06 + i * 0.04} />
          ))}
        </div>

        {showAll && (
          <Reveal delay={0.1} className="mt-10">
            <ArrowLink href="/work" direction="right">
              See all work
            </ArrowLink>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
