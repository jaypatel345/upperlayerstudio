"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { SkyPlate } from "@/components/ui/SkyPlate";
import { services } from "@/lib/site";

export function Services() {
  const items = services.items.map((s) => ({
    id: s.n,
    n: s.n,
    title: s.title,
    content: (
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
        <SkyPlate
          variant={s.art.sky}
          label={s.art.label}
          className="aspect-[16/10] rounded-[var(--radius-card)]"
        />

        <div>
          <p className="text-[16px] leading-[1.6] text-ink-70 text-pretty">{s.summary}</p>
          <ul className="mt-6 space-y-2.5">
            {s.bullets.map((b) => (
              <li key={b} className="flex gap-2.5 text-[15px] text-ink">
                <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[rgba(10,10,10,0.35)]" />
                {b}
              </li>
            ))}
          </ul>
          <ArrowLink href={s.href} className="mt-7">
            View service details
          </ArrowLink>
        </div>
      </div>
    ),
  }));

  return (
    <Section id="services" tone="tint" pad="lg" className="pb-14 sm:pb-16">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={services.eyebrow} title={services.title} body={services.body} />
        </Reveal>
        <Reveal delay={0.08} className="mt-14">
          <Accordion items={items} defaultOpen={0} />
        </Reveal>
      </Container>
    </Section>
  );
}
