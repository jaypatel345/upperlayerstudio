import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { ServiceDetail } from "@/lib/services";

/**
 * The section that earns the rest of the page: the visitor's own problem,
 * described in their words. Dark, so it reads as the one serious beat on the
 * page — the same device the reference uses for its "what we do" block.
 */
export function ServiceProblem({ problem }: { problem: ServiceDetail["problem"] }) {
  return (
    <Section tone="dark" pad="lg">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow className="text-white/45">{problem.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-[20ch] text-[32px] leading-[1.06] text-white sm:text-[44px] lg:text-[52px]">
            {problem.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line-light bg-[rgba(255,255,255,0.14)] sm:grid-cols-2">
          {problem.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="bg-dark">
              <div className="h-full p-7 sm:p-9">
                <h3 className="text-[19px] leading-[1.25] text-white sm:text-[21px]">{item.title}</h3>
                <p className="mt-3.5 max-w-[46ch] text-[15px] leading-[1.65] text-white/60 text-pretty">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
