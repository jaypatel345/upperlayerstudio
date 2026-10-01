import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SkyPlate } from "@/components/ui/SkyPlate";
import type { ServiceDetail } from "@/lib/services";

/**
 * "What am I actually buying." Hairline grid in the same construction as the
 * homepage process steps and credential tiles — gap-px over a line-coloured
 * background is what produces the shared seam, rather than per-cell borders.
 */
export function ServiceDeliverables({
  deliverables,
  art,
}: {
  deliverables: ServiceDetail["deliverables"];
  art: ServiceDetail["art"];
}) {
  return (
    <Section tone="white" pad="lg">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <SectionHeader
                eyebrow={deliverables.eyebrow}
                title={deliverables.title}
                body={deliverables.body}
              />
              <SkyPlate
                variant={art.sky}
                label={art.label}
                className="mt-10 hidden aspect-[16/10] rounded-[var(--radius-card)] lg:block"
              />
            </div>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2">
            {deliverables.items.map((item, i) => (
              <Reveal key={item.n} delay={i * 0.05} className="bg-white">
                <div className="h-full p-6 sm:p-7">
                  <span className="text-[13px] font-medium text-faint">{item.n}</span>
                  <h3 className="mt-4 text-[18px] leading-[1.25] sm:text-[19px]">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-muted text-pretty">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
