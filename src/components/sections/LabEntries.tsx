import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SkyPlate } from "@/components/ui/SkyPlate";
import { lab } from "@/lib/insights";

/** Alternating art/copy rows, same construction as the services showcase. */
export function LabEntries() {
  return (
    <Section tone="white" pad="lg">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={lab.intro.eyebrow} title={lab.intro.title} body={lab.intro.body} />
        </Reveal>

        <div className="mt-14 space-y-4 sm:space-y-6">
          {lab.entries.map((entry, i) => (
            <Reveal key={entry.title} delay={0.06}>
              <article className="grid items-center gap-8 rounded-[var(--radius-lg)] border border-line bg-tint p-5 sm:p-6 lg:grid-cols-2 lg:gap-12 lg:p-7">
                <SkyPlate
                  variant={entry.sky}
                  label={entry.kind}
                  className={[
                    "aspect-[16/10] rounded-[var(--radius-card)]",
                    i % 2 === 1 ? "lg:order-2" : "",
                  ].join(" ")}
                />

                <div className="lg:px-4">
                  <span className="text-[13px] font-medium text-faint">{entry.kind}</span>
                  <h3 className="mt-3 text-[24px] leading-[1.12] sm:text-[30px]">{entry.title}</h3>
                  <p className="mt-4 max-w-[48ch] text-[16px] leading-[1.65] text-ink-70 text-pretty">
                    {entry.body}
                  </p>
                  <p className="mt-4 max-w-[48ch] border-l-2 border-line-strong pl-4 text-[15px] leading-[1.6] text-muted text-pretty">
                    {entry.detail}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
