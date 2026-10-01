"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/**
 * Same layout as the homepage FAQ — sticky heading left, accordion right — but
 * fed per-service questions. Kept as its own component rather than adding props
 * to FAQ so the homepage section stays a zero-argument drop-in.
 */
export function ServiceFAQ({ items, title = "Before we start" }: { items: { q: string; a: string }[]; title?: string }) {
  const accordionItems = items.map((f, i) => ({
    id: `svc-faq-${i}`,
    title: f.q,
    content: (
      <p className="max-w-[62ch] text-[16px] leading-[1.65] text-ink-70 text-pretty">{f.a}</p>
    ),
  }));

  return (
    <Section tone="tint" pad="lg">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-24">
              <Eyebrow className="mb-4">A few useful answers</Eyebrow>
              <h2 className="text-[34px] sm:text-[42px]">{title}</h2>
              <p className="mt-5 max-w-[38ch] text-[15px] leading-[1.6] text-muted text-pretty">
                Still have a question? Book a call and we can talk it through and agree the right
                next step.
              </p>
              <Button href={site.book} className="mt-6">
                Book a call
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Accordion items={accordionItems} defaultOpen={-1} className="[&_button]:py-5" />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
