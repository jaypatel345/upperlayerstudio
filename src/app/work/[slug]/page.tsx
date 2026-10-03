import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { FeatureGrid } from "@/components/ui/FeatureGrid";
import { Screenshot, PhoneFrame } from "@/components/ui/DeviceFrames";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { ProjectVideo } from "@/components/sections/ProjectVideo";
import { CTA } from "@/components/sections/CTA";
import { projectBySlug, projects } from "@/lib/projects";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};

  const title = `${project.name}: ${project.kind} case study`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${title} | ${site.name}`,
      description: project.summary,
      url: `/work/${project.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const delay = (s: number) => ({ "--rise-delay": `${s}s` }) as React.CSSProperties;
  const liveHost = project.live.replace(/^https?:\/\//, "");

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-[60px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]"
          style={{
            background:
              "radial-gradient(70% 120% at 50% -20%, rgba(125,182,238,0.22) 0%, transparent 65%)",
          }}
        />
        <Container className="pt-14 pb-12 sm:pt-20 sm:pb-16">
          <div className="rise" style={delay(0)}>
            <Link
              href="/work"
              className="text-[14px] font-medium text-ink underline-offset-4 decoration-line-strong hover:underline"
            >
              ← All work
            </Link>
          </div>

          <div className="rise mt-8" style={delay(0.06)}>
            <Eyebrow>
              Case study · {project.kind} · {project.service}
            </Eyebrow>
          </div>

          <h1
            className="rise mt-5 max-w-[16ch] text-[44px] leading-[1.03] sm:text-[64px] lg:text-[84px]"
            style={delay(0.12)}
          >
            {project.name}
          </h1>
          <p
            className="rise mt-6 max-w-[640px] text-[17px] leading-[1.6] text-ink-70 text-pretty sm:text-[19px]"
            style={delay(0.18)}
          >
            {project.summary}
          </p>

          <div className="rise mt-8 flex flex-wrap items-center gap-3" style={delay(0.24)}>
            <Button href={project.live} size="lg">
              Visit {liveHost} ↗
            </Button>
            <Button href={project.repo} size="lg" variant="light">
              View the source ↗
            </Button>
          </div>

          <dl
            className="rise mt-12 grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4"
            style={delay(0.3)}
          >
            {project.meta.map((m) => (
              <div key={m.label}>
                <dt className="text-[13px] text-faint">{m.label}</dt>
                <dd className="mt-1.5 text-[15px] font-medium text-ink">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Hero art */}
      <Section tone="white" pad="sm" className="pt-0 sm:pt-0">
        <Container>
          <Reveal>
            <ProjectShowcase
              project={project}
              priority
              className="min-h-[360px] sm:min-h-[520px] lg:min-h-[620px]"
            />
          </Reveal>
        </Container>
      </Section>

      {/* Problem + build */}
      <Section tone="white" pad="md" className="pt-8 sm:pt-8">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <Eyebrow>The problem</Eyebrow>
              <p className="mt-5 text-[24px] leading-[1.3] tracking-[-0.03em] text-ink text-pretty sm:text-[30px]">
                {project.problem}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <Eyebrow>What I built</Eyebrow>
              <p className="mt-5 text-[16px] leading-[1.7] text-ink-70 text-pretty sm:text-[17px]">
                {project.built}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Video */}
      <Section tone="tint" pad="md">
        <Container size="text">
          <Reveal>
            <SectionHeader
              eyebrow="Walkthrough"
              title="See it working"
              body={project.video.note}
            />
          </Reveal>
          <Reveal delay={0.08} className="mt-10">
            <ProjectVideo video={project.video} name={project.name} />
          </Reveal>
        </Container>
      </Section>

      {/* Features */}
      <Section tone="white" pad="lg">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="What it does"
              title="The features that matter"
              body="What a reader actually uses, from the morning brief to asking a question out loud."
            />
          </Reveal>
          <div className="mt-12">
            <FeatureGrid
              items={project.features.map((f, i) => ({ ...f, n: `0${i + 1}` }))}
              cols={2}
            />
          </div>
        </Container>
      </Section>

      {/* Pipeline */}
      <Section tone="dark" pad="lg">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Under the hood"
              title={<span className="text-white">How it works every morning</span>}
              body="The part nobody sees: a pipeline that runs on its own and has to keep running."
            />
          </Reveal>
          <div className="mt-12">
            <FeatureGrid
              tone="dark"
              items={project.pipeline.map((p, i) => ({ ...p, n: `0${i + 1}` }))}
              cols={2}
            />
          </div>
        </Container>
      </Section>

      {/* Screens */}
      <Section tone="white" pad="lg">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Screens"
              title="Every screen, as shipped"
              body="Captured from the live product at newsbit.in. Nothing mocked up."
            />
          </Reveal>

          <div className="mt-16 space-y-20">
            {project.screens.map((group) => (
              <div key={group.title}>
                <Reveal>
                  <h3 className="text-[24px] leading-[1.15] sm:text-[30px]">{group.title}</h3>
                  <p className="mt-3 max-w-[56ch] text-[16px] leading-[1.6] text-muted text-pretty">
                    {group.body}
                  </p>
                </Reveal>

                {group.kind === "desktop" ? (
                  <div
                    className={
                      group.shots.length === 3
                        ? "mt-8 grid gap-6 sm:grid-cols-3"
                        : "mt-8 grid gap-6 sm:grid-cols-2"
                    }
                  >
                    {group.shots.map((shot, i) => (
                      <Reveal key={shot.src} delay={i * 0.05}>
                        <figure>
                          <div className="rounded-[var(--radius-lg)] bg-tint p-3 sm:p-5">
                            <Screenshot
                              shot={shot}
                              sizes={
                                group.shots.length === 3
                                  ? "(min-width: 1024px) 400px, 90vw"
                                  : "(min-width: 1024px) 600px, 90vw"
                              }
                            />
                          </div>
                          <figcaption className="mt-3 text-[14px] text-muted">
                            {shot.caption}
                          </figcaption>
                        </figure>
                      </Reveal>
                    ))}
                  </div>
                ) : (
                  <div className="mt-8 grid gap-6 sm:grid-cols-3">
                    {group.shots.map((shot, i) => (
                      <Reveal key={shot.src} delay={i * 0.05}>
                        <figure>
                          <div className="flex justify-center rounded-[var(--radius-lg)] bg-tint px-5 py-8 sm:py-10">
                            <PhoneFrame shot={shot} className="w-[190px] sm:w-[210px]" />
                          </div>
                          <figcaption className="mt-3 text-[14px] text-muted">
                            {shot.caption}
                          </figcaption>
                        </figure>
                      </Reveal>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Stack + result */}
      <Section tone="tint" pad="lg">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <Eyebrow>The stack</Eyebrow>
              <dl className="mt-6 divide-y divide-line border-y border-line">
                {project.stack.map((g) => (
                  <div key={g.group} className="grid gap-2 py-4 sm:grid-cols-[140px_1fr]">
                    <dt className="text-[14px] text-faint">{g.group}</dt>
                    <dd className="text-[15px] font-medium text-ink">{g.items.join(" · ")}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.08}>
              <Eyebrow>The result</Eyebrow>
              <p className="mt-5 text-[72px] leading-none tracking-[-0.05em] text-ink sm:text-[96px]">
                {project.result.stat}
              </p>
              <p className="mt-5 max-w-[40ch] text-[17px] leading-[1.55] text-ink-70 text-pretty">
                {project.result.label}
              </p>
              <p className="mt-3 text-[13px] text-faint">Source: {project.result.source}</p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
