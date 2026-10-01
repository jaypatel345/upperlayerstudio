import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { process } from "@/lib/site";

/**
 * The three process steps on their own, without the founder panel that follows
 * them on the homepage and /services. Every service page needs to answer "how
 * will this go"; none of them needs to re-introduce me four times over.
 *
 * Reads from the same process.steps as Studio, so the promise can only ever be
 * stated in one place.
 */
export function ServiceProcess() {
  return (
    <Section tone="white" pad="lg" className="border-t border-line">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Working together"
            title="Clear decisions from brief to handover"
            body="The same three steps on every project, whichever service you start with. You know the scope and the fee before any work begins."
          />
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-3">
          {process.steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08} className="bg-white">
              <div className="flex h-full flex-col p-7 sm:p-8">
                <span className="text-[13px] font-medium text-faint">{step.n}</span>
                <h3 className="mt-5 text-[21px] leading-[1.2] sm:text-[23px]">{step.title}</h3>
                <p className="mt-3.5 text-[15px] leading-[1.6] text-muted text-pretty">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
