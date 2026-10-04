import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CopyGrid } from "@/components/sections/CopyGrid";
import { Studio } from "@/components/sections/Studio";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { studio } from "@/lib/pages";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: studio.meta.title,
  description: studio.meta.description,
  alternates: { canonical: "/studio" },
};

export default function StudioPage() {
  return (
    <>
      <PageHero
        eyebrow={studio.hero.eyebrow}
        headline={studio.hero.headline}
        body={studio.hero.body}
        tags={studio.hero.tags}
        primary={{ label: "Book a call", href: site.book }}
        secondary={{ label: "See what I build", href: "/services" }}
      />
      <CopyGrid
        eyebrow={studio.audience.eyebrow}
        title={studio.audience.title}
        items={studio.audience.items}
        tone="dark"
        align="center"
      />
      {/* Carries id="process", which is what the nav's /studio#process targets */}
      <Studio />
      <CopyGrid
        eyebrow={studio.principles.eyebrow}
        title={studio.principles.title}
        body={studio.principles.body}
        items={studio.principles.items}
        tone="tint"
      />
      <FAQ />
      <CTA after="tint" />
    </>
  );
}
