"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { faqs, site } from "@/lib/site";

export function FAQ() {
  const items = faqs.items.map((f, i) => ({
    id: `faq-${i}`,
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
              <Eyebrow className="mb-4">{faqs.eyebrow}</Eyebrow>
              <h2 className="text-[34px] sm:text-[42px]">{faqs.title}</h2>
              <p className="mt-5 max-w-[38ch] text-[15px] leading-[1.6] text-muted text-pretty">
                Still have a question? Book a call and we can talk it through and agree the next
                step.
              </p>
              <Button href={site.calendly} className="mt-6">
                Book a call
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            {/* -1 keeps every answer closed until asked for */}
            <Accordion items={items} defaultOpen={-1} className="[&_button]:py-5" />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
