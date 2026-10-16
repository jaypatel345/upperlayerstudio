import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { PostCover, resolveCover } from "@/components/sections/PostCover";
import { CTA } from "@/components/sections/CTA";
import { postBySlug, posts } from "@/lib/insights";
import { site } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema, pageMeta } from "@/lib/seo";

import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

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
    ogCard: true,
  });
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso),
  );

function renderParagraphWithLinks(text: string) {
  const parts = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const linkText = match[1];
    const linkHref = match[2];
    parts.push(
      <Link
        key={match.index}
        href={linkHref}
        className="font-medium text-ink underline underline-offset-4 decoration-line-strong hover:text-ink transition-colors"
      >
        {linkText}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();
  const cover = resolveCover(post);

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
          <div className="rise mb-6">
            <Breadcrumbs
              items={[
                { label: "Insights", href: "/insights" },
                { label: post.title },
              ]}
            />
          </div>
          <Eyebrow className="rise">
            {post.topic} · {post.readingTime}
          </Eyebrow>
          <h1 className="rise mt-5 max-w-[20ch] text-[34px] leading-[1.06] sm:text-[46px] lg:text-[54px]">
            {post.title}
          </h1>
          <p className="rise mt-6 max-w-[58ch] text-[17px] leading-[1.6] text-ink-70 text-pretty">
            {post.summary}
          </p>
          <p className="rise mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-faint">
            <span>Published <time dateTime={post.date}>{formatDate(post.date)}</time></span>
            <span aria-hidden="true">·</span>
            <span>Last updated <time dateTime={post.lastUpdated ?? post.date}>{formatDate(post.lastUpdated ?? post.date)}</time></span>
            <span aria-hidden="true">·</span>
            <span>{site.name}</span>
          </p>
        </Container>
      </section>

      <Container size="text" className="pt-10 sm:pt-14">
        <PostCover
          post={post}
          priority
          sizes="(min-width: 840px) 520px, 64vw"
          className="aspect-[2/1] rounded-[var(--radius-lg)]"
          shotClassName="w-[64%]"
        />
        {cover && (
          <p className="mt-3 text-[13px] text-muted">
            {cover.shot.caption}, from{" "}
            <Link
              href={`/work/${cover.project.slug}`}
              className="font-medium text-ink underline-offset-4 hover:underline"
            >
              the {cover.project.name} case study
            </Link>
          </p>
        )}
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
                        {renderParagraphWithLinks(p)}
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
                          <span className="text-pretty">{renderParagraphWithLinks(li)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </article>

          {/* Related Case Study & Service Callout */}
          {cover && (
            <div className="mt-14 rounded-[var(--radius-card)] border border-line bg-tint p-6 sm:p-8">
              <Eyebrow>Related Case Study</Eyebrow>
              <h3 className="mt-3 text-[22px] leading-[1.25] text-ink font-normal">
                See this in production: {cover.project.name}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.6] text-ink-70">
                {cover.project.summary}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href={`/work/${cover.project.slug}`}
                  className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink underline underline-offset-4 decoration-line-strong hover:text-ink"
                >
                  Read the {cover.project.name} case study →
                </Link>
                {cover.project.serviceSlug && (
                  <Link
                    href={`/services/${cover.project.serviceSlug}`}
                    className="text-[14px] text-ink-70 hover:text-ink underline underline-offset-4"
                  >
                    Explore {cover.project.service} services
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Keep reading */}
          <div className="mt-16 border-t border-line pt-10">
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
