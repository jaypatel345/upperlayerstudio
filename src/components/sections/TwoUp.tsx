import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { twoUp } from "@/lib/site";

/** Two side-by-side next-step cards, mirroring "Start with an audit / How we work". */
export function TwoUp() {
  return (
    <Section tone="tint" pad="sm" className="pt-0">
      <Container>
        <div className="grid gap-4 md:grid-cols-2">
          {twoUp.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08}>
              <Link
                href={card.href}
                className="group flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-line bg-white p-7 transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-card)] sm:p-9"
              >
                <div>
                  <h3 className="text-[24px] sm:text-[28px]">{card.title}</h3>
                  <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.6] text-muted text-pretty">
                    {card.body}
                  </p>
                </div>
                <span className="mt-10 inline-flex items-center gap-1.5 text-[14px] font-medium">
                  {card.cta}
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
