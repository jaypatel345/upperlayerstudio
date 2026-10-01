import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SkyPlate } from "@/components/ui/SkyPlate";
import { posts } from "@/lib/insights";

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso),
  );

/** Article index. Cards carry a sky plate so the page reads as imagery first. */
export function PostGrid() {
  return (
    <Section tone="white" pad="lg">
      <Container>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.07}>
              <Link
                href={`/insights/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-all duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-card)]"
              >
                <SkyPlate variant={post.sky} className="aspect-[16/10] w-full" />

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="text-[13px] text-faint">
                    {post.topic} · {post.readingTime}
                  </p>
                  <h2 className="mt-3 text-[21px] leading-[1.2] sm:text-[23px]">{post.title}</h2>
                  <p className="mt-3 flex-1 text-[15px] leading-[1.6] text-muted text-pretty">
                    {post.summary}
                  </p>
                  <div className="mt-7 flex items-center justify-between">
                    <span className="text-[13px] text-faint">{formatDate(post.date)}</span>
                    <span
                      aria-hidden
                      className="text-[14px] font-medium transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
