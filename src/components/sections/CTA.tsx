import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { cta } from "@/lib/site";

export function CTA() {
  return (
    <Section id="book-a-call" tone="white" pad="lg">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[var(--radius-xl)] bg-dark px-6 py-20 text-center sm:px-12 sm:py-28">
            {/* sky wash so the dark block still reads as the same brand */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-50"
              style={{
                background:
                  "radial-gradient(70% 90% at 50% 120%, rgba(125,182,238,0.55) 0%, transparent 62%)",
              }}
            />
            <Eyebrow className="text-white/55">{cta.eyebrow}</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-[16ch] text-[36px] text-white sm:text-[52px] lg:text-[62px]">
              {cta.title}
            </h2>
            <p className="mx-auto mt-6 max-w-[52ch] text-[16px] leading-[1.6] text-white/65 text-pretty">
              {cta.body}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <Button href={cta.primary.href} variant="light" size="lg">
                {cta.primary.label}
              </Button>
              <ArrowLink href={cta.secondary.href} className="text-white decoration-white/30">
                {cta.secondary.label}
              </ArrowLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
