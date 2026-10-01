import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { SkyPlate } from "@/components/ui/SkyPlate";
import { work } from "@/lib/pages";

/**
 * Real, shipped work only — currently one entry, which is the honest number.
 * The row layout is the same art-plate / copy construction as the services
 * showcase, so a second and third project drop in without redesigning anything.
 */
export function BuiltWork() {
  return (
    <Section tone="white" pad="lg">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow={work.built.eyebrow}
            title={work.built.title}
            body={work.built.body}
          />
        </Reveal>

        <div className="mt-14 space-y-6">
          {work.built.items.map((item) => (
            <Reveal key={item.name} delay={0.06}>
              <article className="grid items-center gap-8 rounded-[var(--radius-lg)] border border-line bg-tint p-5 sm:p-6 lg:grid-cols-2 lg:gap-12 lg:p-7">
                <SkyPlate
                  variant={item.art}
                  label={item.kind}
                  className="aspect-[16/10] rounded-[var(--radius-card)]"
                />

                <div className="lg:px-4">
                  <span className="text-[13px] font-medium text-faint">{item.kind}</span>
                  <h3 className="mt-3 text-[26px] leading-[1.1] sm:text-[32px]">{item.name}</h3>
                  <p className="mt-4 max-w-[48ch] text-[16px] leading-[1.65] text-ink-70 text-pretty">
                    {item.body}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-line bg-white px-3 py-1.5 text-[13px] text-muted"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  {item.href && (
                    <ArrowLink href={item.href} className="mt-8">
                      View the source
                    </ArrowLink>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
