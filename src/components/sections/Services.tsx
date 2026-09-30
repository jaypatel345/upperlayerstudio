"use client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/site";

export function Services() {
  const items = services.items.map((s) => ({
    id: s.n,
    n: s.n,
    title: s.title,
    content: (
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
        {/* Gradient plate standing in for the service artwork */}
        <div
          className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)]"
          style={{
            backgroundImage: `linear-gradient(135deg, ${s.art.from} 0%, ${s.art.via} 48%, ${s.art.to} 100%)`,
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_120%,rgba(255,255,255,0.55),transparent_60%)]" />
          <span className="absolute bottom-5 left-6 text-[15px] font-medium tracking-[-0.02em] text-white mix-blend-difference">
            {s.art.label.toUpperCase()}
          </span>
        </div>

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
