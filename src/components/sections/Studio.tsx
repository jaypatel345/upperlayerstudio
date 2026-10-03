import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { process } from "@/lib/site";

export function Studio() {
  return (
    <Section id="process" tone="white" pad="lg">
      <Container>
        <Reveal>
          <SectionHeader eyebrow={process.eyebrow} title={process.title} body={process.body} />
        </Reveal>

        {/* Numbered process steps */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-3">
          {process.steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08} className="bg-white">
              <div className="flex h-full flex-col p-7 sm:p-8">
                <span className="text-[13px] font-medium text-faint">{step.n}</span>
                <h3 className="mt-5 text-[21px] leading-[1.2] sm:text-[23px]">{step.title}</h3>
                <p className="mt-3.5 text-[15px] leading-[1.6] text-muted text-pretty">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Founder panel */}
        <Reveal delay={0.1} className="mt-4">
          <div className="grid gap-8 rounded-[var(--radius-card)] border border-line bg-tint p-6 sm:p-8 lg:grid-cols-[220px_minmax(0,1fr)]">
            <div className="flex flex-col">
              <Image
                src={process.founder.photo.src}
                alt={process.founder.photo.alt}
                width={1254}
                height={1254}
                sizes="220px"
                quality={90}
                className="h-[220px] w-[220px] rounded-[var(--radius-card)] object-cover object-top"
              />
              <p className="mt-4 text-[24px] leading-[1.2] font-medium tracking-[-0.03em]">
                {process.founder.name}
              </p>
              <p className="mt-1 text-[14px] text-muted">{process.founder.role}</p>
              <ArrowLink href={process.founder.link.href} className="mt-3">
                {process.founder.link.label}
              </ArrowLink>
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="text-[28px] sm:text-[40px]">{process.founder.heading}</h3>
              <div className="mt-5 space-y-4">
                {process.founder.body.map((p) => (
                  <p key={p} className="max-w-[64ch] text-[16px] leading-[1.65] text-ink-70 text-pretty">
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-9 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-3">
                {process.credentials.map((c) => (
                  <div key={c.label} className="bg-white p-5">
                    <p className="text-[26px] leading-none font-medium tracking-[-0.04em]">{c.value}</p>
                    <p className="mt-2.5 text-[14px] font-medium">{c.label}</p>
                    <p className="mt-0.5 text-[13px] text-muted">{c.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
