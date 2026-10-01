import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { LegalDoc } from "@/lib/legal";

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso),
  );

/**
 * Shared layout for the privacy policy and terms. Reading measure, not
 * marketing width — these are documents, and the one thing a visitor wants from
 * them is to find a clause quickly.
 */
export function LegalBody({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line pt-[60px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[380px]"
          style={{
            background:
              "radial-gradient(70% 120% at 50% -20%, rgba(125,182,238,0.2) 0%, transparent 65%)",
          }}
        />
        <Container size="text" className="pt-16 pb-12 sm:pt-24 sm:pb-16">
          <Eyebrow className="rise">Legal</Eyebrow>
          <h1 className="rise mt-5 text-[34px] leading-[1.06] sm:text-[46px]">{doc.title}</h1>
          <p className="rise mt-6 max-w-[58ch] text-[17px] leading-[1.6] text-ink-70 text-pretty">
            {doc.summary}
          </p>
          <p className="rise mt-7 text-[14px] text-faint">Last updated {formatDate(doc.updated)}</p>
        </Container>
      </section>

      <Section tone="white" pad="md">
        <Container size="text">
          <article className="space-y-10">
            {doc.sections.map((section) => (
              <Reveal key={section.heading} delay={0.04}>
                <div>
                  <h2 className="mb-4 text-[22px] leading-[1.2] sm:text-[25px]">
                    {section.heading}
                  </h2>
                  <div className="space-y-4">
                    {section.paragraphs.map((p) => (
                      <p key={p} className="text-[16px] leading-[1.7] text-ink-70 text-pretty">
                        {p}
                      </p>
                    ))}
                  </div>
                  {section.list && (
                    <ul className="mt-5 space-y-2.5">
                      {section.list.map((li) => (
                        <li key={li} className="flex gap-3 text-[16px] leading-[1.6] text-ink-70">
                          <span
                            aria-hidden
                            className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-[rgba(10,10,10,0.35)]"
                          />
                          <span className="text-pretty">{li}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </article>
        </Container>
      </Section>
    </>
  );
}
