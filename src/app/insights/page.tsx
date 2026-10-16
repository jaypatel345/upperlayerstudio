import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogId, blogSchema, breadcrumbSchema, pageMeta, webPageSchema } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { PostGrid } from "@/components/sections/PostGrid";
import { CTA } from "@/components/sections/CTA";
import { insightsIndex, posts } from "@/lib/insights";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({ title: insightsIndex.meta.title, description: insightsIndex.meta.description, path: "/insights" });

export default function InsightsPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          type: "CollectionPage",
          path: "/insights",
          name: insightsIndex.meta.title,
          description: insightsIndex.meta.description,
          extra: { mainEntity: { "@id": blogId } },
        })}
      />
      <JsonLd data={blogSchema(posts, insightsIndex.meta)} />
      <JsonLd data={breadcrumbSchema([{ name: "Insights", path: "/insights" }])} />
      <PageHero
        breadcrumbs={[{ label: "Insights" }]}
        eyebrow={insightsIndex.hero.eyebrow}
        headline={insightsIndex.hero.headline}
        body={insightsIndex.hero.body}
        tags={insightsIndex.hero.tags}
        primary={{ label: "Book a call", href: site.book }}
        secondary={{ label: "See the Lab", href: "/lab" }}
      />
      <PostGrid />
      <CTA />
    </>
  );
}
