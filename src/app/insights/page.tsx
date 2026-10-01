import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PostGrid } from "@/components/sections/PostGrid";
import { CTA } from "@/components/sections/CTA";
import { insightsIndex } from "@/lib/insights";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: insightsIndex.meta.title,
  description: insightsIndex.meta.description,
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
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
