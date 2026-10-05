import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { LabEntries } from "@/components/sections/LabEntries";
import { CTA } from "@/components/sections/CTA";
import { lab } from "@/lib/insights";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({ title: lab.meta.title, description: lab.meta.description, path: "/lab" });

export default function LabPage() {
  return (
    <>
      <PageHero
        eyebrow={lab.hero.eyebrow}
        headline={lab.hero.headline}
        body={lab.hero.body}
        tags={lab.hero.tags}
        primary={{ label: "Book a call", href: site.book }}
        secondary={{ label: "Read the insights", href: "/insights" }}
      />
      <LabEntries />
      <CTA />
    </>
  );
}
