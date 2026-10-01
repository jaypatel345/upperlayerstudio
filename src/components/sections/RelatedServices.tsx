import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { serviceBySlug } from "@/lib/services";

/**
 * The ladder, made navigable. Every service page ends by pointing at the two it
 * most often leads to, which is the positioning restated as a link rather than
 * as a claim. Card treatment matches TwoUp so the two read as one family.
 */
export function RelatedServices({ slugs, title }: { slugs: string[]; title: string }) {
  const items = slugs.map(serviceBySlug).filter((s) => s !== undefined);

  if (items.length === 0) return null;

  return (
    <Section tone="tint" pad="md" className="border-t border-line">
      <Container>
        <Reveal>
          <SectionHeader eyebrow="Where this goes next" title={title} />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {items.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <Link
                href={`/services/${s.slug}`}
                className="group flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-line bg-white p-7 transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-card)] sm:p-9"
              >
                <div>
                  <span className="text-[13px] font-medium text-faint">{s.n}</span>
                  <h3 className="mt-4 text-[24px] sm:text-[28px]">{s.name}</h3>
                  <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.6] text-muted text-pretty">
                    {s.blurb}
                  </p>
                </div>
                <span className="mt-10 inline-flex items-center gap-1.5 text-[14px] font-medium">
                  Explore
                  <span
                    aria-hidden
                    className="transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
