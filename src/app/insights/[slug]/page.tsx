import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SkyPlate } from "@/components/ui/SkyPlate";
import { CTA } from "@/components/sections/CTA";
import { postBySlug, posts } from "@/lib/insights";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema, pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};

  return pageMeta({
    title: post.title,
    description: post.summary,
    path: `/insights/${post.slug}`,
    type: "article",
    publishedTime: post.date,
  });
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso),
  );

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Insights", path: "/insights" },
          { name: post.title, path: `/insights/${post.slug}` },
        ])}
      />
      {/* Title block — narrower measure than a marketing hero, it's an article */}
      <section className="relative isolate overflow-hidden border-b border-line pt-[60px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]"
          style={{
            background:
              "radial-gradient(70% 120% at 50% -20%, rgba(125,182,238,0.22) 0%, transparent 65%)",
          }}
        />
        <Container size="text" className="pt-16 pb-12 sm:pt-24 sm:pb-16">
          <Eyebrow className="rise">
            {post.topic} · {post.readingTime}
          </Eyebrow>
          <h1 className="rise mt-5 max-w-[20ch] text-[34px] leading-[1.06] sm:text-[46px] lg:text-[54px]">
            {post.title}
          </h1>
          <p className="rise mt-6 max-w-[58ch] text-[17px] leading-[1.6] text-ink-70 text-pretty">
            {post.summary}
          </p>
          <p className="rise mt-7 text-[14px] text-faint">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {site.name}
          </p>
        </Container>
      </section>

      <Container size="text" className="pt-10 sm:pt-14">
        <SkyPlate variant={post.sky} className="aspect-[2/1] rounded-[var(--radius-lg)]" />
      </Container>

      <Section tone="white" pad="md">
        <Container size="text">
          <article className="space-y-10">
            {post.sections.map((section, i) => (
              <Reveal key={section.heading ?? i} delay={0.04}>
                <div>
                  {section.heading && (
                    <h2 className="mb-5 text-[26px] leading-[1.15] sm:text-[30px]">
                      {section.heading}
                    </h2>
                  )}
                  <div className="space-y-5">
                    {section.paragraphs.map((p) => (
                      <p key={p} className="text-[17px] leading-[1.7] text-ink-70 text-pretty">
                        {p}
                      </p>
                    ))}
                  </div>
                  {section.list && (
                    <ul className="mt-6 space-y-3">
                      {section.list.map((li) => (
                        <li key={li} className="flex gap-3 text-[17px] leading-[1.6] text-ink-70">
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

          {/* Keep reading */}
          <div className="mt-20 border-t border-line pt-10">
            <Eyebrow className="mb-6">Keep reading</Eyebrow>
            <div className="grid gap-4 sm:grid-cols-2">
              {more.map((p) => (
                <Link
                  key={p.slug}
                  href={`/insights/${p.slug}`}
                  className="group rounded-[var(--radius-card)] border border-line bg-white p-6 transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-card)]"
                >
                  <p className="text-[13px] text-faint">{p.topic}</p>
                  <h3 className="mt-3 text-[19px] leading-[1.25]">{p.title}</h3>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium">
                    Read
                    <span
                      aria-hidden
                      className="transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <CTA />
    </>
  );
}
